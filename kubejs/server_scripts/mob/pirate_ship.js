const $BlockPathTypes = Java.loadClass('net.minecraft.world.level.pathfinder.BlockPathTypes')
const $Ship = Java.loadClass('com.talhanation.smallships.world.entity.ship.Ship')
const $EntityType = Java.loadClass('net.minecraft.world.entity.EntityType')
const $Mth = Java.loadClass('net.minecraft.util.Mth')
const $ModEntityTypes = Java.loadClass('com.talhanation.smallships.world.entity.ModEntityTypes')
const $RangedCrossbowAttackGoal = Java.loadClass(
    'net.minecraft.world.entity.ai.goal.RangedCrossbowAttackGoal'
)

const DEBUG_SHIP_PATHS = false
const DEBUG_STATE_MACHINE = false
const SHIP_FRICTION = 0.007
const ATTACK_RANGE = 4500 // ~67 blocks
const PIRATE_DIFFICULTY_THRESHOLD = 1.0
const PIRATE_CHECK_TICKS = 150
const ATTACK_COOLDOWN = 100 // 5 seconds
const MAX_VOLLEYS = 4

const STATE = {
    PATHING: 0,
    MOVING: 1,
    ATTACKING: 2,
    FLEEING: 3,
}

/**
 * Returns a normalized horizontal vector between an entity and the given position
 * @param {Internal.Entity} entity
 * @param {Internal.Position} pos
 * @returns {Vec3d}
 */
function horizontalVectorToPos(entity, pos) {
    const target = new Vec3d(pos.x(), 0, pos.z())
    const entityHorizontalPos = new Vec3d(entity.x, 0, entity.z)
    return entityHorizontalPos.subtract(target).normalize()
}

/**
 * Returns the horizontal angle between two vectors, in degrees
 * @param {Vec3d} vector1
 * @param {Vec3d} vector2
 */
function horizontalAngleBetweenVectors(vector1, vector2) {
    return KMath.deg(Math.acos(vector1.dot(vector2) / (vector1.length() * vector2.length())))
}

const distanceModifiers = new Map([
    [4500, 260],
    [4000, 230],
    [3500, 220],
    [3000, 190],
    [2600, 170],
    [2400, 160],
    [2250, 150],
    [1750, 130],
    [1350, 115],
    [1250, 110],
    [600, 120],
    [0, 135],
])

/**
 * Calculate cannon angle adjustment based on distance to target with random factor, in radians
 * @param {number} distance
 * @param {number} random
 * @returns {number}
 */
const getCannonAngleDistanceModifier = (distance, random) => {
    let modifier = 135
    for (const k of [distanceModifiers.keys()].sort().reverse()) {
        if (distance >= k) {
            modifier = distanceModifiers.get(k)
            break
        }
    }
    return (distance / modifier - Utils.random.nextInt(-random, random)) / 100
}

/**
 * Calculate cannon angle adjustment based on elevation difference
 * @param {number} heightDiff
 * @returns {number}
 */
const getCannonAngleHeightModifier = (heightDiff) => (heightDiff * 2.55) / 100

/******************************************************************************/

/**
 * Object wrapper for Ship to handle movement and attack logic
 * @param {Internal.Ship} ship
 * @param {Internal.Pillager} captain
 * @returns {Object}
 */
const ShipHelper = function (ship, captain) {
    /**
     * Returns the total number of cannonballs in all slots in the ship's hold
     * @returns {number}
     */
    const getCannonballCount = () => {
        let total = 0
        if (ship instanceof $Ship) {
            for (const itemstack of ship.getItemStacks()) {
                if (itemstack.is('smallships:cannon_ball')) {
                    total += itemstack.count
                }
            }
        }
        return total
    }

    /**
     * Moves the sail state one shift towards the requested state
     * @param {number} state
     */
    const setSailState = (state) => {
        const curState = ship.sailState
        if (curState === state || ship.sailStateCooldown > 0) return
        const adjustment = state > curState ? 1 : -1
        ship.setSailState(curState + adjustment)
        ship.sailStateCooldown = ship.getSailStateCooldown()
    }

    const getMaxSpeed = () => {
        return ship.attributes.maxSpeed / 69 //nice
    }

    /**
     * Moves the ship's current speed towards the requested speed by the ship's acceleration attribute
     * @param {number} speed
     */
    const setSpeed = (speed) => {
        const targetSpeed = Math.min(getMaxSpeed(), speed)
        const curSpeed = ship.getSpeed()
        if (targetSpeed === curSpeed) return
        const adjustment =
            curSpeed < targetSpeed ? ship.attributes.acceleration : -SHIP_FRICTION * 2.2
        ship.setSpeed(curSpeed + adjustment)
    }

    /**
     * Modifies the ship's rotation speed to the left or right, limited by its maxRotationSpeed
     * @param {boolean} isLeft
     */
    const setRotation = (isLeft) => {
        const sign = Math.sign(ship.getRotSpeed()) >= 0 ? 1 : -1
        let rotSpeed = sign * Math.max(Math.abs(ship.getRotSpeed()) - SHIP_FRICTION * 2.5, 0)
        const maxRotSpeed = ship.attributes.maxRotationSpeed * 0.1 + 1.8
        const rotAccel = ship.attributes.rotationAcceleration / 12
        if (isLeft) {
            rotSpeed = Math.max(rotSpeed - rotAccel, -maxRotSpeed)
        } else {
            rotSpeed = Math.min(rotSpeed + rotAccel, maxRotSpeed)
        }
        ship.setYaw(ship.getYaw() + rotSpeed)
        ship.setRotSpeed(rotSpeed)
    }

    /**
     * Returns a movement vector based on the ship's rotation and speed
     * @returns {Vec3d}
     */
    const calcMovement = () => {
        return ship
            .getDeltaMovement()
            .add(
                Vec3d(
                    Math.sin(-KMath.rad(ship.yaw) * ship.speed),
                    0,
                    Math.cos(KMath.rad(ship.yaw) * ship.speed)
                )
            )
    }

    /**
     * Attempts to fire cannons at the target
     * @param {boolean} shootLeftSide
     * @param {Internal.Entity} target
     */
    function fireCannons(shootLeftSide, target) {
        const distanceToTarget = captain.distanceToSqr(target)
        const speed = 3.1
        const accuracy = 2 // 0 = 100% left right accuracy
        const rotation = shootLeftSide ? KMath.PI / 2 : -(KMath.PI / 2)

        const shootVec = ship.getForward().yRot(rotation).normalize()
        const heightDiff = target.getY() - captain.getVehicle().getY()
        const angle =
            getCannonAngleDistanceModifier(distanceToTarget, 1) +
            getCannonAngleHeightModifier(heightDiff)
        const yShootVec = shootVec.y() + angle
        ship.triggerCannons(shootVec, yShootVec, captain, speed, accuracy)
    }

    /**
     * Move the ship at the given angle (in degrees)
     * @param {number} angle
     */
    const moveAtAngle = (angle) => {
        const ref = 90
        const inputLeft = angle < ref
        const inputRight = angle > ref
        const rotDelta = Math.abs(angle - ref)
        const inputUp = rotDelta <= ref * 0.35
        const inAngleForSail = rotDelta <= ref * 0.6

        if (inputLeft || inputRight) {
            setRotation(inputLeft)
        }

        let targetSpeed = 0
        if (inputRight !== inputLeft && !inputUp) {
            if (inAngleForSail) targetSpeed = 0.24
        }

        if (inputUp) {
            targetSpeed = getMaxSpeed()
        }

        ship.setDeltaMovement(calcMovement())
        setSpeed(targetSpeed)
        ship.updateControls(inputUp, false, inputLeft, inputRight, null)
        if (ship.setPaddleState) ship.setPaddleState(inputLeft, inputRight)
    }

    /**
     * Moves the ship towards the provided path node
     * @param {Internal.Node} node
     */
    const moveToNode = (node) => {
        const forward = ship.getForward().yRot(-90).normalize()
        const toTarget = horizontalVectorToPos(ship, node.asVec3())
        const angle = horizontalAngleBetweenVectors(forward, toTarget)
        moveAtAngle(angle)
    }

    /**
     * Moves the ship away from the given entity
     * @param {Internal.Entity} entity
     */
    const fleeFrom = (entity) => {
        const targetVec = horizontalVectorToPos(entity, ship.position()).normalize().reverse()
        const angle = horizontalAngleBetweenVectors(ship.getForward().yRot(90), targetVec)
        moveAtAngle(angle)
    }

    /**
     * Rotates the ship to face the provided target entity and fires cannons if aligned
     * @param {Internal.Entity} target
     */
    const attack = (target) => {
        const toTarget = horizontalVectorToPos(target, captain.position())

        const forward = ship.getForward().normalize()
        const vecRight = forward.yRot(-KMath.PI / 2).normalize()
        const vecLeft = forward.yRot(KMath.PI / 2).normalize()

        const distanceToLeft = toTarget.distanceTo(vecLeft)
        const distanceToRight = toTarget.distanceTo(vecRight)

        const shootLeftSide = distanceToLeft < distanceToRight

        const alpha = horizontalAngleBetweenVectors(forward, toTarget)
        const phi = shootLeftSide ? -alpha : alpha
        const ref = shootLeftSide ? -90 : 90

        const inputLeft = phi < ref
        const inputRight = phi > ref
        if (inputLeft || inputRight) {
            setRotation(inputLeft)
        }

        const beta = shootLeftSide
            ? horizontalAngleBetweenVectors(vecLeft, toTarget)
            : horizontalAngleBetweenVectors(vecRight, toTarget)

        if (beta < 10) fireCannons(shootLeftSide, target)
    }

    return {
        getCannonballCount: getCannonballCount,
        setSailState: setSailState,
        setSpeed: setSpeed,
        setRotation: setRotation,
        moveToNode: moveToNode,
        moveAtAngle: moveAtAngle,
        fleeFrom: fleeFrom,
        attack: attack,
    }
}

/**
 * Is the pirate close enough to their target to attack?
 * @param {Internal.Pillager} pirate
 * @returns {boolean}
 */
const canAttack = (pirate, target) => {
    return (
        target != null &&
        //pirate.hasLineOfSight(pirate.target) &&
        pirate.distanceToEntitySqr(target) <= ATTACK_RANGE
    )
}

/*******************************************************************************
Goal Handlers
*******************************************************************************/

/**
 * Goal start handler for pirate captain
 * @param {Internal.Pillager} pirate
 */
const startShip = (pirate) => {
    if (DEBUG_SHIP_PATHS) console.log('STARTING')
    /** @type {Internal.Ship} */
    pirate.setAttributeBaseValue('minecraft:generic.follow_range', 128)
    pirate.navigation.setMaxVisitedNodesMultiplier(10)
    pirate.setPathfindingMalus($BlockPathTypes.WATER, 8.0)
    pirate.setPathfindingMalus($BlockPathTypes.BLOCKED, -1)
    pirate.setPathfindingMalus($BlockPathTypes.WALKABLE, -1)
    pirate.setPathfindingMalus($BlockPathTypes.BREACH, 0.0)
}

/**
 * Goal stop handler for pirate captain
 * @param {Internal.Pillager} pirate
 */
const stopShip = (pirate) => {}

/**
 * Goal canUse handler for pirate captain. Same function used for canContinueToUse
 * @param {Internal.Pillager} pirate
 * @returns {boolean}
 */
const canUseShip = (pirate) =>
    pirate.vehicle instanceof $Ship && pirate.vehicle.passengers[0] === pirate

const canContinueToUseShip = (pirate) => canUseShip(pirate)

/**
 * Factory function for tick handlers. Returns a closure with state variables for the ship
 * @returns {function}
 */
const makeShipTick = () => {
    /** @type {Internal.UUID} */
    const funcID = $Mth.createInsecureUUID()
    let state = STATE.PATHING
    let prevState = ''
    let approachTimer = 0
    let precision = 50
    let attackCooldown = 0
    let volleyCount = 0

    /** @param {Internal.Pillager} pirate */
    const shipTick = (pirate) => {
        if (!pirate.persistentData.victim) return
        const targetUUID = pirate.persistentData.getUUID('victim')
        if (!targetUUID) return
        const targetEntity = pirate.level.getEntity(targetUUID)

        /** @type {Internal.Ship} */
        const ship = pirate.getVehicle()
        if (!ship) return

        const safeArea = targetEntity.boundingBox.inflate(160, 2, 160)

        if (!safeArea.contains(ship.blockPosition())) {
            for (const passenger of ship.getPassengers()) {
                passenger.discard()
            }
            ship.discard()
            return
        }

        const shipHelper = ShipHelper(ship, pirate)
        if (shipHelper.getCannonballCount() <= 0) state = STATE.FLEEING

        if (DEBUG_STATE_MACHINE && prevState !== state) console.log(`${funcID}: state: ${state}`)
        prevState = state

        if (attackCooldown > 0) attackCooldown--

        switch (state) {
            case STATE.FLEEING: {
                shipHelper.setSailState(4)
                shipHelper.fleeFrom(targetEntity)
                break
            }
            case STATE.PATHING: {
                shipHelper.setSailState(0)
                if (targetEntity && pirate.navigation.moveTo(targetEntity, 1)) state = STATE.MOVING
                break
            }

            case STATE.MOVING: {
                shipHelper.setSailState(4)
                const path = pirate.navigation.getPath()
                if (path === null || !path.getNextNode()) {
                    state = STATE.PATHING
                    break
                }
                let node = path.getNextNode()

                const nodeDistance = ship.distanceToSqr(Vec3d(node.x, ship.y, node.z))
                if (nodeDistance <= precision) {
                    path.advance()
                    if (path.isDone()) {
                        state = STATE.PATHING
                    } else {
                        node = path.getNextNode()
                    }
                    if (DEBUG_SHIP_PATHS) {
                        pirate.level.setBlockAndUpdate(
                            new BlockPos(node.x, pirate.y + 6, node.z),
                            Blocks.BLACK_STAINED_GLASS_PANE.defaultBlockState()
                        )
                    }
                } else if (++approachTimer > 50) {
                    if (precision < 300) precision += 25
                    else {
                        precision = 50
                        state = STATE.PATHING
                    }
                    approachTimer = 0
                }

                if (nodeDistance >= 3) {
                    shipHelper.moveToNode(node)
                    if (
                        shipHelper.getCannonballCount() > 0 &&
                        attackCooldown <= 0 &&
                        canAttack(pirate, targetEntity)
                    ) {
                        state = STATE.ATTACKING
                    }
                }
                break
            }

            case STATE.ATTACKING: {
                const cannonballCount = shipHelper.getCannonballCount()
                if (!(canAttack(pirate, targetEntity) && cannonballCount > 0)) state = STATE.PATHING
                shipHelper.setSailState(0)
                let attackTarget
                if (targetEntity) {
                    attackTarget = targetEntity.getVehicle()
                        ? targetEntity.getVehicle()
                        : targetEntity
                } else break
                shipHelper.attack(attackTarget)
                const remainingCannonballs = shipHelper.getCannonballCount()

                // If we used any cannonballs, count it as a volley
                if (cannonballCount > remainingCannonballs) {
                    console.log('Firing deck guns, sir')
                    volleyCount++
                    if (volleyCount >= MAX_VOLLEYS) {
                        attackCooldown = ATTACK_COOLDOWN
                        volleyCount = 0
                        if (remainingCannonballs <= 0) state = STATE.FLEEING
                        else state = STATE.PATHING
                    }
                }
                break
            }
        }
    }
    return shipTick
}

EntityJSEvents.addGoalSelectors('minecraft:pillager', (event) => {
    /**
     * @param {string}   name
     * @param {number}   priority
     * @param {Function} canUse
     * @param {Function} canContinueToUse
     * @param {boolean}  isInterruptable
     * @param {Function} start
     * @param {Function} stop
     * @param {boolean}  requiresUpdateEveryTick
     * @param {Function} tick
     */
    event.customGoal(
        'pirate_captain',
        0,
        canUseShip,
        canContinueToUseShip,
        true,
        startShip,
        stopShip,
        true,
        makeShipTick()
    )
})

EntityJSEvents.addGoals('minecraft:pillager', (event) => {
    event.removeGoal($RangedCrossbowAttackGoal)
    event.arbitraryTargetGoal(3, (mob) => new $RangedCrossbowAttackGoal(mob, 1.0, ATTACK_RANGE))
})

/*******************************************************************************
Pirate ship spawning control
*******************************************************************************/

/**
 *
 * @param {Internal.ServerPlayer} player
 * @param {Internal.ServerLevel} level
 * @returns {boolean}
 */
const shouldSummonPirates = (player, level) => {
    return (
        !hasNemesis(player) &&
        isBlockPosInBiomeTag(level, player.blockPosition().below(2), IS_DEEP_OCEAN) &&
        level.getCurrentDifficultyAt(player.blockPosition()).effectiveDifficulty >=
            PIRATE_DIFFICULTY_THRESHOLD
    )
}

/**
 *
 * @param {Internal.EntityType} shipType
 * @param {Internal.ServerLevel} level
 * @param {Internal.ServerPlayer} player
 * @returns {Internal.Ship}
 */
const buildPirateShip = (shipType, level, player) => {
    /** @type {Internal.Ship} */
    const pirateShip = shipType.create(level)
    pirateShip.setVariant('dark_oak')
    pirateShip.setData($Ship.SAIL_COLOR, 'red')
    pirateShip.setData($Ship.BANNER, BANNERS.JOLLY_ROGER)
    pirateShip.setCannonCount(6)
    const nbt = pirateShip.nbt
    nbt.Attributes.maxSpeed = 60
    pirateShip.setNbt(nbt)
    pirateShip.setItem(0, Item.of('smallships:cannon_ball', 8))
    const pirateCount = pirateShip.maxPassengers
    for (let i = 0; i < pirateCount; i++) {
        let pirate = $EntityType.PILLAGER.create(level)
        pirate.setAttributeBaseValue('minecraft:generic.follow_range', 128)
        pirate.startRiding(pirateShip)
        pirate.target = player
        pirate.persistentData.putUUID('victim', player.stringUuid)
    }
    return pirateShip
}

/**
 * @param {Internal.Entity} target
 * @param {Internal.Ship} pirateShip
 */
const positionPirateShip = (target, pirateShip) => {
    const direction = target.getForward()
    const position = target.position().subtract(direction.scale(64))
    pirateShip.moveTo(position)
    pirateShip.yRot = target.yRot
}

/**
 * @param {Internal.ScheduledEvents$ScheduledEvent} _task
 * @param {Internal.ServerLevel} level
 */
const pirateSummoner = (_task, level) => {
    level.getPlayers().forEach(
        /** @param {Internal.ServerPlayer} player */ (player) => {
            if (!shouldSummonPirates(player, level)) return

            /** @type {Internal.EntityType} */
            const shipType = $ModEntityTypes.BRIGG
            /** @type {Internal.Ship} */
            const pirateShip = buildPirateShip(shipType, level, player)
            const veh = player.getVehicle()
            if (!veh) return

            positionPirateShip(veh, pirateShip)

            if (level.tryAddFreshEntityWithPassengers(pirateShip)) {
                console.log(`${player.displayName.string} gets their very own pirate ship!`)
                player.displayClientMessage('Yikes! Pirates!', true)
                const camera = player.getCamera()
                level.playSound(
                    null,
                    camera.x,
                    camera.y,
                    camera.z,
                    'spectral_seas:pirate_theme',
                    'MUSIC',
                    15,
                    1
                )

                player.persistentData.putUUID('Nemesis', pirateShip.getUuid())
            }
        }
    )
}

let pirateShipLoaded = 0
LevelEvents.loaded('minecraft:overworld', (event) => {
    if (event.level.isClientSide()) return
    if (pirateShipLoaded > 0) return
    console.log('Scheduling annoying sea monsters…')
    event.server.scheduleRepeatingInTicks(PIRATE_CHECK_TICKS, (task) => {
        pirateSummoner(task, event.level)
    })
    pirateShipLoaded++
})

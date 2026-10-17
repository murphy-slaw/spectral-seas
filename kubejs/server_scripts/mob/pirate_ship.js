const $BlockPathTypes = Java.loadClass('net.minecraft.world.level.pathfinder.BlockPathTypes')
const $ContainerShip = Java.loadClass('com.talhanation.smallships.world.entity.ship.ContainerShip')
const $Ship = Java.loadClass('com.talhanation.smallships.world.entity.ship.Ship')
const $SeatType = Java.loadClass('com.talhanation.smallships.world.entity.ship.seat.SeatType')
const $EntityType = Java.loadClass('net.minecraft.world.entity.EntityType')
const $ModEntityTypes = Java.loadClass('com.talhanation.smallships.world.entity.ModEntityTypes')
const $MobSpawnType = Java.loadClass('net.minecraft.world.entity.MobSpawnType')
const $RangedCrossbowAttackGoal = Java.loadClass(
    'net.minecraft.world.entity.ai.goal.RangedCrossbowAttackGoal'
)

const DEBUG_SHIP_PATHS = false
const DEBUG_STATE_MACHINE = true
const ATTACK_RANGE = 900 // 30 blocks
const PIRATE_DIFFICULTY_THRESHOLD = 1.0
const PIRATE_CHECK_TICKS = 600
const BASE_PIRATE_CHANCE = 0.0375
const ATTACK_COOLDOWN = 100 // 2 seconds
const MAX_VOLLEYS = 4
const BASE_CANNONBALL_COUNT = 8

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

/******************************************************************************/

/**
 * Object wrapper for Ship to handle movement and attack logic
 * @param {Internal.CogEntity} ship
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
        if (ship instanceof $ContainerShip) {
            for (const itemstack of ship.getItemStacks()) {
                if (itemstack.is('smallships:cannon_ball')) {
                    total += itemstack.count
                }
            }
        }
        return total
    }

    /**
 Moves the sail state one shift towards the requested state
     * @param {number} state
     */
    const setSailState = (state) => {
        const curState = ship.sailState
        if (curState === state || ship.sailStateCooldown > 0) return
        const adjustment = state > curState ? 1 : -1
        ship.setSailState(curState + adjustment)
        ship.sailStateCooldown = ship.getSailStateCooldown()
    }

    /**
     * Attempts to fire cannons at the target
     * @param {boolean} shootLeftSide
     * @param {Internal.Entity} target
     */
    function fireCannons(shootLeftSide, target) {
        ship.CANNONS.forEach((cannon) => {
            if (cannon.isRightSided() !== shootLeftSide && !cannon.isCooldown()) {
                cannon.trigger(captain)
            }
        })
    }

    /**
     * Move the ship at the given angle (in degrees)
     * @param {number} angle
     */
    const moveAtAngle = (angle) => {
        const ref = 90
        const rotDelta = Math.abs(angle - ref)
        const shouldTurn = rotDelta > 5
        const inputLeft = shouldTurn && angle < ref
        const inputRight = shouldTurn && angle > ref
        const inputUp = true

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
        ship.updateControls(false, false, inputLeft, inputRight, null)

        const beta = shootLeftSide
            ? horizontalAngleBetweenVectors(vecLeft, toTarget)
            : horizontalAngleBetweenVectors(vecRight, toTarget)

        if (beta < 30) fireCannons(shootLeftSide, target)
    }

    return {
        getCannonballCount: getCannonballCount,
        setSailState: setSailState,
        moveToNode: moveToNode,
        moveAtAngle: moveAtAngle,
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
    if (DEBUG_SHIP_PATHS) console.debug('STARTING')
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
    pirate.vehicle != null &&
    shipTypes.includes(pirate.vehicle.type) &&
    pirate.vehicle.passengers[0] === pirate

const canContinueToUseShip = (pirate) => canUseShip(pirate)

/**
 * Factory function for tick handlers. Returns a closure with state variables for the ship
 * @returns {function}
 */
const makeShipTick = () => {
    /** @type {Internal.UUID} */
    const funcID = $Mth.createInsecureUUID()
    let state = STATE.PATHING
    let prevState = state
    let attackCooldown = 0
    let volleyCount = 0

    /** @param {Internal.Pillager} pirate */
    const shipTick = (pirate) => {
        if (!pirate.persistentData.victim) return
        const targetUUID = pirate.persistentData.getUUID('victim')
        if (!targetUUID) return
        const targetEntity = pirate.level.getEntity(targetUUID)
        if (!targetEntity) return

        /** @type {Internal.ContainerShip} */
        const ship = pirate.getVehicle()
        if (!ship) return

        const distanceSqr = ship.distanceToEntitySqr(targetEntity)

        if (distanceSqr > 25600) {
            console.debug("We lost 'em!")
            for (const passenger of ship.getPassengers()) {
                passenger.discard()
            }
            if (ship instanceof $ContainerShip) {
                ship.clearContent()
            }
            ship.discard()
            return
        }

        const shipHelper = ShipHelper(ship, pirate)

        if (DEBUG_STATE_MACHINE && prevState !== state) console.log(`${funcID}: state: ${state}`)
        prevState = state

        if (attackCooldown > 0) attackCooldown--

        switch (state) {
            case STATE.FLEEING: {
                const targetVec = horizontalVectorToPos(targetEntity, ship.position())
                    .reverse()
                    .normalize()
                    .scale(32)
                const targetPos = ship.position().add(targetVec)
                pirate.navigation.moveTo(targetPos.x(), ship.y, targetPos.z(), 1)
                state = STATE.MOVING
                break
            }
            case STATE.PATHING: {
                shipHelper.setSailState(0)
                if (shipHelper.getCannonballCount() <= 0) state = STATE.FLEEING
                else if (targetEntity && pirate.navigation.moveTo(targetEntity, 16))
                    state = STATE.MOVING
                break
            }

            case STATE.MOVING: {
                shipHelper.setSailState(4)
                const path = pirate.navigation.getPath()
                if (pirate.navigation.isDone()) {
                    state = STATE.PATHING
                    break
                }
                let node = path.getNextNode()

                const nodeDistance = ship.distanceToSqr(Vec3d(node.x, ship.y, node.z))
                if (DEBUG_SHIP_PATHS) {
                    console.debug(path.nodeCount)
                    pirate.level.setBlockAndUpdate(
                        new BlockPos(node.x, pirate.y + 20, node.z),
                        Blocks.BLACK_STAINED_GLASS_PANE.defaultBlockState()
                    )
                    const end = path.endNode
                    pirate.level.setBlockAndUpdate(
                        new BlockPos(end.x, pirate.y + 20, end.z),
                        Blocks.LIME_STAINED_GLASS.defaultBlockState()
                    )
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
                path.advance()
                break
            }

            case STATE.ATTACKING: {
                const cannonballCount = shipHelper.getCannonballCount()
                if (!(canAttack(pirate, targetEntity) && cannonballCount > 0)) state = STATE.PATHING
                shipHelper.setSailState(1)
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
                    volleyCount++
                    if (volleyCount >= MAX_VOLLEYS) {
                        attackCooldown = ATTACK_COOLDOWN
                        volleyCount = 0
                        state = STATE.PATHING
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
******************************************************************************/

/**
 * Is the level currently at sunrise or sunset?
 * @param {Internal.ServerLevel} level
 * @returns {boolean}
 */
const isSunRiseSet = (level) => {
    const dayTime = level.dayTime() % 24000
    return dayTime > 23000 || (dayTime > 12000 && dayTime < 13000)
}

/**
 * Calculate the adusted chance of a successful pirate summoning
 * @param {Internal.ServerPlayer} player
 * @returns {number}
 */
const calcPirateChance = (player) => {
    const moonPhaseModifier = player.level.getMoonPhase() === 4 && player.level.isNight() ? 2 : 1
    const gloamingModifier = isSunRiseSet(player.level) ? 2 : 1
    const difficultyModifier = modifiedDifficulty(player)
    const weatherModifier = player.level.isRaining() ? 2 : 1
    return (
        BASE_PIRATE_CHANCE *
        moonPhaseModifier *
        gloamingModifier *
        difficultyModifier *
        weatherModifier
    )
}
/**
 * Should the current pirate summoning attempt succeed?
 * @param {Internal.ServerPlayer} player
 * @param {Internal.ServerLevel} level
 * @returns {boolean}
 */
const shouldSummonPirates = (player) => {
    const chance = calcPirateChance(player)
    const roll = Utils.random.nextFloat(1.0)
    console.debug(`Current pirate summoning chance: ${chance}: ${roll}`)
    return (
        roll < chance &&
        !hasNemesis(player) &&
        isBlockPosInBiomeTag(player.level, player.blockPosition().below(2), IS_DEEP_OCEAN) &&
        localDifficultyFor(player) >= PIRATE_DIFFICULTY_THRESHOLD
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
    /** @type {Internal.BriggEntity} */
    const pirateShip = shipType.create(level)
    pirateShip.setVariant('dark_oak')

    const cannonCount = pirateShip.getTotalCannonSlots()
    for (let i = 0; i < cannonCount; i++) {
        pirateShip.setCannonInSlot(i, true)
    }

    const upgrades = pirateShip.getData($Ship.UPGRADES)
    upgrades.merge({ CottonSails: true })
    pirateShip.setData($Ship.UPGRADES, upgrades)

    pirateShip.setData($Ship.SAIL_COLOR, 'red')
    pirateShip.setData($Ship.BANNER, BANNERS.JOLLY_ROGER)

    const nbt = pirateShip.nbt
    nbt.LootTable = 'minecraft:chests/pillager_outpost'
    pirateShip.setNbt(nbt)

    const cannonballCount = ((BASE_CANNONBALL_COUNT * cannonCount) / 2) * localDifficultyFor(player)
    console.debug(`Cannonball count: ${cannonballCount}`)
    pirateShip.setItem(0, Item.of('smallships:cannon_ball', cannonballCount))

    pirateShip.setSailState(4)
    pirateShip.setSpeed(pirateShip.maxSpeed)
    return pirateShip
}
/**
 *
 * @param {Internal.CogEntity} pirateShip
 * @param {Internal.ServerPlayer} player
 */
const crewShip = (pirateShip, player) => {
    const pirateCount = pirateShip.seats.filter(
        (seat) => seat.type() !== $SeatType.PASSENGER && seat.type() !== $SeatType.CANNON
    ).length
    /** @type {Internal.Entity[]} */
    const relocatable = []
    for (let i = 0; i < pirateCount; i++) {
        let pirate = $EntityType.PILLAGER.spawn(
            player.level,
            pirateShip.blockPosition(),
            $MobSpawnType.PATROL
        )
        pirate.setAttributeBaseValue('minecraft:generic.follow_range', 128)
        pirate.startRiding(pirateShip)
        pirate.target = player
        pirate.persistentData.putUUID('victim', player.stringUuid)
        if (pirateShip.getSeatOf(pirate).type() === $SeatType.PASSENGER) relocatable.push(pirate)
    }

    pirateShip.seats.forEach((seat) => {
        if (
            (seat.type() === $SeatType.GUNNER || seat.type() === $SeatType.DRIVER) &&
            relocatable.length > 0 &&
            pirateShip.isSeatFree(seat.id())
        ) {
            pirateShip.assignSeat(relocatable.pop(), seat.id())
        }
    })
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
    pirateShip.setSpeed(target.getSpeed())
}

/**
 *
 * @param {Internal.ServerPlayer} player
 * @param {Internal.ServerLevel} level
 */
const summonPirates = (player, level) => {
    /** @type {Internal.EntityType} */
    const shipType =
        localDifficultyFor(player) > 4 ? $ModEntityTypes.BRIGG : $ModEntityTypes.GALLEON
    /** @type {Internal.Ship} */
    const pirateShip = buildPirateShip(shipType, level, player)

    const veh = player.getVehicle()
    if (!veh) return

    positionPirateShip(veh, pirateShip)

    if (level.tryAddFreshEntityWithPassengers(pirateShip)) {
        console.debug(`${player.displayName.string} gets their very own pirate ship!`)
        crewShip(pirateShip, player)
        setNemesis(player, pirateShip.getUuid())

        player.displayClientMessage(Text.translatable('spectral_seas.message.pirate_attack'), true)

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
    }
}

ServerEvents.customCommand('pirates', (event) => {
    summonPirates(event.player, event.level)
})

/**
 * @param {Internal.ScheduledEvents$ScheduledEvent} _task
 * @param {Internal.ServerLevel} level
 */
const pirateSummoner = (_task, level) => {
    level.getPlayers().forEach(
        /** @param {Internal.ServerPlayer} player */ (player) => {
            if (!shouldSummonPirates(player)) return
            summonPirates(player, level)
        }
    )
}

let pirateShipLoaded = 0
LevelEvents.loaded('minecraft:overworld', (event) => {
    if (event.level.isClientSide()) return
    if (pirateShipLoaded > 0) return
    console.info('Scheduling annoying pirates…')
    event.server.scheduleRepeatingInTicks(PIRATE_CHECK_TICKS, (task) => {
        pirateSummoner(task, event.level)
    })
    pirateShipLoaded++
})

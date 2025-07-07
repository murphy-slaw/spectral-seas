const $BlockPathTypes = Java.loadClass('net.minecraft.world.level.pathfinder.BlockPathTypes')
const $Ship = Java.loadClass('com.talhanation.smallships.world.entity.ship.Ship')
const $Cog = Java.loadClass('com.talhanation.smallships.world.entity.ship.CogEntity')
const $Brigg = Java.loadClass('com.talhanation.smallships.world.entity.ship.BriggEntity')

const DEBUG_SHIP_PATHS = false

const states = ['IDLE', 'PATHING', 'MOVING']

/** @type {Map<Internal.UUID, string} */
const pirateStates = new Map()

/** @type {Map<Internal.UUID, net.minecraft.world.level.pathfinder.Path} */
const piratePaths = new Map()

/**
 * @param {Vec3d} vector1
 * @param {Vec3d} vector2
 */
function horizontalAngleBetweenVectors (vector1, vector2) {
    const dotProduct = vector1.x() * vector2.x() + vector1.z() * vector2.z()
    const magnitude1 = Math.sqrt(vector1.x() * vector1.x() + vector1.z() * vector1.z())
    const magnitude2 = Math.sqrt(vector2.x() * vector2.x() + vector2.z() * vector2.z())
    const cosTheta = dotProduct / (magnitude1 * magnitude2)
    return KMath.deg(Math.acos(cosTheta))
}

/**
 * @param {Internal.Pillager} pirate
 */
const boatStart = pirate => {
    console.log('STARTING')
    const boat = pirate.getVehicle()
    boat.setSpeed(1)
    pirateStates.set(pirate.UUID, 'PATHING')
    console.log(`${Array.from(pirateStates.values())}`)
    //pirate.setAttributeBaseValue('minecraft:generic.follow_range', 128)
    pirate.setPathfindingMalus($BlockPathTypes.WATER, 8.0)
    pirate.setPathfindingMalus($BlockPathTypes.BLOCKED, -1)
    pirate.setPathfindingMalus($BlockPathTypes.WALKABLE, -1)
    pirate.setPathfindingMalus($BlockPathTypes.BREACH, 0.0)
}

/**
 * @param {Internal.Pillager} pirate
 */
const boatStop = pirate => {}

/**
 * @param {Internal.Pillager} entity
 * @returns {boolean}
 */
const boatCanUse = entity =>
    entity.vehicle instanceof $Ship &&
    entity.vehicle.getPassengers()[0] === entity &&
    entity.getTarget() != null &&
    entity.distanceToEntity(entity.getTarget()) > 0

const boatCanContinueToUse = entity => boatCanUse(entity)

/**
 * @param {Internal.CogEntity} ship
 * @param {number} state
 */
const shipSetSailState = (ship, state) => {
    const curState = ship.sailState
    if (curState === state || ship.sailStateCooldown > 0) return
    let adjustment = state > curState ? 1 : -1
    ship.setSailState(curState + adjustment)
    console.log(ship.sailStateCooldown)
    ship.sailStateCooldown = ship.getSailStateCooldown()
}
/**
 *
 * @param {Internal.CogEntity} ship
 * @param {number} speed
 */

const shipSetSpeed = (ship, speed) => {
    const targetSpeed = Math.min(ship.attributes.maxSpeed, speed) / (60 * 1.15)
    const curSpeed = ship.getSpeed()
    if (targetSpeed === curSpeed) return
    const accel = ship.attributes.acceleration
    const adjustment = curSpeed < targetSpeed ? accel : -accel
    ship.setSpeed(curSpeed + adjustment)
}

/**
 *
 * @param {Internal.Pillager} pirate
 */
const canAttack = pirate => {
    return pirate.hasLineOfSight(pirate.target) && pirate.distanceToEntitySqr(pirate.target) <= 64
}

/**
 * @param {Internal.Pillager} pirate
 */
const boatTick = pirate => {
    /** @type {Internal.Ship} */
    const ship = pirate.getVehicle()
    if (!ship) return
    let state = pirateStates.get(pirate.UUID)
    console.log(`state: ${state}`)
    switch (state) {
        case 'PATHING': {
            shipSetSailState(ship, 1)
            if (pirate.navigation.moveTo(pirate.getTarget(), 1)) {
                pirateStates.set(pirate.UUID, 'MOVING')
            } else {
                console.log('shitbastard')
            }
            break
        }

        case 'MOVING': {
            shipSetSailState(ship, 4)
            let path = pirate.navigation.getPath()
            if (path === null) {
                pirateStates.set(pirate.UUID, 'PATHING')
                break
            }
            let node = path.getNextNode()

            const distance = ship.distanceToSqr(Vec3d(node.x, ship.y, node.z))
            console.log(`dist: ${distance}`)

            if (distance < 300) {
                path.advance()
                if (
                    path.getNodeCount() == path.getNextNodeIndex() - 1 ||
                    node.equals(path.getEndNode())
                ) {
                    if (canAttack(pirate)) {
                        pirateStates.set(pirate.UUID, 'ATTACKING')
                    } else {
                        pirateStates.set(pirate.UUID, 'PATHING')
                    }
                } else {
                    node = path.getNextNode()
                }
                if (DEBUG_SHIP_PATHS) {
                    pirate.level.setBlockAndUpdate(
                        new BlockPos(node.x, pirate.y + 6, node.z),
                        Blocks.ICE.defaultBlockState()
                    )
                }
            }

            let f = ship.getSpeed()
            const speedFactor = 1
            const forward = ship.getForward().yRot(-90).normalize()
            const target = new Vec3d(node.x, 0, node.z)
            const boatPos = new Vec3d(ship.x, 0, ship.z)
            const toTarget = boatPos.subtract(target).normalize()

            const phi = horizontalAngleBetweenVectors(forward, toTarget)
            const ref = 63.5

            const inputLeft = phi < ref
            const inputRight = phi > ref
            const rotDelta = Math.abs(phi - ref)
            const inputUp = rotDelta <= ref * 0.35
            const inAngleForSail = rotDelta <= ref * 0.6

            const adjustment = Math.min(1.5, rotDelta)

            if (inputLeft) {
                ship.setYaw(ship.getYaw() - adjustment)
            }

            if (inputRight) {
                ship.setYaw(ship.getYaw() + adjustment)
            }

            if (inputRight != inputLeft && !inputUp) {
                f += 0.035 * speedFactor
            }

            if (inputUp) {
                f += 0.075 * speedFactor
            }

            let bob = Vec3d(
                Math.sin(-KMath.rad(ship.yaw) * f),
                0,
                Math.cos(KMath.rad(ship.yaw) * f)
            )
            //console.log(bob)
            ship.setDeltaMovement(ship.getDeltaMovement().add(bob))
            if (inAngleForSail) shipSetSpeed(ship, f)
            //boat.setPaddleState(inputRight || inputUp, inputLeft || inputUp)
            break
        }
        case 'ATTACKING': {
            if (!canAttack(pirate)) pirateStates.set(pirate.UUID, 'PATHING')
            break
        }
    }
}

EntityJSEvents.addGoalSelectors('minecraft:pillager', event => {
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
        'boat_stuff',
        1,
        boatCanUse,
        boatCanContinueToUse,
        true,
        boatStart,
        boatStop,
        true,
        boatTick
    )
})

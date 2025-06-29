const $BedSleepingProblem = Java.loadClass(
    'net.minecraft.world.entity.player.Player$BedSleepingProblem'
)
const $AABB = Java.loadClass('net.minecraft.world.phys.AABB')
// gross - Have to load class by intermediate name.
const Monster = Java.class.forName('net.minecraft.class_1588')

function getSleepProblem (event, bedPos) {
    if (!event.level.dimensionType().natural()) {
        return $BedSleepingProblem.NOT_POSSIBLE_HERE
    } else if (event.level.isDay()) {
        return $BedSleepingProblem.NOT_POSSIBLE_NOW
    } else {
        let vec3 = Vec3d.atBottomCenterOf(bedPos)
        if (
            !event.level
                .getEntitiesOfClass(
                    Monster,
                    new $AABB(
                        vec3.x() - 8.0,
                        vec3.y() - 5.0,
                        vec3.z() - 8.0,
                        vec3.x() + 8.0,
                        vec3.y() + 5.0,
                        vec3.z() + 8.0
                    ),
                    monster => monster.isPreventingPlayerRest(event.player)
                )
                .isEmpty()
        ) {
            return $BedSleepingProblem.NOT_SAFE
        }
    }
    return null
}

ItemEvents.entityInteracted(event => {
    const { player, item, target, level, server } = event
    if (
        !(
            (item.hasTag('minecraft:beds') || item.hasTag('comforts:sleeping_bags')) &&
            shipTypes.includes(target.type)
        )
    )
        return

    let ship = target
    let bedPos = new BlockPos(ship.x, ship.y + 1, ship.z)

    let problem = getSleepProblem(event, bedPos)
    if (problem != null) {
        if (problem.getMessage() != null) {
            player.displayClientMessage(problem.getMessage(), true)
        }
        event.cancel()
    }

    player.persistentData.put('fakeBedPos', {
        x: bedPos.x,
        y: bedPos.y,
        z: bedPos.z,
    })

    //The game will wake you up immediately if there isn't a bed in the position you started sleeping in. So we place a 'fake' bed.
    level.getBlock(bedPos).set('minecraft:red_bed')
    player.yRot = ship.yRot
    player.startSleeping(bedPos)

    // We are sleeping in a cheaty way, so we have to tell the ServerLevel to do a sleep status update.
    let serverLevel = server.getLevel(level.dimension)
    serverLevel.updateSleepingPlayerList()
    event.success()
})

/**
 *
 * @param {ItemEntityInteractedEventJS} event
 * @param {BlockPos} bedPos
 * @returns {Internal.Player$BedSleepingProblem}
 */

FabricAddedEvents.stopSleeping(event => {
    const { player, level } = event
    // Now we remove the fake bed!
    if (level.isClientSide()) return
    let pos = player.persistentData.getCompound('fakeBedPos')
    if (pos != undefined) level.getBlock(BlockPos(pos.x, pos.y, pos.z)).set('minecraft:air')
})

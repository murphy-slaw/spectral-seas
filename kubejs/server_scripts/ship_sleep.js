const BedSleepingProblem = Java.loadClass(
    'net.minecraft.world.entity.player.Player$BedSleepingProblem'
)
const $AABB = Java.loadClass('net.minecraft.world.phys.AABB')
// gross - Have to load class by intermediate name.
const Monster = Java.class.forName('net.minecraft.class_1588')

ItemEvents.entityInteracted(event => {
    let item = event.player.handSlots[0]
    if (
        !(
            (item.hasTag('minecraft:beds') ||
                item.hasTag('comforts:sleeping_bags')) &&
            shipTypes.includes(event.target.type)
        )
    )
        return

    let ship = event.target
    let bedPos = new BlockPos(ship.x, ship.y + 1, ship.z)

    let problem = getSleepProblem(event, bedPos)
    if (problem != null) {
        if (problem.getMessage() != null) {
            event.player.displayClientMessage(problem.getMessage(), true)
        }
        event.cancel()
    }

    let fakeBedPos = {
        x: bedPos.x,
        y: bedPos.y,
        z: bedPos.z,
    }
    event.player.persistentData.put('fakeBedPos', fakeBedPos)

    //The game will wake you up immediately if there isn't a bed in the position you started sleeping in. So we place a 'fake' bed.
    event.level.getBlock(bedPos).set('minecraft:red_bed')
    event.player.yRot = ship.yRot
    event.player.startSleeping(bedPos)

    // We are sleeping in a cheaty way, so we have to tell the ServerLevel to do a sleep status update.
    let levelName = event.level.dimension
    let serverLevel = event.server.getLevel(levelName)
    serverLevel.updateSleepingPlayerList()
    event.success()
})

function getSleepProblem (event, bedPos) {
    if (!event.level.dimensionType().natural()) {
        return BedSleepingProblem.NOT_POSSIBLE_HERE
    } else if (event.level.isDay()) {
        return BedSleepingProblem.NOT_POSSIBLE_NOW
    } else {
        let vec3 = Vec3d.atBottomCenterOf(bedPos)
        let monsters = event.level.getEntitiesOfClass(
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
        if (!monsters.isEmpty()) {
            return BedSleepingProblem.NOT_SAFE
        }
    }
    return null
}

FabricAddedEvents.stopSleeping(event => {
    // Now we remove the fake bed!
    let pos = event.player.persistentData.getCompound('fakeBedPos')
    if (pos === undefined) return
    let blockPos = BlockPos(pos.x, pos.y, pos.z)
    event.level.getBlock(blockPos).set('minecraft:air')
})

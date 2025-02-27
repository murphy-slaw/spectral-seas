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
    let fakeBedPos = {
        x: bedPos.x,
        y: bedPos.y,
        z: bedPos.z,
    }
    event.player.persistentData.put('fakeBedPos', fakeBedPos)

    //The game will wake you up immediately if there isn't a bed in the position you started sleeping in. So we place a 'fake' bed.
    event.level.getBlock(bedPos).set('minecraft:red_bed')
    event.player.startSleeping(bedPos)

    // We are sleeping in a cheaty way, so we have to tell the ServerLevel to do a sleep status update.
    let levelName = event.level.dimension
    let serverLevel = event.server.getLevel(levelName)
    serverLevel.updateSleepingPlayerList()
    event.success()
})

FabricAddedEvents.stopSleeping(event => {
    // Now we remove the fake bed!
    let pos = event.player.persistentData.getCompound('fakeBedPos')
    let blockPos = BlockPos(pos.x, pos.y, pos.z)
    event.level.getBlock(blockPos).set('minecraft:air')
})

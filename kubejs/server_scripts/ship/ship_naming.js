ItemEvents.entityInteracted('minecraft:potion', (event) => {
    if (event.item.nbt.display === undefined) return
    if (shipTypes.includes(event.target.type)) {
        let ship = event.target

        let shipNBT = ship.nbt
        shipNBT.put('CustomName', event.item.nbt.display.get('Name'))
        ship.setNbt(shipNBT)

        event.item.shrink(1)
        event.level.playSound(
            null,
            ship.x,
            ship.y,
            ship.z,
            'minecraft:block.glass.break',
            'ambient',
            1,
            1
        )
        event.cancel()
    }
})

ItemEvents.entityInteracted('minecraft:name_tag', (event) => {
    if (shipTypes.includes(event.target.type)) event.cancel()
})

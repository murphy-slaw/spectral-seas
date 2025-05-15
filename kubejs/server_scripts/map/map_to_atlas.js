PlayerEvents.inventoryChanged('minecraft:filled_map', event => {
    let mapNbt = event.item.getNbt()
    let seenMaps = event.player.persistentData.getCompound('seenMaps')
    /** @type {Internal.Component} */
    let name = mapNbt.display.Name

    if (!(seenMaps && seenMaps.get(mapNbt.map))) {
        mapNbt.Decorations.forEach(decoration => {
            event.player.sendData('AddMarker', {
                texture: 'antique_atlas:custom/red_x_small',
                pos: { x: decoration.x, y: 64, z: decoration.z },
                label: name,
            })
            event.player.sendData('OpenMap', {
                x: decoration.x,
                z: decoration.z,
            })
        })
        seenMaps.putBoolean(mapNbt.map, true)
        event.player.persistentData.put('seenMaps', seenMaps)
    }
})

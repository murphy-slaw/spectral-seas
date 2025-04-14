PlayerEvents.inventoryChanged('minecraft:filled_map', event => {
    let mapNbt = event.item.getNbt()
    let seenMaps = event.player.persistentData.getCompound('seenMaps')
    let name = JSON.parse(mapNbt.display.Name)
    name.text += ' Destination'

    if (!(seenMaps && seenMaps.get(mapNbt.map))) {
        mapNbt.Decorations.forEach(decoration => {
            event.player.sendData('AddMarker', {
                texture: 'antique_atlas:custom/red_x_small',
                pos: { x: decoration.x, y: 64, z: decoration.z },
                color: name.color,
                label: name.text,
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

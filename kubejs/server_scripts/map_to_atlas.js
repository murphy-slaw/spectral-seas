PlayerEvents.inventoryChanged('minecraft:filled_map', event => {
    let map = event.item.getNbt()
    let mapNumber = map.get('map')
    let seenMaps = event.player.persistentData.getCompound('seenMaps')
    let display = map.display
    let name = JSON.parse(display.Name)
    name.text += ' Destination'

    if (!(seenMaps && seenMaps.get(mapNumber))) {
        map['Decorations'].forEach(decoration => {
            let pos = Vec3i(decoration.x, 64, decoration.z)
            addAntiqueAtlasMarker(
                event.level,
                'antique_atlas:custom/red_x_small',
                pos,
                name.color,
                Component.of(name)
            )
            event.player.sendData('OpenMap', { x: pos.x, z: pos.z })
        })
        seenMaps.putBoolean(mapNumber, true)
        event.player.persistentData.put('seenMaps', seenMaps)
    }
})

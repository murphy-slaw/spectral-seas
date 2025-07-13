PlayerEvents.inventoryChanged('minecraft:filled_map', (event) => {
    const { player, item } = event
    let mapNbt = item.getNbt()
    let seenMaps = player.persistentData.getCompound('seenMaps')
    /** @type {Internal.Component} */
    let name = mapNbt.display.Name
    let color = JSON.parse(name).color

    if (!(seenMaps && seenMaps.get(mapNbt.map))) {
        mapNbt.Decorations.forEach((decoration) => {
            player.sendData('AddMarker', {
                texture: 'antique_atlas:custom/red_x_small',
                pos: { x: decoration.x, y: 64, z: decoration.z },
                label: name,
                color: color,
            })
            player.sendData('OpenMap', {
                x: decoration.x,
                z: decoration.z,
            })
        })
        seenMaps.putBoolean(mapNbt.map, true)
        player.persistentData.put('seenMaps', seenMaps)
    }
})

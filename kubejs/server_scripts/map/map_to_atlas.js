const X_MARKER = 'antique_atlas:custom/red_x_small'

PlayerEvents.inventoryChanged('minecraft:filled_map', (event) => {
    const { player, item } = event
    const mapNbt = item.getNbt()
    const seenMaps = player.persistentData.getCompound('seenMaps')
    /** @type {Internal.Component} */
    const name = mapNbt.display.Name
    const color = JSON.parse(name).color
    const wPlayer = PlayerHelper(player)

    if (!(seenMaps && seenMaps.get(mapNbt.map))) {
        mapNbt.Decorations.forEach((decoration) => {
            const id = wPlayer.getMarkerLocation(
                X_MARKER,
                color,
                BlockPos(decoration.x, 64, decoration.z)
            )
            player.sendData('AddMarker', {
                location: id,
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

PlayerEvents.inventoryChanged('minecraft:filled_map', event => {
    let map = event.item
    let mapNbt = map.getNbt()
    console.log(mapNbt)
    let mapNumber = mapNbt.getInt('map')
    let seenMaps = event.player.persistentData.getCompound('seenMaps')
    let dimension = event.level.dimensionKey
    if (!seenMaps.getBoolean(mapNumber)) {
        let decorations = mapNbt.get('Decorations')
        decorations.forEach(decoration => {
            addAntiqueAtlasMarker(
                event.level,
                'antique_atlas:custom/scroll',
                BlockPos(
                    Math.floor(decoration.x),
                    64,
                    Math.floor(decoration.z)
                ),
                DyeColor.RED,
                'moose'
            )
            console.log(decoration)
            if (mapNbt.get('dimension') == dimension) {
                console.log(dimension)
            }
        })
        seenMaps.putBoolean(mapNumber, true)
    }
})

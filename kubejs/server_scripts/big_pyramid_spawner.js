MoreJSEvents.structureLoad(event => {
    if (event.id === 'mostructures:pyramid/base') {
        event.forEachPalettes(palette => {
            palette.forEach(blockInfo => {
                if (blockInfo.block === Blocks.SPAWNER) {
                    const nbt = blockInfo.nbt()
                    nbt.put('SpawnData', { entity: { id: 'rottencreatures:mummy' } })
                    nbt.remove('SpawnPotentials')
                    blockInfo.setNbt(nbt)
                }
            })
        })
    }
})

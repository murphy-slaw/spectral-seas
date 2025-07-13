StartupEvents.registry('block', (event) => {
    event
        .create('spectral_seas:grave_dirt')
        .displayName('Grave Dirt')
        .hardness(0.5)
        .resistance(0.5)
        .requiresTool(true)
        .tagBlock('minecraft:mineable/shovel')
        .textureAll('minecraft:block/dirt')
        .gravelSoundType()
        .blockEntity((entityInfo) => {
            entityInfo.serverTick(60, 0, (entityEvent) => global.reloadableParticle(entityEvent))
        })
})

global.reloadableParticle = (entityEvent) => {
    let pos = entityEvent.blockPos.above()
    if (entityEvent.tick % 4 === 0 && entityEvent.level.getBlock(pos) === 'minecraft:air') {
        entityEvent.level.runCommandSilent(
            `particle soul ${pos.x} ${pos.y + 0.2} ${pos.z} 0.001 0.01 0.001 0.01 1`
        )
    }
}

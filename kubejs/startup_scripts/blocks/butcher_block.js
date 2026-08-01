StartupEvents.registry('block', (event) => {
    event
        .create('spectral_seas:butcher_block')
        .hardness(0.8)
        .resistance(0.5)
        .requiresTool(false)
        .soundType(SoundType.WOOD)
})

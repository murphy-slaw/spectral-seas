const colors = [
    'black',
    'blue',
    'brown',
    'cyan',
    'gray',
    'green',
    'light_blue',
    'light_gray',
    'lime',
    'magenta',
    'orange',
    'pink',
    'purple',
    'red',
    'white',
    'yellow',
]
StartupEvents.registry('block', (event) => {
    event
        .create('spectral_seas:canvas_block')
        .hardness(0.8)
        .resistance(0.5)
        .requiresTool(false)
        .textureAll('farmersdelight:block/canvas_rug')
        .soundType(SoundType.WOOL)

    for (let i in colors) {
        event
            .create(`spectral_seas:${colors[i]}_canvas_block`)
            .hardness(0.8)
            .resistance(0.5)
            .requiresTool(false)
            .textureAll(`spectral_seas:block/${colors[i]}_canvas`)
            .soundType(SoundType.WOOL)
    }
})

const WOOD_TYPES = [
    'acacia',
    'azalea',
    'bamboo',
    'birch',
    'cherry',
    'coconut',
    'dark_oak',
    'flowering_azalea',
    'jungle',
    'mangrove',
    'oak',
    'spruce',
    'walnut',
]

StartupEvents.registry('minecraft:item', (event) => {
    WOOD_TYPES.forEach((type) => {
        event
            .create(`spectral_seas:${type}_hull_section`)
            .maxStackSize(1)
            .tag('spectral_seas:hull_sections')
    })
})

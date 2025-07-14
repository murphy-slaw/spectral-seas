const PATTERNS = {
    Patterns: [{ Pattern: 'sku', Color: 0 }],
}

MoreJSEvents.structureLoad((event) => {
    event.forEachPalettes((palette) => {
        palette.forEach((blockInfo) => {
            let props = blockInfo.getProperties()
            if (blockInfo.block === Blocks.WHITE_WALL_BANNER) {
                blockInfo.setBlock('black_wall_banner', props)
                blockInfo.setNbt(PATTERNS)
            } else if (blockInfo.block === Blocks.WHITE_BANNER) {
                blockInfo.setBlock('supplementaries:flag_black', props)
                blockInfo.setNbt(PATTERNS)
            }
        })
    })
})

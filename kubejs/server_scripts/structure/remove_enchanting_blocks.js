MoreJSEvents.structureLoad((event) => {
    event.forEachPalettes((palette) => {
        palette.forEach((blockInfo) => {
            if (blockInfo.block === Blocks.ENCHANTING_TABLE) {
                blockInfo.setBlock('cartography_table')
            } else if (blockInfo.block === Blocks.CHISELED_BOOKSHELF) {
                blockInfo.setBlock('bookshelf')
            }
        })
    })
})

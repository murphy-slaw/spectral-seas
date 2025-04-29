const randomBook = () => {
    return Utils.randomOf(Utils.random, [
        'minecraft:book',
        'minecraft:book',
        'minecraft:book',
        'minecraft:writable_book',
        'minecraft:writable_book',
        'spectrum:gilded_book',
    ])
}

MoreJSEvents.structureLoad(event => {
    if (!event.id.contains('witch_tower')) return
    event.forEachPalettes(palette => {
        palette.forEach(blockInfo => {
            if (blockInfo.block === Blocks.ENCHANTING_TABLE) {
                blockInfo.setBlock('cartography_table')
            } else if (blockInfo.block === Blocks.CHISELED_BOOKSHELF) {
                let nbt = blockInfo.getNbt().copy()
                let props = blockInfo.getProperties()
                /** @type {Internal.ListTag} Items */
                if (nbt.Items.isEmpty()) {
                    console.log('There were no books')
                    for (let i = 0; i < 6; i++) {
                        nbt.Items.add(i, {
                            Slot: i,
                            Id: randomBook(),
                            Count: 1,
                        })
                        props[`slot_${i}_occupied`] = true
                    }
                } else {
                    console.log('There were books')
                    for (let i = 0; i < nbt.Items.size(); i++) {
                        let book = nbt.Items.get(i)
                        book.id = randomBook()
                        book.tag = NBT.compoundTag()
                        nbt.Items.set(i, book)
                    }
                }
                blockInfo.setNbt(nbt)
                blockInfo.setBlock(blockInfo.id, props)
                console.log(`Final BlockInfo ${blockInfo}`)
            }
        })
    })
})

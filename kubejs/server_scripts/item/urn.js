BlockEvents.rightClicked(undefined, event => {
    if (event.level.isClientSide()) return
    if (event.facing === Direction.UP && event.item.id === 'supplementaries:urn') {
        let urn = Block.getBlock('supplementaries:urn').defaultBlockState()
        let pos = event.block.up.pos
        event.level.setBlockAndUpdate(pos, urn)
        let newblock = event.level.getBlock(pos)
        newblock.set('supplementaries:urn', { treasure: true })
        newblock.setEntityData(event.item.nbt)
        event.item.shrink(1)
    }
})

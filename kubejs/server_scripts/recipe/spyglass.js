ServerEvents.recipes((event) => {
    event.remove({ output: 'minecraft:spyglass' })
    event.shaped(Item.of('minecraft:spyglass'), ['  G', ' C ', 'C  '], {
        G: '#spectrum:gemstone_shards',
        C: 'minecraft:copper_ingot',
    })
})

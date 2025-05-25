ServerEvents.recipes(event => {
    event.remove({ output: 'mermod:sea_crystal' })
    event.shaped(Item.of('mermod:sea_crystal', 4), ['PSP', 'SCS', 'PSP'], {
        P: 'minecraft:prismarine_shard',
        S: 'minecraft:scute',
        C: 'minecraft:conduit',
    })

    event.remove({ output: 'mermod:sea_necklace' })
    event.shaped(Item.of('mermod:sea_necklace'), [' G ', 'G G', ' S '], {
        G: 'minecraft:gold_ingot',
        S: 'mermod:sea_crystal',
    })
})

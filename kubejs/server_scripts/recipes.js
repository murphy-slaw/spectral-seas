ServerEvents.recipes(event =>{
    event.remove({output:'minecraft:spyglass'})
    event.shaped(
        Item.of('minecraft:spyglass'),
        [
            '  G',
            ' C ',
            'C  '
        ],
        {
            'G': '#spectrum:gemstone_shards',
            'C': 'minecraft:copper_ingot'
        }
    )

    event.remove({output: 'minecraft:lead'})
    event.shapeless(
        "minecraft:lead",[
        "supplementaries:rope",
        "minecraft:slime_ball",
        ]
    )

    event.remove({output: 'comforts:rope_and_nail'})
    event.shapeless(
        "comforts:rope_and_nail",[
        "supplementaries:rope",
        "minecraft:iron_ingot",
        ]
    )

    event.remove({output: 'smallships:bamboo_cog'})
    event.remove({output: 'smallships:bamboo_galley'})
    event.shaped(
        Item.of('smallships:bamboo_galley'),
        ['lll', 'cSc','bbb'],
        {
            'S': 'smallships:sail',
            'c': 'minecraft:chest',
            'l': 'minecraft:lead',
            'b': 'minecraft:bamboo_raft'
        }
    )

    event.shaped(
        Item.of('smallships:bamboo_cog'),
        ['lSl', 'bbb'],
        {
            'S': 'smallships:sail',
            'l': 'minecraft:lead',
            'b': 'minecraft:bamboo_raft'
        }
    )
})
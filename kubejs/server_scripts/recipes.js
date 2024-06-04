ServerEvents.recipes(event =>{
    event.replaceInput(
        {output: '#smallships:ships'},
        'minecraft:lead',
        'minecraft:leather'
   )

   event.replaceInput(
        {output:'smallships:sail'},
        'minecraft:lead',
        'minecraft:string'
   )

    var brigg_pattern = ["sls","bbb","ccc"]
    const brigg_key = {
        s: 'smallships:sail',
        l: 'minecraft:leather',
        c: 'minecraft:chest',
    }
    event.remove({output: '#smallships:briggs'})
    event.remove({output: 'smallships:bamboo_cog'})
    event.remove({output: 'smallships:bamboo_drakkar'})
    event.remove({output: 'smallships:bamboo_galley'})

    for (const wood of ['acacia','oak','spruce','jungle','dark_oak','birch','cherry','mangrove']){
        var stripped = 'minecraft:stripped_' + wood + '_log'
        event.replaceInput(
            {output: '#smallships:ships'},
            'minecraft:'+ wood + '_boat',
            stripped
        )

        var cur_key = Object.assign({}, brigg_key)
        cur_key['b'] = stripped
        event.shaped(
            Item.of('smallships:' + wood + '_brigg'),
            brigg_pattern,
            cur_key
        )
    }

    var b_key = Object.assign({}, brigg_key)
    b_key['b'] = 'minecraft:stripped_bamboo_block'
    event.shaped(
        Item.of('smallships:bamboo_brigg'),
        brigg_pattern,
        b_key
    )

    event.shaped(
        Item.of('smallships:bamboo_drakkar'),
        ['sSs','clc','bbb'],
        {
            's': 'minecraft:string',
            'S': 'smallships:sail',
            'c': 'minecraft:chest',
            'l': 'minecraft:leather',
            'b': 'minecraft:stripped_bamboo_block'
        }
    )

    event.shaped(
        Item.of('smallships:bamboo_galley'),
        ['lll', 'cSc','bbb'],
        {
            'S': 'smallships:sail',
            'c': 'minecraft:chest',
            'l': 'minecraft:leather',
            'b': 'minecraft:stripped_bamboo_block'
        }
    )

    event.shaped(
        Item.of('smallships:bamboo_cog'),
        ['lSl', 'bbb'],
        {
            'S': 'smallships:sail',
            'l': 'minecraft:leather',
            'b': 'minecraft:stripped_bamboo_block'
        }
    )

})
ServerEvents.recipes(event =>{
    var brigg_pattern = ["sls","bbb","ccc"]
    const brigg_key = {
        s: 'smallships:sail',
        l: 'minecraft:leather',
        c: 'minecraft:chest',
    }
    event.remove({output: 'smallships:bamboo_cog'})
    event.remove({output: 'smallships:bamboo_drakkar'})
    event.remove({output: 'smallships:bamboo_galley'})

    event.shaped(
        Item.of('smallships:bamboo_drakkar'),
        ['sSs','clc','bbb'],
        {
            's': 'minecraft:string',
            'S': 'smallships:sail',
            'c': 'minecraft:chest',
            'l': 'minecraft:lead',
            'b': 'minecraft:bamboo_raft'
        }
    )

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
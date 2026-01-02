const SHIP_WOOD_TYPES = [
    'acacia',
    'bamboo',
    'birch',
    'cherry',
    'dark_oak',
    'jungle',
    'mangrove',
    'oak',
    'spruce',
]

ServerEvents.recipes((event) => {
    event.shaped(Item.of('spectral_seas:rigging'), [' R ', ' S ', ' I '], {
        R: 'supplementaries:rope',
        S: 'minecraft:slime_ball',
        I: ['minecraft:copper_ingot', 'minecraft:iron_ingot'],
    })
    event.replaceInput({ output: 'smallships:sail' }, 'minecraft:lead', 'supplementaries:rope')
    event.replaceInput(
        { output: ['#smallships:cogs', '#smallships:galleys', '#smallships:drakkars'] },
        'minecraft:lead',
        'spectral_seas:rigging'
    )

    event.remove({ output: 'smallships:bamboo_cog' })
    event.remove({ output: 'smallships:bamboo_galley' })
    event.shaped(Item.of('smallships:bamboo_galley'), ['RRR', 'cSc', 'bbb'], {
        S: 'smallships:sail',
        c: 'minecraft:chest',
        R: 'spectral_seas:rigging',
        b: 'minecraft:bamboo_raft',
    })

    event.shaped(Item.of('smallships:bamboo_cog'), ['RSR', 'bbb'], {
        S: 'smallships:sail',
        R: 'spectral_seas:rigging',
        b: 'minecraft:bamboo_raft',
    })

    for (const wood of SHIP_WOOD_TYPES) {
        event.remove({ output: `smallships:${wood}_brigg` })
        event.shaped(Item.of(`smallships:${wood}_brigg`), ['sSR', 'CcC'], {
            s: 'spectral_seas:ship_speed_upgrade',
            S: 'smallships:sail',
            R: 'spectral_seas:rigging',
            C: 'spectral_seas:ship_cargo_upgrade',
            c: `smallships:${wood}_cog`,
        })
    }
})

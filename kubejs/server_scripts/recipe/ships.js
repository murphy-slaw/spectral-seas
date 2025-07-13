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
    event.remove({ output: 'smallships:bamboo_cog' })
    event.remove({ output: 'smallships:bamboo_galley' })
    event.shaped(Item.of('smallships:bamboo_galley'), ['lll', 'cSc', 'bbb'], {
        S: 'smallships:sail',
        c: 'minecraft:chest',
        l: 'minecraft:lead',
        b: 'minecraft:bamboo_raft',
    })

    event.shaped(Item.of('smallships:bamboo_cog'), ['lSl', 'bbb'], {
        S: 'smallships:sail',
        l: 'minecraft:lead',
        b: 'minecraft:bamboo_raft',
    })

    for (const wood of SHIP_WOOD_TYPES) {
        event.remove({ output: `smallships:${wood}_brigg` })
        event.shaped(Item.of(`smallships:${wood}_brigg`), ['sS ', 'CcC'], {
            s: 'spectral_seas:ship_speed_upgrade',
            S: 'smallships:sail',
            C: 'spectral_seas:ship_cargo_upgrade',
            c: `smallships:${wood}_cog`,
        })
    }
})

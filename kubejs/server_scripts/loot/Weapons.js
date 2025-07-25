// eslint-disable-next-line no-unused-vars
const Weapons = (function () {
    const DIAMOND = [
        'minecraft:diamond_axe',
        'minecraft:diamond_sword',
        'simplyswords:diamond_longsword',
        'simplyswords:diamond_rapier',
        'simplyswords:diamond_cutlass',
        'tridents_n_stuff:diamond_spear',
    ]

    const IRON = [
        'minecraft:iron_axe',
        'minecraft:iron_sword',
        'simplyswords:iron_longsword',
        'simplyswords:iron_rapier',
        'simplyswords:iron_cutlass',
        'tridents_n_stuff:iron_spear',
    ]

    const GOLDEN = [
        'minecraft:golden_axe',
        'minecraft:golden_sword',
        'simplyswords:golden_longsword',
        'simplyswords:golden_rapier',
        'simplyswords:golden_cutlass',
        'tridents_n_stuff:golden_spear',
    ]

    const STONE = [
        'minecraft:stone_axe',
        'minecraft:stone_sword',
        'simplyswords:stone_longsword',
        'simplyswords:stone_rapier',
        'simplyswords:stone_cutlass',
        'tridents_n_stuff:stone_spear',
    ]

    const WOODEN = [
        'minecraft:wooden_axe',
        'minecraft:wooden_sword',
        'simplyswords:wooden_longsword',
        'simplyswords:wooden_rapier',
        'simplyswords:wooden_cutlass',
        'tridents_n_stuff:wooden_spear',
    ]

    const BLACKPOWDER_BASIC = ['musketmod:pistol', 'musketmod:musket', 'musketmod:blunderbuss']

    const BLACKPOWDER_ALL = BLACKPOWDER_BASIC.concat([
        'musketmod:musket_with_scope',
        'musketmod:musket_with_bayonet',
    ])
    const BLACKPOWDER_LONGARMS = [
        'musketmod:musket',
        'musketmod:musket_with_scope',
        'musketmod:musket_with_bayonet',
        'musketmod:blunderbuss',
    ]

    return {
        DIAMOND: DIAMOND,
        IRON: IRON,
        GOLDEN: GOLDEN,
        STONE: STONE,
        WOODEN: WOODEN,
        BLACKPOWDER_BASIC: BLACKPOWDER_BASIC,
        BLACKPOWDER_ALL: BLACKPOWDER_ALL,
        BLACKPOWDER_LONGARMS: BLACKPOWDER_LONGARMS,
    }
})()

/** @param {Internal.LootContextJS} ctx */
const lookoutPost = (ctx) => {
    console.log('lookout_post')
    return [].concat([
        LootEntry.of('musketmod:pistol')
            .when((c) => c.randomChance(0.5))
            .limitCount([1, 2]),
        LootEntry.of('musketmod:paper_cartridge')
            .when((c) => c.randomChance(0.7))
            .limitCount([2, 7]),
        LootEntry.of('musketmod:musket_upgrade_smithing_template')
            .when((c) => c.randomChance(0.3))
            .limitCount([1, 2]),
        LootEntry.of('experience_bottle')
            .when((c) => c.randomChance(0.5))
            .limitCount([1, 3]),
        LootEntry.of('spyglass').when((c) => c.randomChance(0.7)),
        LootEntry.of('compass').when((c) => c.randomChance(0.5)),
        LootEntry.of('galosphere:barometer').when((c) => c.randomChance(0.2)),
        LootEntry.of('spectral_seas:ship_speed_upgrade').when((c) => c.randomChance(0.2)),
        LootEntry.of('spectral_seas:ship_cargo_upgrade').when((c) => c.randomChance(0.15)),
        LootEntry.of('sentry_armor_trim_template').when((c) => c.randomChance(0.2)),
        LootEntry.of('string')
            .when((c) => c.randomChance(0.7))
            .limitCount([2, 5]),
        LootEntry.of('supplementaries:rope')
            .when((c) => c.randomChance(0.7))
            .limitCount([1, 2]),
        LootEntry.of('iron_ingot')
            .when((c) => c.randomChance(0.7))
            .limitCount([1, 3]),
        LootEntry.of('gold_ingot')
            .when((c) => c.randomChance(0.5))
            .limitCount([1, 3]),
        LootEntry.of('gold_nugget')
            .when((c) => c.randomChance(0.7))
            .limitCount([3, 8]),
        LootEntry.of('bread')
            .when((c) => c.randomChance(0.7))
            .limitCount([1, 5]),
        LootEntry.of('flint_and_steel').when((c) => c.randomChance(0.7)),
        Loot.randomEntryOf(['iron_shovel', 'stone_axe']).when((c) => c.randomChance(0.7)),
        LootEntry.of('goat_horn')
            .addNbt({
                instrument: Loot.randomOf([
                    'ponder_goat_horn',
                    'sing_goat_horn',
                    'seek_goat_horn',
                    'feel_goat_horn',
                ]),
            })
            .when((c) => c.randomChance(0.7)),
    ])
}

/** @param {Internal.LootContextJS} ctx */
const armoryCache = (ctx) => {
    return [].concat([
        Loot.randomEntryOf(['stone_cutlass', 'stone_axe'])
            .when((c) => c.randomChance(0.7))
            .limitCount([1, 3]),
        Loot.randomSetOf(ArmorSets.IRON, 0.2, [0.25, 0.75]),
        Loot.randomEntryOf(['iron_cutlass', 'iron_axe'])
            .when((c) => c.randomChance(0.5))
            .damage([0.6, 0.75]),
        LootEntry.of('gunpowder')
            .when((c) => c.randomChance(0.8))
            .limitCount([2, 8]),
        LootEntry.of('charcoal')
            .when((c) => c.randomChance(0.8))
            .limitCount([2, 8]),
        LootEntry.of('leather')
            .when((c) => c.randomChance(0.7))
            .limitCount([1, 3]),
        LootEntry.of('chain')
            .when((c) => c.randomChance(0.5))
            .limitCount([1, 3]),
        LootEntry.of('musketmod:musket_upgrade_smithing_template')
            .when((c) => c.randomChance(0.2))
            .limitCount([1, 2]),
        LootEntry.of('shield')
            .when((c) => c.randomChance(0.5))
            .damage([0.75, 1]),
        LootEntry.of('tnt')
            .when((c) => c.randomChance(0.5))
            .limitCount([1, 3]),
        LootEntry.of('supplementaries:bomb')
            .when((c) => c.randomChance(0.5))
            .limitCount([1, 2]),
        LootEntry.of('supplementaries:blue_bomb').when((c) => c.randomChance(0.3)),
        Loot.randomEntryOf(pillagerHats).when((c) => c.randomChance(0.25)),
        LootEntry.of('dark_oak_log')
            .when((c) => c.randomChance(0.5))
            .limitCount([4, 16]),
        LootEntry.of('iron_nugget')
            .when((c) => c.randomChance(0.7))
            .limitCount([3, 8]),
        LootEntry.of('paper')
            .when((c) => c.randomChance(0.7))
            .limitCount([3, 8]),
    ])
}

/** @param {Internal.LootContextJS} ctx */
const supplyChest = (ctx) => {
    return [].concat([
        LootEntry.of('cooked_cod')
            .when((c) => {
                c.randomChance(0.5)
            })
            .limitCount([2, 5]),
        LootEntry.of('cooked_salmon')
            .when((c) => {
                c.randomChance(0.3)
            })
            .limitCount([2, 5]),
        LootEntry.of('hybrid-aquatic:cooked_fish_steak')
            .when((c) => {
                c.randomChance(0.3)
            })
            .limitCount([2, 5]),
        LootEntry.of('hybrid-aquatic:cooked_fish_meat')
            .when((c) => {
                c.randomChance(0.7)
            })
            .limitCount([2, 5]),
        LootEntry.of('dried_kelp')
            .when((c) => {
                c.randomChance(0.7)
            })
            .limitCount([3, 8]),
        LootEntry.of('poisonous_potato')
            .when((c) => {
                c.randomChance(0.7)
            })
            .limitCount([3, 8]),
        LootEntry.of('potato')
            .when((c) => {
                c.randomChance(0.5)
            })
            .limitCount([2, 5]),
        LootEntry.of('carrot')
            .when((c) => {
                c.randomChance(0.5)
            })
            .limitCount([2, 5]),
        Loot.potionOf('water')
            .when((c) => c.randomChance(0.7))
            .limitCount([3, 8]),
        LootEntry.of('milk:milk_bottle')
            .when((c) => c.randomChance(0.7))
            .limitCount([3, 8]),
        LootEntry.of('torch')
            .when((c) => c.randomChance(0.7))
            .limitCount([4, 16]),
        LootEntry.of('lantern')
            .when((c) => c.randomChance(0.3))
            .limitCount([1, 3]),
        LootEntry.of('gold_nugget')
            .when((c) => c.randomChance(0.7))
            .limitCount([4, 12]),
        LootEntry.of('minecraft:potion').addPotion('spectral_seas:grog').limitCount([1, 3]),
    ])
}

LootJS.modifiers((event) => {
    Loot.smartReplacePools(event, 'minecraft:chests/pillager_outpost', [lookoutPost])
    Loot.smartReplacePools(event, 'kaisyn:outpost/common/armory', [armoryCache])
    Loot.smartReplacePools(event, 'kaisyn:outpost/common/food', [supplyChest])
})

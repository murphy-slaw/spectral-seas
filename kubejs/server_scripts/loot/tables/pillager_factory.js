/** @param {Internal.LootContextJS} ctx */
const raw_materials = ctx => {
    return [].concat.apply(
        [],
        [
            LootEntry.of('raw_iron')
                .when(c => c.randomChance(0.7))
                .limitCount([3, 6]),
            LootEntry.of('iron_nugget')
                .when(c => c.randomChance(0.7))
                .limitCount([5, 10]),
            LootEntry.of('copper_ingot')
                .when(c => c.randomChance(0.7))
                .limitCount([4, 8]),
            LootEntry.of('charcoal')
                .when(c => c.randomChance(0.7))
                .limitCount([10, 20]),
            LootEntry.of('gunpowder')
                .when(c => c.randomChance(0.7))
                .limitCount([4, 8]),
            LootEntry.of('paper')
                .when(c => c.randomChance(0.7))
                .limitCount([5, 15]),
            LootEntry.of('string')
                .when(c => c.randomChance(0.7))
                .limitCount([3, 5]),
            LootEntry.of('white_wool')
                .when(c => c.randomChance(0.7))
                .limitCount([3, 6]),
            LootEntry.of('cauldron').when(c => c.randomChance(0.4)),
            LootEntry.of('chipped_anvil').when(c => c.randomChance(0.2)),
            LootEntry.of('bucket')
                .limitCount([1, 2])
                .when(c => c.randomChance(0.7)),
            LootEntry.of('dark_oak_log').limitCount([4, 8]),
            Loot.randomEntryOf(Tools.IRON).limitCount([1, 2]).damage([0.5, 1]),
        ]
    )
}

/** @param {Internal.LootContextJS} ctx */
const finished_goods = ctx => {
    return [].concat.apply(
        [],
        [
            LootEntry.of('smallships:cannon')
                .when(c => c.randomChance(0.7))
                .limitCount([1, 2]),
            LootEntry.of('smallships:cannon_ball')
                .when(c => c.randomChance(0.7))
                .limitCount([4, 10]),
            LootEntry.of('iron_block')
                .when(c => c.randomChance(0.5))
                .limitCount([1, 2]),
            Loot.randomEntryOf([
                'musketmod:musket',
                'musketmod:pistol',
                'musketmod:blunderbuss',
            ]).limitCount([1, 3]),
            LootEntry.of('brush')
                .when(c => c.randomChance(0.7))
                .limitCount([1, 2]),
            LootEntry.of('tridents_n_stuff:wooden_spear')
                .when(c => c.randomChance(0.7))
                .limitCount([1, 3]),
            LootEntry.of('tnt')
                .when(c => c.randomChance(0.7))
                .limitCount([2, 5]),
            LootEntry.of('fire_charge')
                .when(c => c.randomChance(0.7))
                .limitCount([2, 4]),
            LootEntry.of('flint_and_steel').when(c => c.randomChance(0.7)),
            LootEntry.of('string')
                .when(c => c.randomChance(0.7))
                .limitCount([3, 5]),
            LootEntry.of('redstone')
                .when(c => c.randomChance(0.7))
                .limitCount([4, 8]),
            LootEntry.of('dark_oak_button')
                .when(c => c.randomChance(0.7))
                .limitCount([2, 6]),
            LootEntry.of('lever')
                .when(c => c.randomChance(0.7))
                .limitCount([2, 4]),
            LootEntry.of('goat_horn')
                .when(c => c.randomChance(0.7))
                .addNbt({
                    instrument: Loot.randomOf([
                        'ponder_goat_horn',
                        'sing_goat_horn',
                        'seek_goat_horn',
                        'feel_goat_horn',
                    ]),
                }),
            LootEntry.of('smallships:sail')
                .limitCount([1, 2])
                .when(c => c.randomChance(0.5)),
            LootEntry.of('spectral_seas:ship_cargo_upgrade').when(c => c.randomChance(0.8)),
        ]
    )
}

/** @param {Internal.LootContextJS} ctx */
const overseer_chest = ctx => {
    return [].concat.apply(
        [],
        [
            LootEntry.of('gold_ingot')
                .when(c => c.randomChance(0.7))
                .limitCount([3, 8]),
            LootEntry.of('gold_nugget')
                .when(c => c.randomChance(0.7))
                .limitCount([5, 15]),
            LootEntry.of('name_tag')
                .when(c => c.randomChance(0.7))
                .limitCount([2, 3]),
            LootEntry.of('clock').when(c => c.randomChance(0.7)),
            LootEntry.of('compass').when(c => c.randomChance(0.7)),
            LootEntry.of('spyglass').when(c => c.randomChance(0.7)),
            LootEntry.of('writable_book')
                .limitCount([1, 4])
                .when(c => c.randomChance(0.7)),
            Loot.randomEntryOf(pillagerHats)
                .when(c => c.randomChance(0.7))
                .limitCount([1, 2]),
            Loot.randomEntryOf(Weapons.BLACKPOWDER_ALL)
                .enchantWithLevels([20, 30])
                .limitCount([1, 2])
                .damage([0, 0.25]),
            LootEntry.of('minecraft:potion').addPotion('spectral_seas:grog').limitCount([1, 3]),
            LootEntry.of('minecraft:potion')
                .when(c => c.randomChance(0.7))
                .addPotion('staminafortweakers:tirelessness_potion')
                .limitCount([1, 3]),
        ]
    )
}

LootJS.modifiers(event => {
    Loot.smartReplacePools(event, 'mostructures:factory/supply', [raw_materials])
    Loot.smartReplacePools(event, 'mostructures:factory/finished', [finished_goods])
    Loot.smartReplacePools(event, 'mostructures:factory/overseer', [overseer_chest])
})

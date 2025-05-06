/** @param {Internal.LootContextJS} ctx */
const pharaoh_regalia = ctx => {
    console.log('pharaoh')
    return [
        Loot.randomEnchantedFrom(CHAINMAIL_ARMOR, CITRINE_ENCHANTS).damage([0, 1]),
        Loot.randomEnchantedFrom(DIAMOND_ARMOR, CITRINE_ENCHANTS).damage(0),
        LootEntry.of('minecraft:blue_dye').withChance(0.7).limitCount([2, 5]),
        LootEntry.of('minecraft:purple_dye').withChance(0.7),
        LootEntry.of('minecraft:honey_bottle').withChance(0.7).limitCount([2, 5]),
        LootEntry.of('minecraft:yellow_banner').withChance(0.7),
        LootEntry.of('minecraft:purple_banner').withChance(0.7),
        LootEntry.of('minecraft:blue_banner').withChance(0.7),
        LootEntry.of('supplementaries:urn')
            .addNbt({
                Items: [{ Slot: 0, Count: 5, id: 'minecraft:bone' }],
            })
            .withChance(0.7)
            .limitCount([1, 3]),
        LootEntry.of('artifacts:antidote_vessel').withChance(0.7),
        LootEntry.of('minecraft:gold_ingot').withChance(0.7).limitCount([1, 6]),
        LootEntry.of('minecraft:gold_block').withChance(0.7),
        LootEntry.of('minecraft:golden_carrot').withChance(0.7).limitCount([1, 5]),
        LootEntry.of('minecraft:golden_apple').withChance(0.7),
        LootEntry.of('minecraft:enchanted_golden_apple').withChance(0.05),
    ]
}

/** @param {Internal.LootContextJS} ctx */
const tomb_guardian_remains = ctx => {
    console.log('guardian')
    return [
        Loot.randomEnchantedFrom(
            ['simplyswords:iron_cutlass', 'tridents_n_stuff:iron_spear'],
            CITRINE_ENCHANTS
        )
            .damage([0.25, 0.5])
            .withChance(0.7),
        Loot.enchantedFrom('minecraft:shield', CITRINE_ENCHANTS)
            .damage([0.5, 0.75])
            .withChance(0.5),
        Loot.enchantedFrom('minecraft:golden_helmet', CITRINE_ENCHANTS)
            .addNbt({
                Trim: { material: Loot.randomOf(TRIM_MATERIAL), pattern: 'minecraft:dune' },
            })
            .withChance(0.7)
            .damage([0, 0.5])
            .withChance(0.5),
        Loot.randomEnchantedFrom(LEATHER_ARMOR, CITRINE_ENCHANTS).damage([0, 0.5]).withChance(0.7),
        LootEntry.of('bones').limitCount([3, 7]),
        LootEntry.of('rotten_flesh').limitCount([3, 7]),
        LootEntry.of('artifacts:crystal_heart').withChance(0.1),
    ]
}

/** @param {Internal.LootContextJS} ctx */
const court_librarian_cache = ctx => {
    console.log('librarian')
    return [
        LootEntry.of('spectrum:gilded_book').withChance(0.7).limitCount([1, 2]),
        LootEntry.of('minecraft:paper').withChance(0.7).limitCount([2, 6]),
        LootEntry.of('minecraft:writable_book').withChance(0.7),
        LootEntry.of('minecraft:book').withChance(0.7).limitCount([1, 3]),
        LootEntry.of('minecraft:ink_sac').withChance(0.7).limitCount([1, 3]),
        LootEntry.of('minecraft:feather').withChance(0.7).limitCount([2, 6]),
        LootEntry.of('minecraft:map').withChance(0.7).limitCount([1, 2]),
        LootEntry.of('minecraft:gold_ingot').withChance(0.7).limitCount([1, 3]),
        LootEntry.of('minecraft:brush').withChance(0.7),
        LootEntry.of('artifacts:obsidian_skull').withChance(0.1),
    ]
}

/** @param {Internal.LootContextJS} ctx */
const caravan_driver_kit = ctx => {
    console.log('caravan')
    return [
        LootEntry.of('minecraft:cooked_rabbit').withChance(0.7).limitCount([2, 5]),
        LootEntry.of('minecraft:bread').withChance(0.7).limitCount([3, 7]),
        Loot.potionOf('water').withChance(0.7).limitCount([3, 8]),
        LootEntry.of('minecraft:saddle').withChance(0.7),
        Loot.randomEntryOf([
            'minecraft:leather_horse_armor',
            'minecraft:iron_horse_armor',
            'minecraft:golden_horse_armor',
        ]),
        LootEntry.of('minecraft:spyglass').withChance(0.7),
        LootEntry.of('leather').withChance(0.7).limitCount([1, 4]),
        Loot.randomEnchantedFrom(
            ['minecraft:leather_boots', 'minecraft:leather_leggings'],
            ['minecraft:fire_protection']
        )
            .damage([0.5, 0.75])
            .withChance(0.7),
        Loot.randomEntryOf(['minecraft:iron_pickaxe', 'minecraft:iron_shovel']).limitCount([1, 2]),
    ]
}

/** @param {Internal.LootContextJS} ctx */
const tomb_treasury = ctx => {
    return [
        LootEntry.of('minecraft:iron_block').withChance(0.7),
        LootEntry.of('minecraft:gold_block').withChance(0.7).limitCount([1, 3]),
        LootEntry.of('minecraft:anvil').withChance(0.2),
        LootEntry.of('minecraft:iron_ingot').withChance(0.7).limitCount([2, 4]),
        LootEntry.of('minecraft:gold_ingot').withChance(0.7).limitCount([4, 8]),
        LootEntry.of('minecraft:dune_armor_trim_smithing_template')
            .withChance(0.7)
            .limitCount([1, 2]),
        Loot.randomEntryOf([
            'minecraft:chiseled_sandstone',
            'minecraft:smooth_sandstone',
            'minecraft:cut_sandstone',
            'archeologyplus:sandstone_hieroglyphs',
        ])
            .withChance(0.7)
            .limitCount([8, 24]),
        Loot.randomEntryOf([
            'minecraft:chiseled_red_sandstone',
            'minecraft:smooth_red_sandstone',
            'minecraft:cut_red_sandstone',
            'archeologyplus:red_sandstone_hieroglyphs',
        ])
            .withChance(0.7)
            .limitCount([8, 24]),
        LootEntry.of('minecraft:red_sand').withChance(0.7).limitCount([16, 32]),
    ]
}

LootJS.modifiers(event => {
    const pools = [
        pharaoh_regalia,
        tomb_guardian_remains,
        court_librarian_cache,
        caravan_driver_kit,
        tomb_treasury,
    ]
    Loot.smartReplacePools(event, 'minecraft:chests/desert_pyramid', pools)
})

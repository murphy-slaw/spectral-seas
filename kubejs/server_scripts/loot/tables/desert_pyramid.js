/** @param {Internal.LootContextJS} ctx */
const pharaoh_regalia = ctx => {
    console.log('pharaoh')
    return [
        Loot.randomEnchantedFrom(CHAINMAIL_ARMOR, CITRINE_ENCHANTS).damage([0, 1]),

        Loot.randomEnchantedFrom(DIAMOND_ARMOR, CITRINE_ENCHANTS).damage(0),

        LootEntry.of('minecraft:blue_dye')
            .when(c => c.randomChance(0.7))
            .limitCount([2, 5]),

        LootEntry.of('minecraft:purple_dye').when(c => c.randomChance(0.7)),

        LootEntry.of('minecraft:honey_bottle')
            .when(c => c.randomChance(0.7))
            .limitCount([2, 5]),

        LootEntry.of('minecraft:yellow_banner').when(c => c.randomChance(0.7)),

        LootEntry.of('minecraft:purple_banner').when(c => c.randomChance(0.7)),

        LootEntry.of('minecraft:blue_banner').when(c => c.randomChance(0.7)),

        LootEntry.of('supplementaries:urn', {
            Items: [{ Slot: 0, Count: 5, id: 'minecraft:bone' }],
        })
            .when(c => c.randomChance(0.7))
            .limitCount([1, 3]),

        LootEntry.of('artifacts:antidote_vessel').when(c => c.randomChance(0.7)),

        LootEntry.of('minecraft:gold_ingot')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 6]),

        LootEntry.of('minecraft:gold_block').when(c => c.randomChance(0.7)),

        LootEntry.of('minecraft:golden_carrot')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 5]),

        LootEntry.of('minecraft:golden_apple').when(c => c.randomChance(0.7)),

        LootEntry.of('minecraft:enchanted_golden_apple').when(c => c.randomChance(0.05)),
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
            .when(c => c.randomChance(0.7)),

        Loot.enchantedFrom('minecraft:shield', CITRINE_ENCHANTS)
            .damage([0.5, 0.75])
            .when(c => c.randomChance(0.5)),

        Loot.enchantedFrom('minecraft:golden_helmet', CITRINE_ENCHANTS)
            .addNbt({
                Trim: { material: Loot.randomOf(TRIM_MATERIAL), pattern: 'minecraft:dune' },
            })
            .when(c => c.randomChance(0.5))
            .damage([0, 0.5]),

        Loot.randomEnchantedFrom(LEATHER_ARMOR, CITRINE_ENCHANTS)
            .damage([0, 0.5])
            .when(c => c.randomChance(0.7)),

        LootEntry.of('bones').limitCount([3, 7]),

        LootEntry.of('rotten_flesh').limitCount([3, 7]),

        LootEntry.of('artifacts:crystal_heart').when(c => c.randomChance(0.1)),
    ]
}

/** @param {Internal.LootContextJS} ctx */
const court_librarian_cache = ctx => {
    console.log('librarian')
    return [
        LootEntry.of('spectrum:gilded_book')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 2]),

        LootEntry.of('minecraft:paper')
            .when(c => c.randomChance(0.7))
            .limitCount([2, 6]),

        LootEntry.of('minecraft:writable_book').when(c => c.randomChance(0.7)),

        LootEntry.of('minecraft:book')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 3]),

        LootEntry.of('minecraft:ink_sac')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 3]),

        LootEntry.of('minecraft:feather')
            .when(c => c.randomChance(0.7))
            .limitCount([2, 6]),

        LootEntry.of('minecraft:map')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 2]),

        LootEntry.of('minecraft:gold_ingot')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 3]),

        LootEntry.of('minecraft:brush').when(c => c.randomChance(0.7)),

        LootEntry.of('artifacts:obsidian_skull').when(c => c.randomChance(0.1)),
    ]
}

/** @param {Internal.LootContextJS} ctx */
const caravan_driver_kit = ctx => {
    console.log('caravan')
    return [
        LootEntry.of('minecraft:cooked_rabbit')
            .when(c => c.randomChance(0.7))
            .limitCount([2, 5]),

        LootEntry.of('minecraft:bread')
            .when(c => c.randomChance(0.7))
            .limitCount([3, 7]),

        Loot.potionOf('water')
            .when(c => c.randomChance(0.7))
            .limitCount([3, 8]),

        LootEntry.of('minecraft:saddle').when(c => c.randomChance(0.7)),

        Loot.randomEntryOf([
            'minecraft:leather_horse_armor',
            'minecraft:iron_horse_armor',
            'minecraft:golden_horse_armor',
        ]),

        LootEntry.of('minecraft:spyglass').when(c => c.randomChance(0.7)),

        LootEntry.of('leather')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 4]),

        Loot.randomEnchantedFrom(
            ['minecraft:leather_boots', 'minecraft:leather_leggings'],
            ['minecraft:fire_protection']
        )
            .damage([0.5, 0.75])
            .when(c => c.randomChance(0.7)),

        Loot.randomEntryOf(['minecraft:iron_pickaxe', 'minecraft:iron_shovel']).limitCount([1, 2]),
    ]
}

/** @param {Internal.LootContextJS} ctx */
const tomb_treasury = ctx => {
    return [
        LootEntry.of('minecraft:iron_block').when(c => c.randomChance(0.7)),

        LootEntry.of('minecraft:gold_block')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 3]),

        LootEntry.of('minecraft:anvil').when(c => c.randomChance(0.2)),

        LootEntry.of('minecraft:iron_ingot')
            .when(c => c.randomChance(0.7))
            .limitCount([2, 4]),

        LootEntry.of('minecraft:gold_ingot')
            .when(c => c.randomChance(0.7))
            .limitCount([4, 8]),

        LootEntry.of('minecraft:dune_armor_trim_smithing_template')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 2]),

        Loot.randomEntryOf([
            'minecraft:chiseled_sandstone',
            'minecraft:smooth_sandstone',
            'minecraft:cut_sandstone',
            'archeologyplus:sandstone_hieroglyphs',
        ])
            .when(c => c.randomChance(0.7))
            .limitCount([8, 24]),

        Loot.randomEntryOf([
            'minecraft:chiseled_red_sandstone',
            'minecraft:smooth_red_sandstone',
            'minecraft:cut_red_sandstone',
            'archeologyplus:red_sandstone_hieroglyphs',
        ])
            .when(c => c.randomChance(0.7))
            .limitCount([8, 24]),

        LootEntry.of('minecraft:red_sand')
            .when(c => c.randomChance(0.7))
            .limitCount([16, 32]),
    ]
}

LootJS.modifiers(event => {
    const pool = [pharaoh_regalia, court_librarian_cache, caravan_driver_kit, tomb_treasury]
    Loot.smartReplacePools(event, 'minecraft:chests/desert_pyramid', pool)
    Loot.smartReplacePools(event, 'mostructures:pyramid_custom', pool)

    Loot.smartReplacePools(event, 'nova_structures:chests/desert_ruins/desert_ruin_grave', [
        tomb_guardian_remains,
        court_librarian_cache,
        caravan_driver_kit,
    ])

    Loot.smartReplacePools(event, 'nova_structures:chests/desert_ruins/desert_ruin_main_temple', [
        pharaoh_regalia,
    ])

    Loot.smartReplacePools(
        event,
        'nova_structures:chests/desert_ruins/desert_ruin_lesser_treasure',
        [tomb_treasury]
    )

    event
        .addLootTypeModifier(LootType.CHEST)
        .replaceLoot('minecraft:emerald', 'minecraft:gold_nugget', true)

    event
        .addLootTableModifier('archeologyplus:chests/desert_temple_food')
        .matchLoot('minecraft:suspicious_stew')
        .removeLoot('minecraft:suspicious_stew')
        .addWeightedLoot(CHOWDER_EFFECTS.map(effect => Loot.chowderOf(effect)))
        .limitCount([1, 3])
})

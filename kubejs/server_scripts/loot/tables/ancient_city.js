/** @param {Internal.LootContextJS} ctx */
const warden_scholar = ctx => {
    console.log('warden_scholar')
    return [
        LootEntry.of('spectrum:gilded_book').when(c => c.randomChance(0.5)),
        LootEntry.of('echo_shard')
            .when(c => c.randomChance(0.3))
            .limitCount([1, 3]),
        LootEntry.of('amethyst_shard')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 5]),
        LootEntry.of('soul_torch')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 5]),
        LootEntry.of('supplementaries:slingshot')
            .enchantRandomly(['supplementaries:stasis'])
            .when(c => c.randomChance(0.1)),
        LootEntry.of('spectrum:amethyst_shard_banner_pattern').when(c => c.randomChance(0.1)),
        LootEntry.of('spectrum:amethyst_cluster_banner_pattern').when(c => c.randomChance(0.1)),
        LootEntry.of('tinted_glass')
            .when(c => c.randomChance(0.7))
            .limitCount([4, 16]),
        LootEntry.of('calibrated_sculk_sensor')
            .when(c => c.randomChance(0.2))
            .limitCount([1, 2]),
        LootEntry.of('name_tag')
            .when(c => c.randomChance(0.5))
            .limitCount([1, 2]),
        Loot.randomEnchantedFrom(
            ['simplyswords:iron_rapier', 'tridents_n_stuff:iron_spear'],
            EnchantSets.DARK
        )
            .when(c => c.randomChance(0.2))
            .damage([0.5, 0.75]),
        Loot.randomEntryOf(['simplyswords:diamond_rapier', 'tridents_n_stuff:diamond_spear'])
            .enchantRandomly(['extra-damage-enchantments:voidrender'])
            .enchantRandomly(Loot.randomEnchantFor('iron_sword', EnchantSets.GENERIC))
            .damage(0)
            .when(c => c.randomChance(0.1)),
        LootEntry.of('leather_leggings')
            .enchantRandomly(['minecraft:swift_sneak'])
            .addNbt({ display: { color: Loot.randomOf([8991416, 3949738, 13061821]) } })
            .when(c => c.randomChance(0.2))
            .damage([0.25, 0.5]),
        LootEntry.of('disc_fragment_5')
            .when(c => c.randomChance(0.2))
            .limitCount([1, 3]),
        LootEntry.of('music_disc_13').when(c => c.randomChance(0.2)),
        LootEntry.of('music_disc_cat').when(c => c.randomChance(0.2)),
        LootEntry.of('music_disc_otherside').when(c => c.randomChance(0.2)),
        Loot.randomEntryOf([
            'ward_armor_trim_smithing_template',
            'silence_armor_trim_smithing_template',
        ])
            .when(c => c.randomChance(0.15))
            .limitCount([1, 2]),
        LootEntry.of('artifacts:panic_necklace').when(c => c.randomChance(0.1)),
    ]
}
const sculk_researcher = ctx => {
    console.log('sculk_researcher')
    return [
        LootEntry.of('artifacts:universal_attractor').when(c => c.randomChance(0.1)),
        LootEntry.of('sculk_catalyst')
            .when(c => c.randomChance(0.5))
            .limitCount([1, 2]),
        LootEntry.of('sculk')
            .when(c => c.randomChance(0.7))
            .limitCount([4, 10]),
        LootEntry.of('sculk_sensor')
            .when(c => c.randomChance(0.5))
            .limitCount([1, 3]),
        LootEntry.of('experience_bottle')
            .when(c => c.randomChance(0.5))
            .limitCount([1, 3]),
        LootEntry.of('redstone_torch')
            .when(c => c.randomChance(0.5))
            .limitCount([1, 3]),
        LootEntry.of('redstone')
            .when(c => c.randomChance(0.5))
            .limitCount([1, 3]),
        LootEntry.of('glass_bottle')
            .when(c => c.randomChance(0.5))
            .limitCount([4, 10]),
        LootEntry.of('name_tag')
            .when(c => c.randomChance(0.3))
            .limitCount([1, 3]),
        LootEntry.of('goat_horn')
            .addNbt({ instrument: Loot.randomOf(['yearn_goat_horn', 'dream_goat_horn']) })
            .when(c => c.randomChance(0.2)),
        LootEntry.of('note_block')
            .when(c => c.randomChance(0.5))
            .limitCount([1, 3]),
        LootEntry.of('jukebox').when(c => c.randomChance(0.1)),
        LootEntry.of('writable_book').when(c => c.randomChance(0.3)),
        LootEntry.of('redstone_repeater')
            .when(c => c.randomChance(0.3))
            .limitCount([1, 4]),
        LootEntry.of('observer')
            .when(c => c.randomChance(0.3))
            .limitCount([1, 2]),
        LootEntry.of('comparator')
            .when(c => c.randomChance(0.3))
            .limitCount([1, 2]),
        LootEntry.of('supplementaries:crystal_display')
            .when(c => c.randomChance(0.3))
            .limitCount([1, 2]),
        Loot.randomEntryOf(['book', 'paper'])
            .when(c => c.randomChance(0.5))
            .limitCount([2, 6]),
        LootEntry.of('tridents_n_stuff:icon_of_stars'),
        LootEntry.of('diamond_hoe')
            .enchantWithLevels([30, 50], true)
            .when(c => c.randomChance(0.3)),
    ]
}
const ancient_survivor = ctx => {
    console.log('ancient_survivor')
    return [
        Loot.randomEnchantedFrom(ArmorSets.LEATHER, EnchantSets.DARK)
            .addNbt({ display: { color: Loot.randomOf([8991416, 3949738, 13061821]) } })
            .when(c => c.randomChance(0.3))
            .damage([0.25, 0.5]),
        LootEntry.of('lead')
            .when(c => c.randomChance(0.5))
            .limitCount([1, 2]),
        Loot.randomEnchantedFrom(Weapons.IRON, ['minecraft:bane_of_arthropods'])
            .enchantRandomly(Loot.randomEnchantFor('iron_sword', EnchantSets.GENERIC))
            .when(c => c.randomChance(0.3))
            .damage([0.5, 0.75]),
        LootEntry.of('enchanted_golden_apple').when(c => c.randomChance(0.05)),
        LootEntry.of('compass').when(c => c.randomChance(0.5)),
        LootEntry.of('glow_berries')
            .when(c => c.randomChance(0.7))
            .limitCount([4, 8]),
        LootEntry.of('candle')
            .when(c => c.randomChance(0.7))
            .limitCount([2, 5]),
        LootEntry.of('saddle').when(c => c.randomChance(0.3)),
        LootEntry.of('coal')
            .when(c => c.randomChance(0.7))
            .limitCount([2, 8]),
        LootEntry.of('golden_carrot')
            .when(c => c.randomChance(0.4))
            .limitCount([1, 5]),
        LootEntry.of('cooked_chicken')
            .when(c => c.randomChance(0.3))
            .limitCount([1, 5]),
        Loot.randomEntryOf([
            'minecraft:leather_horse_armor',
            'minecraft:golden_horse_armor',
            'minecraft:diamond_horse_armor',
        ]).when(c => c.randomChance(0.3)),
        LootEntry.of('iron_ingot')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 5]),
        Loot.randomEntryOf(Tools.IRON)
            .when(c => c.randomChance(0.5))
            .damage([0.5, 0.75]),
    ]
}

LootJS.modifiers(event => {
    const pool = [warden_scholar, sculk_researcher, ancient_survivor]
    Loot.smartReplacePools(event, 'minecraft:chests/ancient_city', pool)
    Loot.smartReplacePools(
        event,
        'wabi_sabi_structures:chests/forgotten_remnants/forgotten_remnants_common',
        [ancient_survivor]
    )
    Loot.smartReplacePools(
        event,
        'wabi_sabi_structures:chests/forgotten_remnants/forgotten_remnants_echoes',
        [sculk_researcher]
    )
})

/** @param {Internal.LootContextJS} ctx */
const hunter = ctx => {
    console.log('hunter')
    return [
        Loot.enchantedFrom('bow', EnchantSets.JUNGLE).damage([0.5, 0.75]),
        LootEntry.of('arrow').limitCount([4, 16]),
        LootEntry.of('tipped_arrow')
            .when(c => c.randomChance(0.7))
            .limitCount([2, 8])
            .addPotion('strong_poison'),
        Loot.randomEnchantedFrom(ArmorSets.LEATHER, EnchantSets.JUNGLE).when(c =>
            c.randomChance(0.5)
        ),
        Loot.enchantedFrom('leather_boots', EnchantSets.JUNGLE).when(c => c.randomChance(0.5)),
        LootEntry.of('artifacts:feral_claws').when(c => c.randomChance(0.1)),
        LootEntry.of('wild_armor_trim_smithing_template')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 2]),
        LootEntry.of('supplementaries:quiver').when(c => c.randomChance(0.1)),
        LootEntry.of('supplementaries:bamboo_spikes_tipped', 0.7)
            .addPotion('long_poison')
            .limitCount([2, 5]),
        LootEntry.of('supplementaries:rope_arrow')
            .when(c => c.randomChance(0.7))
            .damage([0.15, 0.75]),
        LootEntry.of('supplementaries:rope')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 3]),
        LootEntry.of('vc_gliders: paraglider_wood')
            .when(c => c.randomChance(0.7))
            .damage([0.25, 0.75]),
    ]
}

const shaman = ctx => {
    console.log('shaman')
    return [
        Loot.enchantedFrom('tridents_n_stuff:stone_spear', EnchantSets.BRUTAL)
            .damage([0.5, 0.75])
            .when(c => c.randomChance(0.5)),
        Loot.randomPotionOf(['strong_poison', 'staminafortweakers:fatigue_potion', 'slowness'])
            .when(c => c.randomChance(0.7))
            .limitCount([1, 3]),
        Loot.randomPotionOf(['invisibility', 'slow_falling', 'night_vision'])
            .when(c => c.randomChance(0.7))
            .limitCount([1, 3]),
        Loot.randomPotionOf(['staminafortweakers:tirelessness_potion'])
            .when(c => c.randomChance(0.7))
            .limitCount([1, 3]),
        LootEntry.of('fermented_spider_eye')
            .when(c => c.randomChance(0.7))
            .limitCount([2, 4]),
        LootEntry.of('hybrid-aquatic:jungle_lily_pad')
            .when(c => c.randomChance(0.7))
            .limitCount([2, 4]),
        LootEntry.of('red_mushroom')
            .when(c => c.randomChance(0.7))
            .limitCount([2, 4]),
        LootEntry.of('cocoa_bean')
            .when(c => c.randomChance(0.7))
            .limitCount([2, 4]),
        LootEntry.of('jungle_sapling')
            .when(c => c.randomChance(0.7))
            .limitCount([4, 8]),
        LootEntry.of('small_dripleaf')
            .when(c => c.randomChance(0.7))
            .limitCount([4, 8]),
        LootEntry.of('phantom_membrane')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 3]),
        Loot.randomEntryOf(['galosphere:lichen_cordyceps', 'galosphere:golden_lichen_cordyceps'])
            .when(c => c.randomChance(0.7))
            .limitCount([1, 3]),
        LootEntry.of('redstone')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 3]),
        LootEntry.of('gunpowder')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 3]),
        LootEntry.of('cauldron'),
        LootEntry.of('bones')
            .when(c => c.randomChance(0.7))
            .limitCount([2, 7]),
        LootEntry.of('supplementaries:statue')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 3]),
        LootEntry.of('skeleton_skull').when(c => c.randomChance(0.7)),
        LootEntry.of('black_candle')
            .when(c => c.randomChance(0.7))
            .limitCount([2, 5]),
        LootEntry.of('zombie_head')
            .when(c => c.randomChance(0.7))
            .limitCount([1, 2]),
        LootEntry.of('black_candle'),
    ]
}

const tribal_wealth = ctx => {
    console.log('tribal_wealth')
    return [
        LootEntry.of('gold_ingot')
            .when(c => c.randomChance(0.5))
            .limitCount([3, 8]),
        LootEntry.of('raw_gold')
            .when(c => c.randomChance(0.5))
            .limitCount([3, 8]),
        LootEntry.of('gold_nugget')
            .when(c => c.randomChance(0.5))
            .limitCount([5, 16]),
        LootEntry.of('emerald_block')
            .when(c => c.randomChance(0.5))
            .limitCount([1, 3]),
        LootEntry.of('galosphere:silver_ingot')
            .when(c => c.randomChance(0.5))
            .limitCount([3, 8]),
        LootEntry.of('galosphere:raw_silver')
            .when(c => c.randomChance(0.5))
            .limitCount([3, 8]),
        LootEntry.of('galosphere:silver_nugget')
            .when(c => c.randomChance(0.5))
            .limitCount([6, 18]),
        LootEntry.of('nautilus_shell')
            .when(c => c.randomChance(0.5))
            .limitCount([2, 5]),
        LootEntry.of('ecologics:seashell')
            .when(c => c.randomChance(0.5))
            .limitCount([5, 15]),
        LootEntry.of('leather')
            .when(c => c.randomChance(0.5))
            .limitCount([2, 6]),
        LootEntry.of('rabbit_hide')
            .when(c => c.randomChance(0.5))
            .limitCount([4, 8]),
        LootEntry.of('galosphere:gilded_beads')
            .when(c => c.randomChance(0.5))
            .limitCount([2, 6]),
        Loot.randomEntryOf(['archer_pottery_sherd', 'howl_pottery_sherd', 'burn_pottery_sherd'])
            .when(c => c.randomChance(0.5))
            .limitCount([1, 3]),
        LootEntry.of('golden_apple')
            .when(c => c.randomChance(0.5))
            .limitCount([1, 2]),
        LootEntry.of('hybrid-aquatic:pearl')
            .when(c => c.randomChance(0.5))
            .limitCount([1, 2]),
        LootEntry.of('hybrid-aquatic:black_pearl').when(c => c.randomChance(0.1)),
    ]
}

LootJS.modifiers(event => {
    Loot.smartReplacePools(event, 'minecraft:chests/jungle_temple', [hunter, shaman, tribal_wealth])
    Loot.smartReplacePools(event, 'mostructures:jungle_temple_treasure', [
        hunter,
        shaman,
        tribal_wealth,
    ])
    Loot.smartReplacePools(event, 'mvs:jungle_tower', [shaman, tribal_wealth])
})

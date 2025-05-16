LootJS.modifiers(event => {
    event
        .addLootTableModifier('nova_structures:chests/illager_hideout_heart_loot')
        .replaceLoot(
            'music_disc_otherside',
            LootEntry.of('supplementaries:music_disc_heave_ho'),
            true
        )
        .addLoot(Loot.enchantedFrom('simplyswords:diamond_cutlass', EnchantSets.LUCKY))
        .addWeightedLoot([1, 2], true, [
            LootEntry.of('spectral_seas:ship_speed_upgrade'),
            LootEntry.of('spectral_seas:ship_cargo_upgrade'),
        ])

    event
        .addLootTableModifier('nova_structures:chests/illager_hideout_weaponry')
        .removeLoot('arrow')
        .addWeightedLoot([2, 5], true, [
            LootEntry.of('tridents_n_stuff:bone_harpoon'),
            LootEntry.of('tridents_n_stuff:prismarine_harpoon'),
            LootEntry.of('tridents_n_stuff:diamond_harpoon'),
        ])
        .replaceLoot('bow', LootEntry.of('tridents_n_stuff:harpoon_launcher'))
        .replaceLoot('crossbow', Loot.randomEntryOf(Weapons.BLACKPOWDER_ALL))
        .replaceLoot('iron_axe', LootEntry.of('iron_axe'))
        .replaceLoot('iron_boots', LootEntry.of('iron_boots'))
        .replaceLoot('iron_helmet', LootEntry.of('iron_helmet'))
        .replaceLoot('iron_leggings', LootEntry.of('iron_leggings'))
        .replaceLoot('iron_chestplate', LootEntry.of('iron_chestplate'))
        .replaceLoot('iron_pickaxe', LootEntry.of('iron_pickaxe'))
        .replaceLoot('iron_shovel', LootEntry.of('iron_shovel'))
        .replaceLoot('iron_sword', LootEntry.of('simplyswords:iron_cutlass'))
    event
        .addLootTableModifier('nova_structures:chests/illager_hideout_tresure')
        .replaceLoot('emerald', LootEntry.of('emerald_block').limitCount([1, 4]), false)
        .addLoot(
            LootEntry.of('smallships:sail')
                .when(c => c.randomChance(0.7))
                .limitCount([1, 2])
        )
        .addLoot(
            LootEntry.of('supplementaries:rope')
                .when(c => c.randomChance(0.8))
                .limitCount([1, 3])
        )
})

LootJS.modifiers((event) => {
    event.addLootTableModifier('chests/shipwreck_supply').addLoot(
        LootEntry.of('supplementaries:sack')
            .when((c) => c.randomChance(0.7))
            .limitCount([1, 2]),
        LootEntry.of('supplementaries:coal')
            .when((c) => c.randomChance(0.7))
            .limitCount([3, 8]),
        LootEntry.of('supplementaries:rope')
            .when((c) => c.randomChance(0.5))
            .limitCount([1, 3]),
        LootEntry.of('smallships:sail')
            .when((c) => c.randomChance(0.25))
            .limitCount([1, 2]),
        LootEntry.of('minecraft:coast_armor_trim_smithing_template')
            .when((c) => c.randomChance(0.2))
            .limitCount([1, 2]),
        LootEntry.of('minecraft:potion')
            .addPotion('spectral_seas:grog')
            .when((c) => c.randomChance(0.3))
            .limitCount([1, 3]),
        Loot.randomEntryOf(Loot.allChowders())
            .when((c) => c.randomChance(0.5))
            .limitCount([1, 3])
    )

    event.addLootTableModifier('chests/shipwreck_map').addLoot(
        LootEntry.of('spyglass').when((c) => c.randomChance(0.2)),
        LootEntry.of('ink_sac')
            .when((c) => c.randomChance(0.7))
            .limitCount([2, 5]),
        LootEntry.of('galosphere_barometer').when((c) => c.randomChance(0.2))
    )

    event.addLootTableModifier('chests/shipwreck_treasure').addLoot(
        LootEntry.of('prismarine_shard')
            .when((c) => c.randomChance(0.7))
            .limitCount([2, 5]),
        LootEntry.of('nautilus_shell')
            .when((c) => c.randomChance(0.5))
            .limitCount([1, 2]),
        Loot.randomEnchantedFrom(
            ['simplyswords:iron_rapier', 'simplyswords:iron_cutlass'],
            EnchantSets.CITRINE
        )
            .when((c) => c.randomChance(0.3))
            .damage([0.25, 0.75]),
        Loot.enchantedFrom('leather_helmet', EnchantSets.TOPAZ)
            .when((c) => c.randomChance(0.1))
            .damage([0.25, 0.75]),
        Loot.enchantedFrom('leather_boots', EnchantSets.TOPAZ)
            .when((c) => c.randomChance(0.1))
            .damage([0.25, 0.75]),
        Loot.enchantedFrom('leather_leggings', EnchantSets.TOPAZ)
            .when((c) => c.randomChance(0.1))
            .damage([0.25, 0.75]),
        Loot.enchantedFrom('leather_chestplate', EnchantSets.TOPAZ)
            .when((c) => c.randomChance(0.1))
            .damage([0.25, 0.75]),
        LootEntry.of('artifacts:snorkel').when((c) => c.randomChance(0.05))
    )
    event.addLootTableModifier('chests/buried_treasure').addLoot(
        LootEntry.of('trident')
            .when((c) => c.randomChance(0.1))
            .enchantRandomly()
            .damage(0),
        Loot.potionOf('staminafortweakers:tirelessness_potion')
            .when((c) => c.randomChance(0.5))
            .limitCount([1, 2]),
        Loot.potionOf('night_vision')
            .when((c) => c.randomChance(0.5))
            .limitCount([1, 2]),
        LootEntry.of('artifacts:flippers').when((c) => c.randomChance(0.05)),
        LootEntry.of('artifacts:charm_of_sinking').when((c) => c.randomChance(0.05))
    )
})

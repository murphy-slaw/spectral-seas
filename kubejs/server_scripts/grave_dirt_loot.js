LootJS.modifiers(event => {
    event
        .addBlockLootModifier('spectral_seas:grave_dirt')
        .removeLoot(ItemFilter.ALWAYS_TRUE)
        .pool(pool => {
            pool.addAlternativesLoot([
                LootEntry.of(Ingredient.of('#spectral_seas:diamond_weapon'))
                    .when(c => c.randomChance(0.01))
                    .enchantRandomly()
                    .damage([0]),
                LootEntry.of(Item.of('minecraft:book'))
                    .when(c => c.randomChance(0.04))
                    .enchantRandomly(),
                LootEntry.of(Ingredient.of('#spectral_seas:iron_weapon'))
                    .when(c => c.randomChance(0.15))
                    .damage([0.15, 0.95])
                    .enchantWithLevels([-2, 20]),
                LootEntry.of(Ingredient.of('#spectral_seas:grave_treasure'))
                    .when(c => c.randomChance(0.5))
                    .limitCount([1, 4]),
                LootEntry.of(
                    Ingredient.of('#spectral_seas:grave_trash')
                ).limitCount([1, 2]),
            ])
        })
        .addLoot(Item.of('minecraft:dirt'))
})

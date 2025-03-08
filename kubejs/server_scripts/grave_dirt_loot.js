LootJS.modifiers(event => {
    event
        .addBlockLootModifier('spectral_seas:grave_dirt')
        .removeLoot(ItemFilter.ALWAYS_TRUE)
        .pool(pool => {
            pool.addWeightedLoot([
                LootEntry.of(Ingredient.of('#spectral_seas:diamond_weapon'))
                    .withWeight(1)
                    .enchantRandomly()
                    .damage([0]),
                LootEntry.of(Item.of('minecraft:book'))
                    .withWeight(4)
                    .enchantRandomly(),
                LootEntry.of(Ingredient.of('#spectral_seas:iron_weapon'))
                    .withWeight(15)
                    .damage([0.15, 0.95])
                    .enchantWithLevels([-2, 20]),
                LootEntry.of(Ingredient.of('#spectral_seas:grave_treasure'))
                    .withWeight(50)
                    .limitCount([1, 4]),
                LootEntry.of(
                    Ingredient.of('#spectral_seas:grave_trash')
                ).limitCount([1, 2]),
            ])
        })
        .addLoot(Item.of('minecraft:dirt'))
})

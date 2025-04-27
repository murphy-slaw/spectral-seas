LootJS.modifiers(event => {
    event
        .addLootTypeModifier(LootType.CHEST)
        .anyDimension('minecraft:overworld')
        .matchLoot('enchanted_book')
        .removeLoot('enchanted_book')
        .randomChance(0.6)
        .addLoot('spectrum:gilded_book')
})

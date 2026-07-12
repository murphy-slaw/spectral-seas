LootJS.modifiers((event) => {
    event
        .addLootTypeModifier(LootType.CHEST)
        .anyDimension('minecraft:overworld')
        .replaceLoot('minecraft:cooked_salmon', 'hybrid_aquatic:cooked_fish_steak', true)
        .replaceLoot('minecraft:cooked_cod', 'hybrid_aquatic:cooked_fish_meat', true)
})

LootJS.modifiers((event) => {
    event
        .addLootTypeModifier(LootType.CHEST)
        .anyDimension('minecraft:overworld')
        .replaceLoot('minecraft:cooked_salmon', 'hybrid-aquatic:cooked_fish_steak', true)
        .replaceLoot('minecraft:cooked_cod', 'hybrid-aquatic:cooked_fish_meat', true)
})

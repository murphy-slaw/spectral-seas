LootJS.modifiers((event) => {
    event
        .addLootTypeModifier(LootType.CHEST)
        .anyDimension('minecraft:overworld')
        .replaceLoot('iron_ingot', 'raw_iron', true)
})

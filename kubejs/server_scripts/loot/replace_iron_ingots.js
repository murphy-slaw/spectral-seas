LootJS.modifiers((event) => {
    event
        .addLootTypeModifier(LootType.CHEST, LootType.ENTITY)
        .anyDimension('minecraft:overworld')
        .replaceLoot('iron_ingot', 'raw_iron', true)
})

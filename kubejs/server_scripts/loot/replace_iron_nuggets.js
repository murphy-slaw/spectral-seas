LootJS.modifiers((event) => {
    event
        .addLootTypeModifier(LootType.CHEST, LootType.ENTITY)
        .anyDimension('minecraft:overworld')
        .replaceLoot('iron_nugget', 'chain', true)
})

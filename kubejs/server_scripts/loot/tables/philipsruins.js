/** @param {Internal.LootContextJS} ctx */
const levelOneRuins = (ctx) => {
    return [].concat([
        LootEntry.of('#spectral_seas:armor_leather')
            .when((c) => c.randomChance(0.3))
            .enchantWithLevels(5)
            .damage([0.25, 0.5]),
        LootEntry.of('#spectral_seas:iron_weapon')
            .when((c) => c.randomChance(0.2))
            .enchantWithLevels(5)
            .damage([0, 0.25]),
        LootEntry.of('#spectral_seas:iron_tool')
            .when((c) => c.randomChance(0.1))
            .enchantWithLevels(5)
            .damage([0, 0.25]),
        LootEntry.of('golden_helmet')
            .when((c) => c.randomChance(0.1))
            .enchantWithLevels(10),
        LootEntry.of('#spectral_seas:armor_chainmail')
            .when((c) => c.randomChance(0.2))
            .enchantWithLevels(5)
            .damage([0.25, 0.5]),
        LootEntry.of('string').limitCount([0, 6]),
        LootEntry.of('rotten_flesh').limitCount([0, 6]),
        LootEntry.of('gunpowder').limitCount([0, 6]),
        LootEntry.of('bone').limitCount([0, 6]),
        LootEntry.of('iron_ingot').limitCount([0, 3]),
        LootEntry.of('iron_nugget').limitCount([2, 7]),
        LootEntry.of('gold_nugget')
            .limitCount([1, 4])
            .when((c) => c.randomChance(0.5)),
    ])
}

const levelThreeRuins = (ctx) => {
    return [].concat([])
}

const ruinLoot = (ctx) => {
    return [].concat([])
}
LootJS.modifiers((event) => {
    /*
    Loot.smartReplacePools(event, 'philipsruins:chest/level_one_ruins_loot', [levelOneRuins])
    Loot.smartReplacePools(event, 'philipsruins:level_three_ruins_loot', [levelThreeRuins])
    Loot.smartReplacePools(event, 'philipsruins:ruin_loot', [ruinLoot])
    Loot.smartReplacePools(event, 'philipsruins:ruin_loot_value', [ruinLoot])
    */
})

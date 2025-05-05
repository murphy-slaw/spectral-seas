/** @param {Internal.LootContextJS} ctx */
const pharaoh_regalia = ctx => {
    console.log('pharaoh')
    return [
        getRandomEnchantedItem(CHAINMAIL_ARMOR, CITRINE_ENCHANTS).damage([
            0, 1,
        ]),
        getRandomEnchantedItem(DIAMOND_ARMOR, CITRINE_ENCHANTS).damage(0),
        LootEntry.of('minecraft:blue_dye')
            .when(cond => cond.randomChance(0.7))
            .limitCount([2, 5]),
        LootEntry.of('minecraft:purple_dye').when(cond =>
            cond.randomChance(0.7)
        ),
        LootEntry.of('minecraft:honey_bottle')
            .when(cond => cond.randomChance(0.7))
            .limitCount([2, 5]),
        LootEntry.of('minecraft:yellow_banner')
            .when(cond => cond.randomChance(0.7))
            .limitCount([2, 5]),
        LootEntry.of('minecraft:purple_banner').when(cond =>
            cond.randomChance(0.7)
        ),
        LootEntry.of('minecraft:blue_banner').when(cond =>
            cond.randomChance(0.7)
        ),
        LootEntry.of('supplementaries:urn')
            .addNbt({
                Items: [{ Slot: 0, Count: 5, id: 'minecraft:bone' }],
            })
            .when(cond => cond.randomChance(0.7))
            .limitCount([1, 3]),
        LootEntry.of('artifacts:antidote_vessel').when(cond =>
            cond.randomChance(0.1)
        ),
        LootEntry.of('minecraft:gold_ingot')
            .when(cond => cond.randomChance(0.7))
            .limitCount([1, 6]),
        LootEntry.of('minecraft:gold_block').when(cond =>
            cond.randomChance(0.7)
        ),
        LootEntry.of('minecraft:golden_carrot')
            .when(cond => cond.randomChance(0.7))
            .limitCount([1, 5]),
        LootEntry.of('minecraft:golden_apple').when(cond =>
            cond.randomChance(0.5)
        ),
        LootEntry.of('minecraft:enchanted_golden_apple').when(cond =>
            cond.randomChance(0.1)
        ),
    ]
}

/** @param {Internal.LootContextJS} ctx */
const tomb_guardian_remains = ctx => {
    console.log('guardian')
    return [
        getValidlyEnchantedItem('simplyswords:iron_cutlass', CITRINE_ENCHANTS)
            .damage([0, 0.5])
            .when(cond => cond.randomChance(0.5)),
        getValidlyEnchantedItem('tridents_n_stuff:iron_spear', CITRINE_ENCHANTS)
            .damage([0, 0.5])
            .when(cond => cond.randomChance(0.5)),
        getValidlyEnchantedItem('minecraft:shield', CITRINE_ENCHANTS)
            .damage([0, 0.5])
            .when(cond => cond.randomChance(0.5)),
        getValidlyEnchantedItem('minecraft:golden_helmet', CITRINE_ENCHANTS)
            .damage([0, 0.5])
            .when(cond => cond.randomChance(0.5)),
        getRandomEnchantedItem(LEATHER_ARMOR, CITRINE_ENCHANTS)
            .damage([0, 0.5])
            .when(cond => cond.randomChance(0.7))
            .limitCount([1, 4]),
        LootEntry.of('minecraft:bones')
            .when(cond => cond.randomChance(7))
            .limitCount([2, 5]),
        LootEntry.of('minecraft:rotten_flesh')
            .when(cond => cond.randomChance(7))
            .limitCount([2, 5]),
        LootEntry.of('artifacts:crystal_heart').when(cond =>
            cond.randomChance(0.1)
        ),
    ]
}

/** @param {Internal.LootContextJS} ctx */
const court_librarian_cache = ctx => {
    console.log('librarian')
    return [
        LootEntry.of('spectrum:gilded_book')
            .when(cond => cond.randomChance(0.7))
            .limitCount([1, 2]),
        LootEntry.of('minecraft:paper')
            .when(cond => cond.randomChance(0.7))
            .limitCount([2, 6]),
        LootEntry.of('minecraft:writable_book').when(cond =>
            cond.randomChance(0.7)
        ),
        LootEntry.of('minecraft:book')
            .when(cond => cond.randomChance(0.7))
            .limitCount([1, 3]),
        LootEntry.of('minecraft:ink_sac')
            .when(cond => cond.randomChance(0.7))
            .limitCount([1, 3]),
        LootEntry.of('minecraft:feather')
            .when(cond => cond.randomChance(0.7))
            .limitCount([2, 6]),
        LootEntry.of('minecraft:map')
            .when(cond => cond.randomChance(0.7))
            .limitCount([1, 2]),
        LootEntry.of('minecraft:gold_ingot')
            .when(cond => cond.randomChance(0.7))
            .limitCount([1, 3]),
        LootEntry.of('minecraft:brush').when(cond => cond.randomChance(0.7)),
        LootEntry.of('artifacts:obsidian_skull').when(cond =>
            cond.randomChance(0.1)
        ),
    ]
}

/** @param {Internal.LootContextJS} ctx */
const caravan_driver_kit = ctx => {
    console.log('caravan')
    return [LootEntry.of('minecraft:cooked_rabbit')]
}

/** @param {Internal.LootContextJS} ctx */
const tomb_treasury = ctx => {
    return [LootEntry.of('minecraft:iron_block')]
}

LootJS.modifiers(event => {
    const pools = [
        pharaoh_regalia,
        tomb_guardian_remains,
        court_librarian_cache,
        caravan_driver_kit,
        tomb_treasury,
    ]
    smartReplacePools(event, 'minecraft:chests/desert_pyramid', pools)
})

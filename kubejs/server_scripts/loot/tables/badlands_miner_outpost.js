/** @param {Internal.LootContextJS} ctx */
const mining_supply = ctx => {
    return [].concat.apply(
        [],
        [
            LootEntry.of('iron_pickaxe').when(c => c.randomChance(0.25)),
            LootEntry.of('iron_shovel').when(c => c.randomChance(0.2)),
            LootEntry.of('tnt')
                .when(c => c.randomChance(0.7))
                .limitCount([3, 6]),
            LootEntry.of('supplementaries:bomb')
                .when(c => c.randomChance(0.5))
                .limitCount([1, 3]),
            LootEntry.of('supplementaries:blue_bomb')
                .when(c => c.randomChance(0.2))
                .limitCount([1, 2]),
            LootEntry.of('rail')
                .when(c => c.randomChance(0.7))
                .limitCount([4, 12]),
            LootEntry.of('activator_rail')
                .when(c => c.randomChance(0.25))
                .limitCount([1, 3]),
            LootEntry.of('detector_rail')
                .when(c => c.randomChance(0.25))
                .limitCount([1, 3]),
            LootEntry.of('powered_rail')
                .when(c => c.randomChance(0.5))
                .limitCount([3, 6]),
            LootEntry.of('tnt_minecart').when(c => c.randomChance(0.3)),
            LootEntry.of('torch')
                .when(c => c.randomChance(0.7))
                .limitCount([5, 12]),
            LootEntry.of('redstone_torch')
                .when(c => c.randomChance(0.35))
                .limitCount([2, 5]),
            LootEntry.of('redstone')
                .when(c => c.randomChance(0.5))
                .limitCount([5, 8]),
            LootEntry.of('gunpowder')
                .when(c => c.randomChance(0.5))
                .limitCount([5, 8]),
            LootEntry.of('lantern')
                .when(c => c.randomChance(0.5))
                .limitCount([1, 3]),
            LootEntry.of('silver_upgrade_smithing_template')
                .when(c => c.randomChance(0.2))
                .limitCount([1, 2]),
            LootEntry.of('raw_gold')
                .when(c => c.randomChance(0.5))
                .limitCount([2, 5]),
            LootEntry.of('raw_iron')
                .when(c => c.randomChance(0.5))
                .limitCount([2, 5]),
            LootEntry.of('raw_copper')
                .when(c => c.randomChance(0.7))
                .limitCount([4, 10]),
            LootEntry.of('name_tag').when(c => c.randomChance(0.5)),
            LootEntry.of('golden_apple').when(c => c.randomChance(0.2)),
            LootEntry.of('enchanted_golden_apple').when(c => c.randomChance(0.05)),
            LootEntry.of('supplementaries:altimeter').when(c => c.randomChance(0.1)),
            Loot.enchantedFrom('iron_shovel', EnchantSets.MINES)
                .damage([0.25, 0.75])
                .when(c => c.randomChance(0.1)),
            Loot.enchantedFrom('iron_pickaxe', EnchantSets.MINES)
                .damage([0.25, 0.75])
                .when(c => c.randomChance(0.1)),
            Loot.enchantedFrom('diamond_pickaxe', EnchantSets.MINES)
                .damage(0)
                .when(c => c.randomChance(0.05)),
            Loot.enchantedFrom('diamond_shovel', EnchantSets.MINES)
                .damage(0)
                .when(c => c.randomChance(0.05)),
        ]
    )
}

LootJS.modifiers(event => {
    Loot.smartReplacePools(event, 'nova_structures:chests/badland_miner_outpost_towers', [
        lookout_post,
    ])
    Loot.smartReplacePools(event, 'nova_structures:chests/badland_miner_outpost', [lookout_post])
    Loot.smartReplacePools(event, 'nova_structures:chests/pillager_outpost_treasure', [
        lookout_post,
    ])
    Loot.smartReplacePools(event, 'nova_structures:chests/mining_supply', [mining_supply])
    Loot.smartReplacePools(event, 'minecraft:chests/abandoned_mineshaft', [mining_supply])

    event
        .addLootTableModifier('nova_structures:chests/badland_miner_outpost_forge')

        .replaceLoot('iron_axe', LootEntry.of('iron_axe'), true)
        .replaceLoot(
            'iron_pickaxe',
            Loot.enchantedFrom('iron_pickaxe', EnchantSets.MINES).damage([0.25, 0.75]),
            true
        )
        .addLoot(
            Loot.enchantedFrom('iron_shovel', EnchantSets.MINES)
                .damage([0.25, 0.75])
                .when(c => c.randomChance(0.7))
        )
        .addLoot(
            Loot.enchantedFrom('diamond_shovel', EnchantSets.MINES)
                .damage(0)
                .when(c => c.randomChance(0.2))
        )
        .addLoot(
            Loot.enchantedFrom('diamond_pickaxe', EnchantSets.MINES)
                .damage(0)
                .when(c => c.randomChance(0.2))
        )
    event
        .addLootTableModifier('nova_structures:chests/illager_hideout_utility')
        .replaceLoot('emerald', LootEntry.of('gold_nugget'), true)
})

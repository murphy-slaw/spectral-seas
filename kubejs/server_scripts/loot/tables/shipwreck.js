const repair_sack = Item.of(
    'supplementaries:sack',
    '{BlockEntityTag:{ Items:[ {Count:8b,Slot:0b,id:"minecraft:iron_nugget"}, {Count:16b,Slot:1b,id:"minecraft:oak_planks"}, {Count:5b,Slot:2b,id:"minecraft:string"}, {Count:2b,Slot:3b,id:"minecraft:leather"}, {Count:1b,Slot:4b,id:"supplementaries:wrench"}, ]}}'
)

const ration_sack = Item.of(
    'supplementaries:sack',
    '{BlockEntityTag:{ Items:[ {Count:8b,Slot:0b,id:"minecraft:dried_kelp"}, {Count:3b,Slot:1b,id:"minecraft:bread"}, {Count:5b,Slot:2b,id:"hybrid-aquatic:cooked_fish_meat"}, {Count:2b,Slot:3b,id:"hybrid-aquatic:cooked_fish_steak"}, {Count:7b,Slot:4b,id:"sweet_berries"}, ]}}'
)

/** @param {Internal.LootContextJS} ctx */
const shipwreck_supply = ctx => {
    return [].concat.apply(
        [],
        [
            LootEntry.of(repair_sack)
                .when(c => c.randomChance(0.7))
                .limitCount([1, 2]),
            LootEntry.of(ration_sack)
                .when(c => c.randomChance(0.7))
                .limitCount([1, 2]),
            LootEntry.of('supplementaries:sack')
                .when(c => c.randomChance(0.7))
                .limitCount([1, 2]),
            LootEntry.of('supplementaries:coal')
                .when(c => c.randomChance(0.7))
                .limitCount([3, 8]),
            LootEntry.of('supplementaries:rope')
                .when(c => c.randomChance(0.5))
                .limitCount([1, 3]),
            LootEntry.of('smallships:sail')
                .when(c => c.randomChance(0.25))
                .limitCount([1, 2]),
            LootEntry.of('smallships:cannon_ball')
                .when(c => c.randomChance(0.3))
                .limitCount([1, 4]),
            LootEntry.of('minecraft:coast_armor_trim_smithing_template')
                .when(c => c.randomChance(0.2))
                .limitCount([1, 2]),
            LootEntry.of('minecraft:potion')
                .addPotion('spectral_seas:grog')
                .when(c => c.randomChance(0.3))
                .limitCount([1, 3]),
            Loot.randomEntryOf(Loot.allChowders())
                .when(c => c.randomChance(0.5))
                .limitCount([1, 3]),
        ]
    )
}

LootJS.modifiers(event => {
    Loot.smartReplacePools(event, 'chests/shipwreck_supply', [shipwreck_supply])

    event.addLootTableModifier('chests/shipwreck_map').addLoot(
        LootEntry.of('spyglass').when(c => c.randomChance(0.2)),
        LootEntry.of('ink_sac')
            .when(c => c.randomChance(0.7))
            .limitCount([2, 5])
    ),
        LootEntry.of('galosphere_barometer').when(c => c.randomChance(0.2))

    event.addLootTableModifier('chests/shipwreck_treasure').addLoot(
        LootEntry.of('prismarine_shard')
            .when(c => c.randomChance(0.7))
            .limitCount([2, 5]),
        LootEntry.of('nautilus_shell')
            .when(c => c.randomChance(0.5))
            .limitCount([1, 2]),
        Loot.randomEnchantedFrom(
            ['simplyswords:iron_rapier', 'simplyswords:iron_cutlass'],
            EnchantSets.CITRINE
        )
            .when(c => c.randomChance(0.3))
            .damage([0.25, 0.75]),
        Loot.enchantedFrom('leather_helmet', EnchantSets.TOPAZ)
            .when(c => c.randomChance(0.1))
            .damage([0.25, 0.75]),
        Loot.enchantedFrom('leather_boots', EnchantSets.TOPAZ)
            .when(c => c.randomChance(0.1))
            .damage([0.25, 0.75]),
        Loot.enchantedFrom('leather_leggings', EnchantSets.TOPAZ)
            .when(c => c.randomChance(0.1))
            .damage([0.25, 0.75]),
        Loot.enchantedFrom('leather_chestplate', EnchantSets.TOPAZ)
            .when(c => c.randomChance(0.1))
            .damage([0.25, 0.75]),
        LootEntry.of('artifacts:snorkel').when(c => c.randomChance(0.05))
    )
    event.addLootTableModifier('chests/buried_treasure').addLoot(
        LootEntry.of('trident')
            .when(c => c.randomChance(0.1))
            .enchantRandomly()
            .damage(0),
        Loot.potionOf('staminafortweakers:tirelessness_potion')
            .when(c => c.randomChance(0.5))
            .limitCount([1, 2]),
        Loot.potionOf('night_vision')
            .when(c => c.randomChance(0.5))
            .limitCount([1, 2]),
        LootEntry.of('artifacts:flippers').when(c => c.randomChance(0.05)),
        LootEntry.of('artifacts:charm_of_sinking').when(c => c.randomChance(0.05))
    )
})

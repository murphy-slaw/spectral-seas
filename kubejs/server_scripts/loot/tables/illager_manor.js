/** @param {Internal.LootContextJS} ctx */
const pirateArsenal = (ctx) => {
    return [].concat([
        LootEntry.of('musketmod:pistol').when((c) => c.randomChance(0.5)),
        LootEntry.of('musketmod:musket').when((c) => c.randomChance(0.25)),
        LootEntry.of('musketmod:cartridge')
            .when((c) => c.randomChance(0.7))
            .limitCount([2, 7]),
        LootEntry.of('musketmod:musket_upgrade_smithing_template')
            .when((c) => c.randomChance(0.2))
            .limitCount([1, 2]),
        LootEntry.of('experience_bottle')
            .when((c) => c.randomChance(0.5))
            .limitCount([1, 3]),
        LootEntry.of('spyglass').when((c) => c.randomChance(0.7)),
        LootEntry.of('compass').when((c) => c.randomChance(0.5)),
        LootEntry.of('spectral_seas:ship_speed_upgrade').when((c) => c.randomChance(0.05)),
        LootEntry.of('spectral_seas:ship_cargo_upgrade').when((c) => c.randomChance(0.2)),
        LootEntry.of('supplementaries:rope')
            .when((c) => c.randomChance(0.7))
            .limitCount([1, 2]),
        LootEntry.of('iron_ingot')
            .when((c) => c.randomChance(0.7))
            .limitCount([1, 3]),
        LootEntry.of('gold_ingot')
            .when((c) => c.randomChance(0.5))
            .limitCount([1, 3]),
        LootEntry.of('gold_nugget')
            .when((c) => c.randomChance(0.7))
            .limitCount([3, 8]),
        LootEntry.of('artifacts:pocket_pistion').when((c) => c.randomChance(0.05)),
    ])
}

LootJS.modifiers((event) => {
    Loot.smartReplacePools(event, 'minecraft:chests/illager_mansion/pillager_chest', [
        pirateArsenal,
    ])
    Loot.smartReplacePools(event, 'minecraft:chests/illager_mansion/ancient_city_raid_chest', [
        wardenScholar,
    ])
    event
        .addLootTableModifier('minecraft:chests/illager_mansion/secret_room')
        .addLoot(LootEntry.of('artifacts:golden_hook').when((c) => c.randomChance(0.1)))
    event
        .addLootTableModifier('minecraft:chests/illager_mansion/generic')
        .replaceLoot('emerald', LootEntry.of('gold_nugget'), true)
        .addLoot(LootEntry.of('spectral_seas:ship_speed_upgrade').when((c) => c.randomChance(0.05)))
        .addLoot(LootEntry.of('spectral_seas:ship_cargo_upgrade').when((c) => c.randomChance(0.1)))
    event
        .addLootTableModifier('minecraft:chests/illager_mansion/vindicator_chest')
        .replaceLoot('iron_axe', LootEntry.of('iron_axe'))
        .replaceLoot('diamond_axe', LootEntry.of('diamond_axe'))
        .addWeightedLoot([
            Item.of('simplyswords:iron_cutlass').withChance(2),
            Item.of('simplyswords:diamond_cutlass'),
        ])
    event
        .addLootTableModifier('minecraft:chests/illager_mansion/smithing_room')
        .replaceLoot('iron_axe', LootEntry.of('iron_axe'))
        .replaceLoot('iron_pickaxe', LootEntry.of('iron_pickaxe'))
        .replaceLoot('diamond_axe', LootEntry.of('diamond_axe'))
        .replaceLoot('diamond_pickaxe', LootEntry.of('diamond_pickaxe'))
        .addLoot(LootEntry.of('musketmod:cartridge').limitCount([6, 18]))
        .addWeightedLoot(
            [1, 3],
            [
                LootEntry.of('musketmod:pistol').withChance(15),
                LootEntry.of('musketmod:musket')
                    .withChance(15)
                    .enchantRandomly(['power', 'unbreaking', 'knockback']),
                LootEntry.of('musketmod:blunderbuss')
                    .enchantRandomly(['flame', 'unbreaking', 'spellbound:selfish'])
                    .withChance(15),
                LootEntry.of('musketmod:musket')
                    .enchantRandomly(['spellbound:storied'])
                    .withChance(1),
                LootEntry.of('musketmod:musket_with_bayonet').withChance(2),
                LootEntry.of('musketmod:scoped_musket').withChance(2),
            ]
        )
        .damage([0.5, 0.8])
        .addSequenceLoot(
            LootEntry.of('smallships:cannon')
                .when((c) => c.randomChance(0.85))
                .limitCount([1, 2]),
            LootEntry.of('smallships:cannon_ball')
                .when((c) => c.randomChance(0.85))
                .limitCount([1, 5]),
            LootEntry.of('supplementaries:bomb')
                .when((c) => c.randomChance(0.7))
                .limitCount([1, 5]),
            LootEntry.of('supplementaries:blue_bomb')
                .when((c) => c.randomChance(0.5))
                .limitCount([1, 3])
        )
})


/*
    Keep track of how many times a player has opened a chest with the given loot table.
*/

LootJS.modifiers(event => {
    let lootTable = "nova_structures:chests/undead_crypts_grave"
    event
        .addLootTableModifier(lootTable)
        .playerPredicate(player => {
            let counts = player.persistentData.getCompound("ChestLootCounts")
            counts[lootTable] ? counts[lootTable]++ : counts[lootTable] = 1
            player.persistentData.put("ChestLootCounts",counts)
            let roll = Utils.getRandom().nextInt(20)
            console.infof("Roll: %s Score: %s", roll, counts[lootTable])
            return counts[lootTable] > roll
        })
        .addLoot("artifacts:bunny_hoppers")
        .apply(context => {
            let counts = context.player.persistentData.getCompound("ChestLootCounts")
            counts[lootTable] = 0
            context.player.persistentData.put("ChestLootCounts",counts)
        })
})
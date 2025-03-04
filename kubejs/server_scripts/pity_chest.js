//priority: 10000
/*
    Keep track of how many times a player has opened a chest with the given loot table.
*/

function addPityDrops (event, lootTable, chance, lootCallback) {
    event
        .addLootTableModifier(lootTable)
        .playerPredicate(player => {
            let counts = player.persistentData.getCompound('ChestLootCounts')
            counts[lootTable] ? counts[lootTable]++ : (counts[lootTable] = 1)
            player.persistentData.put('ChestLootCounts', counts)
            let roll = Utils.getRandom().nextInt(chance)
            console.infof('Roll: %s Score: %s', roll, counts[lootTable])
            return counts[lootTable] > roll
        })
        .addLoot(lootCallback(event))
        .apply(context => {
            let counts =
                context.player.persistentData.getCompound('ChestLootCounts')
            counts[lootTable] = 0
            context.player.persistentData.put('ChestLootCounts', counts)
        })
}

LootJS.modifiers(event => {
    addPityDrops(
        event,
        'nova_structures:chests/undead_crypts_grave',
        20,
        () => {
            return 'artifacts:bunny_hoppers'
        }
    )
})

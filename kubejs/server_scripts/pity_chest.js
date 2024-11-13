const LOOT_TABLE_KEY = "LootTableSeenCounts"

/*
    Keep track of how many times a player has opened a chest with the given loot table.
    We can get the NBT data in the loot tables themselves to regulate rare drops.
*/

BlockEvents.rightClicked('minecraft:chest', event => {
    let lootTable = event.block.getEntityData().getString("LootTable")
    if (lootTable != '') {
        let player = event.player
        let counts = player.persistentData.getCompound(LOOT_TABLE_KEY)
        let count = counts.getInt(lootTable)
        count = count + 1
        counts.putInt(lootTable, count)
        player.persistentData.put(LOOT_TABLE_KEY, counts)
    }
})
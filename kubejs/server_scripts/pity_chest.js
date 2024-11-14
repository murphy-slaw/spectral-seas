let ObjectiveCriteria = Java.loadClass("net.minecraft.world.scores.criteria.ObjectiveCriteria");

/*
    Keep track of how many times a player has opened a chest with the given loot table.
    We can get the score data in the loot tables themselves to regulate rare drops.
*/

BlockEvents.rightClicked('minecraft:chest', event => {
    let lootTable = event.block.getEntityData().getString("LootTable")
    if (lootTable != '') {
        let scoreboard = event.level.scoreboard
        let objectiveName = "loot." + lootTable
        let objective = scoreboard.getObjective(objectiveName)
        if (!objective) {
            objective = scoreboard.addObjective(
                objectiveName, ObjectiveCriteria.DUMMY,
                Component.of(objectiveName),
                ObjectiveCriteria.DUMMY.getDefaultRenderType()
            );
        }
        let score = scoreboard.getOrCreatePlayerScore(event.player.username, objective)
        score.increment()
    }
})

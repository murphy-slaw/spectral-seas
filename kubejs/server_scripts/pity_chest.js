let ObjectiveCriteria = Java.loadClass("net.minecraft.world.scores.criteria.ObjectiveCriteria");

/*
    Keep track of how many times a player has opened a chest with the given loot table.
    We can get the scoret  data in the loot tables themselves to regulate rare drops.
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

LootJS.modifiers(event => {
    let lootTable = "nova_structures:chests/undead_crypts_grave"
    let objectiveName = "loot." + lootTable
    event
        .addLootTableModifier(lootTable)
        .playerPredicate(player => {
            let objective = player.scoreboard.getObjective(objectiveName)
            let score = player.scoreboard.getOrCreatePlayerScore(player.username, objective).score
            let roll = Utils.getRandom().nextInt(100)
            console.infof("Roll: %s Score: %s", roll, score)
            return score * 5 > roll
        })
        .addLoot("artifacts:bunny_hoppers")
        .apply(context => {
            let scoreboard = context.level.scoreboard
            let objective = scoreboard.getObjective(objectiveName)
            scoreboard.getOrCreatePlayerScore(context.player.username, objective).reset()
        })
})
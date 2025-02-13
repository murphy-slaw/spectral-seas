PlayerEvents.tick(event => {
    // Once per second
    if (event.player.age % 20 === 0) {
        let spawn = event.level.sharedSpawnPos
        let scoreboard = event.server.scoreboard
        let distanceObjective = scoreboard.getObjective('spawnDistance')
        if (!distanceObjective) {
            distanceObjective = event.server.scoreboard.addObjective(
                'spawnDistance',
                ObjectiveCriteria$DUMMY,
                'spawnDistance',
                ObjectiveCriteria$DUMMY.getDefaultRenderType()
            )
            // Display in the tab list
            scoreboard.setDisplayObjective(0, distanceObjective)
        }
        let score = scoreboard.getOrCreatePlayerScore(
            event.player.username,
            distanceObjective
        )
        let xdist = (spawn.x - event.player.x) ** 2
        let zdist = (spawn.z - event.player.z) ** 2
        let distance = Math.sqrt(xdist + zdist)
        score.score = distance
    }
})

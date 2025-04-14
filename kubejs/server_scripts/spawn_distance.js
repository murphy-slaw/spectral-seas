PlayerEvents.tick(event => {
    // Once per second
    if (event.player.age % 20 === 0) {
        let scoreboard = event.server.scoreboard
        let distanceObjective = scoreboard.getObjective('spawnDistance')
        if (!distanceObjective) {
            distanceObjective = scoreboard.addObjective(
                'spawnDistance',
                ObjectiveCriteria$DUMMY,
                'spawnDistance',
                ObjectiveCriteria$DUMMY.getDefaultRenderType()
            )
            // Display in the tab list
            scoreboard.setDisplayObjective(0, distanceObjective)
        }

        scoreboard.getOrCreatePlayerScore(
            event.player.username,
            distanceObjective
        ).score = Math.sqrt(
            event.level.sharedSpawnPos.distSqr(
                Vec3i(event.player.x, event.player.y, event.player.z)
            )
        )
    }
})

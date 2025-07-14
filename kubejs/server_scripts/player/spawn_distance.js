const $ObjectiveCriteria = Java.loadClass('net.minecraft.world.scores.criteria.ObjectiveCriteria')
PlayerEvents.tick((event) => {
    /** @type {Internal.ServerPlayer} */
    const player = event.player
    // Once per second
    if (player.age % 20 === 0) {
        let scoreboard = event.server.scoreboard
        let distanceObjective = scoreboard.getObjective('spawnDistance')
        if (!distanceObjective) {
            distanceObjective = scoreboard.addObjective(
                'spawnDistance',
                $ObjectiveCriteria.DUMMY,
                'spawnDistance',
                $ObjectiveCriteria.DUMMY.getDefaultRenderType()
            )
            // Display in the tab list
            scoreboard.setDisplayObjective(0, distanceObjective)
        }
        let [x, y, z] = player.persistentData.getIntArray('initial_spawn_pos')
        if (x === undefined) {
            ;[x, y, z] = [0, 0, 0]
        }

        scoreboard.getOrCreatePlayerScore(player.username, distanceObjective).score = Math.sqrt(
            player.blockPosition().distSqr(Vec3i(x, y, z))
        )
    }
})

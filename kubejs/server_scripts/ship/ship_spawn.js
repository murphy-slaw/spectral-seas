const shipTypes = ['smallships:cog', 'smallships:brigg', 'smallships:drakkar', 'smallships:galley']

PlayerEvents.tick((event) => {
    const {
        player,
        player: { vehicle },
        level,
    } = event

    const wPlayer = PlayerHelper(player)
    const shipID = wPlayer.shipID.get()

    if (vehicle) {
        let vPosition = vehicle.blockPosition()
        wPlayer.shipPosition.set({ x: vPosition.x, y: vPosition.y, z: vPosition.z })
        /*
        if (
            player.shipPosition.get().empty() ||
            player.shipPosition.get() != vehicle.blockPosition()
        )
        */

        if (shipTypes.includes(vehicle.type)) {
            if (!player.tags.contains('on_ship')) {
                let vehicleUuid = vehicle.getUuid().toString()
                console.debug(`Vehicle UUID: ${vehicleUuid}\n shipId: ${shipID}`)

                if (!shipID || shipID !== vehicleUuid) {
                    console.debug(`Setting shipID: ${vehicleUuid}`)
                    wPlayer.shipID.set(vehicleUuid)
                }
                player.addTag('on_ship')

                let pos = wPlayer.markerPosition.get()
                if (!pos.empty) {
                    wPlayer.removeShipMarker()
                    wPlayer.markerPosition.clear()
                }

                level.entities
                    .filter((entity) => entity.type === 'minecraft:parrot')
                    .forEach((entity) => {
                        if (!entity.isInSittingPose() && entity.owner === player) {
                            entity.startRiding(vehicle)
                        }
                    })
            }
        }
    } else {
        if (player.tags.contains('on_ship')) {
            player.removeTag('on_ship')
            wPlayer.addShipMarker()
        }
    }
})

EntityEvents.death('minecraft:player', (event) => {
    const { player, level, server } = event
    if (!level.overworld) return
    const wPlayer = PlayerHelper(player)
    const shipPos = wPlayer.shipPosition.get()
    if (shipPos) {
        let blockPos = new BlockPos(shipPos.x, shipPos.y, shipPos.z)
        console.debug(`Ship Position: ${blockPos}`)
        server
            .getPlayer(player)
            .setRespawnPosition(level.dimensionKey, blockPos.above(), player.yRot, true, false)
    }
})

PlayerEvents.respawned((event) => {
    const { player, level } = event
    if (!level.overworld) return
    const wPlayer = PlayerHelper(player)
    const shipPos = wPlayer.shipPosition.get()
    if (!shipPos.empty) {
        let blockPos = new BlockPos(shipPos.x, shipPos.y, shipPos.z)
        player.setPos(blockPos.above())
        event.server.scheduleInTicks(20, (task) => {
            const ship = wPlayer.getShip()
            if (ship) {
                player.setPos(ship.blockPosition().above())
                player.startRiding(ship)
            } else {
                wPlayer.shipPosition.clear()
            }
        })
    }
})

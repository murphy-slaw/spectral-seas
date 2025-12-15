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
        if (shipTypes.includes(vehicle.type)) {
            if (!player.tags.contains('on_ship')) {
                let vehicleUuid = vehicle.getUuid().toString()
                console.debug(`Vehicle UUID: ${vehicleUuid}\n shipId: ${shipID}`)

                if (!shipID || shipID !== vehicleUuid) {
                    console.info(`Setting shipID: ${vehicleUuid}`)
                    wPlayer.shipID.set(vehicleUuid)
                }
                player.addTag('on_ship')

                let pos = wPlayer.markerPosition.get()
                if (!pos.empty) {
                    console.info(`Sending DeleteMarker: ${pos}`)
                    player.sendData('DeleteMarker', { pos: pos })
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
    const wPlayer = PlayerHelper(player)
    const ship = wPlayer.getShip()
    if (ship) {
        console.info(`Ship: ${ship}`)
        server
            .getPlayer(player)
            .setRespawnPosition(
                level.dimensionKey,
                ship.blockPosition().above(),
                player.yRot,
                true,
                false
            )
    }
})

PlayerEvents.respawned((event) => {
    const { player } = event
    const wPlayer = PlayerHelper(player)
    const ship = wPlayer.getShip()
    if (ship) {
        player.startRiding(ship)
        player.setPos(ship.blockPosition().above())
    }
})

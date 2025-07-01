const shipTypes = ['smallships:cog', 'smallships:brigg', 'smallships:drakkar', 'smallships:galley']

function getShipName (ship, shipType, player) {
    let shipName = `The Good Ship §6§o${ship.name.string}`
    if (ship.name.string.toLowerCase() === shipType) {
        shipName = [
            `${player.name.string}'s`,
            Utils.toTitleCase(ship.nbt.getString('Type')),
            Utils.toTitleCase(ship.name.string),
        ].join(' ')
    }
    return shipName
}

function addShipMarker (ship, player, pos) {
    let shipType = ship.type.split(':')[1].toLowerCase()
    player.sendData('AddMarker', {
        texture: `antique_atlas:ship/${shipType}`,
        pos: pos,
        color: ship.nbt.get('Sail').getString('Color'),
        label: JSON.stringify({ text: getShipName(ship, shipType, player) }),
    })
}

PlayerEvents.tick(event => {
    const {
        player,
        player: { vehicle },
        level,
    } = event

    const shipID = player.persistentData.getString('shipID')

    if (vehicle) {
        if (shipTypes.includes(vehicle.type)) {
            if (!player.tags.contains('on_ship')) {
                let vehicleUuid = vehicle.getUuid().toString()
                console.info(`Vehicle UUID: ${vehicleUuid}\n shipId: ${shipID}`)
                if (!shipID || shipID != vehicleUuid) {
                    console.info(`Setting shipID: ${vehicleUuid}`)
                    player.persistentData.putString('shipID', vehicleUuid)
                }
                player.addTag('on_ship')
                let pos = player.persistentData.getCompound('MarkerPosition')
                console.log(pos)
                if (!pos.empty) {
                    console.log('Sending DeleteMarker')
                    player.sendData('DeleteMarker', { pos: pos })
                    player.persistentData.remove('MarkerPosition')
                }

                level.entities
                    .filter(entity => entity.type === 'minecraft:parrot')
                    .forEach(entity => {
                        if (entity.owner === player) {
                            entity.startRiding(vehicle)
                        }
                    })
            }
        }
    } else {
        if (player.tags.contains('on_ship')) {
            player.removeTag('on_ship')
            let pos = {
                x: Math.floor(player.x),
                y: Math.floor(player.y),
                z: Math.floor(player.z),
            }
            player.persistentData.put('MarkerPosition', pos)
            let ship = level.getEntity(UUID.fromString(shipID))
            addShipMarker(ship, player, pos)
        }
    }
})

EntityEvents.death('minecraft:player', event => {
    const { player, level, server } = event
    let shipID = player.persistentData.getString('shipID')
    if (shipID) {
        console.info(`Ship ID: ${shipID}`)
        let ship = level.getEntity(UUID.fromString(shipID))
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
        } else {
            console.info(`Ship not found!`)
            player.persistentData.remove('shipID')
        }
    }
})

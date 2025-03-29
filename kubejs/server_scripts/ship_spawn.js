const shipTypes = [
    'smallships:cog',
    'smallships:brigg',
    'smallships:drakkar',
    'smallships:galley',
]

PlayerEvents.tick(event => {
    const player = event.player
    const vehicle = player.getVehicle()
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

                event.level.entities
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
            let ship = event.level.getEntity(UUID.fromString(shipID))
            let pos = {
                x: Math.floor(player.x),
                y: Math.floor(player.y),
                z: Math.floor(player.z),
            }
            player.persistentData.put('MarkerPosition', pos)
            let color = ship.nbt.get('Sail').getString('Color')
            let shipName = `The Good Ship §6§o${ship.name.string}`
            let shipType = ship.type.split(':')[1].toLowerCase()
            if (ship.name.string.toLowerCase() === shipType) {
                shipName = [
                    `${player.name.string}'s`,
                    Utils.toTitleCase(ship.nbt.getString('Type')),
                    Utils.toTitleCase(ship.name.string),
                ].join(' ')
            }
            event.player.sendData('AddMarker', {
                texture: `antique_atlas:ship/${shipType}`,
                pos: { x: pos.x, y: pos.y, z: pos.z },
                color: color,
                label: shipName,
            })
        }
    }
})

EntityEvents.death('minecraft:player', event => {
    let shipID = event.player.persistentData.getString('shipID')
    if (shipID) {
        console.info(`Ship ID: ${shipID}`)
        let ship = event.level.getEntity(UUID.fromString(shipID))
        if (ship) {
            console.info(`Ship: ${ship}`)
            setSpawn(
                event.player,
                Math.floor(ship.x),
                Math.floor(ship.y) + 1,
                Math.floor(ship.z)
            )
        } else {
            console.info(`Ship not found!`)
            event.player.persistentData.remove('shipID')
        }
    }
})

function setSpawn (player, x, y, z) {
    Utils.server.runCommand(`spawnpoint ${player.username} ${x} ${y} ${z}`)
}

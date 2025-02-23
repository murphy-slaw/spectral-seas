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
                if (!pos.empty) {
                    player.runCommandSilent(
                        `surveyor landmarks remove surveyor:point ${pos.x} ${pos.y} ${pos.z}`
                    )
                    player.persistentData.remove('MarkerPosition')
                }
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
            addAntiqueAtlasMarker(
                player.level,
                `antique_atlas:ship/${shipType}`,
                pos,
                color,
                shipName
            )
        }
    }
})

EntityEvents.death('minecraft:player', event => {
    let shipID = event.player.persistentData.getString('shipID')
    if (shipID) {
        console.info(`Ship ID: ${shipID}`)
        let entities = event.level.getEntities()
        let ship = event.level.getEntity(UUID.fromString(shipID))
        if (ship) {
            console.info(`Ship: ${ship}`)
            Utils.server.runCommand(
                `execute as ${
                    event.player.username
                } run spawnpoint @s ${Math.floor(ship.x)} ${
                    Math.floor(ship.y) + 1
                } ${Math.floor(ship.z)}`
            )
        } else {
            console.info(`Ship not found!`)
            event.player.persistentData.remove('shipID')
        }
    }
})

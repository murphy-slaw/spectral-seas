const shipTypes = [
    "smallships:cog",
    "smallships:brigg",
    "smallships:drakkar",
    "smallships:galley"
]
PlayerEvents.tick(event => {
    let player = event.player
    let vehicle = player.getVehicle()

    if (vehicle) {
        if (shipTypes.includes(vehicle.type)) {
            if (!player.tags.contains('on_ship')) {
                player.addTag("on_ship")
            }
        }
    } else {
        if (player.tags.contains("on_ship")) {
            player.removeTag("on_ship")
            let name = player.username + ''
            let pos = Math.floor(event.player.x) + ' ' + Math.floor(event.player.y) + ' ' + Math.floor(event.player.z)

            Utils.server.scheduleInTicks(1, callback => {
                Utils.server.runCommandSilent('execute as ' + name + ' run spawnpoint @s ' + pos)
            })
			Utils.server.runCommandSilent('tellraw ' + name + ' "Spawnpoint has been set to your ship\'s location"')	
        }
    }
})
const shipTypes = [
    "smallships:cog",
    "smallships:brigg",
    "smallships:drakkar",
    "smallships:galley"
];

PlayerEvents.tick(event => {
    const player = event.player;
    const vehicle = player.getVehicle();

    if (vehicle) {
        if (shipTypes.includes(vehicle.type)) {
            if (!player.tags.contains('on_ship')) {
                player.addTag("on_ship");
                let markerPos = player.persistentData.getCompound("MarkerPosition");
                if (markerPos) {
                    player.runCommandSilent(`surveyor landmarks remove surveyor:point ${markerPos.x} ${markerPos.y} ${markerPos.z}`);
                }
            }
        }
    } else {
        if (player.tags.contains("on_ship")) {
            player.removeTag("on_ship");
            let markerPos = {};
            markerPos.x = Math.floor(player.x);
            markerPos.y = Math.floor(player.y);
            markerPos.z = Math.floor(player.z);
            player.persistentData.put("MarkerPosition", markerPos);
            Utils.server.scheduleInTicks(1, callback => {
                Utils.server.runCommandSilent(`execute as ${player.username} run spawnpoint @s ${markerPos.x} ${markerPos.y} ${markerPos.z}`);
                Utils.server.runCommandSilent(`execute as ${player.username} run surveyor landmarks add surveyor:point ${markerPos.x} ${markerPos.y} ${markerPos.z} red Ship`);
            });
            Utils.server.runCommandSilent(`tellraw ${player.username} "Spawnpoint has been set to your ship\'s location"`);
        }
    }
});;
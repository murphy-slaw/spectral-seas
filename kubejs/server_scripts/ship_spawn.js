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
                let shipID = player.persistentData.get("shipID");
                let vehicleUuid = vehicle.getUuid().toString();
                console.info(`Vehicle UUID: ${vehicleUuid}\n shipId: ${shipID}`);
                if (!shipID || shipID != vehicleUuid) {
                    console.info("Setting shipID");
                    player.persistentData.put("shipID", vehicleUuid.toString());
                }
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
                //Utils.server.runCommandSilent(`execute as ${player.username} run spawnpoint @s ${markerPos.x} ${markerPos.y} ${markerPos.z}`);
                Utils.server.runCommandSilent(`execute as ${player.username} run surveyor landmarks add surveyor:point ${markerPos.x} ${markerPos.y} ${markerPos.z} red ${player.username}'s Ship`);
            });
        }
    }
});

EntityEvents.death('minecraft:player', event => {
    let shipID = event.player.persistentData.get("shipID");
    if (shipID) {
        console.info(`Ship ID: ${shipID}`);
        let ship = null;
        let ents = event.level.getEntities();
        for (let ent of ents) {
            if (ent.uuid.toString() == shipID) {
                ship = ent;
                break;
            }
        }
        if (ship) {
            console.info(`Ship: ${ship}`);
            Utils.server.runCommand(`execute as ${event.player.username} run spawnpoint @s ${Math.trunc(ship.x)} ${Math.trunc(ship.y) + 1} ${Math.trunc(ship.z)}`);
        } else {
            console.info(`Ship not found!`);
            event.player.persistentData.delete("shipID");
        }
    }
});
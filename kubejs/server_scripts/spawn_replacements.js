EntityEvents.spawned(event => {
    // Define constants
    const entity = event.entity;

    // Skip the logic if the entity is a player or is not living
    if (entity.isPlayer() || !entity.isLiving()) {
        return;
    }

    if (entity.type == "minecraft:pillager") {
        event.server.runCommandSilent(`execute in ${entity.level.dimension} positioned ${entity.x} ${entity.y} ${entity.z} run summon guntotingillagers:musketeer`)
        event.cancel()
    }

    if (entity.type == "hybrid-aquatic:coconut_crab"){
        event.server.runCommandSilent(`execute in ${entity.level.dimension} positioned ${entity.x} ${entity.y} ${entity.z} run summon ecologics:coconut_crab`)
        event.cancel()
    }
});

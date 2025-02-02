const scaleTypes = Java.loadClass("virtuoel.pehkui.api.ScaleTypes");
const baseScale = scaleTypes.BASE;

const pillagerHats = [
    "simplehats:bicorne",
    "simplehats:tricorne",
    "simplehats:eyepatch",
    "minecraft:empty"
];

const vindicatorWeapons = [
    "simplyswords:iron_cutlass",
    "simplyswords:iron_rapier",
    "minecraft:iron_axe"
];

const pillagerWeapons = [
    "musketmod:pistol"
];

EntityEvents.spawned(event => {
    // Define constants
    const entity = event.entity;

    // Skip the logic if the entity is a player or is not living
    if (entity.isPlayer() || !entity.isLiving()) {
        return;
    }

    if (entity.type == "minecraft:pillager") {
        entity.setItemSlot(
            "head",
            Item.of(Utils.randomOf(Utils.random, pillagerHats))
        );
        entity.setItemSlot(
            "mainhand",
            Item.of(Utils.randomOf(Utils.random, pillagerWeapons))
        );
    }

    if (entity.type == "minecraft:vindicator") {
        entity.setItemSlot(
            "head",
            Item.of(Utils.randomOf(Utils.random, pillagerHats))
        );
        entity.setItemSlot(
            "mainhand",
            Item.of(Utils.randomOf(Utils.random, vindicatorWeapons))
        );
    }

    if (entity.type == "hybrid-aquatic:coconut_crab") {
        // event.server.runCommandSilent(`execute in ${entity.level.dimension} positioned ${entity.x} ${entity.y} ${entity.z} run summon ecologics:coconut_crab`)
        event.cancel();
    }

    if (entity.type == "hybrid-aquatic:karkinos") {
        console.infof("Summoned Karkinos: %s", entity.uuid);
        baseScale.getScaleData(entity).setScale(3);
    }
    if (entity.type == "minecraft:drowned") {
        var data = entity.nbt;
        data.put("HandDropChances", NBT.listTag([NBT.floatTag(0.085), NBT.floatTag(0.3)]));
        entity.setNbt(data);
    }
});
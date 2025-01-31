const UNIQUE_CONFIG = "kubejs/config/unique_items.json";

ServerEvents.loaded(event => {
    let levelOW = event.server.getLevel("minecraft:overworld");
    let uniques = levelOW.persistentData.getCompound("uniqueItems");
    if (uniques.isEmpty()) {
        console.log("VOOT");
        let config = JsonIO.read(UNIQUE_CONFIG);
        config["uniqueItems"].forEach(itemId => {
            uniques.putInt(itemId, 0);
        });
        levelOW.persistentData.put("uniqueItems", uniques);
    } else {
        console.log("DAMN");
    }
    console.log(levelOW.persistentData.getCompound("uniqueItems"));
});

LootJS.modifiers((event) => {
    let lootTable = /.*/;
    event.addLootTableModifier(lootTable).apply(ctx => {
        let level = ctx.level;
        let uniques = level.persistentData.getCompound("uniqueItems");
        let excess = {};
        let reserve = [];
        ctx.forEachLoot(itemStack => {
            if (uniques.contains(itemStack.id)) {
                let count = uniques.getInt(itemStack.id);
                excess[itemStack.id] = true;
                if (count === 0) {
                    uniques.put(itemStack.id, ++count);
                    reserve.push(itemStack);
                }
            }
        });

        for (var key in excess) {
            console.log(`removing ${key}`);
            ctx.removeLoot(key);
        }

        reserve.forEach(stack => {
            console.log(`adding one ${stack.id}`);
            ctx.addLoot(LootEntry.of(stack.id));
        });

        level.persistentData.put("uniqueItems", uniques);
    });
});


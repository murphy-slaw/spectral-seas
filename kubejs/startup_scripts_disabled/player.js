const DIVING_SET = [
    'hybrid-aquatic:diving_helmet',
    'hybrid-aquatic:diving_suit',
    'hybrid-aquatic:diving_leggings',
    'hybrid-aquatic:diving_boots'
];

const INFINITE = Java.loadClass('java.lang.Integer').MAX_VALUE;
const bonuses = {
    set1: {
        armors: DIVING_SET,
        bonus: [],
        enchant: ['minecraft:aqua_affinity', 0, "EquipmentSlot.HEAD"]
    },
};

function armor_set_bonus(context) {
    const { previousStack, currentStack, entity } = context;
    const potionEffects = entity.potionEffects;
    const armorSlots = entity.armorSlots;
    console.infof("Entity: %s", entity);
    console.infof("prev: %s", previousStack);
    console.infof("cur: %s", currentStack);

    const last_set = armorSlots.toArray().map(i => i.id);
    console.info(last_set);
    const now_set = last_set.map(i => (i == previousStack.id ? currentStack.id : i));
    console.info(now_set);

    Object.keys(bonuses).forEach(set => {
        const data = bonuses[set];
        console.infof("Set: %s", data);
        const { armors, bonus, enchant } = data;
        if (!armors.every(a => now_set.includes(a))) {
            console.infof("NO MATCH: %s", armorSlots);
            if (bonus.length) entity.removeEffect(bonus[0]);
            if (enchant.length) {
                let enchantmentTags = armorSlots[enchant[2]].enchantmentTags;
                for (let i = 0; i < enchantmentTags.size(); i++) {
                    let enchantment = enchantmentTags.get(i);
                    if (enchantment.get("id") == enchant[0]) {
                        // If the enchantment is found, remove it
                        enchantmentTags.remove(i);
                    }
                }
            }
        }
        if (armors.every(a => now_set.includes(a))) {
            console.info(enchant);
            if (bonus.length) potionEffects.add(bonus[0], INFINITE, bonus[1] || 0, true, bonus[2] || false);
            if (enchant.length) {
                console.infof("MOO: %s", enchant);
                entity.getItemBySlot(enchantment[2]).enchant(enchantment[0], enchantment[1])
            }
        }
    });
};
EntityJSEvents.modifyEntity(e => {
    e.modify('minecraft:player', modifyBuilder => {
        modifyBuilder.onEquipItem(context => armor_set_bonus(context));
    });
});

ItemEvents.modification(event => {
    event.modify('minecraft:suspicious_stew', item => { item.maxStackSize = 16; });
    event.modify('minecraft:rabbit_stew', item => { item.maxStackSize = 16; });
    event.modify('minecraft:mushroom_stew', item => { item.maxStackSize = 16; });
    event.modify('minecraft:beetroot_soup', item => { item.maxStackSize = 16; });
    event.modify('ecologics:tropical_stew', item => { item.maxStackSize = 16; });
    event.modify('minecraft:bread', item => {
        item.maxStackSize = 16;
        item.foodProperties = food => {
            food.hunger(5);
            food.saturation(0.4);
            food.meat(false);
            food.alwaysEdible(false);
            food.fastToEat(false);
        };
    });
    event.modify('minecraft:potion', item => { item.maxStackSize = 3; });

});

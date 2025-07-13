ItemEvents.modification((event) => {
    event.modify('minecraft:bread', (item) => {
        item.maxStackSize = 16
        item.foodProperties = (food) => {
            food.hunger(5)
            food.saturation(0.4)
            food.meat(false)
            food.alwaysEdible(false)
            food.fastToEat(false)
        }
    })
    event.modify('minecraft:potion', (item) => {
        item.maxStackSize = 3
    })
    event.modify('milk:milk_bottle', (item) => {
        item.maxStackSize = 3
    })
})

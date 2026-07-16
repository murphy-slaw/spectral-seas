Platform.mods.kubejs.name = 'Spectral Seas'

StartupEvents.registry('item', (event) => {
    event
        .create('spectral_seas:suspicious_chowder')
        .food((food) => {
            food.hunger(6).saturation(0.6).alwaysEdible(true).fastToEat(false).meat(false)
        })
        .texture('minecraft:item/suspicious_stew')
        .maxStackSize(16)
})
StartupEvents.registry('item', (event) => {
    event
        .create('spectral_seas:potato_soup')
        .food((food) => {
            food.hunger(2)
                .saturation(0.2)
                .alwaysEdible(true)
                .fastToEat(false)
                .meat(false)
                .effect('minecraft:nausea', 100, 10, 1)
                .effect('minecraft:poison', 50, 0, 1)
        })
        .texture('minecraft:item/suspicious_stew')
        .maxStackSize(16)
})

StartupEvents.modifyCreativeTab('minecraft:food_and_drinks', (event) => {
    event.add('spectral_seas:suspicious_chowder')
})

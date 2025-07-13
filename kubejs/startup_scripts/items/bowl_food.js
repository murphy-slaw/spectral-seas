Platform.mods.kubejs.name = 'Spectral Seas'

StartupEvents.registry('item', (event) => {
    event
        .create('spectral_seas:mushroom_stew')
        .food((food) => {
            food.hunger(6).saturation(0.6).alwaysEdible(false).fastToEat(false).meat(false)
        })
        .maxStackSize(8)

    event
        .create('spectral_seas:beetroot_soup')
        .food((food) => {
            food.hunger(6).saturation(0.6).alwaysEdible(false).fastToEat(false).meat(false)
        })
        .maxStackSize(8)

    event
        .create('spectral_seas:rabbit_stew')
        .food((food) => {
            food.hunger(14).saturation(0.6).alwaysEdible(false).fastToEat(false).meat(false)
        })
        .maxStackSize(8)

    event
        .create('spectral_seas:suspicious_chowder')
        .food((food) => {
            food.hunger(6).saturation(0.6).alwaysEdible(true).fastToEat(false).meat(false)
        })
        .texture('minecraft:item/suspicious_stew')
        .maxStackSize(8)
})

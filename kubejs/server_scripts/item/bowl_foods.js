ItemEvents.foodEaten('spectral_seas:mushroom_stew', (event) => {
    if (event.player != null) {
        event.player.give('minecraft:bowl')
    }
})

ItemEvents.foodEaten('spectral_seas:rabbit_stew', (event) => {
    if (event.player != null) {
        event.player.give('minecraft:bowl')
    }
})

ItemEvents.foodEaten('spectral_seas:beetroot_soup', (event) => {
    if (event.player != null) {
        event.player.give('minecraft:bowl')
    }
})

ItemEvents.foodEaten('spectral_seas:tropical_stew', (event) => {
    if (event.player != null) {
        event.player.give('ecologics:coconut_husk')
    }
})

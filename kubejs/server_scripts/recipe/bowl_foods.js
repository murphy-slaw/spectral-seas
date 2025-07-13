ServerEvents.recipes((event) => {
    event.replaceOutput(
        { output: 'minecraft:mushroom_stew' },
        'minecraft:mushroom_stew',
        'spectral_seas:mushroom_stew'
    )

    event.replaceOutput(
        { output: 'minecraft:rabbit_stew' },
        'minecraft:rabbit_stew',
        'spectral_seas:rabbit_stew'
    )

    event.replaceOutput(
        { output: 'minecraft:beetroot_soup' },
        'minecraft:beetroot_soup',
        'spectral_seas:beetroot_soup'
    )

    event.remove('minecraft:suspicious_stew')
})

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

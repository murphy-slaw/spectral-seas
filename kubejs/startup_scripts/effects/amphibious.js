StartupEvents.registry('mob_effect', (event) => {
    event
        .create('spectral_seas:amphibious') // Create the effect under "kubejs:amphibious"
        .color(0x219985) // Sets the color of the Effect's Particles.
        .beneficial() // Categorizes the Effect as Beneficial.
})

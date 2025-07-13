StartupEvents.registry('potion', (e) => {
    e.createCustom('spectral_seas:grog', () =>
        new $PotionBuilder('spectral_seas:grog')
            .effect('strength', 300)
            .effect('staminafortweakers:tirelessness', 300)
            .effect('nausea', 400)
            .createObject()
    )
})

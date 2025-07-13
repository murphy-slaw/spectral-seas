const $MobEffect = Java.loadClass('net.minecraft.world.effect.MobEffect')

ItemEvents.foodEaten('spectral_seas:suspicious_chowder', (event) => {
    const effects = event.item.nbt.CustomPotionEffects
    if (effects !== undefined) {
        effects.forEach((effect) => {
            event.player.potionEffects.add(
                $MobEffect.byId(effect.Id),
                effect.Duration,
                effect.Amplifier,
                Boolean(effect.Ambient),
                Boolean(effect.ShowParticles)
            )
        })
    }
})

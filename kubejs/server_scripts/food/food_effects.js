const $MobEffect = Java.loadClass('net.minecraft.world.effect.MobEffect')
const reg = Utils.getRegistry('minecraft:mob_effect')

const DEFAULT_EFFECTS = [
    NBT.compoundTag({
        Location: 'minecraft:poison',
        Duration: 50,
        Amplifier: 0,
        Ambient: false,
        ShowParticles: true,
    }),
]

/**
 *
 * @param {Internal.ServerPlayer} player
 * @param {Internal.List<Internal.CompoundTag>} effectList
 */
const addEffects = (player, effectList) => {
    effectList.forEach((effect) => {
        console.log(effect)
        const mobEffect = effect.Location
            ? reg.getValue(effect.Location)
            : reg.getVanillaRegistry().byId(effect.Id)

        console.log(mobEffect)

        if (mobEffect)
            player.potionEffects.add(
                mobEffect,
                effect.Duration,
                effect.Amplifier,
                Boolean(effect.Ambient),
                Boolean(effect.ShowParticles)
            )
    })
}

ItemEvents.foodEaten('spectral_seas:suspicious_chowder', (event) => {
    addEffects(event.player, DEFAULT_EFFECTS)
})

ItemEvents.foodEaten((event) => {
    if (event.item.nbt) {
        let effects = event.item.nbt.CustomPotionEffects
        if (effects) {
            addEffects(event.player, effects)
        }
    }
})

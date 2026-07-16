ItemEvents.tooltip((event) => {
    const reg = Utils.getRegistry('mob_effect')
    event.addAdvanced('spectral_seas:suspicious_chowder', (stack, advanced, text) => {
        /** @type {Internal.ListTag} */
        if (stack.nbt) {
            let effects = stack.nbt.CustomPotionEffects
            if (effects)
                effects.forEach((effect) => {
                    /** @type {Internal.MobEffect} */
                    const mobEffect = reg.getValue(effect.Id)
                    text.add(Text.translatable(mobEffect.getDescriptionId()))
                })
        }
    })
})

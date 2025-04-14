// Make MobEffects for Pehkui resizing. Requires Pehkui, obviously.

StartupEvents.registry('mob_effect', event => {
    event
        .create('spectral_seas:shrinking')
        .color(0x495e27)
        .harmful()
        .effectTick(entity => {
            global.shrink(entity)
        })
    event
        .create('spectral_seas:growth')
        .color(0x6f4d1b)
        .beneficial()
        .effectTick(entity => {
            global.grow(entity)
        })
})

/**
 * Shrinks an entity based on the amplifier of the 'spectral_seas:shrinking' effect instance on the entity
 * @param {Internal.LivingEntity} entity
 */
global.shrink = function (entity) {
    global.modifySize(entity, 'spectral_seas:shrinking', s => 1 / (s + 2))
}
/**
 * Grows an entity based on the amplifier of the 'spectral_seas:growth' effect instance on the entity
 * @param {Internal.LivingEntity} entity
 */
global.grow = function (entity) {
    global.modifySize(entity, 'spectral_seas:growth', s => s + 2)
}

/**
 * Changes the scale of the entity based on the amplifier of the named effect and the provided sizeFunc.
 * @param {Internal.LivingEntity} entity
 * @param {string} effectId
 * @param {function} sizeFunc
 */
global.modifySize = function (entity, effectId, sizeFunc) {
    /**
     * @type {Internal.MobEffectInstance}
     */
    let effectInstance = entity.activeEffectsMap.get(
        Utils.getRegistry('mob_effect').getValue(effectId)
    )
    let scaleData = scaleTypes.BASE.getScaleData(entity)
    // We use targetScale here so that the size change is spread out across scaleTickDelay
    if (effectInstance.endsWithin(1)) {
        // If the effect instance is about to expire, reset the entity's scale.
        scaleData.targetScale = 1.0
    } else if (scaleData.scale === 1.0) {
        // Otherwise if we haven't already resized it, scale the entity
        // Spread the size change by a tenth of the effect duration, but no longer than 5 seconds
        scaleData.setScaleTickDelay(Math.min(effectInstance.duration / 10, 100))
        scaleData.targetScale = sizeFunc(effectInstance.amplifier)
    }
}

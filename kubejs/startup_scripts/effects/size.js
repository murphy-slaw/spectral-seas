// Make MobEffects for Pehkui resizing. Requires Pehkui, obviously.
const $MobEffectInstance = Java.loadClass('net.minecraft.world.effect.MobEffectInstance')
var $ScaleTypes = Java.loadClass('virtuoel.pehkui.api.ScaleTypes')

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
    let scaleData = $ScaleTypes.BASE.getScaleData(entity)
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

const $PotionBuilder = Java.loadClass('dev.latvian.mods.kubejs.misc.PotionBuilder')

StartupEvents.registry('potion', e => {
    e.createCustom('spectral_seas:shrinking_potion', () =>
        new $PotionBuilder('spectral_seas:shrinking_potion')
            .effect('spectral_seas:shrinking', 300)
            .createObject()
    )
    e.createCustom('spectral_seas:growth_potion', () =>
        new $PotionBuilder('spectral_seas:growth_potion')
            .effect('spectral_seas:growth', 300)
            .createObject()
    )
})

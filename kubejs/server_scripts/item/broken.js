const $HitResult$Type = Java.loadClass('net.minecraft.world.phys.HitResult$Type')
const $HitResult = Java.loadClass('net.minecraft.world.phys.HitResult')
const $EventResult = Java.loadClass('dev.architectury.event.EventResult')

/**
 * @param {Internal.ItemStack} itemStack
 * @returns {boolean}
 */
function isBroken (itemStack) {
    return itemStack.isDamageableItem() && itemStack.damageValue >= itemStack.maxDamage
}

EntityEvents.hurt(event => {
    if (event.source.getType() == 'player') {
        /** @type {Internal.Player} */
        let player = event.source.getImmediate()
        let item = player.getMainHandItem()
        console.log(item.id)
        if (isBroken(item)) event.cancel()
    }
})

ItemEvents.entityInteracted(event => {
    if (isBroken(event.item)) event.cancel()
})

ItemEvents.rightClicked(event => {
    if (isBroken(event.item)) event.cancel()
})

BlockEvents.rightClicked(event => {
    if (isBroken(event.item)) event.cancel()
})

BlockEvents.leftClicked(event => {
    if (isBroken(event.item)) event.cancel()
})

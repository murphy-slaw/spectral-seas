/**
 * @param {Internal.ItemStack} itemStack
 * @returns {boolean}
 */
function isBroken(itemStack) {
    return itemStack.isDamageableItem() && itemStack.damageValue >= itemStack.maxDamage
}

EntityEvents.hurt((event) => {
    if (event.source.getType() === 'player') {
        /** @type {Internal.Player} */
        const player = event.source.getImmediate()
        const item = player.getMainHandItem()
        console.log(item.id)
        if (isBroken(item)) event.cancel()
    }
})

ItemEvents.entityInteracted((event) => {
    if (isBroken(event.item)) event.cancel()
})

ItemEvents.rightClicked((event) => {
    if (isBroken(event.item)) event.cancel()
})

BlockEvents.rightClicked((event) => {
    if (isBroken(event.item)) event.cancel()
})

BlockEvents.leftClicked((event) => {
    if (isBroken(event.item)) event.cancel()
})

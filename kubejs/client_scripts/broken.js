/**
 * @param {Internal.ItemStack} itemStack
 * @returns {boolean}
 */
function isBroken (itemStack) {
    return itemStack.isDamageableItem() && itemStack.damageValue >= itemStack.maxDamage
}

FabricEvents.handleClient('PreAttack', event => {
    let params = event.getParameters()
    /** @type {Internal.Minecraft} */
    let client = params.arg0
    /** @type {Internal.ClientPlayerKJS} */
    let player = params.arg1
    /** @type {number} */
    let clickCount = params.arg2
    let itemStack = player.getHandSlots()[0]
    if (isBroken(itemStack)) {
        event.setResult(true)
    } else {
        event.setResult(false)
    }
})

ItemEvents.entityInteracted(event => {
    if (isBroken(event.item)) event.cancel()
})

ItemEvents.rightClicked(event => {
    if (isBroken(event.item)) event.cancel()
})

ItemEvents.firstLeftClicked(event => {
    if (isBroken(event.item)) event.cancel()
})

BlockEvents.rightClicked(event => {
    if (isBroken(event.item)) event.cancel()
})

BlockEvents.leftClicked(event => {
    if (isBroken(event.item)) event.cancel()
})

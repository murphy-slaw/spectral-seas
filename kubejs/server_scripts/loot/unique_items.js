//priority: 0
const UNIQUE_CONFIG = 'kubejs/config/unique_items.json'

ServerEvents.loaded(event => {
    let uniques = event.server.persistentData.getCompound('uniqueItems')
    if (uniques.isEmpty()) {
        JsonIO.read(UNIQUE_CONFIG).uniqueItems.forEach(itemId => uniques.putInt(itemId, 0))
        event.server.persistentData.put('uniqueItems', uniques)
    }
    console.log(event.server.persistentData.getCompound('uniqueItems'))
})

LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.CHEST).apply(ctx => {
        let uniques = ctx.server.persistentData.getCompound('uniqueItems')
        let allowed = []
        let banned = []
        ctx.forEachLoot(itemStack => {
            if (uniques.contains(itemStack.id)) {
                let count = uniques.getInt(itemStack.id)
                if (count === 0) {
                    uniques.put(itemStack.id, ++count)
                    allowed.push(itemStack)
                } else {
                    console.log(`Unique item ${itemStack.id} already exists, banned.`)
                    banned.push(itemStack)
                }
            }
        })
        banned.forEach(stack => ctx.removeLoot(stack.id))
        allowed.forEach(stack => stack.setCount(1))
        ctx.server.persistentData.put('uniqueItems', uniques)
    })
})

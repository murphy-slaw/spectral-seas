//priority: 0
const UNIQUE_CONFIG = 'kubejs/config/unique_items.json'
const UNIQUE_KEY = 'uniqueItems'

ServerEvents.loaded((event) => {
    let uniques = event.server.persistentData.getCompound(UNIQUE_KEY)
    if (uniques.isEmpty()) {
        JsonIO.read(UNIQUE_CONFIG).uniqueItems.forEach((itemId) => uniques.putInt(itemId, 0))
        event.server.persistentData.put(UNIQUE_KEY, uniques)
    }
    console.log(event.server.persistentData.getCompound(UNIQUE_KEY))
})

LootJS.modifiers((event) => {
    event.addLootTypeModifier(LootType.CHEST, LootType.ENTITY).apply((ctx) => {
        const globalUniques = ctx.server.persistentData.getCompound(UNIQUE_KEY)
        if (ctx.player === null) return
        let uniques = ctx.player.persistentData.getCompound('uniqueItems')

        const allowed = []
        const banned = []
        ctx.forEachLoot((itemStack) => {
            if (globalUniques.contains(itemStack.id)) {
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
        banned.forEach((stack) => ctx.removeLoot(stack.id))
        allowed.forEach((stack) => stack.setCount(1))
        ctx.player.persistentData.put('uniqueItems', uniques)
    })
})

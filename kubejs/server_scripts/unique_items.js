//priority: 0
const UNIQUE_CONFIG = 'kubejs/config/unique_items.json'

ServerEvents.loaded(event => {
    let levelOW = event.server.getLevel('minecraft:overworld')
    let uniques = levelOW.persistentData.getCompound('uniqueItems')
    if (uniques.isEmpty()) {
        JsonIO.read(UNIQUE_CONFIG).uniqueItems.forEach(itemId =>
            uniques.putInt(itemId, 0)
        )
        levelOW.persistentData.put('uniqueItems', uniques)
    }
    console.log(levelOW.persistentData.getCompound('uniqueItems'))
})

LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.CHEST).apply(ctx => {
        let uniques = ctx.level.persistentData.getCompound('uniqueItems')
        let allowed = []
        let banned = []
        ctx.forEachLoot(itemStack => {
            if (uniques.contains(itemStack.id)) {
                let count = uniques.getInt(itemStack.id)
                if (count === 0) {
                    uniques.put(itemStack.id, ++count)
                    allowed.push(itemStack)
                } else {
                    console.log(
                        `Unique item ${itemStack.id} already exists, banned.`
                    )
                    banned.push(itemStack)
                }
            }
        })
        banned.forEach(stack => ctx.removeLoot(stack.id))
        allowed.forEach(stack => stack.setCount(1))
        ctx.level.persistentData.put('uniqueItems', uniques)
    })
})

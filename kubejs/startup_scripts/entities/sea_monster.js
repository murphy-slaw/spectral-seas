EntityJSEvents.attributes((event) => {
    event.modify('minecraft:turtle', (attribute) => {
        attribute.add('minecraft:generic.attack_damage', 2)
    })
})

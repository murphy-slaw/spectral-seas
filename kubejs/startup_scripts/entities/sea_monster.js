EntityJSEvents.attributes(event => {
    event.modify('minecraft:turtle', attribute => {
        //Overwrite an allay's max health attribute setting it to 30.
        attribute.add('minecraft:generic.attack_damage', 2)
    })
})

EntityJSEvents.modifyEntity(event => {
    ;['hybrid-aquatic:great_white_shark', 'minecraft:turtle'].forEach(type => {
        event.modify(type, builder => {
            builder.onAddedToWorld(entity => {})
            builder.onRemovedFromWorld(entity => {
                console.log(`Sea Monster ${entity.stringUuid} removed`)
                /** @type {Internal.ServerLevel} */
                let level = entity.getLevel()
                let monsterMap = level.persistentData.getCompound('monsterMap')
                let keys = monsterMap.getAllKeys().toArray()
                keys.forEach(key => {
                    if (monsterMap.getUUID(key).equals(entity.uuid)) {
                        monsterMap.remove(key)
                    }
                })
            })
        })
    })
})

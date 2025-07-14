const scuteDelay = 3000
EntityJSEvents.modifyEntity((event) => {
    event.modify('minecraft:turtle', (builder) => {
        builder.tick((entity) => {
            let scuteTime = entity.persistentData.getInt('ScuteTime')
            if (scuteTime === 0) {
                scuteTime = scuteDelay + Utils.random.nextInt(scuteDelay)
            } else {
                scuteTime--
                if (scuteTime <= 0) {
                    entity.block.popItemFromFace(Item.of('minecraft:scute'), 'up')
                    scuteTime = scuteDelay + Utils.random.nextInt(scuteDelay)
                }
            }
            entity.persistentData.putInt('ScuteTime', scuteTime)
        })
    })
})

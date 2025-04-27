let loadCount = 0
LevelEvents.loaded('minecraft:overworld', event => {
    loadCount++
    console.log(`Loaded ${loadCount} times: ${event.level.isClientSide()}`)
})

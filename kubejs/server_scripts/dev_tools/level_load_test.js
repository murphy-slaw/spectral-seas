let loadCount = 0
LevelEvents.loaded('minecraft:overworld', (event) => {
    loadCount++
    console.debug(`Loaded ${loadCount} times: ${event.level.isClientSide()}`)
})

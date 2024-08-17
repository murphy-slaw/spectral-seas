WorldgenEvents.add(event => {
    event.addSpawn(spawnProperties =>{
        spawnProperties.biomes  = "minecraft:plains"
        spawnProperties.category = "creature"
        spawnProperties.entity = "adventurez:orc"
        spawnProperties.minCount = 1
        spawnProperties.maxCount = 1
        spawnProperties.weight = 100
    })
})
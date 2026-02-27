ServerEvents.recipes((event) => {
    event.remove({ output: 'pocket-repose:suitcase', input: 'minecraft:gold_ingot' })
    event.remove({ output: 'minecraft:lodestone', input: 'minecraft:netherite_ingot' })
})

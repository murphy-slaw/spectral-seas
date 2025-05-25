ServerEvents.recipes(event => {
    event.remove({ output: 'minecraft:bread' })
    event.shaped(Item.of('minecraft:bread'), ['WWW', 'WWW'], {
        W: 'minecraft:wheat',
    })
})

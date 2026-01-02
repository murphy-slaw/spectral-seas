ServerEvents.recipes((event) => {
    event.remove({ output: 'shears' })
    event.shaped('shears', [' cc', 'ss ', '   '], { c: 'copper_ingot', s: 'stick' })
})

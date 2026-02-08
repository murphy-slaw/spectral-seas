ServerEvents.recipes((event) => {
  event.remove({ output: 'minecraft:bundle' })
  event.shaped(Item.of('minecraft:bundle'), ['s  ', 'l  ', '   '], {
    s: 'minecraft:string',
    l: 'minecraft:leather',
  })
})

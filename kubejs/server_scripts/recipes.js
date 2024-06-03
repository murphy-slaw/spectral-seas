ServerEvents.recipes(event =>{
    event.remove({output: '#minecraft:boats'})

    event.replaceInput(
        {output: '#smallships:ships'},
        'minecraft:lead',
        'minecraft:leather'
   )

   event.replaceInput(
        {output:'smallships:sail'},
        'minecraft:lead',
        'minecraft:string'
   )

    for (const wood of ['acacia','oak','spruce','jungle','dark_oak','birch']){
        event.replaceInput(
            {output: '#smallships:ships'},
            'minecraft:'+ wood + '_boat',
            'minecraft:stripped_' + wood + '_log'
        )
        event.replaceInput(
            {output: '#smallships:briggs'},
            'minecraft:'+ wood + '_chest_boat',
            'minecraft:stripped_' + wood + '_log'
        )
    }
    let recipes = []
    event.forEachRecipe({}, r => {
        console.log(r.json.toString())
        recipes.push(JSON.parse(r.json.toString()))
    })
})
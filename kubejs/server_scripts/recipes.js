ServerEvents.recipes(event =>{
    event.remove({output: '#minecraft:boats'})
    let recipes = []
    event.forEachRecipe({}, r => {
        recipes.push(JSON.parse(r.json.toString()))
    })
    console.log(`recipes: ${JSON.stringify(recipes)}`)
})
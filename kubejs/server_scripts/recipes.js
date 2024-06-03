ServerEvents.recipes(event =>{
    event.remove({output: '#minecraft:boats'})
    let recipes = []
    event.forEachRecipe({}, r => {
        console.log(r.json.toString())
        recipes.push(JSON.parse(r.json.toString()))
    })
})
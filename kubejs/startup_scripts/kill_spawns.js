// priority: 0

WorldgenEvents.remove(event => {
    event.removeSpawns(spawns => {
        spawns.mobs = {
            id: /^hybrid-aquatic:.*_jellyfish$/
        }
    })
})
WorldgenEvents.remove(event => {
    event.removeSpawns(spawns => {
        spawns.mobs = {
            id: "hybrid-aquatic:mauve_stinger",
        }
    })
});
WorldgenEvents.remove(event => {
    event.removeSpawns(spawns => {
        spawns.mobs = {
            id: "hybrid-aquatic:sea_nettle"
        }
    })
})
/*
        "hybrid-aquatic:atolla_jellyfish",
        "hybrid-aquatic:barrel_jellyfish",
        "hybrid-aquatic:blue_jellyfish",
        "hybrid-aquatic:cauliflower_jellyfish",
        "hybrid-aquatic:compass_jellyfish",
        "hybrid-aquatic:fried_egg_jellyfish",
        "hybrid-aquatic:lions_mane_jellyfish",
        "hybrid-aquatic:mauve_stinger",
        "hybrid-aquatic:moon_jellyfish",
        "hybrid-aquatic:nomura_jellyfish",
        "hybrid-aquatic:sea_nettle"
*/
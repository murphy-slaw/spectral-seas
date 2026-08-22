// priority: -1000

// Set bonus definitions file
// Assuming you open the whole minecraft folder/kubejs folder in vscode, you should be able to hover over
// the functions below to see their types and documentation. You can also check out the type definitions in `set_bonus_types.d.ts`.

registerSetBonus('Full Dive Suit', {
    helmet: ['hybrid_aquatic:diving_helmet'],
    chestplate: ['hybrid_aquatic:diving_suit'],
    leggings: ['hybrid_aquatic:diving_leggings'],
    boots: ['hybrid_aquatic:diving_boots'],
    tooltip: Text.of('Full Diving Set'),
    bonus: {
        potion_effects: [
            ['spectral_seas:amphibious', 1, false, false],
        ],
        attribute_modifiers: [],
    },
})

registerSetBonus('Cumbersome Dive Suit', {
    chestplate: ['hybrid_aquatic:diving_suit'],
    leggings: ['hybrid_aquatic:diving_leggings'],
    tooltip: Text.of('Cumbersome Diving Set'),
    bonus: {
        potion_effects: [
            ['minecraft:slowness', 2, false, false],
        ],
        attribute_modifiers: [],
    },
})
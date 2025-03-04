const SLAIN_ITEMS = [
    'simplyswords:brimstone_claymore',
    'simplyswords:watcher_claymore',
    'simplyswords:storms_edge',
    'simplyswords:stormbringer',
    'simplyswords:sword_on_a_stick',
    'simplyswords:bramblethorn',
    'simplyswords:watching_warglaive',
    'simplyswords:toxic_longsword',
    'simplyswords:emberblade',
    'simplyswords:hearthflame',
    'simplyswords:soulkeeper',
    'simplyswords:twisted_blade',
    'simplyswords:soulstealer',
    'simplyswords:soulrender',
    'simplyswords:soulpyre',
    'simplyswords:frostfall',
    'simplyswords:molten_edge',
    'simplyswords:livyatan',
    'simplyswords:icewhisper',
    'simplyswords:arcanethyst',
    'simplyswords:thunderbrand',
    'simplyswords:mjolnir',
    'simplyswords:slumbering_lichblade',
    'simplyswords:waking_lichblade',
    'simplyswords:awakened_lichblade',
    'simplyswords:shadowsting',
    'simplyswords:dormant_relic',
    'simplyswords:tainted_relic',
    'simplyswords:harbinger',
    'simplyswords:whisperwind',
    'simplyswords:emberlash',
    'simplyswords:hiveheart',
    'simplyswords:stars_edge',
    'simplyswords:wickpiercer',
    'simplyswords:flamewind',
    'simplyswords:ribboncleaver',
    'simplyswords:righteous_relic',
    'simplyswords:decaying_relic',
    'simplyswords:magiscythe',
    'simplyswords:magispear',
    'simplyswords:magiblade',
    'simplyswords:caelestis',
    'simplyswords:waxweaver',
    'simplyswords:tempest',
    'simplyswords:sunfire',
    'simplyswords:enigma',
    'simplyswords:runefused_gem',
    'simplyswords:netherfused_gem',
    'simplyswords:empowered_remnant',
    'simplyswords:contained_remnant',
    'simplyswords:tampered_remnant',
]
let BANNED_SUFFIXES = [
    'chakram',
    'glaive',
    'halberd',
    'claymore',
    'twinblade',
    'scythe',
    'katana',
    'greataxe',
    'greathammer',
    'sai',
    'spear',
]

StartupEvents.modifyCreativeTab('simplyswords:simplyswords', event => {
    Item.list
        .filter(item => item.idLocation.getNamespace() === 'simplyswords')
        .filter(item =>
            BANNED_SUFFIXES.map(suffix =>
                item.idLocation.path.endsWith(suffix)
            ).some(present => present)
        )
        .forEach(item => SLAIN_ITEMS.push(item.id.toString()))

    SLAIN_ITEMS.forEach(item => {
        event.removeDisplay(item)
    })
})

StartupEvents.registry('fluid', event => {
    event
        .create('spectral_seas:witch_brew')
        .stillTexture('spectral_seas:block/witch_brew_still')
        .displayName("Witch's Brew")
        .rarity('uncommon')
    event
        .create('spectral_seas:moss_brew')
        .thinTexture(0x70922d)
        .displayName('Moss Brew')
        .rarity('uncommon')
    event
        .create('spectral_seas:flesh_brew')
        .thinTexture(0x6a5d18)
        .displayName('Flesh Brew')
        .rarity('uncommon')
    event
        .create('spectral_seas:mushroom_brew')
        .thinTexture(0xce2d2b)
        .displayName('Mushroom Brew')
        .rarity('uncommon')

    event
        .create('spectral_seas:mushroom_flesh_brew')
        .thinTexture(0xd173ad)
        .displayName('Mushroom Flesh Brew')
        .rarity('uncommon')
    event
        .create('spectral_seas:moss_flesh_brew')
        .thinTexture(0xd7a8c2)
        .displayName('Moss Flesh Brew')
        .rarity('uncommon')
    event
        .create('spectral_seas:moss_mushroom_brew')
        .thinTexture(0x19fa0d8)
        .displayName('Moss Mushroom Brew')
        .rarity('uncommon')
})

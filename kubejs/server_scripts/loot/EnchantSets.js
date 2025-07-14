// eslint-disable-next-line no-unused-vars
const EnchantSets = (function () {
    const TOPAZ = [
        'extra-damage-enchantments:butcher',
        'extra-damage-enchantments:herbicide',
        'extra-damage-enchantments:rebel',
        'hybrid-aquatic:live_catch',
        'minecraft:aqua_affinity',
        'minecraft:fortune',
        'minecraft:silk_touch',
        'minecraft:luck_of_the_sea',
        'minecraft:lure',
        'minecraft:looting',
        'minecraft:efficiency',
        'minecraft:blast_protection',
        'minecraft:projectile_protection',
        'minecraft:mending',
        'minecraft:unbreaking',
        'spellbound:dullness',
        'spellbound:sunken_treasure',
        'spellbound:despoiling',
        'spellbound:pinata',
        'spellbound:scalping',
        'spellbound:acceleration',
        'spellbound:chilled',
        'spellbound:prospector',
        'spellbound:rock_collecting',
        'spellbound:universal',
        'spellbound:widened',
        'spellbound:flesh_wound',
        'spellbound:goldskin',
        'spellbound:grace',
        'spellbound:hearty',
        'spellbound:buffered',
        'spellbound:metabolising',
        'spellbound:photosynthetic',
        'spellbound:saturated',
        'spellbound:selfish',
        'spellbound:skotosynthetic',
        'staminafortweakers:untiring',
    ]

    const AMETHYST = [
        'airhop:air_hop',
        'extra-damage-enchantments:unravel',
        'extra-damage-enchantments:voidrender',
        'minecraft:respiration',
        'minecraft:depth_strider',
        'minecraft:feather_falling',
        'minecraft:frost_walker',
        'minecraft:soul_speed',
        'minecraft:swift_sneak',
        'minecraft:riptide',
        'minecraft:multishot',
        'minecraft:quick_charge',
        'minecraft:infinity',
        'spellbound:hover',
        'spellbound:phase_leap',
        'spellbound:phase_strafe',
        'spellbound:impersonal',
        'spellbound:airline',
        'spellbound:death_wish',
        'spellbound:last_gasp',
        'spellbound:attractive',
        'spellbound:repulsive',
        'spellbound:warlike',
        'spellbound:storied',
        'spellbound:cave_in',
        'spellbound:tethering',
        'staminafortweakers:traveling',
        'supplementaries:stasis',
        'spellbound:pestilence',
    ]

    const CITRINE = [
        'minecraft:thorns',
        'minecraft:flame',
        'minecraft:power',
        'minecraft:channeling',
        'minecraft:impaling',
        'minecraft:bane_of_arthropods',
        'minecraft:fire_aspect',
        'minecraft:smite',
        'minecraft:sweeping',
        'minecraft:knockback',
        'minecraft:punch',
        'minecraft:piercing',
        'minecraft:loyalty',
        'spellbound:outburst',
        'spellbound:spikes',
        'spellbound:vengeful',
        'spellbound:fisher_of_men',
        'spellbound:priming',
        'spellbound:rampage',
        'spellbound:trophy_collecting',
        'spellbound:jousting',
        'spellbound:launching',
        'spellbound:demolition',
        'spellbound:red_alert',
        'minecraft:fire_protection',
    ]

    const ANCIENT = [
        'minecraft:projectile_protection',
        'minecraft:channeling',
        'spellbound:jousting',
        'minecraft:multishot',
        'minecraft:piercing',
        'minecraft:quick_charge',
        'minecraft:smite',
        'staminafortweakers:traveling',
        'spellbound:warlike',
        'extra-damage-enchantments:unravel',
    ]

    const BRUTAL = [
        'spellbound:hearty',
        'minecraft:knockback',
        'spellbound:rampage',
        'spellbound:scalping',
        'minecraft:sweeping',
        'spellbound:cave_in',
        'spellbound:priming',
        'spellbound:demolition',
        'minecraft:power',
    ]

    const DARK = [
        'minecraft:bane_of_arthropods',
        'spellbound:metabolising',
        'spellbound:phase_leap',
        'spellbound:phase_strafe',
        'spellbound:red_alert',
        'spellbound:skotosynthetic',
        'minecraft:swift_sneak',
        'spellbound:attractive',
        'spellbound:repulsive',
        'extra-damage-enchantments:voidrender',
    ]

    const DEPTHS = [
        'minecraft:aqua_affinity',
        'minecraft:depth_strider',
        'spellbound:fisher_of_men',
        'minecraft:impaling',
        'minecraft:loyalty',
        'minecraft:riptide ',
    ]

    const DESERT = [
        'spellbound:acceleration',
        'minecraft:fire_aspect',
        'minecraft:fire_protection',
        'minecraft:flame',
        'spellbound:spikes',
        'minecraft:looting',
        'spellbound:photosynthetic',
        'extra-damage-enchantments:herbicide',
    ]

    const JUNGLE = [
        'airhop:air_hop',
        'spellbound:airline',
        'minecraft:feather_falling',
        'spellbound:hover',
        'spellbound:impersonal',
        'spellbound:launching',
        'minecraft:punch',
        'extra-damage-enchantments:butcher',
    ]

    const LUCKY = [
        'minecraft:fortune',
        'spellbound:grace',
        'spellbound:pinata',
        'spellbound:buffered',
        'spellbound:despoiling',
        'minecraft:silk_touch',
        'spellbound:trophy_collecting',
    ]

    const MINES = [
        'minecraft:blast_protection',
        'spellbound:dullness',
        'spellbound:prospector',
        'spellbound:rock_collecting',
        'staminafortweakers:untiring',
        'spellbound:widened',
        'spellbound:chilled',
    ]

    const SHALLOWS = [
        'minecraft:frost_walker',
        'spellbound:sunken_treasure',
        'hybrid-aquatic:live_catch',
        'minecraft:luck_of_the_sea',
        'minecraft:lure',
        'minecraft:respiration',
        'spellbound:tethering',
    ]

    const UNDEAD = [
        'spellbound:saturated',
        'spellbound:death_wish',
        'spellbound:last_gasp',
        'spellbound:outburst',
        'spellbound:pestilence',
        'spellbound:selfish',
        'minecraft:soul_speed',
        'minecraft:thorns',
        'spellbound:vengeful',
        'extra-damage-enchantments:rebel',
    ]

    const GENERIC = [
        'spellbound:flesh_wound',
        'spellbound:goldskin',
        'minecraft:frost_walker',
        'minecraft:efficiency',
        'minecraft:infinity',
        'minecraft:unbreaking',
        'spellbound:universal',
    ]

    const MUSKET = [
        'minecraft:flame',
        'minecraft:infinity',
        'minecraft:power',
        'minecraft:punch',
        'minecraft:unbreaking',
        'spellbound:buffered',
        'spellbound:launching',
    ]

    return {
        TOPAZ: TOPAZ,
        AMETHYST: AMETHYST,
        CITRINE: CITRINE,
        ANCIENT: ANCIENT,
        BRUTAL: BRUTAL,
        DARK: DARK,
        DEPTHS: DEPTHS,
        DESERT: DESERT,
        JUNGLE: JUNGLE,
        LUCKY: LUCKY,
        MINES: MINES,
        SHALLOWS: SHALLOWS,
        UNDEAD: UNDEAD,
        GENERIC: GENERIC,
        MUSKET: MUSKET,
    }
})()

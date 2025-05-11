/**
 * @type {Object}
 */
const BANNERS = {
    PURPLE_ANKH: Item.of(
        'minecraft:purple_banner',
        '{BlockEntityTag:{Patterns:[{Color:4,Pattern:"flo"},{Color:4,Pattern:"sc"},{Color:10,Pattern:"ts"},{Color:4,Pattern:"sku"},{Color:10,Pattern:"mc"}]}}'
    ),
    BLUE_SWIRL: Item.of(
        'minecraft:blue_banner',
        '{BlockEntityTag:{Patterns:[{Color:4,Pattern:"mr"},{Color:11,Pattern:"flo"},{Color:11,Pattern:"tl"},{Color:11,Pattern:"br"},{Color:3,Pattern:"gru"}]}}'
    ),
    WHITE_COSMOS: Item.of(
        'minecraft:white_banner',
        '{BlockEntityTag:{Patterns:[{Color:15,Pattern:"mr"},{Color:0,Pattern:"cbo"},{Color:0,Pattern:"bl"},{Color:0,Pattern:"tr"},{Color:0,Pattern:"mc"},{Color:0,Pattern:"gra"}]}}'
    ),
    DESERT_SUN: Item.of(
        'minecraft:light_blue_banner',
        '{BlockEntityTag:{Patterns:[{Color:11,Pattern:"gra"},{Color:4,Pattern:"mc"},{Color:1,Pattern:"hhb"}]}}'
    ),
    ANCHOR: Item.of(
        'minecraft:gray_banner',
        '{BlockEntityTag:{Patterns:[{Color:3,Pattern:"mc"},{Color:3,Pattern:"cre"},{Color:7,Pattern:"sc"},{Color:3,Pattern:"cbo"},{Color:3,Pattern:"ts"},{Color:0,Pattern:"tts"}]}}'
    ),
    CLOUDY_MOON: Item.of(
        'minecraft:white_banner',
        '{BlockEntityTag:{Patterns:[{Color:15,Pattern:"ss"},{Color:8,Pattern:"bri"},{Color:15,Pattern:"drs"},{Color:15,Pattern:"gra"},{Color:15,Pattern:"gru"},{Color:15,Pattern:"mr"},{Color:0,Pattern:"mc"},{Color:15,Pattern:"cbo"}]}}'
    ),
    JOLLY_ROGER: Item.of(
        'minecraft:black_banner',
        '{ BlockEntityTag: { Patterns: [{ Pattern: sku, Color: 0 }] }'
    ),
    TURTLE: Item.of(
        'minecraft:blue_banner',
        '{BlockEntityTag:{Patterns:[{Color:5,Pattern:"mr"},{Color:11,Pattern:"cr"},{Color:5,Pattern:"cre"},{Color:11,Pattern:"bt"},{Color:11,Pattern:"ms"},{Color:13,Pattern:"mc"}]}}'
    ),
    SKELETON_KING: Item.of(
        'minecraft:red_banner',
        '{BlockEntityTag:{Patterns:[{Color:0,Pattern:"cbo"},{Color:0,Pattern:"cs"},{Color:15,Pattern:"bs"},{Color:0,Pattern:"cre"},{Color:0,Pattern:"tt"},{Color:4,Pattern:"ts"},{Color:15,Pattern:"tts"}]}}'
    ),
    DEMON: Item.of(
        'minecraft:black_banner',
        '{BlockEntityTag:{Patterns:[{Color:14,Pattern:"ss"},{Color:14,Pattern:"flo"},{Color:15,Pattern:"cre"},{Color:15,Pattern:"cbo"},{Color:15,Pattern:"tt"},{Color:14,Pattern:"sku"},{Color:15,Pattern:"cre"}]}}'
    ),
    SAURON: Item.of(
        'minecraft:red_banner',
        '{BlockEntityTag:{Patterns:[{Color:1,Pattern:"sc"},{Color:15,Pattern:"cr"},{Color:14,Pattern:"ss"},{Color:15,Pattern:"cbo"},{Color:15,Pattern:"ts"},{Color:15,Pattern:"bs"}]}}'
    ),
    FIRE_CAPE: Item.of(
        'minecraft:red_banner',
        '{BlockEntityTag:{Patterns:[{Color:15,Pattern:"ss"},{Color:1,Pattern:"cbo"},{Color:15,Pattern:"tts"},{Color:15,Pattern:"bts"},{Color:1,Pattern:"mr"},{Color:15,Pattern:"bo"},{Color:15,Pattern:"dls"},{Color:14,Pattern:"mc"},{Color:15,Pattern:"flo"}]}}'
    ),
    COOL_S: Item.of(
        'minecraft:gray_banner',
        '{BlockEntityTag:{Patterns:[{Color:0,Pattern:"ms"},{Color:0,Pattern:"mr"},{Color:7,Pattern:"drs"},{Color:0,Pattern:"bo"},{Color:0,Pattern:"cbo"}]}}'
    ),
    PHOENIX: Item.of(
        'minecraft:yellow_banner',
        '{BlockEntityTag:{Patterns:[{Color:14,Pattern:"cbo"},{Color:1,Pattern:"gra"},{Color:14,Pattern:"mc"},{Color:14,Pattern:"cr"},{Color:1,Pattern:"flo"},{Color:14,Pattern:"tt"}]}}'
    ),
    PUG: Item.of(
        'minecraft:light_blue_banner',
        '{BlockEntityTag: { Patterns: [ { Pattern: ss, Color: 4 }, { Pattern: bs, Color: 12 }, { Pattern: bo, Color: 3 }, { Pattern: bt, Color: 12 }, { Pattern: mr, Color: 6 }, { Pattern: flo, Color: 15 }, { Pattern: cre, Color: 15 }, { Pattern: sku, Color: 12 }, { Pattern: tt, Color: 3 }, { Pattern: ts, Color: 3 }, { Pattern: mc, Color: 12 }, ]}'
    ),
    CULTIST: Item.of(
        'black_banner',
        '{BlockEntityTag:{Patterns:[{Pattern:gru,Color:7},{Pattern:bs,Color:14},{Pattern:mr,Color:14},{Pattern:mc,Color:14},{Pattern:mc,Color:15},{Pattern:cbo,Color:15},{Pattern:cbo,Color:15}]}}'
    ),
    SHIELD: Item.of(
        'yellow_banner',
        '{BlockEntityTag:{Patterns:[{Pattern:ss,Color:0},{Pattern:ss,Color:8},{Pattern:flo,Color:0},{Pattern:flo,Color:8},{Pattern:cbo,Color:12},{Pattern:cbo,Color:4},{Pattern:sc,Color:0},{Pattern:sc,Color:4},{Pattern:bo,Color:0},{Pattern:bo,Color:8},{Pattern:mc,Color:12},{Pattern:mc,Color:4},]}}'
    ),
    TACO: Item.of(
        'minecraft:black_banner',
        '{BlockEntityTag:{Patterns:[{Color:12,Pattern:"sku"},{Color:15,Pattern:"cre"},{Color:5,Pattern:"flo"},{Color:14,Pattern:"glb"},{Color:4,Pattern:"moj"},{Color:4,Pattern:"mc"},{Color:15,Pattern:"hhb"}]}}'
    ),
    TIKI: Item.of(
        'minecraft:yellow_banner',
        '{BlockEntityTag:{Patterns:[{Pattern:gra,Color:14},{Pattern:bts,Color:15},{Pattern:cre,Color:15},{Pattern:cbo,Color:15},{Pattern:cbo,Color:12},{Pattern:cre,Color:12},{Pattern:bts,Color:12},{Pattern:tts,Color:12},{Pattern:mr,Color:15},{Pattern:tt,Color:12},{Pattern:ms,Color:12},{Pattern:mr,Color:12},]}}'
    ),
    JUNGLE_MASK: Item.of(
        'minecraft:brown_banner',
        '{BlockEntityTag:{Patterns:[{Color:15,Pattern:"bt"},{Color:14,Pattern:"ms"},{Color:15,Pattern:"mc"},{Color:5,Pattern:"cr"},{Color:5,Pattern:"cbo"},{Color:5,Pattern:"bts"},{Color:13,Pattern:"tt"}]}}'
    ),
    MINOTAUR: Item.of(
        'minecraft:white_banner',
        '{BlockEntityTag:{Patterns:[{Color:12,Pattern:"sc"},{Color:12,Pattern:"bt"},{Color:0,Pattern:"bo"},{Color:0,Pattern:"flo"},{Color:12,Pattern:"flo"},{Color:0,Pattern:"cbo"},{Color:0,Pattern:"tt"},{Color:1,Pattern:"gra"}]}}'
    ),
    GRINNING_MASK: Item.of(
        'minecraft:red_banner',
        '{BlockEntityTag:{Patterns:[{Color:15,Pattern:"sku"},{Color:15,Pattern:"flo"},{Color:4,Pattern:"sku"},{Color:4,Pattern:"flo"}]}}'
    ),
    GOLDEN_MASK: Item.of(
        'minecraft:light_blue_banner',
        '{BlockEntityTag:{Patterns:[{Color:2,Pattern:"flo"},{Color:4,Pattern:"flo"},{Color:4,Pattern:"pig"},{Color:3,Pattern:"cbo"}]}}'
    ),
    ELEPHANT: Item.of(
        'minecraft:green_banner',
        '{BlockEntityTag:{Patterns:[{Color:12,Pattern:"bts"},{Color:0,Pattern:"mc"},{Color:8,Pattern:"tt"},{Color:8,Pattern:"cre"},{Color:8,Pattern:"flo"},{Color:13,Pattern:"ts"}]}}'
    ),
    TREE: Item.of(
        'minecraft:lime_banner',
        '{BlockEntityTag:{Patterns:[{Color:7,Pattern:"gru"},{Color:12,Pattern:"bts"},{Color:12,Pattern:"sc"},{Color:5,Pattern:"glb"},{Color:5,Pattern:"hh"},{Color:13,Pattern:"cbo"},{Color:13,Pattern:"ts"}]}}'
    ),
    ROSE: Item.of(
        'minecraft:blue_banner',
        '{BlockEntityTag:{Patterns:[{Color:13,Pattern:"flo"},{Color:5,Pattern:"moj"},{Color:11,Pattern:"lud"},{Color:14,Pattern:"tl"},{Color:11,Pattern:"tts"},{Color:11,Pattern:"cbo"}]}}'
    ),
    KOI: Item.of(
        'minecraft:blue_banner',
        '{BlockEntityTag:{Patterns:[{Color:3,Pattern:"bri"},{Color:11,Pattern:"bri"},{Color:1,Pattern:"br"},{Color:0,Pattern:"mr"},{Color:1,Pattern:"glb"},{Color:11,Pattern:"cbo"}]}}'
    ),
}

const randomBanner = () => {
    return Loot.randomOf(Object.values(BANNERS))
}

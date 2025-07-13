var $WorldAtlasData = Java.loadClass('folk.sisby.antique_atlas.WorldAtlasData')
var $MarkerTextures = Java.loadClass('folk.sisby.antique_atlas.reloader.MarkerTextures')
var $DyeColor = Java.loadClass('net.minecraft.world.item.DyeColor')

/**
 * @param {Internal.Level} level
 * @returns {Internal.WorldAtlasData}
 */
function getAtlasData(level) {
    return $WorldAtlasData.getOrCreate(level)
}

function getAtlasTexture(texture) {
    return $MarkerTextures.getInstance().get(ResourceLocation(texture))
}

const colorCodeToDyeColor = {
    aqua: $DyeColor.LIGHT_BLUE,
    black: $DyeColor.BLACK,
    blue: $DyeColor.BLUE,
    dark_aqua: $DyeColor.CYAN,
    dark_blue: $DyeColor.BLUE,
    dark_gray: $DyeColor.GRAY,
    dark_green: $DyeColor.GREEN,
    dark_purple: $DyeColor.PURPLE,
    dark_red: $DyeColor.RED,
    gold: $DyeColor.ORANGE,
    gray: $DyeColor.LIGHT_GRAY,
    green: $DyeColor.LIME,
    light_purple: $DyeColor.MAGENTA,
    red: $DyeColor.PINK,
    white: $DyeColor.WHITE,
    yellow: $DyeColor.YELLOW,
}

function getColor(colorName) {
    return $DyeColor.byName(colorName, null) || colorCodeToDyeColor[colorName] || $DyeColor.BLACK
}

/**
 * @param {Internal.Level} level
 * @param {Internal.MarkerTexture} texture
 * @param {BlockPos} pos
 * @param {Internal.MutableComponent} label
 * @param {string} color
 */
function addAntiqueAtlasMarker(level, texture, pos, label, color) {
    label = JSON.parse(label)
    color = getColor(color)
    let worldAtlasData = getAtlasData(level)

    if (label.translate) {
        label = Text.translate(label.translate)
    } else {
        label = Text.of(label.text)
    }

    worldAtlasData.placeCustomMarker(
        level,
        getAtlasTexture(texture),
        color,
        label,
        BlockPos(pos.x, pos.y, pos.z)
    )
}

function deleteAntiqueAtlasMarker(level, pos) {
    let worldAtlasData = getAtlasData(level)
    let markerPos = BlockPos(pos.x, pos.y, pos.z)
    console.log(markerPos)
    worldAtlasData
        .getEditableLandmarks()
        .keySet()
        .filter((landmark) => landmark.pos().equals(markerPos))
        .forEach((landmark) => {
            console.log(landmark.pos())
            worldAtlasData.deleteLandmark(level, landmark)
        })
}

NetworkEvents.dataReceived('AddMarker', (event) => {
    let marker = event.data
    console.log(marker.label)
    addAntiqueAtlasMarker(Client.level, marker.texture, marker.pos, marker.label, marker.color)
})

NetworkEvents.dataReceived('DeleteMarker', (event) => {
    console.log('recieved DeleteMarker')
    deleteAntiqueAtlasMarker(Client.level, event.data.pos)
})

var $WorldAtlasData = Java.loadClass('folk.sisby.antique_atlas.WorldAtlasData')
var $MarkerTextures = Java.loadClass('folk.sisby.antique_atlas.reloader.MarkerTextures')
var $DyeColor = Java.loadClass('net.minecraft.world.item.DyeColor')

function getAtlasData (level) {
    return $WorldAtlasData.getOrCreate(Utils.server.getLevel(level.getDimension()))
}

function getAtlasTexture (texture) {
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

function getColor (colorName) {
    return $DyeColor.byName(colorName, null) !== (colorCodeToDyeColor[colorName] || $DyeColor.WHITE)
        ? colorCodeToDyeColor[colorName] || $DyeColor.WHITE
        : $DyeColor.byName(colorName, null)
}

/**
 * @param {Internal.Level} level
 * @param {Internal.MarkerTexture} texture
 * @param {BlockPos} pos
 * @param {string} color
 * @param {Internal.MutableComponent} label
 */
function addAntiqueAtlasMarker (level, texture, pos, label) {
    label = JSON.parse(label)

    let worldAtlasData = getAtlasData(level)

    if (label.translate) {
        label = Text.translate(label.translate)
    } else {
        label = Text.of(label.text)
    }
    label.append(' Destination')
    worldAtlasData.placeCustomMarker(
        level,
        getAtlasTexture(texture),
        getColor(label.color),
        label,
        BlockPos(pos.x, pos.y, pos.z)
    )
}

function deleteAntiqueAtlasMarker (level, pos) {
    let worldAtlasData = getAtlasData(level)
    let markerPos = BlockPos(pos.x, pos.y, pos.z)
    console.log(markerPos)
    worldAtlasData
        .getEditableLandmarks()
        .keySet()
        .filter(landmark => landmark.pos().equals(markerPos))
        .forEach(landmark => {
            console.log(landmark.pos())
            worldAtlasData.deleteLandmark(level, landmark)
        })
}

NetworkEvents.dataReceived('AddMarker', event => {
    let marker = event.data
    addAntiqueAtlasMarker(Client.level, marker.texture, marker.pos, marker.label)
})

NetworkEvents.dataReceived('DeleteMarker', event => {
    console.log('recieved DeleteMarker')
    deleteAntiqueAtlasMarker(Client.level, event.data.pos)
})

var $WorldAtlasData = Java.loadClass('folk.sisby.antique_atlas.WorldAtlasData')
var $MarkerTextures = Java.loadClass(
    'folk.sisby.antique_atlas.reloader.MarkerTextures'
)
var $DyeColor = Java.loadClass('net.minecraft.world.item.DyeColor')

NetworkEvents.dataReceived('AddMarker', event => {
    let marker = event.data
    addAntiqueAtlasMarker(
        Client.level,
        marker.texture,
        marker.pos,
        marker.color,
        marker.label
    )
})

NetworkEvents.dataReceived('DeleteMarker', event => {
    console.log('recieved DeleteMarker')
    deleteAntiqueAtlasMarker(Client.level, event.data.pos)
})

function addAntiqueAtlasMarker(level, texture, pos, color, label) {
    let worldAtlasData = getAtlasData(level)
    let dye_color = $DyeColor.byName(color, null)
    let code_color = colorCodeToDyeColor[color] || DyeColor.WHITE

    color = dye_color !== code_color ? code_color : dye_color

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
        .filter(landmark => landmark.pos().equals(markerPos))
        .forEach(landmark => {
            console.log(landmark.pos())
            worldAtlasData.deleteLandmark(level, landmark)
        })
}

function getAtlasData(level) {
    return $WorldAtlasData.getOrCreate(
        Utils.server.getLevel(level.getDimension())
    )
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

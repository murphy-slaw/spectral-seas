const $DyeColor = Java.loadClass('net.minecraft.world.item.DyeColor')
const $Integer = Java.loadClass('java.lang.Integer')
const $Landmark = Java.loadClass('folk.sisby.surveyor.landmark.Landmark')
const $LandmarkComponentMap = Java.loadClass(
    'folk.sisby.surveyor.landmark.component.LandmarkComponentMap'
)
const $LandmarkComponentTypes = Java.loadClass(
    'folk.sisby.surveyor.landmark.component.LandmarkComponentTypes'
)
const $SurveyorClient = Java.loadClass('folk.sisby.surveyor.client.SurveyorClient')
const $WorldSummary = Java.loadClass('folk.sisby.surveyor.WorldSummary')

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

/**
 * @param {string} colorName
 * @returns {Internal.DyeColor}
 */
function getColor(colorName) {
    return $DyeColor.byName(colorName, null) || colorCodeToDyeColor[colorName] || $DyeColor.BLACK
}

/**
 * @param {Internal.Level} level
 * @param {Internal.ResourceLocation} id
 * @param {BlockPos} pos
 * @param {Internal.MutableComponent} label
 * @param {string} color
 */
function addMarker(level, id, pos, label, color) {
    console.debug(id)

    const dyeColor = getColor(color)

    let name = JSON.parse(label)
    if (name.translate) {
        name = Text.translate(name.translate)
    } else {
        name = Text.of(name.text)
    }

    const builder = $LandmarkComponentMap.builder()
    builder.add($LandmarkComponentTypes.POS, BlockPos(pos.x, pos.y, pos.z))
    builder.add($LandmarkComponentTypes.NAME, name)
    builder.add($LandmarkComponentTypes.COLOR, $Integer.valueOf(dyeColor.getFireworkColor()))

    $WorldSummary
        .of(level)
        .landmarks()
        .put(
            level,
            $Landmark.create($SurveyorClient.getClientUuid(), id, () => builder)
        )
}

/**
 *
 * @param {Internal.Level} level
 * @param {ResourceLocation} id
 */
function deleteMarker(level, id) {
    console.debug(`trying to delete ${id}`)
    $WorldSummary.of(level).landmarks().remove(level, $SurveyorClient.getClientUuid(), id)
}

NetworkEvents.dataReceived('AddMarker', (event) => {
    let marker = event.data
    console.debug(marker)
    addMarker(Client.level, marker.location, marker.pos, marker.label, marker.color)
})

NetworkEvents.dataReceived('DeleteMarker', (event) => {
    console.debug('recieved DeleteMarker')
    deleteMarker(Client.level, event.data.location)
})

NetworkEvents.dataReceived('DeleteGrave', (event) => {
    console.debug('recieved DeleteGrave')
    const targetPos = BlockPos(event.data.pos.x, event.data.pos.y, event.data.pos.z)
    const map = $WorldSummary
        .of(event.level)
        .landmarks()
        .asMap($SurveyorClient.getClientUuid(), null)
    let targetLandmark
    map.forEach((k, v) => {
        console.debug(k.getPath())
        if (k.getPath().startsWith('grave')) {
            const pos = v.get($LandmarkComponentTypes.POS)
            if (pos.equals(targetPos)) {
                targetLandmark = k
                return
            }
        }
    })

    if (targetLandmark) {
        deleteMarker(Client.level, targetLandmark)
    }
})

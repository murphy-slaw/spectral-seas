//priority: 100
var Klass = Java.class.forName(
    'chrono.mods.compassribbon.gui.CompassRibbonOverlay'
)

let magic
Klass.getDeclaredMethods().forEach(meth => {
    if (meth.getName() === 'renderMarker') {
        console.log('PLUNDER!')
        meth.setAccessible(true)
        magic = meth
        console.log(meth)
        return
    }
})

const Konstructor = Klass.getDeclaredConstructors()[0]

const CompassRibbonOverlay = Java.loadClass(
    'chrono.mods.compassribbon.gui.CompassRibbonOverlay'
)

const RibbonMapMarker = Java.loadClass(
    'chrono.mods.compassribbon.helpers.RibbonMapMarker'
)
const MapMarker = Java.loadClass('chrono.mods.compassribbon.helpers.MapMarker')
const CompassRibbonClient = Java.loadClass(
    'chrono.mods.compassribbon.CompassRibbonClient'
)
const MC = Java.loadClass('net.minecraft.client.Minecraft')

const config = CompassRibbonClient.CONFIG_MANAGER.getConfig()

let overlay = new CompassRibbonOverlay(MC.getInstance(), config)

console.log(overlay)

ClientEvents.paintScreen(event => {
    const guiGraphics = event.graphics
    const buff = event.buffer
    const centerX = Math.floor(guiGraphics.guiWidth() / 2)

    const marker = new MapMarker(0, 64, 0, MapDecoration$Type.MONUMENT)
    const ribbonMarker = new RibbonMapMarker(event.player, marker, 0.0)
    const adjustedY =
        Math.floor(config.ribbonYOffset.getValue()) +
        Math.max(ribbonMarker.getPitch() / 15.0, -3.0)

    magic.invoke(overlay, [
        guiGraphics,
        buff,
        centerX,
        adjustedY,
        1,
        ribbonMarker,
        0,
    ])
    /*
    if (event.player.age % 20 == 0) {
        let worldAtlasData = getAtlasData(event.level)
        let markers = worldAtlasData.getEditableLandmarks()
        for (const [key, value] of Object.entries(markers)) {
            console.log(key)
        }
    }
    */
})

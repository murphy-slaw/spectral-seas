const $AtlasScreen = Java.loadClass('folk.sisby.antique_atlas.gui.AtlasScreen')
const $AntiqueAtlas = Java.loadClass('folk.sisby.antique_atlas.AntiqueAtlas')
const $ColumnPos = Java.loadClass('net.minecraft.server.level.ColumnPos')

const MAX_ZOOM = 1 << $AntiqueAtlas.CONFIG.maxTileChunks

/* 
The server sends an OpenMap packet when an explorer map enters the player's inventory 
for the first time
 */
NetworkEvents.dataReceived('OpenMap', (event) => {
    /** @type {Internal.ColumnPos} */
    const columnPos = $ColumnPos(event.data.x, event.data.z)

    const screen = new $AtlasScreen()
    screen.prepareToOpen()
    //This deselects the player button so that the screen doesn't snap back to the player immediately
    screen.clearTargetBookmarks(null)
    Client.setScreen(screen)

    // Set the center of the map to the position we got in the packet. Use setMapPosition instead of setTargetPosition to skip the animation
    screen.setMapPosition(columnPos.x(), columnPos.z())

    while (screen.zoomIn(false, 0)) {}
    let zoom = 1
    const bounds = screen.getBounds()

    // Try to fit both the target and the player marker on screen
    while (true) {
        let targetScreenX = screen.worldXToScreenX(columnPos.x())
        let targetScreenY = screen.worldZToScreenY(columnPos.z())
        let playerScreenX = screen.worldXToScreenX(event.player.x)
        let playerScreenY = screen.worldZToScreenY(event.player.z)
        let xDist = Math.abs(targetScreenX - playerScreenX)
        let yDist = Math.abs(targetScreenY - playerScreenY)
        if (xDist < bounds.width / 2 && yDist < bounds.height / 2) break

        zoom = zoom << 1
        if (zoom > MAX_ZOOM) break
        screen.zoomOut(true, zoom)
    }
})

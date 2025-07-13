const AtlasScreen = Java.loadClass('folk.sisby.antique_atlas.gui.AtlasScreen')
const Integer = Java.loadClass('java.lang.Integer')
const ColumnPos = Java.loadClass('net.minecraft.server.level.ColumnPos')
const Klass = Java.class.forName('folk.sisby.antique_atlas.gui.AtlasScreen')

var setTargetPosition
var zoomOut
// Promise not to tell Lat
Klass.getDeclaredMethods().forEach((meth) => {
    if (meth.getName() === 'setTargetPosition') {
        meth.setAccessible(true)
        setTargetPosition = meth
        return
    }
    if (meth.getName() === 'zoomOut') {
        meth.setAccessible(true)
        zoomOut = meth
        return
    }
})

/* 
The server sends an OpenMap packet when an explorer map enters the player's inventory 
for the first time
 */
NetworkEvents.dataReceived('OpenMap', (event) => {
    const pos = event.data
    const screen = new AtlasScreen()
    screen.prepareToOpen()
    //This deselects the player button so that the screen doesn't snap back to the player immediately
    screen.clearTargetBookmarks(null)
    while (zoomOut.invoke(screen, true, Integer.valueOf('32'))) {}
    Client.setScreen(screen)
    //Move the center of the map to the position we got in the packet
    setTargetPosition.invoke(screen, ColumnPos(pos.x, pos.z))
})

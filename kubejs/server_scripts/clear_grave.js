BlockEvents.rightClicked('yigd:grave', event => {
    let grave_name = event.block.entityData['skull']['Name']
    let player_name = event.player.name.plainCopy()
    if (player_name.getString() == grave_name) {
        console.log('Player matched grave, removing marker')
        let pos = event.block.pos
        event.player.sendData('DeleteMarker', {
            pos: { x: pos.x, y: pos.y, z: pos.z },
        })
    }
})

BlockEvents.rightClicked('yigd:grave', event => {
    if (
        event.player.name.plainCopy().getString() ==
        event.block.entityData.skull.Name
    ) {
        console.log('Player matched grave, removing marker')
        event.player.sendData('DeleteMarker', {
            pos: {
                x: event.block.pos.x,
                y: event.block.pos.y,
                z: event.block.pos.z,
            },
        })
    }
})

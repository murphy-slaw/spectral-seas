BlockEvents.rightClicked('yigd:grave', (event) => {
    const { player, block } = event
    if (player.name.plainCopy().getString() === block.entityData.skull.Name) {
        console.log('Player matched grave, removing marker')
        player.sendData('DeleteMarker', {
            pos: block.pos,
        })
    }
})

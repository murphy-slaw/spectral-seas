const DYES = Ingredient.of('#minecraft:dyes')
ItemEvents.entityInteracted((event) => {
    let wrappedPlayer = PlayerHelper(event.player)
    if (DYES.test(event.item)) {
        if (shipTypes.includes(event.target.type)) {
            let ship = event.target
            if (ship.UUID == wrappedPlayer.getShip().UUID) {
                wrappedPlayer.removeShipMarker()
                Utils.server.scheduleInTicks(0, () => {})
                Utils.server.scheduleInTicks(10, () => {
                    wrappedPlayer.addShipMarker()
                })
            }
        }
    }
})

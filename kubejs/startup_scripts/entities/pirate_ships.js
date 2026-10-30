StartupEvents.registry('entity_type', (event) => {
    let builder = event.createCustom(
        'pirate_cog',
        'com.talhanation.smallships.world.entity.ship.CogEntity',
        (modify) => {}
    )
    if (Platform.isClientEnvironment()) {
        builder.setRendererClass('com.talhanation.smallships.client.renderer.entity.CogRenderer')
    }
    builder.override('tick()', (context) => {
        context.superCall()
        global.pirateShipTick(context.entity)
    })
})

/**
 * @param {Internal.Ship} ship
 */
global.pirateShipTick = (ship) => {
    if (
        ship.passengers.filter((passenger) => !passenger.isPlayer()).isEmpty() &&
        !ship.isSinking() &&
        !ship.isSunken()
    ) {
        ship.setDamage(ship.getDamage() + 1)
        if (ship.getDamage() > ship.attributes.maxHealth) ship.startSinking()
    }
}

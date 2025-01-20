ItemEvents.entityInteracted('kubejs:ship_speed_upgrade', event => {
    console.info(event.target.type);
    if (shipTypes.includes(event.target.type)) {
        let shipNbt = event.target.nbt;
        let curSpeed = shipNbt['Attributes']['maxSpeed'];
        shipNbt['Attributes']['maxSpeed'] = curSpeed + 5.0;
        console.info(shipNbt);
        event.target.setNbt(shipNbt);
        event.item.shrink(1);
        event.cancel();
    }
});

ItemEvents.entityInteracted('kubejs:ship_cargo_upgrade', event => {
    console.info(event.target.type);
    if (shipTypes.includes(event.target.type)) {
        let shipNbt = event.target.nbt;
        let curCargo = shipNbt['ContainerSize'];
        shipNbt.putInt('ContainerSize', curCargo + 54);
        event.target.setNbt(shipNbt);
        event.item.shrink(1);
        event.cancel();
    }
});
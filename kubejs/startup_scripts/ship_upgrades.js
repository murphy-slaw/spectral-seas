StartupEvents.registry('item', event => {
    event.create('ship_speed_upgrade')
        .displayName('Ship Speed Upgrade')
        .texture('kubejs:item/ship_speed_upgrade')
        .unstackable()
        .useDuration(itemstack => 20);
    event.create('ship_cargo_upgrade')
        .displayName('Ship Cargo Upgrade')
        .texture('kubejs:item/ship_storage_upgrade')
        .unstackable()
        .useDuration(itemstack => 20);
});
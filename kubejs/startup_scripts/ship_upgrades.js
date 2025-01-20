StartupEvents.registry('item', event => {
    event.create('ship_speed_upgrade')
        .displayName('Ship Speed Upgrade')
        .unstackable()
        .useDuration(itemstack => 1);
    event.create('ship_cargo_upgrade')
        .displayName('Ship Cargo Upgrade')
        .unstackable()
        .useDuration(itemstack => 1);
});
StartupEvents.registry('item', (event) => {
    event
        .create('spectral_seas:ship_speed_upgrade')
        .displayName('Ship Speed Upgrade')
        .texture('spectral_seas:item/ship_speed_upgrade')
        .maxStackSize(16)
        .useDuration((itemstack) => 20)
    event
        .create('spectral_seas:ship_cargo_upgrade')
        .displayName('Ship Cargo Upgrade')
        .texture('spectral_seas:item/ship_storage_upgrade')
        .maxStackSize(16)
        .useDuration((itemstack) => 20)
})

// Update set bonuses when a player opens/closes their inventory.
// This is here because when you swap offhands with keybind the onEquipItem event doesn't fire,
// so this semi prevents it from being cheesed

PlayerEvents.inventoryChanged(event=>{
    armorSetBonus({entity: event.player})
})

PlayerEvents.inventoryOpened(event=>{
    armorSetBonus({entity: event.player})
})

PlayerEvents.inventoryClosed(event=>{
    armorSetBonus({entity: event.player})
})
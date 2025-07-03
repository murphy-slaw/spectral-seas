const $TrinketsApi = Java.loadClass('dev.emi.trinkets.api.TrinketsApi')

PlayerEvents.inventoryChanged(event => {
    /** @type {Internal.Optional<Internal.LivingEntityTrinketComponent>} */
    let trinketComponent = $TrinketsApi.getTrinketComponent(event.player).orElseThrow()
    console.log(event.slot)
    console.log(trinketComponent)
})

FabricEvents.handleServer('EquipmentChange', event => {
    let params = event.parameters
    let livingEntity = params.arg0
    let slot = params.arg1
    let prevItemStack = params.arg2
    let nextItemStack = params.arg3
    console.log(slot)
})

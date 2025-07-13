const $FABRIC_SERVER_ENTITY_EVENTS = Java.loadClass(
    'net.fabricmc.fabric.api.event.lifecycle.v1.ServerEntityEvents'
)
FabricEvents.registry((event) => {
    event.register('EquipmentChange', $FABRIC_SERVER_ENTITY_EVENTS, 'EQUIPMENT_CHANGE')
})

const $FABRIC_CLIENT_PRE_ATTACK_EVENTS = Java.loadClass(
    'net.fabricmc.fabric.api.event.client.player.ClientPreAttackCallback'
)
FabricEvents.registry((event) => {
    event.register('PreAttack', $FABRIC_CLIENT_PRE_ATTACK_EVENTS, 'EVENT')
})

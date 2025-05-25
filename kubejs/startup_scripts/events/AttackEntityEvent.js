const ARCH_PLAYER_EVENTS = Java.loadClass('dev.architectury.event.events.common.PlayerEvent')
ArchEvents.registry(event => {
    event.register('AttackEntity', ARCH_PLAYER_EVENTS, 'ATTACK_ENTITY')
})

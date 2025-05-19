/** @param {Internal.CommandContext} context */
const villager_dump = context => {
    /** @type {Internal.ServerLevel} */
    const level = context.source.level
    /** @type {Internal.MinecraftServer} */
    const server = context.source.server
    const player = context.source.player
    const empties = []
    VillagerUtils.getProfessions().forEach(profession => {
        console.log(profession.name())
        VillagerUtils.getVillagerTrades(profession).forEach(trade => {
            console.log(trade.getOffer(player, RANDOM_SOURCE))
        })
    })
    return 0
}
ServerEvents.commandRegistry(e => {
    const { commands: Commands } = e
    e.register(Commands.literal('villager_dump').executes(villager_dump))
})

LevelEvents.loaded(event => {
    let player = event.server.getPlayer('murphy_slaw_mc')
    VillagerUtils.getProfessions().forEach(profession => {
        console.log(profession.name())
        VillagerUtils.getVillagerTrades(profession).forEach(trade => {
            console.log(trade.getOffer(player, RANDOM_SOURCE))
        })
    })
})

/**
 *
 * @param {Internal.ServerPlayer} player
 * @returns {boolean}
 */
function hasNemesis(player) {
    if (player.persistentData.Nemesis) {
        const nemesis = player.persistentData.getUUID('Nemesis')
        if (nemesis && player.level.getEntity(nemesis)) return true
        player.persistentData.remove('Nemesis')
    }
    return false
}

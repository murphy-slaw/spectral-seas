const NEMESIS_KEY = 'Nemesis'

/**
 * Get the UUID of the player's current nemesis
 * @param {Internal.ServerPlayer} player
 * @returns {Internal.UUID}
 */
const getNemesis = (player) => {
    return player.persistentData.getUUID(NEMESIS_KEY)
}
/**
 *
 * @param {Internal.ServerPlayer} player
 * @param {Internal.UUID} uuid
 */
const setNemesis = (player, uuid) => {
    player.persistentData.putUUID(NEMESIS_KEY, uuid)
}

/**
 * Clear the player's current nemesis
 * @param {Internal.ServerPlayer} player
 */
const clearNemesis = (player) => {
    player.persistentData.remove(NEMESIS_KEY)
}

/**
 * Return true if the player has a nemesis and it still exists
 * @param {Internal.ServerPlayer} player
 * @returns {boolean}
 */
const hasNemesis = (player) => {
    const nemesis = getNemesis(player)
    if (nemesis) {
        if (nemesis && player.level.getEntity(nemesis)) return true
        clearNemesis(player)
    }
    return false
}

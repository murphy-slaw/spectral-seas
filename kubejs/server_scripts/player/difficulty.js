const $Mth = Java.loadClass('net.minecraft.util.Mth')

/**
 * Get the current local difficulty for the given player
 * @param {Internal.ServerPlayer} player
 * @returns {number}
 */
const localDifficultyFor = (player) =>
    player.level.getCurrentDifficultyAt(player.blockPosition()).getEffectiveDifficulty()

/**
 * Get the "modified difficulty" for the given player
 * @param {Internal.ServerPlayer} player
 * @returns {number}
 */
const modifiedDifficulty = (player) => $Mth.clamp(Math.sqrt(localDifficultyFor(player)), 1, 2)

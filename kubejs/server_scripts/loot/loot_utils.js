const $WeightedRandomList = Java.loadClass(
    'net.minecraft.util.random.WeightedRandomList'
)
const $RandomSource = Java.loadClass('net.minecraft.util.RandomSource')
const RANDOM_SOURCE = $RandomSource.create()

/**
 * @param {string[]} ids
 * @returns {Optional<EnchantmentInstance>}
 */
function getWeightedEnchantment (ids) {
    /** @type {Internal.RegistryInfo<Internal.Enchantment} */
    const reg = Utils.getRegistry('minecraft:enchantment')
    const instances = ids.map(
        id => new EnchantmentInstance(reg.getValue(id), 1)
    )
    /** @type {Internal.WeightedRandomList<EnchantmentInstance>} */
    const weightedList = $WeightedRandomList.create(instances)
    return weightedList.getRandom(RANDOM_SOURCE)
}

/**
 * @param {Internal.LootEntry} entry
 * @param {string[]} pool
 * @returns {Internal.Enchantment[]}
 */
function getValidEnchants (entry, pool) {
    /** @type {Internal.RegistryInfo<Internal.Enchantment>} */
    const reg = Utils.getRegistry('minecraft:enchantment')
    return pool.filter(v => reg.getValue(v).canEnchant(entry))
}

/**
 * @param {Internal.LootEntry} entry
 * @param {string[]} pool
 * @returns {Internal.Enchantment[]}
 */
function getRandomValidEnchant (entry, pool) {
    const ids = getValidEnchants(entry, pool)
    console.log(ids)
    const enchant = getWeightedEnchantment(ids)
    if (enchant.isPresent()) return enchant.get().enchantment
    return undefined
}

/**
 * @param {ResourceLocation} id
 * @param {string[]} pool
 * @returns {Internal.LootEntry}
 */
function getValidlyEnchantedItem (id, pool) {
    return LootEntry.of(id).enchantRandomly(
        getRandomValidEnchant(Item.of(id), pool)
    )
}

/**
 * @param {ResourceLocation[]} ids
 * @param {string[]} pool
 * @returns {Internal.LootEntry}
 */
function getRandomEnchantedItem (ids, pool) {
    return getValidlyEnchantedItem(Utils.randomOf(Utils.random, ids), pool)
}

/**
 *  @param {Internal.LootContextJS} ctx
 *  @param {Function} poolFunction
 */
function exclusiveLootPool (ctx, poolFunction) {
    if (!ctx.hasLoot(ItemFilter.ALWAYS_TRUE)) {
        poolFunction(ctx).forEach(loot => ctx.addLoot(loot))
    }
}

/**
 * @param {Internal.LootModificationEventJS} event
 * @param {ResourceLocation} tableId
 * @param {Function[]} poolFunctions
 */
function smartReplacePools (event, tableId, poolFunctions) {
    event.addLootTableModifier(tableId).removeLoot(ItemFilter.ALWAYS_TRUE)

    while (poolFunctions.length > 0) {
        let chance = 1 / poolFunctions.length
        let pool = poolFunctions.pop()
        event
            .addLootTableModifier(tableId)
            .randomChance(chance)
            .apply(ctx => exclusiveLootPool(ctx, pool))
    }
}

const TOPAZ_ENCHANTS = [
    'hybrid-aquatic:live_catch',
    'minecraft:aqua_affinity',
    'minecraft:fortune',
    'minecraft:silk_touch',
    'minecraft:luck_of_the_sea',
    'minecraft:lure',
    'minecraft:looting',
    'minecraft:efficiency',
    'minecraft:blast_protection',
    'minecraft:projectile_protection',
    'minecraft:mending',
    'minecraft:unbreaking',
    'spellbound:dullness',
    'spellbound:sunken_treasure',
    'spellbound:despoiling',
    'spellbound:pinata',
    'spellbound:scalping',
    'spellbound:acceleration',
    'spellbound:chilled',
    'spellbound:prospector',
    'spellbound:rock_collecting',
    'spellbound:universal',
    'spellbound:widened',
    'spellbound:flesh_wound',
    'spellbound:goldskin',
    'spellbound:grace',
    'spellbound:hearty',
    'spellbound:buffered',
    'spellbound:metabolising',
    'spellbound:photosynthetic',
    'spellbound:saturated',
    'spellbound:selfish',
    'spellbound:skotosynthetic',
    'staminafortweakers:untiring',
]

const AMETHYST_ENCHANTS = [
    'airhop:air_hop',
    'minecraft:respiration',
    'minecraft:depth_strider',
    'minecraft:feather_falling',
    'minecraft:frost_walker',
    'minecraft:soul_speed',
    'minecraft:swift_sneak',
    'minecraft:riptide',
    'minecraft:multishot',
    'minecraft:quick_charge',
    'minecraft:infinity',
    'spellbound:hover',
    'spellbound:phase_leap',
    'spellbound:phase_strafe',
    'spellbound:impersonal',
    'spellbound:airline',
    'spellbound:death_wish',
    'spellbound:last_gasp',
    'spellbound:attractive',
    'spellbound:repulsive',
    'spellbound:warlike',
    'spellbound:storied',
    'spellbound:cave_in',
    'spellbound:tethering',
    'staminafortweakers:traveling',
    'supplementaries:stasis',
    'spellbound:pestilence',
]

const CITRINE_ENCHANTS = [
    'minecraft:thorns',
    'minecraft:flame',
    'minecraft:power',
    'minecraft:channeling',
    'minecraft:impaling',
    'minecraft:bane_of_arthropods',
    'minecraft:fire_aspect',
    'minecraft:smite',
    'minecraft:sweeping',
    'minecraft:knockback',
    'minecraft:punch',
    'minecraft:piercing',
    'minecraft:loyalty',
    'spellbound:outburst',
    'spellbound:spikes',
    'spellbound:vengeful',
    'spellbound:fisher_of_men',
    'spellbound:priming',
    'spellbound:rampage',
    'spellbound:trophy_collecting',
    'spellbound:jousting',
    'spellbound:launching',
    'spellbound:demolition',
    'spellbound:red_alert',
    'minecraft:fire_protection',
]

const DIAMOND_ARMOR = [
    'minecraft:diamond_helmet',
    'minecraft:diamond_chestplate',
    'minecraft:diamond_leggings',
    'minecraft:diamond_boots',
]

const IRON_ARMOR = [
    'minecraft:iron_helmet',
    'minecraft:iron_chestplate',
    'minecraft:iron_leggings',
    'minecraft:iron_boots',
]

const GOLDEN_ARMOR = [
    'minecraft:golden_helmet',
    'minecraft:golden_chestplate',
    'minecraft:golden_leggings',
    'minecraft:golden_boots',
]

const CHAINMAIL_ARMOR = [
    'minecraft:chainmail_helmet',
    'minecraft:chainmail_chestplate',
    'minecraft:chainmail_leggings',
    'minecraft:chainmail_boots',
]

const LEATHER_ARMOR = [
    'minecraft:leather_helmet',
    'minecraft:leather_chestplate',
    'minecraft:leather_leggings',
    'minecraft:leather_boots',
]

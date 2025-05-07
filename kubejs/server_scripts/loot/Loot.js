const $WeightedRandomList = Java.loadClass('net.minecraft.util.random.WeightedRandomList')
const $RandomSource = Java.loadClass('net.minecraft.util.RandomSource')
const RANDOM_SOURCE = $RandomSource.create()

const Loot = (function () {
    /**
     * Return a random Enchantment from the provided list, using rarity weights
     * @param {string[]} ids
     * @returns {Optional<EnchantmentInstance>}
     */
    function weightedEnchant (ids) {
        /** @type {Internal.RegistryInfo<Internal.Enchantment} */
        const reg = Utils.getRegistry('minecraft:enchantment')
        const instances = ids.map(id => new EnchantmentInstance(reg.getValue(id), 1))
        /** @type {Internal.WeightedRandomList<EnchantmentInstance>} */
        const weightedList = $WeightedRandomList.create(instances)
        const instance = weightedList.getRandom(RANDOM_SOURCE)
        return instance.isPresent() ? instance.get().enchantment : undefined
    }

    /**
     * Return a list of valid enchantments for the given item from the provided list
     * @param {Internal.LootEntry} entry
     * @param {string[]} pool
     * @returns {Internal.Enchantment[]}
     */
    function enchantsFor (entry, pool) {
        /** @type {Internal.RegistryInfo<Internal.Enchantment>} */
        const reg = Utils.getRegistry('minecraft:enchantment')
        return pool.filter(v => reg.getValue(v).canEnchant(entry))
    }

    /**
     * Returns a single valid enchantment for the given item from the pool
     * @param {Internal.LootEntry} entry
     * @param {string[]} pool
     * @returns {Internal.Enchantment[]}
     */
    function randomEnchantFor (entry, pool) {
        const ids = enchantsFor(entry, pool)
        return weightedEnchant(ids)
    }

    /**
     * Returns a LootEntry, enchanted randomly from the given pool
     * @param {ResourceLocation} id
     * @param {string[]} pool
     * @returns {Internal.LootEntry}
     */
    function enchantedFrom (id, pool) {
        const enchantment = randomEnchantFor(Item.of(id), pool)
        if (enchantment)
            return LootEntry.of(id).enchantRandomly(randomEnchantFor(Item.of(id), pool))
        console.log(`No valid enchant found for ${id} in ${pool}`)
        return LootEntry.of(id)
    }

    /**
     * Returns a random member of list
     * @param {any[]} list
     * @returns {any}
     */
    function randomOf (list) {
        return Utils.randomOf(Utils.random, list)
    }

    /**
     * Returns a LootEntry of a random item identifier in ids
     * @param {ResourceLocation[]} ids
     * @returns {Internal.LootEntry}
     */
    function randomEntryOf (ids) {
        return LootEntry.of(randomOf(ids))
    }

    /**
     * Returns a LootEntry of the requested potion type
     * @param {Internal.Potion} type
     * @returns {Internal.LootEntry}
     */
    function potionOf (type) {
        return LootEntry.of('minecraft:potion').addPotion(type)
    }

    /**
     * Returns a loot entry of a random potion from types
     * @param {Internal.Potion[]} types
     * @returns {Internal.LootEntry}
     */
    function randomPotionOf (types) {
        return potionOf(randomOf(types))
    }

    /**
     * Returns a LootEntry of a random item from ids, enchanted with a random enchant from pool
     * @param {ResourceLocation[]} ids
     * @param {string[]} pool
     * @returns {Internal.LootEntry}
     */
    function randomEnchantedFrom (ids, pool) {
        return enchantedFrom(randomOf(ids), pool)
    }

    /**
     * If the LootContext has no loot in it, add loot using poolFunction
     *  @param {Internal.LootContextJS} ctx
     *  @param {Function} poolFunction
     */
    function exclusiveLootPool (ctx, poolFunction) {
        if (!ctx.hasLoot(ItemFilter.ALWAYS_TRUE)) {
            poolFunction(ctx).forEach(loot => ctx.addLoot(loot))
        }
    }

    /**
     * Discards the contents of the given loot table and replaces it with one pool from poolFuncions
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
    return {
        randomOf: randomOf,
        randomEntryOf: randomEntryOf,
        potionOf: potionOf,
        randomPotionOf: randomPotionOf,
        enchantedFrom: enchantedFrom,
        randomEnchantedFrom: randomEnchantedFrom,
        exclusiveLootPool: exclusiveLootPool,
        smartReplacePools: smartReplacePools,
    }
})()

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

const TRIM_MATERIAL = [
    'minecraft:amethyst',
    'minecraft:copper',
    'minecraft:diamond',
    'minecraft:emerald',
    'minecraft:gold',
    'minecraft:iron',
    'minecraft:lapis',
    'minecraft:netherite',
    'minecraft:redstone',
]

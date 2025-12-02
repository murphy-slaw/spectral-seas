const $WeightedRandomList = Java.loadClass('net.minecraft.util.random.WeightedRandomList')
//const $Potions = Java.loadClass('net.minecraft.world.item.alchemy.Potions')
const $RandomSource = Java.loadClass('net.minecraft.util.RandomSource')
const RANDOM_SOURCE = $RandomSource.create()

const Loot = (function () {
    /**
     * Return a random Enchantment from the provided list, using rarity weights
     * @param {string[]} ids
     * @returns {Optional<EnchantmentInstance>}
     */
    function weightedEnchant(ids) {
        /** @type {Internal.RegistryInfo<Internal.Enchantment} */
        const reg = Utils.getRegistry('minecraft:enchantment')
        const instances = ids.map((id) => new EnchantmentInstance(reg.getValue(id), 1))
        /** @type {Internal.WeightedRandomList<EnchantmentInstance>} */
        const weightedList = $WeightedRandomList.create(instances)
        const instance = weightedList.getRandom(RANDOM_SOURCE)
        return instance.isPresent() ? instance.get().enchantment : undefined
    }

    /**
     * Return a list of valid enchantments for the given item from the provided list
     * @param {Internal.ItemStack} item
     * @param {string[]} pool
     * @returns {Internal.Enchantment[]}
     */
    function enchantsFor(item, pool) {
        /** @type {Internal.RegistryInfo<Internal.Enchantment>} */
        const reg = Utils.getRegistry('minecraft:enchantment')
        return pool.filter((v) => reg.getValue(v) && reg.getValue(v).canEnchant(item))
    }

    /**
     * Returns a single valid enchantment for the given item from the pool
     * @param {Internal.ItemStack} item
     * @param {string[]} pool
     * @returns {Internal.Enchantment[]}
     */
    function randomEnchantFor(item, pool) {
        const ids = enchantsFor(item, pool)
        return weightedEnchant(ids)
    }

    /**
     * Returns a LootEntry, enchanted randomly from the given pool
     * @param {ResourceLocation} id
     * @param {string[]} pool
     * @returns {Internal.LootEntry}
     */
    function enchantedFrom(id, pool) {
        const enchantment = randomEnchantFor(Item.of(id), pool)
        if (enchantment) return LootEntry.of(id).enchantRandomly(enchantment)
        console.log(`No valid enchant found for ${id} in ${pool}`)
        return LootEntry.of(id)
    }

    /**
     * Returns a random member of list
     * @param {any[]} list
     * @returns {any}
     */
    function randomOf(list) {
        return Utils.randomOf(Utils.random, list)
    }

    /**
     * Returns a LootEntry of a random item identifier in ids
     * @param {ResourceLocation[]} ids
     * @returns {Internal.LootEntry}
     */
    function randomEntryOf(ids) {
        return LootEntry.of(randomOf(ids))
    }

    function randomSetOf(ids, chance, damage) {
        let entries = []
        ids.forEach((element) => {
            entries.push(
                LootEntry.of(element)
                    .when((c) => c.randomChance(chance))
                    .damage(damage)
            )
        })
        return entries
    }
    /**
     * Returns a LootEntry of the requested potion type
     * @param {Internal.Potion} type
     * @returns {Internal.LootEntry}
     */
    function potionOf(type) {
        return LootEntry.of('minecraft:potion').addPotion(type)
    }

    /**
     * Returns a loot entry of a random potion from types
     * @param {Internal.Potion[]} types
     * @returns {Internal.LootEntry}
     */
    function randomPotionOf(types) {
        return potionOf(randomOf(types))
    }

    /**
     * Returns a LootEntry of a random item from ids, enchanted with a random enchant from pool
     * @param {ResourceLocation[]} ids
     * @param {string[]} pool
     * @returns {Internal.LootEntry}
     */
    function randomEnchantedFrom(ids, pool) {
        return enchantedFrom(randomOf(ids), pool)
    }

    /**
     * If the LootContext has no loot in it, add loot using poolFunction
     *  @param {Internal.LootContextJS} ctx
     *  @param {Function} poolFunction
     */
    function exclusiveLootPool(ctx, poolFunction) {
        if (!ctx.hasLoot(ItemFilter.ALWAYS_TRUE)) {
            poolFunction(ctx).forEach((loot) => ctx.addLoot(loot))
        }
    }

    /**
     * Discards the contents of the given loot table and replaces it with one pool from poolFuncions
     * @param {Internal.LootModificationEventJS} event
     * @param {ResourceLocation} tableId
     * @param {Function[]} poolFunctions
     */
    function smartReplacePools(event, tableId, poolFunctions) {
        event.addLootTableModifier(tableId).removeLoot(ItemFilter.ALWAYS_TRUE)

        while (poolFunctions.length > 0) {
            let chance = 1 / poolFunctions.length
            let pool = poolFunctions.pop()
            event
                .addLootTableModifier(tableId)
                .randomChance(chance)
                .apply((ctx) => exclusiveLootPool(ctx, pool))
        }
    }

    function chowderOf(effect) {
        /** @type {Internal.RegistryInfo<Internal.Potion>} */
        const reg = Utils.getRegistry('potion')
        const potion = reg.getValue(effect)

        let tag = NBT.compoundTag()

        if (!potion.effects.empty) {
            /** @param {Internal.MobEffectInstance}  effect */
            potion.effects.forEach((effect) => {
                tag = effect.save(tag)
            })
        }

        return LootEntry.of('spectral_seas:suspicious_chowder').addNBT({
            CustomPotionEffects: [
                tag,
                {
                    Ambient: 0,
                    Amplifier: 0,
                    Duration: 50,
                    Id: $MobEffect.getId('poison'),
                    ShowIcon: 1,
                    ShowParticles: 1,
                },
            ],
            Potion: 'potioncraft:crafted_potion',
            potency: 3,
        })
    }

    const CHOWDER_EFFECTS = [
        'minecraft:swiftness',
        'minecraft:leaping',
        'minecraft:regeneration',
        'spectral_seas:shrinking_potion',
        'spectral_seas:growth_potion',
        'minecraft:night_vision',
        'minecraft:strength',
        'minecraft:slow_falling',
        'minecraft:poison',
        'minecraft:blindness',
    ]
    function allChowders(event) {
        return CHOWDER_EFFECTS.map((effect) => Loot.chowderOf(effect))
    }

    return {
        randomOf: randomOf,
        randomEntryOf: randomEntryOf,
        randomSetOf: randomSetOf,
        randomEnchantFor: randomEnchantFor,
        potionOf: potionOf,
        randomPotionOf: randomPotionOf,
        chowderOf: chowderOf,
        allChowders: allChowders,
        enchantedFrom: enchantedFrom,
        randomEnchantedFrom: randomEnchantedFrom,
        exclusiveLootPool: exclusiveLootPool,
        smartReplacePools: smartReplacePools,
    }
})()

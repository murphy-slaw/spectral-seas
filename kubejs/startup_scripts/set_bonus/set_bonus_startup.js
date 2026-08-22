// priority: 1000

// Main script for armor set bonuses
// you should not need to modify this file unless you are adding new features to the set bonus system.

/** @type {Record<string, BonusConfig>} */
global.set_bonuses = {}

/**
 * Register a new armor set bonus.
 * @param {string} name
 * @param {BonusConfig} config
 */
function registerSetBonus(name, config) {
    global.set_bonuses[name] = config
}

// Matching Helpers

/**
 * Checks whether an item stack matches an entry (item ID or tag).
 *
 * For tags, the '#' prefix is stripped before calling `hasTag`.
 * @param {Internal.ItemStack} itemStack
 * @param {string} entry
 * @returns {boolean}
 */
function matchesEntry(itemStack, entry) {
    if (entry.startsWith('#')) {
        return itemStack.hasTag(entry.substring(1))
    }
    return itemStack.id === entry
}

/**
 * Checks whether an armor slot matches a list of required entries.
 *
 * Returns `true` if the list is empty/undefined.
 * @param {Internal.ItemStack} slotStack
 * @param {ItemOrTag[] | undefined} entries
 * @returns {boolean}
 */
function matchesSlot(slotStack, entries) {
    if (!entries || entries.length === 0) return true
    return entries.some((entry) => matchesEntry(slotStack, entry))
}

// Main function

/**
 * Evaluates worn armor and offhand items, then applies/removes effects/attribute modifiers.
 *
 * This function is called automatically when a player equips or unequips any item.
 * @param {Internal.ContextUtils$EntityEquipmentContext} ctx
 */
global.armorSetBonus = (ctx) => {
    let { entity } = ctx
    let level = entity.getLevel()
    if (level.isClientSide()) return

    let server = level.getServer()

    server.scheduleInTicks(1, (t) => {
        // Armor slots: 0 = boots, 1 = leggings, 2 = chestplate, 3 = helmet
        let armorArray = entity.armorSlots.toArray()
        let bootsSlot = armorArray[0]
        let leggingsSlot = armorArray[1]
        let chestplateSlot = armorArray[2]
        let helmetSlot = armorArray[3]

        let offhandItem = entity.getOffHandItem()
        let offhandId = offhandItem.isEmpty() ? 'minecraft:air' : offhandItem.id

        let setKeys = Object.keys(global.set_bonuses)
        let wornSets = []
        let activeEffects = new Set()
        let activeAttributes = new Set()

        for (let set of setKeys) {
            let setData = global.set_bonuses[set]
            let hasPerSlot =
                setData.helmet || setData.chestplate || setData.leggings || setData.boots
            let armorMatch

            if (hasPerSlot) {
                // Per‑slot: each defined slot must match at least one entry
                armorMatch =
                    matchesSlot(helmetSlot, setData.helmet) &&
                    matchesSlot(chestplateSlot, setData.chestplate) &&
                    matchesSlot(leggingsSlot, setData.leggings) &&
                    matchesSlot(bootsSlot, setData.boots)
            } else {
                // Generic 'armors' list: all listed items must be present (any slot)
                let armors = setData.armors || []
                let wornArmor = entity.armorSlots.toArray().map((i) => i.id)
                armorMatch = armors.every((a) => wornArmor.includes(a))
            }
            console.info(armorMatch)

            // Offhand: any defined item must be in the offhand slot
            let offhandRequired = setData.offhands || setData.offhand || []
            let offhandMatch =
                offhandRequired.length === 0 ||
                offhandRequired.some((id) => matchesEntry(offhandItem, id))

            if (armorMatch && offhandMatch) {
                console.log("Boop:" + set)
                wornSets.push(set)
                for (let effect of setData.bonus.potion_effects) {
                    activeEffects.add(effect[0])
                }
                for (let attr of setData.bonus.attribute_modifiers) {
                    activeAttributes.add(attr[0])
                }
            }
        }


        // Apply bonuses for all matched sets
        for (let set of wornSets) {
            let setData = global.set_bonuses[set]
            for (let effect of setData.bonus.potion_effects) {
                let effectId = effect[0]
                let effectLevel = (effect[1] || 0) - 1 // Remove 1 so level matches amplifier (level 1 = amplifier 0)
                let ambient = effect[2] || false
                let showParticles = effect[3] !== false
                entity.potionEffects.add(effectId, -1, effectLevel, ambient, showParticles)
            }
            for (let attr of setData.bonus.attribute_modifiers) {
                console.log(attr)
                let attributeId = attr[0]
                let attributeName = attr[1]
                let attributeValue = attr[2]
                let attributeOperation = attr[3]
                let attribute = Utils.getRegistry('attribute').getValue(attributeId)
                entity.modifyAttribute(attribute, attributeName, attributeValue, attributeOperation)
            }
        }

        // Remove bonuses from sets no longer worn
        for (let set of setKeys) {
            let setData = global.set_bonuses[set]
            for (let effect of setData.bonus.potion_effects) {
                let effectId = effect[0]
                if (!activeEffects.has(effectId)) {
                    entity.removeEffect(effectId)
                }
            }
            for (let attr of setData.bonus.attribute_modifiers) {
                let attributeId = attr[0]
                if (!activeAttributes.has(attributeId)) {
                    entity.removeAttribute(attributeId, attr[1])
                }
            }
        }
    })
}

// Create event listener for player equipment changes
EntityJSEvents.modifyEntity((e) => {
    e.modify('minecraft:player', (modifyBuilder) => {
        modifyBuilder.onEquipItem((context) => global.armorSetBonus(context))
    })
})

/**
 * Counts how many required armor pieces (and offhand if applicable) of a set are currently equipped.
 * @param {Internal.Player} player
 * @param {BonusConfig} setData
 * @returns {{ total: number, equipped: number }}
 */
function getSetProgress(player, setData) {
    let armor = player.armorSlots.toArray()
    let helmet = armor[3]
    let chestplate = armor[2]
    let leggings = armor[1]
    let boots = armor[0]
    let offhand = player.getOffHandItem()

    let hasPerSlot = setData.helmet || setData.chestplate || setData.leggings || setData.boots
    let offhandRequired = setData.offhands || []

    let total = 0
    let equipped = 0

    if (hasPerSlot) {
        if (setData.helmet) {
            total++
            if (matchesSlot(helmet, setData.helmet)) equipped++
        }
        if (setData.chestplate) {
            total++
            if (matchesSlot(chestplate, setData.chestplate)) equipped++
        }
        if (setData.leggings) {
            total++
            if (matchesSlot(leggings, setData.leggings)) equipped++
        }
        if (setData.boots) {
            total++
            if (matchesSlot(boots, setData.boots)) equipped++
        }
    } else {
        // Generic armors list
        let armors = setData.armors || []
        total = armors.length
        equipped = 0
        for (let a of armors) {
            if (armor.some((slot) => slot.id === a)) equipped++
        }
    }

    // Offhand counts as an extra required piece if defined
    if (offhandRequired.length > 0) {
        total++
        if (offhandRequired.some((id) => matchesEntry(offhand, id))) equipped++
    }

    return { total: total, equipped: equipped }
}

/**
 * Formats a requirement entry (item ID or tag) into a user-friendly string.
 * @param {string} entry
 * @returns {string}
 */
function formatRequirementEntry(entry) {
    if (entry.startsWith('#')) {
        return '§7#§r' + entry.substring(1)
    } else {
        let item = Item.of(entry)
        if (!item.isEmpty()) {
            return Text.translate(item.descriptionId).string
        }
        return entry
    }
}

/**
 * Returns an array of Text components listing the slot name and each required item on its own line.
 * Each item line is prefixed with `§8-§r` for a clean bullet-point look.
 * @param {BonusConfig} setData
 * @returns {Internal.Component[]}
 */
function getRequirementLines(setData) {
    let lines = []
    if (setData.helmet) {
        lines.push(Text.of('  §7Helmet:§r'))
        for (let i = 0; i < setData.helmet.length; i++) {
            lines.push(Text.of('    §8- §r' + formatRequirementEntry(setData.helmet[i])))
        }
    }
    if (setData.chestplate) {
        lines.push(Text.of('  §7Chestplate:§r'))
        for (let i = 0; i < setData.chestplate.length; i++) {
            lines.push(Text.of('    §8- §r' + formatRequirementEntry(setData.chestplate[i])))
        }
    }
    if (setData.leggings) {
        lines.push(Text.of('  §7Leggings:§r'))
        for (let i = 0; i < setData.leggings.length; i++) {
            lines.push(Text.of('    §8- §r' + formatRequirementEntry(setData.leggings[i])))
        }
    }
    if (setData.boots) {
        lines.push(Text.of('  §7Boots:§r'))
        for (let i = 0; i < setData.boots.length; i++) {
            lines.push(Text.of('    §8- §r' + formatRequirementEntry(setData.boots[i])))
        }
    }
    if (setData.armors) {
        lines.push(Text.of('  §7Armor:§r'))
        for (let i = 0; i < setData.armors.length; i++) {
            lines.push(Text.of('    §8- §r' + formatRequirementEntry(setData.armors[i])))
        }
    }
    if (setData.offhands || setData.offhand) {
        let offs = setData.offhands || setData.offhand || []
        lines.push(Text.of('  §7Offhand:§r'))
        for (let i = 0; i < offs.length; i++) {
            lines.push(Text.of('    §8- §r' + formatRequirementEntry(offs[i])))
        }
    }
    return lines
}

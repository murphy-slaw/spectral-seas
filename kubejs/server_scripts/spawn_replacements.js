const baseScale = scaleTypes.BASE
const MobType = Java.loadClass('net.minecraft.world.entity.MobType')

const pillagerHats = [
    Item.of('simplehats:bicorne'),
    Item.of('simplehats:eyepatch'),
    Item.of('simplehats:ushanka'),
    //'simplehats:dorkglassesandteeth',
    //'simplehats:bowler',
    Item.of('minecraft:iron_helmet').withNBT({ style: 'pirate' }),
    Item.of('minecraft:chainmail_helmet').withNBT({ style: 'pirate' }),
    Item.of('minecraft:leather_helmet').withNBT({ style: 'pirate' }),
]

const vindicatorWeapons = [
    'simplyswords:iron_cutlass',
    'simplyswords:iron_rapier',
    'minecraft:iron_axe',
]

const pillagerWeapons = ['musketmod:pistol']

EntityEvents.spawned(event => {
    // Define constants
    const entity = event.entity

    // Skip the logic if the entity is a player or is not living
    if (entity.isPlayer() || !entity.isLiving()) {
        return
    }

    if (entity.mobType === MobType.ILLAGER) {
        //Don't replace raid captain banner
        if (entity.getHeadArmorItem().empty) {
            entity.setHeadArmorItem(Utils.randomOf(Utils.random, pillagerHats))
        }
        if (entity.type == 'minecraft:pillager') {
            entity.setItemSlot(
                'mainhand',
                Item.of(Utils.randomOf(Utils.random, pillagerWeapons))
            )
        }
        if (entity.type == 'minecraft:vindicator') {
            entity.setItemSlot(
                'mainhand',
                Item.of(Utils.randomOf(Utils.random, vindicatorWeapons))
            )
        }
    }

    if (entity.type == 'hybrid-aquatic:coconut_crab') {
        // event.server.runCommandSilent(`execute in ${entity.level.dimension} positioned ${entity.x} ${entity.y} ${entity.z} run summon ecologics:coconut_crab`)
        event.cancel()
    }

    if (entity.type == 'hybrid-aquatic:karkinos') {
        console.infof('Summoned Karkinos: %s', entity.uuid)
        baseScale.getScaleData(entity).setScale(3)
    }
    if (entity.type === 'minecraft:drowned') {
        var data = entity.nbt
        data.put(
            'HandDropChances',
            NBT.listTag([NBT.floatTag(0.085), NBT.floatTag(0.3)])
        )
        entity.setNbt(data)
    }

    if (entity.type === 'guardvillagers:guard') {
        entity.armorSlots.forEach(slot => {
            if (!slot.empty) {
                console.log(slot)
                slot.addTagElement('style', 'heavy')
            }
        })
    }

    if (entity.type === 'minecraft:drowned') {
        entity.armorSlots.forEach(slot => {
            if (!slot.empty) {
                console.log(slot)
                slot.addTagElement('style', 'samurai')
            }
        })
    }
})

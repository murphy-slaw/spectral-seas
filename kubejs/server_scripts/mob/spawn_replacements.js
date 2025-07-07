const $MobType = Java.loadClass('net.minecraft.world.entity.MobType')
const $ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
const $GEntityTypes = Java.loadClass('net.orcinus.galosphere.init.GEntityTypes')
var $ScaleTypes$BASE = $ScaleTypes.BASE

const MONSTER_MOBCAP = 70
const PILLAGER_MOBCAP = 8

const pillagerHats = new Map([
    ['simplehats:bicorne', 2],
    ['simplehats:tricorne', 1],
    ['simplehats:eyepatch', 1],
    ['minecraft:air', 2],
])

const vindicatorWeapons = new Map([
    ['simplyswords:iron_cutlass', 2],
    ['simplyswords:iron_rapier', 2],
    ['minecraft:iron_axe', 1],
])

const pillagerWeapons = new Map([
    ['musketmod:pistol', 8],
    ['musketmod:blunderbuss', 1],
    ['musketmod:musket', 1],
])

EntityEvents.spawned(event => {
    const { entity, level } = event

    if (entity.isPlayer() || !entity.isLiving()) {
        return
    }

    // Fake mobcap: leave headroom for Pirate summons
    if (
        entity.type != 'minecraft:pillager' &&
        entity.monster &&
        level.getEntities().filter(entity => entity.monster && entity.type != 'minecraft:pillager')
            .length >=
            MONSTER_MOBCAP - PILLAGER_MOBCAP
    ) {
        event.cancel()
    }

    if (entity.mobType === $MobType.ILLAGER) {
        if (StructureUtils.entityInStructure(entity, 'mostructures:pillager_factory', level)) {
            entity.setChestArmorItem(
                Item.of(
                    'minecraft:leather_chestplate',
                    '{Damage:0,Trim:{material:"minecraft:redstone",pattern:"minecraft:sentry"},display:{color:3949738}}'
                )
            )

            entity.setLegsArmorItem(
                Item.of(
                    'leather_leggings',
                    '{Damage:0,Trim:{material:"minecraft:redstone",pattern:"minecraft:sentry"},display:{color:3949738}}'
                )
            )
        }

        //Don't replace raid captain banner
        if (entity.getHeadArmorItem().empty) {
            //entity.setHeadArmorItem(Utils.randomOf(Utils.random, pillagerHats))
            entity.setHeadArmorItem(Item.of(RandomUtils.weighted(pillagerHats)))
        } else if (entity.getHeadArmorItem().item == 'white_banner') {
            entity.setHeadArmorItem(BANNERS.JOLLY_ROGER)
        }
        if (entity.type == 'minecraft:pillager') {
            entity.setItemSlot('mainhand', Item.of(RandomUtils.weighted(pillagerWeapons)))
        }
        if (entity.type == 'minecraft:vindicator') {
            entity.setItemSlot('mainhand', Item.of(RandomUtils.weighted(vindicatorWeapons)))
        }
    }

    if (entity.type == 'hybrid-aquatic:coconut_crab') {
        // event.server.runCommandSilent(`execute in ${entity.level.dimension} positioned ${entity.x} ${entity.y} ${entity.z} run summon ecologics:coconut_crab`)
        event.cancel()
    }

    if (entity.type == 'hybrid-aquatic:karkinos') {
        console.infof('Summoned Karkinos: %s', entity.uuid)
        $ScaleTypes.BASE.getScaleData(entity).setScale(3)
    }

    if (entity.type === 'minecraft:drowned') {
        var data = entity.nbt
        data.put('HandDropChances', NBT.listTag([NBT.floatTag(0.085), NBT.floatTag(0.3)]))
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

    if (entity.type === 'galosphere:spectre') {
        if (level.getEntities($GEntityTypes.SPECTRE, pred => true).length > 8) {
            event.cancel()
        }
    }
})

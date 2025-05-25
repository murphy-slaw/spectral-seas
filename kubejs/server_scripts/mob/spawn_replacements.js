const $MobType = Java.loadClass('net.minecraft.world.entity.MobType')
var $ScaleTypes = Java.loadClass('virtuoel.pehkui.api.ScaleTypes')
const $ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const $ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
const $StructureStart = Java.loadClass(
    'net.minecraft.world.level.levelgen.structure.StructureStart'
)
var $ScaleTypes$BASE = $ScaleTypes.BASE

const pillagerHats = [
    Item.of('simplehats:bicorne'),
    Item.of('simplehats:tricorne'),
    Item.of('simplehats:eyepatch'),
    Item.of('minecraft:air'),
    //'simplehats:dorkglassesandteeth',
]

const vindicatorWeapons = [
    'simplyswords:iron_cutlass',
    'simplyswords:iron_rapier',
    'minecraft:iron_axe',
]

const pillagerWeapons = ['musketmod:pistol']

/**
 * @param {BlockPos} blockPos
 * @param {ResourceLocation} structureId
 * @param {Internal.ServerLevel} serverLevel
 * @returns {boolean}
 */
function posInStructure (blockPos, structureId, serverLevel) {
    /** @type {Internal.Registry<Internal.Structure> */
    let reg = serverLevel
        .registryAccess()
        .registryOrThrow($ResourceKey.createRegistryKey('worldgen/structure'))

    return (
        serverLevel
            .structureManager()
            .getAllStructuresAt(blockPos)
            .keySet()
            .filter(struct => {
                if (struct.delegate) struct = struct.delegate()
                return reg.getKey(struct) === structureId
            }).length > 0
    )
}
/**
 * @param {Internal.Entity} entity
 * @param {ResourceLocation} structureId
 * @param {Internal.ServerLevel} serverLevel
 * @returns {boolean}
 */
function entityInStructure (entity, structureId, serverLevel) {
    return posInStructure(entity.blockPosition(), structureId, serverLevel)
}

EntityEvents.spawned(event => {
    /** @type {Internal.LivingEntity} */
    const entity = event.entity

    if (entity.isPlayer() || !entity.isLiving()) {
        return
    }

    if (entity.mobType === $MobType.ILLAGER) {
        if (entityInStructure(entity, 'mostructures:pillager_factory', event.level)) {
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
            entity.setHeadArmorItem(Utils.randomOf(Utils.random, pillagerHats))
        } else if (entity.getHeadArmorItem().item == 'white_banner') {
            entity.setHeadArmorItem(BANNERS.JOLLY_ROGER)
        }
        if (entity.type == 'minecraft:pillager') {
            entity.setItemSlot('mainhand', Item.of(Utils.randomOf(Utils.random, pillagerWeapons)))
        }
        if (entity.type == 'minecraft:vindicator') {
            entity.setItemSlot('mainhand', Item.of(Utils.randomOf(Utils.random, vindicatorWeapons)))
        }
    }

    if (entity.type == 'hybrid-aquatic:coconut_crab') {
        // event.server.runCommandSilent(`execute in ${entity.level.dimension} positioned ${entity.x} ${entity.y} ${entity.z} run summon ecologics:coconut_crab`)
        event.cancel()
    }

    if (entity.type == 'hybrid-aquatic:karkinos') {
        console.infof('Summoned Karkinos: %s', entity.uuid)
        $ScaleTypes$BASE.getScaleData(entity).setScale(3)
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
})

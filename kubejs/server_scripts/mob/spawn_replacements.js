const $MobType = Java.loadClass('net.minecraft.world.entity.MobType')
const $GEntityTypes = Java.loadClass('net.orcinus.galosphere.init.GEntityTypes')

const pillagerHats = new Map([
    ['simplehats:bicorne', 2],
    ['simplehats:tricorne', 1],
    ['simplehats:eyepatch', 1],
    ['minecraft:air', 2],
])

const undeadHats = new Map([
    ['minecraft:air', 36],
    ['simplehats:bicorne', 4],
    ['simplehats:tricorne', 2],
    ['farmersdelight:cooking_pot', 1],
])

const vindicatorWeapons = new Map([
    ['simplyswords:iron_cutlass', 2],
    ['simplyswords:iron_rapier', 2],
    ['minecraft:iron_axe', 1],
])

const pillagerWeapons = new Map([
    ['musketmod:pistol', 28],
    ['musketmod:blunderbuss', 1],
    ['musketmod:musket', 3],
])

const zombieLackeyWeapons = new Map([
    ['sticknstone:stone_cutlass', 20],
    ['farmersdelight:iron_knife', 10],
    ['farmersdelight:skillet', 1],
    ['supplementaries:wrench', 1],
])

EntityEvents.spawned((event) => {
    const { entity, level } = event

    if (entity.isPlayer() || !entity.isLiving()) {
        return
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
            entity.setHeadArmorItem(Item.of(RandomUtils.weighted(pillagerHats)))
        } else if (entity.getHeadArmorItem().item === 'white_banner') {
            entity.setHeadArmorItem(BANNERS.JOLLY_ROGER)
        }
        if (entity.type === 'minecraft:pillager') {
            entity.setItemSlot('mainhand', Item.of(RandomUtils.weighted(pillagerWeapons)))
        }
        if (entity.type === 'minecraft:vindicator') {
            entity.setItemSlot('mainhand', Item.of(RandomUtils.weighted(vindicatorWeapons)))
        }
    }

    if (entity.type === 'frycmobvariants:corsair') {
        event.server.scheduleInTicks(1, (task) => {
            if (entity.getHeadArmorItem().empty) {
                entity.setHeadArmorItem(Item.of(RandomUtils.weighted(undeadHats)))
            }
        })
    }

    if (entity.type === 'rottencreatures:zombie_lackey') {
        event.server.scheduleInTicks(1, (task) => {
            entity.setItemSlot('mainhand', Item.of(RandomUtils.weighted(zombieLackeyWeapons)))
            if (entity.getHeadArmorItem().empty) {
                entity.setHeadArmorItem(Item.of(RandomUtils.weighted(undeadHats)))
            }
        })
    }
    if (entity.type === 'minecraft:wither_skeleton') {
        event.server.scheduleInTicks(1, (task) => {
            entity.setItemSlot('mainhand', Item.of('sticknstone:stone_cutlass'))
            if (entity.getHeadArmorItem().empty) {
                entity.setHeadArmorItem(Item.of(RandomUtils.weighted(undeadHats)))
            }
        })
    }
    if (entity.type === 'rottencreatures:skeleton_lackey') {
        event.server.scheduleInTicks(1, (task) => {
            entity.setItemSlot('MAINHAND', 'farmersdelight:iron_knife')
            entity.setItemSlot('OFFHAND', 'farmersdelight:iron_knife')
        })
    }

    if (entity.type === 'hybrid_aquatic:karkinos') {
        $ScaleTypes$BASE.getScaleData(entity).setScale(3)
    }

    if (entity.type === 'hybrid_aquatic:coconut_crab') {
        $ScaleTypes$BASE.getScaleData(entity).setScale(1.5)
    }

    if (entity.type === 'naturalist:boar') {
        $ScaleTypes$BASE.getScaleData(entity).setScale(1.25)
    }

    if (entity.type === 'minecraft:drowned') {
        let data = entity.nbt
        data.put('HandDropChances', NBT.listTag([NBT.floatTag(0.085), NBT.floatTag(0.3)]))
        entity.setNbt(data)
    }

    if (entity.type === 'galosphere:spectre') {
        if (level.getEntities($GEntityTypes.SPECTRE, (pred) => true).length > 8) {
            event.cancel()
        }
    }
})

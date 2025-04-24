const $SharkAttackGoal = Java.loadClass(
    'dev.hybridlabs.aquatic.entity.shark.HybridAquaticSharkEntity$SharkAttackGoal'
)

const $HybridAquaticEntityTypes = Java.loadClass(
    'dev.hybridlabs.aquatic.entity.HybridAquaticEntityTypes'
)
const $SharkEntityType = $HybridAquaticEntityTypes.INSTANCE.GREAT_WHITE_SHARK

const $BoatClass = Java.loadClass('net.minecraft.world.entity.vehicle.Boat')
const $InteractionHand = Java.loadClass('net.minecraft.world.InteractionHand')
const $TagKey = Java.loadClass('net.minecraft.tags.TagKey')

const SHARK_ATTACK_COOLDOWN = 60
const SHARK_MOVE_COOLDOWN = 0

/** @type {Internal.TagKey<Internal.Biome>} */
const IS_DEEP_OCEAN = $TagKey.create(
    Utils.getRegistry('minecraft:worldgen/biome').key,
    'is_deep_ocean'
)

// Create the sea_monsters team if it doesn't exist
ServerEvents.loaded(event => {
    let team = event.server.scoreboard.getPlayerTeam('sea_monsters')
    if (!team) {
        team = event.server.scoreboard.addPlayerTeam('sea_monsters')
        team.color = 'dark_aqua'
    }
})

/**
 * @param {Internal.ServerLevel} level
 * @param {BlockPos} blockPos
 * @param {Internal.TagKey<Internal.Biome>} biomeTag
 * @returns {boolean}
 */
const isBlockPosInBiomeTag = (level, blockPos, biomeTag) => {
    if (!blockPos) return false
    let biome = level
        .getBiome(blockPos)
        .tags()
        .anyMatch(tag => tag == biomeTag)
    return biome
}

/**
 * @param {Internal.Mob} mob
 * @returns {boolean}
 */
const hasValidTarget = mob => {
    let target = null
    if (mob.customData.target)
        target =
            mob.level.getEntity(mob.customData.target) || getTargetBoat(mob)
    if (!target) return false
    return isBlockPosInBiomeTag(
        mob.level,
        target.blockPosition(),
        IS_DEEP_OCEAN
    )
}

/** @param {Internal.Mob} mob */
const addMonsterEffects = mob => {
    mob.potionEffects.add('spectral_seas:hydrodynamic', -1, 0, false, true)
    mob.potionEffects.add('minecraft:glowing', -1, 0, false, false)
}

/** @param {Internal.Mob} mob */
const removeMonsterEffects = mob => {
    mob.removeEffect('spectral_seas:hydrodynamic')
    mob.removeEffect('minecraft:glowing')
}

/** @param {Internal.Mob} mob */
const attackBoatsTick = mob => {
    let attackCooldown = mob.customData.attackCooldown || 0
    let target = restoreTarget(mob)

    if (target == null) {
        target = getTargetBoat(mob)
        if (target == null) return
        mob.navigation.moveTo(target.x, target.y - 1, target.z, 1.0)
    }
    attackCooldown--
    mob.customData.target = target.id

    if (target && !target.removed) {
        let distance = mob.distanceToEntity(target)
        if (getAttackReach(mob, target) >= distance && attackCooldown <= 0) {
            attackTarget(mob, target)
            attackCooldown = SHARK_ATTACK_COOLDOWN
        } else {
            mob.navigation.recomputePath()
        }
        mob.customData.attackCooldown = attackCooldown
    }
}

const restoreTarget = mob => {
    let targetId = mob.customData.target || null
    let target = targetId ? mob.level.getEntity(targetId) : null
    if (target == null || target?.removed) {
        return null
    }
    return target
}

/**
 * @param {Internal.Mob} mob
 * @param {Internal.Entity} target
 */
const attackTarget = (mob, target) => {
    mob.swing($InteractionHand.MAIN_HAND)
    mob.doHurtTarget(target)
    mob.level.playSound(
        null,
        target.x,
        target.y,
        target.z,
        'smallships:ship_hit',
        target.getSoundSource(),
        15,
        1
    )
}

/**
 * @param {Internal.Mob} mob
 * @param {Internal.Entity} target
 * @returns {number}
 */
function getAttackReach (mob, target) {
    return mob.getBbWidth() + target.getBbWidth()
}

/**
 * @param {Internal.Mob} mob
 * @returns {Internal.Entity}
 */
function getTargetBoat (mob) {
    /** @type {Internal.Entity} */
    let target = null
    let range = mob.attributes.getValue('minecraft:generic.follow_range')
    let mobAABB = mob.boundingBox.inflate(range, 32, range)
    mob.level.getEntitiesOfClass($BoatClass, mobAABB).forEach(entity => {
        if (entity != null) {
            let entityDistance = entity.distanceToEntity(mob)
            if (
                (entityDistance <= range && target
                    ? entityDistance < target.distanceToEntity(mob)
                    : true) &&
                entity.hasPassenger(entity => entity.player)
            ) {
                target = entity
            }
        }
    })
    mob.customData.target = target != null ? target.id : null
    return target
}

EntityJSEvents.addGoalSelectors('hybrid-aquatic:great_white_shark', event => {
    event.customGoal(
        /** @param {string} name */ 'attack_boats',
        /** @param {number} priority */ 0,
        /** @param {Function} canUse */ hasValidTarget,
        /** @param {Function} canContinueToUse */ hasValidTarget,
        /** @param {boolean} isInterruptable */ true,
        /** @param {Function} start */ addMonsterEffects,
        /** @param {Function} stop */ removeMonsterEffects,
        /** @param {boolean} requiresUpdateEveryTick */ true,
        /** @param {Function} tick */ attackBoatsTick
    )
})

let loaded = 0
LevelEvents.loaded('minecraft:overworld', event => {
    if (event.level.isClientSide()) return
    if (loaded > 0) return
    console.log('Scheduling annoying sharks…')
    event.server.scheduleRepeatingInTicks('300', task => {
        sharkSummoner(task, event.level)
    })
    loaded++
})

/**
 * @param {Internal.ScheduledEvents$ScheduledEvent} task
 * @param {Internal.ServerLevel} level
 */
let sharkSummoner = (task, level) => {
    console.log('Summoning annoying sharks…')

    level.getPlayers().forEach(player => {
        let monsterMap = level.persistentData.getCompound('monsterMap')
        if (monsterMap.contains(player.stringUuid)) return
        /** @type {Internal.LivingEntity} */
        let shark = $SharkEntityType.create(level)

        shark.setAttributeBaseValue('minecraft:generic.follow_range', 64)
        $ScaleTypes.BASE.getScaleData(shark).setScale(2)
        let veh = player.getVehicle()
        if (!veh) return
        let direction = veh.getForward()
        let position = veh.getPosition(1).subtract(direction.scale(32))
        shark.moveTo(position)

        level.scoreboard.addPlayerToTeam(
            shark.stringUuid,
            level.scoreboard.getPlayerTeam('sea_monsters')
        )

        if (level.tryAddFreshEntityWithPassengers(shark)) {
            monsterMap.putUUID(player.stringUuid, shark.uuid)
        }

        level.persistentData.monsterMap = monsterMap
    })
}

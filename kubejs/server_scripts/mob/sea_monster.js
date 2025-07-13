const $HybridAquaticEntityTypes = Java.loadClass(
    'dev.hybridlabs.aquatic.entity.HybridAquaticEntityTypes'
)
/** @type {Internal.EntityType} */
const $SharkEntityType = $HybridAquaticEntityTypes.INSTANCE.GREAT_WHITE_SHARK

//const $EntityType = Java.loadClass('net.minecraft.world.entity.EntityType')
//const $TurtleEntityType = $EntityType.TURTLE
//const $SquidEntityType = $HybridAquaticEntityTypes.INSTANCE.VAMPIRE_SQUID
const MONSTER_TYPES = ['hybrid-aquatic:great_white_shark', 'minecraft:turtle']
const MONSTER_ENTITY_TYPES = [$SharkEntityType]

const $BoatClass = Java.loadClass('net.minecraft.world.entity.vehicle.Boat')
const $InteractionHand = Java.loadClass('net.minecraft.world.InteractionHand')
const $TagKey = Java.loadClass('net.minecraft.tags.TagKey')

const MONSTER_CHECK_TICKS = 300
const MONSTER_DOOM_TIME = 300
const MONSTER_ATTACK_COOLDOWN = 80
const MONSTER_DIFFICULTY_THRESHOLD = 2.0

/** @type {Internal.TagKey<Internal.Biome>} */
const IS_DEEP_OCEAN = $TagKey.create(
    Utils.getRegistry('minecraft:worldgen/biome').key,
    'is_deep_ocean'
)

// Create the sea_monsters team if it doesn't exist
ServerEvents.loaded((event) => {
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
    const inBiome = level
        .getBiome(blockPos)
        .tags()
        .anyMatch((tag) => tag === biomeTag)
    return inBiome
}

/**
 * @param {Internal.Mob} mob
 * @param {Internal.entity} entity
 * @returns {boolean}
 */
function isValidTarget(mob, entity) {
    const valid =
        isBlockPosInBiomeTag(mob.level, entity.blockPosition(), IS_DEEP_OCEAN) &&
        entity.distanceToEntity(mob) <= mob.attributes.getValue('generic.follow_range') // && entity.hasPassenger(entity => entity.player)
    return valid
}

/**
 * @param {Internal.Mob} mob
 * @returns {Internal.Entity}
 */
function getTargetBoat(mob) {
    /** @type {Internal.Entity} */
    let target = null
    const range = mob.attributes.getValue('minecraft:generic.follow_range')
    const mobAABB = mob.boundingBox.inflate(range, 32, range)
    // @ts-ignore
    mob.level.getEntitiesOfClass($BoatClass, mobAABB).forEach((entity) => {
        if (entity) {
            const entityDistance = entity.distanceToEntity(mob)
            if (
                entityDistance <= range &&
                (target ? entityDistance < target.distanceToEntity(mob) : true) &&
                entity.hasPassenger((entity) => entity.player)
            ) {
                target = entity
                mob.navigation.moveTo(target.x, target.y, target.z, 1.0)
            }
        }
    })
    if (target) {
        mob.persistentData.putUUID('target', target.uuid)
    } else {
        mob.persistentData.remove('target')
    }
    return target
}

/**
 * @param {Internal.Mob} mob
 * @returns {boolean}
 */
const hasValidTarget = (mob) => {
    if (!mob.tags.contains('sea_monster')) return false
    let target = null
    let targetId = 0
    if (mob.persistentData === undefined) return false
    try {
        targetId = mob.persistentData.getUUID('target')
    } catch (error) {
        mob.persistentData.remove('target')
    }
    if (targetId) target = mob.level.getEntity(targetId)
    if (!target) target = getTargetBoat(mob)
    if (!target || !isValidTarget(mob, target)) {
        const doomTimer = mob.persistentData.doomTimer || 0
        if (doomTimer > MONSTER_DOOM_TIME) {
            mob.discard()
            return false
        }
        mob.persistentData.doomTimer = doomTimer + 1
        return false
    }
    return true
}

/** @param {Internal.Mob} mob */
const addMonsterEffects = (mob) => {
    mob.potionEffects.add('spectral_seas:hydrodynamic', -1, 4, false, true)
    mob.potionEffects.add('minecraft:glowing', -1, 0, false, false)
}

/** @param {Internal.Mob} mob */
const removeMonsterEffects = (mob) => {
    mob.removeEffect('spectral_seas:hydrodynamic')
    mob.removeEffect('minecraft:glowing')
}

/** @param {Internal.Mob} mob */
const restoreTarget = (mob) => {
    const targetId = mob.persistentData.getUUID('target')
    const target = targetId !== 0 ? mob.level.getEntity(targetId) : null
    if (!target || target.removed) {
        mob.persistentData.remove('target')
        return null
    }
    return target
}

/**
 * @param {Internal.Mob} mob
 * @param {Internal.Entity} target
 * @returns {number}
 */
function getAttackReach(mob, target) {
    return mob.getBbWidth() + target.getBbWidth()
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

/** @param {Internal.Mob} mob */
const attackBoatsTick = (mob) => {
    let attackCooldown = mob.persistentData.attackCooldown || 0
    const target = restoreTarget(mob)
    if (target) {
        const distance = mob.distanceToEntity(target)
        if (getAttackReach(mob, target) >= distance && attackCooldown <= 0) {
            attackTarget(mob, target)
            attackCooldown = MONSTER_ATTACK_COOLDOWN
        } else {
            if (mob.age % 10 === 0) mob.navigation.moveTo(target.x, target.y, target.z, 1.0)
            mob.navigation.recomputePath()
        }
    }
    attackCooldown--
    mob.persistentData.attackCooldown = attackCooldown
}

MONSTER_TYPES.forEach((type) => {
    EntityJSEvents.addGoalSelectors(type, (event) => {
        /**
         * @param {string}   name
         * @param {number}   priority
         * @param {Function} canUse
         * @param {Function} canContinueToUse
         * @param {boolean}  isInterruptable
         * @param {Function} start
         * @param {Function} stop
         * @param {boolean}  requiresUpdateEveryTick
         * @param {Function} tick
         */
        event.customGoal(
            'attack_boats',
            -1,
            hasValidTarget,
            hasValidTarget,
            true,
            addMonsterEffects,
            removeMonsterEffects,
            true,
            attackBoatsTick
        )
    })
})
/**
 *
 * @param {Internal.ServerPlayer} player
 * @returns {boolean}
 */
function hasNemesis(player) {
    if (player.persistentData.Nemesis) {
        const nemesis = player.persistentData.getUUID('Nemesis')
        if (nemesis && player.level.getEntity(nemesis)) return true
        player.persistentData.remove('Nemesis')
    }
    return false
}

/**
 * @param {Internal.ScheduledEvents$ScheduledEvent} _task
 * @param {Internal.ServerLevel} level
 */
const monsterSummoner = (_task, level) => {
    level.getPlayers().forEach(
        /** @param {Internal.ServerPlayer} player */ (player) => {
            if (
                hasNemesis(player) ||
                !isBlockPosInBiomeTag(level, player.blockPosition().below(2), IS_DEEP_OCEAN) ||
                level.getCurrentDifficultyAt(player.blockPosition()).effectiveDifficulty <=
                    MONSTER_DIFFICULTY_THRESHOLD
            ) {
                return
            }

            const monsterType = Utils.randomOf(Utils.random, MONSTER_ENTITY_TYPES)
            /** @type {Internal.LivingEntity} */
            const monster = monsterType.create(level)
            monster.tags.add('sea_monster')
            monster.setAttributeBaseValue('minecraft:generic.follow_range', 64)
            monster.size = 0
            $ScaleTypes.BASE.getScaleData(monster).setScale(2)

            const veh = player.getVehicle()
            if (!veh) return
            const direction = veh.getForward()
            const position = veh.getPosition(1).subtract(direction.scale(32))
            monster.moveTo(position)

            level.scoreboard.addPlayerToTeam(
                monster.stringUuid,
                level.scoreboard.getPlayerTeam('sea_monsters')
            )

            if (level.tryAddFreshEntityWithPassengers(monster)) {
                console.log(`${player.displayName.string} gets their very own sea monster!`)
                player.displayClientMessage(
                    'A beast rises from the depths to devour your vessel!',
                    true
                )
                const camera = player.getCamera()
                level.playSound(
                    null,
                    camera.x,
                    camera.y,
                    camera.z,
                    'spectral_seas:monster_sting',
                    'NEUTRAL',
                    15,
                    1
                )

                player.persistentData.putUUID('Nemesis', monster.getUuid())
            }
        }
    )
}

// WHY DOES minecraft:overworld FIRE loaded() TWICE?
let seaMonsterLoaded = 0
LevelEvents.loaded('minecraft:overworld', (event) => {
    if (event.level.isClientSide()) return
    if (seaMonsterLoaded > 0) return
    console.log('Scheduling annoying sea monsters…')
    event.server.scheduleRepeatingInTicks(MONSTER_CHECK_TICKS, (task) => {
        monsterSummoner(task, event.level)
    })
    seaMonsterLoaded++
})

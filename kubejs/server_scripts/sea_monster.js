const $SharkAttackGoal = Java.loadClass(
    'dev.hybridlabs.aquatic.entity.shark.HybridAquaticSharkEntity$SharkAttackGoal'
)
const $BoatClass = Java.loadClass('net.minecraft.world.entity.vehicle.Boat')
const $InteractionHand = Java.loadClass('net.minecraft.world.InteractionHand')
const $TagKey = Java.loadClass('net.minecraft.tags.TagKey')

/** @type {Internal.TagKey<Internal.Biome>} */
const IS_DEEP_OCEAN = $TagKey.create(
    Utils.getRegistry('minecraft:worldgen/biome').key,
    'is_deep_ocean'
)

const SHARK_ATTACK_COOLDOWN = 60
const SHARK_MOVE_COOLDOWN = 40

/** @param {Internal.Mob} mob */
let boatAttackTest = mob =>
    mob.level
        .getBiome(mob.blockPosition())
        .tags()
        .anyMatch(tag => tag == IS_DEEP_OCEAN) &&
    (mob.customData.target != null || getTargetBoat(mob, 128) != null)

EntityJSEvents.addGoalSelectors('hybrid-aquatic:great_white_shark', event => {
    event.customGoal(
        /** @param {string} name */ 'attack_boats',
        /** @param {number} priority */ 0,

        /** @param {Function} canUse */
        boatAttackTest,

        /** @param {Function} canContinueToUse */
        boatAttackTest,

        /** @param {boolean} isInterruptable */
        true,

        /** @param {Function} start */
        /** @param {Internal.Mob} mob*/
        mob => {
            mob.potionEffects.add(
                'spectral_seas:hydrodynamic',
                -1,
                8,
                false,
                true
            )
            mob.potionEffects.add('minecraft:glowing', -1, 0, false, false)
        },

        /** @param {Function} stop */
        /** @param {Internal.Mob} mob*/
        mob => {
            mob.removeEffect('spectral_seas:hydrodynamic')
            mob.removeEffect('minecraft:glowing')
        },

        /** @param {boolean} requiresUpdateEveryTick */
        true,

        /** @param {Function} tick */
        /** @param {Internal.Mob} mob */
        mob => {
            //let range = mob.getAttributeValue('minecraft:generic.follow_range')
            let attackCooldown = mob.customData.attackCooldown || 0
            let moveCooldown = mob.customData.moveCooldown || 0
            let targetId = mob.customData.target || null
            let target = targetId ? mob.level.getEntity(targetId) : null
            if (target?.removed) target = null
            let newTarget = getTargetBoat(mob, 128)
            if (newTarget == null) return
            target = newTarget
            attackCooldown--
            moveCooldown--

            if (target && !target.removed) {
                let distance = mob.distanceToEntity(target)
                if (
                    getAttackReach(mob, target) >= distance &&
                    attackCooldown <= 0
                ) {
                    mob.swing($InteractionHand.MAIN_HAND)
                    mob.doHurtTarget(target)
                    mob.level.playSound(
                        null,
                        target.x,
                        target.y,
                        target.z,
                        'smallships:ship_hit',
                        target.getSoundSource(),
                        1,
                        2
                    )
                    attackCooldown = SHARK_ATTACK_COOLDOWN
                    moveCooldown = SHARK_MOVE_COOLDOWN
                }
                if (moveCooldown <= 0) {
                    mob.navigation.moveTo(target.x, target.y - 2, target.z, 1.0)
                }
                mob.customData.attackCooldown = attackCooldown
                mob.customData.moveCooldown = moveCooldown
            }
        }
    )
})

/**
 * @param {Internal.Mob} mob
 * @param {Internal.Entity} attackTarget
 * @returns {number}
 */
function getAttackReach (mob, target) {
    return mob.getBbWidth() * 2.0 + target.getBbWidth()
}

/**
 * @param {Internal.Mob} mob
 * @param {number} range
 * @returns {Internal.Entity}
 * */
function getTargetBoat (mob, range) {
    let target = null
    let mobAABB = mob.boundingBox.inflate(range, 64, range)
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

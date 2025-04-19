const $SharkAttackGoal = Java.loadClass('dev.hybridlabs.aquatic.entity.shark.HybridAquaticSharkEntity$SharkAttackGoal')
const $BoatClass = Java.loadClass('net.minecraft.world.entity.vehicle.Boat')


EntityJSEvents.addGoalSelectors("hybrid-aquatic:great_white_shark", event => {
    event.removeGoal($AttackTargetGoal)
    event.customGoal(
        'attack_boats',
        1,
        mob => true,
        mob => true,
        true,
        mob => { },
        mob => mob.getNavigation.stop(),
        true,
        /** @param {Internal.Mob} mob */
        mob => {
            let mobAABB = mob.boundingBox.inflate(64, 10, 64)
            mob.level
                .getEntitiesOfClass($BoatClass, mobAABB)
                .forEach(entity => {
                    if (entity === null) return
                    if (
                        entity.distanceToEntity(mob) < 100 &&
                        entity.distanceToEntity(mob) > 10
                    ) {
                        mob.navigation.moveTo(entity, 1.0)
                    }
                })
        }
    )
    event.arbitraryGoal(1, () => $SharkAttackGoal(event.entity))
})

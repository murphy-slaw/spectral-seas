const $AbstractHorse = Java.loadClass('net.minecraft.world.entity.animal.horse.AbstractHorse')
const $HitchableHorse = Java.loadClass('io.github.mortuusars.horseman.horse.HitchableHorse')
const $LeashFenceKnotEntity = Java.loadClass(
    'net.minecraft.world.entity.decoration.LeashFenceKnotEntity'
)
//const $Mob = Java.loadClass('net.minecraft.world.entity.Mob')
const $DyeColor = Java.loadClass('net.minecraft.world.item.DyeColor')

const HORSE_TEXTURE = 'antique_atlas:horse/saddle'
const LEAD_LENGTH = 7

/**
 * @param {Internal.Event} event
 * @returns {Internal.AbstractHorse}
 */
function attachHorses(event) {
    const horses = event.level
        .getEntitiesOfClass($AbstractHorse, event.player.boundingBox.inflate(LEAD_LENGTH))
        .filter(
            /** @param {Internal.AbstractHorse} mob */ (mob) => mob.leashHolder === event.player
        )

    console.log(horses)
    if (horses.length > 0) {
        return horses.pop()
    }
}

/**
 * @param {Internal.Event} event
 * @param {Internal.LeashFenceKnotEntity} knot
 * @returns {Internal.Entity}
 */
function detachHorses(event, knot) {
    const horses = event.level.getEntitiesOfClass(
        $AbstractHorse,
        knot.boundingBox.inflate(LEAD_LENGTH)
    )

    const ourHorses = horses.filter(
        /** @param {Internal.Abstracthorse} mob */ (mob) =>
            mob.getLeashHolder() === knot && mob.getOwner() === event.entity
    )
    if (ourHorses.length > 0) {
        return ourHorses.pop()
    }
    return null
}

/**
 * @param {Internal.AbstractHorse} horse
 */
function getHorseColor(horse) {
    if (!horse.persistentData.contains('markerColor')) {
        horse.persistentData.markerColor = String(Loot.randomOf($DyeColor.values()))
    }
    return horse.persistentData.markerColor
}

function getHorseLocation(horse, player, block) {
    return PlayerHelper(player).getMarkerLocation(
        HORSE_TEXTURE,
        getHorseColor(horse),
        BlockPos(block.x, block.y, block.z)
    )
}

/**
 *
 * @param {Internal.AbstractHorse} horse
 * @param {Internal.ServerPlayer} player
 */

function getHorseName(horse, player) {
    if (horse.hasCustomName()) {
        return horse.getName()
    }
    return Text.translatable(`${player.name.string}'s `).append(horse.getName())
}

/**
 * @param {Internal.AbstractHorse} horse
 * @param {Internal.Event} event
 */
function addHorseMarker(horse, event) {
    event.player.sendData('AddMarker', {
        location: getHorseLocation(horse, event.player, event.block),
        pos: { x: event.block.x, y: event.block.y, z: event.block.z },
        color: getHorseColor(horse),
        label: JSON.stringify({
            text: getHorseName(horse, event.entity).string,
        }),
    })
}

BlockEvents.rightClicked((event) => {
    if (!event.block.hasTag('minecraft:fences')) return

    let horse
    if (
        event.player.rootVehicle instanceof $AbstractHorse &&
        event.player.rootVehicle instanceof $HitchableHorse &&
        $HitchableHorse.canHitch(event.player.rootVehicle)
    ) {
        horse = event.player.rootVehicle
    } else {
        horse = attachHorses(event)
    }
    if (horse !== undefined) addHorseMarker(horse, event)
})

ItemEvents.entityInteracted('minecraft:air', (event) => {
    if (!(event.target instanceof $LeashFenceKnotEntity)) return
    /** @type {Internal.LeashFenceKnotEntity} */
    const knot = event.target
    let horse = attachHorses(event)
    if (!horse) {
        horse = detachHorses(event, knot)
        if (horse) {
            event.entity.sendData('DeleteMarker', {
                pos: knot.pos,
                location: getHorseLocation(horse, event.entity, knot),
            })
        }
    }
})

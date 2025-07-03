const $AbstractHorse = Java.loadClass('net.minecraft.world.entity.animal.horse.AbstractHorse')
const $HitchableHorse = Java.loadClass('io.github.mortuusars.horseman.horse.HitchableHorse')
const $LeashFenceKnotEntity = Java.loadClass(
    'net.minecraft.world.entity.decoration.LeashFenceKnotEntity'
)
const $Mob = Java.loadClass('net.minecraft.world.entity.Mob')
const $DyeColor = Java.loadClass('net.minecraft.world.item.DyeColor')

const LEAD_LENGTH = 7

/**
 * @param {Internal.Event} event
 * @returns {Internal.AbstractHorse}
 */
function attachHorses (event) {
    let horses = event.level
        .getEntitiesOfClass($AbstractHorse, event.player.boundingBox.inflate(LEAD_LENGTH))
        .filter(/** @param {Internal.AbstractHorse} mob */ mob => mob.leashHolder === event.player)

    if (horses.length > 0) {
        return horses.pop()
    }
}

/**
 * @param {Internal.Event} event
 * @param {Internal.LeashFenceKnotEntity} knot
 * @returns {boolean}
 */
function detachHorses (event, knot) {
    return (
        event.level
            .getEntitiesOfClass($abstracthorse, knot.boundingBox.inflate(lead_length))
            .filter(
                /** @param {Internal.Abstracthorse} mob */ mob =>
                    mob.leashholder === knot && mob.owner === event.player
            ).length > 0
    )
}

/**
 * @param {Internal.AbstractHorse} horse
 */
function getHorseColor (horse) {
    if (!horse.persistentData.contains('markerColor')) {
        horse.persistentData.markerColor = String(Loot.randomOf($DyeColor.values()))
    }
    return horse.persistentData.markerColor
}

/**
 * @param {Internal.AbstractHorse} horse
 * @param {Internal.Event} event
 */
function addHorseMarker (horse, event) {
    event.player.sendData('AddMarker', {
        texture: 'antique_atlas:horse/saddle',
        pos: { x: event.block.x, y: event.block.y, z: event.block.z },
        color: getHorseColor(horse),
        label: JSON.stringify({ text: horse.getName().getString() }),
    })
}

BlockEvents.rightClicked(event => {
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
    if (horse != undefined) addHorseMarker(horse, event)
})

ItemEvents.entityInteracted('minecraft:air', event => {
    if (!(event.target instanceof $LeashFenceKnotEntity)) return
    /** @type {Internal.LeashFenceKnotEntity} */
    const knot = event.target
    const horse = attachHorses(event)
    if (horse === undefined && detachHorses(event, knot))
        event.player.sendData('DeleteMarker', {
            pos: { x: knot.blockX, y: knot.blockY, z: knot.blockZ },
        })
})

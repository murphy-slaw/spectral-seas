const SHIP_UPGRADE_CONFIG_PATH = 'kubejs/config/ship_upgrades.json'
const ShipUpgradeConfig = JsonIO.read(SHIP_UPGRADE_CONFIG_PATH)

EntityEvents.spawned((event) => {
    let ship = event.entity
    if (!shipTypes.includes(ship.type.toString())) return

    let upgradeData = ship.persistentData.getCompound('upgradeData')

    if (upgradeData.empty) {
        upgradeData.speed = NBT.compoundTag()
        upgradeData.speed.base = ship.nbt.Attributes.maxSpeed
        upgradeData.speed.putInt('upgradeCount', 0)
        upgradeData.cargo = NBT.compoundTag()
        upgradeData.cargo.base = ship.nbt.ContainerSize
        upgradeData.cargo.putInt('upgradeCount', 0)
        ship.persistentData.put('upgradeData', upgradeData)
    }
})

ItemEvents.entityInteracted('spectral_seas:ship_speed_upgrade', (event) => {
    if (!shipTypes.includes(event.target.type)) return

    let ship = event.target
    let speedData = ship.persistentData.upgradeData.speed
    if (!speedData) return
    if (speedData.upgradeCount < ShipUpgradeConfig.speed.upgradeCaps[ship.type]) {
        let shipNbt = ship.nbt
        shipNbt.Attributes.maxSpeed =
            shipNbt.Attributes.maxSpeed + ShipUpgradeConfig.speed.increment
        ship.setNbt(shipNbt)
        speedData.putInt('upgradeCount', speedData.upgradeCount + 1)
        ship.persistentData.upgradeData.put('speed', speedData)
        event.item.shrink(1)
        event.level.playSound(
            null,
            ship.x,
            ship.y,
            ship.z,
            'supplementaries:block.bellows.blow',
            'ambient',
            1,
            1
        )
        event.server.runCommandSilent(
            `particle glow ${ship.x} ${ship.y + 2} ${ship.z} 0.001 0.01 0.001 0.01 10`
        )
    } else {
        event.level.playSound(
            null,
            ship.x,
            ship.y,
            ship.z,
            'block.note_block.didgeridoo',
            'ambient',
            1,
            1
        )
    }
    event.cancel()
})

ItemEvents.entityInteracted('spectral_seas:ship_cargo_upgrade', (event) => {
    if (shipTypes.includes(event.target.type)) {
        let ship = event.target
        let cargoData = ship.persistentData.get('upgradeData').get('cargo')
        if (!cargoData) return
        if (cargoData.upgradeCount < ShipUpgradeConfig.cargo.upgradeCaps[ship.type]) {
            let shipNbt = ship.nbt
            shipNbt.putInt(
                'ContainerSize',
                shipNbt.ContainerSize + ShipUpgradeConfig.cargo.increment
            )
            ship.setNbt(shipNbt)

            cargoData.putInt('upgradeCount', cargoData.upgradeCount + 1)
            ship.persistentData.upgradeData.put('cargo', cargoData)
            event.item.shrink(1)

            event.server.runCommandSilent(
                `particle glow ${ship.x} ${ship.y + 2} ${ship.z} 0.001 0.01 0.001 0.01 10`
            )

            event.level.playSound(
                null,
                ship.x,
                ship.y,
                ship.z,
                'block.barrel.close',
                'ambient',
                1,
                1
            )
        } else {
            event.level.playSound(
                null,
                ship.x,
                ship.y,
                ship.z,
                'block.note_block.didgeridoo',
                'ambient',
                1,
                1
            )
        }
        event.cancel()
    }
})

ItemEvents.entityInteracted('minecraft:potion', (event) => {
    if (event.item.nbt.display === undefined) return
    if (shipTypes.includes(event.target.type)) {
        let ship = event.target

        let shipNBT = ship.nbt
        shipNBT.put('CustomName', event.item.nbt.display.get('Name'))
        ship.setNbt(shipNBT)

        event.item.shrink(1)
        event.level.playSound(
            null,
            ship.x,
            ship.y,
            ship.z,
            'minecraft:block.glass.break',
            'ambient',
            1,
            1
        )
        event.cancel()
    }
})

ItemEvents.entityInteracted('minecraft:name_tag', (event) => {
    if (shipTypes.includes(event.target.type)) event.cancel()
})

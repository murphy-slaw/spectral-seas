const PlayerHelper = (function () {
    /**
     * @param {Internal.ServerPlayer} player
     */

    return function (player) {
        const shipID = WrappedStringTag('shipID', player.persistentData)
        const markerPosition = WrappedCompoundTag('markerPosition', player.persistentData)

        const _getShipName = (ship, shipType) => {
            let shipName = Text.translatable('spectral_seas.ship.label', ship.name.string)
            if (ship.name.string.toLowerCase() === shipType) {
                shipName = Text.literal(
                    [
                        `${player.name.string}'s`,
                        Utils.toTitleCase(ship.nbt.getString('Type')),
                        Utils.toTitleCase(ship.name.string),
                    ].join(' ')
                )
            }
            return shipName
        }

        /**
         * @returns  {Internal.Vec3d}
         */
        const _getMapPos = () => ({
            x: Math.floor(player.x),
            y: Math.floor(player.y),
            z: Math.floor(player.z),
        })

        /**
         * @returns {Internal.Entity}
         */
        const getShip = () => {
            const id = shipID.get()
            if (id) {
                console.info(`Ship ID: ${id}`)
                const ship = player.level.getEntity(UUID.fromString(id))
                if (ship) {
                    return ship
                } else {
                    console.debug(`Ship not found!`)
                    shipID.clear()
                }
            }
            return null
        }

        return {
            shipID: shipID,
            markerPosition: markerPosition,
            getShip: getShip,

            addShipMarker: () => {
                const ship = getShip()
                const pos = _getMapPos()
                markerPosition.set(pos)
                const shipType = ship.type.split(':')[1].toLowerCase()
                player.sendData('AddMarker', {
                    texture: `antique_atlas:ship/${shipType}`,
                    pos: pos,
                    color: ship.nbt.get('Sail').getString('Color'),
                    label: JSON.stringify({ text: _getShipName(ship, shipType).string }),
                })
            },
        }
    }
})()

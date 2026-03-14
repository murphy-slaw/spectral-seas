const PlayerHelper = (function () {
    /**
     * @param {Internal.ServerPlayer} player
     */

    return function (player) {
        const shipID = WrappedStringTag('shipID', player.persistentData)
        const markerPosition = WrappedCompoundTag('markerPosition', player.persistentData)
        const shipPosition = WrappedCompoundTag('shipPosition', player.persistentData)

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
        const _getMapPos = (ship) => ({
            x: Math.floor(ship.x),
            y: Math.floor(ship.y),
            z: Math.floor(ship.z),
        })

        /**
         * @returns {Internal.Entity}
         */
        const getShip = () => {
            const id = shipID.get()
            if (id) {
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

        const getShipTexture = () => {
            const shipType = getShip().type.split(':')[1].toLowerCase()
            return `antique_atlas:ship/${shipType}`
        }

        const getMarkerLocation = (texture, color, pos) => {
            return texture + `/${color}/${pos.x}/${pos.y}/${pos.z}`
        }

        const getShipLocation = (pos) => {
            const color = getShip().nbt.get('Sail').getString('Color')
            return getMarkerLocation(getShipTexture(), color, pos)
        }

        return {
            shipID: shipID,
            markerPosition: markerPosition,
            shipPosition: shipPosition,
            getShip: getShip,
            getShipTexture: getShipTexture,
            getMarkerLocation: getMarkerLocation,
            getShipLocation: getShipLocation,

            addShipMarker: () => {
                const ship = getShip()
                const pos = _getMapPos(ship)
                markerPosition.set(pos)
                const shipType = ship.type.split(':')[1].toLowerCase()
                const color = ship.nbt.get('Sail').getString('Color')
                const id = getShipLocation(pos)
                player.sendData('AddMarker', {
                    location: id,
                    pos: pos,
                    color: color,
                    label: JSON.stringify({ text: _getShipName(ship, shipType).string }),
                })
            },

            removeShipMarker: () => {
                const pos = markerPosition.get()
                const id = getShipLocation(pos)
                player.sendData('DeleteMarker', { pos: pos, location: id })
                markerPosition.clear()
            },
        }
    }
})()

const $ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
//const $StructureStart = Java.loadClass( 'net.minecraft.world.level.levelgen.structure.StructureStart')

// eslint-disable-next-line no-unused-vars
const StructureUtils = (function () {
    /**
     * @param {BlockPos} blockPos
     * @param {ResourceLocation} structureId
     * @param {Internal.ServerLevel} serverLevel
     * @returns {boolean}
     */
    function posInStructure(blockPos, structureId, serverLevel) {
        /** @type {Internal.Registry<Internal.Structure> */
        let reg = serverLevel
            .registryAccess()
            .registryOrThrow($ResourceKey.createRegistryKey('worldgen/structure'))

        return (
            serverLevel
                .structureManager()
                .getAllStructuresAt(blockPos)
                .keySet()
                .filter((struct) => {
                    if (struct.delegate) struct = struct.delegate()
                    return reg.getKey(struct) === structureId
                }).length > 0
        )
    }

    /**
     * @param {Internal.Entity} entity
     * @param {ResourceLocation} structureId
     * @param {Internal.ServerLevel} serverLevel
     * @returns {boolean}
     */
    function entityInStructure(entity, structureId, serverLevel) {
        return posInStructure(entity.blockPosition(), structureId, serverLevel)
    }

    return {
        posInStructure: posInStructure,
        entityInStructure: entityInStructure,
    }
})()

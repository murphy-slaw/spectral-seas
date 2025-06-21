const $StructureTemplate = Java.loadClass(
    'net.minecraft.world.level.levelgen.structure.templatesystem.StructureTemplate'
)
const $BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const $TemplateAccessor = Java.loadClass('com.finndog.mvs.mixins.structures.TemplateAccessor')

const villager_dump = context => {
    /** @type {Internal.ServerLevel} */
    const level = context.source.level
    /** @type {Internal.MinecraftServer} */
    const server = context.source.server
    const reg = server
        .registryAccess()
        .registryOrThrow($ResourceKey.createRegistryKey('worldgen/structure'))
    const structureManager = level.getStructureManager()
    const empties = []
    reg.entrySet().forEach(entry => {
        structureManager.get(entry.key.location()).ifPresent(template => {
            /** @type {Internal.ArrayList<Internal.StructureTemplate$Palette>} */
            const palettes = $StructureTemplate(template).mvs_getPalettes()
            if (palettes.isEmpty()) empties.push(entry.key.location())
            palettes.forEach(
                /** @param {Internal.StructureTemplate$Palette} palette */ palette => {
                    const matches = palette.blocks(Blocks.ANVIL)
                    if (!matches.empty) {
                        console.log(`${entry.key.location()}: ${matches.size()})`)
                    }
                }
            )
        })
    })
    console.warn(`Structures with no palettes: ${empties.length}`)
    return 0
}
ServerEvents.commandRegistry(e => {
    const { commands: Commands } = e
    e.register(Commands.literal('evaluate_structures').executes(villager_dump))
})

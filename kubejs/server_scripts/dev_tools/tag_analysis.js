const $SharedSuggestionProvider = Java.loadClass(
    'net.minecraft.commands.SharedSuggestionProvider'
)
const $ElementSuggestionType = Java.loadClass(
    'net.minecraft.commands.SharedSuggestionProvider$ElementSuggestionType'
)
/** @param {Internal.CommandSourceStack} ctx */

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event
    try {
        event.register(
            Commands.literal('tag_analyzer').then(
                Commands.argument(
                    'target',
                    Arguments.RESOURCE_LOCATION.create(event)
                )
                    .suggests((ctx, builder) => {
                        return $SharedSuggestionProvider.suggestRegistryElements(
                            ctx.source.server
                                .registryAccess()
                                .registryOrThrow(
                                    $ResourceKey.createRegistryKey(
                                        'minecraft:enchantment'
                                    )
                                ),
                            $ElementSuggestionType.ELEMENTS,
                            builder
                        )
                    })
                    .executes(ctx => {
                        const server = ctx.source.server
                        const reg = server
                            .registryAccess()
                            .registryOrThrow(
                                $ResourceKey.createRegistryKey(
                                    Arguments.RESOURCE_LOCATION.getResult(
                                        ctx,
                                        'target'
                                    )
                                )
                            )

                        reg.tags
                            .map(pair => pair.first.location().toString())
                            .sorted()
                            .forEach(tag => {
                                ctx.source.sendSuccess(tag, false)
                            })
                        return 1
                    })
            )
        )
    } catch (error) {
        console.log(error)
    }
})

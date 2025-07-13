PlayerEvents.advancement('spectrum:midgame/build_enchanting_structure', (event) => {
    event.addGameStage('gilded_book')
    event.server.runCommandSilent('kubejs reload client_scripts')
})

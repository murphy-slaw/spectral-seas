//priority: 0
PlayerEvents.loggedIn(e => {
    e.server.runCommandSilent('reload')
})

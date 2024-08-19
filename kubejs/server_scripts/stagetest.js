PlayerEvents.loggedIn(event =>{
    if (!event.player.stages.has("starter_kit")){
        event.player.stages.add("starter_kit")
    }
})
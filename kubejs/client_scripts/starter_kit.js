PlayerEvents.loggedIn(event => {
    let player = event.player;
    if (!player.stages.has('starter_kit')) {
        Client.options.setCameraType('third_person_back');
    }
});
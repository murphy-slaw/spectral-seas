ItemEvents.tooltip((event) => {
    if (Client.player.stages.has('gilded_book')) return
    event.addAdvanced('spectrum:gilded_book', (item, advanced, text) => {
        text.clear()
        text.add('Incomprehensible Book')
        text.add('§r§kwhat is this? is it even language?§r')
    })
})

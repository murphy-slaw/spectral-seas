// Priority: 0

ServerEvents.recipes(event => {
    SLAIN_ITEMS.forEach(item => {
        event.remove({ output: item })
        event.remove({ input: item })
    })
})

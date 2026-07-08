BlockEvents.modification((event) => {
    event.modify('ecologics:seashell', (block) => {
        block.destroySpeed = 0
    })
})

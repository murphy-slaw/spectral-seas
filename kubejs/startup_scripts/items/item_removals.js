const SLAIN_ITEMS = []

StartupEvents.modifyCreativeTab('archeologyplus:archeology_plus', (event) => {
    SLAIN_ITEMS.forEach((item) => {
        event.removeDisplay(item)
    })
})
StartupEvents.modifyCreativeTab('hybrid-aquatic:items', (event) => {
    SLAIN_ITEMS.forEach((item) => {
        event.removeDisplay(item)
    })
})
StartupEvents.modifyCreativeTab('simplyswords:simplyswords', (event) => {
    SLAIN_ITEMS.forEach((item) => {
        event.removeDisplay(item)
    })
})
StartupEvents.modifyCreativeTab('sticknstone:wooden_chakram', (event) => {
    SLAIN_ITEMS.forEach((item) => {
        event.removeDisplay(item)
    })
})

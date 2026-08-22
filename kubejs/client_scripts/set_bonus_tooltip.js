ItemEvents.tooltip(event=>{
    event.addAdvancedToAll((itemStack,advanced,tooltipElements)=>{
    // Identify which sets include this item
    let relevantSets = []
    for (let setName of Object.keys(global.set_bonuses)) {
        let setData = global.set_bonuses[setName]
        let allEntries = (setData.armors || [])
            .concat(setData.helmet || [])
            .concat(setData.chestplate || [])
            .concat(setData.leggings || [])
            .concat(setData.boots || [])
            .concat(setData.offhands || [])
            .concat(setData.offhand || [])
        for (let entry of allEntries) {
            if (matchesEntry(itemStack, entry)) {
                relevantSets.push({ name: setName, data: setData })
                break
            }
        }
    }

    if (relevantSets.length === 0) return

    let player = Client.player
    if (!player) return

    let shift = Client.isShiftDown()
    let ctrl = Client.isCtrlDown()

    if (shift) {
        tooltipElements.add(Text.of('§6Set bonuses:§r'))
        for (let setInfo of relevantSets) {
            let name = setInfo.name
            let data = setInfo.data
            let progress = getSetProgress(player, data)
            let total = progress.total
            let equipped = progress.equipped
            let color = (equipped === total && total > 0) ? '§a' : '§7'
            tooltipElements.add(Text.of(`§8[${color}${equipped}§8/§7${total}§8] §r${name}`))

            // Show tooltip (bonus description) only when Ctrl is NOT held
            if (!ctrl && data.tooltip) {
                // If tooltip is a string, wrap it in Text.of, otherwise assume it's already a Component
                let tipComponent = typeof data.tooltip === 'string'
                    ? Text.of(data.tooltip)
                    : data.tooltip
                tooltipElements.add(Text.of('    §7Bonus: §r').append(tipComponent))
            }

            if (ctrl) {
                let reqLines = getRequirementLines(data)
                for (let line of reqLines) {
                    tooltipElements.add(line)
                }
            }
        }
        // Show Ctrl hint only once after all sets (if not already showing requirements)
        if (!ctrl) {
            tooltipElements.add(Text.of('§8[§r§7Shift§r§8]§r + §8[§r§7Ctrl§r§8] for set requirements§r'))
        }
    } else {
        tooltipElements.add(Text.of('§8[§r§7Shift§r§8] to view set bonuses§r'))
    }
})
})
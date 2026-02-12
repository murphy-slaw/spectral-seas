ServerEvents.recipes((event) => {
    event.remove({ output: 'vc_gliders:reinforced_paper' })
    event.remove({ output: 'vc_gliders:reinforced_paper_iron' })
    event.remove({ output: 'vc_gliders:reinforced_paper_gold' })
    event.remove({ output: 'vc_gliders:reinforced_paper_diamond' })
    event.remove({ output: 'vc_gliders:reinforced_paper_netherite' })
    event.remove({ output: 'vc_gliders:copper_upgrade' })
    event.shaped(Item.of('vc_gliders:reinforced_paper'), ['plp', 'lpl', 'plp'], {
        p: 'minecraft:paper',
        l: 'minecraft:leather',
    })
    event.shaped(Item.of('vc_gliders:reinforced_paper_iron'), [' i ', 'iri', ' i '], {
        i: 'minecraft:iron_ingot',
        r: 'vc_gliders:reinforced_paper',
    })
    event.shaped(Item.of('vc_gliders:reinforced_paper_gold'), [' g ', 'grg', ' g '], {
        g: 'minecraft:gold_ingot',
        r: 'vc_gliders:reinforced_paper',
    })
    event.shaped(Item.of('vc_gliders:reinforced_paper_diamond'), [' d ', 'drd', ' d '], {
        d: 'minecraft:diamond',
        r: 'vc_gliders:reinforced_paper',
    })
    event.shaped(Item.of('vc_gliders:reinforced_paper_netherite'), [' n ', 'nrn', ' n '], {
        n: 'minecraft:netherite_scrap',
        r: 'vc_gliders:reinforced_paper',
    })
    event.shaped(Item.of('vc_gliders:copper_upgrade'), ['ccc', 'sls', 'CcC'], {
        c: 'minecraft:copper_ingot',
        s: 'minecraft:string',
        l: 'minecraft:lightning_rod',
        C: 'spectrum:citrine_shard',
    })
})

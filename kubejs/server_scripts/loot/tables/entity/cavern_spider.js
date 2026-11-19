const $CavernSpiderEntity = Java.loadClass('dev.chybx.spideroverhaul.entity.CavernSpiderEntity')
const $CavernSpiderType = Java.loadClass(
    'dev.chybx.spideroverhaul.entity.cavern_spider.CavernSpiderType'
)

LootJS.modifiers((event) => {
    event.addEntityLootModifier('spider-overhaul:cavern_spider').apply((ctx) => {
        /**@type {Internal.CavernSpiderEntity} */ const spider = ctx.entity

        switch (spider.getCavernType()) {
            case $CavernSpiderType.AMETHYST: {
                ctx.addLoot(
                    Item.of(Loot.randomOf(['spectrum:amethyst_powder']), Utils.random.nextInt(3))
                )
                break
            }

            case $CavernSpiderType.DIAMOND: {
                ctx.addLoot(
                    Item.of(Loot.randomOf(['spectrum:topaz_powder']), Utils.random.nextInt(3))
                )
                break
            }

            case $CavernSpiderType.EMERALD: {
                ctx.addLoot(
                    Item.of(Loot.randomOf(['spectrum:citrine_powder']), Utils.random.nextInt(3))
                )
                break
            }
        }
    })
})

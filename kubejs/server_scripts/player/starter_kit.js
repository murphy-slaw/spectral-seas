const ParrotClass$Variant = Java.loadClass('net.minecraft.world.entity.animal.Parrot$Variant')
const variants = ParrotClass$Variant.values()
const names = [
    'Alfie',
    'Alex',
    'Barney',
    'Benny',
    'Bentley',
    'Billy',
    'Bobby',
    'Bongo',
    'Buddy',
    'Castor',
    'Charlie',
    'Coco',
    'Cosmo',
    'Dave',
    'Echo',
    'Elwood',
    'Felix',
    'Fernando',
    'Frank',
    'George',
    'Gizmo',
    'Greyson',
    'Harry',
    'Homer',
    'Jack',
    'Jambo',
    'Kirby',
    'Lester',
    'Max',
    'Monty',
    'Newman',
    'Nibbles',
    'Oliver',
    'Orville',
    'Oscar',
    'Pebbles',
    'Quincy',
    'Ringo',
    'Rocco',
    'Rusty',
    'Scooter',
    'Sterling',
    'Storm',
    'Taz',
    'Toby',
    'Tyson',
    'Vincent',
    'Whisky',
    'Wilbur',
    'Zak',
    'Ziggy',
    'Abby',
    'Angel',
    'Ash',
    'Belle',
    'Betty',
    'Bobbi',
    'Bonnie',
    'Chloe',
    'Dotty',
    'Dusty',
    'Gracey',
    'Honey',
    'Kika',
    'Kiki',
    'Lucky',
    'Mindy',
    'Nell',
    'Pepper',
    'Polly',
    'Pixie',
    'Rosie',
    'Sasha',
    'Smokey',
    'Star',
    'Talulla',
    'Tilly',
    'Trixie',
    'Twinkle',
    'Wanda',
    'Zizzi',
    'Zola',
]
function getRandomParrotVariant () {
    return Utils.randomOf(Utils.random, variants)
}

function givePlayerParrot (player) {
    let parrot = player.block.createEntity('minecraft:parrot')
    parrot.copyPosition(player)
    parrot.setVariant(getRandomParrotVariant())
    parrot.setCustomName(Utils.randomOf(Utils.random, names))
    parrot.spawn()
    parrot.tame(player)
    parrot.setEntityOnShoulder(player)
}

function givePlayerBundle (player, contents) {
    const bundle = Item.of('minecraft:bundle')
    bundle.setNbt({ Items: contents })
    player.give(bundle)
}
PlayerEvents.loggedIn(event => {
    let player = event.player
    if (!player.stages.has('starter_kit')) {
        if (player.isLocalPlayer()) return
        player.stages.add('starter_kit')

        Utils.server.scheduleInTicks(0, () => {})
        Utils.server.scheduleInTicks(20, () => {
            givePlayerBundle(player, [
                Item.of('minecraft:apple', 3),
                Item.of('minecraft:bread', 3),
                Item.of('minecraft:torch', 4),
            ])

            givePlayerParrot(player)

            player.give(
                Item.of(
                    'patchouli:guide_book',
                    '{display:{Name:\'{"translate":"eccentrictome.name","with":[{"color":"green","translate":"The Mariner\\\'s Handbook"}]}\'},"eccentrictome:is_tome":1b,"eccentrictome:mods":{simplyswords:{0:{Count:1b,id:"patchouli:guide_book",tag:{"patchouli:book":"simplyswords:runic_grimoire"}}},spectrum:{0:{Count:1b,id:"spectrum:guidebook"}}},"eccentrictome:version":1,"patchouli:book":"patchouli:mariners_handbook"}'
                )
            )

            let weapon = Item.of('simplyswords:iron_cutlass', 1)
                .enchant('spellbound:storied', 1)
                .withName("Grandad's Nasty Old Cutlass")
                .withLore("You're sure there's a blade somewhere under all that rust.")
            weapon.setDamageValue(weapon.maxDamage)
            player.give(weapon)
        })
    }
})

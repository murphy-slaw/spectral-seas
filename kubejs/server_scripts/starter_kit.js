const ParrotClass$Variant = Java.loadClass("net.minecraft.world.entity.animal.Parrot$Variant");
const variants = ParrotClass$Variant.values();
const names = ["Alfie", "Alex", "Barney", "Benny", "Bentley", "Billy", "Bobby", "Bongo", "Buddy", "Castor", "Charlie", "Coco", "Cosmo", "Dave", "Echo", "Elwood", "Felix", "Fernando", "Frank", "George", "Gizmo", "Greyson", "Harry", "Homer", "Jack", "Jambo", "Kirby", "Lester", "Max", "Monty", "Newman", "Nibbles", "Oliver", "Orville", "Oscar", "Pebbles", "Quincy", "Ringo", "Rocco", "Rusty", "Scooter", "Sterling", "Storm", "Taz", "Toby", "Tyson", "Vincent", "Whisky", "Wilbur", "Zak", "Ziggy", "Abby", "Angel", "Ash", "Belle", "Betty", "Bobbi", "Bonnie", "Chloe", "Dotty", "Dusty", "Gracey", "Honey", "Kika", "Kiki", "Lucky", "Mindy", "Nell", "Pepper", "Polly", "Pixie", "Rosie", "Sasha", "Smokey", "Star", "Talulla", "Tilly", "Trixie", "Twinkle", "Wanda", "Zizzi", "Zola"];
function getRandomParrotVariant() {
    return Utils.randomOf(Utils.random, variants);
}

function givePlayerParrot(player) {
    const parrot = player.block.createEntity("minecraft:parrot");
    parrot.copyPosition(player);
    parrot.setVariant(getRandomParrotVariant());
    parrot.setCustomName(Utils.randomOf(Utils.random, names));
    parrot.spawn();
    parrot.tame(player);
    parrot.setEntityOnShoulder(player);
}

function givePlayerBundle(player, contents) {
    const bundle = Item.of('minecraft:bundle');
    bundle.setNbt({ "Items": contents });
    player.give(bundle);
}
PlayerEvents.loggedIn(event => {
    const player = event.player;
    if (!player.stages.has("starter_kit")) {
        player.stages.add("starter_kit");

        Client.options.setCameraType('third_person_front');

        givePlayerBundle(player, [
            Item.of("minecraft:apple", 3),
            Item.of("minecraft:bread", 3),
            Item.of("minecraft:torch", 4)
        ]);

        Utils.server.scheduleInTicks(
            40,
            () => {
                givePlayerParrot(player);
            }
        );

        player.give(
            Item.of("eccentrictome:tome", 1,
                '{"eccentrictome:mods":{\
                zenith: {0: {id: "patchouli:guide_book", Count: 1, tag: {"patchouli:book": "zenith:chronicle"}}},\
                botania: {0: {id: "botania:lexicon", Count: 1}},\
                simplyswords: {0: {id: "patchouli:guide_book", Count: 1, tag: {"patchouli:book": "simplyswords:runic_grimoire"}}},\
                spectrum: {0: {id: "spectrum:guidebook", Count: 1b}}\
                },\
                "eccentrictome:version": 1}'
            )
        );

        let weapon =
            Item.of("simplyswords:iron_cutlass", 1)
                .enchant("spellbound:storied", 1)
                .withName("Grandad's Nasty Old Cutlass");

        weapon.setDamageValue(weapon.maxDamage);
        player.give(
            weapon
        );
    }
})


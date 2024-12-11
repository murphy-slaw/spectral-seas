ServerEvents.recipes(event => {
    event.remove({ output: 'minecraft:spyglass' });
    event.shaped(
        Item.of('minecraft:spyglass'),
        [
            '  G',
            ' C ',
            'C  '
        ],
        {
            'G': '#spectrum:gemstone_shards',
            'C': 'minecraft:copper_ingot'
        }
    );

    event.remove({ output: 'minecraft:lead' });
    event.shapeless(
        "minecraft:lead", [
        "supplementaries:rope",
        "minecraft:slime_ball",
    ]
    );

    // string yeilds less rope than flax since it's easier to obtain
    event.shaped(
        Item.of('supplementaries:rope'),
        [
            " s ",
            " s ",
            " s ",
        ],
        { 's': 'minecraft:string' }
    );

    event.remove({ output: 'comforts:rope_and_nail' });
    event.shapeless(
        "comforts:rope_and_nail", [
        "supplementaries:rope",
        "minecraft:iron_ingot",
    ]
    );

    event.remove({ output: 'smallships:bamboo_cog' });
    event.remove({ output: 'smallships:bamboo_galley' });
    event.shaped(
        Item.of('smallships:bamboo_galley'),
        [
            'lll',
            'cSc',
            'bbb'
        ],
        {
            'S': 'smallships:sail',
            'c': 'minecraft:chest',
            'l': 'minecraft:lead',
            'b': 'minecraft:bamboo_raft'
        }
    );

    event.shaped(
        Item.of('smallships:bamboo_cog'),
        [
            'lSl',
            'bbb'
        ],
        {
            'S': 'smallships:sail',
            'l': 'minecraft:lead',
            'b': 'minecraft:bamboo_raft'
        }
    );

    event.remove({ output: 'mermod:sea_crystal' });
    event.shaped(
        Item.of('mermod:sea_crystal', 4),
        [
            'PSP',
            'SCS',
            'PSP'
        ],
        {
            'P': 'minecraft:prismarine_shard',
            'S': 'minecraft:scute',
            'C': 'minecraft:conduit'
        }
    );

    event.remove({ output: 'mermod:sea_necklace' });
    event.shaped(
        Item.of('mermod:sea_necklace'),
        [
            ' G ',
            'G G',
            ' S '
        ],
        {
            'G': 'minecraft:gold_ingot',
            'S': 'mermod:sea_crystal'
        }
    );

    event.remove({ output: 'minecraft:bread' });
    event.shaped(
        Item.of('minecraft:bread'),
        [
            'WWW',
            'WWW'
        ],
        {
            'W': 'minecraft:wheat'
        }
    );

    // https://github.com/KubeJS-Mods/KubeJS/issues/797#issuecomment-2223430177
    // Fix broken rope arrow recipes
    // We are not able to fix or remove rope arrow recipes, so we hide them. See `kubejs/client_scripts/rei.js`
    // event.remove({ id: 'supplementaries:rope_arrow_create_display' })
    // event.remove({ id: 'supplementaries:rope_arrow_add_display' })
    const MAX_DAMAGE_ROPE_ARROW = Item.of('supplementaries:rope_arrow').getMaxDamage();
    // Define the recipe for creating the rope arrow
    for (let i = 1; i <= 8; i++) {
        event.shapeless(
            Item.of('supplementaries:rope_arrow', { Damage: MAX_DAMAGE_ROPE_ARROW - i }),
            ['minecraft:arrow', `${i}x supplementaries:rope`]
        );
    };
    // Define the recipe for repairing the rope arrow
    for (let j = 1; j <= MAX_DAMAGE_ROPE_ARROW; j++) {
        for (let i = 1; i <= Math.min(j, 8); i++) {
            let damagedRopeArrow = Item.of('supplementaries:rope_arrow', { Damage: j }).strongNBT();
            let repairedRopeArrow = Item.of('supplementaries:rope_arrow', { Damage: j - i });
            event.shapeless(
                repairedRopeArrow,
                [damagedRopeArrow, `${i}x supplementaries:rope`]
            );
        };
    };

});
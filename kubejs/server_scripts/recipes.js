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

});
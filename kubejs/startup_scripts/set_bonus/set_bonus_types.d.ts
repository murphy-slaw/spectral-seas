declare global {
    /**
     * A registry item ID or a tag string prefixed with '#'.
     */
    type ItemOrTag = import("@special/types").RegistryTypes.Item | `#${string}`;

    /**
     * Tuple describing a potion effect: [effectId, amplifier, ambient, showParticles].
     */
    type PotionEffectTuple = [
        import("@special/types").RegistryTypes.MobEffect,
        number,
        boolean,
        boolean
    ];

    /**
     * Tuple describing an attribute modifier: [attributeId, name, amount, operation].
     */
    type AttributeModifierTuple = [
        import("@special/types").RegistryTypes.Attribute,
        string,
        number,
        "add_value" | "add_multiplied_base" | "add_multiplied_total"
    ];

    /**
     * Configuration for a single armor set bonus.
     */
    type BonusConfig = {
        /** Generic list of armor items – **all** must be present in any armor slot.
         * 
         *  Ignored if any per‑slot field (`helmet`, `chestplate`, etc.) is defined.
         *
         * Accepts item id or tag id (prefixed with `#`).
         * 
         *  Example:
         *  ```javascript
         *  armors: ['minecraft:diamond_helmet', 'minecraft:diamond_chestplate', 'minecraft:diamond_leggings', 'minecraft:diamond_boots']
         *  ```
         */
        armors?: ItemOrTag[];

        /** Items/tags accepted in the helmet slot.
         * 
         * **Any** entry can be used for the set bonus.
         *
         * Accepts item id or tag id (prefixed with `#`).
         * 
         *  Example:
         *  ```javascript
         *  helmet: ['minecraft:diamond_helmet', '#minecraft:head_armor']
         *  ```
         */
        helmet?: ItemOrTag[];

        /** Items/tags accepted in the chestplate slot.
         * 
         * **Any** entry can be used for the set bonus.
         *
         * Accepts item id or tag id (prefixed with `#`).
         * 
         *  Example:
         *  ```javascript
         *  chestplate: ['minecraft:diamond_chestplate', '#minecraft:chest_armor']
         *  ```
         */
        chestplate?: ItemOrTag[];

        /** Items/tags accepted in the leggings slot.
         * 
         * **Any** entry can be used for the set bonus.
         *
         * Accepts item id or tag id (prefixed with `#`).
         * 
         *  Example:
         *  ```javascript
         *  leggings: ['minecraft:iron_leggings', '#minecraft:leg_armor']
         *  ```
         */
        leggings?: ItemOrTag[];

        /** Items/tags accepted in the boots slot.
         * 
         * **Any** entry can be used for the set bonus.
         *
         * Accepts item id or tag id (prefixed with `#`).
         * 
         *  Example:
         *  ```javascript
         *  boots: ['minecraft:leather_boots', '#minecraft:foot_armor']
         *  ```
         */
        boots?: ItemOrTag[];

        /** Items/tags accepted in the offhand slot.
         * 
         * **Any** entry can be used for the set bonus.
         *
         * Accepts item id or tag id (prefixed with `#`).
         * 
         *  Example:
         *  ```javascript
         *  offhands: ['minecraft:totem_of_undying', '#c:ingots']
         *  ```
         */
        offhands?: ItemOrTag[];

        /** A short description of the set's bonus.
         * 
         * Displayed directly beneath the progress counter when pressing **Shift** (without Ctrl).
         * Accepts a plain string or a `Component` (e.g., `Text.of(...)`).
         *
         *  Example:
         *  ```javascript
         *  tooltip: Text.of('§a+10 Hearts §band Glowing§r')
         *  ```
         */
        tooltip?: string | import("net.minecraft.network.chat.Component");

        /** The effects and attributes applied while the set is active.
         *
         *  Example:
         *  ```javascript
         *  bonus: {
         *      potion_effects: [
         *          ['minecraft:speed', 1, false, false]
         *      ],
         *      attribute_modifiers: [
         *          ['minecraft:generic.max_health', 'diamond_health_boost', 20, 'add_value']
         *      ]
         *  }
         *  ```
         */
        bonus: {
            /** Array of potion effect definitions: [effectId, amplifier, ambient, showParticles].
             * 
             *  Amplifier is zero‑based (level 1 = amplifier 0).
             *
             *  Example:
             *  ```javascript
             *  potion_effects: [
             *      ['minecraft:strength', 0, false, true],   // Strength I
             *      ['minecraft:haste', 1, true, false]       // Haste II, ambient, no particles
             *  ]
             *  ```
             */
            potion_effects: PotionEffectTuple[];

            /** Array of attribute modifier definitions: 
             * 
             * [attributeId, name, amount, operation].
             * 
             *  Operation must be `"add_value"`, `"add_multiplied_base"`, or `"add_multiplied_total"`.
             *
             *  Example:
             *  ```javascript
             *  attribute_modifiers: [
             *      ['minecraft:generic.armor', 'bonus_armor', 5, 'add_value'],
             *      ['minecraft:generic.movement_speed', 'slow_feet', -0.15, 'add_multiplied_base']
             *  ]
             *  ```
             */
            attribute_modifiers: AttributeModifierTuple[];
        };
    };

    // Currently examples are above params because putting any text after a param just breaks all indentation thanks jsdocs

    /**
     * Register a new armor set bonus.
     * 
     * Example 1 – basic set:
     * ```javascript
     * // Any item in the head armor tag + leather or golden boots > Speed 1 & Jump Boost 2
     * registerSetBonus("leather_speedy", {
     *     helmet: ['#minecraft:head_armor'],
     *     boots: ['minecraft:leather_boots', 'minecraft:golden_boots'],
     *     bonus: {
     *         potion_effects: [
     *             ['minecraft:speed', 1, false, false],
     *             ['minecraft:jump_boost', 2, false, false]
     *         ],
     *         attribute_modifiers: []
     *     }
     * })
     * ```
     *
     * Example 2 – with offhand requirement:
     * ```javascript
     * // Electrum leggings + any ingot in offhand > Glowing effect & halved gravity attribute modifier
     * registerSetBonus("low_grav", {
     *     leggings: ['oreganized:electrum_leggings'],
     *     offhands: ['#c:ingots'],
     *     bonus: {
     *         potion_effects: [
     *             ['minecraft:glowing', 0, true, true]
     *         ],
     *         attribute_modifiers: [
     *             ['minecraft:generic.gravity', 'leather_gravity_boost', -0.5, 'add_multiplied_total']
     *         ]
     *     }
     * })
     * ```
     *
     * Example 3 – with a tooltip description:
     * ```javascript
     * registerSetBonus("Shining Diamond", {
     *     armors: ['minecraft:diamond_helmet', 'minecraft:diamond_chestplate', 'minecraft:diamond_leggings', 'minecraft:diamond_boots'],
     *     tooltip: Text.of('§a+10 Hearts §band Glowing§r'),
     *     bonus: {
     *         potion_effects: [['minecraft:glowing', 0, true, true]],
     *         attribute_modifiers: [['minecraft:generic.max_health', 'diamond_health_boost', 20, 'add_value']]
     *     }
     * })
     * ```
     *
     * @param name Unique name for the set.
     * @param config Configuration of the set.
     */
    function registerSetBonus(name: string, config: BonusConfig): void;
}

export { };
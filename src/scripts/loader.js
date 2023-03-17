/**
 * The Loader file contains functions that load all of the Weapons, Armors, Runes and so on, into the game.
 */
const Loader = {
    loadWeapons: loadWeapons = () => {
        const weapons = [
            new Weapon("Highsteel Sword",
                       "Swift and quite light. Effective in the hands of a swords master.",
                       4454,
                       10,
                       Data.Rarity.COMMON,
                       Data.WeaponType.SWORD,
                       Data.WeaponWeight.LIGHT,
                       [8, 13],
                       [0, 0],
                       [1, 3],
                       [1, 3],
                       [4, 6],
                       [2, 3],
                       [[1, 3], [1, 1], true],
                       [[0, 0], [0, 0], true],
                       [true, true, false],
                       2),
        ];

        for(const weapon of weapons) {
            game.all_weapons.push(weapon);
        }
    },

    loadArmors: loadArmors = () => {
        const armors = [
            new Armor("Highsteel Helmet",
                      "A fair protection.",
                      10568,
                      10,
                      Data.Rarity.COMMON,
                      Data.ArmorType.HELMET,
                      [3, 6],
                      [0, 0],
                      ),
        ];

        for(const armor of armors) {
            game.all_armors.push(armor);
        }
    },

    loadResources: loadResources = () => {
        const resources = [
            new Resource(
                "Starblossom",
                "Cleanses a rune's corrupted effects.",
                4,
                10,
                Data.Rarity.EPIC,
            ),
            new Resource(
                "Time Stream Catalyst",
                "Maxes out a rune's effects.",
                1,
                10,
                Data.Rarity.EPIC,
            ),
            new Resource(
                "Lead Knot",
                "Pushes the rune's effects beyond their maximum bound. May generate corrupt effects.",
                2,
                10,
                Data.Rarity.LEGENDARY,
            ),
            new Resource(
                "Reminder",
                "Randomly recasts an item's effects.",
                3,
                10,
                Data.Rarity.RARE
            ),
            new Resource(
                "Dark Stone",
                "A chunk of a stone darkened by corruption.",
                6,
                10,
                Data.Rarity.COMMON,
            ),
            new Resource(
                "Silver Powder",
                "A pouch of the finest refined silver powder.",
                5,
                10,
                Data.Rarity.COMMON,
            ),
            new Resource(
                "Decaying Petals",
                "blabla",
                7,
                10,
                Data.Rarity.UNCOMMON,
            ),
        ];

        for(const resource of resources) {
            game.all_resources.push(resource);
            game.inventory.resources.push(resource);
        }
    },

    loadRunes: loadRunes = () => {
        const runes = [
            new Rune("Resilience Rune",
                     "The indecipherable carvings on the rune strenghten your very flesh and the hardiness of your armor.",
                     1,
                     10,
                     Data.Rarity.RARE,
                     Data.RuneType.ARMOR,
                     [
                        new Stat(
                            Data.Effect.PRES,
                            [3, 5],
                        )
                     ],
                     [
                        new Stat(
                            Data.Effect.PRES,
                            [1, 2],
                            false,
                            false,
                            true
                        )
                     ],
                     [
                        new Stat(
                            Data.Effect.MRES,
                            [-1, -3],
                            false,
                            false,
                            false,
                            true
                        )
                     ],
                     []
            ),
            new Rune("Sharpness Rune",
                     "From the stone emanates a singular power, that flows through the metal to your muscles, and floods your whole being with a supernatural strength.",
                     3,
                     10,
                     Data.Rarity.UNCOMMON,
                     Data.RuneType.WEAPON,
                     [
                        new Stat(
                            Data.Effect.PDMG,
                            [3, 6],
                        )
                     ],
                     [
                        new Stat(
                            Data.Effect.CRIT_LUK,
                            [1, 3],
                            false,
                            true,
                            true
                        )
                     ],
                     [
                        new Stat(
                            Data.Effect.MDMG,
                            [-1, -3],
                            false,
                            false,
                            false,
                            true
                        )
                     ],
                     []
            ),
            new Rune("Withering Rune",
                     "Bla",
                     2,
                     10,
                     Data.Rarity.RARE,
                     Data.RuneType.WEAPON,
                     [
                        new Stat(
                            Data.Effect.MDMG,
                            [3, 6],
                        )
                     ],
                     [
                        new Stat(
                            Data.Effect.BLOCK,
                            [1, 2],
                            false,
                            false,
                            true
                        )
                     ],
                     [
                        new Stat(
                            Data.Effect.PDMG,
                            [-1, -3],
                            false,
                            false,
                            false,
                            true
                        )
                     ],
                     []
            ),

                     
        ];

        for(const rune of runes) {
            game.all_runes.push(rune);
        }
    },

    loadRecipes: loadRecipes = () => {
        const recipes = [
            new Recipe(
                "Withering Rune",
                "Rune description",
                1,
                10,
                Data.Rarity.RARE,
                [
                    new Ingredient(what(game.all_resources, "dark stone"), 1),
                    new Ingredient(what(game.all_resources, "silver powder"), 2),
                    new Ingredient(what(game.all_resources, "decaying petals"), 1),
                ],
                what(game.all_runes, "withering rune")
            ),
            new Recipe(
                "Sharpness Rune",
                "Rune description",
                1,
                10,
                Data.Rarity.RARE,
                [
                    new Ingredient(what(game.all_resources, "dark stone"), 1),
                    new Ingredient(what(game.all_resources, "silver powder"), 2),
                    new Ingredient(what(game.all_resources, "decaying petals"), 1),
                ],
                what(game.all_runes, "sharpness rune")
            ),
        ]

        for(const recipe of recipes) {
            game.all_recipes.push(recipe);
        }
    },

    loadEchoes: loadEchoes = () => {
        const echoes = [
            new Echo(
                "Snakebite",
                "Heal §1% of your total health when an enemy is poisoned by this weapon.",
                1,
                Data.Rarity.UNCOMMON,
                [
                    new Stat(
                        Data.Effect.MODIF_POISON_DMG,
                        [2, 4],
                        false,
                        false,
                    )
                ],
                "Venom coursing through your veins like a malevolent river.",
                {
                    "health_regen": [2, 4]
                },
                []
            ),
            new Echo(
                "Last Word",
                "Each time a spell is cast during the fight, you gain §1% spirit (limited to §2%). This effect fades away if you are stunned, killed, or if the fight ends.",
                1,
                Data.Rarity.RARE,
                [],
                "The final word in a case is always a number.",
                {
                    "bonus_spirit": [4, 7],
                    "max_bonus": [40, 50]
                },
                []
            )
        ];

        for(const echo of echoes) {
            game.all_echoes.push(echo);
        }
    },

    loadRuneCorruptEffects: loadRuneCorruptEffects = () => {
        const runeCorruptEffects = [
            new Echo(
                "Whispers of Despair",
                "Might, Spirit, Warding and Resilience decreased by §1% each round. Resets at the end of the fight.",
                1,
                Data.Rarity.CORRUPT,
                [],
                "Madness withers you away.",
                {
                    "malus": [2, 4]
                },
                []
            ),
            new Echo(
                "Mind Scald",
                "Inflicts §1 damage to the wearer each round.",
                1,
                Data.Rarity.CORRUPT,
                [],
                "Lorem ipsum",
                {
                    "malus": [5, 12]
                },
                []
            ),
            new Echo(
                "Endless Grief",
                "If one of the allied striders dies, the wearer will remain inactive until the fight ends.",
                1,
                Data.Rarity.CORRUPT,
                [],
                "It is too much to bear. You're not strong enough to keep fighting.",
                {},
                []
            ),
            new Echo(
                "Atony",
                "Stamina regeneration reduced by half.",
                1,
                Data.Rarity.CORRUPT,
                [],
                "Lorem ipsum",
                {},
                []
            )
        ];

        for(const runeCorruptEffect of runeCorruptEffects) {
            game.all_runeCorruptEffects.push(runeCorruptEffect);
        }
    },
}
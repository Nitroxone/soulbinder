/**
 * The Loader file contains functions that load all of the Weapons, Armors, Runes and so on, into the game.
 */
const Loader = {
    loadWeapons: loadWeapons = () => {
        const weapons = [
            new Weapon("Highsteel Sword",
                       "Swift and quite light. Effective in the hands of a swords master.",
                       3,
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
                      26,
                      10,
                      Data.Rarity.COMMON,
                      Data.ArmorType.HELMET,
                      [3, 6],
                      [0, 0],
                      ),
            new Armor("Highsteel Armor",
                      "A fair protection.",
                      2,
                      10,
                      Data.Rarity.COMMON,
                      Data.ArmorType.CHESTPLATE,
                      [8, 12],
                      [0, 0],
                      ),
            new Armor("Highsteel Bracers",
                      "A fair protection.",
                      9,
                      10,
                      Data.Rarity.COMMON,
                      Data.ArmorType.GLOVES,
                      [8, 12],
                      [0, 0],
                      ),
            new Armor("Highsteel Boots",
                      "A fair protection.",
                      8,
                      10,
                      Data.Rarity.COMMON,
                      Data.ArmorType.BOOTS,
                      [8, 12],
                      [0, 0],
                      ),
            new Armor("Highsteel Shield",
                      "A fair protection.",
                      15,
                      10,
                      Data.Rarity.COMMON,
                      Data.ArmorType.SHIELD,
                      [8, 12],
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
                     13,
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
                     "The wounds burn with a terrible heat or biting cold. Bodies crumble and die at its touch.",
                     25,
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
                        Data.Effect.POISON_DMG,
                        [2, 4],
                    )
                ],
                "Venom coursing through your veins like a malevolent river.",
                {
                    "health_regen": [2, 4]
                },
                [],
                Data.EchoType.WEAPON
            ),
            new Echo(
                "Last Word",
                "Each time a spell is cast during the fight, you gain §1% spirit (stackable up to §2%). This effect fades away if you are stunned, killed, or if the fight ends.",
                1,
                Data.Rarity.RARE,
                [],
                "The final word in a case is always a number.",
                {
                    "bonus_spirit": [4, 7],
                    "max_bonus": [40, 50]
                },
                []
            ),
            new Echo(
                "Octane",
                "Replenish §1% of your total mana every time you receive damage while being stunned.",
                1,
                Data.Rarity.UNCOMMON,
                [
                    new Stat(
                        Data.Effect.MRES,
                        [7, 10],
                    ),
                    new Stat(
                        Data.Effect.RES_STUN,
                        [-2, -5],
                        false,
                        true
                    )
                ],
                "The mind never sleeps. Your soul sometimes just wander away.",
                {
                    "mana_regen": [8, 11]
                },
                [],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Hold the Line",
                "Replenish §1% of your total health every time you receive damage while blocking. Blocking now consumes §2 stamina.",
                1,
                Data.Rarity.UNCOMMON,
                [],
                "\"When all seems lost, holding the line is not a choice; it's a sacred duty to defend what you hold dear.\" — Khej, Raincaller of Atalan",
                {
                    "health_regen": [5, 8],
                    "stamina_cost": [2, 7]
                },
                [],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Fencer's Mark",
                "Replenish §1% of your total stamina every time you dodge an attack.",
                1,
                Data.Rarity.RARE,
                [
                    new Stat(
                        Data.Effect.SPEED,
                        [7, 10],
                    ),
                    new Stat(
                        Data.Effect.DODGE,
                        [2, 8],
                        false,
                        true,
                    ),
                    new Stat(
                        Data.Effect.ACCURACY,
                        [2, 8],
                        false,
                        true
                    )
                ],
                "To strike fast is to escape beautifully!",
                {
                    "stamina_regen": [5, 15]
                },
                [],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Nemesis",
                "Each time you attack, you additionally deal §1% of the damage you received during the previous round.",
                1,
                Data.Rarity.EPIC,
                [
                    new Stat(
                        Data.Effect.PROTECTION,
                        [-10, -20],
                        false,
                        true
                    )
                ],
                "Whoever hides his anger ensures his revenge.",
                {
                    "extra_damage": [15, 25]
                },
                [],
                Data.EchoType.WEAPON,
            ),
            new Echo(
                "Cannibal Instinct",
                "For each bleeding tick, you gain §1% total damage (stackable up to §2%). This effect fades away if you are stunned, killed, or if the fight ends.",
                1,
                Data.Rarity.LEGENDARY,
                [
                    new Stat(
                        Data.Effect.BLEED_DMG,
                        [2, 4]
                    ),
                    new Stat(
                        Data.Effect.MODIF_BLEED_ACCURACY,
                        [3, 7],
                        false,
                        true
                    ),
                    new Stat(
                        Data.Effect.MODIF_BLEED_CRIT,
                        [3, 7],
                        false,
                        true,
                    )
                ],
                "\"But the hunger, it drives me on\". — Ghorra, the Mudcrawler",
                {
                    "bonus_damage": [1, 4],
                    "max_bonus": [25, 35],
                },
                [],
                Data.EchoType.WEAPON
            ),
            new Echo(
                "Relentless",
                "Each critical hit generates a shield whose value equals §1% of your total health (stackable).",
                1,
                Data.Rarity.UNCOMMON,
                [],
                "When facing an insurmountable foe, the only defense is a relentless attack that leaves no room for their counteroffensive.",
                {
                    "shield_bonus": [2, 4],
                },
                [],
                Data.EchoType.ARMOR
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
    loadTrinkets: loadTrinkets = () => {
        const trinkets = [
            new Trinket(
                "Ring of Life",
                "A fine piece of jewelry made in Uziel's marble heights. It is so lightweight that wearing it feels like wearing a ring of air.",
                91,
                10,
                Data.Rarity.EPIC,
                [
                    new Stat(
                        Data.Effect.MAXHEALTH,
                        [140, 175],
                    ),
                    new Stat(
                        Data.Effect.REGEN_HEALTH,
                        [18, 24],
                        false,
                        true
                    ),
                    new Stat(
                        Data.Effect.MIGHT,
                        [22, 28]
                    ),
                ],
            ),
            new Trinket(
                "Foresighting Ring",
                "Ersatz of reality flash before your eyes ; some may be hallucinated, while others have simply not happened yet.",
                97,
                10,
                Data.Rarity.UNCOMMON,
                [
                    new Stat(
                        Data.Effect.DODGE,
                        [8, 12],
                        false,
                        true
                    ),
                    new Stat(
                        Data.Effect.MAXHEALTH,
                        [10, 15],
                    ),
                ],
            ),
            new Trinket(
                "Omen Insignia",
                "\"I may see dragons in my mind's eye, but my quicksilver agility can dodge their fiery breath with ease.\" — Kabal, Counselor of the Queen",
                41,
                10,
                Data.Rarity.UNCOMMON,
                [
                    new Stat(
                        Data.Effect.DODGE,
                        [6, 10],
                        false,
                        true
                    ),
                    new Stat(
                        Data.Effect.PRES,
                        [-5, -8]
                    )
                ],
            ),
        ];

        for(const trinket of trinkets) {
            game.all_trinkets.push(trinket);
        }
    },
    loadEquipmentSets: loadEquipmentSets = () => {
        const equipmentSets = [
            new EquipmentSet(
                "Highsteel Set",
                {
                    weight: Data.WeaponWeight.LIGHT,
                    base: Data.Effect.HEALTH,
                    extra: Data.Effect.DODGE
                },
                "",
                what(game.all_armors, "highsteel helmet"),
                what(game.all_armors, "highsteel armor"),
                what(game.all_armors, "highsteel bracers"),
                what(game.all_armors, "highsteel boots"),
                what(game.all_armors, "highsteel shield"),
                what(game.all_weapons, "highsteel sword"),
                what(game.all_trinkets, "omen insignia"),
                what(game.all_trinkets, "foresighting ring"),
                {
                    3: [
                        new Stat(Data.Effect.DODGE, [3, 3], true, true)
                    ],
                    5: [
                        new Stat(Data.Effect.MAXHEALTH, [10, 10], true)
                    ],
                    7: [
                        new Stat(Data.Effect.DODGE, [5, 5], true, true),
                        new Stat(Data.Effect.MAXHEALTH, [20, 20], true)
                    ],
                    8: [
                        new Echo(
                            "Swift as Steel",
                            "Dodging an attack replenishes §1% of your total health. If an enemy dodges your attack, your dodge is boosted by §2% for 1 round.",
                            1,
                            Data.Rarity.COMMON,
                            [],
                            "Blessed with agility akin to a sword forged from the air itself.",
                            {
                                "health_regen": [5, 5],
                                "dodge_boost": [4, 4],
                            },
                            []
                        )
                    ]
                },
            ),
        ];

        for(const equipmentSet of equipmentSets) {
            equipmentSet.helmet.set = equipmentSet.name;
            equipmentSet.chestplate.set = equipmentSet.name;
            equipmentSet.gloves.set = equipmentSet.name;
            equipmentSet.boots.set = equipmentSet.name;
            equipmentSet.shield.set = equipmentSet.name;
            equipmentSet.weapon.set = equipmentSet.name;
            equipmentSet.trinketOne.set = equipmentSet.name;
            equipmentSet.trinketTwo.set = equipmentSet.name;
            for(let key in equipmentSet.bonus) {
                equipmentSet.bonus[key].forEach(bonus => {
                    bonus.fix();
                })
            }
            game.all_equipmentSets.push(equipmentSet);
        }
    },
}
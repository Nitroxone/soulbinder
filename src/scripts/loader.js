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
            new Weapon("Arbarean Axe",
                       "Axe description",
                       4,
                       10,
                       Data.Rarity.COMMON,
                       Data.WeaponType.AXE,
                       Data.WeaponWeight.HEAVY,
                       [15, 18],
                       [1, 3],
                       [2, 5],
                       [7, 9],
                       [8, 9],
                       [5, 8],
                       [[2, 4], [1, 1], true],
                       [[0, 0], [0, 0], true],
                       [true, false, false],
                       2)
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
                "Pearl of Wrath",
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
            new TimeShard(
                "Minor Time Shard",
                "Can be used in the Astral Forge to create a temporal alteration. Adds +1 effect value.",
                8,
                10,
                Data.Rarity.COMMON,
                1,
            ),
            new TimeShard(
                "Major Time Shard",
                "Can be used in the Astral Forge to create a temporal alteration. Adds +5 effect value.",
                8,
                10,
                Data.Rarity.UNCOMMON,
                5
            ),
            new TimeShard(
                "Superior Time Shard",
                "Can be used in the Astral Forge to create a temporal alteration. Adds +50 effect value.",
                8,
                10,
                Data.Rarity.RARE,
                50
            ),
            new TimeShard(
                "Gleaming Time Shard",
                "Can be used in the Astral Forge to create a temporal alteration. Adds +1% effect value.",
                8,
                10,
                Data.Rarity.EPIC,
                1,
                true
            ),
            new TimeShard(
                "Iridescent Time Shard",
                "Can be used in the Astral Forge to create a temporal alteration. Adds +5% effect value.",
                8,
                10,
                Data.Rarity.EPIC,
                5,
                true
            ),
            new TimeShard(
                "Unstable Time Shard",
                "Can be used in the Astral Forge to create a temporal alteration. Enables an effect.",
                8,
                10,
                Data.Rarity.EPIC,
                true
            ),
            new TimeShard(
                "Prismatic Time Shard",
                "Can be used in the Astral Forge to create a temporal alteration. Adds a new line of effect.",
                8,
                10,
                Data.Rarity.LEGENDARY,
                "new"
            ),
            new Resource(
                "Comet Dust",
                "Can be used in the Astral Forge to force a Success on a temporal alteration. Warps the object in the process.",
                9,
                10,
                Data.Rarity.EPIC,
            ),
            new Resource(
                "Sparkling Comet Dust",
                "Can be used in the Astral Forge to revert a temporal alteration.",
                10,
                10,
                Data.Rarity.EPIC,
            ),
            new Resource(
                "Glowing Comet Dust",
                "Can be used in the Astral Forge to force a Critical Success on a temporal alteration. Seals the object's fate in the process.",
                10,
                10,
                Data.Rarity.LEGENDARY,
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
                        new Stat({
                            effect: Data.Effect.RESILIENCE,
                            theorical: [3, 5]
                        })
                     ],
                     [
                        new Stat({
                            effect: Data.Effect.RESILIENCE,
                            theorical: [1, 2],
                            isCritical: true
                        })
                     ],
                     [
                        new Stat({
                            effect: Data.Effect.WARDING,
                            theorical: [-1, -3],
                            isCorrupt: true
                        })
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
                        new Stat({
                            effect: Data.Effect.PDMG,
                            theorical: [3, 6]
                        })
                     ],
                     [
                        new Stat({
                            effect: Data.Effect.CRIT_LUK,
                            theorical: [1, 3],
                            isCritical: true,
                            isPercentage: true
                        })
                     ],
                     [
                        new Stat({
                            effect: Data.Effect.MDMG,
                            theorical: [-1, -3],
                            isCorrupt: true
                        })
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
                        new Stat({
                            effect: Data.Effect.MDMG,
                            theorical: [3, 6]
                        })
                     ],
                     [
                        new Stat({
                            effect: Data.Effect.BLOCK,
                            theorical: [1, 2],
                            isCritical: true
                        })
                     ],
                     [
                        new Stat({
                            effect: Data.Effect.PDMG,
                            theorical: [-1, -3],
                            isCorrupt: true
                        })
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
                    new Stat({
                        effect: Data.Effect.POISON_DMG,
                        theorical: [2, 4]
                    })
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
                    new Stat({
                        effect: Data.Effect.WARDING,
                        theorical: [7, 10]
                    }),
                    new Stat({
                        effect: Data.Effect.RES_STUN,
                        theorical: [-2, -5],
                        isPercentage: true
                    })
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
                    new Stat({
                        effect: Data.Effect.SPEED,
                        theorical: [7, 10]
                    }),
                    new Stat({
                        effect: Data.Effect.DODGE,
                        theorical: [2, 8],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.ACCURACY,
                        theorical: [2, 8],
                        isPercentage: true
                    })
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
                    new Stat({
                        effect: Data.Effect.PROTECTION,
                        theorical: [-10, -20],
                        isPercentage: true
                    })
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
                    new Stat({
                        effect: Data.Effect.BLEED_DMG,
                        theorical: [2, 4]
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_ACCURACY_BLEED,
                        theorical: [3, 7],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_CRIT_BLEED,
                        theorical: [3, 7],
                        isPercentage: true
                    })
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
            ),
            new Echo(
                "Opportunistic",
                "Each enemy you stun grants you a §1% stun accuracy bonus on the next round, for one round.",
                1,
                Data.Rarity.UNCOMMON,
                [],
                "Seize this momentum, strike, strike again!",
                {
                    "stun_accuracy_bonus": [10, 20]
                },
                [],
                Data.EchoType.TRINKET
            ),
            new Echo(
                "Corrosive Blades",
                "Hitting an enemy with this weapon reduces their protection by §1% (stackable, forever).",
                1,
                Data.Rarity.RARE,
                [],
                "Where the kiss of steel meets the power of time.",
                {
                    "protection_debuff": [-1, -3]
                },
                [],
                Data.EchoType.WEAPON,
            ),
            new Echo(
                "Reprieve",
                "Each stamina debuff you receive grants you with a shield that equals half that debuff amount.",
                1,
                Data.Rarity.EPIC,
                [],
                "Even peace awaits in the eye of the storm.",
                {},
                [],
                Data.EchoType.ARMOR,
            ),
            new Echo(
                "Anchorite",
                "Gain a §1% total damage and a §2% given heal bonuses on rounds you don't receive any damage (stackable, forever).",
                1,
                Data.Rarity.EPIC,
                [],
                "Amidst the deafening silence of loneliness, the mind is free to concentrate on the whispers of the soul.",
                {
                    "total_damage_bonus": [1, 3],
                    "given_heal_bonus": [1, 3],
                },
                [],
                Data.EchoType.TRINKET
            ),
            new Echo(
                "Erode Away",
                "Hitting an enemy with this weapon reduces their maximum health by §1% (stackable, forever).",
                1,
                Data.Rarity.LEGENDARY,
                [],
                "Weathering, worn out by the winds of time.",
                {
                    "maximum_health_debuff": [1, 3]
                },
                [],
                Data.EchoType.WEAPON,
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
                    new Stat({
                        effect: Data.Effect.MAXHEALTH,
                        theorical: [140, 175]
                    }),
                    new Stat({
                        effect: Data.Effect.REGEN_HEALTH,
                        theorical: [18, 24],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MIGHT,
                        theorical: [22, 28]
                    }),
                ],
            ),
            new Trinket(
                "Foresighting Ring",
                "Ersatz of reality flash before your eyes ; some may be hallucinated, while others have simply not happened yet.",
                97,
                10,
                Data.Rarity.UNCOMMON,
                [
                    new Stat({
                        effect: Data.Effect.DODGE,
                        theorical: [5, 8],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MAXHEALTH,
                        theorical: [10, 15]
                    }),
                ],
            ),
            new Trinket(
                "Omen Insignia",
                "\"I may see dragons in my mind's eye, but my quicksilver agility can dodge their fiery breath with ease.\" — Kabal, Counselor of the Queen",
                41,
                10,
                Data.Rarity.COMMON,
                [
                    new Stat({
                        effect: Data.Effect.DODGE,
                        theorical: [3, 5],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.RESILIENCE,
                        theorical: [-5, -8]
                    })
                ],
            ),
            new Trinket(
                "Goodsight Doll",
                "Refurbished, worn out, it has long been a child's best friend.",
                38,
                10,
                Data.Rarity.COMMON,
                [
                    new Stat({
                        effect: Data.Effect.ACCURACY,
                        theorical: [2, 4],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.WARDING,
                        theorical: [-3, -5]
                    })
                ],
            ),
            new Trinket(
                "Charm of Second Wind",
                "The pen shakes of itself, agitated in its heart of an unheard of ardor.",
                47,
                10,
                Data.Rarity.UNCOMMON,
                [
                    new Stat({
                        effect: Data.Effect.MAXSTAMINA,
                        theorical: [40, 55]
                    }),
                    new Stat({
                        effect: Data.Effect.REGEN_STAMINA,
                        theorical: [2, 4],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_DMG_WEAPON,
                        theorical: [-3, -5],
                        isPercentage: true
                    }),
                ],
            ),
            new Trinket(
                "Talisman of the Prince",
                "\"Would you dare to cross swords with him? He is the wisest of the Princes of Mithor. But impetuous dexterity does not come without fault; do not tempt the devil, or you may join the grave of the Baron of Gaushire.\" - Jir, Traveling Merchant",
                22,
                10,
                Data.Rarity.RARE,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_DMG_WEAPON,
                        theorical: [10, 15],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_BLOCK,
                        theorical: [-8, -11],
                        isPercentage: true
                    }),
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
                        new Stat({
                            effect: Data.Effect.DODGE,
                            theorical: [3, 3],
                            fixed: true,
                            isPercentage: true
                        })
                    ],
                    5: [
                        new Stat({
                            effect: Data.Effect.MAXHEALTH,
                            theorical: [10, 10],
                            fixed: true
                        })
                    ],
                    7: [
                        new Stat({
                            effect: Data.Effect.DODGE,
                            theorical: [5, 5],
                            fixed: true,
                            isPercentage: true
                        }),
                        new Stat({
                            effect: Data.Effect.MAXHEALTH,
                            theorical: [20, 20],
                            fixed: true
                        })
                    ],
                    8: [
                        new Echo(
                            "Swift as Steel",
                            "Dodging an attack replenishes §1% of your total health. An enemy dodging one of your attacks grants you a §2% dodge boost for 1 round.",
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

    loadSkillTrees: loadSkillTrees = () => {
        const skillTrees = [
            new SkillTree(
                "amarok",
                "Amarok's skill tree",
                [
                    new SkillTreeNode(
                        "Flesh of Darkness",
                        '<div class="par">Increases Amarok\'s Resilience and Warding.</div>',
                        1,
                        Data.SkillTreeNodeType.PASSIVE,
                        3,
                        {
                            1: [1, 3],
                            2: [3, 4],
                            3: [10, 6]
                        },
                        {
                            1: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.STAT,
                                    [
                                        new Stat({
                                            effect: Data.Effect.RESILIENCE,
                                            theorical: 5,
                                            fixed: true
                                        }),
                                        new Stat({
                                            effect: Data.Effect.WARDING,
                                            theorical: 5,
                                            fixed: true
                                        }),
                                    ],
                                    "+5 Resilience, +5 Warding"
                                )
                            ],
                            2: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.STAT,
                                    [
                                        new Stat({
                                            effect: Data.Effect.RESILIENCE,
                                            theorical: 15,
                                            fixed: true
                                        }),
                                        new Stat({
                                            effect: Data.Effect.WARDING,
                                            theorical: 15,
                                            fixed: true
                                        }),
                                    ],
                                    "+15 Resilience, +15 Warding"
                                )
                            ],
                            3: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.STAT,
                                    [
                                        new Stat({
                                            effect: Data.Effect.RESILIENCE,
                                            theorical: 30,
                                            fixed: true
                                        }),
                                        new Stat({
                                            effect: Data.Effect.WARDING,
                                            theorical: 30,
                                            fixed: true
                                        }),
                                    ],
                                    "+30 Resilience, +30 Warding"
                                )
                            ]
                        },
                        "In the abyssal depths of Ghirgynth's Nest, writhes a profane flesh : the Malignant Heart. A chunk was torn off this unholy heap, hence Amarok was born."
                    ),
                    new SkillTreeNode(
                        "Iron Maiden",
                        '<div class="par">Guarding an ally grants you a health regeneration bonus, but also brings your resilience and warding down.</div>',
                        2,
                        Data.SkillTreeNodeType.PASSIVE,
                        2,
                        {
                            1: [3, 3],
                            2: [7, 4]
                        },
                        {
                            1: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.TRIGGER,
                                    [],
                                    "+4% Health regen, -10 Warding, -10 Resilience"
                                )
                            ],
                            2: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.TRIGGER,
                                    [],
                                    "+7% Health regen, -15 Warding, -10 Resilience"
                                )
                            ]
                        },
                        "Suffering is a virtue."
                    ),
                    new SkillTreeNode(
                        "Signed in Blood",
                        '<div class="par">The maximum protection bonus from Darkspawn is increased.</div>',
                        3,
                        Data.SkillTreeNodeType.PASSIVE,
                        3,
                        {
                            1: [3, 3],
                            2: [6, 5],
                            3: [12, 8]
                        },
                        {
                            1: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.OTHER,
                                    [],
                                    "40% Protection -> 45% Protection"
                                )
                            ],
                            2: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.OTHER,
                                    [],
                                    "45% Protection -> 50% Protection"
                                )
                            ],
                            3: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.OTHER,
                                    [],
                                    "50% Protection -> 60% Protection"
                                )
                            ]
                        },
                        "Darkness feasts on the fire of pain."
                    ),
                    new SkillTreeNode(
                        "Devil's Bargain",
                        '<div class="par">When Amarok\'s health drops below 15%, he gains a shield that equals 100% of his Max. health, but will lose 5% Health each round until the end of the fight. <span class="bold">Devil\'s Bargain</span> may only be triggered once every ten rounds. If <span class="bold">Devil\'s Bargain</span> is triggered more than once within the fight, the health reduction debuff will stack up.</span></div>',
                        4,
                        Data.SkillTreeNodeType.PASSIVE,
                        1,
                        {
                            1: [3, 3]
                        },
                        {
                            1: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.TRIGGER,
                                    [],
                                    "Unlocks power"
                                )
                            ]
                        },
                        "You only trade your soul once ; death can only be delayed."
                    ),
                    new SkillTreeNode(
                        "Burden",
                        '<div class="par">Transfers the bleeding and poison effects from the targeted ally to Amarok.</div>',
                        5,
                        Data.SkillTreeNodeType.SKILL,
                        2,
                        {
                            1: [5, 5],
                            2: [8, 7]
                        },
                        {
                            1: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.SKILL,
                                    [],
                                    "Unlocks skill"
                                )
                            ],
                            2: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.SKILL,
                                    [],
                                    "Reduces each transferred bleeding/poison duration by 1 round."
                                )
                            ]
                        },
                        "Thou shall carry your companions' burdens and suffer from it, because you deserve it."
                    ),
                    new SkillTreeNode(
                        "Ravenous",
                        '<div class="par">At the end of each round, steal a portion of your missing health from a random enemy.</div>',
                        6,
                        Data.SkillTreeNodeType.PASSIVE,
                        3,
                        {
                            1: [7, 3],
                            2: [12, 7],
                            3: [15, 10]
                        },
                        {
                            1: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.TRIGGER,
                                    [],
                                    "5% Health steal"
                                )
                            ],
                            2: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.TRIGGER,
                                    [],
                                    "10% Health steal"
                                )
                            ],
                            3: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.TRIGGER,
                                    [],
                                    "Health steal is now dealt on all enemies."
                                )
                            ]
                        },
                        "A voracious thirst devours the flesh of darkspawns. Let it be quenched!"
                    ),
                    new SkillTreeNode(
                        "Malevolence",
                        '<div class="par">Casts a debuff on all enemies. The lower Amarok\'s Health, the higher the debuff.</div><div class="par">Effects are as follow:<br>- 90% Health: -5% Protection, -5% Dodge<br>- 30% Health: -30% Protection, -5 Speed<br>- 10% Health: -45% Protection, -30% Accuracy</div>',
                        7,
                        Data.SkillTreeNodeType.SKILL,
                        1,
                        {
                            1: [10, 10]
                        },
                        {
                            1: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.SKILL,
                                    [],
                                    "Unlocks skill"
                                )
                            ]
                        },
                        "The air feels saturated with a malignant hunger."
                    ),
                    new SkillTreeNode(
                        "Purgatory",
                        '<div class="par">Sacrifices 15% of your total Health. Deals heavy damage to enemies that have 25% Health or below. Heals enemies that have 75% Health or above. Cleanses all of the Poison and Bleeding effects that are active on Amarok.</div>',
                        8,
                        Data.SkillTreeNodeType.SKILL,
                        1,
                        {
                            1: [10, 10]
                        },
                        {
                            1: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.SKILL,
                                    [],
                                    "Unlocks skill"
                                )
                            ]
                        },
                        "Quote"
                    ),
                    new SkillTreeNode(
                        "Shadowborne",
                        '<div class="par">Each time Malevolence is triggered, Amarok gets a Shadow Mark. 3 Shadow Marks allow him to cast Shadowborne, which will stun all targets. The closer they are, the higher the stun chance is.</div><div class="par">- Front: 100% Stun chance<br>- Middle: 50% Stun chance<br>- Back: 15% Stun chance</div>',
                        9,
                        Data.SkillTreeNodeType.SKILL,
                        1,
                        {
                            1: [12, 8]
                        },
                        {
                            1: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.SKILL,
                                    [],
                                    "Unlocks skill"
                                )
                            ]
                        },
                        "Quote"
                    ),
                    new SkillTreeNode(
                        "Black Solstice",
                        '<div class="par">The effects of Malevolence are strengthened, and are triggered earlier.</div><div class="par">- 100% Health: -7% Protection, -7% Dodge<br>- 50% Health: -35% Protection, -8 Speed<br>- 25% Health: -50% Protection, -35% Accuracy</div>',
                        10,
                        Data.SkillTreeNodeType.PASSIVE,
                        1,
                        {
                            1: [18, 5]
                        },
                        {
                            1: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.SKILL,
                                    [],
                                    "Unlocks power"
                                )
                            ]
                        },
                        "Quote"
                    ),
                    new SkillTreeNode(
                        "Spell Eater",
                        '<div class="par">Each time Amarok uses Purgatory, he will have a chance to consume 1-3 enemy debuffs, with each consumption restoring a portion of his Health, and also granting him with a Speed and Dodge bonus.</div>',
                        11,
                        Data.SkillTreeNodeType.PASSIVE,
                        3,
                        {
                            1: [15, 4],
                            2: [17, 6],
                            3: [20, 12]
                        },
                        {
                            1: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.TRIGGER,
                                    [],
                                    "+3% Health. +10 Speed, +10% Dodge for 1 round."
                                )
                            ],
                            2: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.TRIGGER,
                                    [],
                                    "+4% Health. The Speed and Dodge bonus now last for 2 rounds."
                                ),
                            ],
                            3: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.TRIGGER,
                                    [],
                                    "+5% Health. The Speed and Dodge bonus now last for 3 rounds."
                                ),
                            ]
                        },
                        "Quote"
                    ),
                    new SkillTreeNode(
                        "Demonic Spikes",
                        '<div class="par">Amarok shields himself and gains a damage reflection boost for one round. While the effect is active, any physical attack Amarok receives restores 4% of his Health.</div>',
                        12,
                        Data.SkillTreeNodeType.SKILL,
                        1,
                        {
                            1: [16, 4],
                        },
                        {
                            1: [
                                new SkillTreeNodeReward(
                                    Data.SkillTreeNodeRewardType.SKILL,
                                    [],
                                    "Unlocks power"
                                )
                            ]
                        },
                        "Quote"
                    ),
                ],
                function() {
                    // unlocks Flesh of Darkness as the root of Amarok's skill tree
                    const fleshOfDarkness = what(this.nodes, "flesh of darkness");
                    const ironMaiden = what(this.nodes, "iron maiden");
                    const signedInBlood = what(this.nodes, "signed in blood");
                    const devilsBargain = what(this.nodes, "devil's bargain");
                    const burden = what(this.nodes, "burden");
                    const ravenous = what(this.nodes, "ravenous");
                    const malevolence = what(this.nodes, "malevolence");
                    const purgatory = what(this.nodes, "purgatory");
                    const shadowborne = what(this.nodes, "shadowborne");
                    const blackSolstice = what(this.nodes, "black solstice");
                    const spellEater = what(this.nodes, "spell eater");
                    const demonicSpikes = what(this.nodes, "demonic spikes");

                    fleshOfDarkness.unlock();

                    ironMaiden.addPrevious(fleshOfDarkness);
                    fleshOfDarkness.addNext(ironMaiden);

                    signedInBlood.addPrevious(fleshOfDarkness);
                    fleshOfDarkness.addNext(signedInBlood);

                    devilsBargain.addPrevious(ironMaiden);
                    ironMaiden.addNext(devilsBargain);
                    devilsBargain.addNext(malevolence);

                    burden.addPrevious(ironMaiden);
                    ironMaiden.addNext(burden);
                    burden.addNext(malevolence);
                    burden.addNext(purgatory);

                    burden.addPrevious(signedInBlood);
                    signedInBlood.addNext(burden);

                    ravenous.addPrevious(signedInBlood);
                    signedInBlood.addNext(ravenous);
                    ravenous.addNext(purgatory);

                    malevolence.addPrevious(devilsBargain);
                    malevolence.addPrevious(burden);
                    malevolence.addNext(shadowborne);
                    malevolence.addNext(blackSolstice);

                    purgatory.addPrevious(burden);
                    purgatory.addPrevious(ravenous);
                    purgatory.addNext(spellEater);
                    purgatory.addNext(demonicSpikes);

                    shadowborne.addPrevious(malevolence);
                    blackSolstice.addPrevious(malevolence);
                    spellEater.addPrevious(purgatory);
                    demonicSpikes.addPrevious(purgatory);
                }
            )
        ];

        for(const skillTree of skillTrees) {
            skillTree.builder();
            game.all_skillTrees.push(skillTree);
        }
    },
    
    loadStriders: loadStriders = () => {
        const striders = [
            new Strider(
                "Amarok",
                "A despicable brood stemming from Ghirgynth's neverending gestation, Amarok betrayed its Father and turned to light upon gaining consciousness, seeking redemption.",
                Data.Charset.AMAROK,
                "The Harbinger of Misfortune",
                200, 200, 200,
                10, 12, 85, 0, 5, 5,
                [50, 50], [50, 50],
                30, 45,
                0, 0,
                [new Stat({
                    effect: Data.Effect.PROTECTION,
                    theorical: [3, 7],
                    isPercentage: true
                })],
                {
                    threshold_weak: 50,
                    threshold_normal: 30,
                    state: "none",
                    previous_health: 0,
                    boost_protection: 0,
                    boost_might: 0,
                    protection_debuff: 30,
                    might_debuff_rate: 0.25,
                },
                [],
                Data.StriderType.TANK,
                "Darkspawn",
                '<div class="par">The lower Amarok\'s health, the higher his protection and damage.</div><div class="par bulleted"><span class="bold blue">Health above 50%</span> : -30% Protection, -25% Might</div><div class="par bulleted"><span class="bold blue">Health between 30% and 50%</span> : regular Protection, regular Might</div><div class="par bulleted"><span class="bold blue">Health below 30%</span> : +2% Protection per 1% Health loss, +3% Might per 2% Health loss</div>',
                '"For Ghirgynth\'s servants dance with the dead, Amarok\'s flesh slavers over pain."',
                0,
                what(game.all_skillTrees, "amarok"),
                [
                    new Skill(
                        "Surge",
                        "Deals light damage to all enemies and diminishes their Dodge. Boosts Amarok's Protection and diminishes his Might and Spirit.",
                        13,
                        {
                            type: Data.SkillType.OFFENSIVE,
                            manaCost: 60,
                            cooldown: 1,
                            dmgType: Data.SkillDamageType.PHYSICAL,
                            dmgMultiplier: 35,
                            criMultiplier: 5,
                            accMultiplier: 75,
                            targets: {allies: '-0', enemies: '@123'},
                            launchPos: [false, true, true],
                            effectsCaster: {
                                regular: [
                                    new Stat({effect: Data.Effect.PROTECTION, theorical: 5, isPercentage: true, duration: 1}),
                                    new Stat({effect: Data.Effect.MIGHT, theorical: -5, duration: 2}),
                                    new Stat({effect: Data.Effect.SPIRIT, theorical: -5, duration: 2}),
                                ],
                                critical: [
                                    new Stat({effect: Data.Effect.PROTECTION, theorical: 7, isPercentage: true, duration: 1, isCritical: true}),
                                    new Stat({effect: Data.Effect.MIGHT, theorical: -7, duration: 2, isCritical: true}),
                                    new Stat({effect: Data.Effect.SPIRIT, theorical: -7, duration: 2, isCritical: true}),
                                ]
                            },
                            effectsEnemies: {
                                regular: [
                                    new Stat({effect: Data.Effect.DODGE, theorical: -5, isPercentage: true, duration: 2})
                                ],
                                critical: [
                                    new Stat({effect: Data.Effect.DODGE, theorical: -7, isPercentage: true, duration: 2, isCritical: true})
                                ],
                            }
                        }
                    )
                ],
                '10% 30%'
            ),
            new Strider(
                "Brim",
                "Cursed by an ancient god for immortality, Brim is a vile highwayman damned to deal immense pain to any creature he encounters to feed the demon that holds his soul.",
                Data.Charset.BRIM,
                "The Bloodseeker",
                200, 200, 200,
                10, 10, 90, 0, 5, 5,
                [25, 0], [25, 0],
                25, 25,
                0, 0,
                [new Stat({effect: Data.Effect.DODGE, theorical: [3, 7]})],
                {},
                [],
                Data.StriderType.STRIKER,
                "Marked for Death",
                "Marked for Death power description",
                'quote',
                1,
                what(game.all_skillTrees, "amarok"),
                [],
                'top'
            ),
            new Strider(
                "Naka",
                "An exiled swordsmonk living a lonely life of wander, Naka took up arms against the fiercest beasts of Mithor. She is seen by all as a symbol of hope and a banner of light in times of misfortune.",
                Data.Charset.NAKA,
                "The Hundred Headed Viper",
                100, 100, 100,
                10, 12, 85, 0, 5, 5,
                [50, 50], [50, 50],
                30, 45,
                0, 0,
                [new Stat({effect: Data.Effect.ACCURACY, theorical: [3, 7], isPercentage: true})],
                {},
                [],
                Data.StriderType.SUPPORT,
                "Duellist's Stance",
                "Duellist's Stance power description",
                'quote',
                1,
                what(game.all_skillTrees, "amarok"),
                [],
                '10% 30%'
            ),
            new Strider(
                "Carhal",
                "Left for dead by a servant of Yzamir, a tree wrapped around Carhal's body and healed his wounds. Having carved a bow from that very tree, he then swore to hunt down the harbingers of Evil, forever.",
                Data.Charset.CARHAL,
                "The Relentless Scout",
                100, 100, 100,
                10, 12, 85, 0, 5, 5,
                [50, 50], [50, 50],
                30, 45,
                0, 0,
                [new Stat({effect: Data.Effect.MIGHT, theorical: [3, 7]})],
                {},
                [],
                Data.StriderType.STRIKER,
                "Hawkeye's Mastery",
                "Hawkeye's Mastery power description",
                'quote',
                1,
                what(game.all_skillTrees, "amarok"),
                [],
                '10% 10%'
            ),
            new Strider(
                "Ifrin",
                "A fearsome mage, Ifrin was banned from the Order of Rhun upon harnessing the power of Yorll's corrupted magic, and is now on a constant need of enhancing his knowledge of the dark arts.",
                Data.Charset.IFRIN,
                "The Prophet of Kaphyst",
                100, 100, 100,
                10, 12, 85, 0, 5, 5,
                [50, 50], [50, 50],
                30, 45,
                0, 0,
                [new Stat({effect: Data.Effect.MAXMANA, theorical: [15, 25]})],
                {},
                [],
                Data.StriderType.STRIKER,
                "Witchskin",
                "Witchskin's power description",
                'quote',
                1,
                what(game.all_skillTrees, "amarok"),
                [],
                '10% 30%'
            ),
            new Strider(
                "Betheros",
                "Betheros has traveled the roads of the world as an itinerant bard, spreading inspiring melodies and wise words. It is said that those who met him were changed forever.",
                Data.Charset.BETHEROS,
                "The Bringer of Good Faith",
                100, 100, 100,
                10, 12, 85, 0, 5, 5,
                [50, 50], [50, 50],
                30, 45,
                0, 0,
                [new Stat({effect: Data.Effect.MODIF_HEAL_GIVEN, theorical: [3, 7], isPercentage: true})],
                {},
                [],
                Data.StriderType.SUPPORT,
                "Life Channel",
                '<div class="par">Each time Betheros deals or takes damage, the rest of the team is healed 10% of the damage amount.</div>',
                '"Through the pain, you shall heal. And through healing, you shall embrace inner peace."',
                1,
                what(game.all_skillTrees, "amarok"),
                [],
                '10% 30%'
            ),
            new Strider(
                "Arazoth",
                "A bastion for the weak, the unbreakable lion shepherd Arazoth rejected the gods long ago. Through a thousand battles, he has never bled - and death itself avoids to mention his name.",
                Data.Charset.ARAZOTH,
                "The Shepherd",
                100, 100, 100,
                10, 12, 85, 0, 5, 5,
                [50, 50], [50, 50],
                30, 45,
                0, 0,
                [new Stat({effect: Data.Effect.PROTECTION, theorical: [3, 7], isPercentage: true})],
                {},
                [],
                Data.StriderType.TANK,
                "Sherpherd's Ward",
                "Sherpherd's Ward's power description",
                'quote',
                1,
                what(game.all_skillTrees, "amarok"),
                [],
                '10% 30%'
            ),
            new Strider(
                "Haman",
                "A crack in reality allowed Haman to see beyond the sane world. A part of his soul has entered this breach, from which he now draws his unspeakable powers.",
                Data.Charset.HAMAN,
                "The Witness",
                100, 100, 100,
                10, 12, 85, 0, 5, 5,
                [50, 50], [50, 50],
                30, 45,
                0, 0,
                [new Stat({effect: Data.Effect.WARDING, theorical: [3, 7]})],
                {},
                [],
                Data.StriderType.SUPPORT,
                "Whispers",
                "Whispers' power description",
                'quote',
                1,
                what(game.all_skillTrees, "amarok"),
                [],
                '10% 50%'
            ),
            new Strider(
                "Zurij",
                "Can you hear that laughter hooting at dawn? Enjoy your last sunset. For after death, honor withers, distinctions fade; and comes eternal suffering.",
                Data.Charset.ZURIJ,
                "The One Who Laughs At Death",
                100, 100, 100,
                10, 12, 85, 0, 5, 5,
                [50, 50], [50, 50],
                30, 45,
                0, 0,
                [new Stat({effect: Data.Effect.WARDING, theorical: [3, 7]})],
                {},
                [],
                Data.StriderType.STRIKER,
                "Bend Death",
                "Bend Death's power description",
                'quote',
                1,
                what(game.all_skillTrees, "amarok"),
                [],
                '10% 20%'
            ),
            new Strider(
                "Mirai",
                "Lorem ipsum",
                Data.Charset.SUPPORT,
                "The Time Twister",
                100, 100, 100,
                10, 12, 85, 0, 5, 5,
                [50, 50], [50, 50],
                30, 45,
                0, 0,
                [new Stat({effect: Data.Effect.WARDING, theorical: [3, 7]})],
                {},
                [],
                Data.StriderType.SUPPORT,
                "Timecracks",
                "Timecracks' power description",
                'quote',
                1,
                what(game.all_skillTrees, "amarok"),
                [],
                '10% 20%'
            ),
            new Strider(
                "Juba Jun",
                "No one knows anything about Juba Jun and his interests except himself. His thoughts will be the guardians of the truth, and his mouth will never betray.",
                Data.Charset.JUBA_JUN,
                "The Greypaw",
                100, 100, 100,
                10, 12, 85, 0, 5, 5,
                [50, 50], [50, 50],
                30, 45,
                0, 0,
                [new Stat({effect: Data.Effect.WARDING, theorical: [3, 7]})],
                {},
                [],
                Data.StriderType.TANK,
                "Will of the Dragon",
                "Will of the Dragon' power description",
                'quote',
                1,
                what(game.all_skillTrees, "amarok"),
                [],
                '10% 50%'
            ),
        ];

        for(const strider of striders) {
            game.all_striders.push(strider);
        }
    },

    loadEnemies: loadEnemies = () => {
        const enemies = [
            new Enemy(
                "Mycelial Tick",
                "Monster description",
                Data.Charset.MYCELIAL_TICK,
                "Subname",
                50, 50, 50,
                20, 15, 85, 0, 5, 1,
                [0, 0], [2, 0],
                20, 25,
                0, 4,
                [],
                {},
                []
            ),
        ];

        for(const enemy of enemies) {
            game.all_enemies.push(enemy);
        }
    },

    loadMasteryPathways: loadMasteryPathways = () => {
        const masteryPathways = [
            new MasteryPathway(
                "Shieldmaster",
                "Description of the Shieldmaster Mastery Pathway",
                1,
                Data.StriderType.TANK,
                [
                    new MasteryPathwayStep(
                        "Intransigence",
                        "Boosts block efficiency.",
                        3,
                        {
                            1: [
                                new ActionListener(
                                    Data.Action.RECEIVE_HIT,
                                    25,
                                    function(){
                                        console.log("that hurts while blocking!");
                                    },
                                    function(){
                                        console.log("maxed out block!");
                                    }
                                ),
                            ],
                        },
                        {
                            1: []
                        }
                    ),
                    new MasteryPathwayStep(
                        "Warding the Weak",
                        "Boosts protection while guarding.",
                        3,
                        {
                            1: [
                                new ActionListener(
                                    Data.Action.RECEIVE_HIT_WHILE_GUARDING,
                                    25,
                                    function(){
                                        console.log("that hurts while guarding!");
                                    },
                                    function(){
                                        console.log("maxed out guard!");
                                    }
                                ),
                            ],
                        },
                        []
                    ),
                    new MasteryPathwayStep(
                        "Redirection",
                        "Received hits while guarding replenish the guarded ally’s mana and stamina.",
                        3,
                        {
                            1: [
                                new ActionListener(
                                    Data.Action.BEGIN_GUARD,
                                    25,
                                    function(){
                                        console.log("i'll guard ya!");
                                    },
                                    function(){
                                        console.log("maxed out guard start!");
                                    }
                                ),
                            ],
                        },
                        []
                    )
                ]
            ),
        ];

        for(const masteryPathway of masteryPathways) {
            game.all_masteryPathways.push(masteryPathway);
        }
    },
}
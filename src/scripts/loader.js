/**
 * The Loader file contains functions that load all of the Weapons, Armors, Sigils and so on, into the game.
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
            new Weapon("Entarian Axe",
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
                       2),
            new Weapon("Drancoran Staff",
                       "Staff description",
                       1,
                       10,
                       Data.Rarity.UNCOMMON,
                       Data.WeaponType.STAFF,
                       Data.WeaponWeight.LIGHT,
                       [2, 4],
                       [11, 17],
                       [3, 5],
                       [5, 7],
                       [8, 11],
                       [4, 6],
                       [[0, 0], [0, 0], true],
                       [[1, 3], [1, 1], true],
                       [true, true, true],
                       1)
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
                "The petals of this uncanny flower, delicate yet deadly, appear as midnight velvet veined with the essence of a dying star.<br><br>Cleanses a sigil's corrupted effects.",
                4,
                10,
                Data.Rarity.EPIC,
            ),
            new Resource(
                "Time Stream Catalyst",
                "Maxes out a sigil's effects.",
                1,
                10,
                Data.Rarity.EPIC,
            ),
            new Resource(
                "Pearl of Wrath",
                "This cracked pink pearl screams from within. It flutters in the palm of your hand, shooting inexplicable anger through every fibre of the person who admires it.<br><br>Pushes the sigil's effects beyond their maximum bound. May generate corrupt effects.",
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
            new AlchemicalIngredient(
                "Dark Stone",
                "The Dark Stone is a foreboding artifact of ancient origin, radiating an unsettling aura of malevolence. Hewn from the depths of the abyss, its surface is smooth and obsidian-like, yet marred with jagged cracks that seem to pulse with a faint, eerie glow. Legends speak of its connection to the darkest forces of the world, making it both a coveted and feared object.",
                6,
                10,
                Data.Rarity.COMMON,
                {
                    passive: {
                        effect: new Stat({effect: Data.Effect.PROTECTION, theorical: 2, isPercentage: true, alchemicalType: Data.AlchemicalEffectType.PASSIVE}),
                        toxicity: 5,
                    },
                    recovery: {
                        effect: new Stat({effect: Data.Effect.MANA, theorical: 4, isPercentage: true, alchemicalType: Data.AlchemicalEffectType.RECOVERY}),
                        toxicity: 20
                    },
                    special: {
                        effect: new Stat({effect: Data.Effect.REMOVES_PROTECTION_DEBUFFS, alchemicalType: Data.AlchemicalEffectType.SPECIAL}),
                        toxicity: 50
                    }
                }
            ),
            new AlchemicalIngredient(
                "Silver Essence",
                "Silver Essence is a rare and coveted substance that is whispered to be the distilled essence of moonlight itself. It is a shimmering, ethereal liquid contained within a small vial adorned with intricate silver engravings. The power it holds is both enchanting and treacherous, capable of transforming ordinary weapons and armor into formidable tools of destruction.",
                5,
                10,
                Data.Rarity.COMMON,
                {
                    passive: {
                        effect: new Stat({effect: Data.Effect.MIGHT, theorical: 2, alchemicalType: Data.AlchemicalEffectType.PASSIVE}),
                        toxicity: 5,
                    },
                    recovery: {
                        effect: new Stat({effect: Data.Effect.STAMINA, theorical: 4, isPercentage: true, alchemicalType: Data.AlchemicalEffectType.RECOVERY}),
                        toxicity: 20
                    },
                    special: {
                        effect: new Stat({effect: Data.Effect.REMOVES_WARDING_DEBUFFS, alchemicalType: Data.AlchemicalEffectType.SPECIAL}),
                        toxicity: 50
                    }
                }
            ),
            new AlchemicalIngredient(
                "Decaying Petals",
                "These withered petals, once vibrant and fragrant, have fallen from a cursed blossom in a forgotten realm. Despite their decaying state, their ominous beauty holds a sinister power. When ingested, Decaying Petals infuse the user with a potent essence of darkness.",
                7,
                10,
                Data.Rarity.UNCOMMON,
                {
                    passive: {
                        effect: new Stat({effect: Data.Effect.WARDING, theorical: 2, alchemicalType: Data.AlchemicalEffectType.PASSIVE}),
                        toxicity: 5,
                    },
                    recovery: {
                        effect: new Stat({effect: Data.Effect.HEALTH, theorical: 4, isPercentage: true, alchemicalType: Data.AlchemicalEffectType.RECOVERY}),
                        toxicity: 20
                    },
                    special: {
                        effect: new Stat({effect: Data.Effect.REMOVES_RESILIENCE_DEBUFFS, alchemicalType: Data.AlchemicalEffectType.SPECIAL}),
                        toxicity: 50
                    }
                }
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
            new Resource(
                "Solar Firefly",
                "Hovering in stillness, its ethereal wings wriggle as it emanates a mesmerizing, golden glow that adores even the most encompassing darkness.<br><br>Can be used to scout unknown rooms in dungeons.",
                11,
                11,
                Data.Rarity.RARE
            )
        ];

        for(const resource of resources) {
            game.all_resources.push(resource);
            game.inventory.resources.push(resource);
        }
    },

    loadSigils: loadSigils = () => {
        const sigils = [
            new Sigil("Resilience Sigil",
                     "The indecipherable carvings on the sigil strenghten your very flesh and the hardiness of your armor.",
                     1,
                     10,
                     Data.Rarity.RARE,
                     Data.SigilType.ARMOR,
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
            new Sigil("Sharpness Sigil",
                     "From the stone emanates a singular power, that flows through the metal to your muscles, and floods your whole being with a supernatural strength.",
                     13,
                     10,
                     Data.Rarity.UNCOMMON,
                     Data.SigilType.WEAPON,
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
            new Sigil("Withering Sigil",
                     "The wounds burn with a terrible heat or biting cold. Bodies crumble and die at its touch.",
                     25,
                     10,
                     Data.Rarity.RARE,
                     Data.SigilType.WEAPON,
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

        for(const sigil of sigils) {
            game.all_sigils.push(sigil);
        }
    },

    loadRecipes: loadRecipes = () => {
        const recipes = [
            new Recipe(
                "Withering Sigil",
                "Sigil description",
                1,
                10,
                Data.Rarity.RARE,
                [
                    new Ingredient(what(game.all_resources, "dark stone"), 1),
                    new Ingredient(what(game.all_resources, "silver essence"), 2),
                    new Ingredient(what(game.all_resources, "decaying petals"), 1),
                ],
                what(game.all_sigils, "withering sigil")
            ),
            new Recipe(
                "Sharpness Sigil",
                "Sigil description",
                1,
                10,
                Data.Rarity.RARE,
                [
                    new Ingredient(what(game.all_resources, "dark stone"), 1),
                    new Ingredient(what(game.all_resources, "silver essence"), 2),
                    new Ingredient(what(game.all_resources, "decaying petals"), 1),
                ],
                what(game.all_sigils, "sharpness sigil")
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
                    }),
                    new Stat({
                        effect: Data.Effect.POISON_DURATION,
                        theorical: 1
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
                        effect: Data.Effect.BLEED_DURATION,
                        theorical: 1
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

    loadSigilCorruptEffects: loadSigilCorruptEffects = () => {
        const sigilCorruptEffects = [
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

        for(const sigilCorruptEffect of sigilCorruptEffects) {
            game.all_sigilCorruptEffects.push(sigilCorruptEffect);
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
            new Trinket(
                "Trapped Nebulae",
                "A shifting storm howls in this sphere; warm and golden, cold and black, it twirls, revealing temporal fragments dating back to the earliest ages of Mithor.",
                23,
                10,
                Data.Rarity.LEGENDARY,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_CHANCE_STUN,
                        theorical: [20, 30],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_DMG_STUN,
                        theorical: [10, 15],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.SPIRIT,
                        theorical: [45, 55],
                    }),
                ]
            ),
            new Trinket(
                "Molars of the Jailor",
                "This bag of coarsly extracted teeth is unexpectedly heavy. Maybe there's not just molars in there, but do you really want to find out?",
                13,
                10,
                Data.Rarity.RARE,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_CHANCE_MOVE,
                        theorical: [20, 30],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.SPEED,
                        theorical: [-3, -5],
                    })
                ]
            ),
            new Trinket(
                "Fire Lizard Talisman",
                "\"Quote\" - The Ashen Warden",
                29,
                10,
                Data.Rarity.EPIC,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_DMG_POISON,
                        theorical: [8, 12],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_CRIT_POISON,
                        theorical: [6, 8],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.PROTECTION,
                        theorical: [-8, -15],
                        isPercentage: true
                    })
                ],
            ),
            new Trinket(
                "Bloodpearl Insignia",
                "\"Quote\" - Somebody",
                32,
                10,
                Data.Rarity.RARE,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_HEAL_GIVEN,
                        theorical: [25, 30],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MAXHEALTH,
                        theorical: [-50, -65]
                    })
                ]
            ),
            new Trinket(
                "Chalice of Crimson Tears",
                "\"Quote\" - Somebody",
                8,
                10,
                Data.Rarity.RARE,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_ACCURACY_BLEED,
                        theorical: [10, 15],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_CRIT_BLEED,
                        theorical: [8, 12],
                        isPercentage: true,
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_DMG_BLEED,
                        theorical: [5, 10],
                        isPercentage: true,
                    })
                ]
            ),
            new Trinket(
                "Lapis Lazuli of Darkness",
                "\"Quote\" - Somebody",
                24,
                10,
                Data.Rarity.LEGENDARY,
                [
                    new Stat({
                        effect: Data.Effect.MAXHEALTH,
                        theorical: [100, 150],
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_BLOCK,
                        theorical: [10, 15],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.DAMAGE_REFLECTION,
                        theorical: [5, 10],
                    }),
                    new Stat({
                        effect: Data.Effect.SPIRIT,
                        theorical: [25, 30],
                    }),
                ]
            ),
            new Trinket(
                "Emerald of Lies",
                "\"Quote\" - Somebody",
                25,
                10,
                Data.Rarity.RARE,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_ACCURACY_BLEED,
                        theorical: [10, 15],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_CRIT_BLEED,
                        theorical: [8, 12],
                        isPercentage: true,
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_DMG_BLEED,
                        theorical: [5, 10],
                        isPercentage: true,
                    })
                ]
            ),
            new Trinket(
                "Foggorth's Armored Horn",
                "\"Quote\" - Somebody",
                9,
                10,
                Data.Rarity.EPIC,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_CHANCE_STUN,
                        theorical: [20, 25],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MIGHT,
                        theorical: [20, 30],
                    }),
                    new Stat({
                        effect: Data.Effect.PROTECTION,
                        theorical: [5, 8],
                        isPercentage: true,
                    }),
                    new Stat({
                        effect: Data.Effect.SPEED,
                        theorical: [-2, -4],
                    })
                ]
            )
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
                [
                    what(game.all_armors, "highsteel helmet"),
                    what(game.all_armors, "highsteel boots"),
                    what(game.all_weapons, "highsteel sword"),
                    what(game.all_trinkets, "omen insignia"),
                    what(game.all_trinkets, "foresighting ring"),
                ],
                {
                    2: [
                        new Stat({
                            effect: Data.Effect.DODGE,
                            theorical: [3, 3],
                            fixed: true,
                            isPercentage: true
                        })
                    ],
                    4: [
                        new Stat({
                            effect: Data.Effect.MAXHEALTH,
                            theorical: [10, 10],
                            fixed: true
                        })
                    ],
                    5: [
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
            equipmentSet.items.forEach(item => {
                item.set = equipmentSet.name;
            })
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
                100, 100, 100,
                10, 12, 85, 0, 20, 20,
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
                        "Deals light damage to all enemies and reduces their §Dodge§. Boosts Amarok's §Protection§ and reduces his §Might§ and §Spirit§.",
                        13,
                        {
                            type: Data.SkillType.OFFENSIVE,
                            manaCost: 10,
                            cooldown: 1,
                            dmgType: Data.SkillDamageType.PHYSICAL,
                            dmgMultiplier: 35,
                            criMultiplier: 5,
                            accMultiplier: 75,
                            targets: {allies: '-0', enemies: '@123'},
                            launchPos: [false, true, true],
                            effectsCaster: {
                                1: {
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
                                }
                            },
                            effectsEnemies: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.DODGE, theorical: -5, isPercentage: true, duration: 2})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.DODGE, theorical: -7, isPercentage: true, duration: 2, isCritical: true})
                                    ],
                                }
                            }
                        }
                    ),
                    new Skill(
                        "Exsanguinate",
                        "Deals damage, applies §Bleeding§ and reduces §Speed§. §Heals§ Amarok.",
                        14,
                        {
                            type: Data.SkillType.OFFENSIVE,
                            manaCost: 50,
                            cooldown: 3,
                            dmgType: Data.SkillDamageType.PHYSICAL,
                            dmgMultiplier: 105,
                            criMultiplier: 10,
                            accMultiplier: 85,
                            targets: {allies: '-0', enemies: '-1'},
                            launchPos: [false, false, true],
                            effectsCaster: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.HEALTH, theorical: [15, 20], isPercentage: true, type: Data.StatType.ACTIVE})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.HEALTH, theorical: [18, 25], isPercentage: true, type: Data.StatType.ACTIVE, isCritical: true})
                                    ]
                                }
                            },
                            effectsEnemies: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.BLEEDING_CURABLE, theorical: [4, 6], type: Data.StatType.ACTIVE, duration: 2}),
                                        new Stat({effect: Data.Effect.SPEED, theorical: -5, duration: 2})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.BLEEDING_CURABLE, theorical: [5, 7], type: Data.StatType.ACTIVE, duration: 3, isCritical: true}),
                                        new Stat({effect: Data.Effect.SPEED, theorical: -7, duration: 2, isCritical: true})
                                    ]
                                }
                            },
                            condition: {
                                checker: function() {
                                    const amarok = what(game.player.formation, "amarok");
                                    return amarok.health <= amarok.variables.threshold_weak * amarok.maxHealth / 100;
                                },
                                message: "Amarok's §Health§ < 30%"
                            }
                        }
                    ),
                    new Skill(
                        "Bloodbound",
                        "Transfers a part of Amarok's §Health§ to the targeted ally, then applies a §Health regeneration§ bonus to Amarok. Boosts the targeted ally's §Speed§.",
                        15,
                        {
                            type: Data.SkillType.FRIENDLY,
                            manaCost: 100,
                            cooldown: 3,
                            criMultiplier: 10,
                            accMultiplier: 100,
                            targets: {allies: '-123', enemies: '-0'},
                            launchPos: [true, true, false],
                            effectsCaster: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.HEALTH, theorical: -20, isPercentage: true}),
                                        new Stat({effect: Data.Effect.HEALTH, theorical: 3, isPercentage: true, type: Data.StatType.ACTIVE, duration: 3, delay: 1})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.HEALTH, theorical: -20, isPercentage: true, isCritical: true}),
                                        new Stat({effect: Data.Effect.HEALTH, theorical: 4, isPercentage: true, type: Data.StatType.ACTIVE, duration: 3, delay: 1, isCritical: true})
                                    ]
                                }
                            },
                            effectsAllies: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.HEALTH, theorical: 20, isPercentage: true, type: Data.StatType.ACTIVE}),
                                        new Stat({effect: Data.Effect.SPEED, theorical: 2, duration: 1})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.HEALTH, theorical: 30, isPercentage: true, type: Data.StatType.ACTIVE, isCritical: true}),
                                        new Stat({effect: Data.Effect.SPEED, theorical: 4, duration: 1, isCritical: true})
                                    ]
                                }
                            }
                        }
                    ),
                    new Skill(
                        "Intervention",
                        "§Guards§ an ally and increases his §Max. mana§.",
                        16,
                        {
                            type: Data.SkillType.FRIENDLY,
                            manaCost: 40,
                            cooldown: 3,
                            criMultiplier: 10,
                            accMultiplier: 100,
                            targets: {allies: '-123', enemies: '-0'},
                            launchPos: [false, false, true],
                            effectsCaster: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.GUARDING, duration: 2})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.GUARDING, duration: 2, isCritical: true})
                                    ]
                                }
                            },
                            effectsAllies: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.GUARDED, duration: 2}),
                                        new Stat({effect: Data.Effect.MAXMANA, theorical: [20, 25], isPercentage: true, duration: 2})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.GUARDED, duration: 2, isCritical: true}),
                                        new Stat({effect: Data.Effect.MAXMANA, theorical: 30, isPercentage: true, duration: 2, isCritical: true})
                                    ]
                                }
                            },
                            variables: {
                                guarded: null
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
                100, 100, 100,
                10, 10, 90, 0, 25, 25,
                [25, 0], [25, 0],
                25, 25,
                0, 0,
                [new Stat({effect: Data.Effect.DODGE, theorical: [3, 7]})],
                {},
                [],
                Data.StriderType.STRIKER,
                "Marked for Death",
                '<div class="par">Each successful hit from Brim on a enemy marks it with a <span class="bold blue">Black Glyph</span>, which can be stacked up 3 times. Each successful hit on an enemy that is marked with a <span class="bold blue">Black Glyph</span> triggers a Bleeding effect.</div><div class="par bulleted"><span class="bold blue">1 Black Glyph</span>: 2 Bleeding (2 rounds)</div><div class="par bulleted"><span class="bold blue">2 Black Glyphs</span>: 5 Bleeding (2 rounds)</div><div class="par bulleted"><span class="bold blue">3 Black Glyphs</span>: 8 Incurable Bleeding (3 rounds). Next hit removes all of the Black Glyphs on the target.</div>',
                '"For Ghirgynth\'s servants dance with the dead, Amarok\'s flesh slavers over pain."',
                0,
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
                10, 12, 85, 0, 15, 15,
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
                10, 12, 85, 0, 25, 25,
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
                0,
                what(game.all_skillTrees, "amarok"),
                [
                    new Skill(
                        "Fallback",
                        "§Moves backwards§ and increases Carhal's §Dodge§.",
                        13,
                        {
                            type: Data.SkillType.FRIENDLY,
                            manaCost: 30,
                            criMultiplier: 15,
                            accMultiplier: 100,
                            cooldown: 2,
                            launchPos: [false, true, true],
                            effectsCaster: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.BACK_ONE}),
                                        new Stat({effect: Data.Effect.DODGE, theorical: 5, duration: 2, isPercentage: true})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.BACK_ONE}),
                                        new Stat({effect: Data.Effect.DODGE, theorical: 7, duration: 2, isPercentage: true, isCritical: true})
                                    ]
                                }
                            }
                        }
                    ),
                    new Skill(
                        "Howling Arrow",
                        "§Stuns§ an enemy.",
                        14,
                        {
                            type: Data.SkillType.OFFENSIVE,
                            dmgType: Data.SkillDamageType.MAGICAL,
                            manaCost: 20,
                            dmgMultiplier: 100,
                            criMultiplier: 10,
                            accMultiplier: 90,
                            cooldown: 1,
                            launchPos: [true, true, false],
                            targets: {allies: '-0', enemies: '-123'},
                            effectsEnemies: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.STUN, duration: 1})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.STUN, duration: 2})
                                    ]
                                }
                            }
                        }
                    ),
                    new Skill(
                        "Concussive Blast",
                        "Deals damage to enemies and applies a §Stamina regeneration§ boost to Carhal. Has a chance to §Stun§ Carhal.",
                        15,
                        {
                            type: Data.SkillType.OFFENSIVE,
                            dmgType: Data.SkillDamageType.MAGICAL,
                            manaCost: 30,
                            dmgMultiplier: 120,
                            criMultiplier: 20,
                            accMultiplier: 85,
                            cooldown: 2,
                            launchPos: [true, false, false],
                            targets: {allies: '-0', enemies: '@12'},
                            effectsCaster: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.STUN, duration: 1}),
                                        new Stat({effect: Data.Effect.STAMINA, duration: 2, theorical: 4, isPercentage: true, type: Data.StatType.ACTIVE})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.STUN, duration: 1, isCritical: true}),
                                        new Stat({effect: Data.Effect.STAMINA, duration: 2, theorical: 4, isPercentage: true, type: Data.StatType.ACTIVE, isCritical: true})
                                    ]
                                }
                            }
                        }
                    )
                ],
                '10% 10%'
            ),
            new Strider(
                "Ifrin",
                "A fearsome mage, Ifrin was banned from the Order of Rhun upon harnessing the power of Yorll's corrupted magic, and is now on a constant need of enhancing her knowledge of the dark arts.",
                Data.Charset.IFRIN,
                "The Prophet of Kaphyst",
                100, 100, 100,
                10, 12, 85, 0, 20, 20,
                [50, 50], [50, 50],
                30, 45,
                0, 0,
                [new Stat({effect: Data.Effect.MAXMANA, theorical: [15, 25]})],
                {},
                [],
                Data.StriderType.TANK,
                "Witchskin",
                "Witchskin's power description",
                'quote',
                1,
                what(game.all_skillTrees, "amarok"),
                [],
                '10% 70%'
            ),
            new Strider(
                "Betheros",
                "Betheros has traveled the roads of the world as an itinerant bard, spreading inspiring melodies and wise words. It is said that those who met him were changed forever.",
                Data.Charset.BETHEROS,
                "The Bringer of Good Faith",
                100, 100, 100,
                10, 12, 85, 0, 15, 15,
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
                0,
                what(game.all_skillTrees, "amarok"),
                [
                    new Skill(
                        "Inner Fire",
                        "§Heals§ Betheros. Boosts the target's §Skill damage§ and §Received healing§ if it is an ally; reduces them if it's an enemy.",
                        13,
                        {
                            type: Data.SkillType.FRIENDLY,
                            manaCost: 25,
                            critMultiplier: 20,
                            accMultiplier: 85,
                            targets: {allies: '-123', enemies: '-123'},
                            effectsCaster: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.HEALTH, theorical: [0, 8], isPercentage: true, type: Data.StatType.ACTIVE})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.HEALTH, theorical: [3, 8], isPercentage: true, type: Data.StatType.ACTIVE, isCritical: true})
                                    ]
                                }
                            },
                            effectsAllies: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.MODIF_DMG_SKILL, theorical: [8, 10], isPercentage: true, duration: 2}),
                                        new Stat({effect: Data.Effect.MODIF_HEAL_RECV, theorical: [8, 10], isPercentage: true, duration: 2})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.MODIF_DMG_SKILL, theorical: [10, 12], isPercentage: true, duration: 2, isCritical: true}),
                                        new Stat({effect: Data.Effect.MODIF_HEAL_RECV, theorical: [10, 12], isPercentage: true, duration: 2, isCritical: true})
                                    ]
                                }
                            },
                            effectsEnemies: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.MODIF_DMG_SKILL, theorical: [-5, -10], isPercentage: true, duration: 1}),
                                        new Stat({effect: Data.Effect.MODIF_HEAL_RECV, theorical: [-5, -10], isPercentage: true, duration: 2})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.MODIF_DMG_SKILL, theorical: [-8, -15], isPercentage: true, duration: 2, isCritical: true}),
                                        new Stat({effect: Data.Effect.MODIF_HEAL_RECV, theorical: [-8, -15], isPercentage: true, duration: 2, isCritical: true})
                                    ]
                                }
                            }
                        }
                    ),
                    new Skill(
                        "Ardas Garin",
                        "Applies §Shield§ to all allies.",
                        14,
                        {
                            type: Data.SkillType.FRIENDLY,
                            manaCost: 50,
                            critMultiplier: 15,
                            accMultiplier: 100,
                            targets: {allies: '@123', enemies: '-0'},
                            cooldown: 3,
                            launchPos: [true, false, false],
                            effectsAllies: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.SHIELD, theorical: [20, 25], duration: 3})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.SHIELD, theorical: [25, 30], duration: 4, isCritical: true})
                                    ]
                                }
                            },
                        }
                    ),
                    new Skill(
                        "Banishment",
                        "§Pushes back§ an enemy. §Heals§ Betheros.",
                        15,
                        {
                            type: Data.SkillType.OFFENSIVE,
                            manaCost: 20,
                            dmgType: Data.SkillDamageType.MAGICAL,
                            dmgMultiplier: 20,
                            criMultiplier: 10,
                            accMultiplier: 85,
                            targets: {allies: '-0', enemies: '-12'},
                            cooldown: 1,
                            launchPos: [true, true, false],
                            effectsCaster: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.HEALTH, theorical: [3, 6], isPercentage: true, type: Data.StatType.ACTIVE})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.HEALTH, theorical: [5, 8], isPercentage: true, type: Data.StatType.ACTIVE, isCritical: true})
                                    ]
                                }
                            },
                            effectsEnemies: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.PUSH_ONE})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.PUSH_ONE})
                                    ]
                                }
                            }
                        }
                    ),
                    new Skill(
                        "Arcane Mending",
                        "§Heals§ the targeted ally. Increases Betheros' §Given healing§.",
                        16,
                        {
                            type: Data.SkillType.FRIENDLY,
                            manaCost: 30,
                            criMultiplier: 15,
                            targets: {allies: '-123', enemies: '-0'},
                            effectsCaster: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.MODIF_HEAL_GIVEN, theorical: [5, 10], isPercentage: true, duration: 2})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.MODIF_HEAL_GIVEN, theorical: [10, 15], isPercentage: true, duration: 2})
                                    ]
                                }
                            },
                            effectsAllies: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.HEALTH, theorical: [10, 15], isPercentage: true, type: Data.StatType.ACTIVE})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.HEALTH, theorical: [15, 20], isPercentage: true, type: Data.StatType.ACTIVE, isCritical: true})
                                    ]
                                }
                            }
                        }
                    ),
                    new Skill(
                        "Dazzling Truth",
                        "Replenishes Betheros' §Mana§ and boosts his §Accuracy§. Reduces the targets' §Dodge§.",
                        17,
                        {
                            type: Data.SkillType.OFFENSIVE,
                            manaCost: 20,
                            dmgMultiplier: 90,
                            accMultiplier: 90,
                            criMultiplier: 10,
                            targets: {allies: '-0', enemies: '@23'},
                            cooldown: 2,
                            effectsCaster: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.MANA, theorical: [10, 15], isPercentage: true, type: Data.StatType.ACTIVE, duration: 2}),
                                        new Stat({effect: Data.Effect.ACCURACY, theorical: 10, isPercentage: true, duration: 3})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.MANA, theorical: [15, 20], isPercentage: true, type: Data.StatType.ACTIVE, duration: 2, isCritical: true}),
                                        new Stat({effect: Data.Effect.ACCURACY, theorical: 15, isPercentage: true, duration: 3, isCritical: true})
                                    ]
                                }
                            },
                            effectsEnemies: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.DODGE, theorical: [-5, -8], isPercentage: true, duration: 3})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.DODGE, theorical: [-8, -12], isPercentage: true, duration: 3, isCritical: true})
                                    ]
                                }
                            }
                        }
                    )
                ],
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
                Data.Charset.MIRAI,
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
            new Strider(
                "Khej",
                "A childhood friend of Naka, the belief that she was dead drove Khej to madness and regret. He now dances in the darkness, appearing and disappearing, leaving sharp blades in his wake.",
                Data.Charset.KHEJ,
                "The Betrayed",
                100, 100, 100,
                10, 12, 85, 0, 5, 5,
                [0, 0], [0, 0],
                30, 45,
                0, 0,
                [new Stat({effect: Data.Effect.MODIF_DMG_WEAPON, theorical: 5})],
                {},
                [],
                Data.StriderType.STRIKER,
                "Revenge of the Fallen",
                "Revenge of the Fallen power description",
                "quote",
                0,
                what(game.all_skillTrees, "amarok"),
                [],
                '10% 50%'
            )
        ];

        for(const strider of striders) {
            game.all_striders.push(strider);
        }
    },

    loadEnemies: loadEnemies = () => {
        const enemies = [
            new Enemy(
                "Mycelial Tick",
                "This monster is weak, but it's swift (high Speed and Dodge) and applies poison.",
                Data.Charset.MYCELIAL_TICK,
                "Subname",
                35, 35, 35,
                20, 15, 85, 0, 5, 5,
                [0, 0], [2, 0],
                20, 25,
                0, 4,
                [],
                {},
                [],
                Data.MobType.LESSER,
                [
                    new Skill(
                        "Fungal scratch",
                        "",
                        0,
                        {
                            type: Data.SkillType.OFFENSIVE,
                            manaCost: 10,
                            dmgType: Data.SkillDamageType.PHYSICAL,
                            dmgMultiplier: 100,
                            criMultiplier: 20,
                            accMultiplier: 90,
                            targets: {allies: '-0', enemies: '-123'},
                            effectsAllies: {
                                1: {
                                    regular: [
                                        new Stat({effect: Data.Effect.BLIGHT_CURABLE, theorical: [2, 4], type: Data.StatType.ACTIVE, duration: 2})
                                    ],
                                    critical: [
                                        new Stat({effect: Data.Effect.BLIGHT_CURABLE, theorical: [4, 6], type: Data.StatType.ACTIVE, duration: 2})
                                    ]
                                }
                            }
                        }
                    )
                ],
                new EnemyBehavior({
                    actions: [
                        new EnemyAction({
                            title: 'regular',
                            owner: function(){ return what(game.currentBattle.enemies, "mycelial tick") },
                            checker: function(){ return this.owner.skills[0].manaCost <= this.owner.mana },
                            behavior: function(){
                                game.currentBattle.target.push(choose(game.currentBattle.allies));
                                game.currentBattle.selectedSkill = this.owner.skills[0];
                                console.log('attacking ' + game.currentBattle.target[0].name + ' with ' + game.currentBattle.selectedSkill.name);
                                game.currentBattle.executeSkill();
                                
                            }
                        }),
                        new EnemyAction({
                            title: 'block',
                            owner: function(){ return what(game.currentBattle.enemies, "mycelial tick") },
                            checker: function(){ return this.owner.stamina > 0 },
                            behavior: function() {
                                console.log('blocks');
                                this.owner.applyBlocking();
                                this.owner.removeBaseStat(new Stat({effect: Data.Effect.STAMINA, theorical: 5}));
                                game.currentBattle.endTurn();
                            }
                        }),
                    ]
                })
            ),
            new Enemy(
                "Fungaliant",
                "Very resistant to poison damage, this monster heals others and reduces your resistances.",
                Data.Charset.FUNGALIANT,
                "Subname",
                50, 50, 50,
                10, 10, 85, 10, 10, 10,
                [0, 0], [5, 0],
                20, 25,
                0, 4,
                [],
                {},
                [],
                Data.MobType.REGULAR,
                [],
                null,
            ),
            new Enemy(
                "Gnarly Horror",
                "Be aware of their high Stun power ; they also don't hesitate to Guard their allies while also increasing their Protection.",
                Data.Charset.GNARLY_HORROR,
                "Subname",
                120, 120, 120,
                5, 8, 85, 35, 20, 20,
                [2, 0], [5, 0],
                80, 50,
                10, 10,
                [],
                {},
                [],
                Data.MobType.STRONGER,
                [],
                null,
            )
        ];

        for(const enemy of enemies) {
            game.all_enemies.push(enemy);
        }
    },

    loadEnemyFormations: loadEnemyFormations = () => {
        const enemyFormations = [
            new EnemyFormation({
                name: "threeTicks",
                biome: Data.DungeonBiome.UZIEL_JUNGLES,
                levels: [1, 2],
                formation: [what(game.all_enemies, "mycelial tick"), what(game.all_enemies, "mycelial tick"), what(game.all_enemies, "mycelial tick")],
            }),
            new EnemyFormation({
                name: "twoFungaliants",
                biome: Data.DungeonBiome.UZIEL_JUNGLES,
                levels: [2, 3, 4],
                formation: [what(game.all_enemies, "fungaliant"), what(game.all_enemies, "fungaliant"), what(game.all_enemies, "mycelial tick")],
            }),
            new EnemyFormation({
                name: "gnarlyAndFungaliant",
                biome: Data.DungeonBiome.UZIEL_JUNGLES,
                levels: [4, 5],
                formation: [what(game.all_enemies, "fungaliant"), what(game.all_enemies, "fungaliant"), what(game.all_enemies, "gnarly horror")],
            }),
        ];  

        for(const enemyFormation of enemyFormations) {
            game.all_enemyFormations.push(enemyFormation);
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

    loadMajorEons: loadMajorEons = () => {
        const eons = [
            new Eon({
                id: "ghorrasDiary",
                title: "Ghorra's Diary",
                fragments: [
                    {
                        text: "I never thought it would come to this. I've been living in this godforsaken cave for what feels like an eternity, always on the run from the law and society. But it's not the law or society that's going to kill me, it's starvation. My stomach is gnawing at my insides, and the hunger is making me delirious. I've resorted to eating moss and bugs just to survive, but it's not enough. I can feel my strength leaving me, my mind slipping away. I never thought I'd be reduced to this, a desperate animal in the dark. I've considered it, I won't lie. Eating my fellow bandits, just to stay alive. But I can't bring myself to do it. Maybe it's the last shred of humanity in me, or maybe it's just the fear of being caught. Either way, I know my time is running out. I'll probably be dead by the time anyone finds this journal. But if you're reading this, know that I went out fighting. I may be a criminal, but I was never a monster.",
                        unlocked: false
                    },
                    {
                        text: "Today, I committed the ultimate sin. I killed one of my own. I was desperate, I couldn't take the hunger any longer. I was on the brink of starvation and I had no other options. I thought I would never be able to bring myself to it, but my body was weak and my mind was consumed by the need to survive. I convinced myself that it was the only way. I told my comrades that he had died while searching for food in the jungle. But the truth is, I killed him and ate his flesh. It was the best thing I have ever tasted. But now, I am consumed by guilt and shame. I am no better than an animal. I am a monster. I can never go back to who I was before. I am forever changed by this act of desperation.",
                        unlocked: false
                    },
                    {
                        text: "This will be my last entry. I find myself consumed by a hunger that cannot be quenched. Despite having consumed the flesh of two more of my comrades, I continue to wither away, my body wasting away with each passing day. The taste of anything other than human flesh is like ash on my tongue, causing me to retch and vomit upon consumption. My teeth have grown into razor sharp fangs, my nails hardened like stone. My once human skin now stretches tightly over my bones, covered in putrid lipomas and rotting scabs. I cannot help but feel a growing anger and an urge to kill anyone who crosses my path. I fear I am becoming a monster, a true cannibal. But the hunger, the insatiable hunger, it drives me on.",
                        unlocked: false
                    }
                ]
            }),
            new Eon({
                id: "echoesOfTheRivers",
                title: "Echoes of the Rivers",
                fragments: [
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    }
                ]
            }),
            new Eon({
                id: "NevracsProblematicTortureMethods",
                title: "Nevrac's problematic torture methods",
                fragments: [
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    }
                ]
            }),
            new Eon({
                id: "reportOfAtalansFifthYearOfDrought",
                title: "Report of Atalan's fifth year of drought",
                fragments: [
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    }
                ]
            }),
            new Eon({
                id: "theNineShadowsOfDeath",
                title: "The Nine Shadows of Death",
                fragments: [
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    }
                ]
            }),
            new Eon({
                id: "GaunterRandallsAbandonedNotes",
                title: "Gaunter Randall's abandoned notes",
                fragments: [
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    }
                ]
            }),
            new Eon({
                id: "drancoransPrayers",
                title: "Drancoran's prayers",
                fragments: [
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    }
                ]
            }),
            new Eon({
                id: "memoirsOfTheUnfortunate",
                title: "Memoirs of the Unfortunate",
                fragments: [
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    }
                ]
            }),
            new Eon({
                id: "glossaryOfTemporalDiseases",
                title: "Glossary of temporal diseases",
                fragments: [
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    }
                ]
            }),
            new Eon({
                id: "veiledWhispersFromTheMaze",
                title: "Veiled whispers from the Maze",
                fragments: [
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    },
                    {
                        text: "A plebis P solebat capitali tribunus querella Q odio plebis vel sedentem vel multum querella a amantissime tum una in incidere in Q domi profecto qui in a et saepe odio eum quanta odio vel una vixerat Q eum vel sedentem plebis quocum is pauci domi memini Meministi pauci multum tum multis vel Meministi domi Meministi hemicyclio qui is eo quanta amantissime hominum in saepe forte et admodum tribunus dissideret eo pauci forte una Meministi et querella erat pauci Sulpicio tum qui familiares Sulpicio illum et quocum amantissime qui solebat in utebare vixerat consul hominum vel pauci vel multum profecto.",
                        unlocked: false
                    }
                ]
            }),
        ];

        for(const eon of eons) {
            game.all_majorEons.push(eon);
        }
    },

    loadConsumables: loadConsumables = () => {
        const consumables = [
            
        ];

        for(const consumable of consumables) {
            game.all_consumables.push(consumable);
        }
    }
}
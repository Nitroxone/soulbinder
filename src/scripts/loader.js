/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

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
                Data.Rarity.REGULAR,
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
            ),
            new Weapon("Entarian Axe",
                "Axe description",
                4,
                10,
                Data.Rarity.REGULAR,
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
                [true, true, false],
            ),
            new Weapon("Drancoran Staff",
                "Staff description",
                1,
                10,
                Data.Rarity.SINGULAR,
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
            ),
            new Weapon("Arbrean Spear",
                "Spear description",
                2,
                100,
                Data.Rarity.SINGULAR,
                Data.WeaponType.SPEAR,
                Data.WeaponWeight.HEAVY,
                [5, 6],
                [1, 2],
                [6, 9],
                [10, 12],
                [8, 9],
                [5, 8],
                [[1, 1], [1, 1], true],
                [[0, 0], [0, 0], true],
                [true, true, true]
            ),
            new Weapon("Solana's Sword of the Sun",
                "Solana left this blade behind her; it knew many porters, but never a master. At least, that was until it fell into the hands of Betheros. The golden filaments of the hilt closed around his wrist, hugging it to perfection; like a distant kiss from the woman he once loved, and would never stop loving until his last breath.",
                12,
                10,
                Data.Rarity.MYTHIC,
                Data.WeaponType.SWORD,
                Data.WeaponWeight.LIGHT,
                [13, 18],
                [24, 26],
                [11, 14],
                [10, 12],
                [15, 18],
                [16, 18],
                [[5, 8], [1, 3], true],
                [[0, 0], [0, 0], true],
                [true, true, false],
                3,
                new Echo(
                    "Solana's Tulips",
                    "Each non-critical hit with this weapon gives a §1% {CRIT_LUK} bonus to its bearer, for one round. Each critical hit with this weapon regenerates §2% of its bearer's {MAXMANA} and generates §3 {SHIELD} points.",
                    1,
                    Data.Rarity.MYTHIC,
                    [
                        new Stat({
                            effect: Data.Effect.MODIF_HEAL_GIVEN,
                            theorical: [8, 12],
                            isPercentage: true
                        }),
                        new Stat({
                            effect: Data.Effect.MODIF_CRIT_SKILL,
                            theorical: [4, 6],
                            isPercentage: true
                        }),
                    ],
                    "Everything seemed to draw her back to him: the scent of tulips, the red of strawberries, the shine of gold.",
                    {
                        "bonus_critical_luck": [10, 15],
                        "mana_regen": [4, 6],
                        "shield": [20, 26]
                    },
                    [],
                ))
        ];

        for (const weapon of weapons) {
            game.all_weapons.push(weapon);
        }
    },

    loadArmors: loadArmors = () => {
        const armors = [
            new Armor("Highsteel Helmet",
                "A fair protection.",
                26,
                10,
                Data.Rarity.REGULAR,
                Data.ArmorType.HELMET,
                [3, 6],
                [0, 0],
            ),
            new Armor("Highsteel Armor",
                "A fair protection.",
                2,
                10,
                Data.Rarity.REGULAR,
                Data.ArmorType.CHESTPLATE,
                [8, 12],
                [0, 0],
            ),
            new Armor("Highsteel Bracers",
                "A fair protection.",
                9,
                10,
                Data.Rarity.REGULAR,
                Data.ArmorType.GLOVES,
                [8, 12],
                [0, 0],
            ),
            new Armor("Highsteel Boots",
                "A fair protection.",
                8,
                10,
                Data.Rarity.REGULAR,
                Data.ArmorType.BOOTS,
                [8, 12],
                [0, 0],
            ),
            new Armor("Highsteel Shield",
                "A fair protection.",
                15,
                10,
                Data.Rarity.REGULAR,
                Data.ArmorType.SHIELD,
                [8, 12],
                [0, 0],
            ),
            new Armor("Entarian Chestplate",
                "A fair protection.",
                4,
                10,
                Data.Rarity.REGULAR,
                Data.ArmorType.CHESTPLATE,
                [6, 10],
                [1, 2],
            ),
            new Armor("Entarian Boots",
                "A fair protection.",
                5,
                10,
                Data.Rarity.REGULAR,
                Data.ArmorType.BOOTS,
                [5, 8],
                [2, 3],
            ),
            new Armor("Drancoran Hood",
                "A fair protection.",
                12,
                10,
                Data.Rarity.REGULAR,
                Data.ArmorType.HELMET,
                [0, 0],
                [10, 12],
            ),
            new Armor("Drancoran Mittens",
                "A fair protection.",
                6,
                10,
                Data.Rarity.REGULAR,
                Data.ArmorType.GLOVES,
                [0, 0],
                [8, 10],
            ),
            new Armor("Arbrean Helm",
                "Blablabla",
                18,
                2,
                Data.Rarity.SINGULAR,
                Data.ArmorType.HELMET,
                [8, 10],
                [2, 3],
            ),
            new Armor("Arbrean Shield",
                "Blablabla",
                19,
                2,
                Data.Rarity.SINGULAR,
                Data.ArmorType.SHIELD,
                [8, 10],
                [2, 3],
            ),
            new Armor("Besieged King",
                "Lorem ipsum",
                45,
                100000,
                Data.Rarity.RELIC,
                Data.ArmorType.HELMET,
                [120, 130],
                [55, 60],
                2,
                new Echo(
                    "Wartime Efforts",
                    "Guarding an ally boosts them with a §1% {MODIF_DMG_TOTAL} for 1 round, and yourself with §2% {PROTECTION} for one round. While guarding, any friendly skill will boost the targets with §3% {REGEN_STAMINA} for one round, and any offensive skill will apply a §4% {DODGE} debuff to the targets for two rounds.",
                    1,
                    Data.Rarity.RELIC,
                    [
                        new Stat({
                            effect: Data.Effect.PROTECTION,
                            theorical: [4, 8],
                            isPercentage: true
                        }),
                        new Stat({
                            effect: Data.Effect.MODIF_BLOCK,
                            theorical: [25, 30],
                            isPercentage: true
                        })
                    ],
                    "Lorem ipsum",
                    {
                        "bonus_total_damage": [50, 55],
                        "bonus_protection": [25, 30],
                        "bonus_stamina_regen": [5, 10],
                        "debuff_dodge": [6, 10]
                    },
                    [],
                )
            ),
            new Armor(
                "Solana's Shield of the Sun",
                "Lorem ipsum",
                24,
                1000,
                Data.Rarity.MYTHIC,
                Data.ArmorType.SHIELD,
                [10, 15],
                [25, 30],
                2,
                new Echo(
                    "Solana's Embrace",
                    "Gain a §1% {PROTECTION} debuff and a §2% {MODIF_HEAL_GIVEN} at the end of every round you don't deal damage. Dealing damage breaks the effects, and regenerates §3% of your {MAXHEALTH}, multiplied by the amount of rounds the effects have been active for.",
                    1,
                    Data.Rarity.MYTHIC,
                    [
                        new Stat({
                            effect: Data.Effect.RES_STUN,
                            theorical: [15, 18],
                            isPercentage: true
                        }),
                    ],
                    "\"Always remember, Betheros. Go forth!\"",
                    {
                        "modif_protection": [-10, -12],
                        "modif_given_heal": [5, 8],
                        "health_regen": [6, 6]
                    },
                    []
                )
            ),
        ];

        for (const armor of armors) {
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
                Data.Rarity.GRAND,
            ),
            new Resource(
                "Time Stream Catalyst",
                "Maxes out a sigil's effects.",
                1,
                10,
                Data.Rarity.GRAND,
            ),
            new Resource(
                "Pearl of Wrath",
                "This cracked pink pearl screams from within. It flutters in the palm of your hand, shooting inexplicable anger through every fibre of the person who admires it.<br><br>Pushes the sigil's effects beyond their maximum bound. May generate corrupt effects.",
                2,
                10,
                Data.Rarity.MYTHIC,
            ),
            new Resource(
                "Reminder",
                "Randomly recasts an item's effects.",
                3,
                10,
                Data.Rarity.PRECIOUS
            ),
            new Resource(
                "Seed of Remembrance",
                "Can be used to store an echo, and reapply it later.",
                22,
                10,
                Data.Rarity.MYTHIC
            ),
            new AlchemicalIngredient(
                "Dark Stone",
                "The Dark Stone is a foreboding artifact of ancient origin, radiating an unsettling aura of malevolence. Hewn from the depths of the abyss, its surface is smooth and obsidian-like, yet marred with jagged cracks that seem to pulse with a faint, eerie glow. Legends speak of its connection to the darkest forces of the world, making it both a coveted and feared object.",
                6,
                10,
                Data.Rarity.REGULAR,
                {
                    passive: {
                        effect: new Stat({ effect: Data.Effect.PROTECTION, theorical: 2, isPercentage: true, alchemicalType: Data.AlchemicalEffectType.PASSIVE }),
                        toxicity: 5,
                    },
                    recovery: {
                        effect: new Stat({ effect: Data.Effect.MANA, theorical: 4, isPercentage: true, alchemicalType: Data.AlchemicalEffectType.RECOVERY }),
                        toxicity: 20
                    },
                    special: {
                        effect: new Stat({ effect: Data.Effect.REMOVES_PROTECTION_DEBUFFS, alchemicalType: Data.AlchemicalEffectType.SPECIAL }),
                        toxicity: 50
                    }
                }
            ),
            new AlchemicalIngredient(
                "Silver Essence",
                "Silver Essence is a precious and coveted substance that is whispered to be the distilled essence of moonlight itself. It is a shimmering, ethereal liquid contained within a small vial adorned with intricate silver engravings. The power it holds is both enchanting and treacherous, capable of transforming ordinary weapons and armor into formidable tools of destruction.",
                5,
                10,
                Data.Rarity.REGULAR,
                {
                    passive: {
                        effect: new Stat({ effect: Data.Effect.MIGHT, theorical: 2, alchemicalType: Data.AlchemicalEffectType.PASSIVE }),
                        toxicity: 5,
                    },
                    recovery: {
                        effect: new Stat({ effect: Data.Effect.STAMINA, theorical: 4, isPercentage: true, alchemicalType: Data.AlchemicalEffectType.RECOVERY }),
                        toxicity: 20
                    },
                    special: {
                        effect: new Stat({ effect: Data.Effect.REMOVES_WARDING_DEBUFFS, alchemicalType: Data.AlchemicalEffectType.SPECIAL }),
                        toxicity: 50
                    }
                }
            ),
            new AlchemicalIngredient(
                "Decaying Petals",
                "These withered petals, once vibrant and fragrant, have fallen from a cursed blossom in a forgotten realm. Despite their decaying state, their ominous beauty holds a sinister power. When ingested, Decaying Petals infuse the user with a potent essence of darkness.",
                7,
                10,
                Data.Rarity.SINGULAR,
                {
                    passive: {
                        effect: new Stat({ effect: Data.Effect.WARDING, theorical: 2, alchemicalType: Data.AlchemicalEffectType.PASSIVE }),
                        toxicity: 5,
                    },
                    recovery: {
                        effect: new Stat({ effect: Data.Effect.HEALTH, theorical: 4, isPercentage: true, alchemicalType: Data.AlchemicalEffectType.RECOVERY }),
                        toxicity: 20
                    },
                    special: {
                        effect: new Stat({ effect: Data.Effect.REMOVES_RESILIENCE_DEBUFFS, alchemicalType: Data.AlchemicalEffectType.SPECIAL }),
                        toxicity: 50
                    }
                }
            ),
            new TimeShard(
                "Minor Time Shard",
                "Can be used in the Astral Forge to create a temporal alteration. Adds +1 effect value.",
                62,
                10,
                Data.Rarity.REGULAR,
                1,
            ),
            new TimeShard(
                "Major Time Shard",
                "Can be used in the Astral Forge to create a temporal alteration. Adds +5 effect value.",
                63,
                10,
                Data.Rarity.SINGULAR,
                5
            ),
            new TimeShard(
                "Superior Time Shard",
                "Can be used in the Astral Forge to create a temporal alteration. Adds +50 effect value.",
                64,
                10,
                Data.Rarity.PRECIOUS,
                50
            ),
            new TimeShard(
                "Gleaming Time Shard",
                "Can be used in the Astral Forge to create a temporal alteration. Adds +1% effect value.",
                65,
                10,
                Data.Rarity.GRAND,
                1,
                true
            ),
            new TimeShard(
                "Iridescent Time Shard",
                "Can be used in the Astral Forge to create a temporal alteration. Adds +5% effect value.",
                66,
                10,
                Data.Rarity.GRAND,
                5,
                true
            ),
            new TimeShard(
                "Unstable Time Shard",
                "Can be used in the Astral Forge to create a temporal alteration. Enables an effect.",
                67,
                10,
                Data.Rarity.GRAND,
                true
            ),
            new TimeShard(
                "Prismatic Time Shard",
                "Can be used in the Astral Forge to create a temporal alteration. Adds a new line of effect. Seals the object in the process.",
                68,
                10,
                Data.Rarity.MYTHIC,
                "new"
            ),
            new Resource(
                "Frozen Comet Ore",
                "Can be used in the Astral Forge to force a Success on a temporal alteration. Warps the object in the process.",
                69,
                10,
                Data.Rarity.GRAND,
            ),
            new Resource(
                "Burning Comet Ore",
                "Can be used in the Astral Forge to revert a temporal alteration.",
                70,
                10,
                Data.Rarity.GRAND,
            ),
            new Resource(
                "Irradiant Comet Ore",
                "Can be used in the Astral Forge to force a Critical Success on a temporal alteration. Seals the object's fate in the process.",
                71,
                10,
                Data.Rarity.MYTHIC,
            ),
            new Resource(
                "Solar Firefly",
                "Hovering in stillness, its ethereal wings wriggle as it emanates a mesmerizing, golden glow that adores even the most encompassing darkness.<br><br>Can be used to scout unknown rooms in dungeons.",
                11,
                11,
                Data.Rarity.PRECIOUS
            )
        ];

        for (const resource of resources) {
            game.all_resources.push(resource);
            game.inventory.resources.push(resource);
        }
    },
    loadConsumables: loadConsumables = () => {
        const consumables = [
            new Consumable(
                "Uziel Cherry Candies",
                "These cherry-savory soft candies are filled with a melting caramelized marshmallow center.",
                14,
                100,
                Data.Rarity.PRECIOUS,
                {
                    effects: [
                        new Stat({ effect: Data.Effect.HEALTH, theorical: 20, isPercentage: true, alchemicalType: Data.AlchemicalEffectType.RECOVERY }),
                        new Stat({ effect: Data.Effect.MANA, theorical: 20, isPercentage: true, alchemicalType: Data.AlchemicalEffectType.RECOVERY }),
                    ]
                }
            )
        ];

        for (const consumable of consumables) {
            game.all_consumables.push(consumable);
        }
    },
    loadSigils: loadSigils = () => {
        const sigils = [
            new Sigil("Resilience Sigil",
                "The indecipherable carvings on the sigil strenghten your very flesh and the hardiness of your armor.",
                1,
                10,
                Data.Rarity.PRECIOUS,
                {
                    type: Data.SigilType.ARMOR,
                    effects: [
                        new Stat({
                            effect: Data.Effect.RESILIENCE,
                            theorical: [3, 5]
                        })
                    ],
                    critical: [
                        new Stat({
                            effect: Data.Effect.RESILIENCE,
                            theorical: [1, 2],
                            isCritical: true
                        })
                    ],
                    corrupt: [
                        new Stat({
                            effect: Data.Effect.WARDING,
                            theorical: [-1, -3],
                            isCorrupt: true
                        })
                    ]
                }
            ),
            new Sigil("Sharpness Sigil",
                "From the stone emanates a singular power, that flows through the metal to your muscles, and floods your whole being with a supernatural strength.",
                13,
                10,
                Data.Rarity.SINGULAR,
                {
                    type: Data.SigilType.WEAPON,
                    effects: [
                        new Stat({
                            effect: Data.Effect.SHARPNESS,
                            theorical: [3, 6]
                        })
                    ],
                    critical: [
                        new Stat({
                            effect: Data.Effect.CRIT_LUK,
                            theorical: [1, 3],
                            isCritical: true,
                            isPercentage: true
                        })
                    ],
                    corrupt: [
                        new Stat({
                            effect: Data.Effect.WITHERING,
                            theorical: [-1, -3],
                            isCorrupt: true
                        })
                    ]
                }
            ),
            new Sigil("Withering Sigil",
                "The wounds burn with a terrible heat or biting cold. Bodies crumble and die at its touch.",
                25,
                10,
                Data.Rarity.PRECIOUS,
                {
                    type: Data.SigilType.WEAPON,
                    effects: [
                        new Stat({
                            effect: Data.Effect.WITHERING,
                            theorical: [3, 6]
                        })
                    ],
                    critical: [
                        new Stat({
                            effect: Data.Effect.BLOCK,
                            theorical: [1, 2],
                            isCritical: true
                        })
                    ],
                    corrupt: [
                        new Stat({
                            effect: Data.Effect.SHARPNESS,
                            theorical: [-1, -3],
                            isCorrupt: true
                        })
                    ]
                }
            ),


        ];

        for (const sigil of sigils) {
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
                Data.Rarity.PRECIOUS,
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
                Data.Rarity.PRECIOUS,
                [
                    new Ingredient(what(game.all_resources, "dark stone"), 1),
                    new Ingredient(what(game.all_resources, "silver essence"), 2),
                    new Ingredient(what(game.all_resources, "decaying petals"), 1),
                ],
                what(game.all_sigils, "sharpness sigil")
            ),
        ]

        for (const recipe of recipes) {
            game.all_recipes.push(recipe);
        }
    },

    loadEchoes: loadEchoes = () => {
        const echoes = [
            new Echo(
                "Snakebite",
                "Heal §1% of your {MAXHEALTH} when an enemy is poisoned by this weapon.",
                1,
                Data.Rarity.SINGULAR,
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
                    "health_regen": [3, 5]
                },
                [
                    new Trigger({
                        name: "snakebite_trigger",
                        type: Data.TriggerType.ON_DEAL_POISON,
                        behavior: function() {
                            console.log("SNAKEBITE ECHO TRIGGERED");
                            this.owner.addBaseStat(new Stat({ effect: Data.Effect.HEALTH, theorical: this.variables.health_regen, isPercentage: true }));
                        }
                    })
                ],
                Data.EchoType.WEAPON
            ),
            new Echo(
                "Last Word",
                "Each time a spell is cast during the fight, you gain §1% {MAXMANA} (stackable up to §2%). This effect fades away if you are stunned.",
                1,
                Data.Rarity.PRECIOUS,
                [],
                "The final word in a case is always a number.",
                {
                    "bonus_spirit": [2, 4],
                    "max_bonus": [25, 32]
                },
                [
                    new Trigger({
                        name: "lastWord_Trigger",
                        type: Data.TriggerType.ON_USE_SKILL,
                        behavior: function() {
                            console.log("LAST WORD ECHO TRIGGERED!");

                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Octane",
                "Replenish §1% of your {MAXMANA} every time you receive damage while being stunned.",
                1,
                Data.Rarity.SINGULAR,
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
                [
                    new Trigger({
                        name: "octane_Trigger",
                        type: Data.TriggerType.ON_RECV_DAMAGE,
                        checker: function() {
                            return this.owner.isStunned;
                        },
                        behavior: function() {
                            console.log("OCTANE ECHO TRIGGERED");

                            //const val = Math.round(this.owner.maxMana * (this.variables.mana_regen/100));

                            this.owner.addBaseStat(new Stat({ effect: Data.Effect.MANA, theorical: this.variables.mana_regen, isPercentage: true }));
                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Hold the Line",
                "Replenish §1% of your {MAXHEALTH} every time you receive damage while blocking.",
                1,
                Data.Rarity.SINGULAR,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_BLOCK,
                        theorical: [10, 13],
                        isPercentage: true
                    })
                ],
                "\"When all seems lost, holding the line is not a choice; it's a sacred duty to defend what you hold dear.\" — Khej, Raincaller of Atalan",
                {
                    "health_regen": [5, 8],
                },
                [
                    new Trigger({
                        name: "holdTheLine_Trigger",
                        type: Data.TriggerType.ON_RECV_DAMAGE,
                        checker: function() {
                            return this.owner.isBlocking;
                        },
                        behavior: function() {
                            console.log("HOLD THE LINE ECHO TRIGGERED");

                            this.owner.addBaseStat(new Stat({ effect: Data.Effect.HEALTH, theorical: this.variables.health_regen, isPercentage: true }));
                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Fencer's Mark",
                "Replenish §1% of your {MAXSTAMINA} every time you dodge an attack.",
                1,
                Data.Rarity.PRECIOUS,
                [
                    new Stat({
                        effect: Data.Effect.SPEED,
                        theorical: [1, 2]
                    }),
                    new Stat({
                        effect: Data.Effect.DODGE,
                        theorical: [1, 1],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.ACCURACY,
                        theorical: [2, 3],
                        isPercentage: true
                    })
                ],
                "To strike fast is to escape beautifully!",
                {
                    "stamina_regen": [5, 15]
                },
                [
                    new Trigger({
                        name: "fencersMark_Trigger",
                        type: Data.TriggerType.ON_RECV_DODGED,
                        behavior: function() {
                            console.log("FENCER'S MARK ECHO TRIGGERED!!");

                            this.owner.addBaseStat(new Stat({ effect: Data.Effect.STAMINA, theorical: this.variables.stamina_regen, isPercentage: true }));
                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Nemesis",
                "Each time you attack, you additionally deal §1% of the damage you received during the previous round.",
                1,
                Data.Rarity.GRAND,
                [
                    new Stat({
                        effect: Data.Effect.PROTECTION,
                        theorical: [-4, -8],
                        isPercentage: true
                    })
                ],
                "Whoever hides his anger ensures his revenge.",
                {
                    "extra_damage": [15, 25],
                    "accumulated_damage": 0
                },
                [
                    new Trigger({
                        name: "nemesis_accumulateDamageTrigger",
                        type: Data.TriggerType.ON_RECV_DAMAGE,
                        behavior: function() {
                            console.log("NEMESIS ACCUMULATOR TRIGGERED!");

                            this.variables.accumulated_damage += game.battle.receivedDamage;
                            console.log("Adding " + game.battle.receivedDamage + " to accumulator (now " + this.variables.accumulated_damage + ")");
                        }
                    }),
                    new Trigger({
                        name: "nemesis_accumulatorResetter",
                        type: Data.TriggerType.ON_TURN_END,
                        behavior: function() {
                            console.log("NEMESIS RESETTER TRIGGERED!!");

                            this.variables.accumulated_damage = 0;
                        }
                    }),
                    new Trigger({
                        name: "nemesis_damageAdd",
                        type: Data.TriggerType.ON_DEAL_DAMAGE,
                        behavior: function() {
                            console.log("NEMESIS DAMAGE BOOSTED TRIGGERED!");

                            game.battle.params.crit_damage += Math.round(this.variables.accumulated_damage * (this.variables.extra_damage/100));
                        }
                    })
                ],
                Data.EchoType.WEAPON,
            ),
            new Echo(
                "Cannibal Instinct",
                "For each bleeding tick, you gain §1% {MODIF_DMG_TOTAL} (stackable up to §2%). This effect fades away if you are stunned.",
                1,
                Data.Rarity.MYTHIC,
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
                "Obliterate",
                "Any critical hit with this weapon on a stunned enemy will instantly destroy their entire shield.",
                1,
                Data.Rarity.MYTHIC,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_ACCURACY_STUN,
                        theorical: [3, 6],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.CRIT_LUK,
                        theorical: [5, 8],
                        isPercentage: true
                    })
                ],
                "Hitting first is only meant to prepare better for a deadlier strike.",
                {},
                [],
                Data.EchoType.WEAPON
            ),
            new Echo(
                "Relentless",
                "Each critical hit generates a shield which value equals §1% of your {MAXHEALTH} (stackable).",
                1,
                Data.Rarity.SINGULAR,
                [],
                "When facing an insurmountable foe, the only defense is a relentless attack that leaves no room for their counteroffensive.",
                {
                    "shield_bonus": [4, 5],
                },
                [
                    new Trigger({
                        name: "relentless_Trigger",
                        type: Data.TriggerType.ON_DEAL_CRITICAL,
                        behavior: function() {
                            console.log("RELENTLESS ECHO TRIGGERED");
                            this.owner.applyEffects(
                                this,
                                this.owner,
                                [
                                    new Stat({ effect: Data.Effect.SHIELD, theorical: this.variables.shield_bonus, duration: 2 })
                                ]
                            );
                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Opportunistic",
                "Each enemy you stun grants you a §1% {MODIF_ACCURACY_STUN} bonus on the next round, for one round.",
                1,
                Data.Rarity.SINGULAR,
                [],
                "Seize this momentum, strike, strike again!",
                {
                    "stun_accuracy_bonus": [10, 20]
                },
                [
                    new Trigger({
                        name: "opportunistic_Trigger",
                        type: Data.TriggerType.ON_DEAL_STUN,
                        behavior: function() {
                            console.log("OPPORTUNISTIC ECHO TRIGGERED");
                            this.owner.applyEffects(
                                this,
                                this.owner,
                                [
                                    new Stat({effect: Data.Effect.MODIF_ACCURACY_STUN, theorical: this.variables.stun_accuracy_bonus, isPercentage: true, duration: 1})
                                ]
                            );
                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Corrosive Blades",
                "Hitting an enemy with this weapon reduces their {PROTECTION} by §1% (stackable, forever).",
                1,
                Data.Rarity.PRECIOUS,
                [],
                "Where the kiss of steel meets the power of time.",
                {
                    "protection_debuff": [-1, -3]
                },
                [
                    new Trigger({
                        name: "corrosiveBlades_Trigger",
                        type: Data.TriggerType.ON_DEAL_WEAPON,
                        checker: function() {
                            return game.battle.selectedWeapon === this.parent;
                        },
                        behavior: function() {
                            console.log("CORROSIVE BLADES ECHO TRIGGERED");
                            const tar = game.battle.target[game.battle.targetTracker];

                            tar.applyEffects(
                                this,
                                this.origin,
                                [
                                    new Stat({effect: Data.Effect.PROTECTION, theorical: this.variables.protection_debuff, isPercentage: true, duration: -1})
                                ]
                            );
                        }
                    })
                ],
                Data.EchoType.WEAPON,
            ),
            new Echo(
                "Reprieve",
                "Each {PROTECTION} malus you receive grants you with a {SHIELD} that equals twice that malus amount and that lasts 2 rounds.",
                1,
                Data.Rarity.REGULAR,
                [],
                "Even peace awaits in the eye of the storm.",
                {},
                [
                    new Trigger({
                        name: "reprieve_Trigger",
                        type: Data.TriggerType.ON_RECV_EFFECTS,
                        behavior: function() {
                            console.log("REPRIEVE TRIGGER DETECTED!");

                            const eff = game.battle.appliedEffects;
                            const valid = eff.find(x => x.effect === Data.Effect.PROTECTION);

                            if(valid) {
                                console.log("VALIDATED SHIELD CHECK");

                                this.owner.applyEffects(
                                    this,
                                    this.origin,
                                    [
                                        new Stat({effect: Data.Effect.SHIELD, theorical: Math.abs(valid.getValue()*2), duration: 2})
                                    ]
                                );
                            }
                        }
                    })
                ],
                Data.EchoType.ARMOR,
            ),
            new Echo(
                "Anchorite",
                "Gain a §1% {MODIF_DMG_TOTAL} and a §2% {MODIF_HEAL_GIVEN} bonuses on rounds you don't receive any damage (stackable, forever).",
                1,
                Data.Rarity.GRAND,
                [],
                "Amidst the deafening silence of loneliness, the mind is free to concentrate on the whispers of the soul.",
                {
                    "total_damage_bonus": [1, 3],
                    "given_heal_bonus": [1, 3],
                    "has_been_damaged": false
                },
                [
                    new Trigger({
                        name: "anchorite_accumulateDamageTrigger",
                        type: Data.TriggerType.ON_RECV_DAMAGE,
                        behavior: function() {
                            console.log("ANCHORITE ACCUMULATOR TRIGGERED!");

                            this.variables.has_been_damaged = true;
                        }
                    }),
                    new Trigger({
                        name: "anchorite_accumulatorResetter",
                        type: Data.TriggerType.ON_TURN_END,
                        behavior: function() {
                            console.log("ANCHORITE GIVER & RESETTER TRIGGERED!!");

                            if(!this.variables.has_been_damaged) {
                                console.log("ANCHORITE BONUS TRIGGERED :D");

                                this.owner.applyEffects(
                                    this,
                                    this.origin,
                                    [
                                        new Stat({effect: Data.Effect.MODIF_DMG_TOTAL, theorical: this.variables.total_damage_bonus, isPercentage: true, duration: -1}),
                                        new Stat({effect: Data.Effect.MODIF_HEAL_GIVEN, theorical: this.variables.given_heal_bonus, isPercentage: true, duration: -1})
                                    ]
                                );
                            }

                            this.variables.has_been_damaged = false;
                        }
                    }),
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Erode Away",
                "Hitting an enemy with this weapon reduces their {MAXHEALTH} by §1% (stackable, forever).",
                1,
                Data.Rarity.MYTHIC,
                [],
                "Weathering, worn out by the winds of time.",
                {
                    "maximum_health_debuff": [-1, -3]
                },
                [
                    new Trigger({
                        name: "erodeAway_Trigger",
                        type: Data.TriggerType.ON_DEAL_WEAPON,
                        checker: function() {
                            return game.battle.selectedWeapon === this.parent;
                        },
                        behavior: function() {
                            console.log("ERODE AWAY ECHO TRIGGERED");
                            const tar = game.battle.target[game.battle.targetTracker];
                            
                            tar.applyEffects(
                                this,
                                this.origin,
                                [
                                    new Stat({effect: Data.Effect.MAXHEALTH, theorical: this.variables.maximum_health_debuff, isPercentage: true, duration: -1})
                                ]
                            );
                        }
                    })
                ],
                Data.EchoType.WEAPON,
            ),
            new Echo(
                "Momentum Shift",
                "Convert §1% of all raw {WITHERING} damage you receive into {SHIELD} points that last two rounds.",
                1,
                Data.Rarity.PRECIOUS,
                [],
                "It's not about taking damage ; it's about absorbing it.",
                {
                    "damage_conversion": [3, 5],
                },
                [
                    new Trigger({
                        name: "momentum-shift_Trigger",
                        type: Data.TriggerType.ON_RECV_WITHERING,
                        behavior: function() {
                            console.log("Momentum Shift Echo Triggered!");

                            const value = Math.round(game.battle.params.magi_damage * (this.variables.damage_conversion/100));

                            if(value > 0) this.owner.applyEffects(
                                this,
                                this.owner,
                                [
                                    new Stat({ effect: Data.Effect.SHIELD, theorical: value, duration: 2 })
                                ]
                            );
                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Caltrops",
                "Hitting an enemy with this weapon plants Caltrops. When that enemy moves, they will receive damage that equals §1% of your {MIGHT} and the caltrops will be removed.",
                1,
                Data.Rarity.PRECIOUS,
                [],
                "Watch your step...",
                {
                    "caltrop_damage": [20, 25],
                },
                [
                    new Trigger({
                        name: "caltrops_planterTrigger",
                        type: Data.TriggerType.ON_DEAL_WEAPON,
                        checker: function() {
                            return game.battle.selectedWeapon === this.parent
                                && !getcTarget().triggers.some(x => x.name === "caltrops_damageTrigger")
                                && getcTarget() instanceof Enemy;
                        },
                        behavior: function() {
                            console.log("CALTROPS PLANTED!!");

                            const tar = getcTarget();
                            const damage = Math.round(this.owner.might * (this.variables.caltrop_damage/100));
                            const trig = new Trigger({
                                name: "caltrops_damageTrigger",
                                type: Data.TriggerType.ON_RECV_MOVE,
                                behavior: function() {
                                    console.log("CALTROPS DAMAGE TRIGGERED!!");

                                    this.owner.receiveDamage({
                                        phys_damage: damage,
                                        magi_damage: 0,
                                        crit_damage: 0,
                                        ignoreProtection: false,
                                        armorPiercing: 0
                                    })
                                },
                                singleUse: true,
                                owner: tar
                            });
                            tar.triggers.push(trig);
                        }
                    })
                ],
                Data.EchoType.WEAPON
            ),
            new Echo(
                "Dedication",
                "Missing an attack grants you with a §1% {MODIF_DMG_TOTAL} and §2% {ACCURACY} bonus. This effect fades away when you hit a target.",
                1,
                Data.Rarity.SINGULAR,
                [
                    new Stat({
                        effect: Data.Effect.RES_STUN,
                        theorical: [3, 4],
                        isPercentage: true,
                    })
                ],
                "Greatness is not meant for men who never failed ; it is meant for men who never gave up.",
                {
                    "total_damage_bonus": [10, 12],
                    "accuracy_bonus": [4, 6],
                },
                [
                    new Trigger({
                        name: "dedication_applyEffectsTrigger",
                        type: Data.TriggerType.ON_DEAL_MISSED,
                        behavior: function() {
                            console.log("DEDICATION BONUS GIVER ACTIVATED");

                            this.owner.applyEffects(
                                this,
                                this.owner,
                                [
                                    new Stat({ effect: Data.Effect.MODIF_DMG_TOTAL, theorical: this.variables.total_damage_bonus, isPercentage: true, duration: -1 }),
                                    new Stat({ effect: Data.Effect.ACCURACY, theorical: this.variables.accuracy_bonus, isPercentage: true, duration: -1 })
                                ]
                            );
                        }
                    }),
                    new Trigger({
                        name: "dedication_removeEffectsTrigger",
                        type: [Data.TriggerType.ON_DEAL_SKILL, Data.TriggerType.ON_DEAL_WEAPON],
                        behavior: function() {
                            console.log("DEDICATION BONUS REMOVER TRIGGERED");

                            this.owner.removeActiveEffect("dedication");
                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Rekindle",
                "Casting a skill on an ally will restore their {MANA} to §1% of their missing {HEALTH}.",
                1,
                Data.Rarity.GRAND,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_HEAL_GIVEN,
                        theorical: [-3, -5],
                        isPercentage: true
                    })
                ],
                "Light shines brighter in the darkness.",
                {
                    "mana_restoration": [25, 32]
                },
                [
                    new Trigger({
                        name: "rekindle_Trigger",
                        type: Data.TriggerType.ON_DEAL_SKILL,
                        behavior: function() {
                            console.log("REKINDLE TRIGGERED");

                            const tar = getcTarget();

                            const missingHealth = tar.maxHealth - tar.health;
                            const val = Math.round(missingHealth * (this.variables.mana_restoration/100));
                            if(tar instanceof Strider) {
                                tar.addBaseStat(new Stat({
                                    effect: Data.Effect.MANA,
                                    theorical: val,
                                }));
                            }
                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Bleeding Heart",
                "Each bleeding tick in the fight regenerates §1% of your {MAXHEALTH}.",
                1,
                Data.Rarity.MYTHIC,
                [
                    new Stat({
                        effect: Data.Effect.BLEED_INCURABLE,
                    }),
                    new Stat({
                        effect: Data.Effect.PROTECTION,
                        theorical: [-5, -7],
                        isPercentage: true
                    })
                ],
                "Behold this substance of life slipping away; take it, cherish it, immerse yourself in it, for it is the most sacred of essences!",
                {
                    "maxhealth_regen": [1, 3]
                },
                [],
                Data.EchoType.WEAPON
            ),
            new Echo(
                "Nebula Trap",
                "Attacking an enemy plants a Nebula Trap on them. The next time they attack a single Strider, they will have a base §1% + your {MODIF_CHANCE_STUN} to be stunned for one round.",
                1,
                Data.Rarity.PRECIOUS,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_CHANCE_STUN,
                        theorical: [-3, -5],
                        isPercentage: true
                    })
                ],
                "The light we can't see isn't always dead.",
                {
                    "base_stun_chance": [15, 18]
                },
                [
                    new Trigger({
                        name: "nebulaTrap_planterTrigger",
                        type: [Data.TriggerType.ON_DEAL_WEAPON, Data.TriggerType.ON_DEAL_SKILL],
                        checker: function() {
                            return !getcTarget().triggers.some(x => x.name === "nebulaTrap_stunTrigger")
                                && getcTarget() instanceof Enemy
                        },
                        behavior: function() {
                            console.log("NEBULA TRAP PLANTED!!");

                            const stunChance = this.variables.base_stun_chance;
                            const originObj = this;
                            const originUser = this.owner;
                            const tar = getcTarget();
                            const trig = new Trigger({
                                name: "nebulaTrap_stunTrigger",
                                type: Data.TriggerType.ON_DEAL_ATTACK,
                                checker: function() {
                                    return game.battle.target.length === 1 && getcTarget() instanceof Strider;
                                },
                                behavior: function() {
                                    console.log("NEBULA TRAP STUN TRIGGERED!!");

                                    this.owner.applyEffects(
                                        originObj,
                                        originUser,
                                        [
                                            new Stat({ effect: Data.Effect.STUN, chance: stunChance, duration: 1 }),
                                        ]
                                    );
                                },
                                singleUse: true,
                                owner: tar
                            });
                            tar.triggers.push(trig);
                        }
                    })
                ],
                Data.EchoType.ANY
            ),
            new Echo(
                "Soul Maelstrom",
                "Attacking an enemy plants a trap on them. The next time they attack, their target will steal §1% of the enemy’s {STAMINA} and convert it to replenish their own {MANA}.",
                1,
                Data.Rarity.SINGULAR,
                [],
                "Isn't vital, muscular and spiritual energy all the same?",
                {
                    "base_stamina_steal": [15, 20]
                },
                [
                    new Trigger({
                        name: "soulMaelstrom_planterTrigger",
                        type: [Data.TriggerType.ON_DEAL_WEAPON, Data.TriggerType.ON_DEAL_SKILL],
                        checker: function() {
                            return !getcTarget().triggers.some(x => x.name === "soulMaelstrom_theftTrigger")
                                && getcTarget() instanceof Enemy;
                        },
                        behavior: function() {
                            console.log("SOUL MAELSTROM TRAP PLANTED!!");

                            const tar = getcTarget();
                            const stolenAmount = Math.round(tar.maxStamina * (this.variables.base_stamina_steal/100));
                            const trig = new Trigger({
                                name: "soulMaelstrom_theftTrigger",
                                type: Data.TriggerType.ON_DEAL_ATTACK,
                                checker: function() {
                                    return game.battle.target.length === 1 && getcTarget() instanceof Strider;
                                },
                                behavior: function() {
                                    console.log("SOUL MAELSTROM TRAP THEFT TRIGGERED!!");

                                    this.owner.removeBaseStat(new Stat({
                                        effect: Data.Effect.STAMINA,
                                        theorical: stolenAmount,
                                    }));
                                    getcTarget().addBaseStat(new Stat({
                                        effect: Data.Effect.MANA,
                                        theorical: stolenAmount
                                    }));
                                },
                                singleUse: true,
                                owner: tar
                            });
                            tar.triggers.push(trig);
                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Accumulation",
                "Blocking generates {SHIELD} points that are equal to the amount of damage dealt by this weapon since the beginning of the fight. Blocking resets this value.",
                1,
                Data.Rarity.GRAND,
                [],
                "Harboring a grudge is not a sin ; it's a strategy.",
                {
                    "accumulator": 0,
                },
                [
                    new Trigger({
                        name: "accumulation_damageTrigger",
                        type: Data.TriggerType.ON_DEAL_WEAPON,
                        checker: function() {
                            return game.battle.selectedWeapon === this.parent;
                        },
                        behavior: function() {
                            this.variables.accumulator += game.battle.receivedDamage;
                        }
                    }),
                    new Trigger({
                        name: "accumulation_blockTrigger",
                        type: Data.TriggerType.ON_BLOCK_BEGIN,
                        behavior: function() {
                            const amount = this.variables.accumulator;

                            if(amount > 0) {
                                this.owner.applyEffects(
                                    this,
                                    this.owner,
                                    [
                                        new Stat({ effect: Data.Effect.SHIELD, theorical: amount, duration: 2 }),
                                    ]
                                );
                                this.variables.accumulator = 0;
                            }
                        }
                    })
                ],
                Data.EchoType.WEAPON
            ),
            new Echo(
                "Crystalize",
                "Using a Consumable will supercharge your next attack with extra {SPIRIT} damage that equal the consumable’s toxicity, up to §1 points.",
                1,
                Data.Rarity.SINGULAR,
                [],
                "Reconditioning is, like every psychological mechanic, all just a chemical reaction.",
                {
                    "max_damage": [25, 32],
                },
                [],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Overcharge",
                "Getting stunned regenerates §1% of your {MAXMANA}.",
                1,
                Data.Rarity.REGULAR,
                [],
                "You can find strength even in the greatest pain.",
                {
                    "mana_regeneration": [8, 11]
                },
                [
                    new Trigger({
                        name: "overcharge_Trigger",
                        type: Data.TriggerType.ON_RECV_STUN,
                        behavior: function() {
                            this.owner.addBaseStat(new Stat({
                                effect: Data.Effect.MANA,
                                theorical: this.variables.mana_regeneration,
                                isPercentage: true
                            }));
                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Flutter",
                "Moving an enemy applies {SHIELD} points on yourself that equal §1% of the target's {MAXHEALTH} and last two rounds.",
                1,
                Data.Rarity.REGULAR,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_CHANCE_MOVE,
                        theorical: [5, 7],
                        isPercentage: true
                    })
                ],
                "Quote",
                {
                    "shield": [8, 10]
                },
                [
                    new Trigger({
                        name: "flutter_Trigger",
                        type: Data.TriggerType.ON_DEAL_MOVE,
                        checker: function() {
                            return game.battle.target.length > 0;
                        },
                        behavior: function() {
                            const tar = getcTarget();
                            if(tar) {
                                const amount = Math.round(tar.maxHealth * (this.variables.shield/100));

                                if(amount > 0) {
                                    this.owner.applyEffects(
                                        this,
                                        this.owner,
                                        [
                                            new Stat({ effect: Data.Effect.SHIELD, theorical: amount, duration: 2 }),
                                        ]
                                    );
                                }
                            }
                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Extraction",
                "Any critical blow that you deal regenerates §1% of your {MAXHEALTH}.",
                1,
                Data.Rarity.REGULAR,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_CRIT_WEAPON,
                        theorical: [5, 6],
                        isPercentage: true
                    })
                ],
                "Quote",
                {
                    "health_regen": [7, 9]
                },
                [
                    new Trigger({
                        name: 'extraction_Trigger',
                        type: Data.TriggerType.ON_DEAL_CRITICAL,
                        behavior: function() {
                            this.owner.addBaseStat(new Stat({
                                effect: Data.Effect.HEALTH,
                                theorical: this.variables.health_regen,
                                isPercentage: true
                            }));
                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Abhorrent Curse",
                "Killing a stunned enemy regenerates all of your {MANA}.",
                1,
                Data.Rarity.MYTHIC,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_CHANCE_STUN,
                        theorical: [6, 8],
                        isPercentage: true
                    })
                ],
                "Don't let it go to waste! Harvest it. It can't suffer anyway...",
                {},
                [],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Sanguine Harvest",
                "Killing an enemy with a Deathblow regenerates §1% of your {MAXHEALTH}.",
                1,
                Data.Rarity.SINGULAR,
                [
                    new Stat({
                        effect: Data.Effect.CRIT_LUK,
                        theorical: [5, 8],
                        isPercentage: true
                    })
                ],
                "Quote",
                {
                    "health_regen": [10, 13]
                },
                [
                    new Trigger({
                        name: 'sanguineHarvest_Trigger',
                        type: Data.TriggerType.ON_DEAL_DEATHBLOW,
                        behavior: function() {
                            this.owner.addBaseStat(new Stat({
                                effect: Data.Effect.HEALTH,
                                theorical: this.variables.health_regen,
                                isPercentage: true
                            }));
                        }
                    })
                ],
                Data.EchoType.WEAPON
            ),
            new Echo(
                "Debilitating Curse",
                "Hitting an enemy with this weapon reduces their {DODGE} by §1% (stackable, forever).",
                1,
                Data.Rarity.GRAND,
                [],
                "Quote",
                {
                    "dodge_reduction": [-1, -2]
                },
                [
                    new Trigger({
                        name: "debilitatingCurse_Trigger",
                        type: Data.TriggerType.ON_DEAL_WEAPON,
                        checker: function() {
                            return game.battle.selectedWeapon === this.parent;
                        },
                        behavior: function() {
                            console.log("DEBILITATING CURSE ECHO TRIGGERED");
                            const tar = getcTarget();

                            tar.applyEffects(
                                this,
                                this.origin,
                                [
                                    new Stat({effect: Data.Effect.DODGE, theorical: this.variables.dodge_reduction, isPercentage: true, duration: -1})
                                ]
                            );
                        }
                    })
                ],
                Data.EchoType.WEAPON
            ),
            new Echo(
                "Valet",
                "Healing an ally whose {HEALTH} is inferior to yours also heals you with §1% of this healing amount.",
                1,
                Data.Rarity.SINGULAR,
                [],
                "Quote",
                {
                    "healing_amount": [45, 50]
                },
                [
                    new Trigger({
                        name: "valet_Trigger",
                        type: Data.TriggerType.ON_DEAL_HEAL,
                        behavior: function() {
                            console.log("VALET ECHO TRIGGERED");

                            const amount = Math.round(game.battle.healedAmount * (this.variables.healing_amount/100));
                            this.owner.addBaseStat(new Stat({
                                effect: Data.Effect.HEALTH,
                                theorical: amount,
                            }));
                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Mind Stability",
                "Losing {MANA} boosts your {SPIRIT} with the amount of {MANA} you've lost, for one round.",
                1,
                Data.Rarity.PRECIOUS,
                [],
                "Quote",
                {},
                [
                    new Trigger({
                        name: "mindStability_RecvEffectsTrigger",
                        type: Data.TriggerType.ON_RECV_EFFECTS,
                        behavior: function() {
                            console.log("MIND STABILITY: RECV EFFECTS TRIGGER DETECTED!");

                            const eff = game.battle.appliedEffects;
                            const valid = eff.find(x => x.effect === Data.Effect.SPIRIT);

                            if(valid && valid.getValue() < 0) {
                                console.log("VALIDATED MANA CHECK");

                                this.owner.applyEffects(
                                    this,
                                    this.origin,
                                    [
                                        new Stat({effect: Data.Effect.SPIRIT, theorical: Math.abs(valid.getValue()), duration: 2})
                                    ]
                                );
                            }
                        }
                    }),
                    new Trigger({
                        name: "mindStability_CastSkillTrigger",
                        type: Data.TriggerType.ON_REMOVE_MANA,
                        behavior: function() {
                            console.log("MIND STABILITY: CAST TRIGGER DETECTED!");
                            
                            const valid = this.owner.removedMana > 0;
                            if(valid) {
                                console.log("VALIDATED MANA CHECK");

                                this.owner.applyEffects(
                                    this,
                                    this.origin,
                                    [
                                        new Stat({effect: Data.Effect.SPIRIT, theorical: Math.abs(this.owner.removedMana), duration: 2})
                                    ]
                                )
                            }
                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Fragmentation",
                "Damage you deal to a single enemy will also be evenly distributed to decay other enemies' {STAMINA}.",
                1,
                Data.Rarity.SINGULAR,
                [],
                "Quote",
                {},
                [
                    new Trigger({
                        name: "fragmentation_Trigger",
                        type: [Data.TriggerType.ON_DEAL_WEAPON, Data.TriggerType.ON_DEAL_SKILL],
                        checker: function() {
                            return game.battle.target.length === 1;
                        },
                        behavior: function() {
                            console.log("FRAGMENTATION ECHO TRIGGERED!");

                            const targets = game.battle.enemies.filter(x => x !== getcTarget() && !x.isDead());
                            const val = Math.round(game.battle.receivedDamage/targets.length);

                            targets.forEach(tar => {
                                tar.removeBaseStat(new Stat({
                                    effect: Data.Effect.STAMINA,
                                    theorical: val
                                }));
                            });
                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Brambleheart",
                "Moving an enemy reduces their {MAXHEALTH} by §1% (stackable, forever).",
                1,
                Data.Rarity.REGULAR,
                [],
                "Quote",
                {
                    "maxhealth_reduction": [-4, -5],
                },
                [
                    new Trigger({
                        name: "brambleheart_Trigger",
                        type: Data.TriggerType.ON_DEAL_MOVE,
                        behavior: function() {
                            console.log("BRAMBLEHEART ECHO TRIGGERED");
                            const tar = game.battle.target[game.battle.targetTracker];

                            tar.applyEffects(
                                this,
                                this.origin,
                                [
                                    new Stat({effect: Data.Effect.MAXHEALTH, theorical: this.variables.maxhealth_reduction, isPercentage: true, duration: -1})
                                ]
                            );
                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Shared Penance",
                "When you are targeted in a group attack, other targeted allies will receive a §1% {MAXHEALTH} and §2% {PROTECTION} bonus for 1 round.",
                1,
                Data.Rarity.SINGULAR,
                [],
                "Quote",
                {
                    "maxhealth_bonus": [25, 30],
                    "protection_bonus": [6, 8]
                },
                [
                    new Trigger({
                        name: "sharedPenance_Trigger",
                        type: Data.TriggerType.ON_RECV_SKILL,
                        behavior: function() {
                            console.log("SHARED PENANCE ECHO TRIGGERED");

                            const valid = game.battle.target.filter(x => x !== this.owner && !x.isDead());
                            valid.forEach(al => {
                                console.log("SHARED PENANCE ECHO APPLIED ON " + al.name);

                                al.applyEffects(
                                    this,
                                    this.origin,
                                    [
                                        new Stat({effect: Data.Effect.MAXHEALTH, theorical: this.variables.maxhealth_bonus, isPercentage: true, duration: 1}),
                                        new Stat({effect: Data.Effect.PROTECTION, theorical: this.variables.protection_bonus, isPercentage: true, duration: 1})
                                    ]
                                );
                            })
                        }
                    })
                ],
                Data.EchoType.ARMOR
            ),
            new Echo(
                "Famined Blade",
                "Attacking with this weapon adds a Famine stack. When 3 stacks are reached, the next strike with this weapon will be a guaranteed critical blow.",
                1,
                Data.Rarity.REGULAR,
                [],
                "Quote",
                {},
                [],
                Data.EchoType.WEAPON
            ),
            new Echo(
                "Shield Echoes",
                "Blocking applies a §1% {MODIF_BLOCK} bonus on other allies (stackable, forever).",
                1,
                Data.Rarity.GRAND,
                [],
                "Quote",
                {
                    "block_bonus": [26, 28]
                },
                [
                    new Trigger({
                        name: "shieldEchoes_Trigger",
                        type: Data.TriggerType.ON_BLOCK_BEGIN,
                        behavior: function() {
                            console.log("SHIELD ECHOES ECHO TRIGGERED!");

                            const valid = game.battle.allies.filter(x => !x.isDead() && x !== this.owner);

                            valid.forEach(al => {
                                al.applyEffects(
                                    this,
                                    this.origin,
                                    [
                                        new Stat({effect: Data.Effect.MODIF_BLOCK, theorical: this.variables.block_bonus, isPercentage: true, duration: -1})
                                    ]
                                );
                            });
                        }
                    })
                ],
                Data.EchoType.ARMOR
            )
        ];

        for (const echo of echoes) {
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

        for (const sigilCorruptEffect of sigilCorruptEffects) {
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
                Data.Rarity.GRAND,
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
                Data.Rarity.SINGULAR,
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
                "Haste Ring",
                "To be swift without taking heed is imprudent. To take heed without hastening is equally so.",
                101,
                10,
                Data.Rarity.SINGULAR,
                [
                    new Stat({
                        effect: Data.Effect.SPEED,
                        theorical: [2, 4],
                    }),
                    new Stat({
                        effect: Data.Effect.MAXMANA,
                        theorical: [20, 25]
                    }),
                ],
            ),
            new Trinket(
                "Solana's Ring of the Sun",
                "Whoever wears the ring, holds the power of the sun... for Solana's soul is trapped within its nebula's essence.",
                106,
                10000,
                Data.Rarity.MYTHIC,
                [
                    new Stat({
                        effect: Data.Effect.MAXHEALTH,
                        theorical: [200, 220]
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_HEAL_GIVEN,
                        theorical: [15, 18],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_DMG_WEAPON,
                        theorical: [5, 10],
                        isPercentage: true
                    }),
                ]
            ),
            new Trinket(
                "Ring of Aela",
                "She knew Tor would not give up ; he was focused, devoted to ending her life. And she accepted the challenge.",
                44,
                100,
                Data.Rarity.PRECIOUS,
                [
                    new Stat({
                        effect: Data.Effect.MIGHT,
                        theorical: [50, 55]
                    }),
                    new Stat({
                        effect: Data.Effect.MAXSTAMINA,
                        theorical: [150, 160]
                    })
                ]
            ),
            new Trinket(
                "Ring of Tor",
                "He bent every effort towards the fell of this furious warrior. Yet, Aela stood like a mountain.",
                45,
                100,
                Data.Rarity.PRECIOUS,
                [
                    new Stat({
                        effect: Data.Effect.SPIRIT,
                        theorical: [50, 55]
                    }),
                    new Stat({
                        effect: Data.Effect.MAXMANA,
                        theorical: [150, 160]
                    })
                ]
            ),
            new Trinket(
                "Wedding Ring of Tor and Aela",
                "At dawn, as the sun rose and both their strength finally faded, they contemplated each other in awe, exhaustion, and admiration.",
                46,
                10000,
                Data.Rarity.MYTHIC,
                [
                    new Stat({
                        effect: Data.Effect.SPIRIT,
                        theorical: 75,
                    }),
                    new Stat({
                        effect: Data.Effect.MIGHT,
                        theorical: 75
                    }),
                    new Stat({
                        effect: Data.Effect.MAXHEALTH,
                        theorical: 150
                    }),
                    new Stat({
                        effect: Data.Effect.MAXSTAMINA,
                        theorical: 150
                    }),
                    new Stat({
                        effect: Data.Effect.MAXMANA,
                        theorical: 150
                    }),
                ],
                2,
                new Echo(
                    "Unified Strength",
                    "At the beginning of every fight, any ally wearing the Ring of Tor or the Ring of Aela will receive half of this ring bearer's {SPIRIT} and {MIGHT} as a permanent bonus until the end of the fight.",
                    1,
                    Data.Rarity.MYTHIC,
                    [
                        new Stat({
                            effect: Data.Effect.DODGE,
                            theorical: [-8, -10],
                            isPercentage: true
                        }),
                    ],
                    "Quote",
                    {},
                    [],
                    Data.EchoType.TRINKET
                )
            ),
            new Trinket(
                "Engraved Moonhorn",
                "The Moon bathed Koruk in silver; his battered and feeble body convulsed; and from his lifeless eyes, he cried out to the night.",
                39,
                10,
                Data.Rarity.PRECIOUS,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_HEAL_GIVEN,
                        theorical: [10, 12],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MAXMANA,
                        theorical: [20, 25]
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_DMG_SKILL,
                        theorical: [-5, -7],
                        isPercentage: true
                    })
                ],
            ),
            new Trinket(
                "Omen Insignia",
                "\"I may see dragons in my mind's eye, but my quicksilver agility can dodge their fiery breath with ease.\" — Kabal, Counselor of the Queen",
                41,
                10,
                Data.Rarity.REGULAR,
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
                Data.Rarity.REGULAR,
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
                Data.Rarity.SINGULAR,
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
                Data.Rarity.PRECIOUS,
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
                "Talisman of Fervour",
                "\"My guard? Do you think I care a whit about my guard? Why should I bother honing my guard when I can floor anyone with a single blow?\" - Cialto, Champion Swordsman",
                18,
                10,
                Data.Rarity.SINGULAR,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_DMG_WEAPON,
                        theorical: [15, 18],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.WARDING,
                        theorical: [-8, -11],
                    }),
                ],
            ),
            new Trinket(
                "Trapped Nebula",
                "A shifting storm howls in this sphere; warm and golden, cold and black, it twirls, revealing temporal fragments dating back to the earliest ages of Mithor.",
                23,
                10,
                Data.Rarity.MYTHIC,
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
                Data.Rarity.PRECIOUS,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_CHANCE_MOVE,
                        theorical: [20, 30],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.RESILIENCE,
                        theorical: [12, 15],
                    })
                ]
            ),
            new Trinket(
                "Fire Lizard Talisman",
                "\"Quote\" - The Ashen Warden",
                29,
                10,
                Data.Rarity.GRAND,
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
                Data.Rarity.PRECIOUS,
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
                Data.Rarity.PRECIOUS,
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
                Data.Rarity.MYTHIC,
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
                Data.Rarity.PRECIOUS,
                [
                    new Stat({
                        effect: Data.Effect.REGEN_MANA,
                        theorical: [5, 8],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_ACCURACY_SKILL,
                        theorical: [6, 9],
                        isPercentage: true,
                    }),
                    new Stat({
                        effect: Data.Effect.MAXMANA,
                        theorical: [50, 60],
                        isPercentage: true,
                    })
                ]
            ),
            new Trinket(
                "Foggorth's Armored Horn",
                "\"Quote\" - Somebody",
                9,
                10,
                Data.Rarity.GRAND,
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
            ),
            new Trinket(
                "Shattered Mask of Jara",
                "Lorem ipsum",
                37,
                10000,
                Data.Rarity.RELIC,
                [
                    new Stat({
                        effect: Data.Effect.MAXMANA,
                        theorical: [150, 170],
                    }),
                    new Stat({
                        effect: Data.Effect.MAXSTAMINA,
                        theorical: [150, 170],
                    }),
                    new Stat({
                        effect: Data.Effect.ACCURACY,
                        theorical: [15, 18],
                        isPercentage: true,
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_ACCURACY_SKILL,
                        theorical: [15, 18],
                        isPercentage: true,
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_CRIT_SKILL,
                        theorical: [15, 18],
                        isPercentage: true,
                    }),

                ],
                2,
                new Echo(
                    "Jara's Cycle",
                    "Hitting an enemy with a weapon applies a §1% {MODIF_DMG_SKILL} boost to yourself. Hitting an enemy or an ally with a skill applies a §2% {MODIF_DMG_WEAPON} boost to yourself. Completing a cycle grants you a §3% {MODIF_DMG_TOTAL} and §4% {MODIF_HEAL_GIVEN}, stackable, forever.",
                    1,
                    Data.Rarity.RELIC,
                    [
                        new Stat({
                            effect: Data.Effect.MODIF_CRIT_BLEED,
                            theorical: [8, 10],
                            isPercentage: true
                        }),
                        new Stat({
                            effect: Data.Effect.MODIF_CRIT_POISON,
                            theorical: [8, 10],
                            isPercentage: true
                        }),
                    ],
                    "Lorem ipsum",
                    {
                        "bonus_skill_damage": [18, 20],
                        "bonus_weapon_damage": [18, 20],
                        "bonus_total_damage": [2, 2],
                        "bonus_given_heal": [3, 3]
                    },
                    []
                )
            ),
            new Trinket(
                "Eyeballs of the False Prophet",
                "Darkened by visions of madness, those predatory eyes radiated ineffable secrets as they shifted in their sockets. Now torn away, they ooze with a mucus of sulfur and terror. Do you feel them writhing of their own accord in your hand? Do not gaze upon them for too long.",
                4,
                1000,
                Data.Rarity.PRECIOUS,
                [
                    new Stat({
                        effect: Data.Effect.DODGE,
                        theorical: [12, 15],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_DMG_TOTAL,
                        theorical: [30, 35],
                        isPercentage: true
                    })
                ],
                2
            ),
            new Trinket(
                "Malignant Heart",
                "When Gundd fell into the star within Gusho's stomach, he survived under the protection of Lantho. However, as he cried out in despair while swimming among the souls of the damned, they rushed into his mouth, grew within him, infecting his heart. A thunderous heart attack claimed him. If it had a mouth, that heart would scream all the woes of humanity without ever falling silent.",
                16,
                1000,
                Data.Rarity.MYTHIC,
                [
                    new Stat({
                        effect: Data.Effect.MAXSTAMINA,
                        theorical: [120, 135],
                    }),
                    new Stat({
                        effect: Data.Effect.MAXHEALTH,
                        theorical: [50, 65],
                    }),
                ],
                2
            ),
            new Trinket(
                "Codex Oblivio",
                "Lorem ipsum",
                11,
                1000,
                Data.Rarity.SINGULAR,
                [
                    new Stat({
                        effect: Data.Effect.REGEN_MANA,
                        theorical: [8, 10],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.DAMAGE_REFLECTION,
                        theorical: [5, 6],
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_DMG_SKILL,
                        theorical: [8, 12],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MAXHEALTH,
                        theorical: [-30, -40],
                    }),
                ],
            ),
            new Trinket(
                "Borri's Phalanges",
                "Far behind him, amidst the prodigious howls wrenched from the trees by the wind, he discerned the cries of Borri intertwining with the barks of wolves. \"Let him perish, may he occupy them long enough,\" thought Olmir.",
                10,
                1000,
                Data.Rarity.REGULAR,
                [
                    new Stat({
                        effect: Data.Effect.PROTECTION,
                        theorical: [2, 4],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MAXHEALTH,
                        theorical: [20, 25],
                    }),
                    new Stat({
                        effect: Data.Effect.SPEED,
                        theorical: [-1, -2],
                    })
                ],
            ),
            new Trinket(
                "Saint-Ghore Scales Ring",
                "Meticulously harvested from the armored brow bones of a Saint-Ghore cobra, these razor-sharp, obsidian-tough scales cling to your finger.",
                12,
                1000,
                Data.Rarity.SINGULAR,
                [
                    new Stat({
                        effect: Data.Effect.PROTECTION,
                        theorical: [6, 8],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.DAMAGE_REFLECTION,
                        theorical: [2, 3],
                    })
                ]
            ),
            new Trinket(
                "Fluttering Stones",
                "Lorem ipsum",
                17,
                1000,
                Data.Rarity.REGULAR,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_CHANCE_MOVE,
                        theorical: [9, 13],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_CHANCE_STUN,
                        theorical: [5, 7],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.RES_STUN,
                        theorical: [10, 12],
                        isPercentage: true
                    })
                ]
            ),
            new Trinket(
                "Banished Soldier's Memento",
                "For a man needs a dear memory to remain faithful, fill his night thoughts, and keep madness at bay.",
                30,
                1000,
                Data.Rarity.SINGULAR,
                [
                    new Stat({
                        effect: Data.Effect.MAXSTAMINA,
                        theorical: [50, 55],
                    }),
                    new Stat({
                        effect: Data.Effect.SPEED,
                        theorical: [1, 1]
                    }),
                ]
            ),
            new Trinket(
                "Restless-Eyed Brooch",
                "It is difficult to accept that the way we perceive the world is unique to our species. What do the others see? What if they saw more than we do?",
                43,
                1000,
                Data.Rarity.REGULAR,
                [
                    new Stat({
                        effect: Data.Effect.ARMOR_PIERCING,
                        theorical: [6, 9],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.ACCURACY,
                        theorical: [4, 5],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MAXMANA,
                        theorical: [-15, -19]
                    }),
                ]
            ),
            new Trinket(
                "Talisman of Abyssal Essence",
                "An abyssal volcano extract is locked inside. Put it to your ear, and let the murmurs of the deep - two-headed sharks, whales as long as three hundred men - confess their darkest secrets...",
                42,
                1000,
                Data.Rarity.PRECIOUS,
                [
                    new Stat({
                        effect: Data.Effect.MODIF_DMG_SKILL,
                        theorical: [12, 15],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.PROTECTION,
                        theorical: [-5, -7],
                        isPercentage: true
                    })
                ]
            ),
            new Trinket(
                "Shattered Mirror of Regrets",
                "What's really wrong with the twisted reflection in the mirror?",
                19,
                100,
                Data.Rarity.REGULAR,
                [
                    new Stat({
                        effect: Data.Effect.DAMAGE_REFLECTION,
                        theorical: [4, 6]
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_BLOCK,
                        theorical: [8, 10],
                        isPercentage: true,
                    })
                ]
            ),
            new Trinket(
                "Brass Horseshoe",
                "That should bring you good luck, but they also say a little dirt will turn the blessing around. Let's find out.",
                7,
                100,
                Data.Rarity.REGULAR,
                [
                    new Stat({
                        effect: Data.Effect.RESILIENCE,
                        theorical: [7, 9]
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_CRIT_WEAPON,
                        theorical: [10, 12],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MIGHT,
                        theorical: [7, 8]
                    })
                ]
            ),
            new Trinket(
                "Charm of Slower Aging",
                "Quote",
                14,
                100,
                Data.Rarity.SINGULAR,
                [
                    new Stat({
                        effect: Data.Effect.MAXHEALTH,
                        theorical: [100, 115]
                    }),
                    new Stat({
                        effect: Data.Effect.REGEN_HEALTH,
                        theorical: [1, 2],
                        isPercentage: true
                    }),
                    new Stat({
                        effect: Data.Effect.MODIF_DMG_SKILL,
                        theorical: [-5, -7],
                        isPercentage: true
                    })
                ]
            )
        ];

        for (const trinket of trinkets) {
            game.all_trinkets.push(trinket);
        }
    },
    loadEquipmentSets: loadEquipmentSets = () => {
        const equipmentSets = [
            new EquipmentSet(
                "Highsteel Set",
                Data.Rarity.REGULAR,
                {
                    base: Data.Effect.HEALTH,
                    primary: Data.Effect.DODGE,
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
                            "Dodging an attack replenishes §1% of your {MAXHEALTH}. An enemy dodging one of your attacks grants you a §2% {DODGE} boost for 1 round.",
                            1,
                            Data.Rarity.REGULAR,
                            [],
                            "Blessed with agility akin to a sword forged from the air itself.",
                            {
                                "health_regen": [5, 5],
                                "dodge_boost": [4, 4],
                            },
                            [
                                new Trigger({
                                    name: "swift-as-steel_dealDodge",
                                    type: Data.TriggerType.ON_DEAL_DODGED,
                                    behavior: function() {
                                        console.info('SWIFT AS STEEL BUFF TRIGGERED');

                                        const effects = [
                                            new Stat({
                                                effect: Data.Effect.DODGE,
                                                theorical: this.variables.dodge_boost,
                                                duration: 2,
                                                isPercentage: true
                                            })
                                        ];
                                        this.owner.applyEffects(this, this.owner, effects);
                                    }
                                }),
                                new Trigger({
                                    name: "swift-as-steel_recvDodge",
                                    type: Data.TriggerType.ON_RECV_DODGED,
                                    behavior: function() {
                                        console.info('SWIFT AS STEEL BUFF TRIGGERED');

                                        this.owner.addBaseStat(new Stat({
                                            effect: Data.Effect.HEALTH,
                                            theorical: this.variables.health_regen,
                                            isPercentage: true
                                        }));
                                    }
                                })
                            ]
                        )
                    ]
                },
            ),
            new EquipmentSet(
                "Entarian Set",
                Data.Rarity.SINGULAR,
                {
                    base: Data.Effect.STAMINA,
                    primary: Data.Effect.ACCURACY,
                },
                "",
                [
                    what(game.all_armors, "entarian chestplate"),
                    what(game.all_armors, "entarian boots"),
                    what(game.all_weapons, "entarian axe"),
                    what(game.all_trinkets, "talisman of fervour"),
                    what(game.all_trinkets, "goodsight doll"),
                ],
                {
                    2: [
                        new Stat({
                            effect: Data.Effect.ACCURACY,
                            theorical: [6, 6],
                            fixed: true,
                            isPercentage: true
                        })
                    ],
                    4: [
                        new Stat({
                            effect: Data.Effect.MAXSTAMINA,
                            theorical: [30, 30],
                            fixed: true,
                        })
                    ],
                    5: [
                        new Echo(
                            "Rebalancing",
                            "Successful blows with a weapon grant a +§1 {RESILIENCE} bonus for one round and apply a -§2% {ACCURACY} debuff on the target. Critical blows with a weapon grant a +§3% {REGEN_STAMINA} bonus for 2 rounds.",
                            1,
                            Data.Rarity.SINGULAR,
                            [],
                            "Never stay still; so long as you can move, you will live.",
                            {
                                "resilience_boost": [5, 5],
                                "accuracy_debuff": [-4, -4],
                                "stamina_regen": [3, 3]
                            },
                            [
                                new Trigger({
                                    name: 'rebalancing_set',
                                    type: Data.TriggerType.ON_DEAL_WEAPON,
                                    behavior: function() {
                                        console.info('ENTARIAN SET ECHO TRIGGERED');
                                        const params = game.battle.params;
                                        const caster = game.battle.currentPlay;
                                        const target = game.battle.target[game.battle.targetTracker];

                                        const allyEffects = [
                                            new Stat({
                                                effect: Data.Effect.RESILIENCE,
                                                theorical: this.variables.resilience_boost,
                                                duration: 1
                                            }),
                                        ];
                                        const enemyEffects = [
                                            new Stat({
                                                effect: Data.Effect.ACCURACY,
                                                theorical: this.variables.accuracy_debuff,
                                                isPercentage: true,
                                                duration: 1
                                            })
                                        ]

                                        if (params.critical) allyEffects.push(new Stat({
                                            effect: Data.Effect.STAMINA,
                                            theorical: this.variables.stamina_regen,
                                            duration: 2,
                                            type: Data.StatType.ACTIVE,
                                            isPercentage: true
                                        }));

                                        caster.applyEffects(this, caster, allyEffects, params.critical);
                                        target.applyEffects(this, caster, enemyEffects, params.critical);
                                    }
                                })
                            ]
                        )
                    ]
                },
            ),
            new EquipmentSet(
                "Drancoran Set",
                Data.Rarity.SINGULAR,
                {
                    base: Data.Effect.MANA,
                    primary: Data.Effect.SPEED,
                    secondary: Data.Effect.MODIF_HEAL_GIVEN
                },
                "",
                [
                    what(game.all_armors, "drancoran hood"),
                    what(game.all_armors, "drancoran mittens"),
                    what(game.all_weapons, "drancoran staff"),
                    what(game.all_trinkets, "haste ring"),
                    what(game.all_trinkets, "engraved moonhorn"),
                ],
                {
                    2: [
                        new Stat({
                            effect: Data.Effect.SPEED,
                            theorical: [2, 2],
                            fixed: true,
                        })
                    ],
                    4: [
                        new Stat({
                            effect: Data.Effect.MAXMANA,
                            theorical: [30, 30],
                            fixed: true,
                        })
                    ],
                    5: [
                        new Echo(
                            "Altruism",
                            "Healing an ally with a skill grants them with a +§1 {SPEED} boost for 2 rounds and adds a stack of Altruism on yourself. When 3 stacks are reached, receive a +§2% {MODIF_HEAL_GIVEN} boost for two rounds and a -§3% {MAXHEALTH} malus for one round, and the stacks will be removed.",
                            1,
                            Data.Rarity.SINGULAR,
                            [],
                            "Gift before you receive ; create your own serenity by creating other's.",
                            {
                                "speed_boost": [3, 3],
                                "given_heal_boost": [20, 20],
                                "maxhealth_debuff": [-10, -10],
                                "stacks": [0, 0],
                            },
                            [
                                new Trigger({
                                    name: "altruism_manageStacks",
                                    type: Data.TriggerType.ON_DEAL_HEAL,
                                    behavior: function() {
                                        console.info('ALTRUISM - MANAGE STACKS');
                                        const target = getcTarget();
                                        const caster = getcPlayer();

                                        target.applyEffects(
                                            this,
                                            caster,
                                            [
                                                new Stat({
                                                    effect: Data.Effect.SPEED,
                                                    theorical: this.variables.speed_boost,
                                                    duration: 2,
                                                })
                                            ],
                                        );

                                        if (this.variables.stacks < 3) this.variables.stacks++;
                                    }
                                }),
                                new Trigger({
                                    name: "altruism_applyEffect",
                                    type: Data.TriggerType.ON_DEAL_HEAL,
                                    checker: function() {
                                        return this.variables.stacks >= 3;
                                    },
                                    behavior: function() {
                                        console.info('ALTRUISM - APPLY EFFECTS');
                                        const effects = [
                                            new Stat({
                                                effect: Data.Effect.MODIF_HEAL_GIVEN,
                                                theorical: this.variables.given_heal_boost,
                                                isPercentage: true,
                                                duration: 2
                                            }),
                                            new Stat({
                                                effect: Data.Effect.MAXHEALTH,
                                                theorical: this.variables.maxhealth_debuff,
                                                isPercentage: true,
                                                duration: 1
                                            })
                                        ];

                                        this.owner.applyEffects(this, this.owner, effects);

                                        this.variables.stacks = 0;
                                    }
                                })
                            ]
                        )
                    ]
                },
            ),
            new EquipmentSet(
                "Arbrean Set",
                Data.Rarity.SINGULAR,
                {
                    base: Data.Effect.HEALTH,
                    primary: Data.Effect.PROTECTION,
                    secondary: Data.Effect.MIGHT
                },
                "",
                [
                    what(game.all_armors, "arbrean helm"),
                    what(game.all_armors, "arbrean shield"),
                    what(game.all_weapons, "arbrean spear"),
                    what(game.all_trinkets, "borri's phalanges"),
                    what(game.all_trinkets, "saint-ghore scales ring")
                ],
                {
                    2: [
                        new Stat({
                            effect: Data.Effect.MIGHT,
                            theorical: [5, 5],
                            fixed: true,
                        }),
                        new Stat({
                            effect: Data.Effect.MAXHEALTH,
                            theorical: [10, 10],
                            fixed: true
                        }),
                        new Stat({
                            effect: Data.Effect.DODGE,
                            theorical: [-3, -3],
                            fixed: true,
                            isPercentage: true
                        })
                    ],
                    4: [
                        new Stat({
                            effect: Data.Effect.MIGHT,
                            theorical: [5, 5],
                            fixed: true
                        }),
                        new Stat({
                            effect: Data.Effect.PROTECTION,
                            theorical: [3, 3],
                            fixed: true,
                            isPercentage: true
                        }),
                        new Stat({
                            effect: Data.Effect.DODGE,
                            theorical: [-3, -3],
                            fixed: true,
                            isPercentage: true
                        })
                    ],
                    5: [
                        new Echo(
                            "Sublimation",
                            "§1% of received damage is converted to a {MIGHT} bonus for two rounds. §2% of the damage you deal is converted to a {PROTECTION} bonus for one round.",
                            1,
                            Data.Rarity.PRECIOUS,
                            [],
                            "Suffering is only a nervous stimulus... it can be ignored, converted, transformed.",
                            {
                                "might_conversion": [50, 50],
                                "protection_conversion": [10, 10],
                            },
                            [
                                new Trigger({
                                    name: "sublimation_receiveDamage",
                                    type: Data.TriggerType.ON_RECV_DAMAGE,
                                    behavior: function() {
                                        const recvDmg = game.battle.receivedDamage;
                                        console.log("Detected that " + this.owner.name + " received " + recvDmg + " damage");

                                        const bonusValue = Math.round(recvDmg * (this.variables.might_conversion / 100));

                                        if (bonusValue > 0) {
                                            const effects = [
                                                new Stat({
                                                    effect: Data.Effect.MIGHT,
                                                    theorical: bonusValue,
                                                    duration: 2,
                                                })
                                            ];
                                            this.owner.applyEffects(this, this.owner, effects);
                                        }
                                    },
                                }),
                                new Trigger({
                                    name: "sublimation_dealDamage",
                                    type: Data.TriggerType.ON_DEAL_DAMAGE,
                                    behavior: function() {
                                        const dealtDmg = game.battle.dealtDamage;
                                        console.log("Detected that " + this.owner.name + " dealt " + dealtDmg + " damage");

                                        const bonusValue = Math.round(dealtDmg * (this.variables.protection_conversion / 100));

                                        if (bonusValue > 0) {
                                            const effects = [
                                                new Stat({
                                                    effect: Data.Effect.PROTECTION,
                                                    theorical: bonusValue,
                                                    duration: 1,
                                                    isPercentage: true
                                                })
                                            ];
                                            this.owner.applyEffects(this, this.owner, effects);
                                        }
                                    }
                                })
                            ]
                        )
                    ]
                }
            )
        ];

        for (const equipmentSet of equipmentSets) {
            equipmentSet.items.forEach(item => {
                item.set = equipmentSet.name;
            })
            for (let key in equipmentSet.bonus) {
                equipmentSet.bonus[key].forEach(bonus => {
                    bonus.fix();
                    if (bonus instanceof Echo) {
                        bonus.parent = { name: equipmentSet.name, rarity: equipmentSet.rarity };
                        bonus.triggers.forEach(trig => {
                            trig.behavior = trig.behavior.bind(bonus);
                            trig.checker = trig.checker.bind(bonus);
                        });
                    }
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

        for (const skillTree of skillTrees) {
            skillTree.builder();
            game.all_skillTrees.push(skillTree);
        }
    },

    loadStriders: loadStriders = () => {
        const striders = [
            new Strider(
                {
                    name: "Amarok",
                    desc: "A despicable brood stemming from Ghirgynth's neverending gestation, Amarok betrayed its Father and turned to light upon gaining consciousness, seeking redemption.",
                    charset: Data.Charset.AMAROK,
                    subname: "The Harbinger of Misfortune",
                    health: 100, mana: 100, stamina: 100,
                    dodge: 10, speed: 12, accuracy: 85, protection: 0,
                    might: 20, spirit: 20,
                    resBleed: [0, 0], resPoison: [0, 0],
                    resMove: 30, resStun: 45,
                    resilience: 0, warding: 0,
                    critEffects: [new Stat({
                        effect: Data.Effect.PROTECTION,
                        theorical: [3, 7],
                        isPercentage: true,
                        duration: 2
                    })],
                    variables: {
                        threshold_weak: 50,
                        threshold_normal: 30,
                        state: "none",
                        previous_health: 0,
                        boost_protection: 0,
                        boost_might: 0,
                        protection_debuff: 30,
                        might_debuff_rate: 0.25,
                    },
                    triggers: [
                        new Trigger({
                            name: "amarok_weak",
                            type: [Data.TriggerType.ON_STAT_CHANGE, Data.TriggerType.ON_ADD_HEALTH, Data.TriggerType.ON_REMOVE_HEALTH],
                            checker: function() {
                                const amarok = this.owner;

                                return (amarok.health >= ((amarok.variables.threshold_weak * amarok.maxHealth) / 100));
                            },
                            behavior: function() {
                                const amarok = this.owner;

                                if (amarok.variables.state !== 'weak') {
                                    amarok.variables.state = "weak";

                                    const bProt = amarok.bonuses.find(x => x.origin.name === 'Darkspawn [BOOSTED]' && x.stat.effect === Data.Effect.PROTECTION);
                                    const bMight = amarok.bonuses.find(x => x.origin.name === 'Darkspawn [BOOSTED]' && x.stat.effect === Data.Effect.MIGHT);
                                    if (bProt) amarok.alter({
                                        uid: bProt.stat.uid,
                                        action: Data.AlterAction.REMOVE
                                    });
                                    if (bMight) amarok.alter({
                                        uid: bMight.stat.uid,
                                        action: Data.AlterAction.REMOVE
                                    });

                                    amarok.variables.boost_protection = 0;
                                    amarok.variables.boost_might = 0;

                                    var might_debuff = -(amarok.might - Math.round(amarok.might - (amarok.might * amarok.variables.might_debuff_rate)));

                                    const bonuses = [
                                        new Stat({
                                            effect: Data.Effect.PROTECTION,
                                            theorical: -30,
                                            isPercentage: true
                                        }),
                                        new Stat({
                                            effect: Data.Effect.MIGHT,
                                            theorical: might_debuff,
                                        })
                                    ];
                                    bonuses.forEach(bo => {
                                        amarok.alter({
                                            effect: bo,
                                            action: Data.AlterAction.ADD,
                                            origin: {
                                                type: Data.ActiveEffectType.POWER,
                                                name: 'Darkspawn [WEAK]'
                                            },
                                        });
                                    });

                                    // add active effect and remove others
                                    amarok.removeActiveEffect('Darkspawn [BOOSTED]');
                                    amarok.activeEffects.push(new ActiveEffect({
                                        name: 'Darkspawn [WEAK]',
                                        originUser: amarok,
                                        originObject: Data.ActiveEffectType.POWER,
                                        effects: bonuses,
                                        style: {
                                            color: Data.Color.PURPLE,
                                            bold: true
                                        },
                                        immutable: true
                                    }));
                                }
                            }
                        }),
                        new Trigger({
                            name: "amarok_normal",
                            type: [Data.TriggerType.ON_STAT_CHANGE, Data.TriggerType.ON_ADD_HEALTH, Data.TriggerType.ON_REMOVE_HEALTH],
                            checker: function() {
                                const amarok = this.owner;

                                return ((amarok.health < ((amarok.variables.threshold_weak * amarok.maxHealth) / 100)) && (amarok.health >= ((amarok.variables.threshold_normal * amarok.maxHealth) / 100)));
                            },
                            behavior: function() {
                                const amarok = this.owner;

                                if (amarok.variables.state !== 'normal') {
                                    const bProt = amarok.bonuses.find(x => x.origin.name === 'Darkspawn [WEAK]' && x.stat.effect === Data.Effect.PROTECTION);
                                    const bMight = amarok.bonuses.find(x => x.origin.name === 'Darkspawn [WEAK]' && x.stat.effect === Data.Effect.MIGHT);
                                    amarok.alter({
                                        uid: bProt.stat.uid,
                                        action: Data.AlterAction.REMOVE
                                    });
                                    amarok.alter({
                                        uid: bMight.stat.uid,
                                        action: Data.AlterAction.REMOVE
                                    });
                                    amarok.variables.state = 'normal';
                                }
                                amarok.variables.state = "normal";

                                const bProt = amarok.bonuses.find(x => x.origin.name === 'Darkspawn [BOOSTED]' && x.stat.effect === Data.Effect.PROTECTION);
                                const bMight = amarok.bonuses.find(x => x.origin.name === 'Darkspawn [BOOSTED]' && x.stat.effect === Data.Effect.MIGHT);
                                if (bProt) amarok.alter({
                                    uid: bProt.stat.uid,
                                    action: Data.AlterAction.REMOVE
                                });
                                if (bMight) amarok.alter({
                                    uid: bMight.stat.uid,
                                    action: Data.AlterAction.REMOVE
                                });

                                //amarok.protection -= amarok.variables.boost_protection;
                                //amarok.might -= amarok.variables.boost_might;

                                amarok.variables.boost_protection = 0;
                                amarok.variables.boost_might = 0;

                                /*const weak = amarok.getActiveEffect('Darkspawn [WEAK]');
                                const boosted = amarok.getActiveEffect('Darkspawn [BOOSTED]');
                                if(weak) removeFromArray(amarok.activeEffects, weak);
                                if(boosted) removeFromArray(amarok.activeEffects, boosted);*/
                                amarok.removeActiveEffect('Darkspawn [WEAK]');
                                amarok.removeActiveEffect('Darkspawn [BOOSTED]');
                            },
                        }),
                        new Trigger({
                            name: "amarok_boosted",
                            type: [Data.TriggerType.ON_STAT_CHANGE, Data.TriggerType.ON_ADD_HEALTH, Data.TriggerType.ON_REMOVE_HEALTH],
                            checker: function() {
                                const amarok = this.owner;

                                return (amarok.health < ((amarok.variables.threshold_normal * amarok.maxHealth) / 100));
                            },
                            behavior: function() {
                                const amarok = this.owner;

                                if (amarok.variables.state === 'weak') {
                                    const bProt = amarok.bonuses.find(x => x.origin.name === 'Darkspawn [WEAK]' && x.stat.effect === Data.Effect.PROTECTION);
                                    const bMight = amarok.bonuses.find(x => x.origin.name === 'Darkspawn [WEAK]' && x.stat.effect === Data.Effect.MIGHT);
                                    amarok.alter({
                                        uid: bProt.stat.uid,
                                        action: Data.AlterAction.REMOVE
                                    });
                                    amarok.alter({
                                        uid: bMight.stat.uid,
                                        action: Data.AlterAction.REMOVE
                                    });
                                    amarok.variables.state = 'boost';
                                }

                                amarok.previous_health = amarok.health;

                                const bProt = amarok.bonuses.find(x => x.origin.name === 'Darkspawn [BOOSTED]' && x.stat.effect === Data.Effect.PROTECTION);
                                const bMight = amarok.bonuses.find(x => x.origin.name === 'Darkspawn [BOOSTED]' && x.stat.effect === Data.Effect.MIGHT);
                                if (bProt) amarok.alter({
                                    uid: bProt.stat.uid,
                                    action: Data.AlterAction.REMOVE
                                });
                                if (bMight) amarok.alter({
                                    uid: bMight.stat.uid,
                                    action: Data.AlterAction.REMOVE
                                });

                                const multiplier = Math.round(amarok.variables.threshold_normal - (amarok.health * 100 / amarok.maxHealth));
                                amarok.variables.boost_protection = Math.round(2 * multiplier);
                                amarok.variables.boost_might = Math.round(3 * (multiplier / 2));

                                const bonuses = [
                                    new Stat({
                                        effect: Data.Effect.PROTECTION,
                                        theorical: amarok.variables.boost_protection,
                                        isPercentage: true
                                    }),
                                    new Stat({
                                        effect: Data.Effect.MIGHT,
                                        theorical: amarok.variables.boost_might,
                                    })
                                ];

                                bonuses.forEach(bo => {
                                    amarok.alter({
                                        effect: bo,
                                        action: Data.AlterAction.ADD,
                                        origin: {
                                            type: Data.ActiveEffectType.POWER,
                                            name: 'Darkspawn [BOOSTED]'
                                        }
                                    });
                                })

                                // add active effect and remove others
                                amarok.removeActiveEffect('Darkspawn [BOOSTED]');
                                amarok.removeActiveEffect('Darkspawn [WEAK]');
                                amarok.activeEffects.push(new ActiveEffect({
                                    name: 'Darkspawn [BOOSTED]',
                                    originUser: amarok,
                                    originObject: Data.ActiveEffectType.POWER,
                                    effects: bonuses,
                                    style: {
                                        color: Data.Color.PURPLE,
                                        bold: true
                                    },
                                    immutable: true
                                }));
                            }
                        }),
                        new Trigger({
                            name: "amarok_ae_giver",
                            type: Data.TriggerType.ON_BATTLE_START,
                            behavior: function() {
                                this.owner.runTriggers(Data.TriggerType.ON_STAT_CHANGE);
                            }
                        }),
                        new Trigger({
                            name: "amarok_darkspawn_reset",
                            type: Data.TriggerType.ON_BATTLE_END,
                            behavior: function() {
                                this.owner.variables.state = "none";
                                this.owner.variables.previous_health = 0;
                                this.owner.variables.boost_protection = 0;
                                this.owner.variables.boost_might = 0;
                            }
                        })
                    ],
                    striderType: Data.StriderType.TANK,
                    uniqueName: "Darkspawn",
                    uniqueDesc: '<div class="par">The lower Amarok\'s health, the higher his protection and damage.</div><div class="par bulleted"><span class="bold blue">Health above 50%</span> : -30% Protection, -25% Might</div><div class="par bulleted"><span class="bold blue">Health between 30% and 50%</span> : regular Protection, regular Might</div><div class="par bulleted"><span class="bold blue">Health below 30%</span> : +2% Protection per 1% Health loss, +3% Might per 2% Health loss</div>',
                    uniqueQuote: '"For Ghirgynth\'s servants dance with the dead, Amarok\'s flesh slavers over pain."',
                    uniqueIcon: 0,
                    skillTree: what(game.all_skillTrees, "amarok"),
                    skills: [
                        new Skill(
                            "Surge",
                            "Deals light damage to all enemies and reduces their §Dodge§. Boosts Amarok's §Protection§ and reduces his §Might§ and §Spirit§.",
                            13,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 3,
                                cooldown: 1,
                                dmgType: Data.SkillDamageType.PHYSICAL,
                                dmgMultiplier: 35,
                                criMultiplier: 5,
                                accMultiplier: 75,
                                targets: { allies: '-0', enemies: '@123' },
                                launchPos: [false, true, true],
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.PROTECTION, theorical: 5, isPercentage: true, duration: 1 }),
                                            new Stat({ effect: Data.Effect.MIGHT, theorical: -5, duration: 2 }),
                                            new Stat({ effect: Data.Effect.SPIRIT, theorical: -5, duration: 2 }),
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.PROTECTION, theorical: 7, isPercentage: true, duration: 1, isCritical: true }),
                                            new Stat({ effect: Data.Effect.MIGHT, theorical: -7, duration: 2, isCritical: true }),
                                            new Stat({ effect: Data.Effect.SPIRIT, theorical: -7, duration: 2, isCritical: true }),
                                        ]
                                    }
                                },
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.DODGE, theorical: -5, isPercentage: true, duration: 2 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.DODGE, theorical: -7, isPercentage: true, duration: 2, isCritical: true })
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
                                manaCost: 7,
                                cooldown: 3,
                                dmgType: Data.SkillDamageType.PHYSICAL,
                                dmgMultiplier: 150,
                                criMultiplier: 10,
                                accMultiplier: 90,
                                targets: { allies: '-0', enemies: '-1' },
                                launchPos: [false, false, true],
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: [15, 20], isPercentage: true, type: Data.StatType.ACTIVE })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: [18, 25], isPercentage: true, type: Data.StatType.ACTIVE, isCritical: true })
                                        ]
                                    }
                                },
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.BLEEDING_CURABLE, theorical: [4, 6], type: Data.StatType.ACTIVE, duration: 2 }),
                                            new Stat({ effect: Data.Effect.SPEED, theorical: -5, duration: 2 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.BLEEDING_CURABLE, theorical: [5, 7], type: Data.StatType.ACTIVE, duration: 3, isCritical: true }),
                                            new Stat({ effect: Data.Effect.SPEED, theorical: -7, duration: 2, isCritical: true })
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
                                manaCost: 5,
                                cooldown: 3,
                                criMultiplier: 10,
                                accMultiplier: 100,
                                targets: { allies: '-123', enemies: '-0' },
                                launchPos: [false, true, true],
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: -20, isPercentage: true }),
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: 3, isPercentage: true, type: Data.StatType.ACTIVE, duration: 3, delay: 1 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: -20, isPercentage: true, isCritical: true }),
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: 4, isPercentage: true, type: Data.StatType.ACTIVE, duration: 3, delay: 1, isCritical: true })
                                        ]
                                    }
                                },
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.DUMMY, theorical: 20, isPercentage: true, displayed: "° of Amarok's ^Health^" }),
                                            new Stat({ effect: Data.Effect.SPEED, theorical: 2, duration: 1 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.DUMMY, theorical: 20, isPercentage: true, displayed: "° of Amarok's ^Health^", isCritical: true }),
                                            new Stat({ effect: Data.Effect.SPEED, theorical: 4, duration: 1, isCritical: true })
                                        ]
                                    }
                                },
                                logicAllies: {
                                    PRE_ALLIES_EFFECTS: function(tar) {
                                        const amarok = this.getOwner();

                                        const val = amarok.maxHealth * 0.2;

                                        tar.addBaseStat(new Stat({ effect: Data.Effect.HEALTH, theorical: val }));
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
                                manaCost: 5,
                                cooldown: 3,
                                criMultiplier: 10,
                                accMultiplier: 100,
                                targets: { allies: '-123', enemies: '-0' },
                                launchPos: [false, false, true],
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.GUARDING, duration: 2 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.GUARDING, duration: 2, isCritical: true })
                                        ]
                                    }
                                },
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.GUARDED, duration: 2 }),
                                            new Stat({ effect: Data.Effect.MAXMANA, theorical: [20, 25], isPercentage: true, duration: 2 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.GUARDED, duration: 2, isCritical: true }),
                                            new Stat({ effect: Data.Effect.MAXMANA, theorical: 30, isPercentage: true, duration: 2, isCritical: true })
                                        ]
                                    }
                                },
                                variables: {
                                    guarded: null,
                                    guarding: null
                                }
                            }
                        ),
                        new Skill(
                            "Fulmination",
                            "§Pulls§ an enemy and decreases their §Resilience§. Increases Amarok's §Might§.",
                            17,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 4,
                                cooldown: 2,
                                dmgType: Data.SkillDamageType.MAGICAL,
                                dmgMultiplier: 60,
                                criMultiplier: 10,
                                accMultiplier: 100,
                                targets: { allies: '-0', enemies: '-3' },
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.MIGHT, theorical: [10, 15], duration: 2 }),
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.MIGHT, theorical: 17, duration: 2, isCritical: true })
                                        ]
                                    }
                                },
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.PULL_TWO, chance: 100 }),
                                            new Stat({ effect: Data.Effect.RESILIENCE, theorical: [-10, -15], duration: 2 }),
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.PULL_TWO, chance: 130 }),
                                            new Stat({ effect: Data.Effect.RESILIENCE, theorical: [-17, -20], duration: 2 }),
                                        ]
                                    }
                                }
                            }
                        )
                    ],
                    customBgPos: '10% 30%',
                    graphicsApi: function() {
                        const display = (refresh = false) => {
                            let str = '';

                            str += 'Display test for Amarok!';
                            console.log(this); // "this" gives access to the Strider's properties

                            if(refresh) {
                                document.querySelector('.a').innerHTML = str;
                            }
                            else return str;
                        }

                        return {
                            display
                        };
                    }
                },
            ),
            new Strider(
                {
                    name: "Brim",
                    desc: "Cursed by an ancient god for immortality, Brim is a vile highwayman damned to deal immense pain to any creature he encounters to feed the demon that holds his soul.",
                    charset: Data.Charset.BRIM,
                    subname: "The Bloodseeker",
                    health: 100, mana: 100, stamina: 100,
                    dodge: 10, speed: 10, accuracy: 90, protection: 0,
                    might: 25, spirit: 25,
                    resBleed: [0, 0], resPoison: [0, 0],
                    resMove: 25, resStun: 25,
                    resilience: 0, warding: 0,
                    critEffects: [
                        new Stat({ effect: Data.Effect.DODGE, theorical: [3, 7], isPercentage: true })
                    ],
                    striderType: Data.StriderType.STRIKER,
                    uniqueName: "Marked for Death",
                    uniqueDesc: '<div class="par">Each successful hit from Brim on a enemy marks it with a <span class="bold blue">Black Glyph</span>, which can be stacked up 3 times. Each successful hit on an enemy that is marked with a <span class="bold blue">Black Glyph</span> triggers a Bleeding effect.</div><div class="par bulleted"><span class="bold blue">1 Black Glyph</span>: 2 Bleeding (2 rounds)</div><div class="par bulleted"><span class="bold blue">2 Black Glyphs</span>: 5 Bleeding (2 rounds)</div><div class="par bulleted"><span class="bold blue">3 Black Glyphs</span>: 8 Incurable Bleeding (3 rounds). Next hit removes all of the Black Glyphs on the target.</div>',
                    uniqueQuote: '"An unnameable force carves a strange symbol on your very skin. You have been marked ; and death cannot be pushed back no more."',
                    uniqueIcon: 0,
                    skillTree: what(game.all_skillTrees, "amarok"),
                    customBgPos: "top"
                },
            ),
            new Strider(
                {
                    name: "Naka",
                    desc: "An exiled swordsmonk living a lonely life of wander, Naka took up arms against the fiercest beasts of Mithor. She is seen by all as a symbol of hope and a banner of light in times of misfortune.",
                    charset: Data.Charset.NAKA,
                    subname: "The White Viper",
                    health: 100, mana: 100, stamina: 100,
                    dodge: 10, speed: 12, accuracy: 85, protection: 0,
                    might: 15, spirit: 15,
                    resBleed: [0, 0], resPoison: [0, 0],
                    resMove: 30, resStun: 45,
                    resilience: 0, warding: 0,
                    critEffects: [
                        new Stat({ effect: Data.Effect.ACCURACY, theorical: [3, 7], isPercentage: true })
                    ],
                    variables: {
                        backlash_might: 0.8,
                        backlash_spirit: 0,
                        backlash_accuracy: 0.8,
                        backlash_active: false,
                        backlash_duration: 2,
                        backlash_armorPiercing: 0,
                        backlash_countdown: 0,
                        backlash_success: false,
                        canUseBacklash: function(naka) {
                            return this.backlash_active && !naka.isStunned;
                        },
                        backlashAccuracyTest: function(naka, target) {
                            const accuracy = Math.round(naka.accuracy * this.backlash_accuracy);

                            if (Math.random() * 100 < accuracy) {
                                if (Math.random() * 100 > target.dodge) {
                                    return true;
                                }
                            }
                            return false;
                        },
                        computeBacklashValue: function(naka) {
                            const might = Math.round(naka.might * this.backlash_might);
                            const spirit = Math.round(naka.spirit * this.backlash_spirit);
                            const armorPiercing = Math.round(naka.armorPiercing * this.backlash_armorPiercing);

                            return {
                                phys_damage: might,
                                magi_damage: spirit,
                                crit_damage: 0,
                                ignoreProtection: false,
                                armorPiercing: armorPiercing
                            }
                        },
                        getBacklashTooltip: function(naka) {
                            let str = '';

                            str += 'Backlash activated!';
                            str += '<br>';
                            str += naka.variables.backlash_countdown + " round(s) left!";

                            return str;
                        }
                    },
                    triggers: [
                        new Trigger({
                            name: "naka_activateBacklash",
                            type: Data.TriggerType.ON_DEAL_ATTACK,
                            behavior: function() {
                                console.log("Backlash activated!");
                                const naka = this.owner;
                                naka.variables.backlash_active = true;
                                naka.variables.backlash_countdown = naka.variables.backlash_duration + 1;
                                naka.removeBadge("backlash");
                                naka.addBadge(new BattleBadge({
                                    name: "backlash",
                                    css: "backlash",
                                    tooltip: function() {
                                        return naka.variables.getBacklashTooltip(naka);
                                    }
                                }))

                                // naka.alter({
                                //     effect: backlash,
                                //     action: Data.AlterAction.ADD,
                                //     origin: {
                                //         type: Data.ActiveEffectType.POWER,
                                //         name: "Duellist's Stance"
                                //     }
                                // })
                                // naka.addActiveEffect(new ActiveEffect({
                                //     name: "Duellist's Stance",
                                //     originUser: naka,
                                //     originObject: Data.ActiveEffectType.POWER,
                                //     effects: [
                                //         backlash
                                //     ],
                                //     style: {
                                //         color: Data.Color.PURPLE,
                                //         bold: true,
                                //     },
                                // }))
                                // naka.applyEffects({name: "Duellist's Stance"}, naka, [
                                //     new Stat({effect: Data.Effect.DUMMY, displayed: "_$Backlash$_", duration: 2})
                                // ]);
                            }
                        }),
                        new Trigger({
                            name: "naka_deactivateBacklash",
                            type: Data.TriggerType.ON_TURN_END,
                            behavior: function() {
                                // console.log("Backlash deactivated!");
                                // this.owner.variables.backlash_active = false;
                                const naka = this.owner;
                                naka.variables.backlash_success = false;
                                naka.variables.backlash_countdown = Math.max(0, naka.variables.backlash_countdown - 1);

                                if (naka.variables.backlash_countdown === 0) {
                                    console.log("Backlash deactivated!");
                                    this.owner.variables.backlash_active = false;
                                    naka.removeBadge("backlash");
                                }

                            }
                        }),
                        new Trigger({
                            name: "naka_backlashHit",
                            type: Data.TriggerType.ON_RECV_ATTACK,
                            checker: function() {
                                return this.owner.variables.canUseBacklash(this.owner) && game.battle.currentPlay instanceof Enemy;
                            },
                            behavior: function() {
                                console.log("Backlashed!!!!!!!!------------------");

                                const naka = this.owner;
                                const target = game.battle.currentPlay;

                                if (naka.variables.backlashAccuracyTest(naka, target)) {
                                    console.log("Successful backlash!---------------------------------------");
                                    naka.variables.backlash_success = true;
                                    target.receiveDamage(naka.variables.computeBacklashValue(naka));

                                    // Heal ally with lowest health
                                    const lowest = game.battle.allies.reduce((min, current) => {
                                        return current.health < min.health ? current : min;
                                    }, game.battle.allies[0]);

                                    lowest.addBaseStat(new Stat({ effect: Data.Effect.HEALTH, theorical: game.battle.receivedDamage }), naka);
                                } else console.error("Backlash failed!-----------------------------------------");
                            }
                        })
                    ],
                    striderType: Data.StriderType.SUPPORT,
                    uniqueName: "Duellist Stance",
                    uniqueDesc: '<div class="par jus">Each time Naka attacks, she enters a <span class="bold blue">Backlash</span> state for 2 rounds. While in <span class="bold blue">Backlash</span> state, when she is the target of an attack, she attacks too in return.</div><div class="par jus">If a <span class="bold blue">Backlash</span> successfully hits a target, the ally that has the lowest health gets healed with 100% of the <span class="bold blue">Backlash</span>\'s damage value.</div><div class="par bulleted"><span class="bold">When attacking: </span>enters <span class="bold blue">Backlash</span> state (Damage = 80% of Naka\'s <span class="bold blue">Might</span> value, Accuracy = 80%).</div><div class="par bulleted"><span class="bold">On successful backlash</span>: <span class="bold blue">Heals</span> the ally with the lowest health at 100% of the damage dealt by the <span class="bold blue">Backlash</span>.</div>',
                    uniqueQuote: '"Don\'t be bold, play it safe. Stand still, unlock your knees and have your blade risen. Let the patience do you right : their ambition shall be their weakness."',
                    uniqueIcon: 0,
                    skillTree: what(game.all_skillTrees, "amarok"),
                    skills: [
                        new Skill(
                            "Razorfangs",
                            "§Moves forward§ and reduces the targets' §Stun resistance§.",
                            1,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 3,
                                cooldown: 1,
                                dmgType: Data.SkillDamageType.PHYSICAL,
                                dmgMultiplier: 90,
                                criMultiplier: 15,
                                accMultiplier: 85,
                                targets: { allies: '-0', enemies: '@12' },
                                launchPos: [true, true, false],
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.FRONT_ONE })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.FRONT_ONE })
                                        ]
                                    }
                                },
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.RES_STUN, theorical: [-15, -20], isPercentage: true, duration: 2 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.RES_STUN, theorical: -30, isPercentage: true, duration: 2 })
                                        ]
                                    }
                                }
                            }
                        ),
                        new Skill(
                            "Terrification",
                            "§Stuns§ the targets and applies §Poison§ on them. §Moves backwards§.",
                            3,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 5,
                                cooldown: 3,
                                dmgType: Data.SkillDamageType.MAGICAL,
                                dmgMultiplier: 65,
                                criMultiplier: 15,
                                accMultiplier: 90,
                                targets: { allies: '-0', enemies: '@123' },
                                launchPos: [false, false, true],
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.BACK_TWO })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.BACK_TWO })
                                        ]
                                    }
                                },
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.STUN, duration: 2, chance: 90 }),
                                            new Stat({ effect: Data.Effect.BLIGHT_CURABLE, duration: 2, theorical: [4, 6], type: Data.StatType.ACTIVE })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.STUN, duration: 2, chance: 105 }),
                                            new Stat({ effect: Data.Effect.BLIGHT_CURABLE, duration: 2, theorical: 7, type: Data.StatType.ACTIVE })
                                        ],
                                    }
                                }
                            }
                        ),
                        new Skill(
                            "Viper's Hook",
                            "§Moves backwards§ and regenerates Naka's §Stamina§. On kill, §Heals§ all allies.",
                            2,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 5,
                                cooldown: 1,
                                dmgType: Data.SkillDamageType.PHYSICAL,
                                dmgMultiplier: 75,
                                criMultiplier: 10,
                                accMultiplier: 100,
                                targets: { allies: '-0', enemies: '-12' },
                                launchPos: [false, true, true],
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.BACK_ONE }),
                                            new Stat({ effect: Data.Effect.STAMINA, theorical: [8, 10], isPercentage: true, type: Data.StatType.ACTIVE })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.BACK_ONE }),
                                            new Stat({ effect: Data.Effect.STAMINA, theorical: 12, isPercentage: true, type: Data.StatType.ACTIVE })
                                        ],
                                    }
                                },
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.DUMMY, theorical: [10, 12], isPercentage: true, displayed: "$On kill:$ ^Heals^ °" })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.DUMMY, theorical: [10, 12], isPercentage: true, displayed: "$On kill:$ ^Heals^ °" })
                                        ]
                                    }
                                },
                                logicEnemies: {
                                    POST_DAMAGE: function(tar) {
                                        if (tar.isDead()) {
                                            game.battle.allies.filter(x => !x.isDead()).forEach(ally => {
                                                ally.addBaseStat(new Stat({ effect: Data.Effect.HEALTH, theorical: [10, 12], isPercentage: true }), this.getOwner());
                                            })
                                        }
                                    }
                                }
                            }
                        ),
                        new Skill(
                            "Provocation",
                            "§Guards§ the targeted ally, and §Moves forward§. Increases §Backlash§'s damage and accuracy. While the effect is active, successful §Backlash§ hits regenerate the guarded ally's and Naka's §Mana§.",
                            4,
                            {
                                type: Data.SkillType.FRIENDLY,
                                manaCost: 4,
                                cooldown: 2,
                                criMultiplier: 10,
                                accMultiplier: 100,
                                targets: { allies: '-123', enemies: '-0' },
                                launchPos: [true, true, true],
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.GUARDING, duration: 2 }),
                                            new Stat({ effect: Data.Effect.FRONT_ONE }),
                                            new Stat({ effect: Data.Effect.DUMMY, theorical: 10, isPercentage: true, duration: 2, displayed: "+° *|Backlash|* Damage" }),
                                            new Stat({ effect: Data.Effect.DUMMY, theorical: 10, isPercentage: true, duration: 2, displayed: "+° *|Backlash|* Accuracy" }),
                                            new Stat({ effect: Data.Effect.DUMMY, theorical: 10, isPercentage: true, duration: 2, displayed: "^° Mana^ on *|Backlash|* hit" }),
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.GUARDING, duration: 2 }),
                                            new Stat({ effect: Data.Effect.FRONT_ONE }),
                                            new Stat({ effect: Data.Effect.DUMMY, theorical: 10, isPercentage: true, duration: 2, displayed: "+° *|Backlash|* Damage" }),
                                            new Stat({ effect: Data.Effect.DUMMY, theorical: 10, isPercentage: true, duration: 2, displayed: "+° *|Backlash|* Accuracy" }),
                                            new Stat({ effect: Data.Effect.DUMMY, theorical: 10, isPercentage: true, duration: 2, displayed: "^° Mana^ on *|Backlash|* hit" }),
                                        ]
                                    }
                                },
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.GUARDED, duration: 2 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.GUARDED, duration: 2 })
                                        ]
                                    }
                                },
                                variables: {
                                    guarded: null,
                                    guarding: null
                                },
                                onCast: function() {
                                    const naka = this.getOwner();
                                    naka.variables.backlash_might += 0.1;
                                    naka.variables.backlash_accuracy += 0.1;
                                },
                                onEnd: {
                                    caster: function() {
                                        console.log("ENDING");
                                        const naka = this.getOwner();
                                        naka.variables.backlash_might -= 0.1;
                                        naka.variables.backlash_accuracy -= 0.1;
                                    },
                                },
                                triggersCaster: [
                                    new Trigger({
                                        name: "naka_provocationBacklashRegenMana",
                                        type: Data.TriggerType.ON_RECV_ATTACK,
                                        behavior: function() {
                                            const sk = this.getOwner();
                                            const naka = sk.getOwner();
                                            if (naka.variables.backlash_success) {
                                                sk.variables.guarded?.addBaseStat(new Stat({ effect: Data.Effect.MANA, theorical: 10, isPercentage: true }), naka);
                                                naka.addBaseStat(new Stat({ effect: Data.Effect.MANA, theorical: 10, isPercentage: true }), naka);
                                            }
                                        }
                                    })
                                ]
                            }
                        ),
                        new Skill(
                            "Cauterize",
                            "Cures §Bleeding§ and §Poisoning§ on the target, and generate §Shield§ points that equal the combined values of the cleaned maluses. Applies a §Speed§ malus.",
                            5,
                            {
                                manaCost: 4,
                                type: Data.SkillType.FRIENDLY,
                                dmgType: Data.SkillDamageType.PHYSICAL,
                                dmgMultiplier: 5,
                                criMultiplier: 10,
                                accMultiplier: 100,
                                launchPos: [true, true, true],
                                target: { allies: '-123', enemies: '-0' },
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.CURES_POISONING }),
                                            new Stat({ effect: Data.Effect.CURES_BLEEDING }),
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.CURES_POISONING, isCritical: true }),
                                            new Stat({ effect: Data.Effect.CURES_BLEEDING, isCritical: true }),
                                        ],
                                    }
                                }
                            }
                        )
                    ],
                    customBgPos: "10% 50%"
                },
            ),
            new Strider(
                {
                    name: "Carhal",
                    desc: "Left for dead by a servant of Yzamir, a tree wrapped around Carhal's body and healed his wounds. Having carved a bow from that very tree, he then swore to hunt down the harbingers of Evil, forever.",
                    charset: Data.Charset.CARHAL,
                    subname: "The Relentless Scout",
                    health: 100, mana: 100, stamina: 100,
                    dodge: 10, speed: 12, accuracy: 85, protection: 0,
                    might: 25, spirit: 25,
                    resBleed: [0, 0], resPoison: [0, 0],
                    resMove: 30, resStun: 45,
                    resilience: 0, warding: 0,
                    critEffects: [
                        new Stat({ effect: Data.Effect.MIGHT, theorical: [3, 7], duration: 2 })
                    ],
                    variables: {
                        "r_dodge": [5, 10, 15],
                        "r_wpn_dmg": [10, 15, 25],
                        "r_might": [10, 20, 35],
                        "r_speed": [2, 4, 5],
                        "r_stun_chance": [10, 15, 25],
                        "r_recv_heal": [10, 15, 30],
                        "r_accuracy": [5, 10, 20],
                        "r_spirit": [5, 15, 35],
                        "r_skill_dmg": [10, 15, 25],
                        "stillTracker": 0,
                        "rootsStage_Carhal": 0,
                        getRootsBonuses: function(pos, tier) {
                            switch (pos) {
                                case Data.FormationPosition.FRONT:
                                    return [
                                        new Stat({ effect: Data.Effect.DODGE, theorical: this["r_dodge"][tier - 1], isPercentage: true }),
                                        new Stat({ effect: Data.Effect.MODIF_DMG_WEAPON, theorical: this["r_wpn_dmg"][tier - 1], isPercentage: true }),
                                        new Stat({ effect: Data.Effect.MIGHT, theorical: this["r_might"][tier - 1] }),
                                    ];
                                case Data.FormationPosition.MIDDLE:
                                    return [
                                        new Stat({ effect: Data.Effect.SPEED, theorical: this["r_speed"][tier - 1] }),
                                        new Stat({ effect: Data.Effect.MODIF_CHANCE_STUN, theorical: this["r_stun_chance"][tier - 1], isPercentage: true }),
                                        new Stat({ effect: Data.Effect.MODIF_HEAL_RECV, theorical: this["r_recv_heal"][tier - 1], isPercentage: true }),
                                    ];
                                case Data.FormationPosition.BACK:
                                    return [
                                        new Stat({ effect: Data.Effect.ACCURACY, theorical: this["r_accuracy"][tier - 1], isPercentage: true }),
                                        new Stat({ effect: Data.Effect.SPIRIT, theorical: this["r_spirit"][tier - 1] }),
                                        new Stat({ effect: Data.Effect.MODIF_DMG_SKILL, theorical: this["r_skill_dmg"][tier - 1], isPercentage: true }),
                                    ];
                            }
                        },
                        addBonusesWithName: function(carhal, bonuses, name) {
                            bonuses.forEach(bo => {
                                carhal.alter({
                                    effect: bo,
                                    action: Data.AlterAction.ADD,
                                    origin: {
                                        type: Data.ActiveEffectType.POWER,
                                        name: name
                                    }
                                });
                            });
                        },
                        changeActiveEffect: function(oldName, newName, bonuses, carhal) {
                            carhal.removeActiveEffect(oldName);
                            carhal.addActiveEffect(new ActiveEffect({
                                name: newName,
                                originUser: carhal,
                                originObject: Data.ActiveEffectType.POWER,
                                effects: bonuses,
                                style: {
                                    color: Data.Color.PURPLE,
                                    bold: true
                                },
                                immutable: true
                            }));
                        },
                        "tier1": "Sentient Roots [SHALLOW]",
                        "tier2": "Sentient Roots [GROWING]",
                        "tier3": "Sentient Roots [ENTRENCHED]",
                        "previousPos": null,
                    },
                    triggers: [
                        new Trigger({
                            name: "carhal_roots",
                            type: Data.TriggerType.ON_TURN_BEGIN,
                            behavior: function() {
                                console.log('CACA');
                                const carhal = this.owner;
                                const vars = carhal.variables;

                                // Set current position
                                vars.previousPos = carhal.getSelfPosInBattle();

                                // Increase the stationary tracker if below 5 (max. value)
                                vars.stillTracker < 4 && vars.stillTracker++;

                                if (vars.stillTracker == 2 && vars.rootsStage_Carhal === 0) {
                                    // Shallow roots
                                    vars.rootsStage_Carhal++;

                                    // Retrieve bonuses according to pos
                                    const pos = carhal.getSelfPosInBattle();
                                    const bonuses = vars.getRootsBonuses(pos, vars.rootsStage_Carhal);
                                    // Apply alterations
                                    vars.addBonusesWithName(carhal, bonuses, vars.tier1);
                                    // Apply ActiveEffect
                                    vars.changeActiveEffect('', vars.tier1, bonuses, carhal);
                                } else if (vars.stillTracker == 3 && vars.rootsStage_Carhal === 1) {
                                    // Growing roots
                                    vars.rootsStage_Carhal++;

                                    // Retrieve bonuses according to pos
                                    const pos = carhal.getSelfPosInBattle();
                                    const bonuses = vars.getRootsBonuses(pos, vars.rootsStage_Carhal);

                                    // Remove previous bonuses
                                    carhal.removeAllBonusesWithName(vars.tier1);
                                    // Add new bonuses
                                    vars.addBonusesWithName(carhal, bonuses, vars.tier2);
                                    // Remove old ActiveEffect
                                    vars.changeActiveEffect(vars.tier1, vars.tier2, bonuses, carhal);
                                } else if (vars.stillTracker === 4 && vars.rootsStage_Carhal === 2) {
                                    // Entrenched roots
                                    vars.rootsStage_Carhal++;

                                    // Retrieve bonuses according to pos
                                    const pos = carhal.getSelfPosInBattle();
                                    const bonuses = vars.getRootsBonuses(pos, vars.rootsStage_Carhal);

                                    // Remove previous bonuses
                                    carhal.removeAllBonusesWithName(vars.tier2);
                                    // Add new bonuses
                                    vars.addBonusesWithName(carhal, bonuses, vars.tier3);
                                    // Remove old ActiveEffect
                                    vars.changeActiveEffect(vars.tier2, vars.tier3, bonuses, carhal);
                                }
                            }
                        }),
                        new Trigger({
                            name: 'carhal_roots_move',
                            type: Data.TriggerType.ON_RECV_MOVE,
                            behavior: function() {
                                const carhal = this.owner;
                                const vars = carhal.variables;
                                console.log('Carhal Movement Trigger');

                                const currentTier = vars["tier" + vars.rootsStage_Carhal];
                                console.log('Current SentientRoots tier : ' + currentTier);
                                // Add duration to bonuses to make them last 2 rounds
                                if (currentTier) {
                                    carhal.bonuses.filter(x => x.origin.name === currentTier)?.map(x => x.stat.duration = 2);
                                    carhal.getActiveEffect(currentTier)?.effects.map(x => x.duration = 2);

                                    // Retrieve the new NPC on Carhal's ancient position
                                    const npc = getFighterFromPositionAndType(Data.BattleFighterType.HERO, vars.previousPos);
                                    console.log('The NPC on Carhal\'s previous position is now ' + npc.name);

                                    // Apply same bonuses to that NPC
                                    let bonuses = vars.getRootsBonuses(vars.previousPos, vars.rootsStage_Carhal);
                                    bonuses.map(x => x.duration = 2);
                                    vars.addBonusesWithName(npc, bonuses, currentTier);
                                    vars.changeActiveEffect('', currentTier, bonuses, npc);
                                }
                                // Reset trackers
                                vars.rootsStage_Carhal = 0;
                                vars.stillTracker = 0;
                            }
                        }),
                        new Trigger({
                            name: "carhal_roots_reset",
                            type: Data.TriggerType.ON_BATTLE_END,
                            behavior: function() {
                                this.owner.variables.stillTracker = 0;
                                this.owner.variables.rootsStage_Carhal = 0;
                                this.owner.variables.previousPos = null;
                            }
                        })
                    ],
                    type: Data.StriderType.STRIKER,
                    uniqueName: "Sentient Roots",
                    uniqueDesc: '<div class="par jus">Remaining stationary for two consecutive rounds will trigger <span class="bold blue">Root</span> bonuses, increasing further each round up to 3 Tiers: <span class="bold blue">Shallow Roots</span>, <span class="bold blue">Growing Roots</span> and <span class="bold blue">Entrenched Roots</span>. Bonuses vary according to Carhal\'s position.</div><div class="par bulleted"><span class="bold">Front</span>: Increased <span class="bold blue">Dodge</span>, <span class="bold blue">Might</span> and <span class="bold blue">Weapon Damage</span></div><div class="par bulleted"><span class="bold">Middle</span>: Increased <span class="bold blue">Speed</span>, <span class="bold blue">Stun Chance</span> and <span class="bold blue">Received heal</span></div><div class="par bulleted"><span class="bold">Back:</span> Increased <span class="bold blue">Accuracy</span>, <span class="bold blue">Spirit</span> and <span class="bold blue">Skill damage</span></div><div class="par jus">Once Carhal leaves a position, the <span class="bold blue">Roots</span> bonus will persist for two rounds, and will be also applied to the Strider who arrives on that position.</div>',
                    uniqueQuote: '"As trees are never the same, Carhal danced, backed and leapt with them, blessed with all the virtues that nature had to offer."',
                    uniqueIcon: 0,
                    skillTree: what(game.all_skillTrees, "amarok"),
                    skills: [
                        new Skill(
                            "Fallback",
                            "§Moves backwards§ and increases Carhal's §Dodge§.",
                            13,
                            {
                                type: Data.SkillType.FRIENDLY,
                                manaCost: 3,
                                criMultiplier: 15,
                                accMultiplier: 100,
                                cooldown: 2,
                                launchPos: [false, true, true],
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.BACK_ONE }),
                                            new Stat({ effect: Data.Effect.DODGE, theorical: 5, duration: 2, isPercentage: true }),
                                            new Stat({ effect: Data.Effect.ACCURACY, theorical: [5, 8], duration: 2, isPercentage: true })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.BACK_ONE }),
                                            new Stat({ effect: Data.Effect.DODGE, theorical: 7, duration: 2, isPercentage: true, isCritical: true }),
                                            new Stat({ effect: Data.Effect.ACCURACY, theorical: 10, duration: 2, isPercentage: true })
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
                                manaCost: 5,
                                dmgMultiplier: 100,
                                criMultiplier: 10,
                                accMultiplier: 90,
                                cooldown: 1,
                                launchPos: [true, true, false],
                                targets: { allies: '-0', enemies: '-123' },
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.STUN, duration: 1 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.STUN, duration: 2 })
                                        ]
                                    }
                                }
                            }
                        ),
                        new Skill(
                            "Grappling Ballista",
                            "Deals damage that ignores protection. Applies §Bleeding§ to the target. §Pushes back§ the target, then §Pulls it§ after one round.",
                            16,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                dmgType: Data.SkillDamageType.PHYSICAL,
                                manaCost: 5,
                                dmgMultiplier: 90,
                                criMultiplier: 15,
                                accMultiplier: 100,
                                cooldown: 1,
                                launchPos: [true, true, false],
                                targets: { allies: '-0', enemies: '-12' },
                                ignoresProtection: true,
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.BLEEDING_CURABLE, theorical: [3, 4], type: Data.StatType.ACTIVE, duration: 2 }),
                                            new Stat({ effect: Data.Effect.PUSH_ONE, chance: 150 }),
                                            new Stat({ effect: Data.Effect.PULL_ONE, chance: 150, delay: 2, duration: 1 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.BLEEDING_CURABLE, theorical: 5, type: Data.StatType.ACTIVE, duration: 2, isCritical: true }),
                                            new Stat({ effect: Data.Effect.PUSH_ONE, chance: 150, isCritical: true }),
                                            new Stat({ effect: Data.Effect.PULL_ONE, chance: 150, delay: 2, duration: 1, isCritical: true })
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
                                manaCost: 7,
                                dmgMultiplier: 120,
                                criMultiplier: 20,
                                accMultiplier: 85,
                                cooldown: 2,
                                launchPos: [true, false, false],
                                targets: { allies: '-0', enemies: '@12' },
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.STUN, duration: 1, chance: 50 }),
                                            new Stat({ effect: Data.Effect.STAMINA, duration: 2, theorical: 4, isPercentage: true, type: Data.StatType.ACTIVE })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.STUN, duration: 1, chance: 45, isCritical: true }),
                                            new Stat({ effect: Data.Effect.STAMINA, duration: 2, theorical: 4, isPercentage: true, type: Data.StatType.ACTIVE, isCritical: true })
                                        ]
                                    }
                                }
                            }
                        )
                    ],
                    customBgPos: '10% 10%'
                },
            ),
            new Strider(
                {
                    name: "Ifrin",
                    desc: "A fearsome mage, Ifrin was banned from the Order of Rhun upon harnessing the power of Yorll's corrupted magic, and is now on a constant need of enhancing her knowledge of the dark arts.",
                    charset: Data.Charset.IFRIN,
                    subname: "The Prophet of Kaphyst",
                    health: 100, mana: 100, stamina: 100,
                    dodge: 10, speed: 12, accuracy: 85, protection: 0,
                    might: 20, spirit: 20,
                    resBleed: [0, 0], resPoison: [0, 0],
                    resMove: 30, resStun: 45,
                    resilience: 0, warding: 0,
                    critEffects: [
                        new Stat({ effect: Data.Effect.MAXMANA, theorical: [15, 25] })
                    ],
                    striderType: Data.StriderType.TANK,
                    uniqueName: "Witchskin",
                    uniqueDesc: "Witchskin's power description",
                    uniqueQuote: 'quote',
                    uniqueIcon: 1,
                    skillTree: what(game.all_skillTrees, "amarok"),
                    customBgPos: '10% 70%'
                },
            ),
            new Strider(
                {
                    name: "Betheros",
                    desc: "Betheros has traveled the roads of the world as an itinerant bard, spreading inspiring melodies and wise words. It is said that those who met him were changed forever.",
                    charset: Data.Charset.BETHEROS,
                    subname: "The Bringer of Good Faith",
                    health: 100, mana: 100, stamina: 100,
                    dodge: 10, speed: 12, accuracy: 85, protection: 0,
                    might: 15, spirit: 15,
                    resBleed: [0, 0], resPoison: [0, 0],
                    resMove: 30, resStun: 45,
                    resilience: 0, warding: 0,
                    critEffects: [
                        new Stat({ effect: Data.Effect.MODIF_HEAL_GIVEN, theorical: [3, 7], isPercentage: true, duration: 2 })
                    ],
                    variables: {
                        life_channel_rate: 0.10,
                    },
                    triggers: [
                        new Trigger({
                            name: 'betheros_lifechannel',
                            type: [Data.TriggerType.ON_RECV_DAMAGE, Data.TriggerType.ON_DEAL_DAMAGE],
                            behavior: function() {
                                console.info('BETHEROS LIFE CHANNEL TRIGGERED!');
                                console.info(game.battle.params);
                                const params = game.battle.params;

                                const healAmount = Math.ceil((params.phys_damage + params.magi_damage + params.crit_damage) * this.owner.variables.life_channel_rate);
                                console.log('Healing to all others: ' + healAmount);

                                if (healAmount > 0) {
                                    game.battle.allies
                                        .filter(x => x.name.toLowerCase() !== "betheros")
                                        .forEach(al => {
                                            al.addBaseStat(new Stat({ effect: Data.Effect.HEALTH, theorical: healAmount }));
                                        });
                                }
                            }
                        })
                    ],
                    skills: [
                        new Skill(
                            "Inner Fire",
                            "§Heals§ Betheros. Boosts the target's §Skill damage§ and replenishes their §Mana§ if it is an ally; reduces them if it's an enemy.",
                            13,
                            {
                                type: Data.SkillType.FRIENDLY,
                                manaCost: 3,
                                critMultiplier: 20,
                                accMultiplier: 85,
                                targets: { allies: '-123', enemies: '-123' },
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: [5, 12], isPercentage: true, type: Data.StatType.ACTIVE })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: [12, 18], isPercentage: true, type: Data.StatType.ACTIVE, isCritical: true })
                                        ]
                                    }
                                },
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.MODIF_DMG_SKILL, theorical: [13, 15], isPercentage: true, duration: 2 }),
                                            new Stat({ effect: Data.Effect.MANA, theorical: [15, 20], isPercentage: true, type: Data.StatType.ACTIVE })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.MODIF_DMG_SKILL, theorical: [20, 22], isPercentage: true, duration: 2, isCritical: true }),
                                            new Stat({ effect: Data.Effect.MANA, theorical: [25, 25], isPercentage: true, type: Data.StatType.ACTIVE, isCritical: true })
                                        ]
                                    }
                                },
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.MODIF_DMG_SKILL, theorical: [-10, -15], isPercentage: true, duration: 1 }),
                                            new Stat({ effect: Data.Effect.MANA, theorical: [-8, -10], isPercentage: true, type: Data.StatType.ACTIVE })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.MODIF_DMG_SKILL, theorical: [-25, -25], isPercentage: true, duration: 2, isCritical: true }),
                                            new Stat({ effect: Data.Effect.MANA, theorical: [-15, -15], isPercentage: true, type: Data.StatType.ACTIVE, isCritical: true })
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
                                manaCost: 7,
                                critMultiplier: 15,
                                accMultiplier: 100,
                                targets: { allies: '@123', enemies: '-0' },
                                cooldown: 3,
                                launchPos: [true, false, false],
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.SHIELD, theorical: [20, 25], duration: 3 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.SHIELD, theorical: [25, 30], duration: 4, isCritical: true })
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
                                manaCost: 3,
                                dmgType: Data.SkillDamageType.MAGICAL,
                                dmgMultiplier: 20,
                                criMultiplier: 10,
                                accMultiplier: 85,
                                targets: { allies: '-0', enemies: '-12' },
                                cooldown: 1,
                                launchPos: [true, true, false],
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: [3, 6], isPercentage: true, type: Data.StatType.ACTIVE })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: [5, 8], isPercentage: true, type: Data.StatType.ACTIVE, isCritical: true })
                                        ]
                                    }
                                },
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.PUSH_ONE })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.PUSH_ONE })
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
                                manaCost: 4,
                                criMultiplier: 15,
                                targets: { allies: '-123', enemies: '-0' },
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.MODIF_HEAL_GIVEN, theorical: [5, 10], isPercentage: true, duration: 2 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.MODIF_HEAL_GIVEN, theorical: [10, 15], isPercentage: true, duration: 2 })
                                        ]
                                    }
                                },
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: [10, 15], isPercentage: true, type: Data.StatType.ACTIVE })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: [15, 20], isPercentage: true, type: Data.StatType.ACTIVE, isCritical: true })
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
                                dmgType: Data.SkillDamageType.MAGICAL,
                                manaCost: 6,
                                dmgMultiplier: 90,
                                accMultiplier: 90,
                                criMultiplier: 10,
                                targets: { allies: '-0', enemies: '@23' },
                                cooldown: 2,
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.MANA, theorical: [10, 15], isPercentage: true, type: Data.StatType.ACTIVE, duration: 2 }),
                                            new Stat({ effect: Data.Effect.ACCURACY, theorical: 10, isPercentage: true, duration: 3 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.MANA, theorical: [15, 20], isPercentage: true, type: Data.StatType.ACTIVE, duration: 2, isCritical: true }),
                                            new Stat({ effect: Data.Effect.ACCURACY, theorical: 15, isPercentage: true, duration: 3, isCritical: true })
                                        ]
                                    }
                                },
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.DODGE, theorical: [-5, -8], isPercentage: true, duration: 3 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.DODGE, theorical: [-8, -12], isPercentage: true, duration: 3, isCritical: true })
                                        ]
                                    }
                                }
                            }
                        )
                    ],
                    striderType: Data.StriderType.SUPPORT,
                    uniqueName: "Life Channel",
                    uniqueDesc: '<div class="par">Each time Betheros deals or takes damage, the rest of the team is healed 10% of the damage amount.</div>',
                    uniqueQuote: '"Through the pain, you shall heal. And through healing, you shall embrace inner peace."',
                    uniqueIcon: 0,
                    skillTree: what(game.all_skillTrees, "amarok"),
                    customBgPos: '10% 30%'
                },
            ),
            new Strider(
                {
                    name: "Arazoth",
                    desc: "A bastion for the weak, the unbreakable lion shepherd Arazoth rejected the gods long ago. Through a thousand battles, he has never bled - and death itself avoids to mention his name.",
                    charset: Data.Charset.ARAZOTH,
                    subname: "The Shepherd",
                    health: 100, mana: 100, stamina: 100,
                    dodge: 10, speed: 12, accuracy: 85, protection: 0,
                    might: 5, spirit: 5,
                    resBleed: [0, 0], resPoison: [0, 0],
                    resMove: 30, resStun: 45,
                    resilience: 0, warding: 0,
                    critEffects: [
                        new Stat({ effect: Data.Effect.PROTECTION, theorical: [3, 7], isPercentage: true })
                    ],
                    striderType: Data.StriderType.TANK,
                    uniqueName: "Shepherd's Ward",
                    uniqueDesc: "Shepherd's Ward power description",
                    uniqueQuote: 'quote',
                    uniqueIcon: 1,
                    skillTree: what(game.all_skillTrees, "amarok"),
                    customBgPos: '10% 30%'
                },
            ),
            new Strider(
                {
                    name: "Haman",
                    desc: "A crack in reality allowed Haman to see beyond the sane world. A part of his soul has entered this breach, from which he now draws his unspeakable powers.",
                    charset: Data.Charset.HAMAN,
                    subname: "The Witness",
                    health: 100, mana: 100, stamina: 100,
                    dodge: 10, speed: 12, accuracy: 85, protection: 0,
                    might: 5, spirit: 5,
                    resBleed: [0, 0], resPoison: [0, 0],
                    resMove: 30, resStun: 45,
                    resilience: 0, warding: 0,
                    critEffects: [
                        new Stat({ effect: Data.Effect.WARDING, theorical: [3, 7] })
                    ],
                    striderType: Data.StriderType.SUPPORT,
                    uniqueName: "Whispers",
                    uniqueDesc: '<div class="par jus">Each entity that is targeted by one of Haman\'s skills enters a <span class="bold blue">Madness</span> state. Each skill further cast on a same target increases their Madness state by 1, up to 5. Various bonuses and maluses can be applied by consuming the <span class="bold blue">Madness</span> state, through Haman\'s <span class="bold blue">Beyond</span> skill.</div><div class="par bulleted"><span class="bold">Madness I</span>: Affects <span class="bold blue">Dodge</span> and <span class="bold blue">Accuracy</span></div><div class="par bulleted"><span class="bold">Madness II</span>: Affects <span class="bold blue">Protection</span></div><div class="par bulleted"><span class="bold">Madness III</span>: Affects <span class="bold blue">Received Heal</span> and <span class="bold  blue">Max. health</span></div><div class="par bulleted"><span class="bold">Madness IV</span>: Affects <span class="bold blue">Bleed and Poison resistance</span> and <span class="bold blue">Block value</span></div><div class="par bulleted"><span class="bold">Madness V</span>: Affects <span class="bold blue">Speed</span> and <span class="bold blue">Total damage</span></div>',
                    uniqueQuote: '"We are so fragile, compartmentalized in our narrow view of the world; and exposing our minds to new perspectives, to raw and violent realities, is wonderful, and devastating."',
                    uniqueIcon: 0,
                    skillTree: what(game.all_skillTrees, "amarok"),
                    customBgPos: '10% 50%',
                    variables: {
                        whispersDodge: [10, -15],
                        whispersAccuracy: [15, -20],
                        whispersProtection: [20, -15],
                        whispersReceivedHeal: [35, -40],
                        whispersMaxhealth: [25, -20],
                        whispersBleedAndPoison: [10, -10],
                        whispersBlock: [45, -75],
                        whispersSpeed: [5, -5],
                        whispersTotalDamage: [35, -50],
                        getMadnessEffects: function(stage, type) {
                            const accessor = type === "ally" ? 0 : 1;
                            switch (stage) {
                                case 1:
                                    return [
                                        new Stat({ effect: Data.Effect.DODGE, theorical: this.whispersDodge[accessor], isPercentage: true, duration: 2 }),
                                        new Stat({ effect: Data.Effect.ACCURACY, theorical: this.whispersAccuracy[accessor], isPercentage: true, duration: 2 }),
                                    ];
                                case 2:
                                    return [
                                        new Stat({ effect: Data.Effect.PROTECTION, theorical: this.whispersProtection[accessor], isPercentage: true, duration: 2 }),
                                    ];
                                case 3:
                                    return [
                                        new Stat({ effect: Data.Effect.MODIF_HEAL_RECV, theorical: this.whispersReceivedHeal[accessor], isPercentage: true, duration: 2 }),
                                        new Stat({ effect: Data.Effect.MAXHEALTH, theorical: this.whispersMaxhealth[accessor], isPercentage: true, duration: 2 }),
                                    ];
                                case 4:
                                    return [
                                        new Stat({ effect: Data.Effect.RES_BLEED_DMG, theorical: this.whispersBleedAndPoison[accessor], duration: 2 }),
                                        new Stat({ effect: Data.Effect.RES_POISON_DMG, theorical: this.whispersBleedAndPoison[accessor], duration: 2 }),
                                        new Stat({ effect: Data.Effect.MODIF_BLOCK, theorical: this.whispersBlock[accessor], isPercentage: true, duration: 2 }),
                                    ];
                                case 5:
                                    return [
                                        new Stat({ effect: Data.Effect.SPEED, theorical: this.whispersSpeed[accessor], duration: 2 }),
                                        new Stat({ effect: Data.Effect.MODIF_DMG_TOTAL, theorical: this.whispersTotalDamage[accessor], isPercentage: true, duration: 2 }),
                                    ]
                            }
                        },
                        updateMadness(target, value) {
                            if (target.variables.hasOwnProperty("madness") && value !== 0) {
                                if (target.variables.madness < 5) target.variables.madness = Math.min(5, target.variables.madness + value);
                            } else {
                                target.variables.madness = value;
                            }

                            target.badges.filter(x => x.name.toLowerCase().startsWith("madness")).forEach(badge => {
                                target.removeBadge(badge.name);
                            });
                            if (target.variables.madness > 0) target.addBadge(new BattleBadge({
                                name: "Madness " + romanize(target.variables.madness),
                                css: "madness",
                                tooltip: function() {
                                    let str = '';

                                    str += "Madness " + romanize(target.variables.madness);

                                    return str;
                                }
                            }));

                            console.log(target.name + " madness updated with " + value + ", now " + target.variables.madness);
                        }
                    },
                    triggers: [
                        new Trigger({
                            name: "haman_applyMadness",
                            type: [Data.TriggerType.ON_DEAL_SKILL],
                            behavior: function() {
                                const tar = game.battle.target[game.battle.targetTracker];

                                if (game.battle.selectedSkill.name.toLowerCase() === "beyond") return; // Skip for Beyond
                                this.owner.variables.updateMadness(tar, 1);

                                console.log(tar.name + "'s madness: " + tar.variables.madness);
                            }
                        })
                    ],
                    skills: [
                        new Skill(
                            "Beyond",
                            "Consumes the target's §Madness§ states. If it's an ally, regenerates their §Mana§ and applies a bonus according to their §Madness§. If it's an enemy, §Heals§ them and applies a malus according to their §Madness§. Applies a §Mana regeneration§ bonus to Haman.",
                            4,
                            {
                                type: Data.SkillType.FRIENDLY,
                                manaCost: 3,
                                criMultiplier: 15,
                                accMultiplier: 100,
                                targets: { allies: '-123', enemies: '-123' },
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.DUMMY, displayed: "$Consumes$ §Madness§" }),
                                            new Stat({ effect: Data.Effect.MANA, theorical: [15, 20], isPercentage: true, type: Data.StatType.ACTIVE }),
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.DUMMY, displayed: "$Consumes$ §Madness§" }),
                                            new Stat({ effect: Data.Effect.MANA, theorical: 25, isPercentage: true, type: Data.StatType.ACTIVE }),
                                        ]
                                    }
                                },
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.DUMMY, displayed: "$Consumes$ §Madness§" }),
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: [5, 10], isPercentage: true, type: Data.StatType.ACTIVE }),
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.DUMMY, displayed: "$Consumes$ §Madness§" }),
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: 5, isPercentage: true, type: Data.StatType.ACTIVE }),
                                        ]
                                    }
                                },
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.MANA, theorical: [5, 8], isPercentage: true, type: Data.StatType.ACTIVE, duration: 3 }),
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.MANA, theorical: 10, isPercentage: true, type: Data.StatType.ACTIVE, duration: 3 }),
                                        ]
                                    }
                                },
                                logicAny: {
                                    PRE_DAMAGE: function(tar) {
                                        console.log("DETECTED BEYOND TARGET:", tar);

                                        const madness = tar.variables.madness;
                                        if (madness && madness > 0) {
                                            const sk = this;
                                            const haman = sk.getOwner();
                                            const accessor = game.battle.allies.includes(tar) ? "ally" : "enemy";

                                            const effects = haman.variables.getMadnessEffects(madness, accessor);

                                            tar.applyEffects(sk, haman, effects, false);

                                            haman.variables.updateMadness(tar, 0);
                                        } else {
                                            console.error(tar.name + " has no Madness state or it's equal to 0! Skipping");
                                        }
                                    }
                                }
                            }
                        ),
                        new Skill(
                            "Revelation",
                            "Reduces the target's §Protection§. While the malus is active, if Haman attacks another target, the effect is canceled and applied to Haman for one round.",
                            1,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 4,
                                dmgMultiplier: 95,
                                criMultiplier: 10,
                                accMultiplier: 95,
                                dmgType: Data.SkillDamageType.MAGICAL,
                                cooldown: 2,
                                launchPos: [true, true, false],
                                targets: { allies: '-0', enemies: '-123' },
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.PROTECTION, theorical: [-35, -40], isPercentage: true, duration: 2 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.PROTECTION, theorical: -45, isPercentage: true, duration: 2, isCritical: true })
                                        ],
                                    }
                                },
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.HAMAN_REVELATION_MARKED, duration: 2 }),
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.HAMAN_REVELATION_MARKED, duration: 2, isCritical: true }),
                                        ],
                                    }
                                },
                                applyCasterEffectsOnlyOnHit: true,
                                applyCasterTriggersOnlyOnHit: true,
                                variables: {
                                    storedTarget: null
                                },
                                onCast: function() {
                                    this.variables.storedTarget = game.battle.target[0];
                                    console.log("Stored " + this.variables.storedTarget.name + " as Revelation's catalyst");
                                },
                                triggersCaster: [
                                    new Trigger({
                                        name: "revelationTrigger",
                                        type: Data.TriggerType.ON_DEAL_ATTACK,
                                        checker: function() {
                                            const tar = game.battle.target[game.battle.targetTracker];

                                            if (tar !== this.getOwner().variables.storedTarget) {
                                                const sk = this.getOwner();
                                                const haman = sk.getOwner();
                                                const ae = sk.variables.storedTarget.getActiveEffect("revelation") || sk.variables.storedTarget.getActiveEffect("revelation (critical)");

                                                haman.applyEffects(sk, haman, ae.effects, false);
                                                sk.variables.storedTarget.removeActiveEffect(ae.name);

                                                game.chatlog.addMessage(Data.ChatlogChannel.BATTLE, {
                                                    content: "Haman broke the seal of Revelation!",
                                                    style: {
                                                        className: "clgMsg-negative"
                                                    }
                                                }, game.battle.chatlogFolder);
                                            }
                                        }
                                    })
                                ]
                            }
                        ),
                        new Skill(
                            "Obey!",
                            "§Shatters guard§ of the target and §Pulls§ it by one position.",
                            2,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                dmgType: Data.SkillDamageType.MAGICAL,
                                dmgMultiplier: 45,
                                criMultiplier: 15,
                                accMultiplier: 100,
                                cooldown: 2,
                                launchPos: [true, true, false],
                                targets: { allies: '-0', enemies: '-23' },
                                manaCost: 6,
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.SHATTERS_GUARD }),
                                            new Stat({ effect: Data.Effect.PULL_TWO, chance: 100 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.SHATTERS_GUARD, isCritical: true }),
                                            new Stat({ effect: Data.Effect.PULL_TWO, chance: 100, isCritical: true })
                                        ]
                                    }
                                }
                            }
                        ),
                        new Skill(
                            "Ethereal Stitching",
                            "§Heals§ the targeted ally and regenerates their §Mana§ according to the total amount of §Madness§ states among allies and enemies.",
                            3,
                            {
                                type: Data.SkillType.FRIENDLY,
                                criMultiplier: 15,
                                accMultiplier: 100,
                                cooldown: 1,
                                targets: { allies: '-123', enemies: '-0' },
                                manaCost: 5,
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.DUMMY, theorical: [6, 8], isPercentage: true, displayed: "^° Health^ per global §Madness§ state" }),
                                            new Stat({ effect: Data.Effect.DUMMY, theorical: [8, 10], isPercentage: true, displayed: "^° Mana^ per global §Madness§ state" })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.DUMMY, theorical: 10, isPercentage: true, displayed: "^° Health^ per global §Madness§ state", isCritical: true }),
                                            new Stat({ effect: Data.Effect.DUMMY, theorical: 12, isPercentage: true, displayed: "^° Mana^ per global §Madness§ state", isCritical: true })
                                        ]
                                    }
                                },
                                logicAllies: {
                                    PRE_DAMAGE: function(tar) {
                                        let totalMadness = 0;
                                        game.battle.order.forEach(npc => {
                                            if (npc.variables.hasOwnProperty("madness") && npc.variables.madness > 0) totalMadness++;
                                        });

                                        const baseHeal = game.battle.params.critical ? 10 : getRandomNumber(6, 8);
                                        const baseMana = game.battle.params.critical ? 12 : getRandomNumber(8, 10);
                                        const heal = baseHeal * totalMadness;
                                        const mana = baseMana * totalMadness;

                                        tar.addBaseStat(new Stat({ effect: Data.Effect.HEALTH, theorical: heal }));
                                        tar.addBaseStat(new Stat({ effect: Data.Effect.MANA, theorical: mana }));
                                    }
                                }
                            }
                        ),
                        new Skill(
                            "Clairvoyance",
                            "Boosts the target's §Dodge§ for one round, and reduces it next round.",
                            5,
                            {
                                type: Data.SkillType.BOTH,
                                criMultiplier: 10,
                                accMultiplier: 90,
                                cooldown: 2,
                                targets: { allies: '-12', enemies: '-23' },
                                manaCost: 4,
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.DODGE, theorical: 50, duration: 1, isPercentage: true }),
                                            new Stat({ effect: Data.Effect.DODGE, theorical: -35, duration: 1, isPercentage: true, delay: 1 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.DODGE, theorical: 55, duration: 1, isPercentage: true }),
                                            new Stat({ effect: Data.Effect.DODGE, theorical: -20, duration: 1, isPercentage: true, delay: 1 })
                                        ],
                                    }
                                },
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.DODGE, theorical: 50, duration: 1, isPercentage: true }),
                                            new Stat({ effect: Data.Effect.DODGE, theorical: -35, duration: 1, isPercentage: true, delay: 1 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.DODGE, theorical: 55, duration: 1, isPercentage: true }),
                                            new Stat({ effect: Data.Effect.DODGE, theorical: -20, duration: 1, isPercentage: true, delay: 1 })
                                        ],
                                    }
                                },
                            }
                        )
                    ],
                },
            ),
            new Strider(
                {
                    name: "Zurij",
                    desc: "Can you hear that laughter hooting at dawn? Enjoy your last sunset. For after death, honor withers, distinctions fade; and comes eternal suffering.",
                    charset: Data.Charset.ZURIJ,
                    subname: "The One Who Laughs At Death",
                    health: 100, mana: 100, stamina: 100,
                    dodge: 10, speed: 12, accuracy: 85, protection: 0,
                    might: 5, spirit: 5,
                    resBleed: [0, 0], resPoison: [0, 0],
                    resMove: 30, resStun: 45,
                    resilience: 0, warding: 0,
                    critEffects: [
                        new Stat({ effect: Data.Effect.PROTECTION, theorical: [3, 7], isPercentage: true })
                    ],
                    striderType: Data.StriderType.STRIKER,
                    uniqueName: "Bend Death",
                    uniqueDesc: "Bend Death power description",
                    uniqueQuote: 'quote',
                    uniqueIcon: 1,
                    skillTree: what(game.all_skillTrees, "amarok"),
                    customBgPos: '10% 20%'
                },
            ),
            new Strider(
                {
                    name: "Mirai",
                    desc: "Lorem ipsum",
                    charset: Data.Charset.MIRAI,
                    subname: "The Time Twister",
                    health: 100, mana: 100, stamina: 100,
                    dodge: 10, speed: 12, accuracy: 85, protection: 0,
                    might: 5, spirit: 5,
                    resBleed: [0, 0], resPoison: [0, 0],
                    resMove: 30, resStun: 45,
                    resilience: 0, warding: 0,
                    critEffects: [
                        new Stat({ effect: Data.Effect.PROTECTION, theorical: [3, 7], isPercentage: true })
                    ],
                    striderType: Data.StriderType.SUPPORT,
                    uniqueName: "Timecracks",
                    uniqueDesc: "Timecracks power description",
                    uniqueQuote: 'quote',
                    uniqueIcon: 1,
                    skillTree: what(game.all_skillTrees, "amarok"),
                    customBgPos: '10% 20%'
                },
            ),
            new Strider(
                {
                    name: "Juba Jun",
                    desc: "No one knows anything about Juba Jun and his interests except himself. His thoughts will be the guardians of the truth, and his mouth will never betray.",
                    charset: Data.Charset.JUBA_JUN,
                    subname: "The Goldenpaw",
                    health: 100, mana: 100, stamina: 100,
                    dodge: 10, speed: 12, accuracy: 85, protection: 0,
                    might: 5, spirit: 5,
                    resBleed: [0, 0], resPoison: [0, 0],
                    resMove: 30, resStun: 45,
                    resilience: 0, warding: 0,
                    critEffects: [
                        new Stat({ effect: Data.Effect.PROTECTION, theorical: [3, 7], isPercentage: true })
                    ],
                    striderType: Data.StriderType.TANK,
                    uniqueName: "Will of the Dragon",
                    uniqueDesc: "Will of the Dragon power description",
                    uniqueQuote: 'quote',
                    uniqueIcon: 1,
                    skillTree: what(game.all_skillTrees, "amarok"),
                    customBgPos: '10% 50%'
                },
            ),
            new Strider(
                {
                    name: "Khej",
                    desc: "A childhood friend of Naka, the belief that she was dead drove Khej to madness and regret. He now dances in the darkness, appearing and disappearing, leaving sharp blades in his wake.",
                    charset: Data.Charset.KHEJ,
                    subname: "The Betrayed",
                    health: 100, mana: 100, stamina: 100,
                    dodge: 10, speed: 12, accuracy: 85, protection: 0,
                    might: 5, spirit: 5,
                    resBleed: [0, 0], resPoison: [0, 0],
                    resMove: 30, resStun: 45,
                    resilience: 0, warding: 0,
                    critEffects: [
                        new Stat({ effect: Data.Effect.PROTECTION, theorical: [3, 7], isPercentage: true })
                    ],
                    striderType: Data.StriderType.STRIKER,
                    uniqueName: "Revenge of the Fallen",
                    uniqueDesc: "Revenge of the Fallen power description",
                    uniqueQuote: 'quote',
                    uniqueIcon: 1,
                    skillTree: what(game.all_skillTrees, "amarok"),
                    customBgPos: '10% 50%'
                },
            )
        ];

        for (const strider of striders) {
            game.all_striders.push(strider);
            strider.triggers.forEach(tr => {
                tr.owner = strider;
            })
            strider.bindSkills();
            addStriderTypeBonuses(strider);
        }
    },

    loadEnemies: loadEnemies = () => {
        const enemies = [
            new Enemy(
                {
                    name: "Mycelial Tick",
                    desc: "This monster is weak, but it's swift (high Speed and Dodge) and applies poison.",
                    charset: Data.Charset.MYCELIAL_TICK,
                    subname: "Subname",
                    health: 35, mana: 35, stamina: 35,
                    dodge: 20, speed: 15, accuracy: 85, protection: 0,
                    might: 5, spirit: 5,
                    resBleed: [0, 0], resPoison: [2, 0],
                    resMove: 20, resStun: 25,
                    resilience: 0, warding: 4,
                    mobType: Data.MobType.LESSER,
                    skills: [
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
                                targets: { allies: '-0', enemies: '-123' },
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.BLIGHT_CURABLE, theorical: [2, 4], type: Data.StatType.ACTIVE, duration: 2 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.BLIGHT_CURABLE, theorical: [4, 6], type: Data.StatType.ACTIVE, duration: 2 })
                                        ]
                                    }
                                }
                            }
                        )
                    ],
                    behavior: new EnemyBehavior({
                        actions: [
                            new EnemyAction({
                                title: 'regular',
                                owner: function() { return what(game.battle.enemies, "mycelial tick") },
                                checker: function() { return this.owner.skills[0].manaCost <= this.owner.mana },
                                behavior: function() {
                                    game.battle.target.push(choose(game.battle.allies));
                                    game.battle.selectedSkill = this.owner.skills[0];
                                    console.log('attacking ' + game.battle.target[0].name + ' with ' + game.battle.selectedSkill.name);
                                    game.battle.executeSkill();

                                }
                            }),
                            new EnemyAction({
                                title: 'block',
                                owner: function() { return what(game.battle.enemies, "mycelial tick") },
                                checker: function() { return this.owner.stamina > 0 },
                                behavior: function() {
                                    console.log('blocks');
                                    this.owner.applyBlocking();
                                    this.owner.removeBaseStat(new Stat({ effect: Data.Effect.STAMINA, theorical: 5 }));
                                    this.owner.addBaseStat(new Stat({ effect: Data.Effect.MANA, theorical: 5 }));
                                    game.battle.finishTurn();
                                }
                            }),
                        ]
                    }),
                    drops: {
                        resource: new LootParams({
                            pool: {
                                "dark stone": 100,
                                "decaying petals": 100,
                                "silver essence": 100,
                                "minor time shard": [35, 2],
                                "reminder": [90, [2, 5]],
                            }
                        }),
                        trinket: new LootParams({
                            pool: {
                                "goodsight doll": 100,
                                "omen insignia": 100
                            }
                        }),
                        gold: [0, 20]
                    }
                },
            ),
            new Enemy(
                {
                    name: "Fungaliant",
                    desc: "Very resistant to poison damage, this monster heals others and reduces your resistances.",
                    charset: Data.Charset.FUNGALIANT,
                    subname: "Subname",
                    health: 50, mana: 50, stamina: 50,
                    dodge: 10, speed: 10, accuracy: 85, protection: 10,
                    might: 10, spirit: 10,
                    resBleed: [0, 0], resPoison: [5, 0],
                    resMove: 20, resStun: 25,
                    resilience: 0, warding: 4,
                    mobType: Data.MobType.REGULAR,
                    skills: [
                        new Skill(
                            "Spores of Abundance",
                            "",
                            0,
                            {
                                type: Data.SkillType.FRIENDLY,
                                manaCost: 20,
                                criMultiplier: 15,
                                targets: { allies: '-123', enemies: '-0' },
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: [15, 20], isPercentage: true, type: Data.StatType.ACTIVE }),
                                            new Stat({ effect: Data.Effect.MODIF_CRIT_SKILL, theorical: [10, 15], isPercentage: true, duration: 2 }),
                                            new Stat({ effect: Data.Effect.MANA, theorical: [20, 25], isPercentage: true, type: Data.StatType.ACTIVE, duration: 2 }),
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: [20, 25], isPercentage: true, type: Data.StatType.ACTIVE, isCritical: true }),
                                            new Stat({ effect: Data.Effect.MODIF_CRIT_SKILL, theorical: [15, 20], isPercentage: true, duration: 2, isCritical: true }),
                                            new Stat({ effect: Data.Effect.MANA, theorical: [20, 25], isPercentage: true, type: Data.StatType.ACTIVE, duration: 2, isCritical: true }),
                                        ]
                                    }
                                }
                            }
                        ),
                        new Skill(
                            "Debilitating Roots",
                            "",
                            0,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 10,
                                dmgType: Data.SkillDamageType.MAGICAL,
                                dmgMultiplier: 80,
                                criMultiplier: 20,
                                accMultiplier: 90,
                                cooldown: 2,
                                launchPos: [false, true, true],
                                targets: { allies: '-0', enemies: '@123' },
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.RES_POISON_DMG, theorical: [-5, -10], duration: 2 }),
                                            new Stat({ effect: Data.Effect.WARDING, theorical: [-8, -10], duration: 2 }),
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.RES_POISON_DMG, theorical: [-5, -10], duration: 2, isCritical: true }),
                                            new Stat({ effect: Data.Effect.WARDING, theorical: [-8, -10], duration: 2, isCritical: true }),
                                        ]
                                    }
                                }
                            }
                        ),
                        new Skill(
                            "Repositioning",
                            "",
                            0,
                            {
                                type: Data.SkillType.BOTH,
                                manaCost: 0,
                                criMultiplier: 15,
                                accMultiplier: 100,
                                dmgMultiplier: 110,
                                dmgType: Data.SkillDamageType.PHYSICAL,
                                launchPos: [true, false, false],
                                targets: { allies: '-1', enemies: '-1' },
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.BACK_ONE }),
                                            new Stat({ effect: Data.Effect.PROTECTION, theorical: 8, duration: 2, isPercentage: true }),
                                            new Stat({ effect: Data.Effect.MANA, theorical: 15, isPercentage: true, type: Data.StatType.ACTIVE })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.BACK_TWO }),
                                            new Stat({ effect: Data.Effect.PROTECTION, theorical: 5, duration: 2, isPercentage: true, isCritical: true }),
                                            new Stat({ effect: Data.Effect.MANA, theorical: 20, isPercentage: true, type: Data.StatType.ACTIVE, isCritical: true }),
                                        ]
                                    }
                                }
                            }
                        )
                    ],
                    behavior: new EnemyBehavior({
                        actions: [
                            new EnemyAction({
                                title: 'move back',
                                owner: function() { return what(game.battle.enemies, "fungaliant") },
                                checker: function() {
                                    return this.owner.getSelfPosInBattle() === Data.FormationPosition.FRONT;
                                },
                                behavior: function() {
                                    console.log(this.title);
                                    game.battle.target.push(game.battle.allies[2]);
                                    game.battle.selectedSkill = this.owner.skills[2];
                                    game.battle.executeSkill();
                                }
                            }),
                            new EnemyAction({
                                title: 'weaken striders',
                                owner: function() { return what(game.battle.enemies, "fungaliant") },
                                checker: function() {
                                    return this.owner.skills[1].cooldownCountdown === 0 && this.owner.skills[1].manaCost <= this.owner.mana;
                                },
                                behavior: function() {
                                    console.log(this.title);
                                    game.battle.target.push(
                                        game.battle.allies[0],
                                        game.battle.allies[1],
                                        game.battle.allies[2]
                                    );
                                    game.battle.selectedSkill = this.owner.skills[1];
                                    game.battle.executeSkill();
                                }
                            }),
                            new EnemyAction({
                                title: 'heal enemies',
                                owner: function() { return what(game.battle.enemies, "fungaliant") },
                                checker: function() {
                                    return this.owner.skills[0].manaCost <= this.owner.mana;
                                },
                                behavior: function() {
                                    console.log(this.title);
                                    game.battle.target.push(
                                        findNPCWithLowestStat(
                                            game.battle.enemies.filter(x => x.health > 0),
                                            Data.Effect.HEALTH
                                        )
                                    );
                                    game.battle.selectedSkill = this.owner.skills[0];
                                    game.battle.executeSkill();
                                }
                            }),
                            new EnemyAction({
                                title: 'block',
                                owner: function() { return what(game.battle.enemies, "fungaliant") },
                                checker: function() {
                                    return this.owner.stamina > 0;
                                },
                                behavior: function() {
                                    console.log(this.title);
                                    this.owner.applyBlocking();
                                    this.owner.removeBaseStat(new Stat({ effect: Data.Effect.STAMINA, theorical: 5 }));
                                    this.owner.addBaseStat(new Stat({ effect: Data.Effect.MANA, theorical: 5 }));
                                    game.battle.finishTurn();
                                }
                            })
                        ]
                    }),
                },
            ),
            new Enemy(
                {
                    name: "Gnarly Horror",
                    desc: "Be aware of their high Stun power ; they also don't hesitate to Guard their allies while also increasing their Protection.",
                    charset: Data.Charset.GNARLY_HORROR,
                    subname: "Subname",
                    health: 120, mana: 120, stamina: 120,
                    dodge: 5, speed: 8, accuracy: 85, protection: 35,
                    might: 20, spirit: 20,
                    resBleed: [2, 0], resPoison: [5, 0],
                    resMove: 80, resStun: 50,
                    resilience: 10, warding: 10,
                    mobType: Data.MobType.MAJOR,
                    skills: [
                        new Skill(
                            "Armored Bark",
                            "",
                            0,
                            {
                                type: Data.SkillType.FRIENDLY,
                                manaCost: 10,
                                cooldown: 3,
                                criMultiplier: 10,
                                accMultiplier: 100,
                                targets: { allies: '-123', enemies: '-0' },
                                launchPos: [true, true, true],
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.GUARDING, duration: 2 }),
                                            new Stat({ effect: Data.Effect.PROTECTION, theorical: [15, 20], isPercentage: true, duration: 2 }),
                                            new Stat({ effect: Data.Effect.RES_STUN, theorical: [15, 20], isPercentage: true, duration: 2 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.GUARDING, duration: 2, isCritical: true }),
                                            new Stat({ effect: Data.Effect.PROTECTION, theorical: 22, isPercentage: true, duration: 2, isCritical: true }),
                                            new Stat({ effect: Data.Effect.RES_STUN, theorical: 22, isPercentage: true, duration: 2, isCritical: true })
                                        ]
                                    }
                                },
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.GUARDED, duration: 2 }),
                                            new Stat({ effect: Data.Effect.MODIF_DMG_TOTAL, theorical: [10, 15], isPercentage: true, duration: 1 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.GUARDED, duration: 2 }),
                                            new Stat({ effect: Data.Effect.MODIF_DMG_TOTAL, theorical: 18, isPercentage: true, duration: 1 })
                                        ]
                                    }
                                },
                                variables: {
                                    guarded: null,
                                    guarding: null
                                }
                            }
                        ),
                        new Skill(
                            "Sprawling Crush",
                            "",
                            0,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 20,
                                cooldown: 2,
                                dmgMultiplier: 120,
                                dmgType: Data.SkillDamageType.PHYSICAL,
                                criMultiplier: 5,
                                accMultiplier: 90,
                                targets: { allies: '-12', enemies: '-0' },
                                launchPos: [true, true, false],
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.STUN, duration: 2, chance: 100 }),
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.STUN, duration: 2, chance: 100 }),
                                            new Stat({ effect: Data.Effect.BACK_ONE, chance: 100 })
                                        ]
                                    }
                                }
                            }
                        ),
                        new Skill(
                            "Advance",
                            "",
                            0,
                            {
                                type: Data.SkillType.FRIENDLY,
                                manaCost: 0,
                                criMultiplier: 15,
                                launch: [true, false, false],
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.FRONT_TWO }),
                                            new Stat({ effect: Data.Effect.WARDING, theorical: [10, 15], duration: 1 }),
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.FRONT_TWO }),
                                            new Stat({ effect: Data.Effect.WARDING, theorical: 18, duration: 2 }),
                                            new Stat({ effect: Data.Effect.RES_STUN, theorical: 10, duration: 1 })
                                        ]
                                    }
                                }
                            }
                        )
                    ],
                    behavior: new EnemyBehavior({
                        actions: [
                            new EnemyAction({
                                title: 'protecc',
                                owner: function() { return what(game.battle.enemies, "gnarly horror") },
                                checker: function() {
                                    return this.owner.skills[0].cooldownCountdown === 0 && this.owner.skills[0].manaCost <= this.owner.mana;
                                },
                                behavior: function() {
                                    console.log(this.title);
                                    const lowest = findNPCWithLowestStat(game.battle.enemies.filter(x => x.health > 0), "health");
                                    game.battle.target.push(lowest);
                                    game.battle.selectedSkill = this.owner.skills[0];
                                    game.battle.executeSkill();
                                }
                            }),
                            new EnemyAction({
                                title: 'stun',
                                owner: function() { return what(game.battle.enemies, "gnarly horror") },
                                checker: function() {
                                    return this.owner.skills[1].cooldownCountdown === 0 && this.owner.skills[1].manaCost <= this.owner.mana;
                                },
                                behavior: function() {
                                    console.log(this.title);
                                    const lowest = findNPCWithLowestStat(game.battle.allies.filter(x => x.health > 0 && x.getSelfPosInBattle() != Data.FormationPosition.BACK), "resStun");
                                    game.battle.target.push(lowest);
                                    game.battle.selectedSkill = this.owner.skills[1];
                                    game.battle.executeSkill();
                                }
                            }),
                            new EnemyAction({
                                title: 'move forward',
                                owner: function() { return what(game.battle.enemies, "gnarly horror") },
                                checker: function() {
                                    return this.owner.getSelfPosInBattle() === Data.FormationPosition.BACK
                                },
                                behavior: function() {
                                    console.log(this.title);
                                    game.battle.selectedSkill = this.owner.skills[2];
                                    game.battle.executeSkill();
                                }
                            }),
                            new EnemyAction({
                                title: 'block',
                                owner: function() { return what(game.battle.enemies, "gnarly horror") },
                                checker: function() {
                                    return this.owner.stamina > 0;
                                },
                                behavior: function() {
                                    console.log(this.title);
                                    this.owner.applyBlocking();
                                    this.owner.removeBaseStat(new Stat({ effect: Data.Effect.STAMINA, theorical: 5 }));
                                    this.owner.addBaseStat(new Stat({ effect: Data.Effect.MANA, theorical: 10 }));
                                    game.battle.finishTurn();
                                }
                            })
                        ]
                    }),
                },
            ),
            new Enemy(
                {
                    name: "Fire Hatchling",
                    desc: "You better not kill this little dude if a Fire Iguana is around...",
                    charset: Data.Charset.FIRE_HATCHLING,
                    subname: "Subname",
                    health: 25, mana: 35, stamina: 35,
                    dodge: 20, speed: 15, accuracy: 85, protection: 0,
                    might: 5, spirit: 5,
                    resBleed: [0, 0], resPoison: [2, 0],
                    resMove: 20, resStun: 25,
                    resilience: 0, warding: 4,
                    triggers: [
                        new Trigger({
                            name: "fireHatchling_death_boostIguanas",
                            type: Data.TriggerType.ON_DEATH,
                            checker: function() {
                                const target = game.battle.enemies.find(x => x.name.toLowerCase() === "fire iguana")

                                return target && !target.getActiveEffect("matriarch rage");
                            },
                            behavior: function() {
                                const tar = choose(game.battle.enemies.filter(x => x.name.toLowerCase() === "fire iguana"));

                                const bonuses = [
                                    new Stat({ effect: Data.Effect.MODIF_DMG_TOTAL, theorical: 15, duration: 5, isPercentage: true }),
                                    new Stat({ effect: Data.Effect.SPEED, theorical: 3, duration: 5 }),
                                    new Stat({ effect: Data.Effect.RESILIENCE, theorical: 5, duration: 5 }),
                                ];
                                bonuses.forEach(bo => {
                                    tar.alter({
                                        effect: bo,
                                        action: Data.AlterAction.ADD,
                                        origin: {
                                            type: Data.ActiveEffectType.POWER,
                                            name: "Matriarch Rage",
                                        }
                                    });
                                });
                                tar.addActiveEffect(new ActiveEffect({
                                    name: "Matriarch Rage",
                                    originUser: this.getOwner(),
                                    originObject: Data.ActiveEffectType.POWER,
                                    effects: bonuses,
                                    style: {
                                        color: Data.Color.PURPLE,
                                        bold: true
                                    }
                                }));

                                game.chatlog.addMessage(Data.ChatlogChannel.BATTLE, {
                                    content: this.getOwner().name + "'s death enraged a " + tar.name + "!",
                                    style: {
                                        className: "clgMsg-negative"
                                    }
                                }, game.battle.chatlogFolder);
                            }
                        })
                    ],
                    mobType: Data.MobType.LESSER,
                    skills: [
                        new Skill(
                            "Burning Bile",
                            "",
                            0,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 10,
                                dmgType: Data.SkillDamageType.MAGICAL,
                                dmgMultiplier: 100,
                                criMultiplier: 15,
                                accMultiplier: 85,
                                cooldown: 2,
                                targets: { allies: '-0', enemies: '@12' },
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.BLIGHT_CURABLE, theorical: [2, 3], type: Data.StatType.ACTIVE, duration: 2 }),
                                            new Stat({ effect: Data.Effect.RES_POISON_DMG, theorical: [-2, -3], duration: 2 }),
                                            new Stat({ effect: Data.Effect.PROTECTION, theorical: -10, isPercentage: true, duration: 2})
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.BLIGHT_CURABLE, theorical: [3, 4], type: Data.StatType.ACTIVE, duration: 2, isCritical: true }),
                                            new Stat({ effect: Data.Effect.RES_POISON_DMG, theorical: [-3, -4], duration: 2 }),
                                            new Stat({ effect: Data.Effect.PROTECTION, theorical: -10, isPercentage: true, duration: 2})
                                        ]
                                    }
                                }
                            }
                        ),
                        new Skill(
                            "Tail Strike",
                            "",
                            0,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 10,
                                dmgType: Data.SkillDamageType.PHYSICAL,
                                dmgMultiplier: 90,
                                criMultiplier: 20,
                                accMultiplier: 95,
                                targets: { allies: '-0', enemies: '@23' },
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.DODGE, theorical: -5, isPercentage: true, duration: 2 }),
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.DODGE, theorical: -7, isPercentage: true, duration: 2, isCritical: true }),
                                        ]
                                    }
                                }
                            }
                        )
                    ],
                    behavior: new EnemyBehavior({
                        actions: [
                            new EnemyAction({
                                title: 'regular',
                                owner: function() { return what(game.battle.enemies, "fire hatchling") },
                                checker: function() { return this.owner.canUseSkill("burning bile") || this.owner.canUseSkill("tail strike") },
                                behavior: function() {
                                    if (this.owner.canUseSkill("burning bile")) {
                                        game.battle.target.push(game.battle.allies[2]);
                                        game.battle.target.push(game.battle.allies[1]);
                                        game.battle.selectedSkill = this.owner.skills[0];
                                    } else {
                                        game.battle.target.push(game.battle.allies[1]);
                                        game.battle.target.push(game.battle.allies[0]);
                                        game.battle.selectedSkill = this.owner.skills[1];
                                    }

                                    game.battle.executeSkill();
                                }
                            }),
                            new EnemyAction({
                                title: 'block',
                                owner: function() { return what(game.battle.enemies, "fire hatchling") },
                                checker: function() { return this.owner.stamina > 0 },
                                behavior: function() {
                                    this.owner.applyBlocking();
                                    this.owner.removeBaseStat(new Stat({ effect: Data.Effect.STAMINA, theorical: 5 }));
                                    this.owner.addBaseStat(new Stat({ effect: Data.Effect.MANA, theorical: 5 }));
                                    game.battle.finishTurn();
                                }
                            })
                        ]
                    }),
                },
            ),
            new Enemy(
                {
                    name: "Fire Iguana",
                    desc: "Dealing high poison damage and resistance debuffs, they leave a hatchling behind them upon dying.",
                    charset: Data.Charset.FIRE_IGUANA,
                    subname: "Subname",
                    health: 50, mana: 50, stamina: 50,
                    dodge: 10, speed: 10, accuracy: 85, protection: 10,
                    might: 10, spirit: 10,
                    resBleed: [0, 0], resPoison: [5, 0],
                    resMove: 20, resStun: 25,
                    resilience: 0, warding: 4,
                    mobType: Data.MobType.REGULAR,
                    skills: [
                        new Skill(
                            "Survival of the Species",
                            "",
                            0,
                            {
                                type: Data.SkillType.FRIENDLY,
                                manaCost: 15,
                                criMultiplier: 10,
                                targets: { allies: '-123', enemies: '-0' },
                                launchPos: [true, false, false],
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: [50, 60], isPercentage: true, type: Data.StatType.ACTIVE }),
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.HEALTH, theorical: [70, 75], isPercentage: true, type: Data.StatType.ACTIVE, isCritical: true }),
                                        ]
                                    }
                                }
                            }
                        ),
                        new Skill(
                            "Flaming Bile",
                            "",
                            0,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 10,
                                dmgType: Data.SkillDamageType.MAGICAL,
                                criMultiplier: 10,
                                accMultiplier: 90,
                                cooldown: 3,
                                targets: { allies: '-0', enemies: '-123' },
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.BLIGHT_CURABLE, theorical: [4, 5], type: Data.StatType.ACTIVE, duration: 2 }),
                                            new Stat({ effect: Data.Effect.RESILIENCE, theorical: [-8, -12], duration: 2 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.BLIGHT_CURABLE, theorical: [5, 6], type: Data.StatType.ACTIVE, duration: 2 }),
                                            new Stat({ effect: Data.Effect.RESILIENCE, theorical: [-12, -15], duration: 2 })
                                        ]
                                    }
                                }
                            }
                        )
                    ],
                    behavior: new EnemyBehavior({
                        actions: [
                            new EnemyAction({
                                title: 'attack striders',
                                owner: function() { return what(game.battle.enemies, "fire iguana") },
                                checker: function() {
                                    return this.owner.skills[1].cooldownCountdown === 0 && this.owner.skills[1].manaCost <= this.owner.mana;
                                },
                                behavior: function() {
                                    console.log(this.title);
                                    game.battle.target.push(choose(game.battle.allies.filter(x => x.health > 0)));
                                    game.battle.selectedSkill = this.owner.skills[1];
                                    game.battle.executeSkill();
                                }
                            }),
                            new EnemyAction({
                                title: 'regen hatchlings',
                                owner: function() { return what(game.battle.enemies, "fire iguana") },
                                checker: function() {
                                    const valid = game.battle.enemies.find(x => x.name.toLowerCase() === "fire hatchling" && x.health < x.maxHealth * 0.75 && !x.isDead());
                                    if (valid && this.owner.getSelfPosInBattle() === Data.FormationPosition.FRONT && this.owner.skills[0].manaCost <= this.owner.mana) return true;
                                    return false;
                                },
                                behavior: function() {
                                    console.log(this.title);
                                    const tar = game.battle.enemies.find(x => x.name.toLowerCase() === "fire hatchling" && x.health < x.maxHealth * 0.75);
                                    game.battle.target.push(tar);
                                    game.battle.selectedSkill = this.owner.skills[0];
                                    game.battle.executeSkill();
                                }
                            }),
                            new EnemyAction({
                                title: 'move forward',
                                owner: function() { return what(game.battle.enemies, "fire iguana") },
                                checker: function() {
                                    const valid = game.battle.enemies.find(x => x.name.toLowerCase() === "fire hatchling" && x.health < x.maxHealth * 0.75);
                                    if (valid && this.owner.getSelfPosInBattle() !== Data.FormationPosition.FRONT) return true;
                                    return false;
                                },
                                behavior: function() {
                                    console.log(this.title);
                                    game.battle.move(game.battle.currentPlay, Data.FormationPosition.FRONT, "e");
                                    setTimeout(() => { game.battle.finishTurn(); }, 300);
                                }
                            }),
                            new EnemyAction({
                                title: 'block',
                                owner: function() { return what(game.battle.enemies, "fire iguana") },
                                checker: function() { return this.owner.stamina > 0 },
                                behavior: function() {
                                    this.owner.applyBlocking();
                                    this.owner.removeBaseStat(new Stat({ effect: Data.Effect.STAMINA, theorical: 5 }));
                                    this.owner.addBaseStat(new Stat({ effect: Data.Effect.MANA, theorical: 5 }));
                                    game.battle.finishTurn();
                                }
                            })
                        ]
                    })
                }
            ),
            new Enemy(
                {
                    name: "The Maw",
                    desc: "As an abnormally large Carmine Alligator, he'll wait for you to attack first, only to never stop mauling the first striker.",
                    charset: Data.Charset.THE_MAW,
                    subname: "Subname",
                    health: 200, mana: 150, stamina: 100,
                    dodge: 5, speed: 8, accuracy: 85, protection: 35,
                    might: 20, spirit: 20,
                    resBleed: [5, 0], resPoison: [5, 0],
                    resMove: 80, resStun: 50,
                    resilience: 10, warding: 10,
                    mobType: Data.MobType.LESSER_BOSS,
                    variables: {
                        mainTarget: null
                    },
                    triggers: [
                        new Trigger({
                            name: "theMaw_setMainTarget",
                            type: [Data.TriggerType.ON_RECV_DAMAGE],
                            checker: function() {
                                return !this.getOwner().variables.mainTarget
                            },
                            behavior: function() {
                                this.getOwner().variables.mainTarget = game.battle.currentPlay;

                                game.chatlog.addMessage(Data.ChatlogChannel.BATTLE, {
                                    content: "The Maw has started preying on " + this.getOwner().variables.mainTarget.name + ".",
                                    style: {
                                        className: "clgMsg-negative"
                                    }
                                }, game.battle.chatlogFolder);
                            }
                        }),
                    ],
                    skills: [
                        new Skill(
                            "Predator Tenacity",
                            "",
                            0,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 15,
                                cooldown: 1,
                                dmgMultiplier: 120,
                                dmgType: Data.SkillDamageType.PHYSICAL,
                                criMultiplier: 20,
                                accMultiplier: 95,
                                targets: { allies: '-0', enemies: '-123' },
                                launchPos: [true, true, false],
                                effectsAllies: {
                                    1: {
                                        regular: [

                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.STUN, duration: 1, chance: 100, isCritical: true })
                                        ],
                                    }
                                },
                            }
                        ),
                        new Skill(
                            "Ravage",
                            "",
                            0,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 20,
                                cooldown: 1,
                                dmgMultiplier: 110,
                                dmgType: Data.SkillDamageType.PHYSICAL,
                                criMultiplier: 15,
                                accMultiplier: 85,
                                targets: { allies: '-0', enemies: '@123' },
                                launchPos: [true, true, false],
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.BLEEDING_INCURABLE, duration: 2, type: Data.StatType.ACTIVE, theorical: [5, 6] })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.BLEEDING_INCURABLE, duration: 2, type: Data.StatType.ACTIVE, theorical: 8, isCritical: true })
                                        ],
                                    }
                                },
                            }
                        ),
                        new Skill(
                            "Reptilian Regrowth",
                            "",
                            0,
                            {
                                type: Data.SkillType.FRIENDLY,
                                manaCost: 10,
                                cooldown: 1,
                                criMultiplier: 15,
                                accMultiplier: 100,
                                targets: { allies: '-123', enemies: '-0' },
                                launchPos: [true, true, true],
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.HEALTH, type: Data.StatType.ACTIVE, theorical: [20, 25], isPercentage: true }),
                                            new Stat({ effect: Data.Effect.MODIF_DMG_TOTAL, theorical: [10, 15], isPercentage: true, duration: 2 }),
                                            new Stat({ effect: Data.Effect.PROTECTION, theorical: [5, 8], isPercentage: true, duration: 2 }),
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.HEALTH, type: Data.StatType.ACTIVE, theorical: [25, 30], isPercentage: true, isCritical: true }),
                                            new Stat({ effect: Data.Effect.MODIF_DMG_TOTAL, theorical: [18, 20], isPercentage: true, duration: 2, isCritical: true }),
                                            new Stat({ effect: Data.Effect.PROTECTION, theorical: 10, isPercentage: true, duration: 2, isCritical: true }),
                                        ],
                                    }
                                }
                            }
                        ),
                        new Skill(
                            "Apex Tracking",
                            "",
                            0,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 10,
                                cooldown: 2,
                                dmgMultiplier: 130,
                                dmgType: Data.SkillDamageType.PHYSICAL,
                                criMultiplier: 20,
                                accMultiplier: 85,
                                targets: { allies: '-0', enemies: '@12' },
                                launchPos: [true, true, false],
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.FRONT_TWO })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.FRONT_TWO, isCritical: true })
                                        ],
                                    }
                                },
                            }
                        )
                    ],
                    behavior: new EnemyBehavior({
                        actions: [
                            new EnemyAction({
                                title: 'boost allies',
                                owner: function() { return what(game.battle.enemies, "the maw") },
                                checker: function() {
                                    return !this.owner.variables.mainTarget
                                        && this.owner.canUseSkill("reptilian regrowth");
                                },
                                behavior: function() {
                                    console.log(this.title);

                                    const tar = choose(game.battle.enemies.filter(x => !x.isDead() && x !== this.owner));
                                    game.battle.target.push(tar);
                                    game.battle.selectedSkill = this.owner.skills[2];
                                    game.battle.executeSkill();
                                }
                            }),
                            new EnemyAction({
                                title: 'move forward',
                                owner: function() { return what(game.battle.enemies, "the maw") },
                                checker: function() {
                                    return this.owner.getSelfPosInBattle() === Data.FormationPosition.BACK
                                        && this.owner.canUseSkill("apex tracking");
                                },
                                behavior: function() {
                                    console.log(this.title);

                                    game.battle.allies.forEach(all => game.battle.target.push(all));
                                    game.battle.selectedSkill = this.owner.skills[3];
                                    game.battle.executeSkill();
                                }
                            }),
                            new EnemyAction({
                                title: 'focus target',
                                owner: function() { return what(game.battle.enemies, "the maw") },
                                checker: function() {
                                    return this.owner.variables.mainTarget
                                        && !this.owner.variables.mainTarget.isDead()
                                        && this.owner.getSelfPosInBattle() !== Data.FormationPosition.BACK
                                        && this.owner.canUseSkill("predator tenacity")
                                },
                                behavior: function() {
                                    console.log(this.title);

                                    game.battle.target.push(this.owner.variables.mainTarget);
                                    game.battle.selectedSkill = this.owner.skills[0];
                                    game.battle.executeSkill();
                                }
                            }),
                            new EnemyAction({
                                title: 'attack others',
                                owner: function() { return what(game.battle.enemies, "the maw") },
                                checker: function() {
                                    return this.owner.variables.mainTarget
                                        && this.owner.variables.mainTarget.isDead()
                                        && this.owner.getSelfPosInBattle() !== Data.FormationPosition.BACK
                                        && this.owner.canUseSkill("ravage")
                                },
                                behavior: function() {
                                    game.battle.allies.filter(x => !x.isDead()).forEach(all => { game.battle.target.push(all) });
                                    game.battle.selectedSkill = this.owner.skills[1];
                                    this.owner.addBaseStat(new Stat({ effect: Data.Effect.STAMINA, theorical: 20 }));
                                    game.battle.executeSkill();
                                }
                            }),
                            new EnemyAction({
                                title: 'block',
                                owner: function() { return what(game.battle.enemies, "the maw") },
                                checker: function() { return this.owner.stamina > 0 },
                                behavior: function() {
                                    console.log('blocks');
                                    this.owner.applyBlocking();
                                    this.owner.removeBaseStat(new Stat({ effect: Data.Effect.STAMINA, theorical: 5 }));
                                    this.owner.addBaseStat(new Stat({ effect: Data.Effect.MANA, theorical: 100 }));
                                    game.battle.finishTurn();
                                }
                            }),
                        ]
                    })
                }
            ),
            new Enemy(
                {
                    name: "Ghorra",
                    desc: "That's one hungry motherfucker.",
                    charset: Data.Charset.GHORRA,
                    subname: "The Mudcrawler",
                    health: 150, mana: 200, stamina: 120,
                    dodge: 8, speed: 10, accuracy: 90, protection: 20,
                    might: 40, spirit: 15,
                    resBleed: [2, 0], resPoison: [1, 0],
                    resMove: 85, resStun: 55,
                    resilience: 15, warding: 8,
                    mobType: Data.MobType.MAJOR_BOSS,
                    variables: {
                        states: [
                            "famined",
                            "festering",
                            "fed"
                        ],
                        state: "famined",
                        stateCountdown: 3,
                    },
                    triggers: [
                        new Trigger({
                            name: "ghorra_stateTracker",
                            type: Data.TriggerType.ON_DEAL_ATTACK,
                            behavior: function() {
                                const ghorra = this.getOwner();
                                const states = ghorra.variables.states;
                                const state = ghorra.variables.state;
                                const countdown = ghorra.variables.stateCountdown;

                                if(state !== "fed") {
                                    if(countdown > 0) countdown--;
                                    else {
                                        countdown = 3;
                                        state = states[states.indexOf(state)+1];
                                    }

                                    console.warn(`Ghorra is now ${state}. ${countdown} turns until next state.`);
                                }
                            }
                        }),
                        new Trigger({
                            name: "ghorra_attackReaction",
                            type: Data.TriggerType.ON_RECV_ATTACK,
                            checker: function(){
                                return this.getOwner().variables.state !== "fed";
                            },
                            behavior: function(){
                                console.log("Ghorra's SPECIAL TRIGGER OF DEATH has been FIRED my dudes");
                                
                            }
                        })
                    ],
                    skills: [
                        new Skill(
                            "Famined Hunting",
                            "",
                            0,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 15,
                                cooldown: 1,
                                dmgMultiplier: 100,
                                dmgType: Data.SkillDamageType.PHYSICAL,
                                criMultiplier: 20,
                                accMultiplier: 95,
                                targets: {allies: '-0', enemies: '-1'},
                                launchPos: [true, true, false],
                                effectsAllies: {
                                    1: {
                                        regular: [],
                                        critical: []
                                    }
                                }
                            }
                        ),
                        new Skill(
                            "Carnivorous Feast",
                            "",
                            0,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 10,
                                cooldown: 1,
                                dmgMultiplier: 80,
                                dmgType: Data.SkillDamageType.MAGICAL,
                                criMultiplier: 15,
                                accMultiplier: 93,
                                targets: {allies: '-0', enemies: '@12'},
                                launchPos: [true, true, true],
                                effectsAllies: {
                                    1: {
                                        regular: [],
                                        critical: []
                                    }
                                }
                            }
                        ),
                        new Skill(
                            "Satiated Laziness",
                            "",
                            0,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 20,
                                cooldown: 2,
                                dmgMultiplier: 60,
                                dmgType: Data.SkillDamageType.BOTH,
                                criMultiplier: 10,
                                accMultiplier: 90,
                                targets: {allies: '-0', enemies: '@123'},
                                launchPos: [false, true, true],
                                effectsAllies: {
                                    1: {
                                        regular: [],
                                        critical: []
                                    }
                                }
                            }
                        )
                    ],
                    behavior: new EnemyBehavior({
                        actions: [
                            new EnemyAction({
                                title: "famined!!",
                                owner: function() { return what(game.battle.enemies, "ghorra") },
                                checker: function() {
                                    return this.owner.variables.state === "famined"
                                            && this.owner.canUseSkill("famined hunting")
                                },
                                behavior: function() {
                                    console.log(this.title);

                                    game.battle.target.push(game.battle.allies[0]);
                                    game.battle.selectedSkill = this.owner.skills[0];
                                    game.battle.executeSkill();
                                }
                            }),
                            new EnemyAction({
                                title: 'festering!!',
                                owner: function(){ return what(game.battle.enemies, "ghorra") },
                                checker: function() {
                                    return this.owner.variables.state == "festering"
                                            && this.owner.canUseSkill("carnivorous feast")
                                },
                                behavior: function() {
                                    console.log(this.title);

                                    game.battle.target.push(game.battle.allies[1]);
                                    game.battle.target.push(game.battle.allies[2]);
                                    game.battle.selectedSkill = this.owner.skills[1];
                                    game.battle.executeSkill();
                                }
                            }),
                            new EnemyAction({
                                title: 'fed!!',
                                owner: function(){ return what(game.battle.enemies, "ghorra") },
                                checker: function() {
                                    return this.owner.variables.state == "fed"
                                            && this.owner.canUseSkill("satiated laziness")
                                },
                                behavior: function() {
                                    console.log(this.title);

                                    game.battle.target.push(game.battle.allies[1]);
                                    game.battle.target.push(game.battle.allies[2]);
                                    game.battle.target.push(game.battle.allies[3]);
                                    game.battle.selectedSkill = this.owner.skills[2];
                                    game.battle.executeSkill();
                                }
                            }),
                        ]
                    })
                }
            ),
            new Enemy(
                {
                    name: "Jabhra Priest",
                    desc: "",
                    charset: Data.Charset.ALIENATED_PRIEST,
                    subname: "Subname",
                    health: 90, mana: 100, stamina: 45,
                    dodge: 10, speed: 8, accuracy: 90, protection: 20,
                    might: 30, spirit: 10,
                    resBleed: [1, 0], resPoison: [1, 0],
                    resMove: 25, resStun: 15,
                    resilience: 5, warding: 5,
                    mobType: Data.MobType.REGULAR,
                    skills: [
                        new Skill(
                            "Targeted Pull",
                            "",
                            0,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 10,
                                cooldown: 2,
                                criMultiplier: 20,
                                accMultiplier: 90,
                                dmgMultiplier: 50,
                                targets: { allies: '-3', enemies: '-0' },
                                launchPos: [false, true, true],
                                effectsAllies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.FRONT_TWO, chance: 100 }),
                                            new Stat({ effect: Data.Effect.RESILIENCE, theorical: [-10, -13], duration: 2 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.FRONT_TWO, chance: 120 }),
                                            new Stat({ effect: Data.Effect.RESILIENCE, theorical: [-15, -18], duration: 2 })
                                        ]
                                    }
                                }
                            }
                        )
                    ],
                },
            ),
            new Enemy(
                {
                    name: "Venomstripe Mauler",
                    desc: "",
                    charset: Data.Charset.VENOMSTRIPE_MAULER,
                    subname: "Subname",
                    health: 120, mana: 100, stamina: 80,
                    dodge: 10, speed: 8, accuracy: 90, protection: 20,
                    might: 30, spirit: 10,
                    resBleed: [0, 0], resPoison: [5, 0],
                    resMove: 65, resStun: 25,
                    resilience: 18, warding: 2,
                    mobType: Data.MobType.MAJOR,
                    skills: [
                        new Skill(
                            "Feline Guard",
                            "",
                            0,
                            {
                                type: Data.SkillType.FRIENDLY,
                                manaCost: 10,
                                cooldown: 3,
                                criMultiplier: 10,
                                accMultiplier: 100,
                                targets: { allies: '-23', enemies: '-0' },
                                launchPos: [false, true, false],
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.GUARDING, duration: 2 }),
                                            new Stat({ effect: Data.Effect.PROTECTION, theorical: [15, 20], isPercentage: true, duration: 2 }),
                                            new Stat({ effect: Data.Effect.RES_STUN, theorical: [15, 20], isPercentage: true, duration: 2 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.GUARDING, duration: 2, isCritical: true }),
                                            new Stat({ effect: Data.Effect.PROTECTION, theorical: 22, isPercentage: true, duration: 2, isCritical: true }),
                                            new Stat({ effect: Data.Effect.RES_STUN, theorical: 22, isPercentage: true, duration: 2, isCritical: true })
                                        ]
                                    }
                                },
                                effectsEnemies: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.GUARDED, duration: 2 }),
                                            new Stat({ effect: Data.Effect.MODIF_DMG_TOTAL, theorical: [10, 15], isPercentage: true, duration: 1 })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.GUARDED, duration: 2 }),
                                            new Stat({ effect: Data.Effect.MODIF_DMG_TOTAL, theorical: 18, isPercentage: true, duration: 1 })
                                        ]
                                    }
                                },
                                variables: {
                                    guarded: null,
                                    guarding: null
                                }
                            }
                        ),
                        new Skill(
                            "Excoriation",
                            "",
                            0,
                            {
                                type: Data.SkillType.OFFENSIVE,
                                manaCost: 20,
                                cooldown: 2,
                                dmgMultiplier: 120,
                                dmgType: Data.SkillDamageType.PHYSICAL,
                                criMultiplier: 5,
                                accMultiplier: 90,
                                targets: { allies: '-1', enemies: '-0' },
                                launchPos: [true, false, false],
                                effectsCaster: {
                                    1: {
                                        regular: [
                                            new Stat({ effect: Data.Effect.FRONT_ONE })
                                        ],
                                        critical: [
                                            new Stat({ effect: Data.Effect.FRONT_ONE })
                                        ]
                                    }
                                }
                            }
                        )
                    ],
                    behavior: new EnemyBehavior({
                        actions: [
                            new EnemyAction({
                                title: 'protecc',
                                owner: function() { return what(game.battle.enemies, "venomstripe mauler") },
                                checker: function() {
                                    // Can use skill, is in Front, and has at least one alive ally
                                    return this.owner.canUseSkill("feline guard") && this.owner.getSelfPosInBattle() === Data.FormationPosition.FRONT && game.battle.enemies.some(x => !x.isDead() && x !== this.owner)
                                },
                                behavior: function() {
                                    console.log(this.title);
                                    game.battle.enemies.filter(x => !x.isDead() && x !== this.owner).forEach(x => {
                                        game.battle.target.push(x);
                                    });
                                    game.battle.selectedSkill = this.owner.getSkill("feline guard");
                                    game.battle.executeSkill();
                                }
                            }),
                            new EnemyAction({
                                title: 'atak',
                                owner: function() { return what(game.battle.enemies, "venomstripe mauler") },
                                checker: function() {
                                    // Can use skill
                                    return this.owner.canUseSkill("excoriation") && game.battle.allies.some(x => !x.isDead());
                                },
                                behavior: function() {
                                    console.log(this.title);

                                    const tar = choose(game.battle.allies.filter(x => !x.isDead()));
                                    game.battle.target.push(tar);
                                    game.battle.selectedSkill = this.owner.getSkill("excoriation");
                                    game.battle.executeSkill();
                                }
                            }),
                            new EnemyAction({
                                title: 'block',
                                owner: function() { return what(game.battle.enemies, "venomstripe mauler") },
                                checker: function() {
                                    return this.owner.stamina > 0;
                                },
                                behavior: function() {
                                    console.log(this.title);
                                    this.owner.applyBlocking();
                                    this.owner.removeBaseStat(new Stat({ effect: Data.Effect.STAMINA, theorical: 5 }));
                                    this.owner.addBaseStat(new Stat({ effect: Data.Effect.MANA, theorical: 20 }));
                                    game.battle.finishTurn();
                                }
                            })
                        ]
                    }),
                }
            )
        ];

        for (const enemy of enemies) {
            game.all_enemies.push(enemy);
        }
    },

    loadEnemyFormations: loadEnemyFormations = () => {
        const enemyFormations = [
            new EnemyFormation({
                name: "threeTicks",
                biome: Data.DungeonBiome.THE_KAULT,
                levels: [1, 2],
                formation: [
                    what(game.all_enemies, "mycelial tick"),
                    what(game.all_enemies, "mycelial tick"),
                    what(game.all_enemies, "mycelial tick")
                ],
                type: Data.BattleType.GROUP
            }),
            new EnemyFormation({
                name: "twoFungaliants",
                biome: Data.DungeonBiome.THE_KAULT,
                levels: [2, 3, 4],
                formation: [
                    what(game.all_enemies, "fungaliant"),
                    what(game.all_enemies, "fungaliant"),
                    what(game.all_enemies, "mycelial tick")
                ],
                type: Data.BattleType.GROUP
            }),
            new EnemyFormation({
                name: "gnarlyAndFungaliant",
                biome: Data.DungeonBiome.THE_KAULT,
                levels: [4, 5],
                formation: [
                    what(game.all_enemies, "fungaliant"),
                    what(game.all_enemies, "fungaliant"),
                    what(game.all_enemies, "gnarly horror")
                ],
                type: Data.BattleType.GROUP
            }),
            new EnemyFormation({
                name: "neverendingTicks",
                biome: Data.DungeonBiome.THE_KAULT,
                levels: [1, 2],
                formation: [
                    what(game.all_enemies, "mycelial tick"),
                    what(game.all_enemies, "mycelial tick"),
                    what(game.all_enemies, "mycelial tick"),
                ],
                type: Data.BattleType.WAVE,
                params: {
                    waves: [
                        [
                            what(game.all_enemies, "mycelial tick"),
                            what(game.all_enemies, "mycelial tick"),
                            what(game.all_enemies, "mycelial tick"),
                        ],
                        [
                            what(game.all_enemies, "mycelial tick"),
                            what(game.all_enemies, "mycelial tick"),
                            what(game.all_enemies, "mycelial tick"),
                        ]
                    ]
                }
            }),
            new EnemyFormation({
                name: "fireIguanaAndTwoHatchlings",
                biome: Data.DungeonBiome.UZIEL_JUNGLES,
                levels: [1, 2],
                formation: [
                    what(game.all_enemies, "fire hatchling"),
                    what(game.all_enemies, "fire hatchling"),
                    what(game.all_enemies, "fire iguana"),
                ],
                type: Data.BattleType.GROUP
            }),
            new EnemyFormation({
                name: "venomstripeMaulerAndHatchlings",
                biome: Data.DungeonBiome.UZIEL_JUNGLES,
                levels: [1, 2],
                formation: [
                    what(game.all_enemies, "fire hatchling"),
                    what(game.all_enemies, "fire iguana"),
                    what(game.all_enemies, "venomstripe mauler"),
                ],
                type: Data.BattleType.WAVE,
                params: {
                    waves: [
                        [
                            what(game.all_enemies, "fire hatchling"),
                            what(game.all_enemies, "fire hatchling"),
                            what(game.all_enemies, "fire iguana"),
                        ],
                        [
                            what(game.all_enemies, "mycelial tick"),
                            what(game.all_enemies, "mycelial tick"),
                            what(game.all_enemies, "mycelial tick"),
                        ]
                    ]
                }
            }),
            new EnemyFormation({
                name: "iguanasAndFungaliantsAndTicks",
                biome: Data.DungeonBiome.UZIEL_JUNGLES,
                levels: [1, 2],
                formation: [
                    what(game.all_enemies, "fire iguana"),
                    what(game.all_enemies, "mycelial tick"),
                    what(game.all_enemies, "fungaliant"),
                ],
                type: Data.BattleType.SPECIAL,
                params: {
                    queue: [
                        what(game.all_enemies, "mycelial tick"),
                        what(game.all_enemies, "fungaliant"),
                        what(game.all_enemies, "fire iguana"),
                        what(game.all_enemies, "fire iguana"),
                        what(game.all_enemies, "fungaliant"),
                        what(game.all_enemies, "mycelial tick"),
                        what(game.all_enemies, "mycelial tick"),
                    ]
                }
            }),
            // new EnemyFormation({
            //     name: "fireHatchlingsForever",
            //     biome: Data.DungeonBiome.UZIEL_JUNGLES,
            //     levels: [1, 2],
            //     formation: [
            //         what(game.all_enemies, "fire hatchling"),
            //         what(game.all_enemies, "fire hatchling"),
            //         what(game.all_enemies, "fire hatchling"),
            //     ],
            //     type: Data.BattleType.SPECIAL,
            //     params: {
            //         endless: [
            //             what(game.all_enemies, "fire hatchling")
            //         ],
            //         endCondition: function(){
            //             return false;
            //         }
            //     }
            // })
        ];

        for (const enemyFormation of enemyFormations) {
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
                                    function() {
                                        console.log("that hurts while blocking!");
                                    },
                                    function() {
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
                                    function() {
                                        console.log("that hurts while guarding!");
                                    },
                                    function() {
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
                                    function() {
                                        console.log("i'll guard ya!");
                                    },
                                    function() {
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

        for (const masteryPathway of masteryPathways) {
            game.all_masteryPathways.push(masteryPathway);
        }
    },

    loadMajorEons: loadMajorEons = () => {
        const eons = [
            new Eon({
                id: "ghorrasDiary",
                title: "Ghorra's Diary",
                category: Data.EonCategory.MAJOR,
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
                category: Data.EonCategory.MAJOR,
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
                category: Data.EonCategory.MINOR,
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
                category: Data.EonCategory.LOCATIONS,
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
                category: Data.EonCategory.MINOR,
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
                category: Data.EonCategory.MINOR,
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
                category: Data.EonCategory.MINOR,
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
                category: Data.EonCategory.MINOR,
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
                category: Data.EonCategory.MINOR,
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
                category: Data.EonCategory.LOCATIONS,
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
                id: "inTheHushedWhispersOfMoreinir",
                title: "In the hushed whispers of Moreinir",
                category: Data.EonCategory.LOCATIONS,
                author: 'Gacio Sinretta',
                fragments: [
                    {
                        text: '"Nothing," they will tell you, "We know nothing, absolutely nothing!" They will tell you that the Speakers of Sintra have never revealed anything about it. That there is probably nothing beyond the clouds; so cold that there is no temperature; so vast that neither the near nor the far can be distinguished. "Nothing" is what lies yonder. That "yonder" of which we know only the name, recounted by Qal of Atalan, the Sintra Speaker in the first Sintric Book, the <span class="eonItalic">Book of Hatching</span>.<br><span class="indent"></span>It is first mentioned in the initial narrative, <span class="eonItalic">The Spark</span>, when Qal speaks of the abode of the Bearer. Then in the third narrative, <span class="eonItalic">The Game</span>, it is described where Rath drifts, and later orbits, following Lantho\'s anger.<br><span class="indent"></span>And nowhere else. Why? Do our prophets refuse to let us know the nature of this place? Do they even have knowledge of it? Is there even something to know?<br><span class="indent"></span>Thus is it named in <span class="eonItalic">The Spark</span> narrative: "Moreinir, the Grand Void."',
                        unlocked: false
                    },
                    {
                        text: '"There was neither cold nor heat there; no breeze, no sound. Was it even air that I was breathing? Near me, nothing; far from me, pale spots that I could touch with my fingertips. And above all, this dreadful sense of terror."<br><span class="indent"></span>I would have gladly consigned these words to oblivion, written as they were in the aftermath of a traumatizing nightmare... if other people had not also recounted their dreams with disconcerting similarities. Only dreams? Here\'s a common story: a man stops breathing, trapped beneath the wheels of a plow or fallen from a roof. He is believed dead. Yet, the next moment, he revives briskly. What happened? For a few seconds, it is said this individual left our world. "But where did he go, and to what place?" I wondered for a long time.<br><span class="indent"></span>Undoubtedly, into Moreinir.<br><span class="indent"></span>These intrusions from the great void beyond the sky are more common than one might think. Like those times when we rise too quickly from our beds and our vision is clouded by a dark veil.',
                        unlocked: false
                    },
                    {
                        text: '"[...] and Rath drifting in Moreinir." — <span class="eonItalic">Book of Dawn, III: The Game</span><br><span class="indent"></span>Who among us has never emerged from a lengthy slumber punctuated by dreams without attempting to find meaning in them? Sibylline premonition, the manifestation of suppressed fear or powerful remorse; sometimes coherent, often absurd, our dreams are a reflection of our soul — and they have the power to leave us bewildered upon waking.<br><span class="indent"></span>Sintric teachings have always remained elusive on this matter, until the ultimate revelation in the <span class="eonItalic">Book of Mists</span>:<br><span class="indent"></span>"Our twin soul awakens at night when its sibling slumbers; the two cannot coexist simultaneously. It enters, along with all the others, into the Chamber of Osi: the abode of the Dreamer, adorned with mirrors devoid of reflections, which come to life as they read the emotions, secrets, and experiences of our twin soul that shares our own." — <span class="eonItalic">Book of Mists, I: The Chamber</span>',
                        unlocked: false
                    }
                ]
            }),
        ];

        for (const eon of eons) {
            game.all_eons.push(eon);
        }
    },

    loadDungeons: loadDungeons = () => {
        const dungeons = [
            new Dungeon({
                name: "Putrescent Ossuary",
                desc: "Nestled beneath the ruins of the once-glorious merchant city of Firthadel, the ossuary of the Landstar barony met its condemnation in the wake of a contamination wrought by noxious vapors seeping through a fissure in the earth. Proving difficult to restrain, multiple leaks of these harmful gases eventually enshrouded the city, leading to its evacuation, never to be reclaimed again.",
                background: "putrescent_ossuary.png",
                biome: Data.DungeonBiome.THE_KAULT,
                maximumDepth: 2,
                config: {
                    floor1: {
                        depth: 1,
                    },
                    floor2: {
                        depth: 2,
                    },
                },
                lootConfig: {
                    resources: [
                        what(game.all_resources, "dark stone"),
                        what(game.all_resources, "silver essence"),
                        what(game.all_resources, "decaying petals"),
                        what(game.all_resources, "reminder"),
                    ],
                    sets: [
                        what(game.all_equipmentSets, "highsteel set"),
                        what(game.all_equipmentSets, "entarian set"),
                        what(game.all_equipmentSets, "drancoran set")
                    ]
                },
            }),
            new Dungeon({
                name: "Firthadel Cathedral",
                desc: "",
                background: "firthadel-cathedral.png",
                biome: Data.DungeonBiome.THE_KAULT,
                maximumDepth: 3,
                config: {
                    floor1: {
                        depth: 1,
                    },
                    floor2: {
                        depth: 2,
                    },
                    floor3: {
                        depth: 3,
                    },
                },
            }),
            new Dungeon({
                name: "Ankadorr's Lair",
                desc: "",
                background: "ankadorrs-lair.png",
                biome: Data.DungeonBiome.THE_KAULT,
                maximumDepth: 3,
                config: {
                    floor1: {
                        depth: 1,
                    },
                    floor2: {
                        depth: 2,
                    },
                    floor3: {
                        depth: 3,
                    },
                },
            }),
            new Dungeon({
                name: "Inside of the World-Tree",
                desc: "",
                background: "inside-of-the-world-tree.png",
                biome: Data.DungeonBiome.THE_KAULT,
                maximumDepth: 3,
                config: {
                    floor1: {
                        depth: 1,
                    },
                    floor2: {
                        depth: 2,
                    },
                    floor3: {
                        depth: 3,
                    },
                },
            }),


            new Dungeon({
                name: "Smoldering Cave",
                desc: "",
                background: "smoldering-cave.png",
                biome: Data.DungeonBiome.UZIEL_JUNGLES,
                maximumDepth: 2,
                config: {
                    floor1: {
                        depth: 1,
                        params: {
                            miniboss: new EnemyFormation({
                                name: "theMaw",
                                biome: Data.DungeonBiome.UZIEL_JUNGLES,
                                levels: [1],
                                formation: [
                                    what(game.all_enemies, "fire iguana"),
                                    what(game.all_enemies, "fire hatchling"),
                                    what(game.all_enemies, "the maw"),
                                ],
                                type: Data.BattleType.SPECIAL,
                                title: Data.BattleType.MINI_BOSS,
                                params: {
                                    endless: [
                                        what(game.all_enemies, "fire iguana"),
                                        what(game.all_enemies, "fire hatchling"),
                                    ],
                                    endCondition: function() {
                                        return game.battle.enemies.find(x => x.name.toLowerCase() === "the maw").isDead();
                                    }
                                }
                            })
                        }
                    },
                    floor2: {
                        depth: 2,
                        params: {
                            boss: new EnemyFormation({
                                name: "ghorra",
                                biome: Data.DungeonBiome.UZIEL_JUNGLES,
                                levels: [2],
                                formation: [
                                    what(game.all_enemies, "ghorra"),
                                    what(game.all_enemies, "venomstripe mauler"),
                                    what(game.all_enemies, "fire iguana"),
                                ],
                                type: Data.BattleType.SPECIAL,
                                title: Data.BattleType.BOSS,
                                params: {
                                    endless: [
                                        what(game.all_enemies, "fire iguana"),
                                        what(game.all_enemies, "jabra priest")
                                    ],
                                    endCondition: function(){
                                        return game.battle.enemies.find(x => x.name.toLowerCase() === "ghorra").isDead();
                                    }
                                }
                            })
                        }
                    },
                },
            }),


            new Dungeon({
                name: "Wreck of the Stormbreaker",
                desc: "",
                background: "wreck-of-the-stormbreaker.png",
                biome: Data.DungeonBiome.SHATTERED_ISLES,
                maximumDepth: 3,
                config: {
                    floor1: {
                        depth: 1,
                    },
                    floor2: {
                        depth: 2,
                    },
                    floor3: {
                        depth: 3,
                    },
                },
            }),
        ];

        for (const dungeon of dungeons) {
            game.all_dungeons.push(dungeon);
        }
    }
}

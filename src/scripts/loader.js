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
                1,
                10,
                Data.Rarity.EPIC,
                1
            )
        ];

        for(const resource of resources) {
            game.all_resources.push(resource);
        }
    },

    loadRunes: loadRunes = () => {
        const runes = [
            new Rune("Resilience Rune",
                     "Bla",
                     45,
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
                     ]),
                     
        ];

        for(const rune of runes) {
            game.all_runes.push(rune);
        }
    },

    loadEchoes: loadEchoes = () => {
        const echoes = [
            new Echo(
                "Snakebite",
                "Heal §1% of your total health when an enemy is poisoned by this weapon.",
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
    }
}
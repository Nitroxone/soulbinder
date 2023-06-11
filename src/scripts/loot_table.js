let LootTable = {
    DropRates: {
        Any: {
            "common": 100,
            "uncommon": 75,
            "rare": 50,
            "epic": 30,
            "legendary": 15,
            "elder": 8,
        },
        Weapon: {
            "common": 100,
            "uncommon": 75,
            "rare": 50,
            "epic": 30,
            "legendary": 15,
            "elder": 8,
        },
        Armor: {
            "common": 100,
            "uncommon": 75,
            "rare": 50,
            "epic": 30,
            "legendary": 15,
            "elder": 8,
        },
        Trinket: {
            "common": 100,
            "uncommon": 75,
            "rare": 50,
            "epic": 30,
            "legendary": 15,
            "elder": 8,
        },
        Resource: {
            "common": 100,
            "uncommon": 75,
            "rare": 50,
            "epic": 30,
            "legendary": 15,
            "elder": 8,
        },
        Consumable: {
            "common": 100,
            "uncommon": 75,
            "rare": 50,
            "epic": 30,
            "legendary": 15,
            "elder": 8,
        },
        Rune: {
            "common": 100,
            "uncommon": 75,
            "rare": 50,
            "epic": 30,
            "legendary": 15,
            "elder": 8,
        }
    },
    Presets: {
        Dungeon: {
            EMPTY: {
                resource: {
                    amount: [1, 3],
                    rarities: {
                        common: 10,
                        uncommon: 5,
                        elder: 0,
                    }
                },
                gold: [50, 70],
            },
            ENTRANCE: {
                resource: {
                    amount: [1, 2],
                    rarities: {
                        common: 10,
                        uncommon: 5,
                        elder: 0,
                    }
                },
                gold: [4, 20],
            },
        }
    },
    Generators: {
        generateLoot: generateLoot = (preset) => {
            let results = [];
            for(const type in preset) {
                if(type === 'gold') {
                    results.push({
                        type: "gold", 
                        amount: getRandomNumber(preset[type][0], preset[type][1])
                    });
                } else if(type === 'resource') {
                    let amount = getRandomNumber(1, 3);
                    for(let i = 0; i < amount; i++) {
                        let rarity = null;
                        let luck = getRandomNumber(0, 100);
                        for(const key in LootTable.DropRates.Resource) {
                            const percentage = LootTable.DropRates.Resource[key];
                            if(luck <= percentage && percentage < 100) {
                                rarity = key;
                            }
                        }
                        if(rarity === null && luck > 0) {
                            rarity = Object.keys(LootTable.DropRates.Resource)[0];
                        }

                        // Retrieving the resource
                        let eligible = game.all_resources.filter(rsc => rsc.rarity === rarity);
                        let final = choose(eligible);

                        results.push({
                            type: 'resource',
                            rarity: rarity,
                            amount: 1,
                            item: final
                        });
                    }
                }
            }
            
            return results;
        },
    }
}
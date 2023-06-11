let LootTable = {
    DropRates: {
        Any: {
            "common": 100,
            "uncommon": 75,
            "rare": 40,
            "epic": 25,
            "legendary": 10,
            "elder": 5,
        },
        Weapon: {
            "common": 100,
            "uncommon": 75,
            "rare": 40,
            "epic": 25,
            "legendary": 10,
            "elder": 5,
        },
        Armor: {
            "common": 100,
            "uncommon": 75,
            "rare": 40,
            "epic": 25,
            "legendary": 10,
            "elder": 5,
        },
        Trinket: {
            "common": 100,
            "uncommon": 75,
            "rare": 40,
            "epic": 25,
            "legendary": 10,
            "elder": 5,
        },
        Resource: {
            "common": 100,
            "uncommon": 75,
            "rare": 40,
            "epic": 25,
            "legendary": 10,
            "elder": 5,
        },
        Consumable: {
            "common": 100,
            "uncommon": 75,
            "rare": 40,
            "epic": 25,
            "legendary": 10,
            "elder": 5,
        },
        Rune: {
            "common": 100,
            "uncommon": 75,
            "rare": 40,
            "epic": 25,
            "legendary": 10,
            "elder": 5,
        }
    },
    Presets: {
        Dungeon: {
            "empty room": {
                resource: new LootParams({
                    amount: [1, 3],
                    rarities: {
                        common: 10,
                        uncommon: 5,
                        epic: -100,
                        legendary: -100,
                        elder: -100,
                    }
                }),
                gold: [50, 70],
            },
            "entrance": {
                resource: new LootParams({
                    amount: [1, 2],
                    rarities: {
                        common: 10,
                        uncommon: 5,
                        epic: -100,
                        legendary: -100,
                        elder: -100,
                    }
                }),
                weapon: new LootParams({
                    chance: 10,
                    rarities: {
                        epic: -100,
                        legendary: -100,
                        elder: -100
                    }
                }),
                gold: [50, 70],
            },
        }
    },
    Generators: {
        generateLoot: generateLoot = (preset) => {
            // Declaring an empty results array that will be filled.
            let results = [];
            // For each type of reward in the preset
            for(const type in preset) {
                if(type === 'gold') {
                    // Gold just pushes a random amount of gold specified in the preset.
                    results.push({
                        type: "gold", 
                        amount: getRandomNumber(preset[type][0], preset[type][1])
                    });
                } else {
                    let dropRate, lootType, pool;
                    if(type === 'resource') {
                        dropRate = LootTable.DropRates.Resource;
                        lootType = 'resource';
                        pool = game.all_resources;
                    } else if(type === 'weapon') {
                        dropRate = LootTable.DropRates.Weapon;
                        lootType = 'weapon';
                        pool = game.all_weapons;
                    }

                    if(getRandomNumber(0, 100) > preset[type].chance) continue;
                        // Get the amount (add modifiers for that later)
                        let amount = preset[type].getAmount();
                        // For each modifier
                        for(let i = 0; i < amount; i++) {
                            let rarity = null;
                            let luck = getRandomNumber(0, 100);
                            for(const key in dropRate) {
                                let modifier = preset[type].rarities[key];
                                
                                const percentage = dropRate[key] + modifier;
                                if(luck <= percentage) {
                                    rarity = key;
                                }
                            }
                            if(rarity === null && luck > 0) {
                                rarity = Object.keys(dropRate)[0];
                            }
    
                            // Retrieving the resource
                            let eligible = pool.filter(rsc => rsc.rarity === rarity);
                            let final = choose(eligible);
    
                            results.push({
                                type: lootType,
                                rarity: rarity,
                                amount: final.lootModifiers.amount,
                                item: final
                            });
                        }
                }
            }
            
            return results;
        },
    }
}
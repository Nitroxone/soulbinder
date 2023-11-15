/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

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
        Sigil: {
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
                        epic: -100,
                        legendary: -100,
                        elder: -100,
                    },
                    includes: {
                        "solar firefly": [3, 6]
                    }
                }),
                weapon: new LootParams({
                    chance: 10,
                    rarities: {
                        epic: -100,
                        legendary: -100,
                        elder: -100
                    },
                }),
                trinket: new LootParams({
                    chance: 10,
                    rarities: {
                        epic: -100,
                        legendary: -100,
                        elder: -100
                    }
                }),
                gold: [50, 70],
            },
            "antechamber of marvels": {
                weapon: new LootParams({
                    amount: [1, 2],
                    rarities: {
                        rare: 20,
                        uncommon: 20,
                        epic: 20,
                        legendary: 20,
                        elder: -100
                    },
                    noDuplicates: true
                }),
                trinket: new LootParams({
                    amount: [2, 4],
                    rarities: {
                        rare: 20,
                        uncommon: 20,
                        epic: 20,
                        legendary: 20,
                        elder: -100
                    },
                    noDuplicates: true
                }),
                armor: new LootParams({
                    amount: [2, 4],
                    rarities: {
                        rare: 20,
                        uncommon: 20,
                        epic: 20,
                        legendary: 20,
                        elder: -100
                    },
                    noDuplicates: true
                }),
                sigil: new LootParams({
                    amount: [1, 2],
                    rarities: {
                        common: -100,
                        rare: 20,
                        uncommon: 20,
                        epic: -100,
                        legendary: -100,
                        elder: -100
                    }
                }),
                gold: [200, 500],
            }
        }
    },
    Generators: {
        generateLoot: generateLoot = (preset) => {
            // Declaring an empty results array that will be filled.
            let results = [];
            let generatedNames = [];
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
                    } else if(type === 'trinket') {
                        dropRate = LootTable.DropRates.Trinket;
                        lootType = 'trinket';
                        pool = game.all_trinkets;
                    } else if(type === 'armor') {
                        dropRate = LootTable.DropRates.Armor;
                        lootType = 'armor';
                        pool = game.all_armors;
                    } else if(type === 'sigil') {
                        dropRate = LootTable.DropRates.Sigil;
                        lootType = 'sigil';
                        pool = game.all_sigils;
                    } else if(type === 'consumable') {
                        dropRate = LootTable.DropRates.Consumable;
                        lootType = 'consumable';
                        pool = game.all_consumables;
                    }

                    if(getRandomNumber(0, 100) > preset[type].chance) continue;
                    // Get the amount (add modifiers for that later)
                    let amount = preset[type].getAmount();

                    for(const key in preset[type].includes) {
                        if(results.some(obj => obj.item === what(pool, key))) results.find(obj => obj.item === what(pool, key)).amount += getRandomNumber(preset[type].includes[key][0], preset[type].includes[key][1]);
                        else results.push({
                            type: lootType,
                            rarity: what(pool, key).rarity,
                            amount: getRandomNumber(preset[type].includes[key][0], preset[type].includes[key][1]),
                            item: what(pool, key),
                            looted: false
                        });
                    }

                    if(preset[type].includesOnly) continue;

                    // For each modifier
                    for(let i = 0; i < amount; i++) {
                        let final, rarity, eligible;
                        do {
                            rarity = generateLootRarity(dropRate, preset[type])

                            // Retrieving the resource
                            eligible = pool.filter(rsc => rsc.rarity === rarity);
                            final = choose(eligible);

                        } while(final === undefined || (final && preset[type].noDuplicates && generatedNames.includes(final.name)));
                        // The horrendous condition above checks that 
                        // - final is not undefined
                        // - final is not a duplicate, if duplicates are not allowed

                        // Keeping track of each addition to prevent duplicates
                        generatedNames.push(final.name);

                        if(results.some(obj => obj.item === final)) {
                            results.find(obj => obj.item === final).amount += 1;
                        }
                        else {
                            results.push({
                                type: lootType,
                                rarity: rarity,
                                amount: final.lootModifiers.amount,
                                item: final,
                                looted: false
                            });
                        }
                    }
                }
            }
            return results;
        },
    }
}
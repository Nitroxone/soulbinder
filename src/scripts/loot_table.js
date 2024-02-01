/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

let LootTable = {
    DropRates: {
        Any: {
            "regular": 100,
            "singular": 75,
            "precious": 40,
            "grand": 25,
            "mythic": 10,
            "relic": 5,
        },
        Weapon: {
            "regular": 100,
            "singular": 75,
            "precious": 40,
            "grand": 25,
            "mythic": 10,
            "relic": 5,
        },
        Armor: {
            "regular": 100,
            "singular": 75,
            "precious": 40,
            "grand": 25,
            "mythic": 10,
            "relic": 5,
        },
        Trinket: {
            "regular": 100,
            "singular": 75,
            "precious": 40,
            "grand": 25,
            "mythic": 10,
            "relic": 5,
        },
        Resource: {
            "regular": 100,
            "singular": 75,
            "precious": 40,
            "grand": 25,
            "mythic": 10,
            "relic": 5,
        },
        Consumable: {
            "regular": 100,
            "singular": 75,
            "precious": 40,
            "grand": 25,
            "mythic": 10,
            "relic": 5,
        },
        Sigil: {
            "regular": 100,
            "singular": 75,
            "precious": 40,
            "grand": 25,
            "mythic": 10,
            "relic": 5,
        }
    },
    Presets: {
        Dungeon: {
            "empty room": {
                resource: new LootParams({
                    amount: [1, 3],
                    rarities: {
                        regular: 10,
                        singular: 5,
                        grand: -100,
                        mythic: -100,
                        relic: -100,
                    },
                    pool: {
                        "dark stone": 100,
                        "minor time shard": 80
                    },
                }),
                gold: [50, 70],
            },
            "entrance": {
                resource: new LootParams({
                    amount: [1, 2],
                    rarities: {
                        grand: -100,
                        mythic: -100,
                        relic: -100,
                    },
                    includes: {
                        "solar firefly": [3, 6]
                    }
                }),
                weapon: new LootParams({
                    chance: 10,
                    rarities: {
                        grand: -100,
                        mythic: -100,
                        relic: -100
                    },
                }),
                trinket: new LootParams({
                    chance: 10,
                    rarities: {
                        grand: -100,
                        mythic: -100,
                        relic: -100
                    }
                }),
                gold: [50, 70],
            },
            "antechamber of marvels": {
                weapon: new LootParams({
                    amount: [1, 2],
                    rarities: {
                        precious: 20,
                        singular: 20,
                        grand: 20,
                        mythic: 20,
                        relic: -100
                    },
                    noDuplicates: true
                }),
                trinket: new LootParams({
                    amount: [2, 4],
                    rarities: {
                        precious: 20,
                        singular: 20,
                        grand: 20,
                        mythic: 20,
                        relic: -100
                    },
                    noDuplicates: true
                }),
                armor: new LootParams({
                    amount: [2, 4],
                    rarities: {
                        precious: 20,
                        singular: 20,
                        grand: 20,
                        mythic: 20,
                        relic: -100
                    },
                    noDuplicates: true
                }),
                sigil: new LootParams({
                    amount: [1, 2],
                    rarities: {
                        regular: -100,
                        precious: 20,
                        singular: 20,
                        grand: -100,
                        mythic: -100,
                        relic: -100
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
                    const poolsMap = {
                        "consumable": game.all_consumables,
                        "armor": game.all_armors,
                        "trinket": game.all_trinkets,
                        "sigil": game.all_sigils,
                        "weapon": game.all_weapons,
                        "resource": game.all_resources
                    }
                    
                    if(typeof preset[type].pool == 'object') {
                        pool = [];
                        for(const obj in preset[type].pool) {
                            if(computeChance(Number(preset[type].pool[obj]))) {
                                pool.push(
                                    what(poolsMap[type], obj)
                                );
                            }
                        }
                    }

                    if(type === 'resource') {
                        dropRate = LootTable.DropRates.Resource;
                        lootType = 'resource';
                        if(!pool || preset[type].pool === "any") pool = game.all_resources;
                    } else if(type === 'weapon') {
                        dropRate = LootTable.DropRates.Weapon;
                        lootType = 'weapon';
                        if(!pool || preset[type].pool === "any") pool = game.all_weapons;
                    } else if(type === 'trinket') {
                        dropRate = LootTable.DropRates.Trinket;
                        lootType = 'trinket';
                        if(!pool || preset[type].pool === "any") pool = game.all_trinkets;
                    } else if(type === 'armor') {
                        dropRate = LootTable.DropRates.Armor;
                        lootType = 'armor';
                        if(!pool || preset[type].pool === "any") pool = game.all_armors;
                    } else if(type === 'sigil') {
                        dropRate = LootTable.DropRates.Sigil;
                        lootType = 'sigil';
                        if(!pool || preset[type].pool === "any") pool = game.all_sigils;
                    } else if(type === 'consumable') {
                        dropRate = LootTable.DropRates.Consumable;
                        lootType = 'consumable';
                        if(!pool || preset[type].pool === "any") pool = game.all_consumables;
                    }

                    console.log("pool:", pool);

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

                        if(!(final instanceof Resource)) final = Entity.clone(final);

                        if(results.some(obj => obj.item === final)) {
                            results.find(obj => obj.item === final).amount += 1;
                        }
                        else {
                            final.origin = Data.OriginType.SCAVENGED;
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
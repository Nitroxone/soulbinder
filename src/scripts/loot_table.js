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
                    rarities: {
                        regular: 10,
                        singular: 5,
                        grand: -100,
                        mythic: -100,
                        relic: -100,
                    },
                    pool: {
                        "minor time shard": [80, [2, 5]],
                        "dark stone": 50,
                    },
                }),
                trinket: new LootParams({
                    amount: 1,
                    noDuplicates: true,
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
            },
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
                    
                    if(typeof preset[type].pool == 'object') pool = preset[type].pool;

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
                    let amount = 1;
                    if(Array.isArray(pool)) amount = preset[type].getAmount();

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
                        let finals = [];

                        // If it's a customized pool
                        if(!Array.isArray(pool)) {
                            // Iterate over each
                            for(obj in pool) {
                                // Get drop chance and roll a die
                                const chance = Array.isArray(pool[obj]) ? pool[obj][0] : pool[obj];
                                if(computeChance(chance)) {
                                    // Get object
                                    final = what(poolsMap[type], obj);
                                    // Add quantity
                                    // - 1 if none is specified
                                    // - If a static value is specified, add it
                                    // - If a ranged value is specified, compute it then add it
                                    if(!Array.isArray(pool[obj])) finals.push(final);
                                    else {
                                        let quantity;
                                        if(Array.isArray(pool[obj][1])) quantity = getRandomNumber(pool[obj][1][0], pool[obj][1][1]);
                                        else quantity = pool[obj][1];

                                        for(let k = 0; k < quantity; k++) { finals.push(final) }
                                    }
                                }
                            }
                            final = null;
                        } else {
                            do {
                                rarity = generateLootRarity(dropRate, preset[type])

                                // Retrieving the resource
                                eligible = pool.filter(rsc => rsc.rarity === rarity);
                                final = choose(eligible);

                            } while(final === undefined || (final && preset[type].noDuplicates && generatedNames.includes(final.name)));
                            // The horrendous condition above checks that 
                            // - final is not undefined
                            // - final is not a duplicate, if duplicates are not allowed
                        }

                        // Handle it differently based on whether the pool is customized
                        if(final) {
                            console.log(final);
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
                        } else {
                            console.log(finals);
                            generatedNames = generatedNames.concat(finals.map(x => x.name));

                            finals.map(x => {
                                if(!(x instanceof Resource)) x = Entity.clone(x);
                            });
                            finals.forEach(fin => {
                                if(results.some(obj => obj.item === fin)) {
                                    results.find(obj => obj.item === fin).amount += 1;
                                } else {
                                    fin.origin = Data.OriginType.SCAVENGED;
                                    results.push({
                                        type: lootType,
                                        rarity: fin.rarity,
                                        amount: fin.lootModifiers.amount,
                                        item: fin,
                                        looted: false
                                    });
                                }
                            })
                        }

                    }
                }
            }
            return results;
        },
    }
}
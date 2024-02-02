/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

/**
 * This class holds all the data and a bit of logic to create loot parameters.
 * There are a few things to note:
 * - "amount", "rarities", and "chance" only work for GLOBAL unspecified loot pools.
 * - Default param for "pool" is "any". Below is an example of what a specified pool looks like :
 * pool: {
 *      "dark stone": 55, // 55% chance of looting Dark Stone
 *      "decaying petals": 80
 * }
 */
class LootParams {
    constructor(props) {
        this.amount = getValueFromObject(props, 'amount', 1);
        this.rarities = getValueFromObject(props, 'rarities', {
            regular: 100,
            singular: 65,
            precious: 35,
            grand: 15,
            mythic: 5,
            relic: 0.05,
        });
        this.chance = getValueFromObject(props, "chance", 100);
        this.includes = getValueFromObject(props, "includes", {});
        this.includesOnly = getValueFromObject(props, "includesOnly", false);
        this.noDuplicates = getValueFromObject(props, "noDuplicates", false);
        this.pool = getValueFromObject(props, "pool", "any");
    }

    /**
     * Returns the amount value of this LootParams object.
     * @returns {number}
     */
    getAmount() {
        if(this.amount.length === 2) return getRandomNumber(this.amount[0], this.amount[1]);
        else return this.amount;
    }
}
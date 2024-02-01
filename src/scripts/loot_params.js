/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class LootParams {
    constructor(props) {
        this.amount = getValueFromObject(props, 'amount', 1);
        this.rarities = getValueFromObject(props, 'rarities', {
            regular: 0,
            singular: 0,
            precious: 0,
            grand: 0,
            mythic: 0,
            relic: 0,
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
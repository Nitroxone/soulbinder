/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

class LootParams {
    constructor(props) {
        this.amount = getValueFromObject(props, 'amount', 1);
        this.rarities = getValueFromObject(props, 'rarities', {
            common: 0,
            uncommon: 0,
            rare: 0,
            epic: 0,
            legendary: 0,
            elder: 0,
        });
        this.chance = getValueFromObject(props, "chance", 100);
        this.includes = getValueFromObject(props, "includes", {});
        this.includesOnly = getValueFromObject(props, "includesOnly", false);
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
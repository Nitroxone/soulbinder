/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

class TimeShard extends Resource {
    constructor(name, desc, icon, price, rarity,
         value, 
         isPercentage = false) {
        super(name, desc, icon, price, rarity);
        this.value = value;
        this.isPercentage = isPercentage;
    }

    /**
     * Returns the Shard's value type.
     * @returns {string} the Shard's value type
     */
    getValueType() {
        return typeof this.value;
    }
}
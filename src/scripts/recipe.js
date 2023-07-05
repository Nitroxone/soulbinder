/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

class Recipe extends Item {
    /**
     * @param {string} name the Recipe's name
     * @param {string} desc the Recipe's description
     * @param {number} icon the Recipe's icon
     * @param {number} price the Recipe's price
     * @param {string} rarity the Recipe's rarity
     * @param {array} ingredients the Recipe's required ingredients
     * @param {Item} result the Recipe's result
     */
    constructor(name, desc, icon, price, rarity,
                ingredients,
                result
                ) {
        super(name, desc, icon, price, rarity);
        this.ingredients = ingredients;
        this.result = result;
    }

    
}
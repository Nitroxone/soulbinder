/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

class Resource extends Item {
    /**
     * @param {string} name The Resource's name
     * @param {string} desc The Resource's description
     * @param {number} icon The Resource's icon
     * @param {number} price The Resource's price
     * @param {string} rarity The Resource's rarity
     */
    constructor(name, desc, icon, price, rarity) {
        super(name, desc, icon, price, rarity);
        this.amount = 0;
    }
}
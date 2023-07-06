/*

 Copyright (c) 2023 ntrx. All rights reserved.

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
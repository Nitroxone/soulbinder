/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

/**
 * The Item class basically adds price and rarity properties to Entity objects.
 * From there are generated other classes such as Sigil, Weapon, Armor, and more.
 * @author ntrx
 */

class Item extends Entity {
    /**
     * @param {string} name The Item's name
     * @param {string} desc The Item's description
     * @param {number} icon The Item's icon
     * @param {number} price The Item's price
     * @param {string} rarity The Item's rarity
     */
    constructor(name, desc, icon, price, rarity, props = {}) {
        super(name, desc, icon);
        this.price = price;
        this.rarity = rarity;

        this.lootModifiers = getValueFromObject(props, "lootModifiers", {
            amount: 1
        });
        this.tradeParams = getValueFromObject(props, "tradeParams", {
            blackMarketAvailable: true,
            auctionAvailable: true,
        });
        this.origin = Data.OriginType.UNKNOWN;
    }
}
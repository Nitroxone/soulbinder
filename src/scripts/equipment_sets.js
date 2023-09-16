/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class EquipmentSet extends Entity {
    /**
     * @param {string} name 
     * @param {string} type 
     * @param {string} desc 
     * @param {array} items
     * @param {array} bonus 
     */
    constructor(name, rarity, type, desc, items, bonus) {
        super(name, desc, 0);
        this.rarity = rarity;
        this.type = type;
        this.items = items;
        this.bonus = bonus;
    }
}
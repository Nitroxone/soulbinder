class Consumable extends Item {
    /**
     * @param {string} name The Consumable's name
     * @param {string} desc The Consumable's description
     * @param {number} icon The Consumable's icon
     * @param {number} price The Consumable's price
     * @param {string} rarity The Consumable's rarity
     * @param {string} type The Consumable's type
     * @param {array} effects The Consumable's effects
     * @param {array} effects The Consumable's effects
     * @param {array} triggers The Consumable's triggers
     */
    constructor(name, desc, icon, price, rarity, type, effects, triggers) {
        super(name, desc, icon, price, rarity);
        this.type = type;
        this.effects = effects;
        this.triggers = triggers;
    }
}
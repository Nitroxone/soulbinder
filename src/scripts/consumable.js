class Consumable extends Item {
    /**
     * @param {string} name The Consumable's name
     * @param {string} desc The Consumable's description
     * @param {number} icon The Consumable's icon
     * @param {number} price The Consumable's price
     * @param {string} rarity The Consumable's rarity
     * @param {string} type The Consumable's type
     * @param {array} effects The Consumable's effects
     * @param {array} triggers The Consumable's triggers
     */
    constructor(name, desc, icon, price, rarity, props) {
        super(name, desc, icon, price, rarity);
        this.type = getValueFromObject(props, 'type', Data.ConsumableType.EDIBLE);
        this.effects = getValueFromObject(props, 'effects', null);
        this.triggers = getValueFromObject(props, 'triggers', null);
        this.variables = getValueFromObject(props, 'variables', null);
        this.toxicity = getValueFromObject(props, 'toxicity', 10);

        this.amount = 0;
    }
}
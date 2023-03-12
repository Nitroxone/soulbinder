/**
 * The Rune class holds data for Rune objects in the game.
 */
class Rune extends Item {
    /**
     * @param {string} name the Rune's name
     * @param {string} desc the Rune's description
     * @param {number} icon the Rune's icon
     * @param {number} price the Rune's price
     * @param {string} rarity the Rune's rarity (Data.Rarity)
     * @param {string} type the Rune's type (Data.RuneType)
     * @param {array} effects the Rune's effects (array of Stat objects)
     */
    constructor(name, desc, icon, price, rarity,
                type, 
                effects) {
        super(name, desc, icon, price, rarity);

        this.type = type;
        this.effects = effects;
    }

    generateStats() {
        
    }
}
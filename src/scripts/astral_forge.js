class AstralForge {
    constructor(item) {
        this.item = item;
        this.history = [];

        if(this.checkForItemValidity(item)) this.item = item;
        else throw new Error('Uncompatible object type for AstralForge');
    }

    checkForItemValidity(item) {
        return item instanceof Armor || item instanceof Weapon || item instanceof Trinket;
    }

    /**
     * @param {Resource} tempre the Temporal Remainder to use
     * @param {Data.Effect} effect the Effect to alter on the Item
     */
    alterLine(tempre, effect) {
        
    }
}
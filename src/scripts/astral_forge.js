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
}
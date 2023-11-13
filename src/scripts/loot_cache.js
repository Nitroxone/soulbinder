class LootCache extends Item {
    /**
    * @param {string} name The LootCache's name
    * @param {string} desc The LootCache's description
    * @param {number} icon The iconsheet's index of the LootCache
    * @param {number} price The price of the LootCache
    * @param {string} rarity The rarity level of the LootCache
    * @param {string} from The location where you can unlock the LootCache
    * @param {Array<Entity>} [content=[]] An array of Entities that this LootCache contains
    */
    constructor(name, desc, icon, price, rarity, from, content = []) {
        super(name, desc, icon, price, rarity);
        this.from = from;
        this.content = content;
        this.isUnlocked = false;
    }
}


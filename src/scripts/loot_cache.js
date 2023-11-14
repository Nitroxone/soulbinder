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
    constructor(props = {}) {
        super(props.name, props.desc, props.icon, props.price, props.rarity);
        this.from = getValueFromObject(props, 'from', 'unkown location');
        this.content = getValueFromObject(props, 'content', [])
        this.isUnlocked = getValueFromObject(props, 'isUnlocked', false)
    }
}


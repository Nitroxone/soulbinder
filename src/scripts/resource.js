class Resource extends Item {
    /**
     * @param {string} name The Resource's name
     * @param {string} desc The Resource's description
     * @param {number} icon The Resource's icon
     * @param {number} price The Resource's price
     * @param {string} rarity The Resource's rarity
     * @param {number} amount The Resource's amount
     */
    
    constructor(name, desc, icon, price, rarity, amount) {
        super(name, desc, icon, price, rarity);
        this.amount = amount;
    }
}
class LootCache extends Item {
    /**
    * @param {string} name The LootCache's name
    * @param {string} desc The LootCache's description
    * @param {number} icon The iconsheet's index of the LootCache
    * @param {number} price The price of the LootCache
    * @param {string} rarity The rarity level of the LootCache
    * @param {Array<Entity>} [content=[]] An array of Entities that this LootCache contains
    */
    constructor(name, desc, icon, price, rarity, content) {
        super(name, desc, icon, price, rarity);
        this.from; 
        this.content = content || [];
        this.isUnlocked = false;
    }

    unlockLootCache(from) {
        const cache = game.black_market.allCaches.find(item => item.from === from);
        if (cache && !cache.isUnlocked) {
            cache.isUnlocked = true;
            console.log(`Cache from ${from} has been unlocked!`);
            return true;
        }
        console.warn(`Cache from ${from} was either not found or already unlocked.`);
        return false;
    }


}


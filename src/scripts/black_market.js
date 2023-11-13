class BlackMarket {
    constructor() {
        this.allCaches = [];
        this.currentBlackMarketWeaponsTable;
        this.currentBlackMarketArmorsTable;
        this.currentBlackMarketSigilsTable;
        this.currentBlackMarketTrinketsTable;
        this.currentBlackMarketResourcesTable;
        this.currentTab;
        this.selectedItemId;
        this.selectedAmount = 1;
        this.selectedCache;
    }

    /**
     * Generates a black market table containing between 3 and 7 randomly selected items of a specified type.
     * Items are selected based on their availability in the black market.
     *
     * @param {string} type - The type of items to filter from the game (e.g. 'weapons', 'armors', etc.).
     * @returns {Array} An array containing between 3 and 7 randomly selected items of the specified type and stores it in the corresponding game property.
     * @throws {Error} If the the specified type is not defined.
     * @example
     * const weapons = generateBlackMarketTable('weapons');
     */
    generateBlackMarketTable(type) {
        const items = game[`all_${type}`].filter(item => item.tradeParams.blackMarketAvailable);
        const n = getRandomNumber(3, 7);
        const shuffledItems = shuffle(items);

        let capitalizedType = capitalizeFirstLetter(type);
    
        return this[`currentBlackMarket${capitalizedType}Table`] = shuffledItems.slice(0, n);
    }

    buyItemFromBlackMarket() {
        const tabName = capitalizeFirstLetter(this.currentTab.textContent);
        const table = this[`currentBlackMarket${tabName}Table`];
        const itemIndex = this.findItemIndex(table, this.selectedItemId);
    
        if (itemIndex === -1) {
            return;
        }
    
        const item = table[itemIndex];
        const cost = item.price * this.selectedAmount;
    
        if (!this.hasEnoughGold(cost)) {
            console.error("Not enough gold to buy this item.");
            return;
        }
    
        game.player.inventory.addItem(item, this.selectedAmount, false);
        this.blackMarketTradeOperation(cost);
        this.removeItemFromTable(table, itemIndex);
        game.black_market.selectedAmount = 1;
        updateSelectedAmountDisplay();
    }
    
    hasEnoughGold(cost) {
        return game.player.inventory.gold >= cost;
    }

    findItemIndex(table, itemId) {
        return table.findIndex(wantedItem => wantedItem.id === itemId);
    }

    blackMarketTradeOperation(cost) {
        return game.player.inventory.gold -= cost;
    }

    removeItemFromTable(table, itemIndex) {
        return table.splice(itemIndex, 1);
    }

    unlockLootCache(from) {
        const cache = this.allCaches.find(item => item.from === from);
        console.log('cache : ', cache)
        if (cache && !cache.isUnlocked) {
            cache.isUnlocked = true;
            console.log(`Cache from ${from} has been unlocked!`);
            return true;
        }
        console.warn(`Cache from ${from} was either not found or already unlocked.`);
        return false;
    }

    generateBlackMarketAllTables() {
        this.generateBlackMarketTable('weapons');
        this.generateBlackMarketTable('armors');
        this.generateBlackMarketTable('sigils');
        this.generateBlackMarketTable('trinkets');
        this.generateBlackMarketTable('resources');
    }
}
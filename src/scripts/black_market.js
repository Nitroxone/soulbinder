class BlackMarket {
    constructor() {
        this.currentBlackMarketWeaponsTable;
        this.currentBlackMarketArmorsTable;
        this.currentBlackMarketSigilsTable;
        this.currentBlackMarketTrinketsTable;
        this.currentBlackMarketResourcesTable;
        this.currentTab;
        this.selectedItemId;
        this.selectedAmount = 1;
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
    
        if (itemIndex !== -1) {
            const item = table[itemIndex];
    
            if (!this.hasEnoughGold(item.price * this.selectedAmount)) {
                console.error("Not enough gold to buy this item.");
                return;
            } else {
                game.player.inventory.addItem(item, this.selectedAmount, false);
                this.blackMarketTradeOperation(item.price * this.selectedAmount);
                this.removeItemFromTable(table, itemIndex);
            }
        }
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
        table.splice(itemIndex, 1);
    }

    generateBlackMarketAllTables() {
        this.generateBlackMarketTable('weapons');
        this.generateBlackMarketTable('armors');
        this.generateBlackMarketTable('sigils');
        this.generateBlackMarketTable('trinkets');
        this.generateBlackMarketTable('resources');
    }
}
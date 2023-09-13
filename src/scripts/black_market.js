class BlackMarket {
    constructor() {
        this.currentBlackMarketWeaponsTable;
        this.currentBlackMarketArmorsTable;
        this.currentBlackMarketSigilsTable;
        this.currentBlackMarketTrinketsTable;
        this.currentBlackMarketResourcesTable;
        this.currentTab;
        this.selectedItemId;
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
        const item = this[`currentBlackMarket${this.currentTab}Table`].find(wantedItem => wantedItem.id === this.selectedItemId);

        game.player.inventory.addItem(item, 1, false);
        this[`currentBlackMarket${this.currentTab}Table`].splice(item.id, 1);
    }
}
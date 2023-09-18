function generateBlackMarketTabEvents() {
    const tabs = document.querySelectorAll('.blackMarket-menu--tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            unsetBlackMarketAllActiveTabs(tabs);
            setBlackMarketActiveTab(tab);
            generateTabContent(tab);
        });
    });
}

function generateBlackMarketItemsEvents() {
    const items = document.querySelectorAll('.tradeItems-item');

    items.forEach(item => {
        item.addEventListener('click', () => {
            items.forEach(item => item.classList.remove('itemSelected'));
            item.classList.add('itemSelected');
            game.black_market.selectedItemId = Number(item.id.split('-')[1]);
        })
    })
}

function generateBlackMarketAbandonedCacheEvents() {
    const abandonedCaches = document.querySelectorAll('.abandonedCache-items--item');

    abandonedCaches.forEach(cache => {
        cache.addEventListener('click', () => {
            abandonedCaches.forEach(cache => cache.classList.remove('cacheSelected'));
            cache.classList.add('cacheSelected');
        });
    });
}

function generateBlackMarketBuyButtonEvent() {
    document.querySelector('.blackMarket-button--buy').addEventListener('click', () => {
        game.black_market.buyItemFromBlackMarket();

        generateTabContent(game.black_market.currentTab);
        drawInventory();
    })
}
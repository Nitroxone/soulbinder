function drawBlackMarket() {
    let str = '';

    str += '<p>BLACK MARKET</p>';
    str += '<div class="blackMarket-menu">';

    str += '<div class="blackMarket-menu--firstCol">';

    str += '<div class="blackMarket-menu--tabs">';
    str += '<div class="blackMarket-menu--tab">weapons</div>';
    str += '<div class="blackMarket-menu--tab">armors</div>';
    str += '<div class="blackMarket-menu--tab">trinkets</div>';
    str += '<div class="blackMarket-menu--tab">sigils</div>';
    str += '<div class="blackMarket-menu--tab">resources</div>';
    str += '</div>';

    str += '<div class="blackMarket-menu--trade">';
    str += '<div class="tradeItems">'

    // BLACK MARKET ITEMS

    str += '</div>';
    str += '</div>';

    str += '</div>';

    str += '<div class="blackMarket-menu--secondCol">';
    str += '<div class="blackMarket-menu--abandonedCache">';
    str += '<div class="abandonedCacheIcon"></div>';
    str += '<div class="abandonedCache-desc">';
    str += '<p class="abandonedCache-title">Abandoned cache</p>';

    str += '<div class="abandonedCache-desc--price">'
    str += '<div class="tradeItems-goldIcon"></div>';
    str += '<p class="abandonedCache-price--amount">900</p>';
    str += '</div>';
    str += '</div>';

    str += '<div class="divider"></div>'

    str += '<div class="abandonedCache-items">';

    str += '<div class="abandonedCache-items--item"></div>';
    str += '<div class="abandonedCache-items--item"></div>';
    str += '<div class="abandonedCache-items--item"></div>';

    str += '<div class="abandonedCache-items--item"></div>';
    str += '<div class="abandonedCache-items--item"></div>';
    str += '<div class="abandonedCache-items--item"></div>';

    str += '<div class="abandonedCache-items--item"></div>';
    str += '<div class="abandonedCache-items--item"></div>';
    str += '<div class="abandonedCache-items--item"></div>';

    str += '</div>';

    str += '</div>';
    str += '<div class="blackMarket-actions">';
   
    str += '<div class="blackMarket-button--buy">';
    str += '<p id="buy">BUY</p>';
    str += '</div>';

    str += '<div class="blackMarket-buttons--amount">';
    str += '<span class="blackMarket-chosenAmount">';
    str += game.black_market.selectedAmount;
    str += '</span>';

    str += '<div class="blackMarket-selectAmount">';
    str += '<div class="blackMarket-increaseAmount">+</div>';
    str += '<div class="blackMarket-decreaseAmount">-</div>';
    str += '</div>'

    str += '</div>';

    str += '</div>';
    str += '</div>';


    str += '</div>';

    document.querySelector('.blackMarket').innerHTML = str;

    generateBlackMarketTabEvents();
    generateBlackMarketAbandonedCacheEvents();
    generateBlackMarketBuyButtonEvent();
    setSelectedAmount();
}

function setBlackMarketActiveTab(tab) {
    tab.classList.add('tabActive');
    game.black_market.currentTab = tab;
}

function generateTabContent(tab) {
    let tabName = capitalizeFirstLetter(tab.textContent);
    let str = '';

    game.black_market[`currentBlackMarket${tabName}Table`].forEach(item => {

        str += '<div id="blckmrkt-' + item.id + '" class="tradeItems-item">';

        str += `<div class="tradeItems-item--icon" style="${getIcon(item, 100, false)}">`;
        str += '</div>';

        str += '<p class="tradeItems-item--name">';
        str += item.name;
        str += '</p>';

        str += '<div class="tradeItems-item--price">';
        str += '<div class="tradeItems-goldIcon"></div>';
        str += '<p>';
        str += item.price;
        str += '</p>';
        str += '</div>';

        str += '</div>';

        document.querySelector('.tradeItems').innerHTML = str;

        generateBlackMarketItemsEvents();
    });
}

function unsetBlackMarketAllActiveTabs(tabs) {
    tabs.forEach(tab => tab.classList.remove('tabActive'));
}

function setSelectedAmount() {
    document.querySelector('.blackMarket-increaseAmount').addEventListener('click', () => {
        game.black_market.selectedAmount += 1;
        updateSelectedAmountDisplay();
    })
    document.querySelector('.blackMarket-decreaseAmount').addEventListener('click', () => {
        game.black_market.selectedAmount -= 1;
        updateSelectedAmountDisplay();
    })
}

function updateSelectedAmountDisplay() {
    const selectedAmount = game.black_market.selectedAmount;
    document.querySelector('.blackMarket-chosenAmount').textContent = selectedAmount;
}
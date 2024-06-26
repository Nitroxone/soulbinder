function generateDungeonKnapsackEvents() {
    const items = document.querySelectorAll('.knpsckContent .inventoryItem');

    items.forEach(it => {
        const obj = game.player.du_inventory.find(x => x.id == it.id.slice(5));

        addTooltip(it, function(){
            if(obj instanceof Weapon) return getWeaponTooltip(obj);
            if(obj instanceof Armor) return getArmorTooltip(obj);
            if(obj instanceof Trinket) return getTrinketTooltip(obj);
            if(obj instanceof Resource) return getResourceTooltip(obj);
            if(obj instanceof Sigil) return getSigilTooltip(obj);
            if(obj instanceof Consumable) return getConsumableTooltip(obj);
        }, {offY: -8});

        // Spawn tooltip and play sound on click
        it.addEventListener('click', function(e){
            e.stopImmediatePropagation();

            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
            const tooltip = spawnTooltip(obj);
            if(obj.set) {
                let tooltipDesc = tooltip.querySelector('.tooltipSetText');
                tooltipDesc.addEventListener('click', (e) => {
                    Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
                    spawnTooltip(what(game.all_equipmentSets, obj.set), tooltip);
                });
            }
        });
        // Play sound on hover
        it.addEventListener('mouseover', function(){
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
        });

        // Draggable events
        it.addEventListener('dragstart', e => {
            e.stopPropagation();

            if(obj instanceof Weapon) e.dataTransfer.setData("weapon", obj.id);
            if(obj instanceof Armor) e.dataTransfer.setData("armor", obj.id);
            if(obj instanceof Trinket) e.dataTransfer.setData("trinket", obj.id);
            if(obj instanceof Resource) e.dataTransfer.setData("resource", obj.id);
            if(obj instanceof Sigil) e.dataTransfer.setData("sigil", obj.id);
            if(obj instanceof Consumable) e.dataTransfer.setData("consumable", obj.id);

            e.dataTransfer.setData("origin", "knapsack");
        });
        it.addEventListener('mousedown', e => {
            e.stopPropagation();
        })

        // Removal rules:
        // - Holding Shift adds/removes 10
        // - Holding Ctrl adds/removes 100
        // - If in a dungeon, holding alt will discard the resource
        // - Regular removal (adding the item back to inventory) is only allowed if not in a dungeon
        it.addEventListener('contextmenu', e => {
            e.stopImmediatePropagation();
            e.preventDefault();

            let amount = 1;
            if(e.shiftKey && !e.ctrlKey) amount = Math.min(Math.max(obj.knapsackAmount - 10, obj.knapsackAmount), 10);
            else if(e.ctrlKey && !e.shiftKey) amount = Math.min(Math.max(obj.knapsackAmount - 100, obj.knapsackAmount), 100);

            if(game.dungeon && e.altKey) game.player.discardFromKnapsack(obj, amount);
            else if(!game.dungeon) game.player.removeFromKnapsack(obj, amount);
        });
    })
}

function refreshKnapsackAndInventory() {
    drawInventory();
    if(isKnapsackOpen()) {
        getDungeonKnapsackContent(true);
        getDungeonKnapsackCapacity(true);
    }
}

function refreshKnapsackWealth() {
    isKnapsackOpen() && getDungeonKnapsackGoldAndSouls(true);
}

function isKnapsackOpen() {
    return document.querySelector('.knpsckContainer');
}

function toggleKnapsackResourceImporter(item) {
    game.player.du_invSelectedResource = item;
    getDungeonKnapsackResourceAmount(true);

    const imp = document.querySelector('.knpsckRscAmount');
    const rscName = imp.querySelector('.kra-total');
    const more = imp.querySelector('.kra-more');
    const less = imp.querySelector('.kra-less');
    const min = imp.querySelector('.kra-min');
    const max = imp.querySelector('.kra-max');

    const confirm = document.querySelector('.knpsckRscAmountConfirm');
    const cancel = document.querySelector('.knpsckRscAmountCancel');

    var amount = 1;

    more.addEventListener('click', e => {
        if(e.shiftKey) amount = Math.min(amount+10, item.amount);
        else if(e.ctrlKey) amount = Math.min(amount+100, item.amount);
        else amount = Math.min(amount+1, item.amount);

        refreshKnapsackResourceImporterName(item, amount);
    });
    less.addEventListener('click', e => {
        if(e.shiftKey) amount = Math.max(1, amount-10);
        else if(e.ctrlKey) amount = Math.max(1, amount-100);
        else amount = Math.max(1, amount-1);

        refreshKnapsackResourceImporterName(item, amount);
    });
    min.addEventListener('click', e => {
        amount = 1;
        refreshKnapsackResourceImporterName(item, amount);
    });
    max.addEventListener('click', e => {
        amount = item.amount;
        refreshKnapsackResourceImporterName(item, amount);
    });

    confirm.addEventListener('click', e => {
        game.player.addResourceToKnapsack(item, amount);
        game.player.du_invSelectedResource = null;
        amount = 0;

        confirm.parentNode.style.display = 'none';
        more.parentNode.style.display = 'none';
    })
    cancel.addEventListener('click', e => {
        game.player.du_invSelectedResource = null;
        amount = 0;

        confirm.parentNode.style.display = 'none';
        more.parentNode.style.display = 'none';
    });

    imp.style.display = 'flex';
    refreshKnapsackResourceImporterName(item, amount);
    rscName.style.color = getRarityColorCode(item.rarity);
}

function refreshKnapsackResourceImporterName(item, amount) {
    document.querySelector('.knpsckRscAmountActions').style.display = 'flex';
    document.querySelector('.knpsckRscAmount').style.display = 'flex';

    document.querySelector('.knpsckRscAmount .kra-total').textContent = amount + ' ' + item.name;
}

function addSidePinEvents() {
    const pin = document.querySelector('#pinInventory');
    const repin = document.querySelector('#repinInventory');
    const pinChat = document.querySelector('#pinChat');
    const repinChat = document.querySelector('#repinChat');
    const resources = document.querySelector('#resources');
    const chat = document.querySelector('#messages');
    const chatTabs = document.querySelector('#chatTabs');
    const sections = document.querySelector('#sections');

    const pinLeft = () => {
        resources.classList.toggle('hideSidebar');
        sections.classList.toggle('noLeftSidebar');
        repin.classList.toggle('noDisplay');
    }
    const pinRight = () => {
        chat.classList.toggle('hideSidebar');
        sections.classList.toggle('noRightSidebar');
        repinChat.classList.toggle('noDisplay');
        chatTabs.classList.toggle('noDisplay');
    }

    pin.addEventListener('click', pinLeft);
    repin.addEventListener('click', pinLeft);
    pinChat.addEventListener('click', pinRight);
    repinChat.addEventListener('click', pinRight);
}

function addInventoryCollapseEvents() {
    document.querySelector('#res-weapons').addEventListener('click', (e) => {
        document.querySelector('#res-cat-weapons').classList.toggle('hide');
    });
    document.querySelector('#res-armors').addEventListener('click', (e) => {
        document.querySelector('#res-cat-armors').classList.toggle('hide');
    });
    document.querySelector('#res-trinkets').addEventListener('click', (e) => {
        document.querySelector('#res-cat-trinkets').classList.toggle('hide');
    });
    document.querySelector('#res-resources').addEventListener('click', (e) => {
        document.querySelector('#res-cat-resources').classList.toggle('hide');
    });
    document.querySelector('#res-sigils').addEventListener('click', (e) => {
        document.querySelector('#res-cat-sigils').classList.toggle('hide');
    });
    document.querySelector('#res-consumables').addEventListener('click', (e) => {
        document.querySelector('#res-cat-consumables').classList.toggle('hide');
    });
}
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
        it.addEventListener('click', function(){
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
            spawnTooltip(obj);
        });
        // Play sound on hover
        it.addEventListener('mouseover', function(){
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
        });

        it.addEventListener('contextmenu', e => {
            e.stopImmediatePropagation();
            e.preventDefault();

            game.player.removeFromKnapsack(obj);
        })
    })
}

function refreshKnapsackAndInventory() {
    getDungeonKnapsackContent(true);
    drawInventory();
    getDungeonKnapsackCapacity(true);
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
        amount = Math.min(amount+1, item.amount);
        refreshKnapsackResourceImporterName(item, amount);
    });
    less.addEventListener('click', e => {
        amount = Math.max(1, amount-1);
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
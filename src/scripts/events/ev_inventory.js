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
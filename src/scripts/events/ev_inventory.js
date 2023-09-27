function generateDungeonKnapsackEvents() {
    const items = document.querySelectorAll('.knpsckContent .inventoryItem');

    items.forEach(it => {
        it.addEventListener('contextmenu', e => {
            e.stopImmediatePropagation();
            e.preventDefault();

            obj = game.player.du_inventory.find(x => x.id == it.id.slice(5));
            game.player.removeFromKnapsack(obj);
        })
    })
}

function refreshKnapsackAndInventory() {
    getDungeonKnapsackContent(true);
    drawInventory();
    getDungeonKnapsackCapacity(true);
}
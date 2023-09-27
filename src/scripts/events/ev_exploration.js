function generateExplorationHubEvents() {
    const biomes = document.querySelectorAll('.eh-biomeCategory');
    const dHeaders = document.querySelectorAll('.eh-dungeonHeader');

    biomes.forEach(bio => {
        bio.addEventListener('click', e => {
            bio.classList.toggle('extended');
        });
        game.all_dungeons.filter(x => x.biome === bio.firstChild.textContent).forEach(dun => {
            dun.lootConfig?.resources?.forEach(re => {
                addTooltip(domWhat('edls-' + re.id), function(){
                    Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
                    return getResourceTooltip(re);
                }, {offY: -8});
            });
            dun.lootConfig?.sets?.forEach(re => {
                addTooltip(domWhat('edls-' + re.id), function(){
                    Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
                    return getSetTooltip(re);
                }, {offY: -8});
            });
        });
    });

    dHeaders.forEach(dh => {
        dh.addEventListener('click', e => {
            dh.parentElement.classList.toggle('extended');
        });
        dh.addEventListener('contextmenu', e => {
            e.preventDefault();
            game.selectedDungeon = game.all_dungeons.find(x => x.name.toLowerCase() === dh.firstChild.textContent.toLowerCase());
            getExplorationHubRecap(true);
        });
    });

    generateExplHubRecapEvents();
}

function generateExplHubRecapEvents() {
    const diveButton = document.querySelector('.eh-r-dive');
    const invButton = document.querySelector('#dHubInventory');

    diveButton.addEventListener('click', e => {
        if(game.selectedDungeon) {
            clearInterval(Quanta.emitters.find(x => x.name === 'explorationHub').loop);
            game.currentDungeon = game.selectedDungeon;
            game.currentDungeon.init();
            drawExplorationScreen();
        }
    });

    addTooltip(invButton, function(){
        return "Open the knapsack";
    }, {offY: -8});
    invButton.addEventListener('click', e => {
        document.querySelectorAll('.knpsckContainer').forEach(kn => {
            kn.parentElement.parentElement.remove();
        })

        spawnTooltip(['knapsack']);
        generateDungeonKnapsackEvents();
    });
}
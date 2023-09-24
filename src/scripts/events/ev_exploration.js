function generateExplorationHubEvents() {
    const biomes = document.querySelectorAll('.eh-biomeCategory');

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
}
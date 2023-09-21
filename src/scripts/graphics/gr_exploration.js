function drawExplorationHubScreen() {
    document.querySelector('#explorationDiv').innerHTML = '<canvas class="explorationHubCanvas"></canvas><div class="explorationHub"></div>';

    let str = '';

    str += '<div class="eh-header">';
    str += '<h1 class="eh-mainTitle">Exploration</h1>'
    str += '<h2 class="eh-subTitle">Dive into time-altered vestiges, gather eons and loot, face unforgiving foes, and emerge with victory, or death.</h2>';
    str += '</div>';

    str += '<div class="eh-main">';
    for(const biome in Data.DungeonBiome) {
        if(biome === 'ALL') continue;

        str += '<div class="eh-biomeCategory" style="background-image: url(\'img/darkBorders.png\'), linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url(\'css/img/bg/' + Data.DungeonBiomeBackground[biome] + '\')">';
        str += '<h2 class="eh-biomeName">' + Data.DungeonBiome[biome] + '</h2>';
        str += '</div>';

        str += '<div class="eh-biomeContent">';
        game.all_dungeons.filter(x => x.biome === Data.DungeonBiome[biome]).forEach(du => {
            str += getExplorationHubDungeon(du);
        })
        str += '</div>'
    }
    str += '</div>';

    document.querySelector('.explorationHub').innerHTML = str;
    generateExplorationHubEvents();

    Quanta.emit({
        name: "explorationHub",
        canvas: document.querySelector('.explorationHubCanvas'),
        color: Data.Color.LEGENDARY,
        amount: 300,
        particleSize: 1,
        density: 1,
        fadeAwayRate: 0,
        speed: {
            x: () => { return (Math.random() * 1.2) - 1 },
            y: () => { return -Math.abs((-1 + Math.random() * 1.1)) }
        },
        delay: () => { return getRandomNumber(0, 100) }
    });
}

function getExplorationHubDungeon(du) {
    let str = '';

    str += '<div class="eh-dungeon" style="background-image: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%), url(\'css/img/bg/' + du.background + '\')">';
    str += '<h3>' + du.name + '</h3>';

    str += '<div class="eh-dungeonContent">';
    str += '<div class="eh-dc-desc">' + du.desc + '</div>';

    str += '<div class="eh-dc-infos">';

    str += '<div class="eh-dc-loot">';
    str += '<h3>Commonly found loot</h3>';
    str += getEhdLoot(du);
    str += '</div>';

    str += '<div class="eh-dc-bestiary">';

    str += '<div class="eh-dc-b-enemies">';
    str += '<h3>Enemies</h3>';
    str += '</div>'

    str += '<div class="eh-dc-b-bosses">';
    str += '<h3>Bosses</h3>';
    str += '</div>'

    str += '</div>';

    str += '</div>';

    str += '</div>';
    str += '</div>';

    return str;
}

function getEhdLoot(du) {
    let str = '';
    
    str += '<div class="eh-dc-loot-list">';
    du.lootConfig?.resources?.forEach(re => {
        str += '<div id="edls-' + re.id + '" class="eh-dc-loot-single" style="' + getIcon(re) + '; border: 2px solid ' + getRarityColorCode(re.rarity) +'"></div>';
    });
    str += '</div>';

    return str;
}
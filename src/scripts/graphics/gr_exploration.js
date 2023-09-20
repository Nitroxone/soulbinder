function drawExplorationHubScreen() {
    document.querySelector('#explorationDiv').innerHTML = '<div class="explorationHub"></div>';

    let str = '';

    str += '<div class="eh-header">';
    str += '<h1 class="eh-mainTitle">Exploration</h1>'
    str += '<h2 class="eh-subTitle">Dive into time-altered realms, gather eons and loot, face unforgiving foes and cryptic enigmas.</h2>';
    str += '</div>';

    str += '<div class="eh-main">';
    for(const biome in Data.DungeonBiome) {
        if(biome === 'ALL') continue;

        str += '<div class="eh-biomeCategory" style="background-image: url(\'img/darkBorders.png\'), linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%), url(\'css/img/bg/' + Data.DungeonBiomeBackground[biome] + '\')">';
        str += '<h2 class="eh-biomeName">' + Data.DungeonBiome[biome] + '</h2>';

        str += '<div class="eh-biomeContent">';
        game.all_dungeons.filter(x => x.biome === Data.DungeonBiome[biome]).forEach(du => {
            str += getExplorationHubDungeon(du);
        })
        str += '</div>'

        str += '</div>';
    }
    str += '</div>';

    str += '<canvas class="explorationHubCanvas"></canvas>';


    document.querySelector('.explorationHub').innerHTML = str;

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

    str += du.name;

    return str;
}
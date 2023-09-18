function drawAlchemyScreen(refresh = false) {
    game.alchemy.selectRandomIcon();

    let str = '';

    str += '<div class="alchPotionPreview">';
    str += '<div class="alchPotionPreview-wrapper coolBorderBis">';

    str += '<div class="alchPotionPreview-vignetteContainer">';
    str += getAlchemyPotionPreviewVignette();
    str += '</div>';

    str += '<div class="alchPotionPreview-infos">';
    str += '<input type="text" value="' + getRandomPotionName() + '" minlength="3" maxlength="24" class="alchPotionPreview-name">';

    str += '<div class="alchPotionPreview-effects">';
    str += getAlchemyPotionPreviewEffects();
    str += '</div>';

    str += getAlchemyPreviewToxicity();

    str += '</div>';
    str += '<div class="alchBrew" style="display: none">Brew<div class="alchBrewGauge gaugeProgress"><div class="statGauge alchemyGauge"></div></div><canvas class="alchBrewCanvas"></canvas></div>';
    str += '</div></div>';

    str += '<div class="alchIngredient alchIngredientOne" ondragover="allowDrop(event);" ondrop="game.alchemy.addIngredient(event, 0);">';
    str += getAlchemyIngredient(game.alchemy.ingredients[0]);
    str += '</div>';

    str += '<div class="alchIngredient alchIngredientTwo" ondragover="allowDrop(event);" ondrop="game.alchemy.addIngredient(event, 1);">';
    str += getAlchemyIngredient(game.alchemy.ingredients[1]);
    str += '</div>';

    str += '<div class="alchIngredient alchIngredientThree" ondragover="allowDrop(event);" ondrop="game.alchemy.addIngredient(event, 2);">';
    str += getAlchemyIngredient(game.alchemy.ingredients[2]);
    str += '</div>';

    str += '<div class="alchNotifications"></div>';

    return str;
}

function getAlchemyPotionPreviewVignette(refresh = false) {
    let str = '';

    str += '<div class="alchPotionPreview-vignette" style="background-image: url(\'css/img/potions/' + game.alchemy.icon.icon + '.png\')"></div>';

    if(refresh) {
        document.querySelector('.alchPotionPreview-vignetteContainer').innerHTML = str;
        return;
    }
    return str;
}

function getAlchemyPotionPreviewEffects(refresh = false) {
    let str = '';

    if(game.alchemy.effects.length === 0) str += '<div class="alchNoEffects">No effect</div>';
    else game.alchemy.effects.forEach(eff => {
        console.log(eff);
        str += eff.effect.getFormatted({cssClass: 'alchPreviewEffect', noTheorical: true, defaultColor: true});
    });

    const toxGauge = document.querySelector('#alchPrevToxGauge');
    const toxNumbers = document.querySelector('#alchPrevToxNumbers');
    const tox = game.alchemy.toxicity;
    if(toxGauge) toxGauge.style.width = Math.min(tox, 100) + '%';
    if(toxNumbers) toxNumbers.textContent = tox + '/100';

    if(refresh) {
        document.querySelector('.alchPotionPreview-effects').innerHTML = str;
        return;
    }
    return str;
}

function getAlchemyPreviewToxicity(refresh = false) {
    let str = '';

    str += '<div class="gaugeProgress"><div id="alchPrevToxGauge" class="statGauge toxicitySmaller" style="width:'+ Math.round((game.alchemy.toxicity*100)/100) +'%"></div></div>';
    str += '<div class="alchToxicity">';
    str += '<div>Toxicity</div>';
    str += '<div id="alchPrevToxNumbers">' + game.alchemy.toxicity + '/100</div>';
    str += '</div>'

    return str;
}

function getAlchemyIngredient(ingr, refresh = false) {
    let str = '';

    str += '<div class="alchIngredient-vignette' + (ingr ? ' alchVignetteActive' : '') + '" ' + (ingr ? 'style="background-image: url(\'css/img/resources/' + ingr.icon + '.png\');"' : '') + '></div>';
    str += '<div class="alchIngredient-name barred" style="display: ' + (ingr ? 'block' : 'none') + '">' + (ingr ? ingr.name : '') + '</div>';
    str += '<div class="alchIngredient-effects" style="display: ' + (ingr ? 'block' : 'none') + '">';
    if(ingr) {
        str += '<div class="toggleButton off">Passive</div>';
        str += '<div class="toggleButton off">Recovery</div>';
        str += '<div class="toggleButton off">Special</div>';
    }
    str += '</div>';

    if(refresh) {
        const index = game.alchemy.ingredients.indexOf(ingr);
        document.querySelectorAll('.alchIngredient')[index].innerHTML = str;
        generateAlchemyIngredientEvents(ingr);
        return;
    }
    return str;
}

function displayAlchemyBrewButton() {
    const alch = game.alchemy;

    if(alch.effects.length > 0) document.querySelector('.alchBrew').style.display = 'flex';
    else document.querySelector('.alchBrew').style.display = 'none';
}

function addAlchemyNotification(message) {
    let str = '';

    str += '<div class="alchNotification">';
    str += message;
    str += '</div>';

    document.querySelector('.alchNotifications').innerHTML = str;
}

function unselectAllAlchemyIngredientSelectors(ingr) {
    ingr.querySelectorAll('.toggleButton').forEach(but => {
        but.classList.add('off');
    })
}
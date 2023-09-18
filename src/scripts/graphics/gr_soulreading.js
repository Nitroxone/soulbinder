function getSwRead(refresh = false) {
    let str = '';

    str += '<div class="swRead-banner">';
    str += getSoulreadingBanner();
    str += '</div>';

    str += '<div class="swRead-sigil">';
    str += getSoulreadingSigil();
    str += '</div>';

    str += '<div class="swRead-soulmarks">';
    str += getSoulreadingSoulmarks();
    str += '</div>';

    if(refresh) {
        document.querySelector('#soulwcontent-read').innerHTML = str;
        return;
    }
    return str;
}

function getSoulreadingBanner(refresh = false) {
    let str = '';



    if(refresh) {
        document.querySelector('.swRead-banner').innerHTML = str;
        return;
    }
    return str;
}

function getSoulreadingSigil(refresh = false) {
    let str = '';

    str += '<div class="swReadSigilSlot' + (game.soulwriting.sigil ? ' srSigilSlotAnim' : '') + '" ondragover="allowDrop(event)" ondrop="game.soulwriting.selectSigil(event)">'
    if(game.soulwriting.sigil) {
        str += '<div class="swReadSigilSlotIcon" style="' + getIcon(game.soulwriting.sigil, 45) + '"></div>';
    }
    str += '</div>';

    if(refresh) {
        document.querySelector('.swRead-sigil').innerHTML = str;
        return;
    }
    return str;
}

function getSoulreadingSoulmarks(refresh = false) {
    let str = '';
    let delay = 0;

    str += '<div class="swReadSoulmarksContainer">';
    game.soulwriting.sigil?.effects.forEach(eff => {
        str += getFormattedSoulmark(getSoulmarkFromEffect(eff.effect), true, delay);
        delay += 0.2;
    })
    str += '</div>';

    if(refresh) {
        document.querySelector('.swRead-soulmarks').innerHTML = str;
        generateSoulreadingSoulmarkEvents();
        return;
    }
    return str;
}
function drawSoulbindingScreen(refresh = false) {
    let str = '';

    str += '<div class="sbItem" ondragover="allowDrop(event)" ondrop="game.soulbinding.setItem(event)">';
    str += getSoulbindingItem();
    str += '</div>';

    str += '<div class="sbObjects">';
    str += getSoulbindingObjects();
    str += '</div>';

    return str;
}

function getSoulbindingItem(refresh = false) {
    let str = '';

    if(game.soulbinding.item) {
        str += '<div class="sbItemContainer">';

        str += '<div class="sbItemContainerHeader sbItem' + capitalizeFirstLetter(game.soulbinding.item.rarity) + '">';
        str += '<div class="sbItemContainerIcon" style="' + getIcon(game.soulbinding.item) + '"></div>';
        str += '<div class="sbItemContainerName" style="color: ' + getRarityColorCode(game.soulbinding.item.rarity) + '"><span>' + game.soulbinding.item.name + '</span></div>';
        str += '</div>';

        str += '<div class="sbItemContainerIndicators">';

        str += '<div class="sbItemContainerIndicator">';
        str += '<h3>Sigil</h3>';
        str += '<div class="sbItemContainerDots">';
        if(game.soulbinding.item.hasSigil()) str += '<span class="sbFulldot"></span>';
        else str += '<span class="sbEmptyDot"></span>';
        str += '</div></div>';

        str += '<div class="sbItemContainerIndicator">';
        str += '<h3>Echo</h3>';
        str += '<div class="sbItemContainerDots">';
        if(game.soulbinding.item.hasEcho()) str += '<span class="sbFulldot"></span>';
        else str += '<span class="sbEmptyDot"></span>';
        str += '</div></div>';

        str += '<div class="sbItemContainerIndicator">';
        str += '<h3>Alterations</h3>';
        str += '<div class="sbItemContainerDots">';
        for(let i = 0, c = game.soulbinding.item.alterations.length; i < game.soulbinding.item.allowedAlterations; i++) {
            if(c > 0) str += '<span class="sbFulldot"></span>';
            else str += '<span class="sbEmptyDot"></span>';
            c--;
        }
        str += '</div></div>'

        str += '</div>';

        str += '<div class="sbItemContainerEffects coolBorder">';
        str += getAlterations(game.soulbinding.item);
        str += '</div>';

        str += '</div>';
    } else {
        str += '<div class="sbNoItem">No Item</div>';
    }

    if(refresh) {
        document.querySelector('.sbItem').innerHTML = str;
        generateSoulbindingItemEvents();
        return;
    }
    return str;
}

function getSoulbindingActions(refresh = false) {
    let str = '';

    str += '<div class="sbAction sbActionUnbind"><div class="sbActionContent">';
    str += 'Unbind';
    str += '</div></div>';
    str += '<div class="sbAction sbActionBind"><div class="sbActionContent">';
    str += 'Bind';
    str += '</div></div>';
    str += '<div class="sbAction sbActionExtract"><div class="sbActionContent">';
    str += 'Extract'
    str += '</div></div>';

    if(refresh) {
        document.querySelector('.sbActions').innerHTML = str;
        return;
    }
    return str;
}

function getSoulbindingObjects(refresh = false) {
    const item = game.soulbinding.item;
    let animDelay = 0;
    let str = '';

    str += '<div class="sbObjectsSigils">';
    if(item && item.hasOwnProperty('sigil')) {
        str += '<div class="sbObjectsSigilWrapper" style="animation-delay: ' + animDelay + 's;">';
        if(item.hasSigil()) {
            str += '<div id="sbSig-' + item.sigil.id + '" class="sbObjectsSigil">';
            str += getSigilDetails(item.sigil, false, true);
            str += '</div>';
            str += getSigilUnbindingCommand(item.sigil.id);
        } else {
            str += '<div class="sbObjectsSigil">';
            str += getEmptySigilHTML(true, 1);
            str += '</div>';
            str += getSigilBindingCommand();
        }
        str += '</div>';
        animDelay += 0.1;
    }
    str += '</div>';

    str += '<div class="sbObjectsEchoes">';
    if(item && item.hasOwnProperty('echo')) {
        animDelay += 0.1;
        str += '<div class="sbObjectsSigilWrapper" style="animation-delay: ' + animDelay + 's;">';

        if(canReceiveEcho(item)) {
            str += '<div class="sbObjectsSigil">';
            if(item.hasEcho()) str += getEchoDetails(item.echo, false, true);
            else {
                str += getEmptyEchoHTML(true);
            }
            str += '</div>';
            str += getEchoExtractCommand(item.echo.id);
        }
        else {
            str += '<div class="sbCannotHostEcho">No echo allowed on this item</div>';
        }
        str += '</div>';
    }
    str += '</div>';

    if(refresh) {
        document.querySelector('.sbObjects').innerHTML = str;
        generateSoulbindingObjectsEvents();
        return;
    }
    return str;
}

function getSigilUnbindingCommand(id = 0) {
    let str = '';

    str += '<div id="unbind-' + id + '" class="sbManipulationCommand">Unbind</div>';

    return str;
}

function getSigilBindingCommand() {
    let str = '';

    str += '<div class="sbManipulationCommand sbBind">Bind</div>';

    return str;
}

function getEchoExtractCommand(id = 0) {
    let str = '';

    str += '<div id="extract-' + id + '" class="sbManipulationCommand">Extract</div>';

    return str;
}
function drawSoulwritingScreen() {
    let str = '';

    str += '<div class="soulwTabs">';
    str += '<div id="soulwtab-read" class="soulwTab' + (game.soulwriting.currentTab === 'read' ? ' activeTab' : '') + '">Read</div>';
    str += '<div id="soulwtab-write" class="soulwTab' + (game.soulwriting.currentTab === 'write' ? ' activeTab' : '') + '">Write</div>';
    str += '<div id="soulwtab-bend" class="soulwTab' + (game.soulwriting.currentTab === 'bend' ? ' activeTab' : '') + '">Bend</div>';
    str += '</div>';

    str += '<div id="soulwcontent-read" class="soulwContent" style="display: grid">';
    str += getSwRead();
    str += '</div>';

    str += '<div id="soulwcontent-write" class="soulwContent" style="display: none">';
    str += getSwWrite();
    str += '</div>';

    str += '<div id="soulwcontent-bend" class="soulwContent">';
    str += getSwBend();
    str += '</div>';

    return str;
}

function drawSoulwritingLines(refresh = false) {
    const parent = document.querySelector('.swWriteCrafting');
    const slots = document.querySelectorAll('.swWriteSlot');

    let str = '';

    str += '<svg class="soulwritingOverlay" height="' + parent.scrollHeight + '" width="' + parent.offsetWidth + '">';

    for(let i = 0; i < slots.length; i++) {
        let slot = slots[i];
        //const basePos = slot.getBoundingClientRect();
        const basePosOriginX = (slot.offsetLeft);
        const basePosOriginY = (slot.offsetTop);

        const targetAccessor = i+1 === slots.length ? 0 : i+1;
        const target = slots[targetAccessor];
        //const targetPos = target.getBoundingClientRect();
        const targetPosOriginX = (target.offsetLeft);
        const targetPosOriginY = (target.offsetTop);
        const id = 'swline-' + (i) + '_' + targetAccessor;

        str += '<line class="swConnector" id="' + id + '" x1="' + basePosOriginX + '" y1="' + basePosOriginY + '" x2="' + targetPosOriginX + '" y2="' + targetPosOriginY + '" style="stroke-width: 1;" stroke-linecap="round" />'
    }

    str += '</svg>';

    if(!refresh) parent.innerHTML += str;
    else document.querySelector('.soulwritingOverlay').outerHTML = str;

    document.querySelectorAll('.swWriteSlot').forEach(slot => {
        slot.style.zIndex = '1';
    })
}

function addSoulmarkAbrevToSlot(slot, slmrk) {
    slot.innerHTML = '<span>' + slmrk.name.slice(0, 3) + '</span>';
    slot.classList.add('swFilledSlot');
}
function removeSoulmarkAbrevFromSlot(slot) {
    slot.innerHTML = '';
    slot.classList.remove('swFilledSlot');
}

function getSwWrite(refresh = false) {
    let str = '';

    str += '<div class="swWriteList">';
    str += getSwWriteList();
    str += '</div>';

    str += '<div class="swWriteCrafting">';
    str += '<input class="swWrite-sigilName barred infoTitle" type="text" value="' + getRandomSigilName() + '" minlength="3" maxlength="24">';
    str += '<div class="swWrite-vignetteContainer"><div class="swWrite-vignette" style="background-image: url(\'css/img/sigils/' + game.soulwriting.icon.icon + '.png\')"></div></div>';
    str += '<div id="sws1" class="swWriteSlot"></div>';
    str += '<div id="sws2" class="swWriteSlot"></div>';
    str += '<div id="sws3" class="swWriteSlot"></div>';
    str += '<div id="sws4" class="swWriteSlot"></div>';

    str += '<div class="swWriteCraft">';
    str += '<div id="swWrite-stalwart" class="swWrite-stalwart"><span>' + game.player.sw_stalwartFactor + '%</span></div>';
    str += '<div class="swWrite-write"><span>Write</span><canvas id="canv-soulwrite" class="swSlotCanvas"></canvas></div>';
    str += '<div id="swWrite-corrupt"class="swWrite-corrupt"><span>' + game.player.sw_corruptFactor + '%</span></div>';
    str += '</div>';

    str += '<div class="swWrite-backgroundCover coolBorderBis"></div>'
    str += '</div>';

    if(refresh) {
        document.querySelector('#soulwcontent-write').innerHTML = str;
        return;
    }
    return str;
}

function getSwWriteList(refresh = false) {
    let str = '';

    str += '<div class="swWriteList-header">Soulmarks</div>';
    str += '<div class="swWriteList-list">';
    if(game.player.getAllUnlockedSoulmarks().length == 0) {
        str += '<div class="swWriteList-list-empty">No soulmarks learnt</div>';
    }
    else {
        game.player.getAllUnlockedSoulmarks().forEach(sm => {
            str += getFormattedSoulmark(sm);
        });
    }
    str += '</div>';

    if(refresh) {
        document.querySelector('.swWriteList').innerHTML = str;
        generateSwSoulmarksEvents();
        return;
    }
    return str;
}

function getFormattedSoulmark(sm, soulreadingFormat = false, delay = 0) {
    const eff = new Stat({effect: sm.effect, theorical: sm.theorical});

    let str = '';

    str += '<div id="sm-' + sm.name + (soulreadingFormat ? '-sr' : '') + '" class="swWriteList-single' + (soulreadingFormat ? ' srSlmrkAnim" style="animation-delay: ' + delay + 's;"' : '"') + '><div class="swWriteList-singleHeader"><span>' + capitalizeFirstLetter(sm.name) + '</span>' + eff.getFormatted({cssClass: 'swWriteList-eff', noValue: true, noTheorical: true}) + '</div>';
    if(!soulreadingFormat) {
        str += '<div class="extendedSoulmarkContainer"></div>';
    }
    else {
        str += '<div class="soulreadingSoulmarkContainer">'
        str += getSoulmarkProgressGauge(sm);
        str += '</div>';
        str += '<div class="srAnimatorProgress"></div>';
    }
    str += '</div>';

    return str;
}

function getSoulmarkProgressGauge(sm) {
    let str = '';

    str += '<div class="gaugeProgress slmrkGauge"><div class="statGauge soulmark" style="width: ' + Math.round((sm.studied*100)/sm.researchTotal) + '%"><span class="gaugeIndicator">' + sm.studied + '/' + sm.researchTotal + '</span></div></div>';
    str += '<div class="alchToxicity">';
    str += '<div class="slmrkStatus ' + (sm.unlocked ? 'un' : '') + 'locked">' /*+ '<div class="slmrkStatusIcon"></div>'*/ + (sm.unlocked ? 'Unl' : 'L') + 'ocked</div>';
    str += '<div class="slmrkNum">' + getSoulreadingSoulmarkValue(sm) + '</div>';
    str += '</div>';

    return str;
}
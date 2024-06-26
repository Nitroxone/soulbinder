function drawExplorationScreen() {
    document.querySelector('#explorationDiv').innerHTML = '<div class="explorationContainer"></div>';

    const dungeon = game.dungeon;
    const floor = dungeon.floor;

    let str ='';

    str += '<div id="exploration-mapPanel" class="coolBorder">'
    str += '<div class="exploration-repositionMap"></div>';
    str += '<div class="exploration-mapContainer">';
    str += '<div class="exploration-map" style="width: ' + (floor.gridSize[1] * 100 + 300) + 'px; height: ' + (floor.gridSize[0] * 100 + 300) + 'px;">';
    floor.getAssignedRooms().forEach(room => {
        str += '<div id="ch-' + room.id + '" class="map-roomContainer coolBorder' + (room === floor.room ? ' visitedRoom currentRoom' : room.revealed ? ' revealedRoom visitedRoom' : ' hiddenRoom') + getDungeonMapRoomStyle(room.type) + '" style="top: ' + room.coordinates[0] * 150 + 'px; left: ' + room.coordinates[1] * 150 + 'px;">';
        str += '<div class="dr-type dr-type-' + room.type.replaceAll(' ', '_') + '"></div>';
        //str += '<span style="font-size: 1rem">' + room.coordinates + '</span>';
        str += '</div>';
    });
    str += '</div>';
    str += '</div>';
    str += '<img class="mapCornerTl" src="css/img/map_tl_corner.png" />';
    str += '<img class="mapCornerTr" src="css/img/map_tr_corner.png" />';
    str += '<img class="mapCornerBl" src="css/img/map_bl_corner.png" />';
    str += '<img class="mapCornerBr" src="css/img/map_br_corner.png" />';
    str += '<div class="map-dungeonName">' + dungeon.name + '</div>';
    str += '</div>';


    str += '<div id="exploration-infosPanel" class="coolBorderBis">';
    str += drawExplorationInfosPanel();
    str += '</div>';

    document.querySelector('.explorationContainer').innerHTML = str;

    drawMapConnectors();
    bringRoomsForward();
    generateExplorationMapEvents();
    generateExplorationInfosPanelEvents();
    generateMapRoomsEvents();
    recenterDungeonMap();
}

function dungeonActionApplyEnteredStyle(html) {
    html.querySelector('h4').textContent = 'Entered';
    html.classList.add('disabledActionButton');
}

function dungeonActionApplyScoutedStyle(html) {
    html.querySelector('h4').textContent = 'Scouted';
    html.querySelector('h6').remove();
    html.classList.add('disabledActionButton');
}

function dungeonActionApplySearchedStyle(html) {
    html.querySelector('h4').textContent = 'Searched';
    html.classList.add('disabledActionButton');
}

function displayTextLetterByLetter(text, dom, delay = 1) {
    game.textDisplaySwitch = false;
    let index = 0;
    dom = document.querySelector(dom);

    if(delay === 0) {
        dom.innerHTML = text;
        return;
    }

    function displayNextLetter() {
        if(index < text.length && !game.textDisplaySwitch) {
            const letter = text[index];
            dom.innerHTML += letter;

            index++;
            setTimeout(displayNextLetter, delay)
        }
    }

    displayNextLetter();
}

function stopDisplayTextLetterByLetter() {
    game.textDisplaySwitch = true;
}

function clearCurrentDungeonPanelDesc() {
    stopDisplayTextLetterByLetter();
    document.querySelector('.infosPanel-roomDesc').innerHTML = '';
}

function clearCurrentRoom() {
    game.dungeon.floor.room.clear();
    document.querySelector('.infosPanel-roomHeader').classList.add('clearedHeader');
    document.querySelector('.infosPanel-roomHeader').classList.remove('engagedHeader');
    document.querySelector('.roomHeader-status').innerHTML = game.dungeon.floor.room.status;

    clearCurrentDungeonPanelDesc();
    setTimeout(() => {displayTextLetterByLetter(game.dungeon.floor.room.getRoomDescription(), '.infosPanel-roomDesc', 0);}, 10);
}

function engageCurrentRoom() {
    game.dungeon.floor.room.engage();
    document.querySelector('.infosPanel-roomHeader').classList.add('engagedHeader');
    document.querySelector('.roomHeader-status').innerHTML = game.dungeon.floor.room.status;

    clearCurrentDungeonPanelDesc();
    setTimeout(() => {displayTextLetterByLetter(game.dungeon.floor.room.getRoomDescription(), '.infosPanel-roomDesc', 0);}, 10);
}

function drawDungeonFoundLoot(refresh = false) {
    let loot = game.dungeon.floor.room.foundLoot;

    let str = '';
    str += '<div class="divider"></div>'
    console.log('loot drawn!');
    if(loot.length > 0) {
        let timer = 0;
        str += '<div class="roomLootResult-title">Loot found</div>';
        loot.forEach(lo => {
            str += '<div id="loit-' + (lo.type === 'gold' ? 'gold' : lo.item.id) + '" class="roomLootResult-listItem sigilInfo revealingLoot' + (lo.looted ? ' lootedLoot' : '') + '" style="animation-delay: ' + timer + 's;' + (lo.type === 'gold' ? 'background-image: url(\'css/img/goldicon.png\'); background-size: 25%;' : getIcon(lo.item, 25, true)) + '">';
            str += '<div class="sigilTitle" style="text-align: left">' + '<span class="lootQuantity">' + lo.amount + ' </span>' + (lo.type === 'gold' ? '<span class="smallThingNoIcon" style="color: yellow">Gold</span>' : getSmallThingNoIcon(lo.item, null)) + '</div>';
            str += '<div class="revealingLootAnim revealLoot' + (lo.type === 'gold' ? 'Gold' : capitalizeFirstLetter(lo.item.rarity)) + '" style="animation-delay: ' + (timer) + 's;"></div>';
            if(refresh) str += '<canvas class="revealingLootCanvas ' + (lo.type === 'gold' ? 'gold' : lo.item.rarity) + ' roomLootCanvas"></canvas>';
            str += '</div>';
            timer += 0.25;
        });
    } else {
        str += '<div class="roomLootResult-title">No loot found</div>';
    }

    if(refresh) {
        document.querySelector('.infosPanel-actionResult').innerHTML = str;
        return;
    }
    return str;
}

function drawDungeonStats(refresh = false) {
    let str = '';

    str += '<div class="ip-dungeonstats-wrapper">';

    str += '<div id="dPanelEL" class="ipds-EL">';
    str += '<h4 class="ELstyling">' + game.player.du_ephemeralLuck + "</h4>";
    str += '<canvas id="dPanelELcanvas"></canvas>';
    str += '</div>';

    str += '<div id="dPanelInventory" class="eh-r-inventory dungeonPanelFormat ipds-knapsack"></div>';

    str += '<div class="ipds-lifeblood"></div>';

    str += '<div class="ipds-agitator"></div>';

    str += '<div class="ipds-stats"></div>';

    str += '</div>';

    if(refresh) {
        document.querySelector('.infosPanel-dungeonStats').innerHTML = str;
        generateDungeonStatsEvents();
        return;
    }
    return str;
}

function drawExplorationInfosPanel(refresh = false) {
    let str = '';
    const currentRoom = game.dungeon.floor.room;
    const actions = currentRoom.getActions();

    str += '<div class="infosPanel-roomHeader' + (currentRoom.status === Data.DungeonRoomStatus.CLEARED ? ' clearedHeader' : '') + '">';
    str += '<div class="roomHeader-status">' + currentRoom.status + '</div>';
    str += '<div class="roomHeader-type">' + (currentRoom.identified ? currentRoom.type : 'Unknown') + '</div>';
    str += '</div>';

    str += '<div class="infosPanel-roomDesc">';
    str += '</div>';

    str += '<div class="infosPanel-roomActions">';
    str += drawDungeonPanelActions()
    str += '</div>';

    str += '<div class="infosPanel-actionResult">';
    if(currentRoom.foundLoot) str += drawDungeonFoundLoot();
    str += '</div>';

    str += '<div class="infosPanel-dungeonStats">';
    str += drawDungeonStats();
    str += '</div>'

    if(refresh) {
        document.querySelector('#exploration-infosPanel').innerHTML = str;
        return;
    }
    return str;
}

function drawDungeonPanelActions(refresh = false) {
    let str = '';
    const actions = game.dungeon.floor.room.getActions();

    if(actions.includes(Data.DungeonRoomAction.ENTER)) {
        str += getDungeonEnterButton(actions.includes(Data.DungeonRoomAction.SCOUT));
    }
    if(actions.includes(Data.DungeonRoomAction.SCOUT)) {
        str += getDungeonScoutButton();
    }
    if(actions.includes(Data.DungeonRoomAction.SEARCH)) {
        str += getDungeonSearchButton(actions.includes(Data.DungeonRoomAction.SCOUT));
    }

    if(refresh) {
        document.querySelector('.infosPanel-roomActions').innerHTML = str;
        return;
    }
    return str;
}

function revealCluster(cluster) {
    document.querySelectorAll('.parentCluster-' + cluster.id).forEach(ro => {
        ro.classList.remove('hiddenRoom');
        ro.classList.add('revealedRoom');
    });
    cluster.revealedCluster = true;
}

function revealFarClusters() {
    game.dungeon.floor.clusters.filter(x => x.revealedCluster).forEach(cl => {
        document.querySelectorAll('.parentCluster-' + cl.id).forEach(ro => {
            ro.classList.remove('hiddenRoom');
            ro.classList.add('revealedRoom');
        });
    });
}

function drawMapConnectors(refresh = false) {
    const parent = document.querySelector('.exploration-map');
    const rooms = game.dungeon.floor.getAssignedRooms();

    let str = '';

    str += '<svg class="mapConnectorsOverlay" height="' + parent.scrollHeight + '" width="' + (parent.offsetWidth*2) + '">';

    rooms.forEach(ro => {
        if(!ro.nextRooms) return;
        else {
            // TODO: refacto this horrendous fucking shit (too lazy right now)
            ro.nextRooms.forEach(room => {

                const elem = document.querySelector('#ch-' + ro.id);
    
                const basePos = elem.getBoundingClientRect();
                const basePosOriginX = (elem.offsetLeft + basePos.width / 2) + 4.5;
                const basePosOriginY = (elem.offsetTop + basePos.height / 2) + 4.5;
    
                const nextRoomDom = document.querySelector('#ch-' + room.id);
                const targetPos = nextRoomDom.getBoundingClientRect();
                const targetPosOriginX = (nextRoomDom.offsetLeft + targetPos.width / 2) + 4.5;
                const targetPosOriginY = (nextRoomDom.offsetTop + targetPos.height / 2) + 4.5;
                const id = 'connector_' + ro.id + '_to_' + room.id;
    
                if(document.querySelector('#' + id)) return;

                let color = '';
                if(room.revealed) {
                    if(!room.revealed) color = ' canVisitConnector';
                    else color = ' visitedConnector';
                }
                if(!room.revealed && room.revealed) color = ' canVisitConnector';
    
                str += '<line class="mapConnector' + color + '" id="' + id + '" x1="' + basePosOriginX + '" y1="' + basePosOriginY + '" x2="' + targetPosOriginX + '" y2="' + targetPosOriginY + '" style="stroke-width: 1;" />';
            });
        }
    });

    str += '</svg>';

    if(!refresh) parent.innerHTML += str;
    else document.querySelector('.mapConnectorsOverlay').outerHTML = str;
}

function bringRoomsForward() {
    document.querySelectorAll('.map-roomContainer').forEach(single => {
        single.style.zIndex = '1';
    });
    document.querySelectorAll('.map-clusterContainer').forEach(single => {
        single.style.zIndex = '1';
    });
}

function drawDungeonELlock() {
    let str = '';

    str += '<div class="dungeonELlock-wrapper">';
    str += '<h2>' + getDungeonELlockTitle(game.dungeon.floor.room.type) + '</h2>';

    str += '<div class="dungeonELlock-nums">';
    str += '<div class="numEL num-less">-</div>';
    str += '<input type="number" id="ephemeralLuckUnlockerCount" class="ELstyling" readonly>';
    str += '<div class="numEL num-more">+</div>';
    str += '</div>';
    str += '<div class="divider" style="margin-top: 0; margin-bottom: 0;"></div>';

    str += '<div class="dungeonELlock-button">Pour</div>';
    str += '</div>';

    document.querySelector('.infosPanel-actionResult').innerHTML = str;
}

function drawDungeonRegenerate(results) {
    let str = '';

    str += '<div class="dungeonRegen-wrapper">'
    for(const result in results) {
        const stri = game.player.formation.find(x => x.name === result);
        const health = results[result].health;
        const stamina = results[result].stamina;
        const mana = results[result].mana;
        
        str += '<div class="dungeonRegen-single">';
        str += '<div class="drs-striName">' + stri.name + '</div>';
        str += '<div class="drs-striGauges">'
        if(health) {
            str += '<div class="dungeonRegenGauge">';
            str += '<div class="gaugeProgress">';
            str += '<div id="dunregHealth-' + stri.id + '" class="statGauge health" style="width:' + Math.round((health[0]*100)/stri.maxHealth) + '%"></div>';
            str += '</div>';
            str += '<div id="dunregIndicHealth-' + stri.id + '" class="dungeonRegenGaugeIndicator" style="color: ' + Data.Color.RED + '">0</div>';
            str += '</div>';
        }
        if(stamina) {
            str += '<div class="dungeonRegenGauge">';
            str += '<div class="gaugeProgress">';
            str += '<div id="dunregStamina-' + stri.id + '" class="statGauge stamina" style="width:' + Math.round((stamina[0]*100)/stri.maxStamina) + '%"></div>';
            str += '</div>';
            str += '<div id="dunregIndicStamina-' + stri.id + '" class="dungeonRegenGaugeIndicator" style="color: ' + Data.Color.GREEN + '">0</div>';
            str += '</div>';
        }
        if(mana) {
            str += '<div class="dungeonRegenGauge">';
            str += '<div class="gaugeProgress">';
            str += '<div id="dunregMana-' + stri.id + '" class="statGauge mana" style="width:' + Math.round((mana[0]*100)/stri.maxMana) + '%"></div>';
            str += '</div>';
            str += '<div id="dunregIndicMana-' + stri.id + '" class="dungeonRegenGaugeIndicator" style="color: ' + Data.Color.BLUE + '">0</div>';
            str += '</div>';
        }
        str += '</div>';
        str += '</div>';
    }

    document.querySelector('.infosPanel-actionResult').innerHTML = str;

    setTimeout(() => {
        game.player.formation.forEach(stri => {
            const health = results[stri.name].health[1];
            const hGauge = document.querySelector('#dunregHealth-' + stri.id);
            const hIndic = document.querySelector('#dunregIndicHealth-' + stri.id);
            const stamina = results[stri.name].stamina[1];
            const sGauge = document.querySelector('#dunregStamina-' + stri.id);
            const sIndic = document.querySelector('#dunregIndicStamina-' + stri.id);
            const mana = results[stri.name].mana[1];
            const mGauge = document.querySelector('#dunregMana-' + stri.id);
            const mIndic = document.querySelector('#dunregIndicMana-' + stri.id);

            hGauge.style.width = Math.round((stri.health*100)/stri.maxHealth) + '%';
            sGauge.style.width = Math.round((stri.stamina*100)/stri.maxStamina) + '%';
            mGauge.style.width = Math.round((stri.mana*100)/stri.maxMana) + '%';
            animateNumber(hIndic, health, 2000, 'increase', (health > 0 ? '+' : health < 0 ? '-' : ''));
            animateNumber(sIndic, stamina, 2000, 'increase', (stamina > 0 ? '+' : stamina < 0 ? '-' : ''));
            animateNumber(mIndic, mana, 2000, 'increase', (mana > 0 ? '+' : mana < 0 ? '-' : ''));
        });
    }, 100);
}
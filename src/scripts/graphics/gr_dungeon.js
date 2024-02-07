function drawExplorationScreen() {
    document.querySelector('#explorationDiv').innerHTML = '<div class="explorationContainer"></div>';

    const dungeon = game.dungeon;
    const floor = dungeon.floor;

    let str ='';

    str += '<div id="exploration-mapPanel" class="coolBorder">'
    str += '<div class="exploration-repositionMap"></div>';
    str += '<div class="exploration-mapContainer">';
    str += '<div class="exploration-map" style="width: ' + (floor.gridSize[1] * 100 + 100) + 'px; height: ' + (floor.gridSize[0] * 100 + 100) + 'px;">';
    floor.getAssignedRooms().forEach(room => {
        str += '<div id="ch-' + room.id + '" class="map-roomContainer coolBorder' + (room === floor.room ? ' visitedRoom currentRoom' : room.revealed ? ' revealedRoom visitedRoom' : ' hiddenRoom') + '" style="top: ' + room.coordinates[0] * 100 + 'px; left: ' + room.coordinates[1] * 100 + 'px;">';
        //str += '<div class="dr-type dr-type-' + room.type.replaceAll(' ', '_') + '"></div>';
        str += '<span style="font-size: 1rem">' + room.coordinates + '</span>';
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
    str += '<div id="dPanelInventory" class="eh-r-inventory dungeonPanelFormat"></div>';
    str += '<h4 class="ELstyling">' + game.player.du_ephemeralLuck + " Ephemeral Luck";
    str += '</div>';

    if(refresh) {
        document.querySelector('.infosPanel-dungeonStats').innerHTML = str;
        // Events
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

    str += '<svg class="mapConnectorsOverlay" height="' + parent.scrollHeight + '" width="' + parent.offsetWidth + '">';

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
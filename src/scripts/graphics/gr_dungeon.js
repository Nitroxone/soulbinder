function drawExplorationScreen() {
    document.querySelector('#explorationDiv').innerHTML = '<div class="explorationContainer"></div>';

    const dungeon = game.currentDungeon;
    const floor = dungeon.currentFloor;

    let str ='';

    str += '<div id="exploration-mapPanel" class="coolBorder">'
    str += '<div class="exploration-repositionMap"></div>';
    str += '<div class="exploration-mapContainer">';
    str += '<div class="exploration-map" style="width: ' + (floor.gridSize[1] * 50) + 'px; height: ' + (floor.gridSize[0] * 50) + 'px;">';
    floor.clusters.forEach(cl => {
        const cluster = 'parentCluster-' + cl.id;
        str += '<div id="cl-' + cl.id + '" class="map-clusterContainer" style="top: ' + cl.coordinates[0] * 50 + 'px; left: ' + cl.coordinates[1] * 50 + 'px;"></div>';
        cl.childrenRooms.forEach(ch => {
            str += '<div id="ch-' + ch.id + '" class="' + cluster + ' map-roomContainer coolBorder' + (ch === floor.currentRoom ? ' visitedRoom currentRoom' : ' hiddenRoom') + '" style="top: ' + ch.coordinates[0] * 50 + 'px; left: ' + ch.coordinates[1] * 50 + 'px;"></div>';
        });
    })
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
    game.currentDungeon.currentFloor.currentRoom.clear();
    document.querySelector('.infosPanel-roomHeader').classList.add('clearedHeader');
    document.querySelector('.roomHeader-status').innerHTML = game.currentDungeon.currentFloor.currentRoom.status;

    clearCurrentDungeonPanelDesc();
    setTimeout(() => {displayTextLetterByLetter(game.currentDungeon.currentFloor.currentRoom.getRoomDescription(), '.infosPanel-roomDesc', 0);}, 10);
}

function drawDungeonFoundLoot(refresh = false) {
    let loot = game.currentDungeon.currentFloor.currentRoom.foundLoot;

    let str = '';
    str += '<div class="divider"></div>'

    if(loot.length > 0) {
        let timer = 0;
        str += '<div class="roomLootResult-title">Loot found</div>';
        loot.forEach(lo => {
            str += '<div class="roomLootResult-listItem sigilInfo revealingLoot" style="animation-delay: ' + timer + 's;' + (lo.type === 'gold' ? 'background-image: url(\'css/img/goldicon.png\'); background-size: 25%;' : getIcon(lo.item, 25, true)) + '">';
            str += '<div class="sigilTitle" style="text-align: left">' + '<span class="lootQuantity">' + lo.amount + ' </span>' + (lo.type === 'gold' ? '<span class="smallThingNoIcon" style="color: yellow">Gold</span>' : getSmallThingNoIcon(lo.item, null)) + '</div>';
            str += '<div class="revealingLootAnim revealLoot' + (lo.type === 'gold' ? 'Gold' : capitalizeFirstLetter(lo.item.rarity)) + '" style="animation-delay: ' + (timer) + 's;"></div>';
            if(refresh) str += '<canvas class="revealingLootCanvas ' + (lo.type === 'gold' ? 'gold' : lo.item.rarity) + '"></canvas>';
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

function drawDungeonStats() {
    let str = '';
    return str;
}

function drawExplorationInfosPanel(refresh = false) {
    let str = '';
    const currentRoom = game.currentDungeon.currentFloor.currentRoom;
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
    const actions = game.currentDungeon.currentFloor.currentRoom.getActions();

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
    })
}

function drawMapConnectors(refresh = false) {
    const parent = document.querySelector('.exploration-map');

    let str = '';

    str += '<svg class="mapConnectorsOverlay" height="' + parent.scrollHeight + '" width="' + parent.offsetWidth + '">';

    revealCluster(game.currentDungeon.currentFloor.currentRoom.parentCluster);
    const currentRoom = game.currentDungeon.currentFloor.currentRoom;
    const currentRoomDom = document.querySelector('#ch-' + currentRoom.id);
    if(currentRoom.previousRoom) {
        let previousRoomDom = document.querySelector('#ch-' + currentRoom.previousRoom.id);
        if(currentRoomDom.classList[0] !== previousRoomDom.classList[0]) revealCluster(currentRoom.previousRoom.parentCluster);
    }
    if(currentRoom.nextRoom) {
        let nextRoomDom = document.querySelector('#ch-' + currentRoom.nextRoom.id);
        if(currentRoomDom.classList[0] !== nextRoomDom.classList[0]) revealCluster(currentRoom.nextRoom.parentCluster);
    }

    game.currentDungeon.currentFloor.rooms.forEach(room => {
        if(!room.nextRoom) return;
        const elem = document.querySelector('#ch-' + room.id);

        const basePos = elem.getBoundingClientRect();
        const basePosOriginX = (elem.offsetLeft + basePos.width / 2) + 4.5;
        const basePosOriginY = (elem.offsetTop + basePos.height / 2) + 4.5;

        const nextRoomDom = document.querySelector('#ch-' + room.nextRoom.id);
        const targetPos = nextRoomDom.getBoundingClientRect();
        const targetPosOriginX = (nextRoomDom.offsetLeft + targetPos.width / 2) + 4.5;
        const targetPosOriginY = (nextRoomDom.offsetTop + targetPos.height / 2) + 4.5;
        const id = 'connector_' + room.id + '_to_' + room.nextRoom.id;

        let color = '';
        if(room.revealed) {
            if(!room.nextRoom.revealed) color = ' canVisitConnector';
        }
        if(!room.revealed && room.nextRoom.revealed) color = ' canVisitConnector';

        str += '<line class="mapConnector' + color + '" id="' + id + '" x1="' + basePosOriginX + '" y1="' + basePosOriginY + '" x2="' + targetPosOriginX + '" y2="' + targetPosOriginY + '" style="stroke-width: 1;" />';
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
function generateExplorationInfosPanelEvents() {
    const currentRoom = game.currentDungeon.currentFloor.currentRoom;
    const delay = currentRoom.isCleared() ? 0 : 1;
    displayTextLetterByLetter(currentRoom.getRoomDescription(), '.infosPanel-roomDesc', delay);

    const enter = document.querySelector('.roomActions-action.enter');
    const scout = document.querySelector('.roomActions-action.scout');
    const search = document.querySelector('.roomActions-action.search');

    if(enter) {

    }
    if(scout) {
        scout.addEventListener('click', e => {
            dungeonScoutEvent();
        });
    }
    if(search) {
        search.addEventListener('click', e => {
            dungeonSearchEvent();
        });
    }
}

function dungeonScoutEvent() {
    const scout = document.querySelector('.roomActions-action.scout');
    const currentRoom = game.currentDungeon.currentFloor.currentRoom;
    if(currentRoom.scout()) {
        const sfCv = document.querySelector('#solarFireflyCanvas');

        Quanta.burst({
            canvas: sfCv,
            color: Data.Color.ORANGE,
            amount: 100,
            particleSize: 4,
            duration: 4000,
            fadeAwayRate: 0,
            speed: {
                x: () => { return (-2 + Math.random() * 2) },
                y: () => { return (-4 + Math.random() * 10) }
            },
            delay: () => { return getRandomNumber(0, 100) }
        });

        document.querySelector('.infosPanel-roomHeader').classList.add('roomHeader-animateReveal');
        setTimeout(() => {
            document.querySelector('.roomHeader-type').textContent = currentRoom.type;
            document.querySelector('.roomHeader-type').classList.add('roomType-animateReveal');
        }, 500);

        dungeonActionApplyScoutedStyle(scout);
        if(currentRoom.canSearch()) {
            document.querySelector('.roomActions-action.enter').outerHTML = getDungeonSearchButton(true);
            document.querySelector('.roomActions-action.search').addEventListener('click', e => {
                dungeonSearchEvent();
            });
            document.querySelector('.roomActions-action.search').classList.add('revealSearchButton');
        }

        clearCurrentDungeonPanelDesc();
        console.log(currentRoom);
        setTimeout(() => {displayTextLetterByLetter(currentRoom.getRoomDescription(), '.infosPanel-roomDesc', 1);}, 10);
    }
}

function dungeonSearchEvent() {
    const search = document.querySelector('.roomActions-action.search');
    const currentRoom = game.currentDungeon.currentFloor.currentRoom;
    if(!currentRoom.isCleared()) {
        currentRoom.foundLoot = LootTable.Generators.generateLoot(LootTable.Presets.Dungeon[currentRoom.type]);
        drawDungeonFoundLoot(true);

        let quantadelay = 0;
        document.querySelectorAll('.revealingLootCanvas').forEach(cv => {
            setTimeout(() => {
                let params = getQuantaBurstParamsFromRarity(cv.classList[1]);

                Quanta.burst({
                    canvas: cv,
                    color: params.color,
                    amount: params.amount,
                    particleSize: params.particleSize
                });
            }, quantadelay);
            quantadelay += 250;
        })
        clearCurrentRoom();

        dungeonActionApplySearchedStyle(search);
    }
}

function generateMapRoomsEvents() {
    game.currentDungeon.currentFloor.rooms.forEach(room => {
        const nextRoom = room.nextRoom || null;
        const previousRoom = room.previousRoom || null;

        const roomDom = document.querySelector('#ch-' + room.id);
        const nextRoomDom = nextRoom ? document.querySelector('#ch-' + nextRoom.id) : null;
        const previousRoomDom = previousRoom ? document.querySelector('#ch-' + previousRoom.id) : null;

        // When clicking on a room tile
        roomDom.addEventListener('click', e => {
            // Only works if clicking on an accessible tile (next or previous room to the current one)
            if(nextRoom === game.currentDungeon.currentFloor.currentRoom || previousRoom === game.currentDungeon.currentFloor.currentRoom) {
                if(!room.revealed) {
                    room.revealed = true;
                    roomDom.classList.remove('revealedRoom');
                    roomDom.classList.add('visitedRoom');

                    if(previousRoom) {
                        let prevLine = document.querySelector('#connector_' + previousRoom.id + '_to_' + room.id);
                        console.log(prevLine);
                        if(!previousRoom.revealed) prevLine.classList.add('canVisitConnector');
                        else {
                            prevLine.classList.remove('canVisitConnector');
                            prevLine.classList.add('visitedConnector');
                        }

                        if(previousRoomDom) {
                            if(previousRoomDom.classList[0] !== roomDom.classList[0]) revealCluster(previousRoom.parentCluster);
                        }
                    }
                    if(nextRoom) {
                        let nextLine = document.querySelector('#connector_' + room.id + '_to_' + nextRoom.id);
                        console.log(nextLine);
                        if(!nextRoom.revealed)  nextLine.classList.add('canVisitConnector');
                        else {
                            nextLine.classList.remove('canVisitConnector');
                            nextLine.classList.add('visitedConnector');
                        }

                        if(nextRoomDom) {
                            if(nextRoomDom.classList[0] !== roomDom.classList[0]) revealCluster(nextRoom.parentCluster);
                        }
                    }
                }

                // Moving backward
                if(nextRoom === game.currentDungeon.currentFloor.currentRoom) {
                    nextRoomDom.classList.remove('currentRoom');
                    game.currentDungeon.currentFloor.moveToPreviousRoom();
                }
                // Moving forward
                else if(previousRoom === game.currentDungeon.currentFloor.currentRoom) {
                    previousRoomDom.classList.remove('currentRoom');
                    game.currentDungeon.currentFloor.moveToNextRoom();
                }

                roomDom.classList.add('currentRoom');
                drawExplorationInfosPanel(true);
                generateExplorationInfosPanelEvents();
            }
        });
    })
}

function generateExplorationMapEvents() {
    let zoomLevel = 1;
    const map = document.querySelector('.exploration-map');
    const mapContainer = document.querySelector('.exploration-mapContainer');

    mapContainer.addEventListener('wheel', e => {
        map.style.transition = '';
        mapContainer.style.transition = '';
        e.preventDefault();

        const direction = Math.sign(e.deltaY);

        zoomLevel += -direction * 0.65;
        zoomLevel = Math.max(0.65, zoomLevel);
        zoomLevel = Math.min(1, zoomLevel);

        map.style.transform = 'scale(' + zoomLevel + ')';
    });
    mapContainer.addEventListener('mousedown', e => {
        map.style.transition = '';
        mapContainer.style.transition = '';
        var moving = true;

        var initX = e.clientX;
        var initY = e.clientY;

        mapContainer.addEventListener('mousemove', e => {
            if(!moving) return;

            const deltaX = e.clientX - initX;
            const deltaY = e.clientY - initY;
            initX = e.clientX;
            initY = e.clientY;

            let left = isNaN(parseInt(map.style.left)) ? 0 : parseInt(map.style.left);
            let top = isNaN(parseInt(map.style.top)) ? 0 : parseInt(map.style.top);
            let offsetLeft = left + deltaX;
            let offsetTop = top + deltaY;
            map.style.left = offsetLeft + 'px';
            map.style.top = offsetTop + 'px';
            /*let divider = map.style.transform === 'scale(0.5)' ? 4 : 6;
            mapContainer.style.backgroundPositionX = (offsetLeft/divider) + 'px';
            mapContainer.style.backgroundPositionY = (offsetTop/divider) + 'px';*/
        });

        mapContainer.addEventListener('mouseup', e => {
            moving = false;
        });
        mapContainer.addEventListener('mouseleave', e => {
            moving = false;
        });
    });
    document.querySelector('.exploration-repositionMap').addEventListener('click', e => {
        const current = game.currentDungeon.currentFloor.currentRoom;
        const currentDom = document.querySelector('#ch-' + current.id);
        console.log(currentDom);

        var targetLeft = (mapContainer.offsetWidth / 2) - (currentDom.offsetWidth / 2);
        var targetTop = (mapContainer.offsetHeight / 2) - (currentDom.offsetHeight / 2);
        targetLeft -= parseFloat(currentDom.style.left);
        targetTop -= parseFloat(currentDom.style.top);

        map.style.transition = 'transform .2s cubic-bezier(.49,-0.02,0,1.05) 0s, left .2s cubic-bezier(.49,-0.02,0,1.05) 0s, top .2s cubic-bezier(.49,-0.02,0,1.05) 0s';
        mapContainer.style.transition = 'background-position-x .5s cubic-bezier(1,0,0,1), background-position-y .5s cubic-bezier(1,0,0,1)';
        map.style.transform = 'scale(1)';
        map.style.left = targetLeft + 'px';
        map.style.top = targetTop + 'px';
        /*mapContainer.style.backgroundPositionX = '0px';
        mapContainer.style.backgroundPositionY = '0px';*/
    })
}

function recenterDungeonMap() {
    document.querySelector('.exploration-repositionMap').dispatchEvent(new Event('click'));
}
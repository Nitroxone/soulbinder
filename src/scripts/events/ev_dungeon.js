function generateExplorationInfosPanelEvents() {
    const currentRoom = game.dungeon.floor.room;
    const delay = currentRoom.isCleared() ? 0 : 1;
    displayTextLetterByLetter(currentRoom.getRoomDescription(), '.infosPanel-roomDesc', delay);

    const enter = document.querySelector('.roomActions-action.enter');
    const scout = document.querySelector('.roomActions-action.scout');
    const search = document.querySelector('.roomActions-action.search');
    const invButton = document.querySelector('#dPanelInventory');

    if(enter) {
        enter.addEventListener('click', e => {
            dungeonEnterEvent();
            Sounds.Methods.playSound(Data.SoundType.DUNGEON_ROOM_ENTER);
        })
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

    addTooltip(invButton, function(){
        return "Open the knapsack";
    }, {offY: -8});
    invButton.addEventListener('click', e => {
        document.querySelectorAll('.knpsckContainer').forEach(kn => {
            kn.parentElement.parentElement.remove();
        })

        spawnTooltip(['knapsack']);
        generateDungeonKnapsackEvents();
    });

    generateDungeonFoundLootEvents();
}

function generateDungeonFoundLootEvents() {
    const elements = document.querySelectorAll('.roomLootResult-listItem');
    const loot = game.dungeon.floor.room.foundLoot;

    elements.forEach(el => {
        if(el.classList.contains('lootedLoot')) return;

        const id = el.id.slice(5);
        const item = loot.find(x => (id === 'gold' ? x.type : x.item.id.toString()) === id)

        el.addEventListener('click', e => {
            if(item.looted) return;

            // Holding CTRL and SHIFT adds all of the loot to the Knapsack (if it has not been looted already)
            if(e.ctrlKey && e.shiftKey) {
                let timer = 0;
                for(let i = 0; i < elements.length; i++) {
                    const elem = elements[i];
                    const lo = loot[i];

                    if(game.player.isKnapsackFull()) break;
                    if(elem.classList.contains('lootedLoot') || lo.looted) continue;

                    elem.style.animationDelay = timer + 's';
                    elem.classList.remove('revealingLoot');
                    elem.classList.add('lootedLoot');
                    elem.classList.add('lootedLootAnim');
                    timer += 0.1;
                    if(lo.type === 'gold') game.player.addToPurse(lo.amount);
                    else game.player.addToKnapsack(lo.item, true, lo.amount);
                    lo.looted = true;
                }

                /*elements.forEach(elem => {
                    if(!elem.classList.contains('lootedLoot')) {
                        elem.style.animationDelay = timer + 's';
                        elem.classList.remove('revealingLoot');
                        elem.classList.add('lootedLoot');
                        elem.classList.add('lootedLootAnim');
                        timer += 0.1;
                    }
                });
                loot.filter(x => !x.looted).forEach(lo => {
                    if(lo.type === 'gold') game.player.addToPurse(lo.amount);
                    else game.player.addToKnapsack(lo.item, true, lo.amount);
                    lo.looted = true;
                });*/
            }
            else {
                if(game.player.isKnapsackFull()) return;

                if(item.type === 'gold') game.player.addToPurse(item.amount);
                else game.player.addToKnapsack(item.item, true, item.amount);
                el.style.animationDelay = "0s";
                el.classList.remove('revealingLoot');
                el.classList.add('lootedLoot');
                el.classList.add('lootedLootAnim');
                item.looted = true;
            }
        });
    })
}

function dungeonEnterEvent() {
    const enter = document.querySelector('.roomActions-action.enter');
    const currentRoom = game.dungeon.floor.room;
    if(currentRoom.identified) {
        dungeonEnterRoom();
    } else {
        currentRoom.identify();
        document.querySelector('.roomHeader-type').textContent = currentRoom.type;
        
        document.querySelector('.roomActions-action.scout').remove();

        if(currentRoom.canSearch()) {
            document.querySelector('.roomActions-action.enter').outerHTML = getDungeonSearchButton(true);
            document.querySelector('.roomActions-action.search').classList.add('revealSearchButton');
            document.querySelector('.roomActions-action.search').classList.remove('minEnter');
            dungeonSearchEvent();
        } else {
            document.querySelector('.roomActions-action.enter').classList.remove('minEnter');

            dungeonEnterRoom();
        }
    }
}

function dungeonEnterRoom() {
    const room = game.dungeon.floor.room;
    
    if(game.player.inCombat || room.isCleared()) return;

    room.enterRoom();
    if(room.isCombatRoom()) {
        room.engage();
        dungeonRefreshRoomStatus();
    }
}

function dungeonRefreshRoomStatus() {
    document.querySelector('.roomHeader-status').innerHTML = game.dungeon.floor.room.status;
}

function dungeonScoutEvent() {
    const scout = document.querySelector('.roomActions-action.scout');
    const currentRoom = game.dungeon.floor.room;
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
    const currentRoom = game.dungeon.floor.room;
    if(!currentRoom.isCleared()) {
        currentRoom.generateRoomLoot();
        drawDungeonFoundLoot(true);
        generateDungeonFoundLootEvents();

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
    game.dungeon.floor.getAssignedRooms().forEach(room => {
        const nextRoom = room.nextRoom || null;
        const previousRoom = room.previousRoom || null;

        const roomDom = document.querySelector('#ch-' + room.id);
        const nextRoomDom = nextRoom ? document.querySelector('#ch-' + nextRoom.id) : null;
        const previousRoomDom = previousRoom ? document.querySelector('#ch-' + previousRoom.id) : null;

        // When clicking on a room tile
        roomDom.addEventListener('click', e => {
            // Only works if clicking on an accessible tile (next or previous room to the current one)
            if(nextRoom === game.dungeon.floor.room || previousRoom === game.dungeon.floor.room) {
                if(game.player.inCombat) {
                    // Prevents changing rooms while in combat; 
                    //TODO: add notification
                    return;
                }

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
                if(nextRoom === game.dungeon.floor.room) {
                    nextRoomDom.classList.remove('currentRoom');
                    game.dungeon.floor.moveToPreviousRoom();
                }
                // Moving forward
                else if(previousRoom === game.dungeon.floor.room) {
                    previousRoomDom.classList.remove('currentRoom');
                    game.dungeon.floor.moveToNextRoom();
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
        const current = game.dungeon.floor.room;
        const currentDom = document.querySelector('#ch-' + current.id);
        console.log(currentDom);

        var targetLeft = (mapContainer.offsetWidth / 2) - (currentDom.offsetWidth / 2);
        var targetTop = (mapContainer.offsetHeight / 2) - (currentDom.offsetHeight / 2);
        targetLeft -= parseFloat(currentDom.style.left);
        targetTop -= parseFloat(currentDom.style.top);

        map.style.transition = 'transform .5s cubic-bezier(0.075, 0.82, 0.165, 1) 0s, left .5s cubic-bezier(0.075, 0.82, 0.165, 1) 0s, top .5s cubic-bezier(0.075, 0.82, 0.165, 1) 0s';
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
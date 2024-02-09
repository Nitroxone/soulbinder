function generateExplorationInfosPanelEvents() {
    const currentRoom = game.dungeon.floor.room;
    const delay = currentRoom.isCleared() ? 0 : 1;
    displayTextLetterByLetter(currentRoom.getRoomDescription(), '.infosPanel-roomDesc', delay);

    const enter = document.querySelector('.roomActions-action.enter');
    const scout = document.querySelector('.roomActions-action.scout');
    const search = document.querySelector('.roomActions-action.search');

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

    generateDungeonStatsEvents();
    generateDungeonFoundLootEvents();
}

function generateDungeonStatsEvents() {
    const invButton = document.querySelector('#dPanelInventory');
    const ELrect = document.querySelector('#dPanelEL');
    
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

    addTooltip(ELrect, function(){
        let str = "";

        str += '<div style="width: 300px;">';
        str += 'The impossible space-time of the Vestiges breathes ectoplasm into the horrors that inhabit them; a substance that you accumulate in your Flask after each battle, in the form of <span class="ELstyling">Ephemeral Luck</span>.';
        str += '<div class="divider"></div>';
        str += 'This currency can be used to unlock treasure chambers, to enchant altars at which you will rest, and for other uses you will discover.';
        str += '<div class="divider"></div>';
        str += 'Bear in mind that this temporary currency only lives within the Vestiges, and ceases to exist outside them.';
        str += '</div>';

        return str;
    }, {offY: -8});
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
        document.querySelectorAll('.revealingLootCanvas.roomLootCanvas').forEach(cv => {
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
    const rooms = game.dungeon.floor.getAssignedRooms();
    rooms.forEach(room => {
        
        const roomDom = document.querySelector('#ch-' + room.id);

        // When clicking on a room tile
        roomDom.addEventListener('click', e => {

            const curr = game.dungeon.floor.room;
            const candidate = curr.nextRooms.find(x => x == room) || curr.previousRooms.find(x => x == room);

            const currDom = document.querySelector('#ch-' + curr.id);

            if(candidate) {
                if(game.player.inCombat) {
                    // Prevents changing rooms while in combat
                    // TODO: add notification
                    return;
                }

                game.dungeon.floor.moveTo(candidate);
                currDom.classList.remove('currentRoom');
                roomDom.classList.add('currentRoom');

                drawExplorationInfosPanel(true);
                generateExplorationInfosPanelEvents();
            }
        });
    })
}

function getRelativePos(a, b) {
    const rect = a.getBoundingClientRect();
    const parentRect = b.getBoundingClientRect();

    const relativeTop = rect.top - parentRect.top;
    const relativeLeft = rect.left - parentRect.left;

    console.log(`Relative top position: ${relativeTop}px`);
    console.log(`Relative left position: ${relativeLeft}px`);
    return { relativeTop, relativeLeft };
}

function generateExplorationMapEvents() {
    let zoomLevel = 1;
    const map = document.querySelector('.exploration-map');
    const mapContainer = document.querySelector('.exploration-mapContainer');
    let translateX = 0;
    let translateY = 0;

    mapContainer.addEventListener('wheel', e => {
        map.style.transition = '';
        mapContainer.style.transition = '';
        e.preventDefault();

        const direction = Math.sign(e.deltaY); // 1 out, -1 in

        zoomLevel += -direction * 0.05;
        zoomLevel = Math.max(0.65, zoomLevel);
        zoomLevel = Math.min(1, zoomLevel);

        map.style.transform = `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;
    });

    mapContainer.addEventListener('mousedown', e => {
        map.style.transition = '';
        mapContainer.style.transition = '';
        let moving = true;

        let initX = e.clientX;
        let initY = e.clientY;

        const onMove = (e) => {
            if (!moving) return;

            const deltaX = e.clientX - initX;
            const deltaY = e.clientY - initY;
            initX = e.clientX;
            initY = e.clientY;

            translateX += deltaX;
            translateY += deltaY;

            map.style.transform = `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;
        };

        const stopMoving = () => {
            moving = false;
        };

        mapContainer.addEventListener('mousemove', onMove);
        mapContainer.addEventListener('mouseup', stopMoving);
        mapContainer.addEventListener('mouseleave', stopMoving);
    });

    document.querySelector('.exploration-repositionMap').addEventListener('click', e => {
        const current = game.dungeon.floor.room;
        const currentDom = document.querySelector('#ch-' + current.id);
        console.log(currentDom);

        let targetLeft = (mapContainer.offsetWidth / 2) - (currentDom.offsetWidth / 2);
        let targetTop = (mapContainer.offsetHeight / 2) - (currentDom.offsetHeight / 2);
        targetLeft -= parseFloat(currentDom.style.left);
        targetTop -= parseFloat(currentDom.style.top);

        // Update to prevent incoherences
        translateX = targetLeft;
        translateY = targetTop;

        map.style.transition = 'transform .5s cubic-bezier(0.075, 0.82, 0.165, 1)';
        mapContainer.style.transition = 'background-position-x .5s cubic-bezier(1,0,0,1), background-position-y .5s cubic-bezier(1,0,0,1)';
        map.style.transform = `scale(1) translate(${targetLeft}px, ${targetTop}px)`;
    });
}



function recenterDungeonMap() {
    document.querySelector('.exploration-repositionMap').dispatchEvent(new Event('click'));
}
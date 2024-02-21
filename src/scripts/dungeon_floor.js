/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

/**
 * The DungeonFloor holds all of the logic and data of a Dungeon's floor.
 */
class DungeonFloor {
    constructor(props) {
        this.depth = getValueFromObject(props, "depth", 0);
        this.gridSize = getValueFromObject(props, "gridSize", [10, 7]); // [width, height]
        this.config = getValueFromObject(props, "roomTypes", buildDungeonFloorConfigFromGlobal(this.gridSize[0]));
        
        this.ROWS = this.gridSize[0];
        this.COLS = this.gridSize[1];
        
        this.rooms = [];
        this.connectors = [];
        
        this.generateGrid();
        this.startingRooms = this.config.startingRooms;
        console.log('starting rooms: ' + this.startingRooms);
        let count = 0;
        do {
            this.generatePaths();
            var success = this.generateRooms();
            if(!success) {
                console.error('Generation failed ! Retrying...');
                this.resetRooms();
                count++;
                if(count == 10) throw new Error('Too many failed attemps.');
            }
        } while(!success);

        //this.room = this.getEntranceRoom();
        this.room = choose(this.rooms.filter(x => x.coordinates[0] === 0 && x.nextRooms.length > 0));
        this.revealCurrentRoom();
        this.identifyCurrentRoom();

        //this.visitCurrentRoom();
        //this.clearCurrentRoom();
    }

    /**
     * Fills the rooms array with UNASSIGNED rooms, according to the ROWS and COLS of the floor.
     */
    generateGrid() {
        for(let i = 0; i < this.ROWS; i++) {
            for(let j = 0; j < this.COLS; j++) {
                this.rooms.push(new DungeonRoom({coordinates: [i, j]}));
            }
        }
    }

    /**
     * Resets all the rooms on this floor.
     */
    resetRooms() {
        this.getAssignedRooms().forEach(ro => {
            ro.type = Data.DungeonRoomType.UNASSIGNED;
            ro.previousRooms = [];
            ro.nextRooms = [];
        });
    }

    /**
     * Populates the generated rooms.
     */
    generateRooms() {
        // Room repartition algorithm:
        // 1. Run checks to make sure config is valid (min < max, total requirements are not below room amount...)
        // 2. Start by filling required rooms
        // 3. Randomly fill the rest
        // 4. Shuffle & assign

        const rooms = this.getAssignedRooms();
        let selection, pool;
        if(!this.validateConfig()) return false;
        for(const row in this.config.rows) {
            let types = [];
            let target = row === 'LAST' ? this.ROWS-1 : Number(row) - 1;

            selection = rooms.filter(x => x.coordinates[0] === target);

            pool = this.config.rows[row];
            console.log(pool);  

            for(const roomType in pool) {
                if(!pool[roomType].min) continue;

                for(let i = 0; i < pool[roomType].min; i++) {
                    types.push(roomType);
                }
            }
            console.log(selection.length - types.length);
            console.log('types :', types, 'selection :', selection, ' on row ' + target);
            // selection.forEach(room => {
            //     choice = Data.DungeonRoomType[this.getRoomType(pool)];
            //     room.type = choice;
            //     console.log(`Room ${room.coordinates} was given type ${choice}`);
            // });
            let otherTypes = [];
            for(let i = 0; i < selection.length - types.length; i++) {
                let result, safeCounter = 0;
                do {
                    if(safeCounter >= 10) {
                        console.log(this.getAssignedRooms());
                        throw new Error('EREUR CAR Y A LE CACA')
                    }

                    result = this.getRoomType(pool);
                    //result = Data.DungeonRoomType[result];
                    console.log(result);
                    console.log(pool[result]);
                    
                    safeCounter += 1;
                } while(pool[result].max && pool[result].max <= otherTypes.filter(x => x === result).length);
                console.log("max: " + (pool[result].max || 0));
                console.log("currmax: " + types.filter(x => x === result).length);

                otherTypes.push(result);
            }
            types = types.concat(otherTypes);
            types = types.map(x => x = Data.DungeonRoomType[x]);

            console.log(types);
            if(selection.length !== types.length) throw new Error('Misaligned types. Assigned ' + types.length + ', required ' + selection.length);

            types = shuffle(types);
            for(let i = 0; i < selection.length; i++) {
                selection[i].type = types[i];
                console.log(`Room ${selection[i].coordinates} was given type ${types[i]}`);
            }

        }
        return true;
    }

    /**
     * Validates the current floor configuration through various checks.
     * @returns {boolean}
     */
    validateConfig() {
        const cfg = this.config.rows; // Get this floor's rows config
        const rooms = this.getAssignedRooms(); // Get the "alive" rooms

        for(let i = 0; i < this.ROWS; i++) { // iterate over rows
            const rowCfg = cfg[String(i+1)]; // Get row config that matches the current row we're processing

            if(!rowCfg) continue; // skip if no matching config

            // This horrendously long and unreadable line below gets the total amount of minimum requirements on the current row
            const totalMin = Object.values(rowCfg).map(x => typeof x === 'object' && x !== null && typeof x.min === 'number' ? x.min : 0).reduce((sum, add) => sum + add, 0);
            const roomsAmount = rooms.filter(x => x.coordinates[0] === i).length;

            // Essentially just compare the amount of min with the amount of rooms
            console.log(`Row ${i} : total min ${totalMin}, ${roomsAmount} rooms`, rowCfg);
            // Also check if the total min amount is greater than the starting rooms amount to just go faster
            if(totalMin > this.startingRooms) throw new Error('Too many requirements for too little starting rooms.');
            if(totalMin > roomsAmount) return false;
        }
        return true;
    }

    /**
     * Retrieves a room type from the given row config
     * @param {object} row a DungeonFloorConfig row object
     * @returns {Data.DungeonRoomType} a room type
     */
    getRoomType(row) {
        console.log(row);
        if(!row) throw new Error('The room assignment script encountered an error.');

        const chances = Object.values(row).map(obj => obj.cha).reduce((sum, percentage) => sum + percentage, 0);
        const randVal = Math.random() * 100;

        let cumulative = 0;
        for(const roomType in row) {
            cumulative += (row[roomType].cha / chances) * 100;
            if(randVal <= cumulative) return roomType;
        }
    }

    /**
     * Generates paths and rooms for this floor.
     */
    generatePaths() {
        // Pick starting rooms
        const startingRooms = [];
        for(let i = 0; i < this.startingRooms; i++) {
            let room;
            let pool = this.rooms.filter(x => x.coordinates[0] === 0)
            do {
                room = choose(pool);
            } while(startingRooms.includes(room));
            startingRooms.push(room);
        }
        console.log("Starting rooms coordinates: ");
        startingRooms.forEach(ro => {
            console.log(ro.coordinates);
        })

        // Create a path from each starting room
        let forceTarget = null;
        startingRooms.forEach(room => {
            // Recursivity time!
            this.createPathFromStartingRoom(room);
        });
    }

    /**
     * Creates a path of rooms, using the provided room as a starting point.
     * @param {DungeonRoom} start the path's starting point
     */
    createPathFromStartingRoom(start) {
        this.createPathRecursive(start, 1, null);
    }

    /**
     * Recursively creates a path by reassigning room coordinates.
     * @param {*} current the current room
     * @param {*} row the row of the room
     */
    createPathRecursive(current, row, forceTarget) {
        current.type = Data.DungeonRoomType.EMPTY;

        if(row >= this.ROWS) return;

        // Find random position in the next row
        const pool = this.rooms.filter(x => x.coordinates[0] === row);
        if(pool.length === 0) return; // No more rooms available in the row

        let next = null;
        if(this.config.rows[row+1] && Object.keys(this.config.rows[row+1]).length === 1 && Object.values(this.config.rows[row+1])[0].max === 1) {
            console.log("Convergence detected on ROW " + row);

            if(!forceTarget) {
                const potential = pool.find(x => x.type === Data.DungeonRoomType.EMPTY);

                if(potential) {
                    forceTarget = potential;
                    console.log("POTENTIAL FOUND ", potential);
                }
                else {
                    forceTarget = choose(pool.filter(x => x.coordinates[1] == Math.round(this.COLS/2)));
                    console.log("ATTRIBUTED FORCETARGET! ", forceTarget);
                }
            }
            next = forceTarget;
        } else {
            next = choose(getClosestElements(pool, current.coordinates[1]))
        }
        console.log("Next:", next);
        // Connect the rooms!
        current.nextRooms.push(next)
        next.previousRooms.push(current);

        // Continue to next room
        this.createPathRecursive(next, row + 1, forceTarget);
    }

    /**
     * Prints various informations about the path that starts from the provided room.
     * @param {DungeonRoom} start the path start
     */
    getPathInfo(start) {
        const getNextCoords = (current, results) => {
            if(!current.nextRoom) return results;

            results.push(current.coordinates);
            console.log(results);

            return getNextCoords(current.nextRoom, results);
        }
        const res = getNextCoords(start, []);
        
        if(res) {
            console.log('The path starting from ' + start.coordinates + ' has ' + res.length + ' rooms.');
            let str = '';
            res.forEach(re => { str += re + '\n' });
            console.log(str);
        } else console.error('Something went wrong!')
    }

    print() {
        let total = '';

        // Print column indices
        let colIndices = '  ';
        for (let j = 0; j < this.COLS; j++) {
            colIndices += j.toString().padStart(2, ' ');
        }
        total += colIndices + '\n';
    
        for (let i = 0; i < this.ROWS; i++) {
            let row = i.toString().padStart(2, ' ') + ' ';
            for (let j = 0; j < this.COLS; j++) {
                const room = hasRoomWithCoordinates(this.rooms, [i, j]);
                switch (room.type) {
                    case Data.DungeonRoomType.ANTECHAMBER_OF_MARVELS:
                        row += 'A ';
                        break;
                    case Data.DungeonRoomType.BOSS:
                        row += 'B ';
                        break;
                    case Data.DungeonRoomType.CHASM:
                        row += '? ';
                        break;
                    case Data.DungeonRoomType.DORMANT_ROOM:
                        row += 'D ';
                        break;
                    case Data.DungeonRoomType.UNASSIGNED:
                        row += '. ';
                        break;
                    case Data.DungeonRoomType.ENTRANCE:
                        row += '! ';
                        break;
                    case Data.DungeonRoomType.ETERNITY_WELL:
                        row += 'E ';
                        break;
                    case Data.DungeonRoomType.FRACTURED_HOLLOW:
                        row += 'F ';
                        break;
                    case Data.DungeonRoomType.SACRIFICIAL_ALCOVE:
                        row += 'S ';
                        break;
                }
            }
            total += row + '\n';

            // Connections ?  .  .  .  .  .  .
            // Retrieve the current row's rooms; 
            // for each of them, determine the symbol to add based on the position of the next room
            let connectors = '';
            connectors += i.toString().padStart(2, ' ') + ' ';

            let prev = this.rooms.filter(x => x.coordinates[0] === i+1);
            prev.forEach(room => {
                if(!room.previousRoom) {
                    connectors += '  ';
                }
                else {
                    if(room.previousRoom.coordinates[1] < room.coordinates[1]) {
                        if(connectors.endsWith(' ')) {
                            connectors = connectors.slice(0, -1);
                            connectors += '\\  ';
                        }
                        else connectors += '\\ ';
                    }
                    else if(room.previousRoom.coordinates[1] == room.coordinates[1]) connectors += '| ';
                    else if(room.previousRoom.coordinates[1] > room.coordinates[1]) connectors += ' /';
                }
            })
            total += connectors;
            total += '\n'
        }
        console.log(total);
    }
    

    /**
     * Returns the Entrance room of this floor.
     * @returns {DungeonRoom} this floor's entrance room
     */
    getEntranceRoom() {

    }

    /**
     * Marks the current room as visited.
     */
    visitCurrentRoom() {
        this.room.visited = true;
    }

    /**
     * Marks the current room as revealed.
     */
    revealCurrentRoom() {
        this.room.revealed = true;
    }

    /**
     * Marks the current room as identified.
     */
    identifyCurrentRoom() {
        this.room.identify();
    }

    /**
     * Marks the current room as cleared.
     */
    clearCurrentRoom() {
        this.room.status = Data.DungeonRoomStatus.CLEARED;
    }

    /**
     * Randomly returns a number based on the player's ability to identify rooms.
     * @returns {number}
     */
    canIdentifyRoom() {
        return Math.random() * 100 < game.player.du_identifyRoomChance;
    }

    /**
     * Attempts to identify a room.
     */
    attemptToIdentifyRoom() {
        console.log('attempting to reveal room...');
        if(this.canIdentifyRoom() && this.room.visited) this.identifyCurrentRoom();
        else {
            console.log('failed!');
        }
    }

    /**
     * Changes this DungeonFloor's current room to the provided one.
     * @param {DungeonRoom} room the DungeonRoom to move to
     * @returns {boolean|void} false if the provided DungeonRoom is null
     */
    moveTo(room) {
        if(room) {
            this.room = room;
            if(!room.visited) {
                this.visitCurrentRoom();
                this.attemptToIdentifyRoom();
            }
        } else return false;
    }

    /**
     * Returns this DungeonFloor's rooms that are not UNASSIGNED.
     * @returns {DungeonRoom[]} the rooms on this floor that are not UNASSIGNED
     */
    getAssignedRooms() {
        return this.rooms.filter(x => x.type !== Data.DungeonRoomType.UNASSIGNED)
    }
}
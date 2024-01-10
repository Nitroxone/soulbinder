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
        this.roomTypes = getValueFromObject(props, "roomTypes", {
            "boss room": 1,
            "eternity well": getRandomNumber(1, 3),
            "fractured hollow": 1,
            "sacrificial alcove": getRandomNumber(2, 5),
            "dormant room": getRandomNumber(3, 8),
            "antechamber of marvels": 1,
            "entrance": 1,
            "chasm": 1,
        });
        this.startingRooms = getValueFromObject(props, "startingRooms", 3);

        this.ROWS = this.gridSize[0];
        this.COLS = this.gridSize[1];

        this.rooms = [];
        this.connectors = [];

        this.generateGrid();
        this.generateRooms();

        //this.room = this.getEntranceRoom();
        this.room = choose(this.rooms.filter(x => x.coordinates[0] === 0 && x.nextRoom));
        this.revealCurrentRoom();
        this.identifyCurrentRoom();

        //this.visitCurrentRoom();
        //this.clearCurrentRoom();
    }

    /**
     * Fills the rooms array with empty rooms, according to the ROWS and COLS of the floor.
     */
    generateGrid() {
        for(let i = 0; i < this.ROWS; i++) {
            for(let j = 0; j < this.COLS; j++) {
                this.rooms.push(new DungeonRoom({coordinates: [i, j]}));
            }
        }
    }

    /**
     * Generates paths and rooms for this floor.
     */
    generateRooms() {
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

        // Keep track of visited rooms
        const visitedRooms = new Set();

        // Create a path from each starting room
        startingRooms.forEach(room => {
            // Recursivity time!
            this.createPathFromStartingRoom(room, visitedRooms);
            visitedRooms.clear();
        });
    }

    /**
     * Creates a path of rooms, using the provided room as a starting point.
     * @param {DungeonRoom} start the path's starting point
     */
    createPathFromStartingRoom(start, visitedRooms) {
        this.createPathRecursive(start, 1, visitedRooms);
    }

    /**
     * Recursively creates a path by reassigning room coordinates.
     * @param {*} current the current room
     * @param {*} row the row of the room
     */
    createPathRecursive(current, row, visitedRooms) {
        current.type = Data.DungeonRoomType.CHASM;
        //visitedRooms.add(current);

        if(row >= this.ROWS) return;

        // Find random position in the next row
        const pool = this.rooms.filter(x => x.coordinates[0] === row && !visitedRooms.has(x));
        if(pool.length === 0) return; // No more rooms available in the row

        const next = choose(getClosestElements(pool, current.coordinates[1]));
        // Connect the rooms!
        current.nextRoom = next;
        next.previousRoom = current;

        // Continue to next room
        this.createPathRecursive(next, row + 1, visitedRooms);
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
                    case Data.DungeonRoomType.EMPTY:
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
        this.room.identified = true;
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
        if(this.canIdentifyRoom()) this.identifyCurrentRoom();
    }

    /**
     * Moves the player to the next room on this floor.
     * @returns {boolean} false if there is no next room (end reached)
     */
    moveToNextRoom() {
        if(this.room.nextRoom) {
            this.room = this.room.nextRoom;
            this.attemptToIdentifyRoom();
        }
        else return false;
    }

    /**
     * Moves the player to the previous room on this floor.
     * @returns {boolean} false if there is no previous room (beginning reached)
     */
    moveToPreviousRoom() {
        if(this.room.previousRoom) {
            this.room = this.room.previousRoom;
            this.attemptToIdentifyRoom();
        }
        else return false;
    }

    getAssignedRooms() {
        return this.rooms.filter(x => x.type !== Data.DungeonRoomType.EMPTY)
    }
}
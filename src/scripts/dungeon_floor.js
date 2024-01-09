/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

/**
 * The DungeonFloor holds all of the logic and data of a Dungeon's floor.
 * 
 * TECHNICAL STUFF:
 * There are different factors that alter the generation of rooms.
 * First, clusters are generated : they are dots placed on the grid, around which dungeon rooms will be generated.
 * The clusters' positioning is determined like that :
 * - A straight vertical, horizontally centered line is drawn on the grid, from top to bottom. 
 * - The line is by default straight, but it can be altered with two variables.
 * - The pathCurve variable tells how curvy the line should be. It's a value between 0 and 1 (0 = straight, 1 = very curvy)
 * - The chaoticCurve variable, which matters only if pathCurve > 0, determines the amplitude of the curve. The higher, the curviest (default = 2).
 */
class DungeonFloor {
    constructor(props) {
        this.depth = getValueFromObject(props, "depth", 0);
        this.gridSize = getValueFromObject(props, "gridSize", [7, 15]); // [width, height]
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

        //this.currentRoom = this.getEntranceRoom();
        //this.revealCurrentRoom();
        //this.identifyCurrentRoom();

        //this.visitCurrentRoom();
        //this.clearCurrentRoom();
    }

    /**
     * Generates connections between each room. 
     * Each room connects to the next one in the same cluster. 
     * The last room of a cluster connects to the first room of the next cluster.
     * The last room of the last cluster has no connection with a next room.
     */
    generateConnections() {

    }

    /**
     * Generates the amount of rooms per cluster. This amount will be randomized if the DungeonFloor parameter "unequalRepartition" is set to true.
     * @returns {number[]} the amount of rooms per cluster
     */
    generateRoomCounts() {

    }

    generateGrid() {
        for(let i = 0; i < this.ROWS; i++) {
            for(let j = 0; j < this.COLS; j++) {
                this.rooms.push(new DungeonRoom({coordinates: [i, j]}));
            }
        }
    }

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

        // Create a path from each starting room
        startingRooms.forEach(room => {
            // Recursivity time!
            this.createPathFromStartingRoom(room);
        });
    }

    createPathFromStartingRoom(start) {
        this.createPathRecursive(start, 1);
    }

    createPathRecursive(current, row) {
        current.type = Data.DungeonRoomType.CHASM;
        if(row >= this.ROWS) return;

        // Find random position in the next row
        const pool = this.rooms.filter(x => x.coordinates[0] === row);
        const next = choose(getClosestElements(pool, current.coordinates[1]));
        // Connect the rooms!
        current.nextRoom = next;
        next.previousRoom = current;

        // Continue to next room
        this.createPathRecursive(next, row + 1);
    }

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
        for(let i = 0; i != this.ROWS; i++) {
            let row = [i];
            for(let j = 0; j != this.COLS; j++) {
            
                switch(hasRoomWithCoordinates(this.rooms, [i, j]).type) {
                    case Data.DungeonRoomType.ANTECHAMBER_OF_MARVELS:
                        row.push('A');
                        break;
                    case Data.DungeonRoomType.BOSS:
                        row.push('B');
                        break;
                    case Data.DungeonRoomType.CHASM:
                        row.push('?');
                        break;
                    case Data.DungeonRoomType.DORMANT_ROOM:
                        row.push('D');
                        break;
                    case Data.DungeonRoomType.EMPTY:
                        row.push('.');
                        break;
                    case Data.DungeonRoomType.ENTRANCE:
                        row.push('!');
                        break;
                    case Data.DungeonRoomType.ETERNITY_WELL:
                        row.push('E');
                        break;
                    case Data.DungeonRoomType.FRACTURED_HOLLOW:
                        row.push('F');
                        break;
                    case Data.DungeonRoomType.SACRIFICIAL_ALCOVE:
                        row.push('S');
                        break;
                }
                
                //if(j === this.COLS - 1) break;
            }
            console.log(row.join(' '));
            //if(i === this.ROWS - 1) break;
        }
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
        this.currentRoom.visited = true;
    }

    /**
     * Marks the current room as revealed.
     */
    revealCurrentRoom() {
        this.currentRoom.revealed = true;
    }

    /**
     * Marks the current room as identified.
     */
    identifyCurrentRoom() {
        this.currentRoom.identified = true;
    }

    /**
     * Marks the current room as cleared.
     */
    clearCurrentRoom() {
        this.currentRoom.status = Data.DungeonRoomStatus.CLEARED;
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
        if(this.currentRoom.nextRoom) {
            this.currentRoom = this.currentRoom.nextRoom;
            this.attemptToIdentifyRoom();
        }
        else return false;
    }

    /**
     * Moves the player to the previous room on this floor.
     * @returns {boolean} false if there is no previous room (beginning reached)
     */
    moveToPreviousRoom() {
        if(this.currentRoom.previousRoom) {
            this.currentRoom = this.currentRoom.previousRoom;
            this.attemptToIdentifyRoom();
        }
        else return false;
    }
}
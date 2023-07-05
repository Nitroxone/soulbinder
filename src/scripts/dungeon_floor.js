/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

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
        this.gridSize = getValueFromObject(props, "gridSize", [31, 31]); // [height, width]
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
        this.shape = getValueFromObject(props, "shape", Data.DungeonClusterPattern.GRID)
        this.pathCurve = getValueFromObject(props, "pathCurve", 0.3);
        this.chaoticCurve = getValueFromObject(props, "chaoticCurve", 2);
        this.clustersAmount = getValueFromObject(props, "clustersAmount", 6);
        this.roomsPerCluster = getValueFromObject(props, "roomsPerCluster", 5);
        this.unequalRepartition = getValueFromObject(props, "unequalRepartition", true);
        this.spacing = getValueFromObject(props, "spacing", getRandomNumber(4, 6));

        this.roomsAmount = this.clustersAmount * this.roomsPerCluster;

        this.rooms = [];
        this.connectors = [];
        this.clusters = [];

        if(this.shape === Data.DungeonClusterPattern.GRID) {
            if(this.gridSize[0] > this.gridSize[1]) this.gridSize = [this.gridSize[1], this.gridSize[0]];
            if(this.clustersAmount > 6) {
                this.gridSize[0] += 5;
                this.gridSize[1] += 5;
            }
        }

        this.generateFloorLayout();
        this.generateRooms();
        this.generateConnections();

        this.currentRoom = this.getEntranceRoom();
        this.revealCurrentRoom();
        this.identifyCurrentRoom();
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
        for(let i = 0; i < this.clusters.length; i++) {
            let cl = this.clusters[i];
            for(let j = 0; j < cl.childrenRooms.length; j++) {
                let ro = cl.childrenRooms[j];
                // If the last room on the current cluster is reached
                if(j+1 === cl.childrenRooms.length) {
                    // If there are remaining clusters, nextRoom will be the first room of the next cluster
                    if(i+1 !== this.clusters.length) ro.nextRoom = this.clusters[i + 1].childrenRooms[0];
                    // Otherwise, nothing happens (nextRoom remains empty)
                }
                // Else, nextRoom is the nextRoom in this cluster
                else ro.nextRoom = cl.childrenRooms[j+1];

                // If the first room of the cluster is being processed
                if(j === 0) {
                    // If it's not the first cluster, previousRoom is the last room of the previous cluster
                    if(i != 0) {
                        let previousCluster = this.clusters[i - 1];
                        ro.previousRoom = previousCluster.childrenRooms[previousCluster.childrenRooms.length - 1];
                    }
                    // If it's the first cluster, nothing happens (previousRoom remains empty)
                } 
                else ro.previousRoom = cl.childrenRooms[j - 1];
            }
        }
    }

    /**
     * Generates the amount of rooms per cluster. This amount will be randomized if the DungeonFloor parameter "unequalRepartition" is set to true.
     * @returns {number[]} the amount of rooms per cluster
     */
    generateRoomCounts() {
        const roomCounts = [];
        let remainingRooms = this.roomsAmount;
        for(let i = 0; i < this.clustersAmount; i++) {
            // If unequalRepartition is allowed, add randomness. Otherwise just return the default roomsPerCluster value.
            if(this.unequalRepartition) {
                if(remainingRooms > 0) {
                    const randomCount = Math.floor(Math.random() * 3) - 1;
                    const count = Math.min(Math.max(this.roomsPerCluster + randomCount, 2), remainingRooms);
                    roomCounts.push(count);
                    remainingRooms -= count;
                } else {
                    roomCounts.push(0);
                }
            } else {
                roomCounts.push(this.roomsPerCluster);
            }
        }
        // Make sure that the roomCounts value is equal to the floor's roomsAmount parameter
        while(roomCounts.reduce((partSum, a) => partSum + a, 0) < this.roomsAmount) {
            roomCounts[getRandomNumber(0, roomCounts.length - 1)] += 1;
        }

        return roomCounts;
    }

    /**
     * Generates this DungeonFloor's layout by placing clusters on the grid, based on the amount of clusters, their curve and their irregularity.
     * Then, around each cluster, rooms are placed.
     */
    generateFloorLayout() {
        const centerColumn = Math.floor(this.gridSize[1] / 2);
        const centerRow = Math.floor(this.gridSize[0] / 2);

        const sideLength = Math.ceil(Math.sqrt(this.clustersAmount));
        const startRow = centerRow - Math.floor(sideLength / 2);
        const startColumn = centerColumn - Math.floor(sideLength / 2);

        const roomCounts = this.generateRoomCounts();
        for(let i = 0; i < this.clustersAmount; i++) {
            let row, column;
            if(this.shape === Data.DungeonClusterPattern.LINE) {
                row = Math.floor((this.gridSize[0] - 1) * i / (this.clustersAmount - 1));
                let offset = Math.floor(this.gridSize[1] * this.pathCurve * Math.sin(i * Math.PI * this.chaoticCurve / (this.clustersAmount - 1)));
                offset = Math.max(-centerColumn, Math.min(offset, this.gridSize[1] - 1 - centerColumn));
                column = centerColumn + offset;
            } else if(this.shape === Data.DungeonClusterPattern.CIRCLE) {
                let angle = i * (2 * Math.PI / this.clustersAmount);
                let radius = this.pathCurve * Math.min(centerRow, centerColumn);
                row = Math.round(centerRow + radius * Math.sin(angle));
                column = Math.round(centerColumn + radius * Math.cos(angle));
            } else if(this.shape === Data.DungeonClusterPattern.GRID) {
                row = startRow + Math.floor(i / sideLength) * this.spacing;
                column = startColumn + (i % sideLength) * this.spacing;
            }

            if(row >= 0 && row < this.gridSize[0] && column >= 0 && column < this.gridSize[1]) {
                const cl = new DungeonRoom({
                    coordinates: [row, column],
                    type: Data.DungeonRoomType.CLUSTER
                });
                this.clusters.push(cl);

                const count = roomCounts[i];
                let addedRooms = 0;
                let j = 1;
                while(addedRooms < count) { 
                    if (row - j >= 0 && !hasRoomWithCoordinates(this.rooms, [row - j, column]) && addedRooms < count) {
                        // Above
                        const room = new DungeonRoom({coordinates: [row - j, column], parentCluster: cl});
                        this.rooms.push(room);
                        cl.childrenRooms.push(room);
                        addedRooms++;
                    }
                    if (row + j < this.gridSize[0] && !hasRoomWithCoordinates(this.rooms, [row + j, column]) && addedRooms < count) {
                        // Below
                        const room = new DungeonRoom({coordinates: [row + j, column], parentCluster: cl});
                        this.rooms.push(room);
                        cl.childrenRooms.push(room);
                        addedRooms++;
                    }
                    if (column - j >= 0 && !hasRoomWithCoordinates(this.rooms, [row, column - j]) && addedRooms < count) {
                        // Left
                        const room = new DungeonRoom({coordinates: [row, column - j], parentCluster: cl});
                        this.rooms.push(room);
                        cl.childrenRooms.push(room);
                        addedRooms++;
                    }
                    if (column + j < this.gridSize[1] && !hasRoomWithCoordinates(this.rooms, [row, column + j]) && addedRooms < count) {
                        // Right
                        const room = new DungeonRoom({coordinates: [row, column + j], parentCluster: cl});
                        this.rooms.push(room);
                        cl.childrenRooms.push(room);
                        addedRooms++;
                    }
                    if (row - j >= 0 && column - j >= 0 && !hasRoomWithCoordinates(this.rooms, [row - j, column - j]) && addedRooms < count) {
                        // Top-left
                        const room = new DungeonRoom({coordinates: [row - j, column - j], parentCluster: cl});
                        this.rooms.push(room);
                        cl.childrenRooms.push(room);
                        addedRooms++;
                    }
                    if (row - j >= 0 && column + j < this.gridSize[1] && !hasRoomWithCoordinates(this.rooms, [row - j, column + j]) && addedRooms < count) {
                        // Top-right
                        const room = new DungeonRoom({coordinates: [row - j, column + j], parentCluster: cl});
                        this.rooms.push(room);
                        cl.childrenRooms.push(room);
                        addedRooms++;
                    }
                    if (row + j < this.gridSize[0] && column - j >= 0 && !hasRoomWithCoordinates(this.rooms, [row + j, column - j]) && addedRooms < count) {
                        // Bottom-left
                        const room = new DungeonRoom({coordinates: [row + j, column - j], parentCluster: cl});
                        this.rooms.push(room);
                        cl.childrenRooms.push(room);
                        addedRooms++;
                    }
                    if (row + j < this.gridSize[0] && column + j < this.gridSize[1] && !hasRoomWithCoordinates(this.rooms, [row + j, column + j]) && addedRooms < count) {
                        // Bottom-right
                        const room = new DungeonRoom({coordinates: [row + j, column + j], parentCluster: cl});
                        this.rooms.push(room);
                        cl.childrenRooms.push(room);
                        addedRooms++;
                    }
                    j++;
                }
                console.log('Added: ' + addedRooms + ', count: ' + count);
                console.log(this.roomsAmount);
                console.log(this.rooms.length);
            } else {
                console.log('DID NOT ENTER');
                this.roomsAmount -= roomCounts[i];
            }
        }
    }

    /**
     * Generates the room types for this floor and assigns them to each room.
     */
    generateRooms() {
        let types = []; // Contains all of the room types that must be added

        // Add all of this floor's room types (in this.roomTypes) to the list of types that will be added
        for(const rt in this.roomTypes) {
            const count = this.roomTypes[rt];
            for(let i = 0; i < count; i++) {
                types.push(rt);
            }
        }
        // Determine the remaining amount of rooms to fill (with empty rooms), and fill them
        let toAdd = this.roomsAmount - types.length;
        for(let i = 0; i < toAdd; i++) {
            types.push(Data.DungeonRoomType.EMPTY);
        }
        // Randomize that a little
        types = shuffle(types);

        console.log('There are ' + this.rooms.length + ' for ' + this.roomsAmount + ' expected');
        
        // For each room
        for(let i = 0; i < this.roomsAmount; i++) {
            this.rooms[i].type = types[i];
        }
    }

    printClusters() {
        for(let i = 0; i < this.gridSize[0]; i++) {
            let row = [];
            for(let j = 0; j < this.gridSize[1]; j++) {
                
                if(hasRoomWithCoordinates(this.clusters, [i, j])) {
                    row.push('#');
                }
                else if(hasRoomWithCoordinates(this.rooms, [i, j])) {
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
                            row.push('§');
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
                }
                else row.push('.');
                
                if(j === this.gridSize[1] - 1) break;
            }
            console.log(row.join(' '));
            if(i === this.gridSize[0] - 1) break;
        }
    }

    /**
     * Returns the Entrance room of this floor.
     * @returns {DungeonRoom} this floor's entrance room
     */
    getEntranceRoom() {
        for(let i = 0; i < this.rooms.length; i++) {
            if(this.rooms[i].type === Data.DungeonRoomType.ENTRANCE) return this.rooms[i];
        }
        return null;
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

    canIdentifyRoom() {
        return Math.random() * 100 < game.player.du_identifyRoomChance;
    }

    attemptToIdentifyRoom() {
        if(this.canIdentifyRoom()) this.identifyCurrentRoom();
    }

    moveToNextRoom() {
        if(this.currentRoom.nextRoom) {
            this.currentRoom = this.currentRoom.nextRoom;
            this.attemptToIdentifyRoom();
        }
        else return false;
    }

    moveToPreviousRoom() {
        if(this.currentRoom.previousRoom) {
            this.currentRoom = this.currentRoom.previousRoom;
            this.attemptToIdentifyRoom();
        }
        else return false;
    }
}
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
        this.gridSize = getValueFromObject(props, "gridSize", [41, 21]);
        this.roomTypes = getValueFromObject(props, "roomTypes", {
            "boss room": 1,
            "eon well": getRandomNumber(1, 3),
            "fractured hollow": 1,
            "sacrificial alcove": getRandomNumber(2, 5),
            "dormant room": getRandomNumber(3, 8),
            "antechamber of marvels": 1,
        });
        this.pathCurve = getValueFromObject(props, "pathCurve", 0);
        this.chaoticCurve = getValueFromObject(props, "chaoticCurve", 2);
        this.clustersAmount = getValueFromObject(props, "clustersAmount", 7);
        this.roomsPerCluster = getValueFromObject(props, "roomsPerCluster", 5);
        this.clusterPattern = getValueFromObject(props, "clusterPattern", Data.DungeonClusterPattern.CIRCLE);

        this.roomsAmount = this.clustersAmount * this.roomsPerCluster;

        this.rooms = [];
        this.connectors = [];
        this.clusters = [];

        this.generateFloorLayout();
        this.generateRooms();
    }

    /**
     * Generates this DungeonFloor's layout by placing clusters on the grid, based on the amount of clusters, their curve and their irregularity.
     */
    generateFloorLayout() {
        const centerColumn = Math.floor(this.gridSize[1] / 2) - 1;
        for(let i = 0; i < this.clustersAmount; i++) {
            const row = Math.floor((this.gridSize[0] - 1) * i / (this.clustersAmount - 1));
            let offset = Math.floor(this.gridSize[1] * this.pathCurve * Math.sin(i * Math.PI * this.chaoticCurve / (this.clustersAmount - 1)));
            offset = Math.max(-centerColumn, Math.min(offset, this.gridSize[1] - 1 - centerColumn));
            const column = centerColumn + offset;
            if(row >= 0 && row < this.gridSize[0] && column >= 0 && column < this.gridSize[1]) {
                this.clusters.push(new DungeonRoom({
                    coordinates: [row, column],
                    type: Data.DungeonRoomType.CLUSTER
                }));

                let count = 0;
                let j =1;
                while(count < this.roomsPerCluster) { 
                    if (row - j >= 0 && !hasRoomWithCoordinates(this.rooms, [row - j, column]) && count < this.roomsPerCluster) {
                        // Above
                        this.rooms.push(new DungeonRoom({
                            coordinates: [row - j, column]
                        })),
                        count++;
                    }
                    if (row + j < this.gridSize[0] && !hasRoomWithCoordinates(this.rooms, [row + j, column]) && count < this.roomsPerCluster) {
                        // Below
                        this.rooms.push(new DungeonRoom({
                            coordinates: [row + j, column]
                        })),
                        count++;
                    }
                    if (column - j >= 0 && !hasRoomWithCoordinates(this.rooms, [row, column - j]) && count < this.roomsPerCluster) {
                        // Left
                        this.rooms.push(new DungeonRoom({
                            coordinates: [row, column - j]
                        })),
                        count++;
                    }
                    if (column + j < this.gridSize[1] && !hasRoomWithCoordinates(this.rooms, [row, column + j]) && count < this.roomsPerCluster) {
                        // Right
                        this.rooms.push(new DungeonRoom({
                            coordinates: [row, column + j]
                        })),
                        count++;
                    }
                    if (row - j >= 0 && column - j >= 0 && !hasRoomWithCoordinates(this.rooms, [row - j, column - j]) && count < this.roomsPerCluster) {
                        // Top-left
                        this.rooms.push(new DungeonRoom({
                            coordinates: [row - j, column - j]
                        })),
                        count++;
                    }
                    if (row - j >= 0 && column + j < this.gridSize[1] && !hasRoomWithCoordinates(this.rooms, [row - j, column + j]) && count < this.roomsPerCluster) {
                        // Top-right
                        this.rooms.push(new DungeonRoom({
                            coordinates: [row - j, column + j]
                        })),
                        count++;
                    }
                    if (row + j < this.gridSize[0] && column - j >= 0 && !hasRoomWithCoordinates(this.rooms, [row + j, column - j]) && count < this.roomsPerCluster) {
                        // Bottom-left
                        this.rooms.push(new DungeonRoom({
                            coordinates: [row + j, column - j]
                        })),
                        count++;
                    }
                    if (row + j < this.gridSize[0] && column + j < this.gridSize[1] && !hasRoomWithCoordinates(this.rooms, [row + j, column + j]) && count < this.roomsPerCluster) {
                        // Bottom-right
                        this.rooms.push(new DungeonRoom({
                            coordinates: [row + j, column + j]
                        })),
                        count++;
                    }
                    j++;
                }
            }
        }
    }

    generateRooms() {
        let reservedCoordinates = []; // Will contain all of the coordinates that have already been generated
        let coordinates; // Coordinates for each room
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
        types = shuffle(types);
        
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
                            row.push('C');
                            break;
                        case Data.DungeonRoomType.DORMANT_ROOM:
                            row.push('D');
                            break;
                        case Data.DungeonRoomType.EMPTY:
                            row.push('§');
                            break;
                        case Data.DungeonRoomType.ENTRANCE:
                            row.push('$');
                            break;
                        case Data.DungeonRoomType.EON_WELL:
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
}
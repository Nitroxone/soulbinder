class DungeonFloor {
    constructor(props) {
        this.depth = getValueFromObject(props, "depth", 0);
        this.roomsAmount = getValueFromObject(props, "roomsAmount", getRandomNumber(20, 30));
        this.gridSize = getValueFromObject(props, "gridSize", [40, 21]);
        this.config = getValueFromObject(props, "config", {
            roomTypes: {
                "boss room": 1,
                "eon well": getRandomNumber(1, 3),
                "fractured hollow": 1,
                "sacrificial alcove": getRandomNumber(2, 5),
                "dormant room": getRandomNumber(3, 8),
                "antechamber of marvels": 1,
            }
        });

        this.rooms = [];
        this.connectors = [];

        this.generateRooms();
    }

    generateRooms() {
        let reservedCoordinates = []; // Will contain all of the coordinates that have already been generated
        let coordinates; // Coordinates for each room
        let types = []; // Contains all of the room types that must be added

        // Add all of this floor's room types (in this.config.roomTypes) to the list of types that will be added
        for(const rt in this.config.roomTypes) {
            const count = this.config.roomTypes[rt];
            for(let i = 0; i < count; i++) {
                types.push(rt);
            }
        }
        // Determine the remaining amount of rooms to fill (with empty rooms), and fill them
        let toAdd = this.roomsAmount - types.length;
        for(let i = 0; i < toAdd; i++) {
            types.push(Data.DungeonRoomType.EMPTY);
        }
        
        // For each room
        for(let i = 0; i < this.roomsAmount; i++) {
            // Create coordinates. Regenerate new coordinates if they already exist in the reservedCoordinates array.
            // First and last room of the dungeon are the Entrance and the Chasm (exit). They're positioned on the first row, middle and last row, middle.
            do {
                if(i === 0) coordinates = [0, Math.round((this.gridSize[1] - 1) / 2)];
                else if(i === this.roomsAmount - 1) coordinates = [this.gridSize[0] - 1, Math.round((this.gridSize[1] - 1) / 2)];
                else coordinates = [getRandomNumber(0, this.gridSize[0]), getRandomNumber(0, this.gridSize[1])];
            } while(reservedCoordinates.includes(coordinates));
            reservedCoordinates.push(coordinates);

            // Create new DungeonRoom with coordinates.
            // First and last rooms are Entrance and Chasm.
            this.rooms.push(new DungeonRoom({
                coordinates: coordinates,
                type: i === 0 ? Data.DungeonRoomType.ENTRANCE : i === this.roomsAmount-1 ? Data.DungeonRoomType.CHASM : types[i]
            }));
        }
    }

    printFloor() {
        for(let i = 0; i < this.gridSize[0]; i++) {
            let row = [];
            for(let j = 0; j < this.gridSize[1]; j++) {
                if(hasRoomWithCoordinates(this.rooms, [i, j])) {
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
                if (j === this.gridSize[1] - 1) break;
            }
            console.log(row.join(' '));
            if (i === this.gridSize[0] - 1) break;
        }
    }
}
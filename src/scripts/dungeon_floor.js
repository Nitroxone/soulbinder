class DungeonFloor {
    constructor(props) {
        this.depth = getValueFromObject(props, "depth", 0);
        this.roomsAmount = getValueFromObject(props, "roomsAmount", getRandomNumber(30, 45));
        this.config = getValueFromObject(props, "config", {
            roomTypes: {
                "boss room": 1,
                "eon well": getRandomNumber(1, 3),
                "fractured hollow": 1,
                "sacrificial alcove": getRandomNumber(2, 5),
                "dormant room": getRandomNumber(3, 8),
                "antechamber of marvels": 1,
            }
        })

        this.rooms = [];

        this.generateRooms()
    }

    generateRooms() {
        for(let i = 0; i < this.roomsAmount; i++) {
            this.rooms.push(new DungeonRoom());
        }
    }
}
class DungeonRoom {
    constructor(props) {
        this.id = Math.floor(Math.random() * Date.now());
        this.coordinates = getValueFromObject(props, "coordinates", [0, 0]);
        this.type = getValueFromObject(props, "type", Data.DungeonRoomType.EMPTY);
        this.childrenRooms = getValueFromObject(props, "childrenRooms", []);
        this.clusterBridge = getValueFromObject(props, "clusterBridge", null);
        this.nextRoom = getValueFromObject(props, "nextRoom", null);
        this.previousRoom = getValueFromObject(props, "previousRoom", null);
        this.parentCluster = getValueFromObject(props, "parentCluster", null);

        this.status = Data.DungeonRoomStatus.UNCLEARED;
        this.visited = false;
    }
}
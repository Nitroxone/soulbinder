class DungeonRoom {
    constructor(props) {
        this.coordinates = getValueFromObject(props, "coordinates", [0, 0]);
        this.type = getValueFromObject(props, "type", Data.DungeonRoomType.EMPTY);
        this.parentCluster = getValueFromObject(props, "parentCluster", null);
    }
}
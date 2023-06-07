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
        this.revealed = false;
        this.identified = false;
    }

    getRoomDescription() {
        return choose(Speech.Dungeon.Rooms[this.type][game.currentDungeon.name.toLowerCase()][this.status]);
    }

    canSearch() {
        return this.type === Data.DungeonRoomType.ANTECHAMBER_OF_MARVELS 
                || this.type === Data.DungeonRoomType.DESECRATED_SANCTUARY
                || this.type === Data.DungeonRoomType.EMPTY
                || this.type === Data.DungeonRoomType.ENTRANCE
                || this.type === Data.DungeonRoomType.ETERNITY_WELL;
    }

    getActions() {
        let actions = [];
        if(this.identified) {
            if(!this.visited) {
                if(this.canSearch()) actions.push(Data.DungeonRoomAction.SEARCH);
                else actions.push(Data.DungeonRoomAction.ENTER);
            }
        } else actions.push(Data.DungeonRoomAction.ENTER, Data.DungeonRoomAction.SCOUT);
        return actions;
    }
}
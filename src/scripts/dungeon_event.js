class DungeonEvent {
    constructor(type, set, encounter, action) {
        this.type = type;
        this.tags = [];
        this.set = set;
        this.encounter = encounter;
        this.action = action;
        this.createEvent()
    }

    createEvent() {
        this.encounter = new DungeonEncounter();

        this.set = game.currentDungeon.isHistoryEmpty() 
        ? Speech.Dungeon.Cave.Entrance.JUNGLE[Math.floor(Math.random() * Speech.Dungeon.Cave.Entrance.JUNGLE.length)] 
        : Speech.Dungeon.Cave.Entrance.JUNGLE[Math.floor(Math.random() * Speech.Dungeon.Cave.Entrance.JUNGLE.length)];

        this.type = game.currentDungeon.isHistoryEmpty()
        ? (this.tags.push(Object.values(Data.DungeonTagEntrance)[Math.floor(Math.random() * Object.keys(Data.DungeonTagEntrance).length)]), Data.DungeonEventType.ENTRANCE)
        : Data.DungeonEventType.REGULAR;
    }
}

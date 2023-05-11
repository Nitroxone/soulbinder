class DungeonEvent {
    constructor(type, set, quote, encounter) {
        this.type = type;
        this.tags = [];
        this.set = set;
        this.quote = quote;
        this.encounter = encounter;
        this.action = "";
        this.createEvent()
    }

    createEvent() {
        this.encounter = new DungeonEncounter();

        this.type = game.currentDungeon.isHistoryEmpty()
        ? (this.tags.push(Object.values(Data.DungeonTagEntrance)[Math.floor(Math.random() * Object.keys(Data.DungeonTagEntrance).length)]), Data.DungeonEventType.ENTRANCE)
        : Data.DungeonEventType.REGULAR;


    }
}

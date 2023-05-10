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

        if(game.currentDungeon.isHistoryEmpty()) this.type = Data.DungeonEventType.ENTRANCE
        else this.type = Data.DungeonEventType.REGULAR
    }
}

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
        ? Data.DungeonEventType.ENTRANCE
        : Data.DungeonEventType.REGULAR;

        game.currentDungeon.currentEvent = this;
        game.currentDungeon.history.push(this);
    }
}

class DungeonEvent {
    constructor(type, set, encounter, action) {
        this.biome = game.currentDungeon.biome;
        this.zone = game.currentDungeon.zone;
        this.type = type;
        this.tags = [];
        this.set = set;
        this.encounter = encounter;
        this.action = action;
        this.createEvent()
    }

    createEvent() {
        this.encounter = new DungeonEncounter();

        this.type = game.currentDungeon.isHistoryEmpty()
        ? Data.DungeonEventType.ENTRANCE
        : Data.DungeonEventType.REGULAR;

        // console.log(this.zone)
        // console.log(this.type);
        // console.log(this.biome);

        this.set = Speech.Dungeon[this.zone][this.type][this.biome][Math.floor(Math.random() * Speech.Dungeon[this.zone][this.type][this.biome].length)];
     
        game.currentDungeon.currentEvent = this;
        game.currentDungeon.history.push(this);
    }
}

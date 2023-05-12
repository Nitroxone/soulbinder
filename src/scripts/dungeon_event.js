class DungeonEvent {
    constructor(type, set, encounter, action) {
        this.biome = game.currentDungeon.biome;
        console.log(this.biome);
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
        ? (this.tags.push(Object.values(Data.DungeonTagEntrance)[Math.floor(Math.random() * Object.keys(Data.DungeonTagEntrance).length)]), Data.DungeonEventType.ENTRANCE)
        : Data.DungeonEventType.REGULAR;

        
        this.set = Speech.Dungeon.(this.type).toUpperCase(this.biome)[Math.floor(Math.random() * Speech.Dungeon.capitalizeFirstLetter(this.type).toUpperCase(this.biome).length)] 
     

        game.currentDungeon.currentEvent = this;
    }
}

class DungeonEvent {
    constructor(type, set, encounter, action) {
        this.biome = game.currentDungeon.biome;
        this.zone = game.currentDungeon.zone;
        this.level = game.currentDungeon.currentLevel;
        this.instance = null;
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
        if (this.type === "entrance") {
            this.set = Speech.Dungeon[this.zone][this.type][this.biome][Math.floor(Math.random() * Speech.Dungeon[this.zone][this.type][this.biome].length)];
        } else {
            // arbitrary for the moment; later the action will have to decide on the next type of instance (room or bridge, depending on the player's choice)
            this.instance = "room";

            this.set = Speech.Dungeon[this.zone][this.type][this.biome][this.level][this.instance][Math.floor(Math.random() * Speech.Dungeon[this.zone][this.type][this.biome][this.level][this.instance].length)];
        }

     
        game.currentDungeon.currentEvent = this;
        game.currentDungeon.history.push(this);
    }

    playEvent() {

    }


    action() {

    }
}

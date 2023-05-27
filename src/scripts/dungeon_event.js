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
        this.choiceQuote = '';
        this.createEvent();
    }


    /**
     * Initializes new data for this DungeonEvent.
     */
    createEvent() {
        this.setEventType();
        this.setEncounter();
        this.setEventSet();
        this.storeEvent();
    }

    setEventType() {
        this.type = game.currentDungeon.isHistoryEmpty()
        ? Data.DungeonEventType.ENTRANCE
        : Data.DungeonEventType.REGULAR;
    }

    // Creates a new DungeonEncounter that is linked to this DungeonEvent.
    setEncounter() {
        this.encounter = new DungeonEncounter();
    }

    setEventSet() {
        if (this.type === "entrance") {
            this.set = Speech.Dungeon[this.zone][this.type][this.biome][Math.floor(Math.random() * Speech.Dungeon[this.zone][this.type][this.biome].length)];
        } else if(game.currentDungeon.history.length === 1) {
            // arbitrary for the moment; later the action will have to decide on the next type of instance (room or bridge, depending on the player's choice)
            this.instance = "room";

            this.set = Speech.Dungeon[this.zone][this.type][this.biome][this.level][this.instance][Math.floor(Math.random() * Speech.Dungeon[this.zone][this.type][this.biome][this.level][this.instance].length)];
        } else {
            this.set = 'KAKAPROOTE';
        }
    }

    setChoiceQuote() {
        this.choiceQuote = Speech.Dungeon[this.zone].regular[this.biome][this.level].choiceQuote[Math.floor(Math.random() * Speech.Dungeon[this.zone].regular[this.biome][this.level].choiceQuote.length)];
    }
    
    // stores the event in the current dungeon history, and make it the new current event
    storeEvent() {
        game.currentDungeon.currentEvent = this;
        game.currentDungeon.history.push(this);
    }
}

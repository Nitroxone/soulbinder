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
        if (this.type === Data.DungeonEventType.ENTRANCE) {
            this.set = getDungeonEntranceSet(this);
        } else {
            this.instance = Data.DungeoneEventInstance.ROOM;
            this.set = getDungeonRegularSet(this);
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

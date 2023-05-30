class DungeonEvent {
    constructor(instance = Data.DungeonEventInstance.ROOM) {
        this.biome = game.currentDungeon.biome;
        this.zone = game.currentDungeon.zone;
        this.level = game.currentDungeon.currentLevel;
        this.instance = instance;
        this.type = null;
        this.tags = [];
        this.set = null;
        this.encounter = null;
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
        if (this.type === Data.DungeonEventType.ENTRANCE) this.generateEntranceSet()
        else this.generateRegularSet();

        this.generateChoiceQuote();
    }

    /**
     * 
     * @param {Data.DungeonEventInstance} instance 
     */
    setInstance(instance) {
            this.instance = instance;
    }

    generateChoiceQuote() {
        if(game.currentDungeon.isLastRoom() && game.currentDungeon.instance === Data.DungeonEventInstance.ROOM) {

            this.choiceQuote = Speech.Dungeon[this.zone].regular[this.biome][this.level].endLevelQuote[Math.floor(Math.random() * Speech.Dungeon[this.zone].regular[this.biome][this.level].endLevelQuote.length)];

        }
        else {
            this.choiceQuote = Speech.Dungeon[this.zone].regular[this.biome][this.level].choiceQuote[Math.floor(Math.random() * Speech.Dungeon[this.zone].regular[this.biome][this.level].choiceQuote.length)];
        }
    }

    generateEntranceSet() {
        this.set = getDungeonEntranceSet(this);
    }

    generateRegularSet() {
        this.set = getDungeonRegularSet(this);
    }

    generateClosingSet() {
        this.set = getDungeonClosingSet(this);
    }
    
    // stores the event in the current dungeon history, and make it the new current event
    storeEvent() {
        game.currentDungeon.currentEvent = this;
        game.currentDungeon.history.push(this);
    }
}

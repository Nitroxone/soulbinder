/**
 * The Dungeon class handles the global Dungeon structure and logic.
 * More specifically, it works with DungeonEvent and DungeonEncounter classes.
 */
class Dungeon {
    constructor() {
        this.biome = null;
        this.zone = null;
        this.tags = [];
        this.currentEvent = null;
        this.currentLevel = null;
        this.currentLevelRoomNumber = 0;
        this.history = [];
        this.createDungeon();
    }

    /**
     * Initializes new data for this Dungeon.
     */
    createDungeon() {
        this.biome = game.selectedBiome;
        this.zone = game.selectedZone;
        this.tags = [];
        this.currentEvent = null;
        this.currentLevel = 1;
        this.history = [];
        game.currentDungeon = this;
        this.generateEvent();
    }

    /**
     * Returns whether this Dungeon's history is empty.
     * @returns {boolean} whether the history is empty
     */
    isHistoryEmpty() {
        return this.history.length === 0;
    }
    
    /**
     * Generates a new DungeonEvent.
     */
    generateEvent(instance = Data.DungeonEventInstance.ROOM) {
        this.currentEvent = new DungeonEvent(instance);
        if(instance === Data.DungeonEventInstance.ROOM) this.addOneToRoomNumber();
        if(instance === Data.DungeonEventInstance.BRIDGE) this.increaseLevel();
    }

    // returns the current encounter
    getCurrentEventEncounter() {
        console.log(this.currentEvent.encounter);
        return this.currentEvent.encounter;
    }

    // returns the current set of the current dungeon event
    getCurrentEventSet() {
        return this.currentEvent.set; 
    }

    getCurrentEventChoiceQuote() {
        return this.currentEvent.choiceQuote;
    }

    // to prompt the player's choice (and eventually get back the result, to see how we organize it)
    promptInstanceChoice() {
        const playerChoice = getPlayerInstanceChoice();
        this.currentEvent.chooseInstance(playerChoice);
    }

    // 
    increaseLevel() {
        this.currentLevel = Math.min(this.currentLevel+1, 5);
        this.resetCurrentLevelRoomNumber();
    }

    getCurrentLevelRoomNumber() {
        return this.currentLevelRoomNumber;
    }

    addOneToRoomNumber() {
        this.currentLevelRoomNumber += 1;
    }

    resetCurrentLevelRoomNumber() {
        this.currentLevelRoomNumber = 0;
    }

    isLastRoom() {
        return this.getCurrentLevelRoomNumber() % 3 === 0;
    }
}



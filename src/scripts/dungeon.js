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
        this.history = [];
        this.createDungeon();
    }

    /**
     * Initializes new data for this Dungeon.
     */
    createDungeon() {
        this.biome = biomeName;
        this.zone = zoneName;
        this.tags = [];
        this.currentEvent = null;
        this.currentLevel = 1;
        this.history = [];
        game.currentDungeon = this;
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
    generateEvent() {
        this.currentEvent = new DungeonEvent();
    }

    playEvent() {
        this.displaySet();
        this.displayEncounter();
        this.promptInstanceChoice();
    }

    displayEventSet() {
        console.log("Set: " + this.currentEvent.set);
    }

    displayEncounter() {
        if (this.currentEvent.encounter) {
            console.log("Rencontre: " + this.currentEvent.encounter);
        }
    }

    promptInstanceChoice() {
        const playerChoice = getPlayerInstanceChoice();
        this.currentEvent.chooseInstance(playerChoice);
    }
}



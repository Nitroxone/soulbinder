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
    generateEvent() {
        this.currentEvent = new DungeonEvent();
    }

    // I was thinking of making a method for each new step to display
    playEvent() {
        this.displaySet();
        this.displayEncounter();
        this.promptInstanceChoice();
    }
    // to display the textual background of the chosen set
    displayEventSet() {
        console.log("Set: " + this.currentEvent.set);
    }
    // to make the encounter appear
    displayEncounter() {
        if (this.currentEvent.encounter) {
            console.log("Rencontre: " + this.currentEvent.encounter);
        }
    }

    // returns the current set of the current dungeon event
    getCurrentEventSet() {
        return this.currentEvent.set; 
    }

    // to prompt the player's choice (and eventually get back the result, to see how we organize it)
    promptInstanceChoice() {
        const playerChoice = getPlayerInstanceChoice();
        this.currentEvent.chooseInstance(playerChoice);
    }
}



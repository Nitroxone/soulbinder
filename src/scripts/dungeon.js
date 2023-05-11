class Dungeon {
    constructor() {
        this.biome = null;
        this.tags = [];
        this.currentEvent = null;
        this.history = [];
        this.createDungeon();
    }


    createDungeon() {
        this.biome = Object.values(Data.DungeonTagBiome)[Math.floor(Math.random() * Object.keys(Data.DungeonTagBiome).length)];
        this.tags = [];
        this.currentEvent = null;
        this.history = [];
        game.currentDungeon = this;
    }

    isHistoryEmpty() {
        return this.history.length === 0;
    }
    
    generateEvent() {
        this.currentEvent = new DungeonEvent();
        // The event is not yet pushed to the Dungeon's history. It will be pushed once the player is done with it
    }

    playEvent() {
        
    }
}



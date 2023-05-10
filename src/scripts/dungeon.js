class Dungeon {
    constructor() {
        this.biome = null;
        this.tags = [];
        this.playerLocation = null;
        this.history = [];
        this.createDungeon();
    }


    createDungeon() {
        this.biome = Object.values(Data.DungeonTagBiome)[Math.floor(Math.random() * Object.keys(Data.DungeonTagBiome).length)];
        this.tags = [];
        this.playerLocation = null;
        this.history = [];
        game.currentDungeon = this;
    }

    isHistoryEmpty() {
        return this.history.length === 0;
    }

    // getEvent() {

    // }
}



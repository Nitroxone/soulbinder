class DungeonEncounter {
    constructor(type, quote) {
        this.type = type;
        this.quote = quote;
        this.enemyFormation = null;
        this.createEncounter();
    }
  
    createEncounter() {
        this.generateEncounterType();
        if(this.type ===  Data.DungeonEncounterType.HOSTILE) {
            this.getEnemyFormation();
        }
        this.generateEncounterQuote();
    }

    generateEncounterType() {
        const randomType = Object.values(Data.DungeonEncounterType)[Math.floor(Math.random() * Object.keys(Data.DungeonEncounterType).length)];
        this.type = randomType;
    }

    generateEncounterQuote() {
        return this.quote = 'quote test pour encounter';
    }

    getEnemyFormation() {
        return choose(game.all_enemyFormations);
    }
}
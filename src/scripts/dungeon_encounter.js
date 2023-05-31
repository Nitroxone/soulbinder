class DungeonEncounter {
    constructor(type, battleType, quote) {
        this.type = type;
        this.battleType = battleType;
        this.mobType = null;
        this.quote = quote;
        this.createEncounter();
    }
  
    createEncounter() {
        this.generateEncounterType();
        switch (this.type) {
            case Data.DungeonEncounterType.HOSTILE:
                this.generateHostileEncounterMobType();
                break;

            case Data.DungeonEncounterType.FRIENDLY:
                this.generateFriendlyEncounterMobType();
                break;

            default:
                this.mobType = null;
                break;
        }
    }

    generateEncounterType() {
        const randomType = Object.values(Data.DungeonEncounterType)[Math.floor(Math.random() * Object.keys(Data.DungeonEncounterType).length)];
        this.type = randomType;
    }

    generateFriendlyEncounterMobType() {
        this.mobType = Object.values(Data.DungeonEncounterFriendlyMobType)[Math.floor(Math.random() * Object.keys(Data.DungeonEncounterFriendlyMobType).length)];
    }

    generateHostileEncounterMobType() {
        this.mobType = Object.values(Data.DungeonEncounterHostileMobType)[Math.floor(Math.random() * Object.keys(Data.DungeonEncounterHostileMobType).length)];
    }

    generateHostileEncounterBattleType() {
        this.battleType = Object.values(Data.DungeonEncounterHostileBattleType)[Math.floor(Math.random() * Object.keys(Data.DungeonEncounterHostileBattleType).length)];
    }

    generateEncounterQuote() {

    }
}
class DungeonEncounter {
    constructor(type, mobType) {
        this.type = type;
        this.mobType = mobType;
    }
  
    createEncounter() {
        const randomType = Object.values(Data.DungeonEncounterType)[Math.floor(Math.random() * Object.keys(Data.DungeonEncounterType).length)];
        this.type = randomType;
  
        if (this.type === Data.DungeonEncounterType.HOSTILE) {
            const randomHostileMobType = Object.values(Data.DungeonEncounterHostileMobType)[Math.floor(Math.random() * Object.keys(Data.DungeonEncounterHostileMobType).length)];
            this.mobType = randomHostileMobType;
        } 
        else if (this.type === Data.DungeonEncounterType.FRIENDLY) {
            const randomFriendlyMobType = Object.values(Data.DungeonEncounterFriendlyMobType)[Math.floor(Math.random() * Object.keys(Data.DungeonEncounterFriendlyMobType).length)];
            this.mobType = randomFriendlyMobType;
            
        } 
        else {
            this.mobType = null;
        }
    }
}
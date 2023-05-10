class DungeonEncounter {
    constructor(type, mobType) {
        this.type = type;
        this.mobType = mobType;
    }
  
    createEncounter() {
        const randomType = Object.values(Data.DungeonEncounterType)[Math.floor(Math.random() * Object.keys(Data.DungeonEncounterType).length)];
        this.type = randomType;
      
        switch (this.type) {
            case Data.DungeonEncounterType.HOSTILE:
                const randomHostileMobType = Object.values(Data.DungeonEncounterHostileMobType)[Math.floor(Math.random() * Object.keys(Data.DungeonEncounterHostileMobType).length)];
                this.mobType = randomHostileMobType;
                break;

            case Data.DungeonEncounterType.FRIENDLY:
                const randomFriendlyMobType = Object.values(Data.DungeonEncounterFriendlyMobType)[Math.floor(Math.random() * Object.keys(Data.DungeonEncounterFriendlyMobType).length)];
                this.mobType = randomFriendlyMobType;
                break;

            default:
                this.mobType = null;
                break;
        }
    }
}
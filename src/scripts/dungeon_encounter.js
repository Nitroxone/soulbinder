class DungeonEncounter {
    constructor(type, mobType) {
        this.type = type;
        this.mobType = mobType;
        this.createEncounter();
    }
  
    createEncounter() {
        const randomType = Object.values(Data.DungeonEncounterType)[Math.floor(Math.random() * Object.keys(Data.DungeonEncounterType).length)];
        this.type = randomType;
      
        switch (this.type) {
            case Data.DungeonEncounterType.HOSTILE:
                this.mobType = Object.values(Data.DungeonEncounterHostileMobType)[Math.floor(Math.random() * Object.keys(Data.DungeonEncounterHostileMobType).length)];
                break;

            case Data.DungeonEncounterType.FRIENDLY:
                this.mobType = Object.values(Data.DungeonEncounterFriendlyMobType)[Math.floor(Math.random() * Object.keys(Data.DungeonEncounterFriendlyMobType).length)];
                break;

            default:
                this.mobType = null;
                break;
        }
    }
}
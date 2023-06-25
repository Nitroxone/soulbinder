class Player {
    /**
     * 
     * @param {string} name the Player's name
     * @param {Inventory} inventory the Player's inventory
     */
    constructor(name, inventory) {
        this.name = name;
        this.inventory = inventory;

        this.roster = [];
        this.formation = [];

        this.playerLevel = new Level("Level", 1, 100, 1, 1000, 0);

        this.criticalFactor = 15;
        this.corruptionFactor = 15;

        this.quests = [];

        this.souls = 0;
        this.gold = 0;

        this.soulmarks = [];

        // ASTRAL FORGE CONFIG
        this.af_criticalFailure = 15;
        this.af_failure = 40;
        this.af_success = 40;
        this.af_criticalSuccess = 5;

        // DUNGEONS CONFIG
        this.du_identifyRoomChance = 30;
    }

    /**
     * Sets the provided NPC to the provided FormationPosition in the formation.
     * @param {NPC} npc 
     * @param {Data.FormationPosition} pos 
     */
    formationSet(npc, pos) {
        let found;
        if(this.formation.includes(npc)) {
            console.info(npc.name + " already exists in the formation.");
        }
        else if(containsByName(this.roster, npc.name)) {
            switch(pos) {
                case Data.FormationPosition.BACK:
                    this.formation[0] = npc;
                    found = true;
                    break;
                case Data.FormationPosition.MIDDLE:
                    this.formation[1] = npc;
                    found = true;
                    break;
                case Data.FormationPosition.FRONT:
                    this.formation[2] = npc;
                    found = true;
                    break;
            }
            //if(found) removeFromArray(this.roster, npc);
        }
    }

    /**
     * Adds the provided Strider to the roster.
     * @param {Strider} strider the Strider that will be added to the roster
     */
    addToRoster(strider) {
        this.roster.push(strider);
    }

    addQuest(quest) {
        this.quests.push(quest);
    }

    addSoulsToPlayer(amount) {
        this.souls += amount;
    }

    addGoldToPlayer(amount) {
        this.gold += amount;
    }

    addSoulmark(soulmark) {
        if(!this.soulmarks.includes(soulmark)) this.soulmarks.push(soulmark);
    }
}
/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

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

        this.soulmarks = [];

        // ASTRAL FORGE CONFIG
        this.af_criticalFailure = 15;
        this.af_failure = 40;
        this.af_success = 40;
        this.af_criticalSuccess = 5;

        // DUNGEONS CONFIG
        this.du_identifyRoomChance = 30;
        this.du_inventorySize = 20;
        this.du_invSelectedResource = null;
        this.du_inventory = [];

        // SIGILS
        this.sw_stalwartFactor = 5;
        this.sw_corruptFactor = 5;

        this.sr_sigilsCrushed = 0;
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

    addSoulmark(name) {
        Config.Soulwriting.find(sm => sm.name.toLowerCase() === name.toLowerCase()).unlocked = true;
    }

    getAllUnlockedSoulmarks() {
        return Config.Soulwriting.filter(sm => sm.unlocked);
    }

    addToKnapsack(ev) {
        if(this.du_inventory.length >= this.du_inventorySize) {
            console.info('Knapsack is full.');
            return;
        }

        let it, i = 0;
        const types = ['weapon', 'armor', 'trinket', 'resource', 'sigil', 'consumable'];

        do {
            it = ev.dataTransfer.getData(types[i]);
            i++;
        } while(it === '');

        it = this.inventory.getItemFromId(types[i-1].toUpperCase(), it);
        if(it) {
            if(it instanceof Resource) {
                console.log('resource detected!');
                toggleKnapsackResourceImporter(it);
            }
            else this.transferToKnapsack(it);
        }
    }

    transferToKnapsack(it) {
        this.inventory.removeItem(it);
        this.du_inventory.push(it);

        refreshKnapsackAndInventory();
    }

    removeFromKnapsack(item, amount = 1) {
        if(item) {
            this.inventory.addItem(item, amount, true);

            if(item instanceof Resource) {
                const ko = this.du_inventory.find(x => x === item);
                ko.knapsackAmount = Math.max(0, ko.knapsackAmount - amount);
                if(ko.knapsackAmount === 0) removeFromArray(this.du_inventory, item);
            } else removeFromArray(this.du_inventory, item);

            refreshKnapsackAndInventory();
        }
    }

    addResourceToKnapsack(item, amount) {
        if(item) {
            this.inventory.removeResource(item, amount);
            if(!this.du_inventory.find(x => x === item)) this.du_inventory.push(item);
            item.knapsackAmount += amount;

            refreshKnapsackAndInventory();
        }
    }
}
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
        this.du_collectedGold = 0;
        this.du_collectedSouls = 0;
        this.inCombat = false;

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

    /**
     * Adds the provided Quest to the player's quest list.
     * @param {Quest} quest the Quest to add
     */
    addQuest(quest) {
        this.quests.push(quest);
    }

    /**
     * Adds the provided amount of souls to the player.
     * @param {number} amount the amount of souls to add
     */
    addSouls(amount) {
        this.souls += amount;
    }

    /**
     * Adds the provided amount of gold to the player.
     * @param {number} amount the amount of gold to add
     */
    addGold(amount) {
        this.gold += amount;
    }

    /**
     * Unlocks the Soulmark whose name matches the provided string.
     * @param {string} name the Soulmark's name to unlock
     */
    addSoulmark(name) {
        Config.Soulwriting.find(sm => sm.name.toLowerCase() === name.toLowerCase()).unlocked = true;
    }

    /**
     * Returns all the Soulmarks unlocked by the player.
     * @returns {Soulmark[]} an array of Soulmarks
     */
    getAllUnlockedSoulmarks() {
        return Config.Soulwriting.filter(sm => sm.unlocked);
    }

    /**
     * Adds the Item stocked in the provided Event object to the player's Knapsack.
     * @param {Event} ev the Event to retrieve the Item from
     */
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

    /**
     * Transfers the provided Item from the player's inventory to his Knapsack.
     * @param {Item} it the Item to transfer
     */
    transferToKnapsack(it) {
        this.inventory.removeItem(it);
        this.du_inventory.push(it);

        refreshKnapsackAndInventory();
    }

    /**
     * Removes the provided Item from this player's Knapsack and transfers it back to the Inventory.
     * @param {Item} item the Item to remove
     * @param {number} amount the amount of times the Item will be removed
     */
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

    /**
     * Adds the provided Resource to the player's Knapsack, as many times as specified by the amount parameter.
     * @param {Resource} item the Resource to add
     * @param {number} amount the amount of times the Resource will be added
     */
    addResourceToKnapsack(item, amount) {
        if(item) {
            this.inventory.removeResource(item, amount);
            if(!this.du_inventory.find(x => x === item)) this.du_inventory.push(item);
            item.knapsackAmount += amount;

            refreshKnapsackAndInventory();
        }
    }

    /**
     * Switches the player combat state to true.
     */
    enterCombat() {
        this.inCombat = true;
    }

    /**
     * Switches the player combat state to false.
     */
    leaveCombat() {
        this.inCombat = false
    }
}
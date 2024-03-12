/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class DungeonRoom {
    constructor(props) {
        this.id = Math.floor(Math.random() * Date.now());
        this.coordinates = getValueFromObject(props, "coordinates", [0, 0]);
        this.type = getValueFromObject(props, "type", Data.DungeonRoomType.UNASSIGNED);
        this.nextRooms = getValueFromObject(props, "nextRooms", []);
        this.previousRooms = getValueFromObject(props, "previousRooms", []);

        this.status = Data.DungeonRoomStatus.UNCLEARED;
        this.visited = false;
        this.revealed = false;
        this.identified = false;
        this.desc = '';
        this.actionDesc = '';

        this.isUnlocked = true;

        this.foundLoot = null;

        this.enemyGroup = null;
    }

    setType(type) {
        this.type = type;
        this.isUnlocked = ![Data.DungeonRoomType.ANTECHAMBER_OF_MARVELS, Data.DungeonRoomType.DESECRATED_ALTAR].includes(type);
    }

    /**
     * Returns this room's description.
     * @param {boolean} reassign whether to reassign the room's description
     * @returns {string} the room's description
     */
    getRoomDescription(reassign = false) {
        console.log('Getting description for room type :' + this.type + ', dungeon : ' + game.dungeon.name);
        if(this.desc !== '' && !reassign) return this.desc;
        let desc = '';

        if(!this.identified) desc = choose(Speech.Dungeon.Rooms["unknown"]);
        else {
            if(this.type === Data.DungeonRoomType.ANTECHAMBER_OF_MARVELS) desc = choose(Speech.Dungeon.Rooms['antechamber of marvels']);
            else desc = choose(Speech.Dungeon.Rooms[this.type][game.dungeon.name.toLowerCase()][this.status]);
        }
        this.desc = desc;

        return desc;
    }

    /**
     * Returns whether the room's type is searchable.
     * @returns {boolean} whether the room can be searched
     */
    canSearch() {
        return this.type === Data.DungeonRoomType.ANTECHAMBER_OF_MARVELS 
                || this.type === Data.DungeonRoomType.DESECRATED_ALTAR
                || this.type === Data.DungeonRoomType.EMPTY
                || this.type === Data.DungeonRoomType.ENTRANCE
                || this.type === Data.DungeonRoomType.ETERNITY_WELL;
    }

    isLootable() {
        return this.type === Data.DungeonRoomType.ANTECHAMBER_OF_MARVELS
                || this.type === Data.DungeonRoomType.EMPTY
                || this.type === Data.DungeonRoomType.ENTRANCE
                || this.type === Data.DungeonRoomType.ETERNITY_WELL
    }

    /**
     * Returns this room's actions.
     * @returns {Data.DungeonRoomAction[]}
     */
    getActions() {
        let actions = [];
        if(this.isCleared()) return actions;
        if(this.identified) {
            if(this.canSearch()) actions.push(Data.DungeonRoomAction.SEARCH);
            else actions.push(Data.DungeonRoomAction.ENTER);
        } else actions.push(Data.DungeonRoomAction.ENTER, Data.DungeonRoomAction.SCOUT);
        return actions;
    }

    /**
     * Scouts this room. Removes a Solar Firely from the player's inventory.
     * @returns {boolean} whether the scout was successful (if the player has at least one Solar Firefly)
     */
    scout() {
        if(hasResource(game.player.inventory.resources, 'solar firefly')) {
            this.identify();
            game.player.inventory.removeResource(what(game.player.inventory.resources, 'solar firefly'));
            return true;
        } else return false;
    }

    /**
     * Identifies the room and updates its description.
     */
    identify() {
        this.identified = true;
        this.getRoomDescription(true);
    }

    /**
     * Changes the room's status to CLEARED.
     */
    clear() {
        this.status = Data.DungeonRoomStatus.CLEARED;
        document.querySelector('.infosPanel-roomHeader')?.classList.remove('engaged');
    }

    /**
     * Returns whether this room is cleared.
     * @returns {boolean} 
     */
    isCleared() {
        return this.status === Data.DungeonRoomStatus.CLEARED;
    }

    /**
     * Changes the room's status to ENGAGED.
     */
    engage() {
        this.status = Data.DungeonRoomStatus.ENGAGED;
    }

    /**
     * Returns whether this room is a combat room.
     * @returns {boolean}
     */
    isCombatRoom() {
        return this.type === Data.DungeonRoomType.BOSS
            || this.type === Data.DungeonRoomType.DORMANT_ROOM
            || this.type === Data.DungeonRoomType.FRACTURED_HOLLOW
            || this.type === Data.DungeonRoomType.SACRIFICIAL_ALCOVE
            || this.type === Data.DungeonRoomType.MINIBOSS
    }

    /**
     * Enters the room (supposedly a non-treasure room).
     */
    enterRoom() {
        switch(this.type) {
            case Data.DungeonRoomType.CHASM:
                game.dungeon.moveToNextFloor();
                break;
            case Data.DungeonRoomType.DORMANT_ROOM:
                this.assignEnemyGroup();
                game.startBattle(this.enemyGroup);
                game.player.enterCombat();
                break;
            case Data.DungeonRoomType.SACRIFICIAL_ALCOVE:
                this.assignEnemyGroup();
                game.startBattle(this.enemyGroup);
                game.player.enterCombat();
                break;
            case Data.DungeonRoomType.FRACTURED_HOLLOW:
                this.assignEnemyGroup();
                game.startBattle(this.enemyGroup);
                game.player.enterCombat();
                break;
            case Data.DungeonRoomType.MINIBOSS:
                this.assignEnemyGroup(game.dungeon.floor.params.miniboss);
                game.startBattle(this.enemyGroup);
                game.player.enterCombat();
                break;
        }
    }

    /**
     * Assigns an enemy formation to this room, based on the dungeon's parameters.
     */
    assignEnemyGroup(force = null) {
        if(!force) {
            const biome = game.dungeon.biome;
            let pool = game.all_enemyFormations.filter(x => {
                return (x.biome === biome || x.biome === Data.DungeonBiome.ALL) && x.type === translateCombatRoomType(this.type);
            });
            console.log('assigning: ' + choose(pool) + ' to ' + this.type);
            force = choose(pool);
        }
        this.enemyGroup = Entity.clone(force);
    }

    /**
     * Notifies the Dungeon that the a battle has ended.
     * @param {Data.BattleOutcome} outcome the battle's outcome
     */
    battleEnded(outcome) {
        game.player.leaveCombat();
        if(outcome === Data.BattleOutcome.VICTORY) {
            clearCurrentRoom();
        }
    }

    /**
     * Generates loot for this room.
     */
    generateRoomLoot() {
        this.foundLoot = LootTable.Generators.generateLoot(LootTable.Presets.Dungeon[this.type]);
    }


    regenerateStriders(EL) {
        const req = Config.EphemeralLuck.Costs.DESECRATED_ALTAR;
        const results = {};
        
        if(EL >= req) {
            const baseMod = 0.25; // The min. amount regenerates 25% of hea/sta/man
            const extraRegen = Math.floor(EL/50) * 0.01; // Above that amount, every 50EL regenerates an extra 1%
            const total = baseMod + extraRegen;
            let addExtra = false;
            
            if(EL >= (req + req*0.20)) {
                // Pouring at least 120% of the required amount applies bonuses to Striders for the next fight
                addExtra = true;
            }

            game.player.formation.forEach(stri => {
                results[stri.name] = {
                    // [OLD, NEW]
                    health: [stri.health, Math.round(stri.maxHealth*total)],
                    stamina: [stri.stamina, Math.round(stri.maxStamina*total)],
                    mana: [stri.mana, Math.round(stri.maxMana*total)],
                }
                stri.addBaseStat(new Stat({effect: Data.Effect.HEALTH, theorical: Math.round(stri.maxHealth*total)}), false, true);
                stri.addBaseStat(new Stat({effect: Data.Effect.STAMINA, theorical: Math.round(stri.maxStamina*total)}), false, true);
                stri.addBaseStat(new Stat({effect: Data.Effect.MANA, theorical: Math.round(stri.maxMana*total)}), false, true);
                // if(addExtra) {
                //     let stat;
                //     switch(stri.striderType) {
                //         case Data.StriderType.STRIKER:
                //             stat = new Stat({effect: Data.Effect.MODIF_DMG_TOTAL, theorical: 5, isPercentage: true});
                //             stri.applyEffect(stat);
                //             results[stri.name].extra = stat; 
                //             break;
                //         case Data.StriderType.SUPPORT:
                //             stat = new Stat({effect: Data.Effect.SPEED, theorical: 2});
                //             stri.applyEffect(stat);
                //             results[stri.name].extra = stat;
                //             break;
                //         case Data.StriderType.TANK:
                //             stat = new Stat({effect: Data.Effect.PROTECTION, theorical: 5, isPercentage: true});
                //             stri.applyEffect(stat);
                //             results[stri.name].extra = stat;
                //             break;
                //     }
                // }
            });
        }

        return results;
    }
}
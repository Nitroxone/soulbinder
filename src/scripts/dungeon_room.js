/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class DungeonRoom {
    constructor(props) {
        this.id = Math.floor(Math.random() * Date.now());
        this.coordinates = getValueFromObject(props, "coordinates", [0, 0]);
        this.type = getValueFromObject(props, "type", Data.DungeonRoomType.EMPTY);
        this.childrenRooms = getValueFromObject(props, "childrenRooms", []);
        this.clusterBridge = getValueFromObject(props, "clusterBridge", null);
        this.nextRoom = getValueFromObject(props, "nextRoom", null);
        this.previousRoom = getValueFromObject(props, "previousRoom", null);
        this.parentCluster = getValueFromObject(props, "parentCluster", null);

        this.status = Data.DungeonRoomStatus.UNCLEARED;
        this.visited = false;
        this.revealed = false;
        this.identified = false;
        this.desc = '';
        this.actionDesc = '';

        this.foundLoot = null;

        this.revealedCluster = false;
    }

    /**
     * Returns this room's description.
     * @param {boolean} reassign whether to reassign the room's description
     * @returns {string} the room's description
     */
    getRoomDescription(reassign = false) {
        if(this.desc !== '' && !reassign) return this.desc;
        let desc = '';

        if(!this.identified) desc = choose(Speech.Dungeon.Rooms["unknown"]);
        else {
            if(this.type === Data.DungeonRoomType.ANTECHAMBER_OF_MARVELS) desc = choose(Speech.Dungeon.Rooms['antechamber of marvels']);
            else desc = choose(Speech.Dungeon.Rooms[this.type][game.currentDungeon.name.toLowerCase()][this.status]);
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

    /**
     * Returns this room's actions.
     * @returns {Data.DungeonRoomAction[]}
     */
    getActions() {
        let actions = [];
        if(this.isCleared()) return actions;
        if(this.identified) {
            if(!this.visited) {
                if(this.canSearch()) actions.push(Data.DungeonRoomAction.SEARCH);
                else actions.push(Data.DungeonRoomAction.ENTER);
            }
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
    }

    /**
     * Enters the room (supposedly a non-treasure room).
     */
    enterRoom() {
        switch(this.type) {
            case Data.DungeonRoomType.CHASM:
                game.currentDungeon.moveToNextFloor();
        }
    }
}
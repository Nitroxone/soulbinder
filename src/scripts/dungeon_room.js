/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

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
    }

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

    canSearch() {
        return this.type === Data.DungeonRoomType.ANTECHAMBER_OF_MARVELS 
                || this.type === Data.DungeonRoomType.DESECRATED_ALTAR
                || this.type === Data.DungeonRoomType.EMPTY
                || this.type === Data.DungeonRoomType.ENTRANCE
                || this.type === Data.DungeonRoomType.ETERNITY_WELL;
    }

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

    scout() {
        if(hasResource(game.player.inventory.resources, 'solar firefly')) {
            this.identify();
            game.player.inventory.removeResource(what(game.player.inventory.resources, 'solar firefly'));
            return true;
        } else return false;
    }

    identify() {
        this.identified = true;
        this.getRoomDescription(true);
    }

    clear() {
        this.status = Data.DungeonRoomStatus.CLEARED;
    }

    isCleared() {
        return this.status === Data.DungeonRoomStatus.CLEARED;
    }

    engage() {
        this.status = Data.DungeonRoomStatus.ENGAGED;
    }
}
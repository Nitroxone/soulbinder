/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class DungeonFloorConfig {
    constructor(props = {}) {
        this.rows = getValueFromObject(props, 'ROWS', null);
        this.startingRooms = getValueFromObject(props, 'STARTING_ROOMS', 3);
    }

    
}
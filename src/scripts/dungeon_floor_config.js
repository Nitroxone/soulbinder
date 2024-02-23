/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class DungeonFloorConfig {
    constructor(props = {}) {
        this.levels = {};
        this.buildLevels(props);
    }

    buildLevels(props) {
        console.log(props);
        for(const level in props) {
            this.levels[level] = {};
            this.levels[level].rows = getValueFromObject(props[level], "ROWS", null);
            this.levels[level].startingRooms = getValueFromObject(props[level], "STARTING_ROOMS", null);
        }
    }
}
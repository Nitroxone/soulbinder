/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class EnemyFormation {
    constructor(props) {
        this.name = getValueFromObject(props, "name", "");
        this.biome = getValueFromObject(props, "biome", Data.DungeonBiome.ALL);
        this.levels = getValueFromObject(props, "levels", [1, 2, 3, 4, 5]);
        this.formation = getValueFromObject(props, "formation", [null, null, null]);
        this.params = getValueFromObject(props, "params", {});
        this.type = getValueFromObject(props, "type", null);
    }
}
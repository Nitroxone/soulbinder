/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

class EnemyFormation {
    constructor(props) {
        this.name = getValueFromObject(props, "name", "");
        this.biome = getValueFromObject(props, "biome", Data.DungeonBiome.ALL);
        this.levels = getValueFromObject(props, "levels", [1, 2, 3, 4, 5]);
        this.formation = getValueFromObject(props, "formation", [null, null, null]);
        this.params = getValueFromObject(props, "params", null);
    }
}
class EnemyFormation {
    constructor(props) {
        this.name = getValueFromObject(props, "name", "");
        this.biome = getValueFromObject(props, "biome", Data.DungeonTagBiome.ALL);
        this.levels = getValueFromObject(props, "levels", [1, 2, 3, 4, 5]);
        this.formation = getValueFromObject(props, "formation", [null, null, null]);
        this.battleType = getValueFromObject(props, "battleType", Data.BattleType.GROUP);
        this.params = getValueFromObject(props, "params", null);
    }
}
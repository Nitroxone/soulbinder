/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class Enemy extends NPC {
    constructor(name,
                desc,
                charset,
                subname,
                health,
                mana,
                stamina,
                dodge,
                speed,
                accuracy,
                protection,
                might,
                spirit,
                resBleed,
                resPoison,
                resMove,
                resStun,
                resilience,
                warding,
                critEffects,
                variables,
                triggers,
                mobType,
                skills,
                behavior,
                drops = {},
                biome = Data.DungeonBiome.ALL
                ) {
        super(name, desc, charset, subname, health, mana, stamina, dodge, speed, accuracy, protection, might, spirit, resBleed, resPoison, resMove, resStun, resilience, warding, critEffects, variables, triggers);
        this.mobType = mobType;
        this.skills = skills;
        this.behavior = behavior;
        this.drops = drops;
        this.biome = biome;
    }
}
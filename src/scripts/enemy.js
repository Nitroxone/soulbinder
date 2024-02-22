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

        this.bindTriggers();
    }

    /**
     * Binds this Enemy's triggers' owner property manually.
     * Since enemies can be cloned, setting the owner to the enemy object would cause an exceeded cloning call stack.
     */
    bindTriggers() {
        this.triggers.forEach(trig => {
            trig.owner = this.id;
            trig.getOwner = function(){ return this; }
            trig.getOwner = trig.getOwner.bind(this);
        })
    }
}
/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class Enemy extends NPC {
    constructor(props = {}) {
        super(props);
        this.mobType = getValueFromObject(props, "mobType", Data.MobType.REGULAR);
        this.behavior = getValueFromObject(props, "behavior", new EnemyBehavior({}));
        this.drops = getValueFromObject(props, "drops", {});
        this.biome = getValueFromObject(props, "biome", Data.DungeonBiome.ALL);

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
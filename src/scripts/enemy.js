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
                mobType
                ) {
        super(name, desc, charset, subname, health, mana, stamina, dodge, speed, accuracy, protection, might, spirit, resBleed, resPoison, resMove, resStun, resilience, warding, critEffects, variables, triggers);
        this.mobType = mobType;
    }
}
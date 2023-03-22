class NPC extends Entity {
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
                ) {
        super(name, desc, 0);

        this.charset = charset;

        this.subname = subname;

        this.health = health;
        this.mana = mana;
        this.stamina = stamina;
        this.maxHealth = health;
        this.maxMana = mana;
        this.maxStamina = stamina;

        this.dodge = dodge;
        this.speed = speed;
        this.accuracy = accuracy;
        this.protection = protection;
        this.might = might;
        this.spirit = spirit;

        this.resBleed = resBleed;
        this.resPoison = resPoison;
        this.resMove = resMove;
        this.resStun = resStun;
        this.resilience = resilience;
        this.warding = warding;

        this.regenHealth = 0;
        this.regenMana = 0;
        this.regenStamina = 0;
        this.modifHealRecv = 0;
        this.modifHealGiven = 0;
        this.damageReflection = 0;
        this.modifBlock = 0;
        this.modifDmgTotal = 0;
        this.modifDmgWeapon = 0;
        this.modifDmgSkill = 0;
        this.modifDmgPoison = 0;
        this.modifDmgStun = 0;
        this.modifDmgBleed = 0;
        this.modifAccuracySkill = 0;
        this.modifAccuracyStun = 0;
        this.modifAccuracyBleed = 0;
        this.modifAccuracyPoison = 0;
        this.modifCritSkill = 0;
        this.modifCritStun = 0;
        this.modifCritBleed = 0;
        this.modifCritPoison = 0;

        this.critEffects = critEffects;
        this.variables = variables;
        this.triggers = triggers;

        this.activeEffects = [];
    }
}
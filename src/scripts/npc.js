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
                res_bleed,
                res_poison,
                res_move,
                res_stun,
                res_phys,
                res_magi,
                crit_effects,
                variables,
                triggers) {
        super(name, desc, charset);

        this.subname = subname;

        this.health = health;
        this.mana = mana;
        this.stamina = stamina;
        this.maxhealth = health;
        this.maxmana = mana;
        this.maxstamina = stamina;

        this.dodge = dodge;
        this.speed = speed;
        this.accuracy = accuracy;
        this.protection = protection;
        this.might = might;
        this.spirit = spirit;

        this.res_bleed = res_bleed;
        this.res_poison = res_poison;
        this.res_move = res_move;
        this.res_stun = res_stun;
        this.res_phys = res_phys;
        this.res_magi = res_magi;

        this.regen_health = 0;
        this.regen_mana = 0;
        this.regen_stamina = 0;
        this.modif_heal_recv = 0;
        this.modif_heal_given = 0;
        this.damage_reflection = 0;
        this.modif_total_dmg = 0;
        this.modif_weapon_dmg = 0;
        this.modif_block_value = 0;
        this.modif_skill_dmg = 0;
        this.modif_skill_accuracy = 0;
        this.modif_skill_crit = 0;
        this.modif_stun_dmg = 0;
        this.modif_stun_accuracy = 0;
        this.modif_stun_crit = 0;
        this.modif_bleed_dmg = 0;
        this.modif_bleed_accuracy = 0;
        this.modif_bleed_crit = 0;
        this.modif_poison_dmg = 0;
        this.modif_poison_accuracy = 0;
        this.modif_poison_crit = 0;
        
        this.crit_effects = crit_effects;
        this.variables = variables;
        this.triggers = triggers;

        this.active_effects = [];
    }
}
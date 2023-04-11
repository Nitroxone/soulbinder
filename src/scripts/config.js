let Config = {
    AstralForge: {
        // PERSISTENCE AND SUBSTRACT [persistence, substract]
        MAXHEALTH: [0, 1],
        MAXMANA: [0, 3],
        MAXSTAMINA: [0, 2],
        DODGE: [10, 5],
        SPEED: [5, 2],
        ACCURACY: [4, 2],
        PROTECTION: [6, 3],
        MIGHT: [6, 2],
        SPIRIT: [6, 3],
        DAMAGE_REFLECTION: [8, 6],
        // BLEED & POISON RESISTANCE STATS
        RES_BLEED_DMG: [4, 2],
        RES_BLEED_DURATION: [15, 10],
        RES_POISON_DMG: [4, 2],
        RES_POISON_DURATION: [15, 10],
        RES_STUN: [6, 3],
        RES_MOVE: [4, 2],
        // REGEN
        REGEN_HEALTH: [6, 4],
        REGEN_MANA: [7, 4],
        REGEN_STAMINA: [7, 3],
        // DAMAGE MODIFIERS
        MODIF_BLOCK: [3, 2],
        MODIF_DMG_TOTAL: [20, 10],
        MODIF_DMG_WEAPON: [18, 10],
        MODIF_DMG_SKILL: [12, 8],
        MODIF_DMG_STUN: [10, 6],
        MODIF_DMG_BLEED: [10, 4],
        MODIF_DMG_POISON: [10, 4],
        // ADDITIONAL MODIFIERS
        MODIF_HEAL_RECV: [6, 3],
        MODIF_HEAL_GIVEN: [6, 3],
        MODIF_ACCURACY_SKILL: [5, 2],
        MODIF_ACCURACY_STUN: [5, 2],
        MODIF_ACCURACY_BLEED: [5, 2],
        MODIF_ACCURACY_POISON: [5, 2],
        MODIF_CRIT_SKILL: [4, 2],
        MODIF_CRIT_STUN: [4, 2],
        MODIF_CRIT_BLEED: [4, 2],
        MODIF_CRIT_POISON: [4, 2],

        //------------------------------------------------------
        // ARMOR EFFECTS
        //------------------------------------------------------
        // BASE RESISTANCE
        RESILIENCE: [6, 3],
        WARDING: [6, 3],

        PDMG: [6, 3],
        MDMG: [6, 3],
        BLOCK: "block",
        EFFORT: "effort",
        CRIT_LUK: "crit. chance",
        CRIT_DMG: "crit. DMG",
        BLEED_DMG: "bleed damage",
        BLEED_DURATION: "bleed duration",
        BLEED_CURABLE: "makes bleed curable",
        BLEED_INCURABLE: "makes bleed incurable",
        POISON_DMG: "poison damage",
        POISON_DURATION: "poison duration",
        POISON_CURABLE: "makes poison curable",
        POISON_INCURABLE: "makes poison incurable",
        RANGE_FRONT_ON: "allows front range hits",
        RANGE_MIDDLE_ON: "allows middle range hits",
        RANGE_BACK_ON: "allows back range hits",
        RANGE_FRONT_OFF: "forbids front range hits",
        RANGE_MIDDLE_OFF: "forbids middle range hits",
        RANGE_BACK_OFF: "forbids back range hits",
    }
}
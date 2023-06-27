let Config = {
    AstralForge: {
        // PERSISTENCE, SUBSTRACT, MAXIMUM [persistence, substract, maximum]
        MAXHEALTH: [0, 1, 100],
        MAXMANA: [0, 3, 100],
        MAXSTAMINA: [0, 2, 100],
        DODGE: [10, 5, 1],
        SPEED: [5, 2, 3],
        ACCURACY: [4, 2, 3],
        PROTECTION: [6, 3, 3],
        MIGHT: [6, 2, 10],
        SPIRIT: [6, 3, 10],
        DAMAGE_REFLECTION: [8, 6, 5],
        // BLEED & POISON RESISTANCE STATS
        RES_BLEED_DMG: [4, 2, 1],
        RES_BLEED_DURATION: [15, 10, 1],
        RES_POISON_DMG: [4, 2, 1],
        RES_POISON_DURATION: [15, 10, 1],
        RES_STUN: [6, 3, 4],
        RES_MOVE: [4, 2, 4],
        // REGEN
        REGEN_HEALTH: [6, 4, 10],
        REGEN_MANA: [7, 4, 10],
        REGEN_STAMINA: [7, 3, 10],
        // DAMAGE MODIFIERS
        MODIF_BLOCK: [3, 2, 3],
        MODIF_DMG_TOTAL: [20, 10, 1],
        MODIF_DMG_WEAPON: [18, 10, 1],
        MODIF_DMG_SKILL: [12, 8, 1],
        MODIF_DMG_STUN: [10, 6, 1],
        MODIF_DMG_BLEED: [10, 4, 1],
        MODIF_DMG_POISON: [10, 4, 1],
        // ADDITIONAL MODIFIERS
        MODIF_HEAL_RECV: [6, 3, 5],
        MODIF_HEAL_GIVEN: [6, 3, 5],
        MODIF_ACCURACY_SKILL: [5, 2, 5],
        MODIF_ACCURACY_STUN: [5, 2, 5],
        MODIF_ACCURACY_BLEED: [5, 2, 5],
        MODIF_ACCURACY_POISON: [5, 2, 5],
        MODIF_CRIT_SKILL: [4, 2, 5],
        MODIF_CRIT_STUN: [4, 2, 5],
        MODIF_CRIT_BLEED: [4, 2, 5],
        MODIF_CRIT_POISON: [4, 2, 5],
        MODIF_CHANCE_STUN: [4, 3, 5],
        MODIF_CHANCE_MOVE: [4, 3, 5],

        //------------------------------------------------------
        // ARMOR EFFECTS
        //------------------------------------------------------
        // BASE RESISTANCE
        RESILIENCE: [6, 3, 10],
        WARDING: [6, 3, 10],

        // WEAPON EFFECTS
        PDMG: [6, 3, 10],
        MDMG: [6, 3, 10],
        BLOCK: [4, 1, 5],
        EFFORT: [4, 1, 4],
        CRIT_LUK: [6, 2, 3],
        CRIT_DMG: [6, 2, 4],
        BLEED_DMG: [6, 2, 4],
        BLEED_DURATION: [12, 6, 2],
        BLEED_CURABLE: [20, 7, 0],
        BLEED_INCURABLE: [20, 7, 0],
        POISON_DMG: [6, 2, 4],
        POISON_DURATION: [12, 6, 2],
        POISON_CURABLE: [20, 7, 0],
        POISON_INCURABLE: [20, 7, 0],
        RANGE_FRONT_ON: [20, 15, 0],
        RANGE_MIDDLE_ON: [20, 15, 0],
        RANGE_BACK_ON: [20, 15, 0],
        RANGE_FRONT_OFF: [20, 15, 0],
        RANGE_MIDDLE_OFF: [20, 15, 0],
        RANGE_BACK_OFF: [20, 15, 0],
    },
    EffectPercentage: {
        DODGE: true,
        ACCURACY: true,
        PROTECTION: true,
        RES_STUN: true,
        RES_MOVE: true,

        REGEN_HEALTH: true,
        REGEN_MANA: true,
        REGEN_STAMINA: true,

        // DAMAGE MODIFIERS
        MODIF_BLOCK: true,
        MODIF_DMG_TOTAL: true,
        MODIF_DMG_WEAPON: true,
        MODIF_DMG_SKILL: true,
        MODIF_DMG_STUN: true,
        MODIF_DMG_BLEED: true,
        MODIF_DMG_POISON: true,
        // ADDITIONAL MODIFIERS
        MODIF_HEAL_RECV: true,
        MODIF_HEAL_GIVEN: true,
        MODIF_ACCURACY_SKILL: true,
        MODIF_ACCURACY_STUN: true,
        MODIF_ACCURACY_BLEED: true,
        MODIF_ACCURACY_POISON: true,
        MODIF_CRIT_SKILL: true,
        MODIF_CRIT_STUN: true,
        MODIF_CRIT_BLEED: true,
        MODIF_CRIT_POISON: true,
        MODIF_CHANCE_STUN: true,
        MODIF_CHANCE_MOVE: true,

        CRIT_LUK: true, 
    },
    OverloadAvailable: [
        Data.Effect.MAXHEALTH,
        Data.Effect.MAXMANA,
        Data.Effect.MAXSTAMINA,
        Data.Effect.DODGE,
        Data.Effect.SPEED,
        Data.Effect.ACCURACY,
        Data.Effect.PROTECTION,
        Data.Effect.MIGHT,
        Data.Effect.SPIRIT,
        Data.Effect.DAMAGE_REFLECTION,
        Data.Effect.RES_BLEED_DMG,
        Data.Effect.RES_BLEED_DURATION,
        Data.Effect.RES_POISON_DMG,
        Data.Effect.RES_POISON_DURATION,
        Data.Effect.RES_STUN,
        Data.Effect.RES_MOVE,
        Data.Effect.REGEN_HEALTH,
        Data.Effect.REGEN_MANA,
        Data.Effect.REGEN_STAMINA,
        Data.Effect.MODIF_BLOCK,
        Data.Effect.MODIF_DMG_TOTAL,
        Data.Effect.MODIF_DMG_WEAPON,
        Data.Effect.MODIF_DMG_SKILL,
        Data.Effect.MODIF_DMG_STUN,
        Data.Effect.MODIF_DMG_BLEED,
        Data.Effect.MODIF_DMG_POISON,
        Data.Effect.MODIF_HEAL_RECV,
        Data.Effect.MODIF_HEAL_GIVEN,
        Data.Effect.MODIF_ACCURACY_SKILL,
        Data.Effect.MODIF_ACCURACY_STUN,
        Data.Effect.MODIF_ACCURACY_BLEED,
        Data.Effect.MODIF_ACCURACY_POISON,
        Data.Effect.MODIF_CRIT_SKILL,
        Data.Effect.MODIF_CRIT_STUN,
        Data.Effect.MODIF_CRIT_BLEED,
        Data.Effect.MODIF_CRIT_POISON,
        Data.Effect.MODIF_CHANCE_STUN,
        Data.Effect.MODIF_CHANCE_MOVE,
        Data.Effect.RESILIENCE,
        Data.Effect.WARDING,
    ],
    Soulwriting: {
        // THEORICAL, CRITICAL, CORRUPTED, UNLOCKED
        MAXHEALTH: {
            theorical: [20, 30],
            critical: new Stat({effect: Data.Effect.REGEN_HEALTH, theorical: 1, isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.REGEN_HEALTH, theorical: -1, isPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        MAXMANA: {
            theorical: [20, 30],
            critical: new Stat({effect: Data.Effect.REGEN_MANA, theorical: 1, isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.REGEN_MANA, theorical: -1, isPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        MAXSTAMINA: {
            theorical: [20, 30],
            critical: new Stat({effect: Data.Effect.REGEN_STAMINA, theorical: 1, isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.REGEN_STAMINA, theorical: -1, isPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        DODGE: {
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.ACCURACY, theorical: [1, 3], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.ACCURACY, theorical: [-1, -3], isPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        SPEED: {
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.RES_MOVE, theorical: [1, 3], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_MOVE, theorical: [-1, -3], isPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        ACCURACY: {
            theorical: [5, 7],
            critical: new Stat({effect: Data.Effect.DODGE, theorical: 1, isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.DODGE, theorical: -1, isPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        PROTECTION: {
            theorical: [6, 10],
            critical: new Stat({effect: Data.Effect.DAMAGE_REFLECTION, theorical: [1, 3], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MAXHEALTH, theorical: [-10, -25], isPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        MIGHT: {
            theorical: [8, 10],
            critical: new Stat({effect: Data.Effect.MODIF_DMG_WEAPON, theorical: [1, 3], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_DMG_WEAPON, theorical: [-1, -3], isPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        SPIRIT: {
            theorical: [8, 10],
            critical: new Stat({effect: Data.Effect.MODIF_DMG_SKILL, theorical: [1, 3], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_DMG_SKILL, theorical: [-1, -3], isPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        DAMAGE_REFLECTION: {
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.PROTECTION, theorical: [1, 3], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.PROTECTION, theorical: [-1, -3], isPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        // BLEED & POISON RESISTANCE STATS
        RES_BLEED_DMG: {
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.RES_POISON_DMG, theorical: [1, 3], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_POISON_DMG, theorical: [-1, -3], isCorrupt: true}),
            unlocked: false
        },
        RES_BLEED_DURATION: {
            theorical: 1,
            critical: new Stat({effect: Data.Effect.RES_POISON_DURATION, theorical: 1, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_POISON_DURATION, theorical: -1, isCorrupt: true}),
            unlocked: false
        },
        RES_POISON_DMG: {
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.RES_BLEED_DMG, theorical: [1, 3], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_BLEED_DMG, theorical: [-1, -3], isCorrupt: true}),
            unlocked: false
        },
        RES_POISON_DURATION: {
            theorical: 1,
            critical: new Stat({effect: Data.Effect.RES_BLEED_DURATION, theorical: 1, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_BLEED_DURATION, theorical: -1, isCorrupt: true}),
            unlocked: false
        },
        RES_STUN: {
            theorical: [5, 10],
            critical: new Stat({effect: Data.Effect.MODIF_CHANCE_STUN, theorical: [2, 4], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_CHANCE_STUN, theorical: [-2, -4], isCorrupt: true}),
            unlocked: false
        },
        RES_MOVE: {
            theorical: [5, 10],
            critical: new Stat({effect: Data.Effect.MODIF_CHANCE_MOVE, theorical: [2, 4], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_CHANCE_MOVE, theorical: [-2, -4], isCorrupt: true}),
            unlocked: false
        },
        // REGEN
        REGEN_HEALTH: {
            theorical: [4, 6],
            critical: new Stat({effect: Data.Effect.MAXHEALTH, theorical: [40, 50], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.PROTECTION, theorical: [-2, -4], isPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        REGEN_MANA: {
            theorical: [4, 6],
            critical: new Stat({effect: Data.Effect.MAXMANA, theorical: [40, 50], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.SPIRIT, theorical: [-5, -10], isCorrupt: true}),
            unlocked: false
        },
        REGEN_STAMINA: {
            theorical: [4, 6],
            critical: new Stat({effect: Data.Effect.MAXSTAMINA, theorical: [40, 50], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MIGHT, theorical: [-5, -10], isCorrupt: true}),
            unlocked: false
        },
        // DAMAGE MODIFIERS
        MODIF_BLOCK: {
            theorical: [4, 6],
            critical: new Stat({effect: Data.Effect.DODGE, theorical: [2, 4], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.PROTECTION, theorical: [-2, -5], isPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        MODIF_DMG_TOTAL: {
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.PROTECTION, theorical: [2, 4], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.PROTECTION, theorical: [-2, -5], isPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        MODIF_DMG_WEAPON: {
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.MIGHT, theorical: [2, 4], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MIGHT, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false
        },
        MODIF_DMG_SKILL: {
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.SPIRIT, theorical: [2, 4], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.SPIRIT, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false
        },
        MODIF_DMG_STUN: {
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.MODIF_CHANCE_STUN, theorical: [2, 4], iSPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_CHANCE_STUN, theorical: [-2, -5], isPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        MODIF_DMG_BLEED: {
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.MODIF_ACCURACY_BLEED, theorical: [1, 2], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_BLEED_DMG, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false
        },
        MODIF_DMG_POISON: {
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.MODIF_ACCURACY_POISON, theorical: [1, 2], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_POISON_DMG, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false
        },
        // ADDITIONAL MODIFIERS
        MODIF_HEAL_RECV: {
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.REGEN_HEALTH, theorical: [1, 2], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MAXHEALTH, theorical: [-20, -25], isCorrupt: true}),
            unlocked: false
        },
        MODIF_HEAL_GIVEN: {
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.PROTECTION, theorical: [4, 6], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.DODGE, theorical: [-3, -6], iSPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        MODIF_ACCURACY_SKILL: {
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.MODIF_CRIT_SKILL, theorical: [4, 6], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_CRIT_SKILL, theorical: [-2, -4], iSPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        MODIF_ACCURACY_STUN: {
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.MODIF_CRIT_STUN, theorical: [4, 6], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_CRIT_STUN, theorical: [-2, -4], iSPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        MODIF_ACCURACY_BLEED: {
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.MODIF_CRIT_BLEED, theorical: [4, 6], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_CRIT_BLEED, theorical: [-2, -4], iSPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        MODIF_ACCURACY_POISON: {
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.MODIF_CRIT_POISON, theorical: [4, 6], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_CRIT_POISON, theorical: [-2, -4], iSPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        MODIF_CRIT_SKILL: {
            theorical: [5, 8],
            critical: new Stat({effect: Data.Effect.MODIF_DMG_SKILL, theorical: [3, 5], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_DMG_SKILL, theorical: [-2, -4], iSPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        MODIF_CRIT_STUN: {
            theorical: [5, 8],
            critical: new Stat({effect: Data.Effect.MODIF_DMG_STUN, theorical: [3, 5], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_DMG_STUN, theorical: [-2, -4], iSPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        MODIF_CRIT_BLEED: {
            theorical: [5, 8],
            critical: new Stat({effect: Data.Effect.MODIF_DMG_BLEED, theorical: [3, 5], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_DMG_BLEED, theorical: [-2, -4], iSPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        MODIF_CRIT_POISON: {
            theorical: [5, 8],
            critical: new Stat({effect: Data.Effect.MODIF_DMG_POISON, theorical: [3, 5], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_DMG_POISON, theorical: [-2, -4], iSPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        MODIF_CHANCE_STUN: {
            theorical: [5, 8],
            critical: new Stat({effect: Data.Effect.MODIF_DMG_STUN, theorical: [3, 5], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_STUN, theorical: [-2, -4], iSPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        MODIF_CHANCE_MOVE: {
            theorical: [5, 8],
            critical: new Stat({effect: Data.Effect.DODGE, theorical: [3, 5], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_MOVE, theorical: [-2, -4], iSPercentage: true, isCorrupt: true}),
            unlocked: false
        },

        //------------------------------------------------------
        // ARMOR EFFECTS
        //------------------------------------------------------
        // BASE RESISTANCE
        RESILIENCE: {
            theorical: [8, 12],
            critical: new Stat({effect: Data.Effect.WARDING, theorical: [4, 7], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.WARDING, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false
        },
        WARDING: {
            theorical: [8, 12],
            critical: new Stat({effect: Data.Effect.RESILIENCE, theorical: [4, 7], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RESILIENCE, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false
        },

        // WEAPON EFFECTS
        PDMG: {
            theorical: [6, 10],
            critical: new Stat({effect: Data.Effect.CRIT_DMG, theorical: [4, 7], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.CRIT_DMG, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false
        },
        MDMG: {
            theorical: [6, 10],
            critical: new Stat({effect: Data.Effect.CRIT_LUK, theorical: [4, 7], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.CRIT_LUK, theorical: [-2, -5], isPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        BLOCK: {
            theorical: [3, 6],
            critical: new Stat({effect: Data.Effect.EFFORT, theorical: [-2, -3], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.CRIT_LUK, theorical: [2, 3], isCorrupt: true}),
            unlocked: false
        },
        EFFORT: {
            theorical: [-2, -4],
            critical: new Stat({effect: Data.Effect.CRIT_DMG, theorical: [4, 7], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.CRIT_DMG, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false
        },
        CRIT_LUK: {
            theorical: [6, 10],
            critical: new Stat({effect: Data.Effect.CRIT_DMG, theorical: [4, 7], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.CRIT_DMG, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false
        },
        CRIT_DMG: {
            theorical: [6, 10],
            critical: new Stat({effect: Data.Effect.CRIT_LUK, theorical: [4, 7], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.CRIT_LUK, theorical: [-2, -5], isPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        BLEED_DMG: {
            theorical: [3, 6],
            critical: new Stat({effect: Data.Effect.BLEED_DURATION, theorical: 1, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.PDMG, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false
        },
        BLEED_DURATION: {
            theorical: [3, 6],
            critical: new Stat({effect: Data.Effect.BLEED_DMG, theorical: [2, 3], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.BLEED_DMG, theorical: [-2, -3], isCorrupt: true}),
            unlocked: false
        },
        BLEED_INCURABLE: {
            theorical: 0,
            critical: new Stat({effect: Data.Effect.BLEED_DMG, theorical: [2, 3], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.BLEED_DMG, theorical: [-2, -3], isCorrupt: true}),
            unlocked: false
        },
        POISON_DMG: {
            theorical: [3, 6],
            critical: new Stat({effect: Data.Effect.POISON_DURATION, theorical: 1, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MDMG, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false
        },
        POISON_DURATION: {
            theorical: [3, 6],
            critical: new Stat({effect: Data.Effect.POISON_DMG, theorical: [2, 3], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.POISON_DMG, theorical: [-2, -3], isCorrupt: true}),
            unlocked: false
        },
        POISON_INCURABLE: {
            theorical: 0,
            critical: new Stat({effect: Data.Effect.POISON_DMG, theorical: [2, 3], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.POISON_DMG, theorical: [-2, -3], isCorrupt: true}),
            unlocked: false
        },
        RANGE_FRONT_ON: {
            theorical: 0,
            critical: new Stat({effect: Data.Effect.CRIT_LUK, theorical: [2, 3], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.EFFORT, theorical: [4, 6], isCorrupt: true}),
            unlocked: false
        },
        RANGE_MIDDLE_ON: {
            theorical: 0,
            critical: new Stat({effect: Data.Effect.PDMG, theorical: [4, 6], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.ACCURACY, theorical: [-4, -6], isPercentage: true, isCorrupt: true}),
            unlocked: false
        },
        RANGE_BACK_ON: {
            theorical: 0,
            critical: new Stat({effect: Data.Effect.MDMG, theorical: [4, 6], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MDMG, theorical: [-4, -6], isCorrupt: true}),
            unlocked: false
        },
    }
}
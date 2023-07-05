/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

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
    Soulwriting: [
        // THEORICAL, CRITICAL, CORRUPTED, UNLOCKED
        {
            effect: Data.Effect.MAXHEALTH,
            name: "youth",
            theorical: [20, 30],
            critical: new Stat({effect: Data.Effect.REGEN_HEALTH, theorical: 1, isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.REGEN_HEALTH, theorical: -1, isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.COMMON
        },
        {
            effect: Data.Effect.MAXMANA,
            name: "wisdom",
            theorical: [20, 30],
            critical: new Stat({effect: Data.Effect.REGEN_MANA, theorical: 1, isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.REGEN_MANA, theorical: -1, isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 6,
            rarity: Data.Rarity.COMMON
        },
        {
            effect: Data.Effect.MAXSTAMINA,
            name: "endurance",
            theorical: [20, 30],
            critical: new Stat({effect: Data.Effect.REGEN_STAMINA, theorical: 1, isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.REGEN_STAMINA, theorical: -1, isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 6,
            rarity: Data.Rarity.COMMON
        },
        {
            effect: Data.Effect.DODGE,
            name: "zeal",
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.ACCURACY, theorical: [1, 3], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.ACCURACY, theorical: [-1, -3], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 8,
            rarity: Data.Rarity.UNCOMMON
        },
        {
            effect: Data.Effect.SPEED,
            name: "alacrity",
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.RES_MOVE, theorical: [1, 3], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_MOVE, theorical: [-1, -3], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 8,
            rarity: Data.Rarity.UNCOMMON
        },
        {
            effect: Data.Effect.ACCURACY,
            name: "bullseye",
            theorical: [5, 7],
            critical: new Stat({effect: Data.Effect.DODGE, theorical: 1, isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.DODGE, theorical: -1, isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 8,
            rarity: Data.Rarity.COMMON
        },
        {
            effect: Data.Effect.PROTECTION,
            name: "bastion",
            theorical: [6, 10],
            critical: new Stat({effect: Data.Effect.DAMAGE_REFLECTION, theorical: [1, 3], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MAXHEALTH, theorical: [-10, -25], isCorrupt: true}),
            unlocked: false,
            price: 8,
            rarity: Data.Rarity.UNCOMMON
        },
        {
            effect: Data.Effect.MIGHT,
            name: "valor",
            theorical: [8, 10],
            critical: new Stat({effect: Data.Effect.MODIF_DMG_WEAPON, theorical: [1, 3], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_DMG_WEAPON, theorical: [-1, -3], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 8,
            rarity: Data.Rarity.UNCOMMON
        },
        {
            effect: Data.Effect.SPIRIT,
            name: "potency",
            theorical: [8, 10],
            critical: new Stat({effect: Data.Effect.MODIF_DMG_SKILL, theorical: [1, 3], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_DMG_SKILL, theorical: [-1, -3], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 8,
            rarity: Data.Rarity.UNCOMMON
        },
        {
            effect: Data.Effect.DAMAGE_REFLECTION,
            name: "thorns",
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.PROTECTION, theorical: [1, 3], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.PROTECTION, theorical: [-1, -3], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 15,
            rarity: Data.Rarity.LEGENDARY
        },
        // BLEED & POISON RESISTANCE STATS
        {
            effect: Data.Effect.RES_BLEED_DMG,
            name: "vigorous",
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.RES_POISON_DMG, theorical: [1, 3], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_POISON_DMG, theorical: [-1, -3], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.RARE
        },
        {
            effect: Data.Effect.RES_BLEED_DURATION,
            name: "coagulation",
            theorical: 1,
            critical: new Stat({effect: Data.Effect.RES_POISON_DURATION, theorical: 1, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_POISON_DURATION, theorical: -1, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },
        {
            effect: Data.Effect.RES_POISON_DMG,
            name: "purity",
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.RES_BLEED_DMG, theorical: [1, 3], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_BLEED_DMG, theorical: [-1, -3], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.RARE
        },
        {
            effect: Data.Effect.RES_POISON_DURATION,
            name: "metabolic",
            theorical: 1,
            critical: new Stat({effect: Data.Effect.RES_BLEED_DURATION, theorical: 1, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_BLEED_DURATION, theorical: -1, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },
        {
            effect: Data.Effect.RES_STUN,
            name: "ironskull",
            theorical: [5, 10],
            critical: new Stat({effect: Data.Effect.MODIF_CHANCE_STUN, theorical: [2, 4], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_CHANCE_STUN, theorical: [-2, -4], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.RARE
        },
        {
            effect: Data.Effect.RES_MOVE,
            name: "stability",
            theorical: [5, 10],
            critical: new Stat({effect: Data.Effect.MODIF_CHANCE_MOVE, theorical: [2, 4], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_CHANCE_MOVE, theorical: [-2, -4], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.RARE
        },
        // REGEN
        {
            effect: Data.Effect.REGEN_HEALTH,
            name: "miracle",
            theorical: [4, 6],
            critical: new Stat({effect: Data.Effect.MAXHEALTH, theorical: [40, 50], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.PROTECTION, theorical: [-2, -4], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },
        {
            effect: Data.Effect.REGEN_MANA,
            name: "sentience",
            theorical: [4, 6],
            critical: new Stat({effect: Data.Effect.MAXMANA, theorical: [40, 50], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.SPIRIT, theorical: [-5, -10], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },
        {
            effect: Data.Effect.REGEN_STAMINA,
            name: "tolerance",
            theorical: [4, 6],
            critical: new Stat({effect: Data.Effect.MAXSTAMINA, theorical: [40, 50], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MIGHT, theorical: [-5, -10], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },
        // DAMAGE MODIFIERS
        {
            effect: Data.Effect.MODIF_BLOCK,
            name: "barrier",
            theorical: [4, 6],
            critical: new Stat({effect: Data.Effect.DODGE, theorical: [2, 4], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.PROTECTION, theorical: [-2, -5], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.RARE
        },
        {
            effect: Data.Effect.MODIF_DMG_TOTAL,
            name: "ferocity",
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.PROTECTION, theorical: [2, 4], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.PROTECTION, theorical: [-2, -5], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.LEGENDARY
        },
        {
            effect: Data.Effect.MODIF_DMG_WEAPON,
            name: "dexterity",
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.MIGHT, theorical: [2, 4], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MIGHT, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },
        {
            effect: Data.Effect.MODIF_DMG_SKILL,
            name: "influence",
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.SPIRIT, theorical: [2, 4], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.SPIRIT, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },
        {
            effect: Data.Effect.MODIF_DMG_STUN,
            name: "opportunity",
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.MODIF_CHANCE_STUN, theorical: [2, 4], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_CHANCE_STUN, theorical: [-2, -5], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },
        {
            effect: Data.Effect.MODIF_DMG_BLEED,
            name: "dissolution",
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.MODIF_ACCURACY_BLEED, theorical: [1, 2], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_BLEED_DMG, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },
        {
            effect: Data.Effect.MODIF_DMG_POISON,
            name: "corrosion",
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.MODIF_ACCURACY_POISON, theorical: [1, 2], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_POISON_DMG, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },
        // ADDITIONAL MODIFIERS
        {
            effect: Data.Effect.MODIF_HEAL_RECV,
            name: "mending",
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.REGEN_HEALTH, theorical: [1, 2], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MAXHEALTH, theorical: [-20, -25], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },
        {
            effect: Data.Effect.MODIF_HEAL_GIVEN,
            name: "nursing",
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.PROTECTION, theorical: [4, 6], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.DODGE, theorical: [-3, -6], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },
        {
            effect: Data.Effect.MODIF_ACCURACY_SKILL,
            name: "veracity",
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.MODIF_CRIT_SKILL, theorical: [4, 6], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_CRIT_SKILL, theorical: [-2, -4], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.RARE
        },
        {
            effect: Data.Effect.MODIF_ACCURACY_STUN,
            name: "targeting",
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.MODIF_CRIT_STUN, theorical: [4, 6], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_CRIT_STUN, theorical: [-2, -4], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.RARE
        },
        {
            effect: Data.Effect.MODIF_ACCURACY_BLEED,
            name: "harassment",
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.MODIF_CRIT_BLEED, theorical: [4, 6], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_CRIT_BLEED, theorical: [-2, -4], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.RARE
        },
        {
            effect: Data.Effect.MODIF_ACCURACY_POISON,
            name: "prey",
            theorical: [2, 4],
            critical: new Stat({effect: Data.Effect.MODIF_CRIT_POISON, theorical: [4, 6], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_CRIT_POISON, theorical: [-2, -4], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.RARE
        },
        {
            effect: Data.Effect.MODIF_CRIT_SKILL,
            name: "focus",
            theorical: [5, 8],
            critical: new Stat({effect: Data.Effect.MODIF_DMG_SKILL, theorical: [3, 5], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_DMG_SKILL, theorical: [-2, -4], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.RARE
        },
        {
            effect: Data.Effect.MODIF_CRIT_STUN,
            name: "trauma",
            theorical: [5, 8],
            critical: new Stat({effect: Data.Effect.MODIF_DMG_STUN, theorical: [3, 5], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_DMG_STUN, theorical: [-2, -4], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.RARE
        },
        {
            effect: Data.Effect.MODIF_CRIT_BLEED,
            name: "ooze",
            theorical: [5, 8],
            critical: new Stat({effect: Data.Effect.MODIF_DMG_BLEED, theorical: [3, 5], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_DMG_BLEED, theorical: [-2, -4], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.RARE
        },
        {
            effect: Data.Effect.MODIF_CRIT_POISON,
            name: "causticity",
            theorical: [5, 8],
            critical: new Stat({effect: Data.Effect.MODIF_DMG_POISON, theorical: [3, 5], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MODIF_DMG_POISON, theorical: [-2, -4], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.RARE
        },
        {
            effect: Data.Effect.MODIF_CHANCE_STUN,
            name: "bluntforce",
            theorical: [5, 8],
            critical: new Stat({effect: Data.Effect.MODIF_DMG_STUN, theorical: [3, 5], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_STUN, theorical: [-2, -4], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },
        {
            effect: Data.Effect.MODIF_CHANCE_MOVE,
            name: "tackle",
            theorical: [5, 8],
            critical: new Stat({effect: Data.Effect.DODGE, theorical: [3, 5], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RES_MOVE, theorical: [-2, -4], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },

        //------------------------------------------------------
        // ARMOR EFFECTS
        //------------------------------------------------------
        // BASE RESISTANCE
        {
            effect: Data.Effect.RESILIENCE,
            name: "tenacity",
            theorical: [8, 12],
            critical: new Stat({effect: Data.Effect.WARDING, theorical: [4, 7], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.WARDING, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.RARE
        },
        {
            effect: Data.Effect.WARDING,
            name: "conservation",
            theorical: [8, 12],
            critical: new Stat({effect: Data.Effect.RESILIENCE, theorical: [4, 7], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.RESILIENCE, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.RARE
        },

        // WEAPON EFFECTS
        {
            effect: Data.Effect.PDMG,
            name: "honing",
            theorical: [6, 10],
            critical: new Stat({effect: Data.Effect.CRIT_DMG, theorical: [4, 7], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.CRIT_DMG, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.COMMON
        },
        {
            effect: Data.Effect.MDMG,
            name: "decadence",
            theorical: [6, 10],
            critical: new Stat({effect: Data.Effect.CRIT_LUK, theorical: [4, 7], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.CRIT_LUK, theorical: [-2, -5], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.COMMON
        },
        {
            effect: Data.Effect.BLOCK,
            name: "stronghold",
            theorical: [3, 6],
            critical: new Stat({effect: Data.Effect.EFFORT, theorical: [-2, -3], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.CRIT_LUK, theorical: [-2, -3], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.UNCOMMON
        },
        {
            effect: Data.Effect.EFFORT,
            name: "handling",
            theorical: [-2, -4],
            critical: new Stat({effect: Data.Effect.CRIT_DMG, theorical: [4, 7], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.CRIT_DMG, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.UNCOMMON
        },
        {
            effect: Data.Effect.CRIT_LUK,
            name: "piercing",
            theorical: [6, 10],
            critical: new Stat({effect: Data.Effect.CRIT_DMG, theorical: [4, 7], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.CRIT_DMG, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.RARE
        },
        {
            effect: Data.Effect.CRIT_DMG,
            name: "shrill",
            theorical: [6, 10],
            critical: new Stat({effect: Data.Effect.CRIT_LUK, theorical: [4, 7], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.CRIT_LUK, theorical: [-2, -5], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.RARE
        },
        {
            effect: Data.Effect.BLEED_DMG,
            name: "cutting",
            theorical: [3, 6],
            critical: new Stat({effect: Data.Effect.BLEED_DURATION, theorical: 1, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.PDMG, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },
        {
            effect: Data.Effect.BLEED_DURATION,
            name: "hemophilia",
            theorical: [3, 6],
            critical: new Stat({effect: Data.Effect.BLEED_DMG, theorical: [2, 3], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.BLEED_DMG, theorical: [-2, -3], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },
        {
            effect: Data.Effect.BLEED_INCURABLE,
            name: "haemorrhage",
            theorical: 0,
            critical: new Stat({effect: Data.Effect.BLEED_DMG, theorical: [2, 3], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.BLEED_DMG, theorical: [-2, -3], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.LEGENDARY
        },
        {
            effect: Data.Effect.POISON_DMG,
            name: "venom",
            theorical: [3, 6],
            critical: new Stat({effect: Data.Effect.POISON_DURATION, theorical: 1, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MDMG, theorical: [-2, -5], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },
        {
            effect: Data.Effect.POISON_DURATION,
            name: "dilution",
            theorical: [3, 6],
            critical: new Stat({effect: Data.Effect.POISON_DMG, theorical: [2, 3], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.POISON_DMG, theorical: [-2, -3], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.EPIC
        },
        {
            effect: Data.Effect.POISON_INCURABLE,
            name: "plague",
            theorical: 0,
            critical: new Stat({effect: Data.Effect.POISON_DMG, theorical: [2, 3], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.POISON_DMG, theorical: [-2, -3], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.LEGENDARY
        },
        {
            effect: Data.Effect.RANGE_FRONT_ON,
            name: "shortblow",
            theorical: 0,
            critical: new Stat({effect: Data.Effect.CRIT_LUK, theorical: [2, 3], isPercentage: true, isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.EFFORT, theorical: [4, 6], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.LEGENDARY
        },
        {
            effect: Data.Effect.RANGE_MIDDLE_ON,
            name: "midblow",
            theorical: 0,
            critical: new Stat({effect: Data.Effect.PDMG, theorical: [4, 6], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.ACCURACY, theorical: [-4, -6], isPercentage: true, isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.LEGENDARY
        },
        {
            effect: Data.Effect.RANGE_BACK_ON,
            name: "longblow",
            theorical: 0,
            critical: new Stat({effect: Data.Effect.MDMG, theorical: [4, 6], isCritical: true}),
            corrupted: new Stat({effect: Data.Effect.MDMG, theorical: [-4, -6], isCorrupt: true}),
            unlocked: false,
            price: 5,
            rarity: Data.Rarity.LEGENDARY
        },
    ]
}
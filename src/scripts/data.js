/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

/**
 * This variable contains all the data that is required for the game engine to work properly.
 * It essentially contains vocabulary, but also color codes and file names.
 * @author ntrx
 */

const Data = Object.freeze({
    Charset: {
        AMAROK: 'amarok.png',
        BETHEROS: 'betheros.png',
        BRIM: 'brim.png',
        CARHAL: 'carhal.png',
        IFRIN: 'ifrin.png',
        NAKA: 'naka.png',
        ARAZOTH: 'arazoth.png',
        HAMAN: 'haman.png',
        ZURIJ: 'zurij.png',
        JUBA_JUN: 'juba_jun.png',
        MIRAI: 'mirai.png',
        KHEJ: "khej.png",

        UNSLEEPER: 'unsleeper.png',
        MYCELIAL_TICK: 'mycelial_tick.png',
        FUNGALIANT: 'fungaliant.png',
        GNARLY_HORROR: 'gnarly_horror.png',
    },
    Color: {
        GREEN: '#4cd137',
        RED: '#e84118',
        BLUE: '#0097e6',
        CRITICAL_EFF: '#ece2b6',
        TURQUOISE: '#1abc9c',
        ORANGE: '#ccaa08',
        PURPLE: '#bf40bf',

        CORRUPT: '#c10000',
        REGULAR: '#dddddd',
        SINGULAR: '#00ff00',
        PRECIOUS: '#00ddff',
        GRAND: '#ff00ff',
        MYTHIC: '#ffaa00',
        RELIC: '#fb3e8d',
        
        OVERLOADED: '#6ebe55',
        OVERLOAD: '#0097e6',

        GOLD: 'yellow',
    },
    Effect: {
        //------------------------------------------------------
        // NPC EFFECTS
        //------------------------------------------------------
        // BASE STATS     
        HEALTH: "health",
        MANA: "mana",
        STAMINA: "stamina",
        MAXHEALTH: "max. health",
        MAXMANA: "max. mana",
        MAXSTAMINA: "max. stamina",
        DODGE: "dodge",
        SPEED: "speed",
        ACCURACY: "accuracy",
        PROTECTION: "protection",
        MIGHT: "might",
        SPIRIT: "spirit",
        DAMAGE_REFLECTION: "damage reflection",
        // BLEED & POISON RESISTANCE STATS
        RES_BLEED_DMG: "bleed damage res.",
        RES_BLEED_DURATION: "bleed duration res.",
        RES_POISON_DMG: "poison damage res.",
        RES_POISON_DURATION: "poison duration res.",
        RES_STUN: "stun resistance",
        RES_MOVE: "move resistance",
        // REGEN
        REGEN_HEALTH: "health regeneration",
        REGEN_MANA: "mana regeneration",
        REGEN_STAMINA: "stamina regeneration",
        // DAMAGE MODIFIERS
        MODIF_BLOCK: "block value",
        MODIF_DMG_TOTAL: "total damage",
        MODIF_DMG_WEAPON: "weapon damage",
        MODIF_DMG_SKILL: "skill damage",
        MODIF_DMG_STUN: "stun damage",
        MODIF_DMG_BLEED: "bleed damage",
        MODIF_DMG_POISON: "poison damage",
        // ADDITIONAL MODIFIERS
        MODIF_HEAL_RECV: "received heal",
        MODIF_HEAL_GIVEN: "given heal",
        MODIF_ACCURACY_SKILL: "skill accuracy",
        MODIF_ACCURACY_STUN: "stun accuracy",
        MODIF_ACCURACY_BLEED: "bleed accuracy",
        MODIF_ACCURACY_POISON: "poison accuracy",
        MODIF_CRIT_SKILL: "skill crit. chance",
        MODIF_CRIT_STUN: "stun crit. chance",
        MODIF_CRIT_BLEED: "bleed crit. chance",
        MODIF_CRIT_POISON: "poison crit. chance",
        MODIF_CHANCE_STUN: "stun chance",
        MODIF_CHANCE_MOVE: "move chance",

        //------------------------------------------------------
        // ARMOR EFFECTS
        //------------------------------------------------------
        // BASE RESISTANCE
        RESILIENCE: "resilience",
        WARDING: "warding",

        //------------------------------------------------------
        // WEAPON EFFECTS
        //------------------------------------------------------
        SHARPNESS: "sharpness",
        WITHERING: "withering",
        BLOCK: "block",
        EFFORT: "effort",
        CRIT_LUK: "crit. chance",
        CRIT_DMG: "crit. damage",
        BLEED_DMG: "bleed intensity",
        BLEED_DURATION: "bleed duration",
        BLEED_CURABLE: "makes bleed curable",
        BLEED_INCURABLE: "makes bleed incurable",
        POISON_DMG: "poison intensity",
        POISON_DURATION: "poison duration",
        POISON_CURABLE: "makes poison curable",
        POISON_INCURABLE: "makes poison incurable",
        RANGE_FRONT_ON: "allows front range hits",
        RANGE_MIDDLE_ON: "allows middle range hits",
        RANGE_BACK_ON: "allows back range hits",
        RANGE_FRONT_OFF: "forbids front range hits",
        RANGE_MIDDLE_OFF: "forbids middle range hits",
        RANGE_BACK_OFF: "forbids back range hits",

        SWORD_SHARPNESS: "swords sharpness",
        SWORD_WITHERING: "swords withering",

        // CRAFTING EFFECTS
        CRAFTING_TRINKET_CORRUPTION: "trinket corruption chance",
        CRAFTING_SIGIL_CRIT: "critical sigil effect chance",
        CRAFTING_SIGIL_CORRUPTION: "sigil corruption chance",

        // SPELL EFFECTS
        SPELL_DMG: "spell damage",

        // MISCELLANEOUS EFFECTS
        WIELD_TWO_HEAVY_WEAPONS: "allows dual heavy weapon wielding",
        LOOTING_TRINKET_CORRUPTION: "looted trinkets corruption chance",
        POST_FIGHT_HEALTH: "post-fight health",
        POST_FIGHT_MANA: "post-fight mana",
        POST_FIGHT_STAMINA: "post-fight stamina",

        // COMBAT EFFECTS
        BLEEDING_CURABLE: "bleeding",
        BLEEDING_INCURABLE: "incurable bleeding",
        BLIGHT_CURABLE: "blight",
        BLIGHT_INCURABLE: "incurable blight",
        PULL_ONE: "pulls forward one position",
        PULL_TWO: "pulls forward two positions",
        PUSH_ONE: "pushes back one position",
        PUSH_TWO: "pushes back two positions",
        FRONT_ONE: "advances one position",
        FRONT_TWO: "advances two positions",
        BACK_ONE: "backs one position",
        BACK_TWO: "backs two positions",
        SHIELD: "shield",
        HEALTH_STEAL: "health steal",
        MANA_STEAL: "mana steal",
        STAMINA_STEAL: "stamina steal",
        STUN: "stuns the target",
        GUARDING: "Guarding",
        GUARDED: "Guarded",

        // CONSUMABLES EFFECTS:
        REMOVES_PROTECTION_DEBUFFS: "removes Protection debuffs",
        REMOVES_WARDING_DEBUFFS: "removes Warding debuffs",
        REMOVES_RESILIENCE_DEBUFFS: "removes Resilience debuffs",
    },
    TriggerType: {
        ON_STAT_CHANGE: 'ON_STAT_CHANGE',
        ON_ATTACK: 'ON_ATTACK',
        ON_USE_SKILL: 'ON_USE_SKILL',
        ON_USE_WEAPON: 'ON_USE_WEAPON',
        ON_DEAL_DAMAGE: 'ON_DEAL_DAMAGE',
        ON_RECV_DAMAGE: 'ON_RECV_DAMAGE',
        ON_DEAL_MISSED: 'ON_DEAL_MISSED',
        ON_RECV_MISSED: 'ON_RECV_MISSED',
        ON_DEAL_DODGED: 'ON_DEAL_DODGED',
        ON_RECV_DODGED: 'ON_RECV_DODGED',
        ON_DEAL_CRITICAL: 'ON_DEAL_CRITICAL',
        ON_RECV_CRITICAL: 'ON_RECV_CRITICAL',
        ON_DEAL_HEAL: 'ON_DEAL_HEAL',
        ON_RECV_HEAL: 'ON_RECV_HEAL',
        ON_DEAL_STUN: 'ON_DEAL_STUN',
        ON_RECV_STUN: 'ON_RECV_STUN',
        ON_DEAL_POISON: 'ON_DEAL_POISON',
        ON_RECV_POISON: 'ON_RECV_POISON',
        ON_DEAL_BLEEDING: 'ON_DEAL_BLEEDING',
        ON_RECV_BLEEDING: 'ON_RECV_BLEEDING',
        ON_TURN_BEGIN: 'ON_TURN_BEGIN',
        ON_TURN_END: 'ON_TURN_END',
        ON_ROUND_BEGIN: 'ON_ROUND_BEGIN',
        ON_ROUND_END: 'ON_ROUND_END',
        ON_BATTLE_START: 'ON_BATTLE_START',
        ON_BATTLE_END: 'ON_BATTLE_END',
        ON_BLOCK_BEGIN: 'ON_BLOCK',
        ON_BLOCK: 'ON_BLOCK',
        ON_BLOCK_END: 'ON_BLOCK_END',
        ON_GUARD_BEGIN: 'ON_GUARD_BEGIN',
        ON_GUARD_END: 'ON_GUARD_END',

        ON_REMOVE_HEALTH: 'ON_REMOVE_HEALTH',
        ON_REMOVE_STAMINA: 'ON_REMOVE_STAMINA',
        ON_REMOVE_MANA: 'ON_REMOVE_MANA',
        ON_ADD_HEALTH: 'ON_ADD_HEALTH',
        ON_ADD_STAMINA: 'ON_ADD_STAMINA',
        ON_ADD_MANA: 'ON_ADD_MANA',
    },
    StatType: {
        ACTIVE: "active",
        PASSIVE: "passive",
    },
    FormationPosition: {
        FRONT: "Front",
        MIDDLE: "Middle",
        BACK: "Back",
    },
    Rarity: {
        GOLD: 'gold',
        CORRUPT: "corrupt",
        REGULAR: "regular",
        SINGULAR: "singular",
        PRECIOUS: "precious",
        GRAND: "grand",
        MYTHIC: "mythic",
        RELIC: "relic",
    },
    ArmorType: {
        BOOTS: "boots",
        CHESTPLATE: "chestplate",
        GLOVES: "gloves",
        HELMET: "helmet",
        SHIELD: "shield",
    },
    SigilType: {
        WEAPON: "weapon",
        ARMOR: "armor",
    },
    ShardTarget: {
        GLOBAL: "global",
        SIGILS: "sigils",
        TRINKETS: "trinkets",
    },
    WeaponType: {
        AXE: "axe",
        BOW: "bow",
        DAGGER: "dagger",
        HAMMER: "hammer",
        SPEAR: "spear",
        STAFF: "staff",
        SWORD: "sword",
        MACE: "mace",
    },
    WeaponWeight: {
        LIGHT: "light",
        HEAVY: "heavy",
    },
    PowerScope: {
        GLOBAL: "global",
        LOCAL: "local",
    },
    AbilityType: {
        UNIQUE: "unique",
        REGULAR: "regular",
    },
    SkillType: {
        OFFENSIVE: "offensive",
        FRIENDLY: "friendly",
        BOTH: "both",
    },
    BattleAction: {
        ATTACK: "attack",
        BLOCK: "block",
        MOVE: "move",
        SKIP: "skip",
        SKILL: "skill"
    },
    NPCType: {
        UNDEAD: "undead",
        ANIMA: "anima",
        DEVIL: "devil",
        BEAST: "beast",
        REGULAR: "regular",
        ALLIES: "allies",
        CASTER: "caster",
        ENEMIES: "enemies",
    },
    ActiveEffectType: {
        SKILL: 'SKILL',
        POWER: 'POWER',
        WEAPON: 'WEAPON'
    },
    EnemyAIType: {
        TANK: 'TANK',
        HEALER: 'HEALER',
        DPS: 'DPS'
    },
    BattleFighterType: {
        HERO: "Hero",
        ENEMY: "Enemy"
    },
    AnimMoveType: {
        LEFT_ONE: 'LEFT_ONE',
        LEFT_TWO: 'LEFT_TWO',
        RIGHT_ONE: 'RIGHT_ONE',
        RIGHT_TWO: 'RIGHT_TWO'
    },
    SkillEffectFamily: {
        CASTER: 'CASTER',
        ALLIES: 'ALLIES',
        ENEMIES: 'ENEMIES',
        ALL: 'ALL'
    },
    ItemType: {
        WEAPON: 'WEAPON',
        ARMOR: 'ARMOR',
        SIGIL: 'SIGIL',
        RESOURCE: 'RESOURCE',
        RECIPE: 'RECIPE',
        TRINKET: 'TRINKET',
        ECHO: 'ECHO',
        CONSUMABLE: 'CONSUMABLE',
    },
    EchoType: {
        ANY: 'ANY',
        WEAPON: 'WEAPON',
        ARMOR: 'ARMOR',
        TRINKET: 'TRINKET'
    },
    IconType: {
        WEAPON: 'weapons',
        ARMOR: 'armors',
        SIGIL: 'sigils',
        RESOURCE: 'resources',
        RECIPE: 'recipes',
    },
    SkillTreeNodeType: {
        SKILL: "skill",
        PASSIVE: "passive"
    },
    SkillTreeNodeRewardType: {
        STAT: "stat",
        SKILL: "skill",
        TRIGGER: "trigger",
        OTHER: "other",
    },
    StriderType: {
        TANK: "tank",
        SUPPORT: "support",
        STRIKER: "striker"
    },
    WeaponHand: {
        LEFT: "left",
        RIGHT: "right",
        BOTH: "both"
    },
    QuestState: {
        PENDING: "pending",
        ONGOING: "ongoing",
        COMPLETE: "complete",
        FAILED: "failed"
    },
    SkillDamageType: {
        PHYSICAL: "physical",
        MAGICAL: "magical",
        BOTH: "both",
        NONE: "none"
    },
    MasteryPathwayState: {
        NEOPHYTE: "neophyte",
        APPRENTICE: "apprentice",
        EXPERT: "expert",
        LEGEND: "legend",
    },
    Action: {
        HIT_ENEMY: "HIT_ENEMY",
        STUN_ENEMY: "STUN_ENEMY",
        BLEED_ENEMY: "BLEED_ENEMY",
        POISON_ENEMY: "POISON_ENEMY",
        MOVE_ENEMY: "MOVE_ENEMY",
        KILL_ENEMY: "KILL_ENEMY",
        RECEIVE_HIT: "RECEIVE_HIT",
        RECEIVE_HIT_FROM_BOSS: "RECEIVE_HIT_FROM_BOSS",
        HEALTH_BELOW_HALF: "HEALTH_BELOW_HALF",
        RECEIVE_HIT_WHILE_GUARDING: "RECEIVE_HIT_WHILE_GUARDING",
        BEGIN_GUARD: "BEGIN_GUARD"
    },
    AlterationAttemptOutcome: {
        CRITICAL_FAILURE: "critical failure",
        FAILURE: "failure",
        SUCCESS: "success",
        CRITICAL_SUCCESS: "critical success",
    },
    AstralForgeState: {
        STABLE: "stable",
        WARPED: "warped",
        SEALED: "sealed"
    },
    AlterationError: {
        NO_EFFECT: "No effect has been selected.",
        NO_SHARD: "No Time Shard has been selected.",
        INCOMPATIBILITY: "The selected Time Shard and effect are not compatible.",
        SHARD_AMOUNT_NULL: "The selected shard's amount is equal to zero.",
        EFFECT_ALREADY_EXISTS: "The effect already exists.",
        NEGATIVE_OR_NULL_VALUE: "The effect cannot be altered because it is null or negative.",
        MAXIMUM_VALUE_REACHED: "This effect cannot be further altered.",
        IS_WARPED: "This item is warped, thus it cannot be altered with a comet dust.",
        IS_SEALED: "This item is sealed and cannot be altered no more.",
        NONE: "No error!"
    },
    ReversionError: {
        NO_BOOKMARK: "No bookmark has been selected.",
        NO_DUST: "No Comet Dust has been selected.",
        DUST_AMOUNT_NULL: "The selected Comet Dust's amount is equal to zero.",
        INCOMPATIBILITY: "The selected Comet Dust cannot be used to revert an alteration.",
        IS_SEALED: "A reversion cannot be performed on a sealed object.",
        NONE: "No error!"
    },
    //------------------------------------------------------
    // DUNGEON PARAM
    //------------------------------------------------------
    DungeonNames: {
        PUTRESCENT_OSSUARY: "putrescent ossuary",
    },  
    DungeonRoomType: {
        ENTRANCE: "entrance",
        CHASM: "chasm",
        BOSS: "boss room",
        ETERNITY_WELL: "eternity well",
        FRACTURED_HOLLOW: "fractured hollow",
        SACRIFICIAL_ALCOVE: "sacrificial alcove",
        ANTECHAMBER_OF_MARVELS: "antechamber of marvels",
        DESECRATED_ALTAR: "desecrated altar",
        DORMANT_ROOM: "dormant room",
        EMPTY: "empty room",
        CLUSTER: "cluster",
    },
    DungeonRoomAction: {
        SEARCH: "search",
        SCOUT: "scout",
        ENTER: "enter",
    },
    DungeonRoomStatus: {
        UNCLEARED: "uncleared",
        ENGAGED: "engaged",
        CLEARED: "cleared"
    },
    DungeonEncounterHostileBattleType: {
        GROUP: "group",
        WAVE: "wave",
        BOSS: "boss"
    },
    DungeonBiome: {
        UZIEL_JUNGLES: "uziel jungles",
        SERPENTINE_MOUNTAINS: "serpentine mountains",
        MITHOR: "mithor",
        THE_KAULT: "the kault",
        ELJINN_DESERT: "eljinn desert",
        SHATTERED_ISLES: "shattered isles",
        ASTRAL: "astral",
        ALL: "all",
    },
    DungeonBiomeBackground: {
        UZIEL_JUNGLES: "jungle_biome.png",
        SERPENTINE_MOUNTAINS: "snow_biome.png",
        MITHOR: "plain_biome.png",
        THE_KAULT: "swamp_biome.png",
        ELJINN_DESERT: "desert_biome.png",
        SHATTERED_ISLES: "coast_biome.png",
        ASTRAL: "astral_biome.png",
    },
    DungeonClusterPattern: {
        CIRCLE: 'circle',
        LINE: 'line',
        GRID: 'grid',
    },
    LogMessageType: {
        REGULAR: "regular",
        IMPORTANT: "important",
        TALL: "tall",
        GOOD: "good",
        BAD: "bad",
    },
    MobType: {
        LESSER: "engeance",
        REGULAR: "wretch",
        MAJOR: "archbeast",
        LESSER_BOSS: "lesser boss",
        MAJOR_BOSS: "major boss",
    },
    BattleType: {
        GROUP: "group",
        WAVE: "wave",
        BOSS: "boss"
    },
    BattleOutcome: {
        VICTORY: "victory",
        FAILURE: "failure",
    },
    AlchemicalEffectType: {
        PASSIVE: "passive",
        RECOVERY: "recovery",
        SPECIAL: "special"
    },
    OriginType: {
        UNKNOWN: 'unknown',
        SCAVENGED: 'scanvenged',
        CRAFTED: 'crafted'
    },
    SoundType: {
        MAJOR_TAB: "major_tab",
        MINOR_TAB: "minor_tab",
        TOOLTIP_SPAWN: "tooltip_spawn",
        TOOLTIP_HOVER: "tooltip_hover",
        TOOLTIP_CLOSE: "tooltip_close",
        HOVER: "hover",
        INGREDIENT_IN: "ingredient_in",
        INGREDIENT_OUT: "ingredient_out",
        SELECTOR: "selector",
        EQUIP: "equip",
        EQUIP_WEAPON: "equip_weapon",
        UNEQUIP: "unequip",
        CRAFT_BUTTON_ALCHEMY: "craft_button_alchemy",
        CRAFT_POTION_BREW: "craft_potion_brew",
        CRAFT_POTION_RESULT: "craft_potion_result",
        SELECTOR_ON: "selector_on",
        SELECTOR_OFF: "selector_off",

        SOULWRITE_SLOT: "soulwrite_slot",
        SOULWRITE_UNSLOT: "soulwrite_unslot",
        SOULWRITE_SLOT_IN: "soulwrite_slot_in",
        SOULWRITE_PROCESS: "soulwrite_process",
        SOULWRITE_WRITE_WRITE: "soulwrite_write_write",
        SOULWRITE_REGULAR: "soulwrite_regular",
        SOULWRITE_CORRUPT: "soulwrite_corrupt",
        SOULWRITE_STALWART: "soulwrite_stalwart",
        SOULWRITE_STCO: "soulwrite_stco",

        SOULBIND_PRESLOT: "soulbind_preslot",
        SOULBIND_SLOT: "soulbind_slot",
        SOULBIND_UNSLOT: "soulbind_unslot",

        DUNGEON_ROOM_ENTER: "dungeon_room_enter"
    },
    AlterAction: {
        ADD: "add",
        REMOVE: "remove"
    },
    EonCategory: {
        MAJOR: "major",
        MINOR: "minor",
        LOCATIONS: "locations",
        BESTIARY: "bestiary",
        TUTORIALS: "tutorials",
        STRIDERS: "striders",
        ARTIFACTS: "artifacts"
    }
}); 
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

        UNSLEEPER: 'unsleeper.png',
    },
    Color: {
        GREEN: '#4cd137',
        RED: '#e84118',
        BLUE: '#0097e6',
        GOLD: '#ece2b6',
        TURQUOISE: '#1abc9c',

        CORRUPT: '#c10000',
        COMMON: '#dddddd',
        UNCOMMON: '#00ff00',
        RARE: '#00ddff',
        EPIC: '#ff00ff',
        LEGENDARY: '#ffaa00',
        ELDER: '#fb3e8d',
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
        RES_BLEED_DMG: "bleed DMG resistance",
        RES_BLEED_DURATION: "bleed duration resistance",
        RES_POISON_DMG: "poison DMG resistance",
        RES_POISON_DURATION: "poison duration resistance",
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

        //------------------------------------------------------
        // ARMOR EFFECTS
        //------------------------------------------------------
        // BASE RESISTANCE
        RESILIENCE: "resilience",
        WARDING: "warding",

        //------------------------------------------------------
        // WEAPON EFFECTS
        //------------------------------------------------------
        PDMG: "sharpness",
        MDMG: "withering",
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

        SWORD_PDMG: "swords sharpness",
        SWORD_MDMG: "swords withering",

        // CRAFTING EFFECTS
        CRAFTING_TRINKET_CORRUPTION: "trinket corruption chance",
        CRAFTING_RUNE_CRIT: "critical rune effect chance",
        CRAFTING_RUNE_CORRUPTION: "rune corruption chance",

        // SPELL EFFECTS
        SPELL_DMG: "spell DMG",

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
        BACK_TWO: "backs two positions"
    },
    TriggerType: {
        ON_STAT_CHANGE: 'ON_STAT_CHANGE',
        ON_ATTACK: 'ON_ATTACK',
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
        CORRUPT: "corrupt",
        COMMON: "common",
        UNCOMMON: "uncommon",
        RARE: "rare",
        EPIC: "epic",
        LEGENDARY: "legendary",
        ELDER: "elder",
    },
    ArmorType: {
        BOOTS: "boots",
        CHESTPLATE: "chestplate",
        GLOVES: "gloves",
        HELMET: "helmet",
        SHIELD: "shield",
    },
    RuneType: {
        WEAPON: "weapon",
        ARMOR: "armor",
    },
    ShardTarget: {
        GLOBAL: "global",
        RUNES: "runes",
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
        MELEE: "melee",
        DISTANCE: "distance",
        FRIENDLY: "friendly",
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
        RUNE: 'RUNE',
        RESOURCE: 'RESOURCE',
        RECIPE: 'RECIPE',
        TRINKET: 'TRINKET',
        ECHO: 'ECHO',
    },
    EchoType: {
        ANY: 'ANY',
        WEAPON: 'WEAPON',
        ARMOR: 'ARMOR',
        TRINKET: 'TRINKET'
    },
    ConsumableType: {
        POTION: 'potions',
        ELIXIR: 'elixirs',
        EDIBLE: 'edibles'
    },
    IconType: {
        WEAPON: 'weapons',
        ARMOR: 'armors',
        RUNE: 'runes',
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
        BOTH: "both"
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
});
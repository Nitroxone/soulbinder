const VERSION = 1;
const UPDATE_LOG = [
    {date:'February 2022', title:'Project started', text:['Started working on a small idle-like combat RPG playable in browsers.']},
    {date:'August 2022', title:'Project update', text:['Reimagined several core game design components : the casual aspect of the game is now lesser.', 
                                                     'The game went from an idle brainless thing to a tactical combat game featuring roguelike and RPG elements', 
                                                     'Overall, the scope of the game got bigger',
                                                     'Planned alpha release pushed back to November, at best']}
];

class Game {
    constructor() {
        this.callbacks = [];
        
        this.ww = window.innerWidth;
        this.wh = window.innerHeight;

        this.mouseDown = false;
        this.mouseUp = false;

        this.iconScale = 1;
        this.iconURL = 'css/img/IconSet.PNG';

        this.tooltip = new Tooltip();
        this.widget= new Widget();
        this.dialogue = new Dialogue();

        this.messages = [];
        this.messagesDOM = null;
        this.messagesWrapDOM = null;
        this.MAX_MESSAGES = 50;
        this.allowMessages = true;

        this.tab = null;
        this.tabs = [];

        this.buttons = 0;
        this.texts = 0;
        this.runeSelection = 0;

        this.enchantingItem = null;
        this.enchantingRune = null;
        this.craftingRecipe = null;

        this.formationFocus = null;

        this.currentBattle = null;

        this.particlesTooltipCanvasInterval = null;
        this.particlesTooltipCanvasItem = null;

        this.all_weapons = [];
        this.all_armors = [];
        this.all_runes = [];
        this.all_npcs = [];
        this.all_powers = [];
        this.all_skills = [];
        this.all_resources = [];
        this.all_recipes = [];
        this.all_trinkets = [];
        this.all_shards = [];

        this.player = null;
        this.inventory = null;
    }

    launch() {
        this.inventory = new Inventory();

        this.loadWeapons();
    }

    loadWeapons() {
        const weapons = [
            new Weapon("Highsteel Sword", "Swift and quite light. Effective in the hands of a swords master.", 10, [4454], Data.Rarity.COMMON, Data.WeaponType.SWORD, Data.WeaponWeight.LIGHT, 10, 0, 3, 3, 5, 2, [1, 1, true], [0, 0, true], [true, true, false], 2),
        ];

        for(const weapon of weapons) {
            this.all_weapons.push(weapon);
        }
    }
}
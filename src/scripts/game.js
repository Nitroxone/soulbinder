// Game version.
const VERSION = 1;
// Game's update log.
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
        this.all_echoes = [];
        this.all_runeCorruptEffects = [];

        this.player = null;
        this.inventory = null;
    }

    addCallbacks() {
        for(let i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i]();
        }
        this.callbacks = [];
    }

    pushCallback(func) {
        this.callbacks.push(func);
    }

    addTextWithTooltip(text, tooltip, classes) {
        const id = this.texts;
        const str = '<span class="tooltiped' + (classes?(' ' + classes):'') + '" id="textspan-' + id + '">' + text + '</span>';
        this.pushCallback(function(id, tooltip){return function(){
            addTooltip(domWhat('textspan-' + id), function(){return tooltip;}, {offY:-8});
        }}(id, tooltip));
        this.texts++;
        return str;
    }
    addButton(obj) {
        const id = obj.id || ('button-' + this.buttons);
        const str = '<div ' + (obj.style?('style="' + obj.style + '" ') : '') + 'class="button' + (obj.classes?(' ' + obj.classes): '') + '" id="' + id + '">' + (obj.text || '-') + '</div>';
        if(obj.onclick || obj.tooltip || obj.tooltipFunc) {
            this.pushCallback(function(id, obj){return function(){
                if(domWhat(id)) {
                    if(obj.tooltip) addTooltip(domWhat(id), function(){return obj.tooltip;}, {offY:-8});
                    else if(obj.tooltipFunc) addTooltip(domWhat(id), obj.tooltipFunc, {offY:-8});
                    if(obj.onclick) domWhat(id).onclick=obj.onclick;
                }
            }}(id,obj));
        }
        this.buttons++;
        return str;
    }

    middleText(text, slow) {
        domWhat('middleText').innerHTML = '<div class="showUp" style="text-align:center; position:absolute; bottom:16px; width:100%;">' + text + '</div>';
        triggerAnim(domWhat('middleText'), 'slowFadeOut');
        if(slow) domWhat('middleText').style.animationDuration = '5s';
        else domWhat('middleText').style.animationDuration = '1.5s';
    }

    message(obj) {
        let me = {
            type: undefined,
            date: undefined,
            text: undefined,
            textFunc: undefined,
            args: undefined,
            mergeId: undefined,
            replaceOnly: undefined,
            icon: undefined,
            domWhat: undefined,
        };
        const scrolled = !(Math.abs(this.messagesWrapDOM.scrollTop - (this.messagesWrapDOM.scrollHeight - this.messagesWrapDOM.offsetHeight)) < 3);
        const currentDate = new Date();
        const hours = currentDate.getHours().toString().length == 1 ? '0' + currentDate.getHours() : currentDate.getHours();
        const minutes = currentDate.getMinutes().toString().length == 1 ? '0' + currentDate.getMinutes() : currentDate.getMinutes();
        const datetime = hours + ':' + minutes;

        me.type = "normal";
        me.date = datetime;
        for(let i in obj){me[i] = obj[i];}
        const content = me.text || me.textFunc(me.args);
        let str = '<div class="messageTimestamp" title="blank">[' + datetime + ']</div>' +
            '<div class="messageContent' + (me.icon ? ' hasIcon' : '') + '">' + (me.icon ? getArbitraryIcon(me.icon) : '') + '<span class="messageText">' + content + '</span></div>';

        const div = document.createElement('div');
        div.innerHTML = str;
        div.className = 'message popInVertical ' + (me.type).replaceAll(' ', 'Message ') + 'Message';
        this.messagesDOM.appendChild(div);
        me.domWhat = div;
        this.messages.push(me);
        if(this.messages.length > this.MAX_MESSAGES) {
            const first = this.messagesDOM.firstChild;
            for(let i = 0; i < this.messages.length; i++) {
                if(this.messages[i].domWhat == first) {
                    this.messages.splice(i, 1);
                    break;
                }
            }
            this.messagesDOM.removeChild(first);
        }
        if(!scrolled) this.messagesWrapDOM.scrollTop = this.messagesWrapDOM.scrollHeight - this.messagesWrapDOM.offsetHeight;
        this.addCallbacks();
    }

    initMessages() {
        this.messages = [];
        this.messagesDOM = domWhat('messagesList');
        this.messagesWrapDOM = domWhat('messages');
        this.messagesDOM.innerHTML = '';
    }

    initTabs() {
        const tabs = [
            new Tab('Enchanting', 'enchanting', 'Enchant your gear.'),
            new Tab('Crafting', 'crafting', 'Craft trinkets, potions, and runes alike.'),
            new Tab('Striders', 'striders', 'Manage your fighters and prepare your formation.'),
            new Tab('Battle', 'battle', 'Slay your enemies.'),
            new Tab('Achievements', 'achievements', 'Scroll through your unlocked (and yet to be unlocked) achievements.', false, 'right'),
            new Tab('Update log', 'updates', 'Read the game\'s update logs and other things.', true, 'right'),
        ];

        for(const tab of tabs) {
            this.tabs.push(tab);
        }
    }

    buildTabs() {
        let str = '';
        str += '<div id="sectionTabs" class="tabList"></div>';
        for(let i = 0; i < this.tabs.length; i++) {
            this.tabs[i].div = this.tabs[i].id + 'Div';
            str += '<div id="' + this.tabs[i].div + '" class="subsection' + (this.tabs[i].noScroll ? ' noScroll' : '') + '"></div>';
        }
        domWhat('sections').innerHTML = str;

        str = '';
        for(let i = 0; i < this.tabs.length; i++) {
            str += '<div id="tab-' + this.tabs[i].id + '" class="tab bgMid' + (this.tabs[i].addClass ? ' ' + this.tabs[i].addClass : '') + '">' + this.tabs[i].name + '</div>';
        }
        domWhat('sectionTabs').innerHTML = str;
        for(let i = 0; i < this.tabs.length; i++) {
            this.tabs[i].domWhat = domWhat('tab-' + this.tabs[i].id);
            this.tabs[i].domWhat.onclick = function(tab){return function(){game.setTab(tab);};}(this.tabs[i]);
            addTooltip(this.tabs[i].domWhat, function(tab){return function(){return tab.desc;};}(this.tabs[i]), {offY:-8});
        }
        this.setTab(this.tabs[3]);
    }

    setTab(tab) {
        if(tab.popup) {
            switch(tab.id) {
                case 'updates':
                    this.dialogue.popup(this.updateLogPopup, 'bigDialogue', tab.domWhat);
            }
        } else {
            this.tab = tab;
            for(let i = 0; i < this.tabs.length; i++) {
                let me = this.tabs[i];
                if(me.id != tab.id) { // close other tabs
                    me.domWhat.classList.remove('on');
                    me.domWhat.classList.remove('bgLight');
                    me.domWhat.classList.add('bgMid');
                    if(me.div) {
                        domWhat(me.div).style.display = 'none';
                        //domWhat(me.div).innerHTML = '';
                    }
                } else { // update focused tab
                    me.domWhat.classList.add('on');
                    me.domWhat.classList.remove('bgMid');
                    me.domWhat.classList.add('bgLight');
                    if(me.div) domWhat(me.div).style.display = 'block';
                    // update tab -- need code here!
                    this.updateTab(tab);
                }
            }
        }
    }
    updateTab(tab) {

    }
    updateLogPopup() {
        let str = '';
        str += '<div class="par"><b>Soulbinder</b> is a game developed by ntrx. It is currently in early alpha state, may be prone to numerous bugs, and definitely will be updated as frequently as possible. The project first started as a way to practice my JS/TS skills. Now we\'re here.</div>' +
            '<div class="par">The game was imagined as a modest web browser side game to kill time during meetings, class, while procrastinating or simply idling. You can play at your own pace, either being super invested in your playthrough or as a no-brainer.</div>' +
            '<br><div class="fancyText">The long term</div>' +
            '<div class="par">Once the game has a stable gameplay base, the idea would be to release updates from time to time that would add new dungeons, enemies, items, and so on.</div>';
        str += '<div class="divider"></div><div class="fancyText">Update log:</div>';
        for(let i = 0; i < UPDATE_LOG.length; i++) {
            let me = UPDATE_LOG[i];
            str += '<br><div class="fancyText"><span style="color:#999;">' + me.date + ' :</span> ' + me.title + '</div>';
            for(let j = 0; j < me.text.length; j++) {
                str += '<div class="bulleted">' + me.text[j] + '</div>';
            }
        }
        str = '<div class="fancyText title">About</div><div class="bitBiggerText scrollBox underTitle">' + str + '</div>';
        str += '<div class="buttonBox">' + game.dialogue.getCloseButton() + '</div>';

        return str;
    }

    refresh() {
        this.addCallbacks();
        this.drawInventory();
    }

    /**
     * Launches the game.
     */
    launch() {
        this.inventory = new Inventory();
        this.player = new Player("root", this.inventory);

        this.initMessages();

        // LOADING DATA
        for(let func in Loader) {
            Loader[func]();
        }

        this.initTabs();
        this.buildTabs();

        this.inventory.addItem(what(this.all_weapons, "highsteel sword"));
        this.inventory.addItem(what(this.all_armors, 'highsteel helmet'));
        this.inventory.addItem(what(this.all_runes, 'resilience rune'));
        this.inventory.addItem(what(this.all_runes, 'withering rune'));
        this.inventory.addItem(what(this.all_resources, "dark stone"), 10);
        this.inventory.addItem(what(this.all_resources, "silver powder"), 10);
        this.inventory.addItem(what(this.all_resources, "decaying petals"), 10);
        this.inventory.addItem(what(this.all_resources, "reminder"));
        this.inventory.addItem(what(this.all_resources, "starblossom"));
        this.inventory.addItem(what(this.all_resources, "time stream catalyst"));
        this.inventory.addItem(what(this.all_resources, "lead knot"));
        this.inventory.addItem(what(this.all_recipes, "withering rune"));

        this.inventory.craft(this.inventory.recipes[0], true);
        this.inventory.maximizeRune(this.inventory.runes[2]);
        this.inventory.amplifyRune(this.inventory.runes[2], true);
        this.inventory.enchant(this.inventory.weapons[0], this.inventory.runes[2]);
        this.inventory.craft(this.inventory.recipes[0]);
        this.inventory.enchant(this.inventory.weapons[0], this.inventory.runes[2]);

        drawWeaponInventory(this.player.inventory.weapons);
    }
}
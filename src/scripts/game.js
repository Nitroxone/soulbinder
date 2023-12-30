/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

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
        this.sigilSelection = 0;

        this.enchantingItem = null;
        this.enchantingSigil = null;
        this.craftingRecipe = null;

        this.formationFocus = null;

        this.currentBattle = null;
        this.selectedBiome = null;
        this.selectedZone = null;
        this.currentDungeon = null;

        this.particlesTooltipCanvasInterval = null;
        this.particlesTooltipCanvasItem = null;

        this.all_weapons = [];
        this.all_armors = [];
        this.all_sigils = [];
        this.all_npcs = [];
        this.all_powers = [];
        this.all_skills = [];
        this.all_resources = [];
        this.all_recipes = [];
        this.all_trinkets = [];
        this.all_shards = [];
        this.all_echoes = [];
        this.all_sigilCorruptEffects = [];
        this.all_equipmentSets = [];
        this.all_consumables = [];
        this.all_dungeons = [];
        this.currentBlackMarketWeaponsTable;
        this.currentBlackMarketArmorsTable;
        this.currentBlackMarketSigilsTable;
        this.currentBlackMarketTrinketsTable;
        this.currentBlackMarketResourcesTable;
        this.currentAuctionHouseTable;

        this.selectedDungeon = null;

        this.all_skillTrees = [];
        this.all_masteryPathways = [];

        this.all_striders = [];
        this.all_enemies = [];
        this.all_enemyFormations = [];

        this.all_eons = [];
        this.selectedEon = null;

        this.player = null;
        this.inventory = null;

        this.actionListeners = [];

        this.textDisplaySwitch = false;

        this.pinnedInventory = false;
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
            bg: undefined,
            domWhat: undefined,
        };
        const scrolled = !(Math.abs(this.messagesWrapDOM.scrollTop - (this.messagesWrapDOM.scrollHeight - this.messagesWrapDOM.offsetHeight)) < 3);
        const currentDate = new Date();
        const hours = currentDate.getHours().toString().length == 1 ? '0' + currentDate.getHours() : currentDate.getHours();
        const minutes = currentDate.getMinutes().toString().length == 1 ? '0' + currentDate.getMinutes() : currentDate.getMinutes();
        const datetime = hours + ':' + minutes;

        me.type = "normal";
        me.date = datetime;
        for(let i in obj) {
            me[i] = obj[i];
        };
        const content = me.text || me.textFunc(me.args);
        let str = '<div class="messageTimestamp" title="blank">[' + datetime + ']</div>' +
            '<div class="messageContent' + (me.bg ? ' hasBg" style="background-image: url(\'css/img/' + me.bg + '\')"' : '"') + '>' + '<span class="messageText">' + content + '</span></div>';

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
            new Tab('Hub', 'hub', 'Start expeditions and enroll in quests.'),
            new Tab('Workshop', 'workshop', 'Craft new items, and upgrade your gear.'),
            new Tab('Striders', 'striders', 'Manage your fighters and prepare your formation.'),
            new Tab('Battle', 'battle', 'Slay your enemies.'),
            new Tab('Exploration', 'exploration', 'Make your way through dungeons.'),
            new Tab('Eons', 'eons', 'Read your collected text fragments.', false, 'right'),
            new Tab('Achievements', 'achievements', 'Scroll through your unlocked (and yet to be unlocked) achievements.', false, 'right'),
            new Tab('Infos', 'updates', 'Read the game\'s update logs and other things.', true, 'right'),
            new Tab('Settings', 'settings', 'Change the game\'s settings.', true, 'right')
        ];

        for(const tab of tabs) {
            this.tabs.push(tab);
        }
    }

    buildTabs() {
        let str = '';
        str += '<div id="repinInventory" class="noDisplay"></div>';
        str += '<div id="repinChat" class="noDisplay"></div>';
        str += '<div id="sectionTabs" class="tabList"></div>';
        for(let i = 0; i < this.tabs.length; i++) {
            this.tabs[i].div = this.tabs[i].id + 'Div';
            str += '<div id="' + this.tabs[i].div + '" class="subsection' + (this.tabs[i].noScroll ? ' noScroll' : '') + '"></div>';
        }
        domWhat('sections').innerHTML = str;

        str = '';
        for(let i = 0; i < this.tabs.length; i++) {
            str += '<div id="tab-' + this.tabs[i].id + '" class="tab' + (this.tabs[i].addClass ? ' ' + this.tabs[i].addClass : '') + '">' + this.tabs[i].name + '</div>';
        }
        domWhat('sectionTabs').innerHTML = str;
        for(let i = 0; i < this.tabs.length; i++) {
            this.tabs[i].domWhat = domWhat('tab-' + this.tabs[i].id);
            this.tabs[i].domWhat.onclick = function(tab){return function(){game.setTab(tab);};}(this.tabs[i]);
            addTooltip(this.tabs[i].domWhat, function(tab){return function(){return tab.desc;};}(this.tabs[i]), {offY:-8});
        }
        // SETS THE STARTING TAB
        this.setTab(this.tabs[1]);
    }

    setTab(tab) {
        if(tab.popup) {
            switch(tab.id) {
                case 'updates':
                    this.dialogue.popup(this.updateLogPopup, 'bigDialogue', tab.domWhat);
                    break;
                case 'settings':
                    this.dialogue.popup(this.settingsPopup, 'bigDialogue', tab.domWhat);
            }
        } else {
            this.tab = tab;
            for(let i = 0; i < this.tabs.length; i++) {
                let me = this.tabs[i];
                if(me.id != tab.id) { // close other tabs
                    me.domWhat.classList.remove('on');
                    if(me.div) {
                        domWhat(me.div).style.display = 'none';
                        //domWhat(me.div).innerHTML = '';
                    }
                } else { // update focused tab
                    me.domWhat.classList.add('on');
                    if(me.div) domWhat(me.div).style.display = 'block';
                    // update tab -- need code here!
                    this.updateTab(tab);
                }
            }
        }
        Sounds.Methods.playSound(Data.SoundType.MAJOR_TAB);
    }
    updateTab(tab) {

    }

    updateLogPopup() {
        let str = '';
        str += '<div class="par"><b>Soulbinder</b> is a JavaScript game made by ntrx and wensa. It is currently in early alpha state and may be prone to numerous bugs - though we got a lot of update plans on the way. The project first started as a way to practice my JavaScript skills. Now we\'re here.</div>' +
            '<div class="par"><b>Soulbinder</b>\'s goal is to take you on a lore-rich, story-driven dungeon crawling adventure with enough features to never make you bored of it. A heavy emphasis was put on the game\'s accessibility : hence the fact that is it a web browser game. It is also free and open source, so you can <a href="https://github.com/Nitroxone/soulbinderjs" target="_blank">download the game</a> anytime you want in case you go offline but still want to play. But most importantly : it was made to kill time!</div>';
        str += '<div class="divider"></div>';
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

    settingsPopup() {
        let str = '';
        
        return str;
        
    }

    refresh() {
        this.addCallbacks();
        this.drawInventory();
    }

    /**
     * Fires all of the ActionListeners which Action matches the provided one.
     * @param {Data.Action} action the Action to fire
     */
    fireActionListeners(action) {
        this.actionListeners.filter(obj => obj.action === action).forEach(obj => obj.increment());
    }

    startBattle(enemies) {
        for(let i = 0; i < enemies.formation.length; i++) {
            enemies.formation[i] = Entity.clone(enemies.formation[i]);
        }
        this.currentBattle = new Battle(this.player.formation, enemies.formation, enemies.type);
        this.currentBattle.start();
    }

    startDungeon() {
        this.currentDungeon = new Dungeon();
        drawDungeon();
    }

    /**
     * Loads the game data.
     */
    loadData() {
        for(let func in Loader) {
            Loader[func]();
        }
    }

    initBlackMarket() {
        this.black_market.generateBlackMarketAllTables();
    }

    /**
     * Launches the game.
     */
    launch() {
        this.inventory = new Inventory();
        this.player = new Player("root", this.inventory);
        this.alchemy = new Alchemy();
        this.soulwriting = new Soulwriting();
        this.soulbinding = new Soulbinding();
        this.soulbending = new Soulbending();
        this.black_market = new BlackMarket();

        this.initMessages();

        // LOADING DATA
        this.loadData();

        this.initTabs();
        this.buildTabs();

        this.all_weapons.forEach(item => {
            this.inventory.addItem(item);
        });
        this.all_armors.forEach(item => {
            this.inventory.addItem(item);
        });
        this.all_sigils.forEach(item => {
            this.inventory.addItem(item);
        });
        this.all_trinkets.forEach(item => {
            this.inventory.addItem(item);
        });
        this.all_resources.forEach(item => {
            this.inventory.addItem(item, 100);
        });
        this.all_recipes.forEach(item => {
            this.inventory.addItem(item);
        });
        this.all_consumables.forEach(item => {
            this.inventory.addItem(item);
        })
        this.all_striders.forEach(item => {
            this.player.addToRoster(item);
        });

        this.inventory.craft(this.inventory.recipes[0], true);
        this.inventory.maximizeSigil(this.inventory.sigils[2]);
        this.inventory.amplifySigil(this.inventory.sigils[2], true);
        //this.inventory.enchant(this.inventory.weapons[0], this.inventory.sigils[2]);
        this.inventory.craft(this.inventory.recipes[1]);
        //this.inventory.enchant(this.inventory.weapons[0], this.inventory.sigils[1]);
        //this.inventory.enchant(this.inventory.armors[0], this.inventory.sigils[0]);

        this.currentDungeon = this.all_dungeons.find(x => x.name === 'Putrescent Ossuary');
        this.currentDungeon.init();

        Config.Soulwriting.forEach(sw => {
            sw.unlocked = true;
            sw.studied = sw.researchTotal;
        });

        unlockAllEons();
        unlockAllEonFragments();

        drawInventory();
        addSidePinEvents();
        drawStridersScreen();
        drawHubScreen();
        drawWorkshopScreen();
        drawExplorationScreen();
        //drawExplorationHubScreen();
        drawEonScreen();
        drawEmptyBattleScreen();

        this.message({type: Data.LogMessageType.IMPORTANT, text:'This is an important message.'});
        this.message({type: Data.LogMessageType.REGULAR, text:'This is a regular message.'});
        this.message({type: Data.LogMessageType.GOOD, text:'This is a positive message.'});
        this.message({type: Data.LogMessageType.BAD, text:'This is a negative message.'});
        this.message({type: Data.LogMessageType.TALL, text:'This is a bigger message.'});

        this.player.formationSet(what(this.player.roster, "amarok"), Data.FormationPosition.FRONT);
        this.player.formationSet(what(this.player.roster, "carhal"), Data.FormationPosition.MIDDLE);
        this.player.formationSet(what(this.player.roster, "betheros"), Data.FormationPosition.BACK);

        // Equipping
        what(this.player.roster, "carhal").equipWeapon(what(this.player.inventory.weapons, 'entarian axe'), '', true);
        what(this.player.roster, "amarok").equipWeapon(what(this.player.inventory.weapons, 'highsteel sword'), '', true);
        what(this.player.roster, "betheros").equipWeapon(what(this.player.inventory.weapons, 'drancoran staff'), '', true);

        what(this.player.roster, "carhal").equipArmor(what(this.player.inventory.armors, 'entarian chestplate'), true);
        what(this.player.roster, "carhal").equipArmor(what(this.player.inventory.armors, 'entarian boots'), true);
        what(this.player.roster, "betheros").equipArmor(what(this.player.inventory.armors, 'drancoran hood'), true);
        what(this.player.roster, "betheros").equipArmor(what(this.player.inventory.armors, 'drancoran mittens'), true);
        what(this.player.roster, "amarok").equipArmor(what(this.player.inventory.armors, 'highsteel helmet'), true);
        what(this.player.roster, "amarok").equipArmor(what(this.player.inventory.armors, 'highsteel boots'), true);

        what(this.player.roster, "carhal").equipTrinket(what(this.player.inventory.trinkets, 'talisman of fervour'), true);
        what(this.player.roster, "carhal").equipTrinket(what(this.player.inventory.trinkets, 'goodsight doll'), true);
        what(this.player.roster, "carhal").equipTrinket(what(this.player.inventory.trinkets, 'molars of the jailor'), true);
        what(this.player.roster, "amarok").equipTrinket(what(this.player.inventory.trinkets, 'foresighting ring'), true);
        what(this.player.roster, "amarok").equipTrinket(what(this.player.inventory.trinkets, 'omen insignia'), true);
        what(this.player.roster, "betheros").equipTrinket(what(this.player.inventory.trinkets, 'haste ring'), true);
        what(this.player.roster, "betheros").equipTrinket(what(this.player.inventory.trinkets, 'engraved moonhorn'), true);

        what(this.player.roster, "amarok").level.addLevel(30);
        what(this.player.roster, "amarok").skillPoints = 100;

        console.clear();

        this.startBattle(Entity.clone(what(game.all_enemyFormations, "gnarlyAndFungaliant")));
        //this.currentBattle.end();

        this.initBlackMarket();
        openAstralForge(game.player.inventory.weapons[0]);
    }
}
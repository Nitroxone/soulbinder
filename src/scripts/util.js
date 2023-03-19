/**
 * This file contains a whole bunch of handy functions that are used throughout the entire game.
 * Essentially wrapped computations and DOM manipulations.
 */

/**
 * Writes an error message in the console and prints the trace.
 * @param {string} what - The message to be printed
 */
const ERROR = (what) => {
    console.log('**ERROR!**: ' + what);
    console.trace();
}

/**
 * Returns the HTMLElement which ID is identified by the argument.
 * @param {string} what - The ID of the element
 */
function domWhat(what) {
    return document.getElementById(what);
}

/**
 * Adds an event listener to the specified element.
 * @param {HTMLElement} html_element the HTMLElement the event will be attached to
 * @param {string} element_name the type of event (such as 'click')
 * @param {Function} element_func the function that is called by the event
 */
function AddEvent(html_element, element_name, element_func) {
    html_element.addEventListener(element_name, element_func, false);
}

/**
 * Adds a hover event to the specified element.
 * @param {HTMLElement} html_element the HTMLElement the event will be attached to
 * @param {string} class_name the function that is called by the event
 */
function AddHover(html_element, class_name) {
    AddEvent(html_element, 'mouseover', function(class_name){return function(e){e.name.classList.add(class_name);};}(class_name));
    AddEvent(html_element, 'mouseout', function(class_name){return function(e){e.name.classList.remove(class_name);};}(class_name));
}

/**
 * Adds the CSS rule
 * @param {string} sheet 
 * @param {string} selector 
 * @param {string} rules 
 * @param {string} index 
 */
function AddCSSRule(sheet, selector, rules, index) {
    sheet.insertRule(selector + "{" + rules + "}", index);
}

/**
 * Triggers an animation on the given HTMLElement.
 * @param {HTMLElement} element 
 * @param {string} anim 
 * @returns 
 */
function triggerAnim(element, anim) {
    if(!element) return;
    element.classList.remove(anim);
    void element.offsetWidth;
    element.classList.add(anim);
}

/**
 * Finds the correct Transition End Event name of the current browser.
 * @returns {string} the name of the transition
 */
function transitionEndEventName() {
    let i, el = document.createElement('fakeElement'),
    transitions = {
        'transition': 'transitionend',
        'OTransition': 'otransitionend',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
    };
    for(i in transitions) {
        if(el.style[i] !== undefined) {
            return transitions[i];
        }
    }
}

/**
 * Gets the offset of the given HTMLElement.
 * @param {HTMLElement} element 
 * @returns {object} an object that contains X and Y offset coordinates
 */
function getOffset(element) {
    let x = 0;
    let y = 0;
    while(element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
        x += element.offsetLeft - element.scrollLeft;
        y += element.offsetTop - element.scrollTop;
        element = element.offsetParent;
    }
    return {top: y, left: x};
}

/**
 * Returns a CSS background-image property that links to the resource of given type.
 * @param {Entity} entity the Entity ID to retrieve the Icon from
 */
function getIcon(entity, forceModif = 0) {
    let bgModif = 70;
    let type;
    if(entity instanceof Weapon) {
        bgModif = 85;
        type = "weapons";
    }
    else if(entity instanceof Armor) {
        type = "armors";
        if(entity.type === Data.ArmorType.SHIELD) {
            bgModif = 55;
        }
    }
    else if(entity instanceof Resource) type = "resources";
    else if(entity instanceof Trinket) type = "trinkets";
    else if(entity instanceof Rune) {
        type = "runes";
        bgModif = 60;
    }
    if(forceModif != 0) bgModif = forceModif;

    return 'background-image: url(css/img/' + type + '/' + entity.icon + '.png); background-size: '+ bgModif + '%';
}

/**
 * Generates an HTML div string that contains a standalone icon.
 * @param {number} icon 
 * @param {boolean} clipped 
 * @param {string|number} id 
 * @returns {string} an HTML div string that contains the icon
 */
function getArbitraryIcon(icon, clipped, id) {
    return '<div class="thing standalone wide1' + (clipped ? ' clipped' : '') + '">' + '<div ' + (id ? ('id="' + id + '" ') : '') + 'class="icon' + ((icon.length > 2) ? ' double' : '') + '" style="' + getIcon(icon) + '"></div>' + '</div>';
}
/**
 * Returns the basic icon type value
 * @returns {string} the icon class
 */
function getIconClasses() {
    return 'wide1';
}

/**
 * Generates an HTML
 * @param {Entity} obj the Entity object to retrieve the icon from
 * @param {string} id optional ID to give the icon div
 * @param {string} classes optional classes to give the icon div
 * @returns {string} an HTML div string that contains the icon
 */
function getIconStr(object, id, classes) {
    const icon = getIcon(object.icon);
    return '<div' + (id?' id="' + id + '"' : '') +' class="icon' + ((icon.length>2) ? ' double' : '') + '' + (classes ? (' ' + classes) : '') + '" style="' + icon + '"></div>';
}

/**
 * Generates a span HTML element that contains an Entity's name and color, without its icon.
 * @param {Entity} what the Entity object to retrieve the data from
 * @param {*} text 
 * @returns {string} a span HTML element
 */
function getSmallThing(what, text) {
    return '<span class="smallThing" style="color:' + (what.rarity ? getRarityColorCode(what.rarity) : '#fff') + '"><div class="thing standalone wide1 clipped">' + getIconStr(what, null, null) + '</div>' + (text==='*PLURAL*' ? (what.name + 's'):(text || what.name || '<span style="opacity:0;">!</span>')) + '</span>';
}

/**
 * Generates a span HTML element that contains an Entity's name and color, without its icon.
 * @param {Entity} what the Entity object to retrieve the data from
 * @param {string} text 
 * @returns {string} a span HTML element
 */
function getSmallThingNoIcon(what, text) {
    return '<span class="smallThingNoIcon" style="color:' + (what.rarity ? getRarityColorCode(what.rarity) : '#fff') + '">' + (text==='*PLURAL*' ? (what.name + 's'):(text || what.name || '<span style="opacity:0;">!</span>')) + '</span>';
}

/**
 * Capitalizes the first letter of the given string.
 * @param {string} str the input string
 * @returns {string} the same input string whose first letter is capitalized
 */
function capitalizeFirstLetter(str) {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Looks for the Entity object whose name matches the given name. Returns null if none is found.
 * @param {array} array the array of Entity objects to search in
 * @param {string} name the name of the Entity object to look for
 * @returns {Entity|null} the found Entity object, or null
 */
function what(array, name) {
    for(let i = 0; i < array.length; i++) {
        if(array[i].name.toLowerCase() === name.toLowerCase()) return array[i];
    }
    return null;
}

/**
 * Looks for the Entity object whose name matches the given name. Returns TRUE if found, FALSE if not.
 * @param {array} array the array of Entity objects to search in
 * @param {string} name the name of the Entity object to look for
 * @returns {bool} whether the Entity was found 
 */
function containsByName(array, name) {
    for(let i = 0; i < array.length; i++) {
        if(array[i].name.toLowerCase() === name.toLowerCase()) return true;
    }
    return false;
}

/**
 * Looks for a value inside an array. Returns TRUE if found, FALSE if not.
 * @param {array} array 
 * @param {any} value 
 * @returns 
 */
function arrayContains(array, value) {
    for(let i = 0; i < array.length; i++) {
        if(array[i] == value) return true;
    }
    return false;
}

/**
 * Returns a random element of an array.
 * @param {array} array the array to select from
 * @returns {any} a random element from the array
 */
function choose(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Finds the amount of time any Entity object in an array matches the given name.
 * @param {array} array the Entity object to search into
 * @param {string} value the name to look for
 * @returns {number} the amount of Entity objects that were found
 */
function getOccurrenceByName(array, value) {
    return array.filter(x => x.name === value.name).length;
}

/**
 * Finds the amount of the given resource name in an array of Resource objects.
 * @param {array} array the Resource array to look into
 * @param {string} name the name to look for
 * @returns {number} the amount of resources that was found
 */
function getResourceAmount(array, name) {
    if(!what(array, name)) return 0;
    return what(array, name).amount;
}

/**
 * Tells whether the provided resource's amount is superior to 0 in the provided resources array.
 * @param {array} array the Resources array
 * @param {string} name the name of the Resource
 * @returns whether the resource is possessed 
 */
function hasResource(array, name) {
    return what(array, name).amount > 0;
}

/**
 * Looks for the Effect inside the given array.
 * @param {array} array the array to search into
 * @param {Data.Effect} name the Effect to look for
 * @returns {Data.Effect|null}
 */
function findEffect(array, name) {
    for(let i = 0; i < array.length; i++) {
        if(array[i].effect === name) return array[i];
    }
    return null;
}

/**
 * Generates a random number for particle generation.
 * @param {number} min minimum number
 * @param {number} max maximum number
 * @returns {number} a random number 
 */
function getRandomNumber(min, max) {
    // swap min and max if min is greater than max
    if(min > max) [min, max] = [max, min];
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Dice roll : generates a random number between 0 and 100, and checks if it is below the given number.
 * @param {number} chance a number between 0 and 100
 * @returns {boolean} whether the dice roll was a success
 */
function computeChance(chance) {
    return getRandomNumber(0, 100) <= chance;
}

/**
 * Generates an string from an array of 3 boolean (a range array).
 * @param {array} range - the range array
 * @param {array} compare - a comparison array that modifies the range array. TRUE enables, FALSE leaves unchanged, NULL disables.
 * @returns {string} - a string that contains literal, translated values of the range array.
 */
function getRangeString(range, compare) {
    // compare : TRUE enables. FALSE leaves unchanged. NULL disables.
    let str = '';
    let newrange = range.slice();
    if(compare) {
        for(let i = 0; i < range.length; i++) {
            compare[i] ? newrange[i] = true : (compare[i] == null) ? newrange[i] = false : '';
        }
    }
    if(newrange[0]) str += 'Front, ';
    if(newrange[1]) str += 'Middle, ';
    if(newrange[2]) str += 'Back, ';
    str !== '' ? str = str.slice(0, -2) : str = 'None';
    return str;
}

/**
 * Generates a verbose target string (for a Skill tooltip) based on the range string provided.
 * @param {string} range the range string
 * @returns {string} the target string
 */
function getTargetString(range) {
    const selector = (range.charAt(0) === '-' ? ', ' : ' + ');
    const targets = range.substring(1);
    let result = '';
    for(let i = 0; i < targets.length; i++) {
        switch(targets.charAt(i)) {
            case '1':
                result += 'Front' + selector;
                break;
            case '2':
                result += 'Middle' + selector;
                break;
            case '3':
                result += 'Back' + selector;
                break;
        }
    }
    result !== '' ? result = result.substring(0, (result.length - selector.length)) : result = 'None';
    return result;
}

/**
 * Outputs the elements of the string array into a single string, separated with commas.
 * @param {array} value an array of string
 * @returns {string} 
 */
function getStringArrayElements(value) {
    let str = '';
    for(let i = 0; i < value.length; i++) {
        str += capitalizeFirstLetter(value[i]) + ', ';
    }
    str !== '' ? str = str.slice(0, -2) : str = 'None';
    return str;
}

/**
 * Gives the Recipe crafting category based on the Recipe's output item.
 * @param {Recipe} recipe the Recipe to get the crafting category from
 * @returns {string} the crafting category that matches the Recipe type
 */
function getRecipeType(recipe) {
    if(recipe.result instanceof Weapon) return "weaponscrafting";
    else if(recipe.result instanceof Armor) return "armorscrafting";
    else if(recipe.result instanceof Trinket) return "trinketscrafting";
    else if(recipe.result instanceof Rune) return "runescrafting";
}

/**
 * Generates an object that contains empty rune stats based on its type.
 * @param {string} type the rune type ("weapon" or "armor")
 * @param {boolean} bleedIncurable does the rune have the bleedIncurable effect?
 * @param {boolean} poisonIncurable does the rune have the poisonIncurable effect?
 * @returns {object} an object containing the empty rune stats
 */
function getEmptyRuneStats(type, bleedIncurable, poisonIncurable) {
    if(type === "weapon") {
        const bcur = (bleedIncurable !== null) ? bleedIncurable : true;
        const pcur = (poisonIncurable !== null) ? poisonIncurable : true;
        return {
            pdmg: 0,
            mdmg: 0,
            block: 0,
            effort: 0,
            crit_luk: 0,
            crit_dmg: 0,
            bleed_dmg: 0,
            bleed_dur: 0,
            bleed_cur: bcur,
            poisn_dmg: 0,
            poisn_dur: 0,
            poisn_cur: pcur,
            range: [false, false, false],
        }
    } else if(type === "armor") {
        return {
            pres: 0,
            mres: 0,
            optres: [false, false, false, false, false, false, false, false],
        }
    }
}

/**
 * 
 * @param {Rune} rune the Rune to retrieve the stats from
 * @param {boolean} bleedIncurable should the bleeding be incurable?
 * @param {boolean} poisonIncurable should the poison be incurable?
 * @returns 
 */
function getRuneStats(rune, bleedIncurable, poisonIncurable) {
    if(rune.type == "weapon") {
        let stats = {
            pdmg: 0,
            mdmg: 0,
            block: 0,
            effort: 0,
            crit_luk: 0,
            crit_dmg: 0,
            bleed_dmg: 0,
            bleed_dur: 0,
            bleed_cur: true,
            poisn_dmg: 0,
            poisn_dur: 0,
            poisn_cur: true,
            range: [false, false, false]
        }
        if(bleedIncurable !== null) stats.bleed_cur = bleedIncurable;
        if(poisonIncurable !== null) stats.poisn_cur = poisonIncurable;
        rune.stats.forEach( (element) => {
           switch(element.effect) {
                case Data.Effect.PDMG:
                    stats.pdmg = element.value;
                    break;
                case Data.Effect.MDMG:
                    stats.mdmg = element.value;
                    break;
                case Data.Effect.BLOCK:
                    stats.block = element.value;
                    break;
                case Data.Effect.EFFORT:
                    stats.effort = element.value;
                    break;
                case Data.Effect.CRIT_LUK:
                    stats.crit_luk = element.value;
                    break;
                case Data.Effect.CRIT_DMG:
                    stats.crit_dmg = element.value;
                    break;
                case Data.Effect.BLEED_DMG:
                    stats.bleed_dmg = element.value;
                    break;
                case Data.Effect.BLEED_DURATION:
                    stats.bleed_dur = element.value;
                    break;
                case Data.Effect.BLEED_CURABLE:
                    stats.bleed_cur = true;
                    break;
                case Data.Effect.BLEED_INCURABLE:
                    stats.bleed_cur = false;
                    break;
                case Data.Effect.POISON_DMG:
                    stats.poisn_dmg = element.value;
                    break;
                case Data.Effect.POISON_DURATION:
                    stats.poisn_dur = element.value;
                    break;
                case Data.Effect.POISON_CURABLE:
                    stats.poisn_cur = true;
                    break;
                case Data.Effect.POISON_INCURABLE:
                    stats.poisn_cur = false;
                    break;
                case Data.Effect.RANGE_FRONT_ON:
                    stats.range[0] = true;
                    break;
                case Data.Effect.RANGE_MIDDLE_ON:
                    stats.range[1] = true;
                    break;
                case Data.Effect.RANGE_BACK_ON:
                    stats.range[2] = true;
                    break;
                case Data.Effect.RANGE_FRONT_OFF:
                    stats.range[0] = null;
                    break;
                case Data.Effect.RANGE_MIDDLE_OFF:
                    stats.range[1] = null;
                    break;
                case Data.Effect.RANGE_BACK_OFF:
                    stats.range[2] = null;
                    break;
               default:
                   ERROR('Unknown rune effect!');
           }
        });
        return stats;
    } else if(rune.type == "armor") {
        let stats = {
            pres: 0,
            mres: 0,
            optres: [false, false, false, false, false, false, false, false], //axe, bow, dagger, hammer, spear, staff, sword, warscythe
        };
        rune.stats.forEach( (element) => {
            switch(element.effect) {
                case Data.Effect.PRES:
                    stats.pres = element.value;
                    break;
                case Data.Effect.MRES:
                    stats.mres = element.value;
                    break;
                case Data.Effect.OPT_RES_AXE_ON:
                    stats.optres[0] = true;
                    break;
                case Data.Effect.OPT_RES_AXE_OFF:
                    stats.optres[0] = null;
                    break;
                case Data.Effect.OPT_RES_BOW_ON:
                    stats.optres[1] = true;
                    break;
                case Data.Effect.OPT_RES_BOW_OFF:
                    stats.optres[1] = null;
                    break;
                case Data.Effect.OPT_RES_DAGGER_ON:
                    stats.optres[2] = true;
                    break;
                case Data.Effect.OPT_RES_DAGGER_OFF:
                    stats.optres[2] = null;
                    break;
                case Data.Effect.OPT_RES_HAMMER_ON:
                    stats.optres[3] = true;
                    break;
                case Data.Effect.OPT_RES_HAMMER_OFF:
                    stats.optres[3] = null;
                    break;
                case Data.Effect.OPT_RES_SPEAR_ON:
                    stats.optres[4] = true;
                    break;
                case Data.Effect.OPT_RES_SPEAR_OFF:
                    stats.optres[4] = null;
                    break;
                case Data.Effect.OPT_RES_STAFF_ON:
                    stats.optres[5] = true;
                    break;
                case Data.Effect.OPT_RES_STAFF_OFF:
                    stats.optres[5] = null;
                    break;
                case Data.Effect.OPT_RES_SWORD_ON:
                    stats.optres[6] = true;
                    break;
                case Data.Effect.OPT_RES_SWORD_OFF:
                    stats.optres[6] = null;
                    break;
                case Data.Effect.OPT_RES_WARSCYTHE_ON:
                    stats.optres[7] = true;
                    break;
                case Data.Effect.OPT_RES_WARSCYTHE_OFF:
                    stats.optres[7] = null;
                    break;
                default:
                    ERROR('Unknown rune effect!');
            }
        });
        return stats;
    }
}

/**
 * Retrieves all of the Armors which type matches the one that is provided.
 * @param {array} armors 
 * @param {string} type 
 * @returns {array} a sorted array of armors
 */
function getArmorTypeArray(armors, type) {
    return armors.filter((armor) => {
        return armor.type === type;
    })
}

/**
 * Converts the hex string to an rgba format.
 * @param {string} hex 
 * @param {number} alpha 
 * @returns {string} an rgba string 
 */
function hexToRGBA(hex, alpha = 1) {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Returns the color code that matches the provided rarity.
 * @param {string} rarity 
 * @returns {string} a color code
 */
function getRarityColorCode(rarity) {
    switch(rarity) {
        case Data.Rarity.COMMON:
            return Data.Color.COMMON;
        case Data.Rarity.UNCOMMON:
            return Data.Color.UNCOMMON;
        case Data.Rarity.RARE:
            return Data.Color.RARE;
        case Data.Rarity.EPIC:
            return Data.Color.EPIC;
        case Data.Rarity.LEGENDARY:
            return Data.Color.LEGENDARY;
        case Data.Rarity.ELDER:
            return Data.Color.ELDER;
    }
}

/**
 * Returns a particle density value based on the provided rarity.
 * @param {string} rarity the rarity
 * @returns {number} the density
 */
function getParticleDensity(rarity) {
    switch(rarity) {
        case Data.Rarity.COMMON:
            return 0;
        case Data.Rarity.UNCOMMON:
            return 2;
        case Data.Rarity.RARE:
            return 4;
        case Data.Rarity.EPIC:
            return 6;
        case Data.Rarity.LEGENDARY:
            return 8;
        case Data.Rarity.ELDER:
            return 10;
    }
}

/**
 * Returns a particle gravity modifier value based on the provided rarity.
 * @param {string} rarity the rarity
 * @returns {number} the gravity modifier
 */
function getParticleGravity(rarity) {
    switch(rarity) {
        case Data.Rarity.COMMON:
            return 0;
        case Data.Rarity.UNCOMMON:
            return -0.03;
        case Data.Rarity.RARE:
            return -0.06;
        case Data.Rarity.EPIC:
            return -0.1;
        case Data.Rarity.LEGENDARY:
            return -0.12;
        case Data.Rarity.ELDER:
            return -0.15;
    }
}

/**
 * Returns a particle Y velocity value based on the provided rarity.
 * @param {string} rarity the rarity
 * @returns {number} the Y velocity value
 */
function getParticleVelocityY(rarity) {
    switch(rarity) {
        case Data.Rarity.COMMON:
            return 0;
        case Data.Rarity.UNCOMMON:
            return getRandomNumber(0.8, 1.2);
        case Data.Rarity.RARE:
            return getRandomNumber(1, 1.4);
        case Data.Rarity.EPIC:
            return getRandomNumber(1.2, 1.6);
        case Data.Rarity.LEGENDARY:
            return getRandomNumber(1.4, 1.8);
        case Data.Rarity.ELDER:
            return getRandomNumber(1.6, 1.9);
    }
}

/**
 * Returns a particle X velocity value based on the provided rarity.
 * @param {string} rarity the rarity
 * @returns {number} the X velocity value
 */
function getParticleVelocityX(rarity) {
    switch(rarity) {
        case Data.Rarity.COMMON:
            return 0;
        case Data.Rarity.UNCOMMON:
            return (-1 + Math.round(Math.random()) * 2) * getRandomNumber(0.2, 0.4);
        case Data.Rarity.RARE:
            return (-1 + Math.round(Math.random()) * 2) * getRandomNumber(0.3, 0.5);
        case Data.Rarity.EPIC:
            return (-1 + Math.round(Math.random()) * 2) * getRandomNumber(0.4, 0.6);
        case Data.Rarity.LEGENDARY:
            return (-1 + Math.round(Math.random()) * 2) * getRandomNumber(0.6, 0.8);
        case Data.Rarity.ELDER:
            return (-1 + Math.round(Math.random()) * 2) * getRandomNumber(1, 1.5);
    }
}

/**
 * Returns a particle lifetime value based on the provided rarity.
 * @param {string} rarity 
 * @returns {number} the particle lifetime
 */
function getParticleLifetime(rarity) {
    switch(rarity) {
        case Data.Rarity.COMMON:
            return 0;
        case Data.Rarity.UNCOMMON:
            return 45;
        case Data.Rarity.RARE:
            return 40;
        case Data.Rarity.EPIC:
            return 30;
        case Data.Rarity.LEGENDARY:
            return 20;
        case Data.Rarity.ELDER:
            return 18;
    }
}

/**
 * Returns whether the provided NPC is an enemy.
 * @param {NPC} npc 
 * @returns {bool} whether the NPC is an enemy
 */
function isEnemy(npc) {
    if(npc.type === Data.NPCType.ANIMA 
        || npc.type === Data.NPCType.BEAST
        || npc.type === Data.NPCType.DEVIL
        || npc.type === Data.NPCType.UNDEAD
        || npc.type === Data.NPCType.ENEMIES) return true;
    else return false;
}

/**
 * Removes the provided item from the provided array.
 * @param {array} array 
 * @param {any} item 
 * @returns {boolean} true if removal was successful, false if removal has failed
 */
function removeFromArray(array, item) {
    const index = array.indexOf(item);
    if(index > -1) {
        array.splice(index, 1);
        return true;
    }
    return false;
}

function getRandomNumberFromArray(array) {
    return getRandomNumber(array[0], array[1]);
}

/**
 * Randomly shuffles the elements of an array (a basic application of the Fisher-Yates algorithm).
 * @param {array} array the array to shuffle
 * @returns the newly shuffled array
 */
function shuffle(array) {
    for(let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
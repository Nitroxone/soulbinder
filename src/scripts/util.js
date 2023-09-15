/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

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
function getIcon(entity, forceModif = 0, border = false) {
    let bgModif = 70;
    if(!entity) return 'background-image: none; background-size: '+ bgModif + '%;';
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
    else if(entity instanceof Sigil) {
        type = "sigils";
        bgModif = 60;
    }
    else if(entity instanceof Consumable) type = 'potions';
    if(forceModif != 0) bgModif = forceModif;

    return 'background-image: url(css/img/' + type + '/' + entity.icon + '.png); background-size: '+ bgModif + '%;' + (border ? 'border: 1px solid ' + getRarityColorCode(entity.rarity) + ' !important;' : '');
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
    if(array.length === 0) return false;
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
    if(!array || !value) return false;
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
function getRandomNumber(min, max, allowFloat = false) {
    // swap min and max if min is greater than max
    if(min > max) [min, max] = [max, min];
    if(allowFloat) return Math.random() * (max - min + 1) + min;
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
    if(newrange[2]) str += 'Front, ';
    if(newrange[1]) str += 'Middle, ';
    if(newrange[0]) str += 'Back, ';
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
    else if(recipe.result instanceof Sigil) return "sigilscrafting";
}

/**
 * Generates an object that contains empty sigil stats based on its type.
 * @param {string} type the sigil type ("weapon" or "armor")
 * @param {boolean} bleedIncurable does the sigil have the bleedIncurable effect?
 * @param {boolean} poisonIncurable does the sigil have the poisonIncurable effect?
 * @returns {object} an object containing the empty sigil stats
 */
function getEmptySigilStats(type, bleedIncurable, poisonIncurable) {
    if(type === "weapon") {
        const bcur = (bleedIncurable !== null) ? bleedIncurable : true;
        const pcur = (poisonIncurable !== null) ? poisonIncurable : true;
        return {
            sharpness: 0,
            withering: 0,
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
            resilience: 0,
            warding: 0,
            optres: [false, false, false, false, false, false, false, false],
        }
    }
}

/**
 *
 * @param {Sigil} sigil the Sigil to retrieve the stats from
 * @param {boolean} bleedIncurable should the bleeding be incurable?
 * @param {boolean} poisonIncurable should the poison be incurable?
 * @returns
 */
function getSigilStats(sigil, bleedIncurable, poisonIncurable) {
    if(sigil.type == "weapon") {
        let stats = {
            sharpness: 0,
            withering: 0,
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
        sigil.stats.forEach( (element) => {
           switch(element.effect) {
                case Data.Effect.SHARPNESS:
                    stats.sharpness = element.value;
                    break;
                case Data.Effect.WITHERING:
                    stats.withering = element.value;
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
                   ERROR('Unknown sigil effect!');
           }
        });
        return stats;
    } else if(sigil.type == "armor") {
        let stats = {
            resilience: 0,
            warding: 0,
            optres: [false, false, false, false, false, false, false, false], //axe, bow, dagger, hammer, spear, staff, sword, warscythe
        };
        sigil.stats.forEach( (element) => {
            switch(element.effect) {
                case Data.Effect.RESILIENCE:
                    stats.resilience = element.value;
                    break;
                case Data.Effect.WARDING:
                    stats.warding = element.value;
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
                    ERROR('Unknown sigil effect!');
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
        case Data.Rarity.GOLD:
            return Data.Color.GOLD;
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
        case Data.Rarity.GOLD:
            return 2;
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

/**
 * Returns the last key in the provided object.
 * @param {object} obj the object to look into
 * @returns {any} the last key in the object
 */
function getLastObjectKey(obj) {
    const keys = Object.keys(obj);
    const lastKey = keys[keys.length - 1];
    return lastKey;
}

function isArmorEffect(effect) {
    return effect.effect === Data.Effect.RESILIENCE || effect.effect === Data.Effect.WARDING;
}

/**
 * Tells whether the provided Effect (supposedly an Echo effect) is already on the provided Trinket.
 * @param {Trinket} trinket the Trinket on which to perform the check
 * @param {Stat} effect the Effect to check for
 * @returns {boolean} whether the provided effect is already present
 */
function isDuplicateOnTrinket(trinket, effect) {
    trinket.effects.forEach(single => {
        if(single.effect === effect.effect) return true;
    });
    return false;
}

function playSound(source, volume = 0.5, pitch = 1) {
    const audio = new Audio(source);
    audio.volume = volume;
    if(pitch != 1) {
        audio.preservesPitch = false;
    }
    audio.playbackRate = pitch;
    audio.play();
}

function trimWhitespacesInsideString(string) {
    return string.replace(/\s+/g, '').replace(/'/g, '');
}

/**
 * Returns an RGB color code based on the node's status.
 * @param {SkillTreeNode} child the Child Node to check for
 * @param {SkillTreeNode} node the Parent Node, required for additional checks
 * @returns {string} an RGB code
 */
function getLineColorFromNodeState(child, node) {
    if(!child) return 'rgb(50, 50, 50)';
    if(node.currentLevel == 0) return 'rgb(100, 100, 100)';

    if(child.currentLevel == child.levels) return 'rgb(76, 187, 23)';
    else if(child.currentLevel > 0) return 'rgb(255, 191, 0)';
    else if(child.currentLevel == 0 && node.isUnlocked()) return 'rgba(175, 175, 175)';
    else if(!child.isUnlocked()) return 'rgb(100, 100, 100)';
}

function getBorderClassFromNode(node) {
    if(!node) return 'coolBorder';

    if(node.currentLevel == node.levels) return 'borderNodeFull';
    else if(node.currentLevel > 0) return 'borderNodeOngoing';
    else if(node.currentLevel == 0 && node.isUnlocked()) return 'coolBorder';
    else if(!node.isUnlocked()) return 'coolBorder';
}

/**
 * Retrieves the Effect's key name based on its value that is written in the Data set.
 * @param {Data.Effect} effect the Effect value to retrieve the name from
 * @param {boolean} full should the Effect name be prefixed with "Data.Effect." ?
 * @returns {string} the Effect's key name in the Data set
 */
function getEffectNameFromKey(effect, full = false) {
    const key = Object.keys(Data["Effect"]).find(key => Data["Effect"][key] === effect);
    const prefix = full ? 'Data.Effect.' : '';
    return prefix + key;
}

/**
 * Returns the provided Effect's persistance value from the Astral Forge Config.
 * @param {Data.Effect} effect the Effect
 * @returns {number} the Effect's persistance
 */
function getPersistanceFromConfig(effect) {
    return Config.AstralForge[getEffectNameFromKey(effect)][0];
}

/**
 * Returns the provided Effect's substrate value from the Astral Forge Config.
 * @param {Data.Effect} effect the Effect
 * @returns {number} the Effect's substrate
 */
function getSubstrateFromConfig(effect) {
    return Config.AstralForge[getEffectNameFromKey(effect)][1];
}

/**
 * Returns the provided Effect's over value from the Astral Forge Config.
 * @param {Data.Effect} effect the Effect
 * @returns {number} the Effect's over value
 */
function getOverValueFromConfig(effect) {
    return Config.AstralForge[getEffectNameFromKey(effect)][2];
}

/**
 * Compares the two Effects if the excluded parameter is not null, and returns false if they match.
 * Returns if the excluded parameter is null.
 * @param {Data.Effect} effect
 * @param {Data.Effect} excluded
 * @returns {boolean}
 */
function compareWithExcluded(effect, excluded) {
    if(excluded) return !(effect === excluded);
    return true;
}

/**
 * Returns whether the provided Effect is defined as a percentage value in the Config.
 * @param {Data.Effect} effect the Effect
 * @returns {boolean}
 */
function isAstralForgeEffectPercentage(effect) {
    const info = Config.EffectPercentage[getEffectNameFromKey(effect)];
    if(!info) return false;
    else return info;
}

/**
 * Retrieves the Weapon from the Player's Inventory, which ID matches the one that is provided.
 * @param {number} id the Weapon's ID
 * @returns {Weapon|null} the Weapon that was found, or null if it was not found
 */
function getInventoryWeaponById(id) {
    return game.player.inventory.weapons.find(x => x.id === id);
}

/**
 * Retrieves the Armor from the Player's Inventory, which ID matches the one that is provided.
 * @param {number} id the Armor's ID
 * @returns {Armor|null} the Armor that was found, or null if it was not found
 */
function getInventoryArmorById(id) {
    return game.player.inventory.armors.find(x => x.id === id);
}

/**
 * Retrieves the Trinket from the Player's Inventory, which ID matches the one that is provided.
 * @param {number} id the Trinket's ID
 * @returns {Trinket|null} the Trinket that was found, or null if it was not found
 */
function getInventoryTrinketById(id) {
    return game.player.inventory.trinkets.find(x => x.id === id);
}

/**
 * Retrieves the Resource from the Player's Inventory, which ID matches the one that is provided.
 * @param {number} id the Resource's ID
 * @returns {Trinket|null} the Resource that was found, or null if it was not found
 */
function getInventoryResourceById(id) {
    return game.player.inventory.resources.find(x => x.id === id);
}

/**
 * Retrieves the Sigil from the Player's Inventory, which ID matches the one that is provided.
 * @param {number} id the Sigil's ID
 * @returns {Sigil|null} the Sigil that was found, or null if it was not found
 */
function getInventorySigilById(id) {
    return game.player.inventory.sigils.find(x => x.id === id);
}

/**
 * Retrieves a Weapon, Armor, or Trinket, based on its unique ID.
 * @param {number} id the item's ID
 * @returns {Weapon|Armor|Trinket} the item
 */
function getAstralForgeItem(id) {
    const wpn = getInventoryWeaponById(id);
    const armor = getInventoryArmorById(id);
    const trinket = getInventoryTrinketById(id);

    if(wpn) return wpn;
    if(armor) return armor;
    if(trinket) return trinket;
    throw new Error('Associated AstralForge item with ID ' + id + ' could not be found.');
}

/**
 * Checks whether the provided Item can host an AstralForge item (ie. if the provided Item is an instance of Weapon class, or Armor class, or Trinket class).
 * @param {Item} item the Item to check
 * @returns {boolean} whether the provided Item can receive an AstralForge object
 */
function canReceiveAstralForge(item) {
    return item instanceof Weapon || item instanceof Armor || item instanceof Trinket;
}

/**
 * Returns whether the provided shard can alter an Item.
 * @param {TimeShard} shard the Shard to check
 * @returns {boolean} whether the Shard can overload an item
 */
function canShardOverload(shard) {
    return shard.getValueType() === 'string';
}

/**
 * Returns the CSS class that is associated to the provided outcome.
 * @param {Data.AlterationAttemptOutcome} outcome the outcome to look for
 * @returns {string} the associated CSS class
 */
function getAstralForgeOutcomeCSSClass(outcome) {
    return "astralForgeHistory-" + trimWhitespacesInsideString(outcome);
}

/**
 * Returns the opposite of the provided boolean effect.
 * @param {Data.Effect} effect the Effect to get the opposite of
 * @returns {Data.Effect} the opposite effect
 */
function getOppositeOfBooleanEffect(effect) {
    switch(effect) {
        case Data.Effect.BLEED_CURABLE:
            return Data.Effect.BLEED_INCURABLE;
        case Data.Effect.BLEED_INCURABLE:
            return Data.Effect.BLEED_CURABLE;
        case Data.Effect.POISON_CURABLE:
            return Data.Effect.POISON_INCURABLE;
        case Data.Effect.POISON_INCURABLE:
            return Data.Effect.POISON_CURABLE;
        case Data.Effect.RANGE_FRONT_OFF:
            return Data.Effect.RANGE_FRONT_ON;
        case Data.Effect.RANGE_FRONT_ON:
            return Data.Effect.RANGE_FRONT_OFF;
        case Data.Effect.RANGE_MIDDLE_OFF:
            return Data.Effect.RANGE_MIDDLE_ON;
        case Data.Effect.RANGE_MIDDLE_ON:
            return Data.Effect.RANGE_MIDDLE_OFF;
        case Data.Effect.RANGE_BACK_OFF:
            return Data.Effect.RANGE_BACK_ON;
        case Data.Effect.RANGE_BACK_ON:
            return Data.Effect.RANGE_BACK_OFF;
        default:
            console.warn('No opposite effect found for ' + effect);
            return undefined;
    }
}

/**
 * Returns whether the provided effect is an effect that turns something off.
 * @param {Data.Effect} effect the Effect to check
 * @returns {boolean} whether the provided Effect is a disabler
 */
function isBooleanEffectDisabler(effect) {
    const disablers = [
        Data.Effect.BLEED_INCURABLE,
        Data.Effect.POISON_INCURABLE,
        Data.Effect.RANGE_FRONT_OFF,
        Data.Effect.RANGE_MIDDLE_OFF,
        Data.Effect.RANGE_BACK_OFF
    ];
    return disablers.includes(effect);
}

/**
 * Returns whether the provided outcome is successful (either a SUCCESS or a CRITICAL SUCCESS).
 * @param {Data.AlterationAttemptOutcome} outcome the outcome to check
 * @returns {boolean} whether the outcome is successful
 */
function isAlterationOutcomeSuccessful(outcome) {
    return outcome === Data.AlterationAttemptOutcome.SUCCESS || outcome === Data.AlterationAttemptOutcome.CRITICAL_SUCCESS;
}

/**
 * Returns the provided AstralForge's bookmark from the provided ID. Returns null if none is found.
 * @param {Item} item the AstralForge to check on
 * @param {number} id the bookmark's ID
 * @returns {object|null} the bookmark (or null if none was found)
 */
function findAstralForgeBookmarkByID(item, id) {
    let bookmark = null;
    item.history.forEach(hist => {
        if(hist.id === id) bookmark = hist;
    });
    return bookmark;
}

/**
 * Returns the rounded up average of the two provided numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number} the rounded up average of a and b
 */
function getAverage(a, b) {
    return Math.ceil((a+b) / 2);
}

/**
 * Returns the color that is associated with the provided Effect.
 * @param {Data.Effect} effect the Effect to check
 * @returns {Data.Color} the associated Color
 */
function getAstralForgeEffectColor(effect) {
    let color;
    if(effect.effect === Data.Effect.EFFORT) color = effect.getValue() > 0 ? Data.Color.RED : Data.Color.GREEN;
    else color = effect.getValue() > 0 ? Data.Color.GREEN : Data.Color.RED;
    if(effect.getValue() === 0) color = 'white';

    return color
}

/**
 * Generates a string that contains the filepath to the provided Item's icon.
 * @param {Item} item the Item to retrieve the file info from
 * @returns {string} a CSS filepath string
 */
function getIconFileFromItem(item) {
    let filename = 'css/img/';

    if(item instanceof Weapon) filename += 'weapons/';
    else if(item instanceof Armor) filename += 'armors/';
    else if(item instanceof Trinket) filename += 'trinkets/';

    return filename + item.icon + '.png';
}

/**
 * Returns the type of the provided Item.
 * @param {Item} item the Item to retrieve to type from
 * @returns {Data.ItemType|string} the matching ItemType
 */
function getItemType(item) {
    if(item instanceof Weapon || item instanceof Armor) return item.type;
    else if(item instanceof Trinket) return Data.ItemType.TRINKET;
}

/**
 * Generates a string that corresponds to the provided item's rarity inset shadow CSS rule.
 * @param {Item} item the Item to retrieve the rarity from
 * @returns {string} a CSS rule
 */
function getInsetShadowFromRarity(item) {
    return "insetShadow" + capitalizeFirstLetter(item.rarity);
}

/**
 * Returns the Data.Color that matchest the provided Data.AstralForgeState.
 * @param {Data.AstralForgeState} state the Data.AstralForgeState
 * @returns {Data.Color} the Data.Color that matches
 */
function getAstralForgeItemStateColorCode(state) {
    switch(state) {
        case Data.AstralForgeState.STABLE:
            return Data.Color.TURQUOISE;
        case Data.AstralForgeState.WARPED:
            return Data.Color.ORANGE;
        case Data.AstralForgeState.SEALED:
            return Data.Color.CORRUPT;
    }
}

/**
 * Returns the CSS class that matches the provided Data.SkillType.
 * @param {Data.SkillType} type the SkillType
 * @returns {string} a CSS class
 */
function getColorClassFromSkillType(type) {
    return 'skillType-' + type;
}

/**
 * Returns the CSS class that matches the provided Data.SkillDamageType.
 * @param {Data.SkillDamageType} type the SkillDamageType
 * @returns {string} a CSS class
 */
function getColorClassFromDmgType(type) {
    return 'skillDmgType-' + type;
}

/**
 * Looks for the provided "property" as a key inside the "props" object. If it exists, returns that property. If not, returns the "def" (= default) parameter.
 * @param {object} props the object to look inside
 * @param {string} property the property name to look for
 * @param {any} def the default value of the property
 * @returns {any} the props property value, or the def parameter if not found
 */
function getValueFromObject(props, property, def) {
    if(property in props) return props[property];
    return def;
}

/**
 * Replaces each word between two § tokens by a span HTML tag.
 * @param {string} desc the string to process
 * @returns {string} the processed string
 */
function processSkillDescription(desc) {
    const regex = /§(.*?)§/g;
    const replacedString = desc.replace(regex, '<span style="color: ' + Data.Color.PURPLE + '; font-family: RobotoBold;">$1</span>');

    return replacedString;
}

/**
 * Returns the fighter that is currently located at the provided position.
 * @param {string|Data.FormationPosition} pos a CSS position class string or a Data.FormationPosition string
 * @returns {NPC} the fighter that matches
 */
function getFighterFromPosition(pos) {
    switch(pos) {
        case 'b-hero-back':
            return game.currentBattle.allies[0];
        case 'b-hero-middle':
            return game.currentBattle.allies[1];
        case 'b-hero-front':
            return game.currentBattle.allies[2];
        case 'b-enemy-back':
            return game.currentBattle.enemies[0];
        case 'b-enemy-middle':
            return game.currentBattle.enemies[1];
        case 'b-enemy-front':
            return game.currentBattle.enemies[2];
    }
}

/**
 * Returns the NPC whose type and position are specified as parameters.
 * @param {Data.BattleFighterType} type the NPC type
 * @param {Data.FormationPosition} position the NPC position
 * @returns {NPC} the matching NPC
 */
function getFighterFromPositionAndType(type, position) {
    if(type === Data.BattleFighterType.ENEMY) {
        switch(position) {
            case Data.FormationPosition.BACK:
                return game.currentBattle.allies[0];
            case Data.FormationPosition.MIDDLE:
                return game.currentBattle.allies[1];
            case Data.FormationPosition.FRONT:
                return game.currentBattle.allies[2];
        }
    } else if(type === Data.BattleFighterType.HERO) {
        switch(position) {
            case Data.FormationPosition.BACK:
                return game.currentBattle.allies[0];
            case Data.FormationPosition.MIDDLE:
                return game.currentBattle.allies[1];
            case Data.FormationPosition.FRONT:
                return game.currentBattle.allies[2];
        }
    }
}

/**
 * Returns an entrance set that matches the settings of the provided DungeonEvent.
 * @param {DungeonEvent} dungeon the DungeonEvent
 * @returns {string} a matching set
 */
function getDungeonEntranceSet(dungeon) {
    return Speech.Dungeon[dungeon.zone][dungeon.type][dungeon.biome][Math.floor(Math.random() * Speech.Dungeon[dungeon.zone][dungeon.type][dungeon.biome].length)];
}

/**
 * Returns a regular set that matches the settings of the provided DungeonEvent.
 * @param {DungeonEvent} dungeon the DungeonEvent
 * @returns {string} a matching set
 */
function getDungeonRegularSet(dungeon) {
    return Speech.Dungeon[dungeon.zone][dungeon.type][dungeon.biome][dungeon.level][dungeon.instance][Math.floor(Math.random() * Speech.Dungeon[dungeon.zone][dungeon.type][dungeon.biome][dungeon.level][dungeon.instance].length)]
}

/**
 * Returns an entrance set that matches the settings of the provided DungeonEvent (same as entrance, but for closing).
 * @param {DungeonEvent} dungeon the DungeonEvent
 * @returns {string} a matching set
 */
function getDungeonClosingSet(dungeon) {
    return Speech.Dungeon[dungeon.zone][dungeon.type][dungeon.biome][Math.floor(Math.random() * Speech.Dungeon[dungeon.zone][dungeon.type][dungeon.biome].length)];
}

/**
 * Returns the Weapon which ID is provided, on the provided Strider.
 * @param {Strider} strider
 * @param {number} id
 * @returns {Weapon|null}
 */
function getEquippedWeaponById(strider, id) {
    if(strider.eqWeaponBoth && strider.eqWeaponBoth.id === id) return strider.eqWeaponBoth;
    if(strider.eqWeaponLeft && strider.eqWeaponLeft.id === id) return strider.eqWeaponLeft;
    if(strider.eqWeaponRight && strider.eqWeaponRight.id === id) return strider.eqWeaponRight;
    return null;
}

/**
 * Returns the font family that matches the properties of the provided AE styling object.
 * @param {object} props the AE styling object
 * @returns {string} a font family string
 */
function getFontFamilyFromAeStyling(props) {
    if(props.bold) {
        if(props.italic) return 'RobotoBoldItalic';
        return 'RobotoBold';
    }
    if(props.italic) return 'RobotoItalic';
    return 'Roboto';
}

/**
 * Returns whether the provided effect is a movement type.
 * @param {Data.Effect} eff the effect to check
 * @returns {boolean} whether it's a movement effect
 */
function isMovementEffect(eff) {
    return eff === Data.Effect.PULL_ONE
        || eff === Data.Effect.PULL_TWO
        || eff === Data.Effect.PUSH_ONE
        || eff === Data.Effect.PUSH_TWO
        || eff === Data.Effect.FRONT_ONE
        || eff === Data.Effect.FRONT_TWO
        || eff === Data.Effect.BACK_ONE
        || eff === Data.Effect.BACK_TWO;
}

/**
 * Returns whether the provided effect is a base stat ([max]health, [max]mana, [max]stamina) effect.
 * @param {Stat} eff the effect to check
 * @returns {boolean} whether it's a base stat effect
 */
function isBaseStatChange(eff, noMax = false) {
    let compare = [Data.Effect.HEALTH, Data.Effect.MANA, Data.Effect.STAMINA];
    if(!noMax) compare.push(Data.Effect.MAXHEALTH, Data.Effect.MAXSTAMINA, Data.Effect.MAXMANA);

    return compare.includes(eff.effect);
}

/**
 * Returns whether the provided Stat has a MAXSTAT effect (MAXHEALTH, MAXMANA, MAXSTAMINA)
 * @param {Stat} eff the Stat to check
 * @returns whether it's a max stat effect
 */
function isBaseMaxStat(eff) {
    return [Data.Effect.MAXHEALTH, Data.Effect.MAXSTAMINA, Data.Effect.MAXMANA].includes(eff.effect);
}

/**
 * Returns whether the provided effect is a bleeding effect or poisoning effect.
 * @param {Stat} eff the effect to check
 * @returns {boolean} whether it's a bleeding/poisoning effect
 */
function isBleedingOrPoisoning(eff) {
    return isBleedingEffect(eff) || isPoisoningEffect(eff);
}

/**
 * Returns whether the provided effect is a bleeding effect.
 * @param {Stat} eff the effect to check
 * @returns {boolean} whether it's a bleeding effect
 */
function isBleedingEffect(eff) {
    return eff.effect === Data.Effect.BLEEDING_CURABLE
            || eff.effect === Data.Effect.BLEEDING_INCURABLE
}

/**
 * Returns whether the provided effect is a poisoning effect.
 * @param {Stat} eff the effect to check
 * @returns {boolean} whether it's a poisoning effect
 */
function isPoisoningEffect(eff) {
    return eff.effect === Data.Effect.BLIGHT_CURABLE
            || eff.effect === Data.Effect.BLIGHT_INCURABLE
}


/**
 * Returns an EnemyFormation object which params match the ones from the provided Dungeon object.
 * @param {Dungeon} dungeon the Dungeon to retrieve the parameters from
 * @returns {EnemyFormation} a matching EnemyFormation
 */
function getRandomEnemyFormationFromDungeon(dungeon = game.currentDungeon) {
    let available = [];
    game.all_enemyFormations.forEach(ef => {
        if(ef.biome === dungeon.biome && ef.zone === dungeon.zone && ef.levels.includes(dungeon.currentLevel)) available.push(ef);
    });
    return choose(available);
}

/**
 * Returns whether the provided array of DungeonRoom objects has at least one room which coordinates match the ones provided.
 * @param {DungeonRoom[]} rooms the rooms to check
 * @param {number[]} coords the coords to compare
 * @returns {boolean} whether a room was found
 */
function hasRoomWithCoordinates(rooms, coords) {
    for(let i = 0; i < rooms.length; i++) {
        if(rooms[i].coordinates[0] === coords[0] && rooms[i].coordinates[1] === coords[1]) return rooms[i];
    }
    return false;
}

/**
 * Unlocks the eon whose id has been specified as argument
 * @param {string} id id the id of the eon you want to unlock
 * @returns {boolean} the result (true if the specified eon exists)
 */
function unlockEon(id) {
    game.all_majorEons.find(e => e.id === id).unlocked = true;
    drawEonTitles(true);
}

/**
 * Unlocks all eons.
 */
function unlockAllEons() {
    game.all_majorEons.forEach(eon => {
        eon.unlocked = true;
        drawEonTitles(true);
    })
}

/**
 * Unlocks the first locked fragment of the fragments array in the specified eon
 * @param {string} id - The id of the eon
 * @returns {boolean|string} - Returns true if a fragment was successfully unlocked
 *                            Returns 'All fragments have been unlocked.' if all fragments are already unlocked
 *                            Returns 'Eon not found.' if the eon was not found
 */
function unlockEonFragment(id) {
    const eon = game.all_majorEons.find(e => e.id === id);
    if(eon) {
        const fragmentToUnlock = eon.fragments.find(fragment => !fragment.unlocked);
        return fragmentToUnlock ? (fragmentToUnlock.unlocked = true, true) : 'All fragments have been unlocked!';
    }
    return 'Eon not found.'
}

/**
 * Unlocks all eon fragments.
 */
function unlockAllEonFragments() {
    game.all_majorEons.forEach(eon => {
        eon.fragments.forEach(frag => {
            frag.unlocked = true;
        });
    });
}

/**
 * Returns whether the provided HTMLElement is empty.
 * @param {HTMLElement} element the element to check
 * @returns {boolean} whether the element is empty
 */
function isElementEmpty(element) {
    return element.innerHTML.trim() === '';
}

/**
 * Returns either "cleared" or "uncleared" based on the provided "status" variable.
 * @param {*} status the room status
 * @returns {string} either "clear" or "uncleared"
 */
function translateRoomStatus(status) {
    if(status) return "cleared";
    else return "uncleared";
}

/**
 * Returns a dungeon room action based on the provided type.
 * @param {Data.DungeonRoomType} type the type
 * @returns {Data.DungeonRoomAction} a corresponding action
 */
function getActionFromRoomType(type) {
    if(type === Data.DungeonRoomType.EMPTY || type === Data.DungeonRoomType.ENTRANCE) return Data.DungeonRoomAction.SEARCH;
}

/**
 * Returns an object of Quanta Burst settings based on the provided rarity.
 * @param {Data.Rarity} rarity the rarity to look for
 * @returns {object} a Quanta Burst settings object
 */
function getQuantaBurstParamsFromRarity(rarity) {
    switch(rarity) {
        case Data.Rarity.GOLD:
            return {
                color: Data.Color.GOLD,
                amount: 100,
                particleSize: 2
            }
        case Data.Rarity.COMMON:
            return {
                color: Data.Color.COMMON,
                amount: 0,
                particleSize: 3,
            }
        case Data.Rarity.UNCOMMON:
            return {
                color: Data.Color.UNCOMMON,
                amount: 50,
                particleSize: 3,
            }
        case Data.Rarity.RARE:
            return {
                color: Data.Color.RARE,
                amount: 200,
                particleSize: 3,
            }
        case Data.Rarity.EPIC:
            return {
                color: Data.Color.EPIC,
                amount: 250,
                particleSize: 3,
            }
        case Data.Rarity.LEGENDARY:
            return {
                color: Data.Color.LEGENDARY,
                amount: 300,
                particleSize: 4,
            }
        case Data.Rarity.ELDER:
            return {
                color: Data.Color.ELDER,
                amount: 500,
                particleSize: 6,
            }
    }
}

/**
 * Returns a random math sign.
 * @returns {number} either 1 or -1
 */
function getRandomSign() {
    return Math.random() < 0.5 ? -1 : 1;
}

/**
 * Returns an HTML content string that contains a dungeon search button.
 * @param {boolean} min whether the button should be minimized
 * @returns {string} an HTML content string
 */
function getDungeonSearchButton(min = false) {
    return '<div class="roomActions-action search' + (min ? ' minEnter' : '') + '"><h4>Search</h4></div>';
}

/**
 * Returns an HTML content string that contains a dungeon scout button.
 * @returns {string} an HTML content string
 */
function getDungeonScoutButton() {
    return '<div class="roomActions-action scout">'
    + '<h4>Scout</h4><h6>' + what(game.inventory.resources, 'solar firefly').amount + '/1 <span class="solarFirefly">Solar Firefly</span></h6>'
    + '<canvas id="solarFireflyCanvas"></canvas>'
    + '</div>';
}

/**
 * Returns an HTML content string that contains a dungeon enter button.
 * @param {boolean} min whether the button should be minimized
 * @returns {string} an HTML content string
 */
function getDungeonEnterButton(min = false) {
    return '<div class="roomActions-action enter' + (min ? ' minEnter' : '') + '"><h4>Enter</h4></div>';
}

/**
 * Returns the enemy whose ID matches the one provided.
 * @param {number} id the ID to look for
 * @returns {Enemy} an enemy
 */
function getEnemyById(id) {
    for(let i = 0; i < game.currentBattle.enemies.length; i++) {
        if(game.currentBattle.enemies[i].id === id) return game.currentBattle.enemies[i];
    }
}

/**
 * Returns a randomly generated potion name.
 * @returns {string} a random potion name
 */
function getRandomPotionName() {
    const adj = choose([
        "Unknown",
        "Strange",
        "Bizarre",
        "Curious",
        "Outlandish",
        "Erratic",
        "Uncanny",
        "Mysterious",
        "Singular",
        "Atypical",
        "Abnormal",
        "Perplexing"
    ]);
    const type = choose([
        "Potion",
        "Draught",
        "Beverage",
        "Elixir",
        "Tonic",
        "Philter",
        "Brew",
        "Concoction",
        "Remedy",
        "Serum",
        "Infusion",
        "Essence",
        "Decoction"
    ]);

    return adj + ' ' + type;
}

/**
 * Returns a randomly picked Sigil name.
 * @returns {string} a random sigil name.
 */
function getRandomSigilName() {
    const adj = choose([
        "Unknown",
        "Strange",
        "Bizarre",
        "Curious",
        "Outlandish",
        "Erratic",
        "Uncanny",
        "Mysterious",
        "Singular",
        "Atypical",
        "Abnormal",
        "Perplexing"
    ]);

    return adj + ' Sigil';
}

/**
 * Compares the two provided rarities and returns the highest one.
 * @param {Data.Rarity} a the first rarity to compare
 * @param {Data.Rarity} b the second rarity to compare
 * @returns {Data.Rarity} the highest rarity
 */
function compareHighestRarities(a, b) {
    const rarities = {
        "common": 1,
        "uncommon": 2,
        "rare": 3,
        "epic": 4,
        "legendary": 5,
        "elder": 6
    }

    if(rarities[a.toLowerCase()] > rarities[b.toLowerCase()]) return a;
    return b;
}

/**
 * Appends the provided stat's value and critical/corrupt status to the provided object's effect key, and returns it.
 * @param {Stat} eff the Stat to append
 * @param {object} object the object that it will be appended to
 * @returns {object} the same object
 */
function appendEffectToObject(eff, object) {
    const { effect, value, isCritical, isCorrupt, disabled } = eff;
    if(disabled) return object;
    if(object.hasOwnProperty(effect)) object[effect][0] += value;
    else object[effect] = [value, false];

    if(isCritical || isCorrupt) object[effect][1] = true;

    return object;
}

/**
 * Returns whether the provided effect is unvaluable.
 * @param {Data.Effect} eff the effect to check
 * @returns {boolean} whether the effect is unvaluable.
 */
function isEffectUnvaluable(eff) {
    return Config.EffectUnvaluable.includes(eff);
}

/**
 * Generates an HTML content string that contains the provided Item's active alterations, optionally compared to the ones provided in the diff variable, then returns it.
 * @param {Weapon|Armor|Trinket} item the item to retrieve alterations from
 * @param {Stat[]} diff the optional stats array to compare
 * @returns {string} an HTML content string
 */
function getAlterations(item, diff = [], titleReplace = '') {
    let str = '';
    let result = {};

    if(item.hasSigil()) {
        item.sigil.effects.forEach(eff => {
            result = appendEffectToObject(eff, result);
        });
        if(item.sigil.isCritical) item.sigil.critical.forEach(eff => {
            result = appendEffectToObject(eff, result);
        });
        if(item.sigil.isCorrupt) item.sigil.corrupt.forEach(eff => {
            result = appendEffectToObject(eff, result);
        });
    }

    if(item.hasEcho()) {
        item.echo.stats.forEach(stat => {
            result = appendEffectToObject(stat, result);
        });
    }

    let base = null;
    if(diff.length > 0) {
        base = structuredClone(result);
        diff.forEach(add => {
            result = appendEffectToObject(add, result);
        });
    };

    if(base) {
        let effects = Object.keys(base);
        let additional = Object.keys(result);

        for(let key of additional) {
            let st = null, eff = null, val = null, critCorr = null, color = '', italic = false, bold = false, barred = false, opacity = 1;
            eff = key;
            val = result[key][0];
            critCorr = result[key][1];
            console.log(base[key]);

            st = new Stat({effect: eff, theorical: val, isPercentage: isAstralForgeEffectPercentage(eff), fixed: true});

            if((base[key] && base[key][0] > val) || (!base.hasOwnProperty(key) && val < 0)) {
                if(eff !== Data.Effect.EFFORT) color = 'tomato';
                else color = '#4cd137';

                if(isEffectAllowedOnObject(key, item) && filterCritCorr(item, key, critCorr)) game.soulbinding.addPreslottedEffect(st);
            } else if((base[key] && base[key][0] < val) || (!base.hasOwnProperty(key) && val > 0)) {
                if(eff !== Data.Effect.EFFORT) color = '#4cd137';
                else color = 'tomato';

                if(isEffectAllowedOnObject(key, item) && filterCritCorr(item, key, critCorr)) game.soulbinding.addPreslottedEffect(st);
            } else {
                if(isEffectUnvaluable(eff)) {
                    color = Data.Color.ORANGE;
                    if(isEffectAllowedOnObject(key, item) && filterCritCorr(item, key, critCorr)) game.soulbinding.addPreslottedEffect(st);
                }
                else color = 'rgb(100, 100, 100);'
            }

            // BOLD if allowed effect but not altered. BARRED if unallowed.
            if(!base.hasOwnProperty(key)) {
                if(isEffectAllowedOnObject(key, item) || filterCritCorr(item, key, critCorr)) bold = true;
                else {
                    barred = true;
                    opacity = 0.65;
                }
            }

            str += st.getFormatted({cssClass: 'itemEffect', noTheorical: true, color: color, bold: bold, italic: italic, barred: barred, opacity: opacity});
        }
    } else {
        for(const eff in result) {
            const st = new Stat({effect: eff, theorical: result[eff][0], isPercentage: isAstralForgeEffectPercentage(eff)});
            str += st.getFormatted({cssClass: 'itemEffect', noTheorical: true, defaultColor: true});
        }
    }

    if(titleReplace !== '') str += '<h2>' + titleReplace + '</h2>';
    else {
        if(str === '') str = '<h2>No alterations</h2>';
        else str = '<h2>Alterations</h2>' + str;
    }

    return str;
}

function filterCritCorr(item, effect, state) {
    if(!state) return false;

    if(item instanceof Trinket || item instanceof Armor) {
        if(!isBaseWeaponEffect(effect)) return true;
        else return false;
    }
    return true;
}

/**
 * Returns whether the provided effect is allowed to be added on the provided item.
 * If the effect is NOT included in the item's base effects, it won't be allowed.
 * @param {Data.Effect} effect the effect to check
 * @param {Weapon|Armor|Trinket} obj the item to check
 * @returns {boolean} whether the effect can be added
 */
function isEffectAllowedOnObject(effect, obj) {
    if(!obj.canAddAlteration()) return false;

    let result = [];

    if(obj.hasSigil()) {
        obj.sigil.effects.forEach(eff => {
            if(!eff.disabled) result.push(eff.effect);
        });
        if(obj.sigil.isCritical) obj.sigil.critical.forEach(eff => {
            result.push(eff.effect);
        });
        if(obj.sigil.isCorrupt) obj.sigil.corrupt.forEach(eff => {
            result.push(eff.effect);
        });
    }
    if(obj.hasEcho()) {
        obj.echo.stats.forEach(stat => {
            result.push(stat.effect);
        });
    }

    if(obj instanceof Weapon) {
        result.push(
            Data.Effect.SHARPNESS,
            Data.Effect.WITHERING,
            Data.Effect.BLOCK,
            Data.Effect.EFFORT,
            Data.Effect.CRIT_LUK,
            Data.Effect.CRIT_DMG,
            Data.Effect.BLEED_DMG,
            Data.Effect.BLEED_DURATION,
            Data.Effect.BLEED_INCURABLE,
            Data.Effect.BLEED_CURABLE,
            Data.Effect.POISON_DMG,
            Data.Effect.POISON_DURATION,
            Data.Effect.POISON_INCURABLE,
            Data.Effect.POISON_CURABLE,
            Data.Effect.RANGE_BACK_OFF,
            Data.Effect.RANGE_BACK_ON,
            Data.Effect.RANGE_MIDDLE_OFF,
            Data.Effect.RANGE_MIDDLE_ON,
            Data.Effect.RANGE_FRONT_OFF,
            Data.Effect.RANGE_FRONT_ON
        );
    } else if(obj instanceof Armor) {
        result.push(
            Data.Effect.RESILIENCE,
            Data.Effect.WARDING
        );
    } else if(obj instanceof Trinket) {
        obj.effects.forEach(eff => {
            if(!isBaseWeaponEffect(eff.effect)) result.push(eff.effect);
        });
    }

    result = [...new Set(result)]; // Removing duplicates

    return result.includes(effect);
}

/**
 * Returns whether the provided effect is a base weapon effect.
 * @param {Data.Effect} eff the effect to check
 * @returns {boolean}
 */
function isBaseWeaponEffect(eff) {
    return Config.BaseWeaponEffects.includes(eff);
}

/**
 * Returns whether the provided effect is a base armor effect.
 * @param {Data.Effect} eff the effect to check
 * @returns {boolean}
 */
function isBaseArmorEffect(eff) {
    return Config.BaseArmorEffects.includes(eff);
}

/**
 * Returns an HTML format string that contains all of the provided item's Sigil effects.
 * @param {Weapon|Armor|Trinket} item the Item to retrieve the Sigil effects from
 * @returns {string} an HTML format string
 */
function getSigilEffectsFromItem(item) {
    let str = '';

    item.sigil.effects.forEach(alt => {
        str += alt.getFormatted({noTheorical: true, defaultColor: true});
    });
    if(item.sigil.isCritical) item.sigil.critical.forEach(alt => {
        str += alt.getFormatted({noTheorical: true, defaultColor: true, bold: true});
    });
    if(item.sigil.isCorrupt) item.sigil.corrupt.forEach(alt => {
        str += alt.getFormatted({noTheorical: true, defaultColor: true, bold: true});
    });

    if(str === '') str = '<h2>No alterations</h2>';
    else str = '<h2>Alterations</h2>' + str;

    return str;
}

/**
 * Returns the alterations tooltip for the provided item.
 * @param {Weapon|Armor|Trinket} item the Item to get the alterations tooltip from
 * @returns {string} an HTML format string that contains the tooltip
 */
function getItemAlterationsTooltip(item) {
    let str = '';

    if(item.astralForgeItem.isModified()) {
        str += item.astralForgeItem.getFormattedModifications();
        str += '<div class="divider"></div>';
    }
    if(item.hasSigil()) str += '<div class="editedIconStats">' + getSigilEffectsFromItem(item) + '</div>';

    return str;
}

/**
 * Returns the Soulmark object that matches the provided effect.
 * @param {Data.Effect} effect the effect to search for
 * @returns {Soulmark|null} a Soulmark object or null if none matched
 */
function getSoulmarkFromEffect(effect) {
    return Config.Soulwriting.find(x => x.effect === effect);
}

/**
 * Returns a string that contains the displayed status of a soulmark that can be extracted.
 * @param {Soulmark} sm the soulmark
 * @returns {string} a comparison string
 */
function getSoulreadingSoulmarkValue(sm) {
    if(sm.studied === sm.researchTotal-1) {
        if(isEffectUnvaluable(sm.effect)) return "None -> Active";
        else return (sm.getCurrent() + ' ---> ' + sm.theorical);
    } else if(sm.studied === 0) {
        if(isEffectUnvaluable(sm.effect)) return "None";
        else return ("0 ---> " + sm.getNext());
    } else if(sm.studied > 0 && sm.studied < sm.researchTotal) {
        if(isEffectUnvaluable(sm.effect)) return "None";
        else return (sm.getCurrent() + ' ---> ' + sm.getNext());
    } else if(sm.isMastered()) {
        return "Mastered";
    }
}

/**
 * Generates a unique ID and returns it. 
 * Not duplicate-free guaranteed, but has been tested on generating 10k ids and no duplicates were found. So that should be enough.
 * @returns {string} a unique ID
 */
function uidGen() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

function generateBonusesTable(bonuses) {
    const results = [];
    const effectTotals = {};

    bonuses.forEach(bonus => {
        const bEff = bonus.stat.effect;
        const bVal = isBaseMaxStat(bEff) ? bonus.variables.value : bonus.stat.getValue();
        const bOri = bonus.origin;

        if(bVal === 0 && !isEffectUnvaluable(bEff)) return; // Skip null effects if they're not unvaluable

        if(!effectTotals[bEff]) {
            effectTotals[bEff] = {
                effect: bEff,
                total: 0,
                origins: []
            }
        }

        effectTotals[bEff].total += bVal;
        effectTotals[bEff].origins.push({item: bOri, value: bVal});
    });

    for(const effect in effectTotals) {
        results.push(effectTotals[effect]);
    }

    return results;
}
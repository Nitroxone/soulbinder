/**
 * This file contains a whole bunch of handy functions that are used throughout the entire game.
 * Essentially wrapped computations and DOM manipulations.
 */

/**
 * Writes an error message in the console and prints the trace.
 * @param {string} what - The message to be printed
 */
const ERROR = (what) => {
    console.log(what);
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
 * Generates a CSS background property based on the given icon number.
 * @param {number} icon the icon index on the IconSheet
 * @returns {string} a CSS style string.
 */
function getIcon(icon) {
    // euclidean division of the icon index by 16 (which is the amount of icons per line on the icon set).
    // remainder : x; quotient: y;
    const posX = -(icon[0] % 16) * 24 * Game.iconScale;
    const posY = -(Math.floor(icon[0] / 16)) * 24 * Game.iconScale;
    return 'background: url(' + Game.iconURL +') ' + posX + 'px ' + posY + 'px;';
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
    return '<span class="smallThing" style="color:' + (what.rarity ? getRarityColorCode(what.rarity) : '#fff') + '">' + (text==='*PLURAL*' ? (what.name + 's'):(text || what.name || '<span style="opacity:0;">!</span>')) + '</span>';
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
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Dice throw : generates a random number between 0 and 100, and check if it is below the given number.
 * @param {number} chance 
 * @returns {boolean} 
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
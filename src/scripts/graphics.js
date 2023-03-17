/**
 * Spawns a floating tooltip on screen based on the provided Item's data.
 * @param {Item} item the Item data to fill the tooltip with
 */
function spawnTooltip(item) {
    const base = '<div id="floating-' + item.id +'" class="tooltip framed bgDark tooltipSpawn">'
    const tooltip = document.createElement('div');
    if(item instanceof Weapon) tooltip.innerHTML = base + getWeaponTooltip(item, null, true) + '</div>';
    else if(item instanceof Armor) tooltip.innerHTML = base + getArmorTooltip(item, null, true) + '</div>';
    else if(item instanceof Rune) tooltip.innerHTML = base + getRuneTooltip(item, null) + '</div>';
    else if(item instanceof Resource) tooltip.innerHTML = base + getResourceTooltip(item, null) + '</div>';
    // Same position as hovered tooltip, but positioned in such way that it will cut the mouse off the hover event
    const tooltipPos = {
        top: domWhat('tooltipAnchor').offsetTop - 75 + 'px',
        left: domWhat('tooltipAnchor').offsetLeft + domWhat('tooltip').offsetLeft + 'px'
    }

    tooltip.style.position = "absolute";
    tooltip.style.top = tooltipPos.top;
    tooltip.style.left = tooltipPos.left;

    tooltip.addEventListener('mousedown', function(e) {
        var moving = true;

        var initX = e.clientX;
        var initY = e.clientY;

        var initElemX = tooltip.offsetLeft;
        var initElemY = tooltip.offsetTop;

        document.addEventListener('mousemove', function(e){
            if(!moving) return;

            var currentX = e.clientX;
            var currentY = e.clientY;

            var currentElemX = initElemX + currentX - initX;
            var currentElemY = initElemY + currentY - initY;

            tooltip.style.left = currentElemX + 'px';
            tooltip.style.top = currentElemY + 'px';
        });
        
        document.addEventListener('mouseup', function(e) {
            moving = false;
        })
    })
    tooltip.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        let audio = new Audio('sounds/ui/spawntooltip.wav');
        audio.volume = 0.2;
        audio.play();
        tooltip.remove();
    })

    document.body.appendChild(tooltip);
}

function getRuneTooltip(rune, asResult) {
    let str = asResult ? '<h3 class="fancyTitle">Output</h3><div class="divider"></div>' : '';
    str += '<div class="info">';
    str += '<div id="iconcloud-' + rune.id + '"class="iconcloud' + capitalizeFirstLetter(rune.rarity) + '"><div class="thing standalone ' + getIconClasses() + '">' + getIconStr(rune, null, null) + '</div>';
    str += '<div class="fancyText infoAmount onLeft">' + (asResult ? asResult.result_amount : '') + '</div></div>';
    str += '<div class="fancyText barred infoTitle" style="color: ' + getRarityColorCode(rune.rarity) +'">' + rune.name + '</div>';
    str += '<div class="fancyText barred">' + capitalizeFirstLetter(rune.rarity) + '</div>';
    str += '<div class="fancyText barred">' + capitalizeFirstLetter(rune.type) + ' rune</div>';
    str += '<div class="infoDesc">';

    // effects
    str += '<div class="par"></div>';
    rune.effects.forEach(effect => {
        str += '<div class="itemEffect"' + (effect.critical ? ' style="font-weight:bold; color:'+ Data.Color.GOLD +'; font-style:italic;"' : '') + '>' + (effect.value > 0 ? '+ ' : effect.value < 0 ? '- ' : '') + (effect.value == 0 ? '' : Math.abs(effect.value)) + (effect.isPercentage ? '%' : '') + ' ' + capitalizeFirstLetter(effect.effect) + '<span class="theoricalval">[' + effect.theorical[0] + '-' + effect.theorical[1] + ']</span>' + '</div>';
    });
    if(rune.isCritical) {
        rune.critical.forEach(effect => {
            str += '<div class="itemEffect"' + ' style="font-family:\'RobotoBold\'; color:'+ Data.Color.GOLD +';"' + '><span style="font-family:Roboto">' + (effect.value > 0 ? '+ ' : effect.value < 0 ? '- ' : '') + '</span>' + (effect.value == 0 ? '' : Math.abs(effect.value)) + (effect.isPercentage ? '%' : '') + ' ' + capitalizeFirstLetter(effect.effect) + '<span class="theoricalval">[' + effect.theorical[0] + '-' + effect.theorical[1] + ']</span>' + '</div>';
        });
    }
    if(rune.isCorrupt) {
        rune.corrupt.forEach(effect => {
            str += '<div class="itemEffect"' + ' style="font-weight:bold; color:'+ Data.Color.CORRUPT +';"' + '><span style="font-weight:normal">' + (effect.value > 0 ? '+ ' : effect.value < 0 ? '- ' : '') + '</span>' + (effect.value == 0 ? '' : Math.abs(effect.value)) + (effect.isPercentage ? '%' : '') + ' ' + capitalizeFirstLetter(effect.effect) + '<span class="theoricalval">[' + effect.theorical[0] + '-' + effect.theorical[1] + ']</span>' + '</div>';
        });
    }
    rune.echoes.forEach(echo => {
        str += '<div class="runeCorruption">';
        str += '<p class="name">' + echo.name +'</p>';
        str += '<p>' + echo.desc +'</p>'
        str += '<br>';
        str += '<p class="echoQuote">' + echo.quote +'</p>'
        str += '</div>';
    })

    str += '<div class="divider"></div>';
    str += '<div class="par tooltipDesc">' + rune.desc + '</div>';
    str += '</div></div>';

    game.particlesTooltipCanvasItem = rune;
    return str;
}

function getResourceTooltip(resource, asResult = null) {
    let str = asResult ? '<h3 class="fancyTitle">Output</h3><div class="divider"></div>' : '';
    str += '<div class="info">';
    str += '<div id="iconcloud-' + resource.id + '"class="iconcloud' + capitalizeFirstLetter(resource.rarity) + '"><div id="res-icon-' + resource.id + '" class="tooltipIcon" style="' + getIcon(resource.icon) + '"></div>';
    str += '<div class="fancyText infoAmount onLeft">' + (asResult ? asResult.result_amount : resource.amount) + '</div></div>';
    str += '<div class="fancyText barred infoTitle" style="color: ' + getRarityColorCode(resource.rarity) + '">' + resource.name + '</div>';
    str += '<div class="fancyText barred">' + capitalizeFirstLetter(resource.rarity) + '</div>';
    str += '<div class="infoDesc">';
    str += '<div class="par"></div>';
    str += '<div class="par tooltipDesc">' + resource.desc + '</div>';
    str += '</div></div>';

    game.particlesTooltipCanvasItem = resource;
    return str;
}

/**
 * Gets the HTML code that contains the provided Weapon's data
 * @param {Weapon} weapon the Weapon data to fill the tooltip with
 * @param {*} asResult should tooltip be converted to a recipe result display?
 * @param {*} full display all of the infos (runes details, echoes details)
 * @returns {string} an HTML code that contains the data
 */
function getWeaponTooltip(weapon, asResult = null, full = false) {
    let str = asResult ? '<h3 class="fancyTitle">Output</h3><div class="divider"></div>' : '';
    str += '<div class="info">';
    str += '<div id="iconcloud-' + weapon.id + '" class="iconcloud' + capitalizeFirstLetter(weapon.rarity) +'"><div class="thing standalone ' + getIconClasses() + '">' + getIconStr(weapon, null, null) + '</div>';
    str += '<div class="fancyText infoAmount onLeft">' + (asResult ? asResult.result_amount : '') + '</div></div>';
    str += '<div class="fancyText barred infoTitle" style="color: ' + getRarityColorCode(weapon.rarity) + '">' + weapon.name + '</div>';
    str += '<div class="fancyText barred">' + capitalizeFirstLetter(weapon.rarity) + '</div>';
    str += '<div class="fancyText barred">' + capitalizeFirstLetter(weapon.weight) + ' ' + capitalizeFirstLetter(weapon.type) + '</div>';
    str += '<div class="infoDesc">';

    str += '<div class="par"></div>';
    str += '<table class="statsTable"><tbody>';
    str += '<tr><td>Sharpness</td><td>' + weapon.pdmg[0] + '-' + weapon.pdmg[1] + '</td></tr>';
    str += '<tr><td>Withering</td><td>' + weapon.mdmg[0] + '-' + weapon.mdmg[1] + '</td></tr>';
    str += '<tr><td>Block</td><td>' + weapon.block + '<span class="theoricalval">[' + weapon.t_block[0] + '-' + weapon.t_block[1] +']</span>' + '</td></tr>';
    str += '<tr><td>Effort</td><td>' + weapon.effort + '<span class="theoricalval">[' + weapon.t_effort[0] + '-' + weapon.t_effort[1] +']</span>' + '</td></tr>';
    str += '<tr><td>Crit. chance</td><td>' + weapon.crit_luk + '%' + '<span class="theoricalval">[' + weapon.t_crit_luk[0] + '-' + weapon.t_crit_luk[1] +']</span>' + '</td></tr>';
    str += '<tr><td>Crit. DMG</td><td>' + weapon.crit_dmg + '<span class="theoricalval">[' + weapon.t_crit_dmg[0] + '-' + weapon.t_crit_dmg[1] +']</span>' + '</td></tr>';
    str += '<tr><td>Bleed</td><td>' + weapon.bleed[0] + ' DMG' + '<span class="theoricalval">[' + weapon.t_bleed[0][0] + '-' + weapon.t_bleed[0][1] +']</span>' + '<br>' + weapon.bleed[1] + ' round(s)'+ '<span class="theoricalval">[' + weapon.t_bleed[1][0] + '-' + weapon.t_bleed[1][1] + ']</span>' + '<br>' + (weapon.bleed[2] ? 'Curable' : 'Non-curable') + '</td></tr>';
    str += '<tr><td>Poison</td><td>' + weapon.poison[0] + ' DMG' + '<span class="theoricalval">[' + weapon.t_poison[0][0] + '-' + weapon.t_poison[0][1] +']</span>' + '<br>' + weapon.poison[1] + ' round(s)' + '<span class="theoricalval">[' + weapon.t_poison[0][0] + '-' + weapon.t_poison[0][1] +']</span>' + '<br>' + (weapon.poison[2] ? 'Curable' : 'Non-curable') + '</td></tr>';
    str += '<tr><td>Range</td><td>' + getRangeString(weapon.range) + '</td></tr>';
    str += '</tbody></table>';
    str += '<div class="par"></div>';

    // sockets
    str += '<div class="divider"></div>';
    weapon.sockets.forEach(rune => {
        str += getRuneDetails(rune, full);
    })
    // empty runes
    for(let i = 0; i < weapon.sockets_free; i++) {
        str += getEmptyRuneHTML();
    }

    // echoes
    if(weapon.echoes.length > 0) {
        str += '<div class="divider"></div>';
        weapon.echoes.forEach(echo => {
            str += getEchoDetails(echo, full);
        });
    }

    // desc
    str += '<div class="divider"></div>';
    str += '<div class="par tooltipDesc">' + weapon.desc + '</div>';
    str += '</div>';

    game.particlesTooltipCanvasItem = weapon;
    return str;
}

function getArmorTooltip(armor, asResult = null, full = false) {
    let str = asResult ? '<h3 class="fancyTitle">Output</h3><div class="divider"></div>' : '';
    str += '<div class="info">';
    str += '<div id="iconcloud-' + armor.id + '" class="iconcloud' + capitalizeFirstLetter(armor.rarity) + '"><div class="thing standalone ' + getIconClasses() + '">' + getIconStr(armor, null, null) + '</div>';
    str += '<div class="fancyText infoAmount onLeft">' + (asResult ? asResult.result_amount : '') + '</div></div>';
    str += '<div class="fancyText barred infoTitle" style="color: ' + getRarityColorCode(armor.rarity) + '">' + armor.name + '</div>';
    str += '<div class="fancyText barred">' + capitalizeFirstLetter(armor.rarity) + '</div>';
    str += '<div class="fancyText barred">' + capitalizeFirstLetter(armor.type) + '</div>';
    str += '<div class="infoDesc">';

    str += '<div class="par"></div>';
    str += '<table class="statsTable"><tbody>';
    str += '<tr><td>Resilience</td><td>' + armor.pres + '<span class="theoricalval">[' + armor.t_pres[0] + '-' + armor.t_pres[1] +']</span>' + '</td></tr>';
    str += '<tr><td>Warding</td><td>' + armor.mres + '<span class="theoricalval">[' + armor.t_mres[0] + '-' + armor.t_mres[1] +']</span>' + '</td></tr>';
    str += '</tbody></table>';
    str += '<div class="par"></div>';

    // sockets
    str += '<div class="divider"></div>';
    armor.sockets.forEach(rune => {
        str += getRuneDetails(rune, full);
    })
    // empty runes
    for(let i = 0; i < armor.sockets_free; i++) {
        str += getEmptyRuneHTML();
    }

    // echoes
    if(armor.echoes.length > 0) {
        str += '<div class="divider"></div>';
        armor.echoes.forEach(echo => {
            str += getEchoDetails(echo, full);
        });
    }

    // desc
    str += '<div class="divider"></div>';
    str += '<div class="par tooltipDesc">"' + armor.desc + '"</div>';
    str += '</div>';

    game.particlesTooltipCanvasItem = armor;
    return str;
}

function getEmptyRuneHTML() {
    let str = '<div class="runeInfo runeInfoEmpty">'
    str += '<div class="runeInfo-infos">'
    str += '<div class="runeTitle">Empty rune slot</div>';
    str += '</div></div>'
    return str;
}

function getRuneDetails(rune, full = false) {
    let str = '<div class="runeInfo" style="background-image: url(css/img/runes/' + rune.icon + '.png)">';
    str += '<div class="runeInfo-infos">'
    str += '<div class="runeTitle">' + getSmallThingNoIcon(rune, null) + '</div>';
    if(full) {
        rune.effects.forEach(effect => {
            str += '<div class="runeEffect"' + (effect.critical ? ' style="font-weight:bold; color:'+ Data.Color.GOLD +'; font-style:italic;"' : '') + '>' + (effect.value > 0 ? '+ ' : effect.value < 0 ? '- ' : '') + (effect.value == 0 ? '' : Math.abs(effect.value)) + (effect.isPercentage ? '%' : '') + ' ' + capitalizeFirstLetter(effect.effect) + '<span class="theoricalval">[' + effect.theorical[0] + '-' + effect.theorical[1] + ']</span>' + '</div>';
        });
        if(rune.isCritical) {
            rune.critical.forEach(effect => {
                str += '<div class="runeEffect"' + ' style="font-family:\'RobotoBold\'; color:'+ Data.Color.GOLD +';"' + '><span style="font-family:Roboto">' + (effect.value > 0 ? '+ ' : effect.value < 0 ? '- ' : '') + '</span>' + (effect.value == 0 ? '' : Math.abs(effect.value)) + (effect.isPercentage ? '%' : '') + ' ' + capitalizeFirstLetter(effect.effect) + '<span class="theoricalval">[' + effect.theorical[0] + '-' + effect.theorical[1] + ']</span>' + '</div>';
            });
        }
        if(rune.isCorrupt) {
            rune.corrupt.forEach(effect => {
                str += '<div class="runeEffect"' + ' style="font-weight:bold; color:'+ Data.Color.CORRUPT +';"' + '><span style="font-weight:normal">' + (effect.value > 0 ? '+ ' : effect.value < 0 ? '- ' : '') + '</span>' + (effect.value == 0 ? '' : Math.abs(effect.value)) + (effect.isPercentage ? '%' : '') + ' ' + capitalizeFirstLetter(effect.effect) + '<span class="theoricalval">[' + effect.theorical[0] + '-' + effect.theorical[1] + ']</span>' + '</div>';
            });
        }
    }
    rune.echoes.forEach(echo => {
        str += '<div class="runeCorruption">';
        str += '<p class="name">' + echo.name +'</p>';
        if(full) str += '<p>' + echo.desc +'</p>';
        str += '</div>';
    })
    str += '</div></div>';

    return str;
}

/**
 * @param {Echo} echo the Echo to get the data from
 */
function getEchoDetails(echo, full = false) {
    let str = '<div class="echoInfo" style="border: 1px solid '+ hexToRGBA(getRarityColorCode(echo.rarity), 0.5) +'">'
    str += '<div class="echoTitle" style="color: ' + getRarityColorCode(echo.rarity) + '">' + echo.name + '</div>';
    if(full) {
        str += '<div class="echoEffects">'
        echo.stats.forEach(effect => {
            str += effect.getFormatted("echoEffect");
        });
        str += '</div>'
        str += '<br>';
        str += '<div class="echoDesc">' + echo.desc + '</div>'
        str += '<br>';
        str += '<div class="echoQuote">' + echo.quote + '</div>';
    }
    str += '</div>';

    return str;
}

function addTooltip(element, func, object) {
    // adds a tooltip to an element.
    // when the mouse hovers over the element, a tooltip is displayed, populated by the func (which must return an HTML code string).
    const t = new Tooltip();
    AddEvent(element, 'mouseover', function(element, func, tooltip, object) {
        return function(e) {
            tooltip.func = func;
            tooltip.parent = element;
            tooltip.popup(object);
            
            tooltip.update();
            tooltip.update();
            tooltip.update();
            if(game.particlesTooltipCanvasItem) getTooltipParticlesCanvas(game.particlesTooltipCanvasItem);
        };
    }(element, func, t, object || {}));
    AddEvent(element, 'mouseout', function(element, func, tooltip) {
        return function(e) {
            tooltip.close();
            
            tooltip.update();
            tooltip.update();
            tooltip.update();

            if(game.particlesTooltipCanvasInterval) clearInterval(game.particlesTooltipCanvasInterval);
            if(game.particlesTooltipCanvasItem) game.particlesTooltipCanvasItem = null;
        };
    }(element, func, t));
    AddEvent(element, 'DOMNodeRemoved', function(element, func, tooltip) {
        return function(e) {
            tooltip.close();

            tooltip.update();
            tooltip.update();
            tooltip.update();

            if(game.particlesTooltipCanvasInterval) clearInterval(game.particlesTooltipCanvasInterval);
            if(game.particlesTooltipCanvasItem) game.particlesTooltipCanvasItem = null;
        };
    }(element, func, t));

}

function drawWeaponInventory(weapons) {
    let str = '';
    for(let i = 0; i < weapons.length; i++) {
        let me = weapons[i];
        str += '<div id="res-' + me.id + '" class="res thing wide1" style="display: inline-block;">';
        str += '<div id="res-icon-' + me.id + '" class="icon double" style="' + getIcon(me.icon) + '"></div>';
        str += '<div id="res-over-' + me.id + '" class="overlay" style="border: 1px solid ' + getRarityColorCode(weapons[i].rarity) + '"></div>';
        str += '<div id="res-amount-' + me.id + '" class="amount"></div>';
        str += '</div>';
    }
    domWhat('res-cat-weapons').innerHTML = str;
    for(let i = 0; i < weapons.length; i++) {
        let me = weapons[i];
        // Add tooltip
        addTooltip(domWhat('res-' + me.id), function(){
            return getWeaponTooltip(game.inventory.getItemFromId(Data.ItemType.WEAPON, me.id));
        }, {offY: -8});
        // Spawn tooltip and play sound on click
        domWhat('res-' + me.id).addEventListener('click', function(){
            let audio = new Audio('sounds/ui/spawntooltip.wav');
            audio.volume = 0.2;
            audio.play();
            spawnTooltip(me);
        });
        // Play sound on hover
        domWhat('res-' + me.id).addEventListener('mouseover', function(){
            let audio = new Audio('sounds/ui/hovertooltip.wav');
            audio.volume = 0.5;
            audio.playbackRate = 2;
            audio.play();
        })
    }
}

function drawRuneInventory(runes) {
    let str = '';
    for(let i = 0; i < runes.length; i++) {
        let me = runes[i];
        str += '<div id="res-' + me.id + '" class="res thing wide1" style="display: inline-block;">';
        str += '<div id="res-icon-' + me.id + '" class="icon double" style="' + getIcon(me.icon) + '"></div>';
        str += '<div id="res-over-' + me.id + '" class="overlay" style="border: 1px solid ' + getRarityColorCode(runes[i].rarity) + '"></div>';
        str += '<div id="res-amount-' + me.id + '" class="amount"></div>';
        str += '</div>';
    }
    domWhat('res-cat-runes').innerHTML = str;
    for(let i = 0; i < runes.length; i++) {
        let me = runes[i];
        // Add tooltip
        addTooltip(domWhat('res-' + me.id), function(){
            return getRuneTooltip(game.inventory.getItemFromId(Data.ItemType.RUNE, me.id));
        }, {offY: -8});
        // Spawn tooltip and play sound on click
        domWhat('res-' + me.id).addEventListener('click', function(){
            let audio = new Audio('sounds/ui/spawntooltip.wav');
            audio.volume = 0.2;
            audio.play();
            spawnTooltip(me);
        });
        // Play sound on hover
        domWhat('res-' + me.id).addEventListener('mouseover', function(){
            let audio = new Audio('sounds/ui/hovertooltip.wav');
            audio.volume = 0.5;
            audio.playbackRate = 2;
            audio.play();
        })
    }
}

function drawResourceInventory(resources) {
    let str = '';
    for(let i = 0; i < resources.length; i++) {
        if(resources[i].amount > 0) {
            let me = resources[i];
            str += '<div id="res-' + me.id + '" class="res thing wide1" style="display: inline-block;">';
            str += '<div id="res-icon-' + me.id + '" class="icon double" style="' + getIcon(me.icon) + '"></div>';
            str += '<div id="res-over-' + me.id + '" class="overlay" style="border: 1px solid ' + getRarityColorCode(resources[i].rarity) + '"></div>';
            str += '<div id="res-amount-' + me.id + '" class="amount">' + me.amount + '</div>';
            str += '</div>';
        }
    }
    domWhat('res-cat-resources').innerHTML = str;
    for(let i = 0; i < resources.length; i++) {
        if(resources[i].amount > 0) {
            let me = resources[i];
            // Add tooltip
            addTooltip(domWhat('res-' + me.id), function(){
                return getResourceTooltip(game.inventory.getItemFromId(Data.ItemType.RESOURCE, me.id));
            }, {offY: -8});
            // Spawn tooltip and play sound on click
            domWhat('res-' + me.id).addEventListener('click', function(){
                let audio = new Audio('sounds/ui/spawntooltip.wav');
                audio.volume = 0.2;
                audio.play();
                spawnTooltip(me);
            });
            // Play sound on hover
            domWhat('res-' + me.id).addEventListener('mouseover', function(){
                let audio = new Audio('sounds/ui/hovertooltip.wav');
                audio.volume = 0.5;
                audio.playbackRate = 2;
                audio.play();
            });
        }
    }
}

function drawArmorInventory(armors) {
    let str = '';
    for(let i = 0; i < armors.length; i++) {
        let me = armors[i];
        str += '<div id="res-' + me.id + '" class="res thing wide1" style="display: inline-block;">';
        str += '<div id="res-icon-' + me.id + '" class="icon double" style="' + getIcon(me.icon) + '"></div>';
        str += '<div id="res-over-' + me.id + '" class="overlay" style="border: 1px solid ' + getRarityColorCode(armors[i].rarity) + '"></div>';
        str += '<div id="res-amount-' + me.id + '" class="amount"></div>';
        str += '</div>';
    }
    domWhat('res-cat-armors').innerHTML = str;
    for(let i = 0; i < armors.length; i++) {
        let me = armors[i];
        addTooltip(domWhat('res-' + me.id), function(){
            return getArmorTooltip(game.inventory.getItemFromId(Data.ItemType.ARMOR, me.id));
        }, {offY: -8});
        // Spawn tooltip and play sound on click
        domWhat('res-' + me.id).addEventListener('click', function(){
            let audio = new Audio('sounds/ui/spawntooltip.wav');
            audio.volume = 0.2;
            audio.play();
            spawnTooltip(me);
        });
        // Play sound on hover
        domWhat('res-' + me.id).addEventListener('mouseover', function(){
            let audio = new Audio('sounds/ui/hovertooltip.wav');
            audio.volume = 0.5;
            audio.playbackRate = 2;
            audio.play();
        });
    }
}

function drawInventory() {
    drawWeaponInventory(game.inventory.weapons);
    drawArmorInventory(game.inventory.armors);
    drawRuneInventory(game.inventory.runes);
    drawResourceInventory(game.inventory.resources);
}


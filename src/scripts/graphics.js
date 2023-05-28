/**
 * Spawns a floating tooltip on screen based on the provided Item's data.
 * @param {Item} item the Item data to fill the tooltip with
 */
function spawnTooltip(item, fromExisting = 0) {
    //console.log(item);
    const base = '<div id="floating-' + item.id +'" class="tooltip framed bgDark tooltipSpawn">'
    const tooltip = document.createElement('div');
    if(item instanceof Weapon) tooltip.innerHTML = base + getWeaponTooltip(item, null, true) + '</div>';
    else if(item instanceof Armor) tooltip.innerHTML = base + getArmorTooltip(item, null, true) + '</div>';
    else if(item instanceof Rune) tooltip.innerHTML = base + getRuneTooltip(item, null) + '</div>';
    else if(item instanceof Resource) tooltip.innerHTML = base + getResourceTooltip(item, null) + '</div>';
    else if(item instanceof Trinket) tooltip.innerHTML = base + getTrinketTooltip(item, null, true) + '</div>';
    else if(item instanceof EquipmentSet) tooltip.innerHTML = base + getSetTooltip(item) + '</div>';
    // Same position as hovered tooltip, but positioned in such way that it will cut the mouse off the hover event

    
    let tooltipPos = {
        top: domWhat('tooltipAnchor').offsetTop - 75 + 'px',
        left: domWhat('tooltipAnchor').offsetLeft + domWhat('tooltip').offsetLeft + 'px'
    }
    if(fromExisting != 0) {
        const domReference = domWhat('floating-' + fromExisting);
        //console.log(domReference.getBoundingClientRect());
        tooltipPos = {
            top: domReference.getBoundingClientRect().top + 'px',
            left: domReference.getBoundingClientRect().left - 50 + 'px'
        }
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
        playSound('sounds/ui/ui5.wav', 1, 1.5);
        tooltip.remove();
    });

    // IF ASTRAL FORGE COMPATIBLE, ADD ASTRAL FORGE MODIFICATIONS TOOLTIP EVENT
    if(item instanceof Weapon || item instanceof Armor || item instanceof Trinket) {
        if(item.astralForgeItem.isModified()) {
            addTooltip(tooltip.querySelector('.editedIcon'), function(){
                return item.astralForgeItem.getFormattedModifications();
            }, {offY: -8});
            tooltip.querySelector('.editedIcon').addEventListener('contextmenu', e => {
                e.preventDefault();
                e.stopImmediatePropagation();
            })
        }
    }

    document.body.appendChild(tooltip);
}

function getRuneTooltip(rune, asResult) {
    let str = asResult ? '<h3 class="fancyTitle">Output</h3><div class="divider"></div>' : '';
    str += '<div class="info">';
    str += '<div id="iconcloud-' + rune.id + '"class="iconcloud' + capitalizeFirstLetter(rune.rarity) + '"><div id="res-icon-' + rune.id + '" class="tooltipIcon" style="' + getIcon(rune) + '"></div>';
    str += '<div class="fancyText infoAmount onLeft">' + (asResult ? asResult.result_amount : '') + '</div></div>';
    str += '<div class="fancyText barred infoTitle" style="color: ' + getRarityColorCode(rune.rarity) +'">' + rune.name + '</div>';
    str += '<div class="fancyText barred">' + capitalizeFirstLetter(rune.rarity) + '</div>';
    str += '<div class="fancyText barred">' + capitalizeFirstLetter(rune.type) + ' rune</div>';
    str += '<div class="infoDesc">';

    // effects
    str += '<div class="par"></div>';
    rune.effects.forEach(effect => {
            str += effect.getFormatted({cssClass: "itemEffect"});
    });
    if(rune.isCritical) {
        rune.critical.forEach(effect => {
            str += effect.getFormatted({cssClass: "itemEffect", color: Data.Color.GOLD, bold: true});
        });
    }
    if(rune.isCorrupt) {
        rune.corrupt.forEach(effect => {
            str += effect.getFormatted({cssClass: "itemEffect", color: Data.Color.CORRUPT, bold: true});
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

function getTrinketTooltip(trinket, asResult = null, full = false) {
    let str = asResult ? '<h3 class="fancyTitle">Output</h3><div class="divider"></div>' : '';
    str += '<div class="info">';
    str += '<div id="iconcloud-' + trinket.id + '"class="iconcloud' + capitalizeFirstLetter(trinket.rarity) + '"><div id="res-icon-' + trinket.id + '" class="tooltipIcon" style="' + getIcon(trinket) + '"></div>';
    str += '<div class="fancyText infoAmount onLeft">' + (asResult ? asResult.result_amount : '') + '</div></div>';
    str += '<div class="fancyText barred infoTitle" style="color: ' + getRarityColorCode(trinket.rarity) + '">' + trinket.name + '</div>';
    str += '<div class="fancyText barred">' + capitalizeFirstLetter(trinket.rarity) + '</div>';
    str += '<div class="infoDesc">';

    // effects
    str += '<div class="par"></div>';
    trinket.astralForgeItem.extraEffects.forEach(eff => {
        str += eff.getFormatted({cssClass: "itemEffect", color: Data.Color.BLUE, bold: true, noTheorical: true});
    });
    trinket.effects.forEach(effect => {
        str += effect.getFormatted({cssClass: "itemEffect", allowOverloadedStyling: true});
    })

    // echoes
    if(trinket.echoes.length > 0) {
        str += '<div class="divider"></div>';
        trinket.echoes.forEach(echo => {
            str += getEchoDetails(echo, full);
        });
    }

    str += '<div class="divider"></div>';
    str += '<div class="par tooltipDesc">' + trinket.desc + '</div>';
    if(trinket.set) str += '<div class="tooltipSetText">' + trinket.set + '</div>';
    str += '</div></div>';

    if(trinket.astralForgeItem.isModified()) str += '<div class="editedIcon" id="editedIcon-' + trinket.id + '"></div>';

    game.particlesTooltipCanvasItem = trinket;
    return str;
}

function getResourceTooltip(resource, asResult = null) {
    let str = asResult ? '<h3 class="fancyTitle">Output</h3><div class="divider"></div>' : '';
    str += '<div class="info">';
    str += '<div id="iconcloud-' + resource.id + '"class="iconcloud' + capitalizeFirstLetter(resource.rarity) + '"><div id="res-icon-' + resource.id + '" class="tooltipIcon" style="' + getIcon(resource) + '"></div>';
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
    str += '<div id="iconcloud-' + weapon.id + '"class="iconcloud' + capitalizeFirstLetter(weapon.rarity) + '"><div id="res-icon-' + weapon.id + '" class="tooltipIcon" style="' + getIcon(weapon) + '"></div>';
    str += '<div class="fancyText infoAmount onLeft">' + (asResult ? asResult.result_amount : '') + '</div></div>';
    str += '<div class="fancyText barred infoTitle" style="color: ' + getRarityColorCode(weapon.rarity) + '">' + weapon.name + '</div>';
    str += '<div class="fancyText barred">' + capitalizeFirstLetter(weapon.rarity) + '</div>';
    str += '<div class="fancyText barred">' + capitalizeFirstLetter(weapon.weight) + ' ' + capitalizeFirstLetter(weapon.type) + '</div>';
    str += '<div class="infoDesc">';

    str += '<div class="par"></div>';
    weapon.astralForgeItem.extraEffects.forEach(eff => {
        str += eff.getFormatted({cssClass: "itemEffect", color: Data.Color.BLUE, bold: true, noTheorical: true});
    });
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
    if(weapon.set) str += '<div class="tooltipSetText">' + weapon.set + '</div>';
    str += '</div>';

    if(weapon.astralForgeItem.isModified()) str += '<div class="editedIcon" id="editedIcon-' + weapon.id + '"></div>';

    game.particlesTooltipCanvasItem = weapon;
    return str;
}

function getArmorTooltip(armor, asResult = null, full = false) {
    let str = asResult ? '<h3 class="fancyTitle">Output</h3><div class="divider"></div>' : '';
    str += '<div class="info">';
    str += '<div id="iconcloud-' + armor.id + '"class="iconcloud' + capitalizeFirstLetter(armor.rarity) + '"><div id="res-icon-' + armor.id + '" class="tooltipIcon" style="' + getIcon(armor) + '"></div>';
    str += '<div class="fancyText infoAmount onLeft">' + (asResult ? asResult.result_amount : '') + '</div></div>';
    str += '<div class="fancyText barred infoTitle" style="color: ' + getRarityColorCode(armor.rarity) + '">' + armor.name + '</div>';
    str += '<div class="fancyText barred">' + capitalizeFirstLetter(armor.rarity) + '</div>';
    str += '<div class="fancyText barred">' + capitalizeFirstLetter(armor.type) + '</div>';
    str += '<div class="infoDesc">';

    str += '<div class="par"></div>';
    armor.astralForgeItem.extraEffects.forEach(eff => {
        str += eff.getFormatted({cssClass: "itemEffect", color: Data.Color.BLUE, bold: true, noTheorical: true});
    });
    str += '<table class="statsTable"><tbody>';
    str += '<tr><td>Resilience</td><td>' + armor.resilience + '<span class="theoricalval">[' + armor.t_resilience[0] + '-' + armor.t_resilience[1] +']</span>' + '</td></tr>';
    str += '<tr><td>Warding</td><td>' + armor.warding + '<span class="theoricalval">[' + armor.t_warding[0] + '-' + armor.t_warding[1] +']</span>' + '</td></tr>';
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
    if(armor.set) str += '<div class="tooltipSetText">' + armor.set + '</div>';
    str += '</div>';

    if(armor.astralForgeItem.isModified()) str += '<div class="editedIcon" id="editedIcon-' + armor.id + '"></div>';

    game.particlesTooltipCanvasItem = armor;
    return str;
}


function getSetTooltip(set) {
    let str = '<div class="info tooltipSetWidth">';
    str += '<div class="tooltipSetTitle">' + set.name + '</div>';
    str += '<div class="tooltipSetAttributes">';
    str += '<div class="tooltipSetAttribute">' + set.type.weight + '</div>';
    str += '<div class="tooltipSetAttribute">' + set.type.base + '</div>';
    str += '<div class="tooltipSetAttribute">' + set.type.extra + '</div>';
    str += '</div>';
    str += '<div class="divider"></div>';
    str += '<div class="tooltipSet">';

    str += '<div class="tooltipSetItems">';
    set.items.forEach(item => {
        str += getSetTooltipItem(item);
    })
    str += '</div>';

    str += '<div class="tooltipSetDetails">';
    for(let key in set.bonus) {
        str += '<div class="tooltipSetDetail">';
        str += '<div class="tooltipSetDetailTitle">' + key  + ' item' + (key > 1 ? 's' : '') +'</div>';
        set.bonus[key].forEach(bonus => {
            if(bonus instanceof Stat) str += bonus.getFormatted({cssClass: "itemEffect tooltipSetDetailBonus", noTheorical: true});
            if(bonus instanceof Echo) str += getEchoDetails(bonus, true);
        })
        str += '</div>';
    }
    str += '</div>';

    str += '</div>';
    str += '</div>';
    
    return str;
}

function getSetTooltipItem(item) {
    let str = '<div class="runeInfo" style="' + getIcon(item, 25) + '">';
    str += '<div class="runeInfo-infos">';
    str += '<div class="runeTitle" style="text-align: left">' + getSmallThingNoIcon(item, null) + '</div>';
    str += '</div></div>';

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
            str += effect.getFormatted({cssClass: "echoEffect"});
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
        str += '<div id="res-' + me.id + '" class="inventoryItem" style="' + getIcon(me) + '; border: 2px solid ' + getRarityColorCode(me.rarity) +'" draggable="true">';
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
            playSound('sounds/ui/aa-ui6.wav', 0.3, 1);
            spawnTooltip(me);
            if(me.set) {
                let tooltipDesc = domWhat('floating-' + me.id).querySelector('.tooltipSetText');
                tooltipDesc.addEventListener('click', (e) => {
                    playSound('sounds/ui/aa-ui6.wav', 0.3, 1);
                    spawnTooltip(what(game.all_equipmentSets, me.set), me.id);
                });
            }
        });
        // Play sound on hover
        domWhat('res-' + me.id).addEventListener('mouseover', function(){
            let audio = new Audio('sounds/ui/hovertooltip.wav');
            audio.volume = 0.5;
            audio.playbackRate = 2;
            audio.play();
        })

        // Draggable events
        document.querySelector('#res-' + me.id).addEventListener("dragstart", e => {
            e.dataTransfer.setData("weapon", me.id);
            //console.log(e.dataTransfer.getData("weapon"));
        })
    }
    document.querySelector('#res-weapons').addEventListener('click', (e) => {
        document.querySelector('#res-cat-weapons').classList.toggle('hide');
    })
}

function drawRuneInventory(runes) {
    let str = '';
    for(let i = 0; i < runes.length; i++) {
        let me = runes[i];
        str += '<div id="res-' + me.id + '" class="inventoryItem" style="' + getIcon(me) + '; border: 2px solid ' + getRarityColorCode(me.rarity) +'">';
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
            playSound('sounds/ui/aa-ui6.wav', 0.3, 1);
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
    document.querySelector('#res-runes').addEventListener('click', (e) => {
        document.querySelector('#res-cat-runes').classList.toggle('hide');
    })
}

function drawResourceInventory(resources) {
    let str = '';
    for(let i = 0; i < resources.length; i++) {
        if(resources[i].amount > 0) {
            let me = resources[i];
            str += '<div id="res-' + me.id + '" class="inventoryItem" style="' + getIcon(me) + '; border: 2px solid ' + getRarityColorCode(me.rarity) +'">';
            str += '<div id="res-amount-' + me.id + '" class="inventoryItemAmount">' + (me.amount > 99 ? '99+' : me.amount) + '</div>';
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
                playSound('sounds/ui/aa-ui6.wav', 0.3, 1);
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
    document.querySelector('#res-resources').addEventListener('click', (e) => {
        document.querySelector('#res-cat-resources').classList.toggle('hide');
    })
}

function drawArmorInventory(armors) {
    let str = '';
    for(let i = 0; i < armors.length; i++) {
        let me = armors[i];
        str += '<div id="res-' + me.id + '" class="inventoryItem" style="' + getIcon(me) + '; border: 2px solid ' + getRarityColorCode(me.rarity) +'" draggable="true">';
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
            playSound('sounds/ui/aa-ui6.wav', 0.3, 1);
            spawnTooltip(me);
            if(me.set) {
                let tooltipDesc = domWhat('floating-' + me.id).querySelector('.tooltipSetText');
                tooltipDesc.addEventListener('click', (e) => {
                    playSound('sounds/ui/aa-ui6.wav', 0.3, 1);
                    spawnTooltip(what(game.all_equipmentSets, me.set), me.id);
                });
            }
        });
        // Play sound on hover
        domWhat('res-' + me.id).addEventListener('mouseover', function(){
            let audio = new Audio('sounds/ui/hovertooltip.wav');
            audio.volume = 0.5;
            audio.playbackRate = 2;
            audio.play();
        });

        // Draggable events
        document.querySelector('#res-' + me.id).addEventListener("dragstart", e => {
            e.dataTransfer.setData("armor", me.id);
            //console.log(e.dataTransfer.getData("armor"));
        })
    }
    document.querySelector('#res-armors').addEventListener('click', (e) => {
        document.querySelector('#res-cat-armors').classList.toggle('hide');
    })
}

function drawTrinketInventory(trinkets) {
    let str = '';
    for(let i = 0; i < trinkets.length; i++) {
        let me = trinkets[i];
        str += '<div id="res-' + me.id + '" class="inventoryItem" style="' + getIcon(me) + '; border: 2px solid ' + getRarityColorCode(me.rarity) +'" draggable="true">';
        str += '</div>';
    }
    domWhat('res-cat-trinkets').innerHTML = str;
    for(let i = 0; i < trinkets.length; i++) {
        let me = trinkets[i];
        addTooltip(domWhat('res-' + me.id), function(){
            return getTrinketTooltip(game.inventory.getItemFromId(Data.ItemType.TRINKET, me.id));
        }, {offY: -8});
        // Spawn tooltip and play sound on click
        domWhat('res-' + me.id).addEventListener('click', function(){
            playSound('sounds/ui/aa-ui6.wav', 0.3, 1);
            spawnTooltip(me);
            if(me.set) {
                let tooltipDesc = domWhat('floating-' + me.id).querySelector('.tooltipSetText');
                tooltipDesc.addEventListener('click', (e) => {
                    playSound('sounds/ui/aa-ui6.wav', 0.3, 1);
                    spawnTooltip(what(game.all_equipmentSets, me.set), me.id);
                });
            }
        });
        // Play sound on hover
        domWhat('res-' + me.id).addEventListener('mouseover', function(){
            let audio = new Audio('sounds/ui/hovertooltip.wav');
            audio.volume = 0.5;
            audio.playbackRate = 2;
            audio.play();
        });

        // Draggable events
        document.querySelector('#res-' + me.id).addEventListener("dragstart", e => {
            e.dataTransfer.setData("trinket", me.id);
            //console.log(e.dataTransfer.getData("trinket"));
        });
    }
    document.querySelector('#res-trinkets').addEventListener('click', (e) => {
        document.querySelector('#res-cat-trinkets').classList.toggle('hide');
    })
}

function drawInventory() {
    drawWeaponInventory(game.inventory.weapons);
    drawArmorInventory(game.inventory.armors);
    drawRuneInventory(game.inventory.runes);
    drawResourceInventory(game.inventory.resources);
    drawTrinketInventory(game.inventory.trinkets);
}

function drawStridersScreen() {
    document.querySelector('#stridersDiv').innerHTML = '<div class="stridersContainer"></div>';
    let str = '';

    str += '<div class="p-formationContainer"></div>';

    str += '<div class="teamContainer">';
    str += '<div class="team">';
    delayCounter = 0;
    game.player.roster.forEach(strider => {
        str += '<div id="striderContainer-' + strider.id + '" class="striderContainer" style="animation-delay: ' + delayCounter + 's; background-image: linear-gradient(270deg, transparent 0%, rgba(0, 0, 0, 1) 100%), url(\'css/img/chars/' + strider.charset + '\');">'
        str += '<h1>' + strider.name + '</h1>';
        str += '<h3>' + capitalizeFirstLetter(strider.striderType) + ', Level ' + strider.level.currentLevel + '</h3>';
        str += '</div>';
        delayCounter += 0.025;
    })
    str += '</div>';
    str += '</div>';

    document.querySelector('.stridersContainer').innerHTML = str;

    game.player.roster.forEach(strider => {
        document.querySelector('#striderContainer-' + strider.id).addEventListener('click', e => {
            spawnStriderPopup(strider);
            playSound('sounds/ui/aa-ui6.wav', 0.3, 1);
        });
    });
}

/**
 * Returns HTML code that shows a Strider screen based on the provided Strider's data.
 * @param {Strider} strider the Strider to retrieve data from
 * @param {boolean} refresh if the window is already open, only updates its HTML code instead of spawning it again.
 */
function spawnStriderPopup(strider, refresh = false) {
    let popupWindow;
    if(!refresh) {
        //console.log('spawning');
        popupWindow = document.createElement('div');
        popupWindow.classList.add('striderPopup', 'tooltip', 'framed', 'bgDark', 'tooltipSpawn');
        document.querySelector('#stridersDiv').appendChild(popupWindow);
    } else {
        popupWindow = document.querySelector('.striderPopup');
    }
    //console.log(popupWindow);
    
    let str = '';
    str += '<div class="striderPopup-wrapper">';

    str += '<div class="striderInfos" style="background-image:  linear-gradient(270deg, transparent 5%, rgba(0, 0, 0, 1) 100%), url(\'css/img/chars/' + strider.name.toLowerCase() + '_bg.webp\');' + (strider.customBgPos ? 'background-position: ' + strider.customBgPos : '') + '">';
    str += '<div class="striderInfos-img framed" style="background-image: url(\'css/img/chars/' + strider.charset +'\')"></div>';
    str += '<div class="striderInfos-desc">';
    str += '<div class="barredLeft striderInfos-desc-name">' + strider.name + '</div>';
    str += '<div class="barredLeft striderInfos-desc-subname">' + strider.subname + '</div>';
    str += '<div class="striderInfos-desc-desc">' + strider.desc + '</div>';
    str += '<div class="striderInfos-desc-extra">';
    str += '<div class="striderInfos-desc-type coolBorder">' + capitalizeFirstLetter(strider.striderType) +'</div>';
    str += '<div class="striderInfos-desc-level coolBorder">Level ' + strider.level.currentLevel +'</div>';
    str += '</div>';
    str += '<div class="striderInfos-desc-xp">';
    str += '<div class="xpBar"><div class="xpBar-fill"></div></div>';
    str += '<div class="xp-indicator">' + strider.level.currentXp + '/' + strider.level.nextXp + '</div>'
    str += '</div>'
    str += '</div>';
    str += '</div>';

    str += '<div class="striderStats">'; 
    str += '<div class="striderStats-title">Stats</div>';
    str += '<div class="striderStats-stats">';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Health</span><span class="statValue">' + strider.health + '/' + strider.maxHealth + '</span>' + '</div>'
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Mana</span><span class="statValue">' + strider.mana + '/' + strider.maxMana + '</span>' + '</div>'
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Stamina</span><span class="statValue">' + strider.stamina + '/' + strider.maxStamina + '</span>' + '</div>'
    str += '<div class="spacer"></div>'
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Dodge</span><span class="statValue">' + strider.dodge + '%</span>' + '</div>'
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Speed</span><span class="statValue">' + strider.speed + '</span>' + '</div>'
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Accuracy</span><span class="statValue">' + strider.accuracy + '%</span>' + '</div>'
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Protection</span><span class="statValue">' + strider.protection + '%</span>' + '</div>'
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Might</span><span class="statValue">' + strider.might + '</span>' + '</div>'
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Spirit</span><span class="statValue">' + strider.spirit + '</span>' + '</div>'
    str += '<div class="spacer"></div>'
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Health regen.</span><span class="statValue">' + strider.regenHealth + '</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Stamina regen.</span><span class="statValue">' + strider.regenMana + '</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Mana regen.</span><span class="statValue">' + strider.regenStamina + '</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Damage reflection</span><span class="statValue">' + strider.damageReflection + '</span>' + '</div>';
    str += '<div class="spacer"></div>'
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Bleed res.</span><span class="statValue">' + strider.resBleed[0] + '</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Poison res.</span><span class="statValue">' + strider.resPoison[0] + '</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Movement res.</span><span class="statValue">' + strider.resMove + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Stun res.</span><span class="statValue">' + strider.resStun + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Resilience</span><span class="statValue">' + strider.resilience + '</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Warding</span><span class="statValue">' + strider.warding + '</span>' + '</div>';
    str += '<div class="spacer"></div>'
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Total damage</span><span class="statValue">' + strider.modifDmgTotal + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Weapon damage</span><span class="statValue">' + strider.modifDmgWeapon + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Skill damage</span><span class="statValue">' + strider.modifDmgSkill + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Stun damage</span><span class="statValue">' + strider.modifDmgStun + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Bleed damage</span><span class="statValue">' + strider.modifDmgBleed + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Poison damage</span><span class="statValue">' + strider.modifDmgPoison + '%</span>' + '</div>';
    str += '<div class="spacer"></div>'
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Received heal</span><span class="statValue">' + strider.modifHealRecv + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Given heal</span><span class="statValue">' + strider.modifHealGiven + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Block</span><span class="statValue">' + strider.modifBlock + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Skill accuracy</span><span class="statValue">' + strider.modifAccuracySkill + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Stun accuracy</span><span class="statValue">' + strider.modifAccuracyStun + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Bleed accuracy</span><span class="statValue">' + strider.modifAccuracyBleed + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Poison accuracy</span><span class="statValue">' + strider.modifAccuracyPoison + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Skill crit.</span><span class="statValue">' + strider.modifCritSkill + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Stun crit.</span><span class="statValue">' + strider.modifCritStun + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Bleed crit.</span><span class="statValue">' + strider.modifCritBleed + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Poison crit.</span><span class="statValue">' + strider.modifCritPoison + '%</span>' + '</div>';
    str += '</div>';
    str += '</div>';

    str += '<div class="striderEquipment">';
    str += '<div class="striderEquipmentSlots">';
    str += '<div id="strider-helmet" class="runeInfo runeInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \'' + strider.name + '\').equipArmor(event);" style="' + getIcon(strider.eqHelmet, 25, true) + '">';
    str += '<div class="runeInfo-infos"><div class="runeTitle" style="text-align: left;">' + (strider.eqHelmet ? getSmallThingNoIcon(strider.eqHelmet) : 'No helmet') + '</div>';
    str += '</div></div>';
    str += '<div id="strider-chestplate" class="runeInfo runeInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \'' + strider.name + '\').equipArmor(event);" style="' + getIcon(strider.eqChestplate, 25, true) + '">';
    str += '<div class="runeInfo-infos"><div class="runeTitle" style="text-align: left;">' + (strider.eqChestplate ? getSmallThingNoIcon(strider.eqChestplate) : 'No chestplate') + '</div>';
    str += '</div></div>';
    str += '<div id="strider-gloves" class="runeInfo runeInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \'' + strider.name + '\').equipArmor(event);" style="' + getIcon(strider.eqGloves, 25, true) + '">';
    str += '<div class="runeInfo-infos"><div class="runeTitle" style="text-align: left;">' + (strider.eqGloves ? getSmallThingNoIcon(strider.eqGloves) : 'No gloves') + '</div>';
    str += '</div></div>';
    str += '<div id="strider-boots" class="runeInfo runeInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \'' + strider.name + '\').equipArmor(event);" style="' + getIcon(strider.eqBoots, 25, true) + '">';
    str += '<div class="runeInfo-infos"><div class="runeTitle" style="text-align: left;">' + (strider.eqBoots ? getSmallThingNoIcon(strider.eqBoots) : 'No boots') + '</div>';
    str += '</div></div>';
    str += '<div id="strider-shield" class="runeInfo runeInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \'' + strider.name + '\').equipArmor(event);" style="' + getIcon(strider.eqShield, 25, true) + '">';
    str += '<div class="runeInfo-infos"><div class="runeTitle" style="text-align: left;">' + (strider.eqShield ? getSmallThingNoIcon(strider.eqShield) : 'No shield') + '</div>';
    str += '</div></div>';
    str += '<div id="strider-trinket1" class="runeInfo runeInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \''+ strider.name +'\').equipTrinket(event);" style="' + getIcon(strider.trinkets[0], 25, true) + '">';
    str += '<div class="runeInfo-infos"><div class="runeTitle" style="text-align: left;">' + (strider.trinkets[0] ? getSmallThingNoIcon(strider.trinkets[0]) : 'No trinket') + '</div>';
    str += '</div></div>';
    str += '<div id="strider-trinket2" class="runeInfo runeInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \''+ strider.name +'\').equipTrinket(event);" style="' + getIcon(strider.trinkets[1], 25, true) + '">';
    str += '<div class="runeInfo-infos"><div class="runeTitle" style="text-align: left;">' + (strider.trinkets[1] ? getSmallThingNoIcon(strider.trinkets[1]) : 'No trinket') + '</div>';
    str += '</div></div>';
    if(!strider.eqWeaponBoth) {
        str += '<div id="strider-weaponLeft" class="runeInfo runeInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \'' + strider.name + '\').equipWeapon(event, \'' + Data.WeaponHand.LEFT + '\');" style="' + getIcon(strider.eqWeaponLeft, 25, true) + '")>';
        str += '<div class="runeInfo-infos"><div class="runeTitle" style="text-align: left;">' + (strider.eqWeaponLeft ? getSmallThingNoIcon(strider.eqWeaponLeft) : 'No weapon') + '</div>';
        str += '</div></div>';
        str += '<div id="strider-weaponRight" class="runeInfo runeInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \'' + strider.name + '\').equipWeapon(event, \'' + Data.WeaponHand.RIGHT + '\');" style="' + getIcon(strider.eqWeaponRight, 25, true) + '")>';
        str += '<div class="runeInfo-infos"><div class="runeTitle" style="text-align: left;">' + (strider.eqWeaponRight ? getSmallThingNoIcon(strider.eqWeaponRight) : 'No weapon') + '</div>';
        str += '</div></div>';
    } else {
        str += '<div id="strider-weaponBoth" class="runeInfo runeInfoEmpty bigSlot" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \'' + strider.name + '\').equipWeapon(event);" style="' + getIcon(strider.eqWeaponBoth, 25, true) + '")>';
        str += '<div class="runeInfo-infos"><div class="runeTitle" style="text-align: left;">' + (strider.eqWeaponBoth ? getSmallThingNoIcon(strider.eqWeaponBoth) : 'No weapon') + '</div>';
        str += '</div></div>';
    }
    str += '</div>';
    str += '</div>';

    str += '<div class="striderSkillTree coolBorder" style="background-image: linear-gradient(270deg, transparent 0%, rgba(0, 0, 0, 0.6) 0%), url(\'css/img/chars/' + strider.name.toLowerCase() + '_skilltree.webp\');">';
    str += '<div class="stridersSkillTreePointsIndicator">' + strider.skillPoints +' unspent points</div>';
    str += drawSkillTree(strider);
    str += '</div>';

    str += '<div class="striderMasteryPathway framed">';
    str += '</div>';

    str += '<div class="striderSkills">';
    str += '</div>';

    str += '</div>';

    popupWindow.innerHTML = str;
    if(!refresh) {
        popupWindow.addEventListener('contextmenu', e => {
            e.preventDefault();
            playSound('sounds/ui/ui5.wav', 1, 1.5);
            popupWindow.remove();
        });
    }

    document.querySelector('#strider-helmet').addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipArmor(strider.eqHelmet)});
    document.querySelector('#strider-chestplate').addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipArmor(strider.eqChestplate)});
    document.querySelector('#strider-gloves').addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipArmor(strider.eqGloves)});
    document.querySelector('#strider-boots').addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipArmor(strider.eqBoots)});
    document.querySelector('#strider-shield').addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipArmor(strider.eqShield)});
    document.querySelector('#strider-trinket1').addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipTrinket(strider.trinkets[0])});
    document.querySelector('#strider-trinket2').addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipTrinket(strider.trinkets[1])});
    if(!strider.eqWeaponBoth) {
        document.querySelector('#strider-weaponLeft').addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipWeapon(Data.WeaponHand.LEFT)});
        document.querySelector('#strider-weaponRight').addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipWeapon(Data.WeaponHand.RIGHT)});
    } else {
        document.querySelector('#strider-weaponBoth').addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipWeapon(Data.WeaponHand.BOTH)});
    }

    drawSkillTreeLines(strider);
    bringNodesForward();
    addSkillTreeTooltips(strider);
}

function highlightDrag(e) {
    e.classList.add('dragOver');
}
function disableHighlightDrag(e) {
    e.classList.remove('dragOver');
}

function allowDrop(e) {
    e.preventDefault();
}

/**
 * Returns a string of HTML Code that contains data from the provided Strider's Skill Tree.
 * @param {Strider} strider the Strider whose Skill Tree will be drawn
 * @returns {string} an HTML code that contains the skill tree
 */
function drawSkillTree(strider) {
    let str = '';
    
    //draw power node
    str += '<div class="treeFraction">';
    str += '<div id="' + trimWhitespacesInsideString(strider.name) + '-0" class="treeNode coolBorder powerNode" style="background-image: url(\'css/img/skills/' + strider.name + strider.uniqueIcon + '.png\')"></div>';
    str += '</div>';
    
    // find tree roots
    let roots = [];
    strider.skillTree.nodes.forEach(node => {
        if(node.previous.length == 0) roots.push(node);
    })

    // prepare tree model
    let tree = {};
    // build the tree (append) from each root
    roots.forEach(root => {
        tree = buildSkillTree(root, 0, tree);
    });
    //console.log(tree);

    // for each depth on the tree model, create a new treeFraction and fill it with the nodes at that depth
    for(const depth in tree) {
        //console.log('Depth: ' + depth);
        str += '<div class="treeFraction">';
        for(const node of tree[depth]) {
            str += '<div id="' + trimWhitespacesInsideString(node.name) + '" class="treeNode ' + getBorderClassFromNode(node) + ' powerNode" style="background-image: url(\'css/img/skills/' + strider.name + node.icon + '.png\')"></div>';
        }
        str += '</div>';
    }
    return str;
}

/**
 * Draws lines between each node of the provided Strider's Skill Tree.
 * This is achieved by spawning an SVG panel of the same size as the Skill Tree container, then computing each line's start and end coordinates and drawing them.
 * Since the SVG panel is drawn in front of the base Skill Tree container, it is necessary to call the function bringNodesForward() in
 * order to re-enable the hover features of each node.
 * @param {Strider} strider the Strider whose Skill Tree's layout will be used to draw lines
 */
function drawSkillTreeLines(strider) {
    const parent = document.querySelector('.striderSkillTree')
    
    let str = '';
    
    str += '<svg class="skillTreeLinesOverlay" height="' + parent.scrollHeight + '" width="' + parent.offsetWidth + '">';
    strider.skillTree.nodes.forEach(node => {
        
        const elem = document.querySelector('#' + trimWhitespacesInsideString(node.name));
        const basePos = elem.getBoundingClientRect();
        const basePosOriginX = elem.offsetLeft + basePos.width/2;
        const basePosOriginY = elem.offsetTop + basePos.height;
        let children = [];
        node.next.forEach(next => {
            children.push(
                {
                    dom: document.querySelector('#' + trimWhitespacesInsideString(next.name)),
                    obj: next
                }
            );
        });
        children.forEach(child => {
            let color = getLineColorFromNodeState(child.obj, node);
            let type = child.obj.isUnlocked() && node.currentLevel > 0 ? false : true;
            let targetPos = child.dom.getBoundingClientRect();
            let targetPosOriginX = child.dom.offsetLeft + targetPos.width/2;
            let targetPosOriginY = child.dom.offsetTop;
            let id = 'line-' + trimWhitespacesInsideString(child.obj.name) +'-childOf-' + trimWhitespacesInsideString(node.name);
            str += '<line class="skillTreeLine" id="' + id + '" x1="' + basePosOriginX + '" y1="' + basePosOriginY +'" x2="' + targetPosOriginX + '" y2="' + targetPosOriginY + '" style="stroke:' + color + '; stroke-width: ' + (type ? '1' : '2') + ';' + (type ? ' stroke-dasharray: 10; animation-name: animstroke; animation-iteration-count: infinite; animation-duration: 60s; animation-timing-function: linear;' : '') + '" />';
        })
    });

    str += '</svg>';

    parent.innerHTML += str;
}

/**
 * Builds a SkillTree recursively. Returns an object that contains every node that descends from the provided start node, ranked by 
 * depth (no duplicates allowed). Ideally, this function should be called on every root of a SkillTree in order to build a 
 * fully exploitable tree model.
 * @param {SkillTreeNode} node the node to build
 * @param {number} depth the current depth of the tree
 * @param {object} result an object that contains each Node, ranked by depth
 */
function buildSkillTree(node, depth = 0, result = {}) {
    if(!node || arrayContains(result[depth], node)) return result;

    if(!result[depth]) {
        result[depth] = [];
    }
    result[depth].push(node);

    if(node.hasNext()) {
        node.next.forEach(next => {
            buildSkillTree(next, depth + 1, result);
        });
    }

    return result;
}

/**
 * Adds tooltips for each node of the provided Strider's Skill Tree.
 * @param {Strider} strider the Strider whose Skill Tree Nodes will be processed
 */
function addSkillTreeTooltips(strider) {
    // power node
    addTooltip(document.querySelector('#' + trimWhitespacesInsideString(strider.name) + '-0'), function(){
        return getPowerNodeTooltip(strider);
    }, {offY: -8});
    document.querySelector('#' + trimWhitespacesInsideString(strider.name) + '-0').addEventListener('contextmenu', e => {
        e.preventDefault();
        e.stopImmediatePropagation();
    })

    strider.skillTree.nodes.forEach(node => {
        addTooltip(document.querySelector('#' + trimWhitespacesInsideString(node.name)), function(){
            return getNodeTooltip(strider, node);
        }, {offY: -8});

        document.querySelector('#' + trimWhitespacesInsideString(node.name)).addEventListener('click', (e) => {
            unlockNode(strider, node);
        })
        document.querySelector('#' + trimWhitespacesInsideString(node.name)).addEventListener('contextmenu', e => {
            e.preventDefault();
            e.stopImmediatePropagation();
        })
    })
}

/**
 * Unlocks the provided Node and updates DOM elements accordingly.
 * @param {Strider} strider the Strider that will unlock the node
 * @param {SkillTreeNode} node the Node to be unlocked
 */
function unlockNode(strider, node) {
    if(strider.canUnlockTreeNode(node)) {
        strider.unlockTreeNode(node);
        // UPDATE TOOLTIP
        document.querySelector('#tooltip').innerHTML = getNodeTooltip(strider, node);
        // UPDATE NODE SQUARE
        document.querySelector('#' + trimWhitespacesInsideString(node.name)).classList.remove('coolBorder');
        if(node.currentLevel == node.levels){
            document.querySelector('#' + trimWhitespacesInsideString(node.name)).classList.add('skillTreeNode-animate-full', 'borderNodeFull');
        } else {
            document.querySelector('#' + trimWhitespacesInsideString(node.name)).classList.add('skillTreeNode-animate-progress', 'borderNodeOngoing');
        }
        // UPDATE NODE LINES (NEXT & PREVIOUS);
        node.next.forEach(next => {
            const id = '#line-' + trimWhitespacesInsideString(next.name) +'-childOf-' + trimWhitespacesInsideString(node.name);
            document.querySelector(id).classList.add('skillTreeLine-animate-unlock');
        });
        node.previous.forEach(previous => {
            const id = '#line-' + trimWhitespacesInsideString(node.name) +'-childOf-' + trimWhitespacesInsideString(previous.name);
            if(node.currentLevel > 0 && node.currentLevel < node.levels && previous.currentLevel > 0) {
                document.querySelector(id).classList.add('skillTreeLine-animate-progress');
            } else if(node.currentLevel == node.levels && previous.currentLevel > 0) {
                document.querySelector(id).classList.add('skillTreeLine-animate-full');
            }
        });
        document.querySelector('.stridersSkillTreePointsIndicator').textContent = strider.skillPoints + ' unspent points';
    }
}

/**
 * Brings all of the tree fractions forward by increasing their z-index value.
 * This is necessary because the SVG panel, which contains the lines that connect each skill tree node, is drawn above the base node layout,
 * which means it blocks their hover features. By bringing the nodes back forward, the SVG lines remain visible and we allow the user
 * to access the hover features of the nodes.
 */
function bringNodesForward() {
    document.querySelectorAll('.treeFraction').forEach(single => {
        single.style.position = "relative";
        single.style.zIndex = "1";
    });
}

/**
 * Returns HTML code that contains data for the provided Strider's inner power.
 * @param {Strider} strider the Strider to retrieve data from
 * @returns {string} a string that contains HTML code
 */
function getPowerNodeTooltip(strider) {
    let str = '';
    str += '<div class="nodeContainer">';

    str += '<div class="nodeContainerBanner">';
    str += '<div class="vignette coolBorder" style="background-image: url(\'css/img/skills/' + strider.name + strider.uniqueIcon + '.png\')"></div>';
    str += '<div class="desc">';
    str += '<h4>' + strider.uniqueName + '</h4>';
    str += '<div class="treeNodeTags">'
    str += '<div class="treeNodeType treeNodeType-power">Inner Power</div>';
    str += '</div>'
    str += '</div>';
    str += '</div>';

    str += '<div class="divider"></div>';

    str += '<div class="nodeDesc">' + strider.uniqueDesc +'</div>';
    str += '<div class="divider"></div>';
    str += '<div class="par tooltipDesc">' + strider.uniqueQuote + '</div>'

    str += '</div>';
    str += '</div>';

    return str;
}

/**
 * Returns HTML code that contains data for a Skill Tree Node tooltip, based on the provided Strider and Node objects.
 * @param {Strider} strider the Strider to retrieve data from
 * @param {SkillTreeNode} node the SkillTreeNode to retrieve data from
 * @returns {string} a string that contains HTML code
 */
function getNodeTooltip(strider, node) {
    let str = '';
    str += '<div class="nodeContainer">';

    str += '<div class="nodeContainerBanner">';
    str += '<div class="vignette coolBorder" style="background-image: url(\'css/img/skills/' + strider.name + node.icon +'.png\')"></div>';
    str += '<div class="desc">';
    str += '<h4>' + node.name + '</h4>';
    str += '<div class="treeNodeTags">'
    str += '<div class="treeNodeType treeNodeType-' + node.type.toLowerCase() +'">' + capitalizeFirstLetter(node.type) +'</div>';
    str += '<div class="treeNodeType treeNodeType-' + (node.currentLevel == 0 ? 'off' : node.currentLevel < node.levels ? 'ongoing' : 'full') +'">' + node.currentLevel + '/' + node.levels + '</div>';
    str += '</div>'
    str += '</div>';
    str += '</div>';

    str += '<div class="divider"></div>';

    str += '<div class="nodeDesc">' + node.desc + '</div>';

    str += '<div class="divider"></div>';

    for(const level in node.rewards) {
        if(node.currentLevel == level) {
            str += '<div class="rewardsWrapper">';
            str += '<div class="par reward-' + (node.currentLevel < node.levels ? 'ongoing' : 'full') +'">Current level' + (node.currentLevel == node.levels ? ' (max.)' : '') +':</div>';
            node.rewards[level].forEach(reward => {
                str += '<div class="par bulleted">' + reward.desc + '</div>';
            });
            str += '</div>'
        } else if(node.currentLevel == level-1) {
            str += '<div class="rewardsWrapper">';
            str += '<div class="par" style="color: rgb(175,175,175)">Next level:</div>';
            node.rewards[level].forEach(reward => {
                str += '<div class="par bulleted" style="color: rgb(175,175,175)">' + reward.desc + '</div>';
            });
            str += '</div>';
        }
    }

    str += '<div class="divider"></div>';
    str += '<div class="par tooltipDesc">' + node.quote + '</div>';

    if(!node.isUnlocked()) {
        str += '<div class="par"></div>';
        str += '<div class="par"></div>';

        str += '<div class="par nodeDenied">This upgrade is locked. Unlock previous upgrades to access it.</div>';
    } else if(node.currentLevel != node.levels) {
        str += '<div class="par"></div>';
        str += '<div class="par"></div>';

        str += '<div class="par nodeRequirements">Requires: <span class="' + (node.getNextRequiredLevel() <= strider.level.currentLevel ? 'nodeFull' : 'nodeDenied') + '">Level ' + node.getNextRequiredLevel() + '</span>, <span class="' + (node.getNextRequiredSkillPoints() <= strider.skillPoints ? 'nodeFull' : 'nodeDenied') + '">' + node.getNextRequiredSkillPoints() + ' points</span></div>';
    }

    str += '</div>';
    str += '</div>';

    return str;
}

function drawHubScreen() {
    document.querySelector('#hubDiv').innerHTML = '<div class="hubContainer"></div>';
    let str = '';

    str += '<div class="quests">';
    str += '</div>'

    str += '<div class="merchants">';
    str += '</div>'

    str += '<div class="others">'
    str += '</div>';
    
    str += '<div class="lordContainer">';

    str += '<div class="lordDialogueContent coolBorder">'

    str += '<p>Bon ecoute moi alors oui, tu es homosexuel et tu dois redevenir hetero en faite. C est très important tu as compris espece de gros pd de mort ? tu es GAY alors stop!!sa suffit ok les gays cest dehors il y a pas de sa en algerie la terre de luffy. Oui je suis fan de one piece et d’ailleurs savais tu que ce manga etait inspiré de l’arrivee en algérie par les premiers pirates qui ont colonisé le pays ? plus tard mon fils je l’appellerai par le nom d’un perso de one piece, et puis si c’est une fille je la vendrai à un mec pour deux chameaux au moins eux ils pourront porter des choses lourdes haha, bref qu’est-ce qu’on disait ? ah oui gros pd tu dois arreter o k? si tu y arrives je te donne 1000xp</p>';

    str += '</div>';

    str += '<div class="lordVignette">'
    str += '</div>';

    str += '</div>';

    document.querySelector('.hubContainer').innerHTML = str;
}

function openAstralForge(event) {
    // retrieving data
    const weapon = event.dataTransfer.getData("weapon");
    const armor = event.dataTransfer.getData("armor");
    const trinket = event.dataTransfer.getData("trinket");

    if(weapon !== '') drawAstralForgeScreen(getInventoryWeaponById(Number(weapon)).astralForgeItem);
    else if(armor !== '') drawAstralForgeScreen(getInventoryArmorById(Number(armor)).astralForgeItem);
    else if(trinket !== '') drawAstralForgeScreen(getInventoryTrinketById(Number(trinket)).astralForgeItem);
    else throw new Error('Tried to open the Astral Forge screen with an uncompatible object.')
}    

function drawWorkshopScreen() {
    document.querySelector('#workshopDiv').innerHTML = '<div class="workshopContainer"></div>';

    let str = '<div class="astralForgeReceptacle" ondrop="openAstralForge(event)" ondragover="allowDrop(event)"></div>';

    document.querySelector('.workshopContainer').innerHTML = str;

    //document.querySelector('.astralForgeReceptacle').
}

function drawAstralForgeScreen(forgeItem, refresh = false) {
    console.log('Astral Forge screen opened with ' + forgeItem.item.name);

    let popupWindow;
    if(!refresh) {
        popupWindow = document.createElement('div');
        popupWindow.classList.add('astralForgePopup', 'bgDark', 'tooltipSpawn');
        document.querySelector('#workshopDiv').appendChild(popupWindow);
    } else {
        popupWindow = document.querySelector('.astralForgePopup');
    }

    let str = '<div class="astralForgeContainer">';

    str += '<div class="astralForge-effects coolBorderBis">';
    str += getAstralForgeEffects(forgeItem);
    str += '</div>';

    str += '<div class="astralForge-history">';
    str += '<div class="astralForge-history-title">History</div>';
    str += '<div class="astralForge-history-body">'
    str += getAstralForgeHistory(forgeItem);
    str += '</div>';
    str += '</div>';

    str += '<div class="astralForge-item coolBorderBis">';
    str += getAstralForgeItemBox(forgeItem);
    str += '</div>';

    str += '<div class="astralForge-shards">';
    str += getAstralForgeShards(forgeItem.selectedOverload);
    str += '</div>';

    str += '<div class="astralForge-modifiers coolBorderBis">';
    str += getAstralForgeSubstrateBox(forgeItem);
    str += '</div>';

    str += '</div>';

    popupWindow.innerHTML = str;
    if(!refresh) {
        popupWindow.addEventListener('contextmenu', e => {
            e.preventDefault();
            playSound('sounds/ui/ui5.wav', 1, 1.5);
            forgeItem.clearShard();
            forgeItem.clearEffect();
            forgeItem.clearSelectedCometDust();
            forgeItem.clearSelectedOverload();
            forgeItem.clearSelectedBookmark();
            popupWindow.remove();
        });
    }

    // add events below...
    // SHARDS AND EFFECTS
    generateAstralForgeScreenEvents(forgeItem);

    generateAstralForgeScreenButtonEvents(forgeItem);
}

function generateAstralForgeScreenButtonEvents(forgeItem) {
    // SUBSTRATE AND ALTER BUTTONS
    const alterButton = document.querySelector('.alterButton');
    alterButton.addEventListener('click', e => {
        launchAlteration(forgeItem);
    });

    const consumesubstrateButton = document.querySelector('.consumesubstrateButton');
    consumesubstrateButton.addEventListener('click', e => {
        consumesubstrateButton.classList.toggle('selected');
        forgeItem.consumeSubstrate = !forgeItem.consumeSubstrate;
    });

    const revertAlterationButton = document.querySelector('.revertAlterationButton');
    revertAlterationButton.addEventListener('click', e => {
        launchReversion(forgeItem);
    });
}

function generateAstralForgeScreenEvents(forgeItem, skipShards = false, skipEffects = false, skipHistory = false, skipCometDusts = false) {
    if(!skipShards) {
        document.querySelectorAll('.shardSelectable').forEach(sha => {
            sha.addEventListener('click', e => {
                const shard = getInventoryResourceById(Number(sha.id));
    
                if(forgeItem.selectedShard && forgeItem.selectedShard.name === shard.name) {
                    forgeItem.clearShard();
                } else if(forgeItem.selectedShard) {
                    unselectCurrentShard(forgeItem);
                    forgeItem.clearShard();
                    forgeItem.selectShard(shard);
                } else {
                    forgeItem.selectShard(shard);
                }
    
                const overloadWindow = document.querySelector('.astralForge-overloadWindow');
                if(overloadWindow) overloadWindow.remove();

                sha.classList.toggle('shardSelected');
                console.log(forgeItem.selectedShard);
            });
        });
        // OVERLOAD EFFECT SELECTION
        document.getElementById(what(game.player.inventory.resources, "prismatic time shard").id).addEventListener('click', e => {
            const div = document.createElement('div');

            const available = forgeItem.getAvailableOverloadEffects();
            console.log('Selected overload: ' + forgeItem.selectedOverload);
            let str = '';
            str += '<h3>Overload Effect Selection</h3>';
            str += '<div class="divider"></div>';
            available.forEach(eff => {
                str += '<p id="' + eff + '"' + (forgeItem.selectedOverload === eff ? ' class="selectedOverload"' : '') + '>' + capitalizeFirstLetter(eff) + ' <span class="theoricalval" style="margin-left: 0.2rem;">[' + getOverValueFromConfig(eff) + ']</span>' + '</p>';
            });

            div.innerHTML = str;
            div.classList.add('astralForge-overloadWindow', 'tooltipSpawn');

            if(forgeItem.selectedShard && forgeItem.selectedShard.name.toLowerCase() === "prismatic time shard") {
                document.querySelector('.astralForge-effects').appendChild(div);
                document.querySelectorAll('.astralForge-overloadWindow > p').forEach(line => {
                    line.addEventListener('click', e => {
                        forgeItem.selectedOverload = line.id;
                        console.log('Selected overload: ' + forgeItem.selectedOverload);
                        e.stopImmediatePropagation();
                        document.querySelector('.astralForge-overloadWindow').remove();
                        getAstralForgeShards(forgeItem.selectedOverload, true);
                        generateAstralForgeScreenEvents(forgeItem, false, true, true, false);
                        unselectCurrentShard(forgeItem);
                        unselectCurrentCometDust(forgeItem);
                        generateAstralForgeScreenButtonEvents(forgeItem);
                    });
                });
                document.querySelector('.astralForge-overloadWindow').addEventListener('contextmenu', e => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    document.querySelector('.astralForge-overloadWindow').remove();
                });
            }
        });
    }
    if(!skipEffects) document.querySelectorAll('.effectSelectable').forEach(eff => {
        eff.addEventListener('click', e => {
            const effect = eff.querySelector('.astralEffectContent').textContent.toLowerCase();

            if(forgeItem.selectedEffect && forgeItem.selectedEffect === effect) {
                forgeItem.clearEffect();
            } else if(forgeItem.selectedEffect) {
                unselectCurrentEffect(forgeItem);
                forgeItem.clearEffect();
                forgeItem.selectEffect(effect);
            } else {
                forgeItem.selectEffect(effect);
            }

            eff.classList.toggle('effectSelected');
            console.log(forgeItem.selectedEffect);
        });
    });
    if(!skipHistory) document.querySelectorAll('.astralForgeHistory-single').forEach(hist => {
        hist.addEventListener('click', e => {
            const bookmark = findAstralForgeBookmarkByID(forgeItem, hist.id);

            if(forgeItem.selectedBookmark && forgeItem.selectedBookmark === bookmark) {
                forgeItem.clearSelectedBookmark();
            } else if(forgeItem.selectedBookmark) {
                unselectCurrentBookmark(forgeItem);
                forgeItem.clearSelectedBookmark();
                forgeItem.selectBookmark(bookmark);
            } else {
                forgeItem.selectBookmark(bookmark);
            }

            hist.classList.toggle('bookmarkSelected');
            console.log(forgeItem.selectedBookmark);
        });
    });
    if(!skipCometDusts) document.querySelectorAll('.dustSelectable').forEach(comdus => {
        comdus.addEventListener('click', e => {
            const dust = getInventoryResourceById(Number(comdus.id));
            
            if(forgeItem.selectedCometDust && forgeItem.selectedCometDust === dust) {
                forgeItem.clearSelectedCometDust();
            } else if(forgeItem.selectedCometDust) {
                unselectCurrentCometDust(forgeItem);
                forgeItem.clearSelectedCometDust();
                forgeItem.selectCometDust(dust);
            } else {
                forgeItem.selectCometDust(dust);
            }

            comdus.classList.toggle('cometdustSelected');
            console.log(forgeItem.selectedCometDust);
        });
    });
}

function launchAlteration(forgeItem) {
    const attemptOutcome = forgeItem.canLaunchAlteration();
    if(attemptOutcome === Data.AlterationError.NONE) {
        clearAnimationClasses();
        console.log('Altering...');
        const alterationOutcome = forgeItem.alterEffect(forgeItem.selectedShard, forgeItem.selectedEffect);

        getAstralForgeEffects(forgeItem, true);
        
        updateAstralForgeShardCounter(forgeItem.selectedShard);
        if(forgeItem.selectedCometDust) updateAstralForgeCometDustCounter(forgeItem.selectedCometDust);
        
        if(forgeItem.selectedShard.amount === 0) {
            unselectCurrentShard(forgeItem);
            forgeItem.clearShard();
        }
        
        getAstralForgeHistory(forgeItem, true)
        if(forgeItem.selectedEffect) unselectCurrentEffect(forgeItem);

        generateAstralForgeScreenEvents(forgeItem, true, false, false, true);
        unselectCurrentBookmark(forgeItem);

        getAstralForgeItemBox(forgeItem, true);
        
        astralForgeEffectAnimate(forgeItem);
        forgeItem.clearAnimationQueue();
    } else {
        console.info(attemptOutcome);
        addAstralForgeNotification(attemptOutcome);
    }
}

function addAstralForgeNotification(message) {
    let str = '';

    str += '<div class="astralForge-notification">';
    str += message;
    str += '</div>';

    document.querySelector('.astralForge-notifications').innerHTML = str;
}

function launchReversion(forgeItem) {
    const attemptOutcome = forgeItem.canLaunchReversion();
    if(attemptOutcome === Data.ReversionError.NONE) {
        forgeItem.revertAlteration(forgeItem.selectedBookmark);

        getAstralForgeEffects(forgeItem, true);

        updateAstralForgeCometDustCounter(forgeItem.selectedCometDust);

        if(forgeItem.selectedCometDust.amount === 0) {
            unselectCurrentCometDust(forgeItem);
            forgeItem.clearSelectedCometDust();
        }

        getAstralForgeHistory(forgeItem, true)
        if(forgeItem.selectedEffect) unselectCurrentEffect(forgeItem);

        generateAstralForgeScreenEvents(forgeItem, true, false, false, true);
        unselectCurrentBookmark(forgeItem);
        forgeItem.clearSelectedBookmark();
    } else {
        console.info(attemptOutcome);
    }
}

function updateAstralForgeShardCounter(shard) {
    document.getElementById(shard.id).childNodes[0].innerHTML = shard.amount;
}
function updateAstralForgeCometDustCounter(cometDust) {
    document.getElementById(cometDust.id).childNodes[0].innerHTML = cometDust.amount;
}
function getSelectedAstralForgeShard(forgeItem) {
    return document.getElementById(forgeItem.selectedShard.id)
}
function unselectCurrentShard(forgeItem) {
    getSelectedAstralForgeShard(forgeItem).classList.toggle('shardSelected');
}
function getSelectedAstralForgeEffect(forgeItem) {
    return document.getElementById('eff-' + trimWhitespacesInsideString(forgeItem.selectedEffect.toLowerCase()))
}
function unselectCurrentEffect(forgeItem) {
    getSelectedAstralForgeEffect(forgeItem).classList.toggle('effectSelected');
}
function getSelectedAstralForgeCometDust(forgeItem) {
    const cometDust = forgeItem.selectedCometDust;
    if(!cometDust) return null;
    return document.getElementById(cometDust.id);
}
function unselectCurrentCometDust(forgeItem) {
    const cometDust = getSelectedAstralForgeCometDust(forgeItem);
    if(!cometDust) return;
    cometDust.classList.toggle('cometdustSelected');
}
function getSelectedAstralForgeBookmark(forgeItem) {
    const bookmark = forgeItem.selectedBookmark;
    if(!bookmark) return null;
    return document.getElementById(bookmark.id);
}
function unselectCurrentBookmark(forgeItem) {
    const bookmark = getSelectedAstralForgeBookmark(forgeItem);
    if(!bookmark) return;
    bookmark.classList.toggle('bookmarkSelected');
}
function getAstralForgeEffectDOM(effect) {
    return document.getElementById('eff-' + trimWhitespacesInsideString(effect));
}
function astralForgeEffectAnimate(forgeItem) {
    console.log(forgeItem.animationQueue);
    forgeItem.animationQueue.forEach(anim => {
        getAstralForgeEffectDOM(anim[0]).classList.add(anim[1]);
    });
}
function clearAnimationClasses() {
    document.querySelectorAll('.effectSelectable').forEach(el => {
        el.classList.remove('effectAlterSuccess', 'effectAlterCriticalSuccess', 'effectAlterNeutral', 'effectAlterFailure');
    })
}

function getAstralForgeShards(overload, refresh = false) {
    let str = '<table class="astralForgeShards"><tbody>';
    let shards = game.player.inventory.getTimeShards();
    let cometDusts = game.player.inventory.getCometDusts();
    shards.forEach(shard => {
        str += '<tr id="' + shard.id + '" class="shard shardSelectable">';
        str += '<td style="width: 20%; text-align: center;">' + shard.amount + '</td>';
        str += '<td style="color: ' + getRarityColorCode(shard.rarity) + '">' + shard.name;
        if(shard.name.toLowerCase() === 'prismatic time shard' && overload) str += '<br><span class="selectedOverloadIndicator">' + capitalizeFirstLetter(overload) + '</span>'; 
        str += '</td>';
        str += '</tr>';
    });
    str += '</tbody></table>';

    str += '<div class="divider"></div>';

    str += '<table class="astralForgeShards"><tbody>';
    cometDusts.forEach(dust => {
        str += '<tr id="' + dust.id + '" class="shard dustSelectable">';
        str += '<td style="width: 20%; text-align: center;">' + dust.amount + '</td>';
        str += '<td style="color: ' + getRarityColorCode(dust.rarity) + '">' + dust.name + '</td>';
        str += '</tr>';
    })
    str += '</tbody></table>';

    str += '<div class="simpleButton alterButton" style="margin-top: 1rem">Alter</div>';
    str += '<div class="simpleButton consumesubstrateButton" style="margin-top: 0.5rem">Consume substrate</div>';
    str += '<div class="simpleButton revertAlterationButton" style="margin-top: 0.5rem">Revert alteration</div>';

    if(refresh) {
        document.querySelector('.astralForge-shards').innerHTML = str;
        return;
    }
    return str;
}

function getAstralForgeItemBox(forgeItem, refresh = false) {
    const item = forgeItem.item;
    let str = '';

    str += '<div class="astralForge-item-itemBox">';
    str += '<div class="astralForge-item-iconBox ' + getInsetShadowFromRarity(item) + '" style="background-image: url(\'' + getIconFileFromItem(item) + '\')"></div>';
    str += '<div class="astralForge-item-infos">';
    str += '<h1 class="barredLeftFull" style="margin: 0 0 2px 0">' + item.name + '</h1>';
    str += '<h3 class="barredLeftFull" style="margin-top: 0px">' + capitalizeFirstLetter(forgeItem.state) + ' ' + capitalizeFirstLetter(item.rarity) + ' ' + capitalizeFirstLetter(getItemType(item)) + '</h3>';
    str += '</div>';
    str += '</div>';

    str += '<div class="astralForge-notifications"></div>';

    if(refresh) {
        document.querySelector('.astralForge-item').innerHTML = str;
        return;
    }
    return str;
}

function getAstralForgeHistory(forgeItem, refresh = false) {
    const item = forgeItem.item;
    const history = forgeItem.history;
    let str = '';

    history.reverse().forEach(hist => {
        const outcome = hist.outcome;
        const bookmarks = hist.bookmark;
        const histID = hist.id;
        str += '<div id="' + histID + '" class="astralForgeHistory-single ' + getAstralForgeOutcomeCSSClass(outcome) + '">';
        str += '<div class="banner">' + capitalizeFirstLetter(outcome) + '</div>';
        str += '<div class="body">';

        bookmarks.forEach(boo => {
            const effect = boo.effect;
            const asBoolean = boo.asBoolean;
            let color;
            if(effect.effect === Data.Effect.EFFORT) color = effect.getValue() > 0 ? Data.Color.RED : Data.Color.GREEN;
            else color = effect.getValue() > 0 ? Data.Color.GREEN : Data.Color.RED;
            
            if(asBoolean) str += capitalizeFirstLetter(effect.effect);
            else str += effect.getFormatted({cssClass: "astralForgeHistory-effect", color: color, noTheorical: true});
        })

        str += '</div>';
        str += '</div>';
    });
    history.reverse();

    if(refresh) {
        document.querySelector('.astralForge-history-body').innerHTML = str;
        return;
    }
    return str;
}

function getAstralForgeSubstrateBox(forgeItem, refresh = false) {
    let str = '<div class="astralForgeSubstrate">';

    str += '<div class="astralForgeSubstrate-counter">' + forgeItem.substrate + '</div>';

    str += '</div>';

    if(refresh) {
        document.querySelector('.astralForge-modifiers').innerHTML = str;
        return;
    }
    return str;
}

function generateAstralForgeEffectLine(forgeItem, effect, cssClass, range = false, noDetails = false, boolTranslate = false) {
    let str = '';
    const reference = noDetails ? {effect: null, max: 1, added: 0} : forgeItem.getEffectFromReferenceTable(effect.effect);
    const addedColor = noDetails ? 'inherit' : getAstralForgeEffectColor(new Stat({effect: reference.effect, theorical: reference.added}));
    if(reference.max === reference.added && !forgeItem.targetedEffectIsBoolean(effect.effect)) cssClass += ' fullyUpgradedEffect';

    str += '<tr id="eff-' + trimWhitespacesInsideString(effect.effect) + '" class="' + cssClass + '">';
    if(boolTranslate) {
        str += '<td class="effVal">' + (effect.getValue() === 1 ? 'Yes' : 'No') + '</td>';
    } else {
        str += '<td class="effVal">' + (range ? effect.theorical[0] + '-' + effect.theorical[1] : effect.getValue()) + (effect.isPercentage ? '%' : '') + '</td>';
    }
    str += '<td class="astralEffectContent">' + capitalizeFirstLetter(effect.effect) + '</td>';
    str += '<td>' + (noDetails ? '/' : getPersistanceFromConfig(effect.effect)) + '</td>';
    str += '<td>' + (noDetails ? '/' : getSubstrateFromConfig(effect.effect)) + '</td>';
    str += '<td>' + ((noDetails || reference.max === 0) ? '/' : (reference.effect === Data.Effect.EFFORT ? '-' : '') + reference.max) + '</td>';
    str += '<td style="color: ' + addedColor + '; font-family: ' + (reference.added !== 0 ? 'RobotoBold' : 'inherit') + '">' + (noDetails ? '/' : (reference.added > 0 ? '+' : '') + reference.added) + '</td>';
    
    str += '</tr>';

    return str;
}

function getAstralForgeEffects(forgeItem, refresh = false) {
    const item = forgeItem.item;
    console.log(item);
    let str = '';
    str += '<table class="astralForgeEffects">';
    str += '<thead class="coolBorderBis">';
    str += '<tr>';
    str += '<th style="width:20%">Value</th>';
    str += '<th style="width:40%">Effect</th>';
    str += '<th style="width:10%">Per</th>';
    str += '<th style="width:10%">Sub</th>';
    str += '<th style="width:10%">Max</th>';
    str += '<th style="width:10%">Mod</th>';
    str += '</tr>';
    str += '</thead>';
    str += '<tbody>';
    forgeItem.extraEffects.forEach(eff => {
        str += generateAstralForgeEffectLine(forgeItem, eff, "overloadEffect", false, true);
    });
    if(forgeItem.itemType === Data.ItemType.WEAPON) {

        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.PDMG, theorical: [item.pdmg[0], item.pdmg[1]]}), "effectSelectable", true);
        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.MDMG, theorical: [item.mdmg[0], item.mdmg[1]]}), "effectSelectable", true);
        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.BLOCK, theorical: item.block}), "effectSelectable");
        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.EFFORT, theorical: item.effort}), "effectSelectable");
        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.CRIT_LUK, theorical: item.crit_luk, isPercentage: true}), "effectSelectable");
        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.CRIT_DMG, theorical: item.crit_dmg}), "effectSelectable");

        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.BLEED_DMG, theorical: item.bleed[0]}), "effectSelectable");
        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.BLEED_DURATION, theorical: item.bleed[1]}), "effectSelectable");
        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.BLEED_CURABLE, theorical: item.bleed[2]}), "effectSelectable", false, false, true);

        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.POISON_DMG, theorical: item.poison[0]}), "effectSelectable");
        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.POISON_DURATION, theorical: item.poison[1]}), "effectSelectable");
        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.POISON_CURABLE, theorical: item.poison[2]}), "effectSelectable", false, false, true);

        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.RANGE_FRONT_ON, theorical: item.range[0]}), "effectSelectable", false, false, true);
        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.RANGE_MIDDLE_ON, theorical: item.range[1]}), "effectSelectable", false, false, true);
        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.RANGE_BACK_ON, theorical: item.range[2]}), "effectSelectable", false, false, true);

    } else if(forgeItem.itemType === Data.ItemType.ARMOR) {

        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.RESILIENCE, theorical: [item.resilience]}), "effectSelectable");
        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.WARDING, theorical: [item.warding]}), "effectSelectable");

    } else if(forgeItem.itemType === Data.ItemType.TRINKET) {
        item.effects.forEach(eff => {
            str += generateAstralForgeEffectLine(forgeItem, eff, "effectSelectable");
        });
    }

    str += '</tbody>';
    str += '</table>';

    if(refresh) {
        document.querySelector('.astralForge-effects').innerHTML = str;
        return;
    }
    return str;
}

function drawExploreScreen() {
    document.querySelector('#explorationDiv').innerHTML = '<div class="dungeonContainer"></div>';
    let str = '';
    str += '<div class="biomeContainer coolBorder">';

    str += '<div class="biomeContainerHeader">';
    str += '<h1>EXPLORE THE DUNGEONS</h1>';
    str += '<p>Gather the eons and get your hands on powerful items!</p>';
    str += '</div>';

    str += '<div class="jungle biome coolBorderBis insetShadowCommon">'
    str += '<h1 class="barredLeftFull">JUNGLE</h1>'
    str += '</div>';

    str += '<div class="desert biome coolBorderBis insetShadowCommon">'
    str += '<h1 class="barredLeftFull">DESERT</h1>'
    str += '</div>';

    str += '<div class="snow biome coolBorderBis insetShadowCommon">'
    str += '<h1 class="barredLeftFull">SNOW</h1>'
    str += '</div>';

    str += '<div class="swamp biome coolBorderBis insetShadowCommon">'
    str += '<h1 class="barredLeftFull">SWAMP</h1>'
    str += '</div>';

    str += '<div class="coast biome coolBorderBis insetShadowCommon">'
    str += '<h1 class="barredLeftFull">COAST</h1>'
    str += '</div>';

    str += '<div class="plain biome coolBorderBis insetShadowCommon">'
    str += '<h1 class="barredLeftFull">PLAINS</h1>'
    str += '</div>';

    str += '</div>';

    str += '<div class="zones coolBorder">';

    str += '<div class="cave zone simpleButton normalSized">';
    str += 'CAVE'
    str += '</div>';

    str += '<div class="dense zone simpleButton normalSized">';
    str += 'DENSE'
    str += '</div>';

    str += '<div class="fortress zone simpleButton normalSized">';
    str += 'FORTRESS'
    str += '</div>';
    
    str += '</div>';

    str += '<div class="explore simpleButton normalSized">';
    str += 'EXPLORE'
    str += '</div>';
    document.querySelector('.dungeonContainer').innerHTML = str;

    // gets the biome chosen by the player and stores it in game.selectedBiome
    generateExploreScreenEvents();
}

function generateExploreScreenEvents() {
    const biomes = document.querySelectorAll('.biome');
    biomes.forEach(biome => {
        biome.addEventListener('click', (event) => {
            const clickedBiome = event.target;
            const biomeName = clickedBiome.classList[0];
    
            biomes.forEach(otherBiome => {
                if (otherBiome !== clickedBiome) {
                    otherBiome.classList.remove('biome__active');
                }
        });
    
        if (clickedBiome.classList.contains('biome__active')) {
            clickedBiome.classList.remove('biome__active');
            game.selectedBiome = null;
        } else {
            clickedBiome.classList.add('biome__active');
            game.selectedBiome = biomeName;
        }
    
        console.log(biomeName);
        return biomeName;
      });
    });

    // gets the zone chosen by the player and stores it in game.selectedZone
    const zones = document.querySelectorAll('.zone');
    zones.forEach(zone => {
        zone.addEventListener('click', (event) => {
            const clickedZone = event.target;
            const zoneName = clickedZone.classList[0];

            console.log(zoneName);
            game.selectedZone = zoneName;
            return zoneName;
        });
    });

    const explore = document.querySelector('.explore');
    explore.addEventListener('click', (e) => {
        game.startDungeon();
    });
}

function generateDungeonEntranceEvents() {
    //ici, pour afficher la rencontre de l'événement en cours
    document.querySelector('#explorationDiv').innerHTML = '<div class="dungeonContainer"></div>';

    let str = '';
    str += '<div class="dungeonDialogue">';
    str += game.currentDungeon.getCurrentEventSet();
    str += '</div>';

    str += '<div class="dungeonButtons">'
    str += '<button class="dungeonButton simpleButton" id="enterDungeon">Enter dungeon</button>';
    str += '<button class="dungeonButton simpleButton" id="exitDungeon">Exit dungeon</button>';
    str += '</div>'

    document.querySelector('.dungeonContainer').innerHTML = str;

    const enter = document.querySelector('#enterDungeon');
    const exit = document.querySelector('#exitDungeon');

    exit.addEventListener('click', e => {
        game.currentDungeon = null;
        drawExploreScreen();
    }); 

    enter.addEventListener('click', e => {
        displayCurrentEventSet();
    });
}

function displayCurrentEventSet() {
    let str = '';
    str += '<div class="dungeonDialogue coolBorder">';
    str += game.currentDungeon.getCurrentEventSet();
    str += '</div>';
    str += '<div class="dungeonButtons">'
    str += '<button class="dungeonButton simpleButton" id="nextButton">Next</button>';
    str += '</div>'

    document.querySelector('.dungeonContainer').innerHTML = str;

    const next = document.querySelector('#nextButton');
    next.addEventListener('click', e => {
        displayCurrentEventEncounter(game.currentDungeon.getCurrentEventEncounter());
    });
}

function displayCurrentEventChoiceQuote() {
    let str = '';
    str += '<div class="dungeonQuote coolBorder">';
    str += game.currentDungeon.getCurrentEventChoiceQuote();
    str += '</div>';

    str += '<div class="dungeonButtons">'
    str += '<button class="dungeonButton simpleButton" id="bridgeButton">Go deeper</button>';
    str += '<button class="dungeonButton simpleButton" id="nextButton">Keep exploring</button>';
    str += '</div>'

    document.querySelector('.dungeonContainer').innerHTML = str;

    document.querySelector('#bridgeButton').addEventListener('click', e => {
        game.currentDungeon.generateEvent(Data.DungeonEventInstance.BRIDGE);
        displayCurrentEventSet();
    });

    const next = document.querySelector('#nextButton');
    next.addEventListener('click', e => {
        game.currentDungeon.generateEvent();
        displayCurrentEventSet();
    });
}

function displayCurrentEventEncounter(event) {
    let str = '';
    str += 'type: ' + event.type + ', mobtype: ' + event.mobType;
    str += '<button class="dungeonButton simpleButton" id="nextButton">Next</button>';

    document.querySelector('.dungeonContainer').innerHTML = str;

    const next = document.querySelector('#nextButton');
    next.addEventListener('click', e => {
        displayCurrentEventChoiceQuote();
    });
}

function drawDungeon() {
    generateDungeonEntranceEvents();
}

function drawBattleScreen() {
    document.querySelector('#battleDiv').innerHTML = '<div class="battleContainer"><div class="battle"></div></div>';

    let str = '';

    str += '<div class="battle-fightersContainer">';
    str += getFormationBattleAllies();
    str += getFormationBattleEnemies();
    str += '</div>';

    str += '<div class="battle-commandsContainer coolBorderBis">';
    str += getBattleCommands();
    str += '</div>';

    str += '<div class="battle-playOrder">';
    str += getBattleScreenPlayOrder();
    str += '</div>'

    document.querySelector('.battle').innerHTML = str;

    generateBattleCommandsEvents();
    generateBattleSkillsEvents();
    generateBattleConsumablesEvents();
    generateBattleFightersEvents();
}

// TODO: MERGE THESE TWO FUNCTIONS BELOW INTO ONE
function getFormationBattleAllies(refresh = false) {
    let str = '';
    if(!refresh) str += '<div id="battle-fighters-allies">';
    const back = game.currentBattle.allies[0];
    const middle = game.currentBattle.allies[1];
    const front = game.currentBattle.allies[2];

    str += getFighterFrame(back, Data.BattleFighterType.HERO, Data.FormationPosition.BACK);
    str += getFighterFrame(middle, Data.BattleFighterType.HERO, Data.FormationPosition.MIDDLE);
    str += getFighterFrame(front, Data.BattleFighterType.HERO, Data.FormationPosition.FRONT);
    str += '</div>';

    if(refresh) {
        document.querySelector('.battle-fighters-allies').innerHTML = str;
        return;
    }
    return str;
}
function getFormationBattleEnemies(refresh = false) {
    let str = '';
    if(!refresh) str += '<div id="battle-fighters-enemies">';
    const back = game.currentBattle.enemies[0];
    const middle = game.currentBattle.enemies[1];
    const front = game.currentBattle.enemies[2];

    str += getFighterFrame(front, Data.BattleFighterType.ENEMY, Data.FormationPosition.FRONT);
    str += getFighterFrame(middle, Data.BattleFighterType.ENEMY, Data.FormationPosition.MIDDLE);
    str += getFighterFrame(back, Data.BattleFighterType.ENEMY, Data.FormationPosition.BACK);
    str += '</div>';

    if(refresh) {
        document.querySelector('.battle-fighters-enemies').innerHTML = str;
        return;
    }
    return str;
}

function getFighterFrame(fighter, type, pos) {
    let str = '';
    pos = pos.toLowerCase();
    type = type.toLowerCase();
    typeMin = type.charAt(0);

    str += '<div id="gw-' + typeMin + '-' + pos + '" class="category" style="display: inline-block"><div class="battlePositionName">' + capitalizeFirstLetter(pos) + '</div>';
    str += '<div id="aw-' + typeMin + '-' + pos + '" class="animationsWrapper"></div>';
    if(fighter) {
        str += '<div id="b-' + type + '-' + pos + '" class="battleFighter" style="background-image: linear-gradient(transparent 0%, rgba(0, 0, 0, 1) 70%), url(\'css/img/chars/' + fighter.charset + '\'); ' + (fighter.health === 0 ? ' filter: grayscale(100%);' : '') + '">';
        str += '<div class="gaugeProgress"><div class="statGauge health" style="width:'+ Math.round((fighter.health*100)/fighter.maxHealth) +'%"><span class="gaugeIndicator">'+ fighter.health + '/' + fighter.maxHealth +'</span></div></div>';
        str += '<div class="gaugeProgress"><div class="statGauge stamina" style="width:'+ Math.round((fighter.stamina*100)/fighter.maxStamina) +'%"><span class="gaugeIndicator">'+ fighter.stamina + '/' + fighter.maxStamina +'</span></div></div>';
        str += '<div class="gaugeProgress"><div class="statGauge mana" style="width:'+ Math.round((fighter.mana*100)/fighter.maxMana) +'%"><span class="gaugeIndicator">'+ fighter.mana + '/' + fighter.maxMana +'</span></div></div>';
        str += '</div>';
    }
    str += '</div>';

    return str;
}

function getBattleCommands(refresh = false) {
    let str = '';

    str += '<div class="battle-actionsContainer">';

    str += '<div class="battle-actionAtk">';
    str += getCurrentPlayerEquippedWeapons();
    str += 'Attack'
    str += '</div>';

    str += '<div class="battle-actionDef">';
    str += 'Block';
    str += '</div>';

    str += '<div class="battle-actionMov">';
    str += 'Move';
    str += '</div>';

    str += '<div class="battle-actionSki">';
    str += 'Skip';
    str += '</div>';

    str += '</div>';

    str += '<div class="battle-skillsContainer">';
    str += getBattleSkills();
    str += '</div>';
    str += '<div class="divider" style="grid-area: divider"></div>';
    str += '<div class="battle-consumablesContainer">';
    str += getBattleConsumables();
    str += '</div>';

    if(refresh) {
        document.querySelector('.battle-commandsContainer').innerHTML = str;
        return;
    }
    return str;
}

function getCurrentPlayerEquippedWeapons() {
    let str = '<div class="battle-weaponIcons">';
    const current = game.currentBattle.currentPlay;

    if(current.eqWeaponBoth) str += '<div id="bwpn-' + current.eqWeaponBoth.id + '" class="battle-weaponIcon singleWeaponIconPopup" style="background-image: url(\'css/img/weapons/' + current.eqWeaponBoth.icon + '.png\')"></div>';
    else {
        if(current.eqWeaponRight) str += '<div id="bwpn-' + current.eqWeaponRight.id + '"  id="" class="battle-weaponIcon ' + (current.eqWeaponRight && current.eqWeaponLeft ? 'doubleWeaponIconPopup' : 'singleWeaponIconPopup') + '" style="background-image: url(\'css/img/weapons/' + current.eqWeaponRight.icon + '.png\')"></div>';
        if(current.eqWeaponLeft) str += '<div id="bwpn-' + current.eqWeaponLeft.id + '"  id="" class="battle-weaponIcon ' + (current.eqWeaponLeft && current.eqWeaponRight ? 'doubleWeaponIconPopup' : 'singleWeaponIconPopup') + '" style="background-image: url(\'css/img/weapons/' + current.eqWeaponLeft.icon + '.png\')"></div>';
    }

    str += '</div>';

    return str;
}

function getBattleSkills(refresh = false) {
    let str = '';

    const currentPlay = game.currentBattle.currentPlay;
    currentPlay.skills.forEach(skill => {
        str += '<div id="' + currentPlay.name + '-' + skill.id + '" class="skillSquare treeNode coolBorder" style="background-image: url(\'css/img/skills/' + currentPlay.name + skill.icon + '.png\')"></div>';
    })

    if(refresh) {
        document.querySelector('.battle-skillsContainer').innerHTML = str;
        return;
    }
    return str;
}

function getBattleConsumables(refresh = false) {
    let str = '';

    if(refresh) {
        document.querySelector('.battle-consumablesContainer').innerHTML = str;
        return;
    }
    return str;
}

function generateBattleCommandsEvents() {
    const battle = game.currentBattle;
    const current = battle.currentPlay;
    const atk = document.querySelector('.battle-actionAtk');
    const def = document.querySelector('.battle-actionDef');
    const mov = document.querySelector('.battle-actionMov');
    const ski = document.querySelector('.battle-actionSki');

    const wpns = document.querySelectorAll('.battle-weaponIcon');
    wpns.forEach(wpn => {
        wpn.addEventListener('click', e => {
            const weapon = getEquippedWeaponById(current, Number(wpn.id.substring(5)));
            if(battle.action != Data.BattleAction.ATTACK) {
                battleCommandsCancelCurrent();
                battle.action = Data.BattleAction.ATTACK;
                battle.selectedWeapon = weapon;
                console.log('Preparing attack with ' + battle.selectedWeapon.name);
                atk.classList.add('battle-actionSelected');
                wpn.classList.add('battle-weaponSelected');
                battleAttackPickTarget();
            } else if (battle.action === Data.BattleAction.ATTACK && battle.selectedWeapon !== weapon) {
                battleSelectionRemoveHighlights();
                document.querySelectorAll('.battle-weaponIcon').forEach(wpn => {wpn.classList.remove('battle-weaponSelected');})
                battle.selectedWeapon = weapon;
                wpn.classList.add('battle-weaponSelected');
                console.log('Preparing attack with ' + battle.selectedWeapon.name);
                battleAttackPickTarget();
            }
            else battleCommandsCancelCurrent();
        })
    })

    atk.addEventListener('click', e => {
        
    });
    def.addEventListener('click', e => {
        console.log('blocking');
    });
    mov.addEventListener('click', e => {
        console.log('moving');
    });
    ski.addEventListener('click', e => {
        console.log('skipping');
        battle.endTurn();
    });
}

function battleAttackPickTarget() {
    const battle = game.currentBattle;
    const front = document.querySelector('#b-enemy-front');
    const middle = document.querySelector('#b-enemy-middle');
    const back = document.querySelector('#b-enemy-back');

    // HIGHLIGHTING TARGETS
    battle.selectedWeapon.range[0] ? front.classList.add('battle-target') : front.classList.remove('battle-target');
    battle.selectedWeapon.range[1] ? middle.classList.add('battle-target') : middle.classList.remove('battle-target');
    battle.selectedWeapon.range[2] ? back.classList.add('battle-target') : back.classList.remove('battle-target');

    front.addEventListener('click', e => {
        if(battle.selectedWeapon.range[0]) {
            battle.target.push(battle.enemies[2]);
            console.log('Attacking: ' + battle.enemies[2].name);
            battle.executeAttack();
        }
    });
    middle.addEventListener('click', e => {
        if(battle.selectedWeapon.range[1]) {
            battle.target.push(battle.enemies[1]);
            console.log('Attacking: ' + battle.enemies[1].name);
            battle.executeAttack();
        }
    });
    back.addEventListener('click', e => {
        if(battle.selectedWeapon.range[2]) {
            battle.target.push(battle.enemies[0]);
            console.log('Attacking: ' + battle.enemies[0].name);
            battle.executeAttack();
        }
    });
}

function generateBattleSkillsEvents() {
    const battle = game.currentBattle;
    const current = battle.currentPlay;
    const skills = current.skills;
    skills.forEach(skill => {
        addTooltip(document.querySelector('#' + current.name + '-' + skill.id), function(){
            return getBattleSkillTooltip(current, skill)
        }, {offY: -8})
    });
}

function generateBattleConsumablesEvents() {

}

function battleCommandsCancelCurrent() {
    const battle = game.currentBattle;
    const current = battle.currentPlay;

    switch(battle.action) {
        case Data.BattleAction.ATTACK:
            battle.action = null;
            battle.selectedWeapon = null;
            battleSelectionRemoveHighlights();
            document.querySelector('.battle-actionAtk').classList.remove('battle-actionSelected');
            document.querySelectorAll('.battle-weaponIcon').forEach(wpn => {wpn.classList.remove('battle-weaponSelected');})
            console.log('Cancelled: Attack');
            break;
    }
}

function battleSelectionRemoveHighlights() {
    document.querySelector('#b-enemy-front').classList.remove('battle-target');
    document.querySelector('#b-enemy-middle').classList.remove('battle-target');
    document.querySelector('#b-enemy-back').classList.remove('battle-target');
}

function generateBattleFightersEvents() {
    document.querySelectorAll('.battleFighter').forEach(fighter => {
        fighter.addEventListener('mouseenter', e => {
            const target = getFighterFromPosition(fighter.id);
            document.querySelector('.battle-consumablesContainer').innerHTML = getBattleFighterStats(target);
            document.querySelector('.battle-skillsContainer').innerHTML = getBattleFighterDetails(target);
        });
        fighter.addEventListener('mouseleave', e => {
            getBattleSkills(true);
            getBattleConsumables(true);
            generateBattleSkillsEvents();
            generateBattleConsumablesEvents();
        });
    });
}

function getBattleSkillTooltip(strider, skill) {
    let str = '';
    str += '<div class="nodeContainer">'

    str += '<div class="nodeContainerBanner">';
    str += '<div class="vignette coolBorder" style="background-image: url(\'css/img/skills/' + strider.name + skill.icon + '.png\')"></div>';
    str += '<div class="desc"><h4>' + skill.name + '</h4>';
    str += '<div class="treeNodeTags">';
    str += '<div class="treeNodeType ' + getColorClassFromSkillType(skill.type) + '">' + capitalizeFirstLetter(skill.type) + '</div>';
    str += '<div class="treeNodeType ' + getColorClassFromDmgType(skill.dmgType) + '">' + capitalizeFirstLetter(skill.dmgType) + '</div>';
    str += '</div>'
    str += '</div>'
    str += '</div>';

    str += '<div class="divider"></div>';

    str += '<div class="skillStatsWrapper">';
    str += '<div class="skillStatsDisplay"><div class="skillStatsDisplay-num">' + skill.dmgMultiplier + '%</div><div class="skillStatsDisplay-str">Damage</div></div>';
    str += '<div class="skillStatsDisplay"><div class="skillStatsDisplay-num">' + skill.criMultiplier + '%</div><div class="skillStatsDisplay-str">Critical</div></div>';
    str += '<div class="skillStatsDisplay"><div class="skillStatsDisplay-num">' + skill.accMultiplier + '%</div><div class="skillStatsDisplay-str">Accuracy</div></div>';
    str += '</div>';

    str += '<div class="divider"></div>';

    if(skill.effectsCaster) {
        str += '<div class="rewardsWrapper">';
        str += '<div class="par">Caster:</div>'
        skill.getCurrentEffectsCaster().regular.forEach(single => {
            str += single.getFormatted({cssClass: "bulleted", defaultColor: true, skillFormat: true});
        });
        str += '</div>';
    }
    if(skill.effectsAllies) {
        str += '<div class="rewardsWrapper">';
        str += '<div class="par">Allies:</div>'
        skill.getCurrentEffectsAllies().regular.forEach(single => {
            str += single.getFormatted({cssClass: "bulleted", defaultColor: true, skillFormat: true});
        });
        str += '</div>';
    }
    if(skill.effectsEnemies) {
        str += '<div class="rewardsWrapper">';
        str += '<div class="par">Enemies:</div>'
        skill.getCurrentEffectsEnemies().regular.forEach(single => {
            str += single.getFormatted({cssClass: "bulleted", defaultColor: true, skillFormat: true});
        });
        str += '</div>';
    }

    str += '<div class="divider"></div>';
    
    str += '<div class="skillRangeDisplay">';

    str += '<div class="skillRangeDisplay-launch">';
    str += '<div class="skillRangeDisplay-launch-pos">' + getRangeString(skill.launchPos) + '</div>';
    str += '<div class="skillRangeDisplay-launch-str">Launch</div>';
    str += '</div>';

    str += '<div class="skillRangeDisplay-ally">'
    str += '<div class="skillRangeDisplay-ally-pos">' + getTargetString(skill.targets.allies) + '</div>';
    str += '<div class="skillRangeDisplay-ally-str">Allies</div>';
    str += '</div>';

    str += '<div class="skillRangeDisplay-enemy">'
    str += '<div class="skillRangeDisplay-enemy-pos">' + getTargetString(skill.targets.enemies) + '</div>';
    str += '<div class="skillRangeDisplay-enemy-str">Enemies</div>';
    str += '</div>';

    str += '<div class="divider"></div>';
    str += '<div class="nodeDesc skillDesc"><div class="par" style="color: #ccc">' + processSkillDescription(skill.desc) + '</div></div>';
    str += '</div>';
    str += '<div class="divider"></div>';
    
    str += '<div class="skillBottom" style="margin-top: 0.7rem">';
    str += '<div class="skillLevel"><span style="font-family: RobotoBold">' + skill.cooldown + '</span> <span style="color: grey">Cooldown</span></div>';
    str += '<div class="skillStackable"><span style="font-family: RobotoBold">' + skill.stackable + '</span> <span style="color: grey">Stackable</span></div>';
    str += '<div class="skillCost"><span style="font-family: RobotoBold">' + skill.manaCost + '</span> <span style="color: grey">Mana</span></div>'
    str += '</div>';


    str += '</div>';

    return str;
}

function getBattleScreenPlayOrder(refresh = false) {
    let str = '';
    game.currentBattle.order.forEach(elem => {
        if(elem) {
            str += '<div class="playOrderSquare coolBorder" style="background-image: url(\'css/img/chars/' + elem.charset + '\')"></div>';
        }
    });

    if(refresh) {
        document.querySelector('.battle-playOrder').innerHTML = str;
        return;
    }
    return str;
}

function getBattleFighterDetails(fighter) {
    let str = '';

    str += '<div class="battle-fighterDetails">';
    str += '<div class="battle-fighterDetails-infos">';
    str += '<h4>' + fighter.name + '</h4>';
    str += '<div class="battle-fighterDetails-tags">';
    str += '<div class="striderInfos-desc-type coolBorder">' + (fighter instanceof Strider ? capitalizeFirstLetter(fighter.striderType) : 'Monster') + '</div>';
    if(fighter instanceof Strider) str += '<div class="striderInfos-desc-level coolBorder">Level ' + fighter.level.currentLevel + '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';

    return str;
}

function getBattleFighterStats(fighter) {
    let str = '';

    str += '<table class="battle-fighterStats">';
    str += '<tbody>';
    str += '<tr>';
    str += '<td><span style="font-family: RobotoBold">' + fighter.dodge + '%</span> <span style="color: grey">Dodge</span></td>';
    str += '<td><span style="font-family: RobotoBold">' + fighter.resBleed[0] + '</span> <span style="color: grey">Bleed resistance</span></td>';
    str += '</tr>';
    str += '<tr>';
    str += '<td><span style="font-family: RobotoBold">' + fighter.speed + '</span> <span style="color: grey">Speed</span></td>';
    str += '<td><span style="font-family: RobotoBold">' + fighter.resPoison[0] + '</span> <span style="color: grey">Poison resistance</span></td>';
    str += '</tr>';
    str += '<tr>';
    str += '<td><span style="font-family: RobotoBold">' + fighter.protection + '%</span> <span style="color: grey">Protection</span></td>';
    str += '<td><span style="font-family: RobotoBold">' + fighter.resMove + '%</span> <span style="color: grey">Movement resistance</span></td>';
    str += '</tr>';
    str += '<tr>';
    str += '<td><span style="font-family: RobotoBold">' + fighter.accuracy + '%</span> <span style="color: grey">Accuracy</span></td>';
    str += '<td><span style="font-family: RobotoBold">' + fighter.resStun + '%</span> <span style="color: grey">Stun resistance</span></td>';
    str += '</tr>';
    str += '<tr>';
    str += '<td><span style="font-family: RobotoBold">' + fighter.might + '</span> <span style="color: grey">Might</span></td>';
    str += '<td><span style="font-family: RobotoBold">' + fighter.resilience + '</span> <span style="color: grey">Resilience</span></td>';
    str += '</tr>';
    str += '<tr>';
    str += '<td><span style="font-family: RobotoBold">' + fighter.spirit + '</span> <span style="color: grey">Spirit</span></td>';
    str += '<td><span style="font-family: RobotoBold">' + fighter.warding + '</span> <span style="color: grey">Warding</span></td>';
    str += '</tr>';
    str += '</tbody></table>';

    str += '<div class="battle-activeEffects framed">';
    str += getBattleFighterActiveEffects(fighter);
    str += '</div>'

    return str;
}

function getBattleFighterActiveEffects(fighter) {
    let str = '';

    if(fighter.activeEffects.length === 0) return '<h4>No active effects</h4>';

    str += '<h4>Active effects</h4>'
    fighter.activeEffects.forEach(ae => {
        str += '<div class="activeEffect-wrapper">';
        str += '<p class="activeEffectTitle" style="color: ' + (ae.style.color ? ae.style.color : '#ddd') + '; font-family: ' + getFontFamilyFromAeStyling(ae.style) + ';">' + ae.name + '</p>';
        ae.effects.forEach(eff => {
            str += eff.getFormatted({noTheorical: true, cssClass: 'activeEffect'});
        });
        if(ae.originObject instanceof Skill) str += '<p class="activeEffect">From: ' + ae.originObject.name + ', casted by ' + ae.originUser.name + ' (' + ae.countdown + (ae.countdown > 1 ? ' rounds' : ' round') + 'ago)</p>';
        else if(ae.originObject instanceof Weapon) str += '<p class="activeEffect">From: <span style="color: ' + getRarityColorCode(ae.originObject.rarity) + ';">' + ae.originObject.name + '</span>, wielded by ' + ae.originUser.name + ' (' + ae.countdown + (ae.countdown > 1 ? ' rounds' : ' round') + ' ago)' + '</p>';
        else if(ae.originObject === Data.ActiveEffectType.POWER) str += '<p class="activeEffect">Power emanating from ' + ae.originUser.name + '</p>';
        str += '</div>';
    });

    return str;
}
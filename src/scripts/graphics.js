/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

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
    else if(item instanceof Sigil) tooltip.innerHTML = base + getSigilTooltip(item, null) + '</div>';
    else if(item instanceof Resource) tooltip.innerHTML = base + getResourceTooltip(item, null) + '</div>';
    else if(item instanceof Trinket) tooltip.innerHTML = base + getTrinketTooltip(item, null, true) + '</div>';
    else if(item instanceof EquipmentSet) tooltip.innerHTML = base + getSetTooltip(item) + '</div>';
    else if(item instanceof Consumable) tooltip.innerHTML = base + getConsumableTooltip(item) + '</div>';
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
        Sounds.Methods.playSound(Data.SoundType.TOOLTIP_CLOSE);
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

    if(trinket.sockets.length > 0) {
        str += '<div class="divider"></div>';
        trinket.sockets.forEach(sigil => {
            str += getSigilDetails(sigil, full);
        });
    }
    if(trinket.sockets_free > 0) {
        str += '<div class="divider"></div>';
        for(let i = 0; i < trinket.sockets_free; i++) {
            str += getEmptySigilHTML();
        }
    }

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
    str += '</div>';
    str += '<div class="fancyText barred infoTitle" style="color: ' + getRarityColorCode(resource.rarity) + '">' + resource.name + '</div>';
    str += '<div class="fancyText barred">' + capitalizeFirstLetter(resource.rarity) + '</div>';
    str += '<div class="infoDesc">';
    str += '<div class="par"></div>';

    if(resource instanceof AlchemicalIngredient) {
        str += '<div class="alchemicalProps">';
        str += '<div class="alchemicalPropsTitle">Alchemical properties</div>';

        str += '<br>';

        str += '<div class="alchemicalPropsItem">';
        str += '<div class="alchemicalPropsType"><span class="alchtype">Passive</span><span class="alchtoxi">' + resource.passive.toxicity + ' Toxicity</span></div>';
        str += resource.passive.effect.getFormatted({cssClass: 'alchemicalPropsEff', noTheorical: true});
        str += '</div>';

        str += '<div class="alchemicalPropsItem">';
        str += '<div class="alchemicalPropsType"><span class="alchtype">Recovery</span><span class="alchtoxi">' + resource.recovery.toxicity + ' Toxicity</span></div>';
        str += resource.recovery.effect.getFormatted({cssClass: 'alchemicalPropsEff', noTheorical: true});
        str += '</div>';
        
        str += '<div class="alchemicalPropsItem">';
        str += '<div class="alchemicalPropsType"><span class="alchtype">Special</span><span class="alchtoxi">' + resource.special.toxicity + ' Toxicity</span></div>';
        str += resource.special.effect.getFormatted({cssClass: 'alchemicalPropsEff', noTheorical: true});
        str += '</div>';

        str += '</div>';
        str += '<div class="divider"></div>';
    }

    str += '<div class="par tooltipDesc">' + resource.desc + '</div>';
    str += '</div></div>';

    game.particlesTooltipCanvasItem = resource;
    return str;
}

function getConsumableTooltip(consumable) {
    let str = '';

    str += '<div class="consumableTooltip">';
    str += '<div class="consumableTooltipHeader">';
    str += '<div id="iconcloud-' + consumable.id + '"class="iconcloud' + capitalizeFirstLetter(consumable.rarity) + ' roundIconcloud' + capitalizeFirstLetter(consumable.rarity) + '"><div id="res-icon-' + consumable.id + '" class="tooltipIcon roundCloudIcon" style="' + getIcon(consumable) + '"></div></div>';
    str += '<div class="consumableTitles">';
    str += '<div class="consumableName">' + consumable.name + '</div>';
    str += '<div class="treeNodeType treeNodeType-' + consumable.rarity + '">' + capitalizeFirstLetter(consumable.rarity) + '</div>';
    str += '</div></div>';
    
    str += '<div class="consumableEffects">';
    consumable.effects.forEach(eff => {
        str += eff.getFormatted({cssClass: "itemEffect consumableEffect", noTheorical: true, defaultColor: true});
    });
    str += '</div>';
    
    str += '<div class="consumableToxicityIndicator">' + consumable.toxicity + ' <span style="opacity: 0.8;">Toxicity</span></div>';
    str += '</div></div>';

    game.particlesTooltipCanvasItem = consumable;
    return str;
}

function getSigilTooltip(sigil) {
    let str = '';
    str += '<div class="consumableTooltip">';
    str += '<div class="consumableTooltipHeader">';
    str += '<div id="iconcloud-' + sigil.id + '"class="iconcloud' + capitalizeFirstLetter(sigil.rarity) + ' roundIconcloud' + capitalizeFirstLetter(sigil.rarity) + '"><div id="res-icon-' + sigil.id + '" class="tooltipIcon roundCloudIcon" style="' + getIcon(sigil) + '"></div></div>';
    str += '<div class="consumableTitles">';
    str += '<div class="consumableName">' + sigil.name + '</div>';
    str += '<div class="treeNodeType treeNodeType-' + sigil.rarity + '">' + capitalizeFirstLetter(sigil.rarity) + '</div>';
    str += '</div></div>';
    
    str += '<div class="consumableEffects">';
    sigil.effects.forEach(effect => {
            str += effect.getFormatted({cssClass: "itemEffect consumableEffect", noTheorical: isEffectUnvaluable(effect.effect)});
    });
    if(sigil.isCritical) {
        sigil.critical.forEach(effect => {
            str += effect.getFormatted({cssClass: "itemEffect consumableEffect", noTheorical: isEffectUnvaluable(effect.effect), color: Data.Color.CRITICAL_EFF, bold: true});
        });
    }
    if(sigil.isCorrupt) {
        sigil.corrupt.forEach(effect => {
            str += effect.getFormatted({cssClass: "itemEffect consumableEffect", noTheorical: isEffectUnvaluable(effect.effect), color: Data.Color.CORRUPT, bold: true});
        });
    }
    sigil.echoes.forEach(echo => {
        str += '<div class="sigilCorruption">';
        str += '<p class="name">' + echo.name +'</p>';
        str += '<p>' + echo.desc +'</p>'
        str += '<br>';
        str += '<p class="echoQuote">' + echo.quote +'</p>'
        str += '</div>';
    });
    str += '</div>';

    if(sigil.soulmarks.some(el => el !== null)) {
        str += '<div class="sigilSoulmarksIndicator">';
        sigil.soulmarks.forEach(slmrk => {
            if(slmrk) str += '<div class="sigilSoulmarkTooltip' + (slmrk.critical ? ' critSigilTooltip' : slmrk.corrupt ? ' corrSigilTooltip' : '') + '"><span>' + slmrk.name.slice(0, 3) + '</span></div>';
        });
        str += '</div>';
    }
    str += '</div></div>';

    game.particlesTooltipCanvasItem = sigil;
    return str;
}

/**
 * Gets the HTML code that contains the provided Weapon's data
 * @param {Weapon} weapon the Weapon data to fill the tooltip with
 * @param {*} asResult should tooltip be converted to a recipe result display?
 * @param {*} full display all of the infos (sigils details, echoes details)
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
    weapon.sockets.forEach(sigil => {
        str += getSigilDetails(sigil, full);
    })
    // empty sigils
    for(let i = 0; i < weapon.sockets_free; i++) {
        str += getEmptySigilHTML();
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
    armor.sockets.forEach(sigil => {
        str += getSigilDetails(sigil, full);
    })
    // empty sigils
    for(let i = 0; i < armor.sockets_free; i++) {
        str += getEmptySigilHTML();
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
    let str = '<div class="sigilInfo" style="' + getIcon(item, 25, true) + '">';
    str += '<div class="sigilInfo-infos">';
    str += '<div class="sigilTitle" style="text-align: left">' + getSmallThingNoIcon(item, null) + '</div>';
    str += '</div></div>';

    return str;
}

function getEmptySigilHTML(soulbindingFormat = false, soulbindingId = null) {
    let str = '<div ' + (soulbindingId ? 'id="sbs-' + soulbindingId + '" ' : '') + 'class="sigilInfo sigilInfoEmpty' + (soulbindingFormat ? ' soulbindingSigilInfo' : '') + '"' + (soulbindingFormat ? ' ondragover="allowDrop(event)" ondrop="game.soulbinding.preslotSigil(event, ' + (soulbindingId ? '\'sbs-' + soulbindingId + '\'' : 0) + ')"' : '') + '>';
    str += '<div class="sigilInfo-infos">'
    str += '<div class="sigilTitle">Empty sigil slot</div>';
    str += '</div></div>'
    return str;
}

function getEmptyEchoHTML(soulbindingFormat = false) {
    let str = '<div class="sigilInfo sigilInfoEmpty' + (soulbindingFormat ? ' soulbindingSigilInfo' : '') + '">'
    str += '<div class="sigilInfo-infos">'
    str += '<div class="sigilTitle">Empty echo slot</div>';
    str += '</div></div>'
    return str;
}

function getSigilDetails(sigil, full = false, soulbindingFormat = false) {
    let str = '<div class="sigilInfo' + (soulbindingFormat ? ' soulbindingSigilInfo' : '') + '" style="background-image: url(css/img/sigils/' + sigil.icon + '.png)">';
    str += '<div class="sigilInfo-infos">'
    str += '<div class="sigilTitle">' + getSmallThingNoIcon(sigil, null) + '</div>';
    if(full || soulbindingFormat) {
        sigil.effects.forEach(effect => {
            //str += '<div class="sigilEffect" style="' + (soulbindingFormat ? 'display: none;' : '') + '">' + (effect.value > 0 ? '+ ' : effect.value < 0 ? '- ' : '') + (effect.value == 0 ? '' : Math.abs(effect.value)) + (effect.isPercentage ? '%' : '') + ' ' + capitalizeFirstLetter(effect.effect) + '<span class="theoricalval">[' + effect.theorical[0] + '-' + effect.theorical[1] + ']</span>' + '</div>';
            str += effect.getFormatted({cssClass: 'sigilEffect', hidden: soulbindingFormat});
        });
        if(sigil.isCritical) {
            sigil.critical.forEach(effect => {
                //str += '<div class="sigilEffect"' + ' style=' + (soulbindingFormat ? 'display: none; ' : '') + '"font-family:\'RobotoBold\'; color:'+ Data.Color.CRITICAL_EFF +';"' + '><span style="font-family:Roboto">' + (effect.value > 0 ? '+ ' : effect.value < 0 ? '- ' : '') + '</span>' + (effect.value == 0 ? '' : Math.abs(effect.value)) + (effect.isPercentage ? '%' : '') + ' ' + capitalizeFirstLetter(effect.effect) + '<span class="theoricalval">[' + effect.theorical[0] + '-' + effect.theorical[1] + ']</span>' + '</div>';
                str += effect.getFormatted({cssClass: 'sigilEffect', hidden: soulbindingFormat, color: Data.Color.CRITICAL_EFF, bold: true});
            });
        }
        if(sigil.isCorrupt) {
            sigil.corrupt.forEach(effect => {
                //str += '<div class="sigilEffect"' + ' style="' + (soulbindingFormat ? 'display: none; ' : '') + 'font-weight:bold; color:'+ Data.Color.CORRUPT +';"' + '><span style="font-weight:normal">' + (effect.value > 0 ? '+ ' : effect.value < 0 ? '- ' : '') + '</span>' + (effect.value == 0 ? '' : Math.abs(effect.value)) + (effect.isPercentage ? '%' : '') + ' ' + capitalizeFirstLetter(effect.effect) + '<span class="theoricalval">[' + effect.theorical[0] + '-' + effect.theorical[1] + ']</span>' + '</div>';
                str += effect.getFormatted({cssClass: 'sigilEffect', hidden: soulbindingFormat, color: Data.Color.CORRUPT, bold: true});
            });
        }
    }
    sigil.echoes.forEach(echo => {
        str += '<div class="sigilCorruption">';
        str += '<p class="name">' + echo.name +'</p>';
        if(full || soulbindingFormat) str += '<p style="' + (soulbindingFormat ? 'display: none; ' : '') + '">' + echo.desc +'</p>';
        str += '</div>';
    })
    str += '</div></div>';

    return str;
}

/**
 * @param {Echo} echo the Echo to get the data from
 */
function getEchoDetails(echo, full = false, soulbindingFormat = false) {
    let str = '<div class="echoInfo' + (soulbindingFormat ? ' soulbindingSigilInfo' : '') + '" style="border: 1px solid '+ hexToRGBA(getRarityColorCode(echo.rarity), 0.5) +'">'
    str += '<div class="echoTitle" style="color: ' + getRarityColorCode(echo.rarity) + '">' + echo.name + '</div>';
    if(full || soulbindingFormat) {
        str += '<div class="echoEffects" style="' + (soulbindingFormat ? 'display: none;' : '') + '">'
        echo.stats.forEach(effect => {
            str += effect.getFormatted({cssClass: "echoEffect"});
        });
        str += '</div>'
        if(soulbindingFormat) str += '<div class="brContainer" style="display: none;"><br></div>';
        else str += '<br>';
        str += '<div class="echoDesc" style="' + (soulbindingFormat ? 'display: none;' : '') + '">' + echo.desc + '</div>'
        if(soulbindingFormat) str += '<div class="brContainer" style="display: none;"><br></div>';
        else str += '<br>';
        str += '<div class="echoQuote" style="' + (soulbindingFormat ? 'display: none;' : '') + '">' + echo.quote + '</div>';
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
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
            spawnTooltip(me);
            if(me.set) {
                let tooltipDesc = domWhat('floating-' + me.id).querySelector('.tooltipSetText');
                tooltipDesc.addEventListener('click', (e) => {
                    Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
                    spawnTooltip(what(game.all_equipmentSets, me.set), me.id);
                });
            }
        });
        // Play sound on hover
        domWhat('res-' + me.id).addEventListener('mouseover', function(){
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
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

function drawSigilInventory(sigils) {
    let str = '';
    for(let i = 0; i < sigils.length; i++) {
        let me = sigils[i];
        str += '<div id="res-' + me.id + '" class="inventoryItem" style="' + getIcon(me) + '; border: 2px solid ' + getRarityColorCode(me.rarity) +'" draggable="true">';
        str += '</div>';
    }
    domWhat('res-cat-sigils').innerHTML = str;
    for(let i = 0; i < sigils.length; i++) {
        let me = sigils[i];
        // Add tooltip
        addTooltip(domWhat('res-' + me.id), function(){
            return getSigilTooltip(game.inventory.getItemFromId(Data.ItemType.SIGIL, me.id));
        }, {offY: -8});
        // Spawn tooltip and play sound on click
        domWhat('res-' + me.id).addEventListener('click', function(){
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
            spawnTooltip(me);
        });
        // Play sound on hover
        domWhat('res-' + me.id).addEventListener('mouseover', function(){
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
        });
        // Draggable events
        document.querySelector('#res-' + me.id).addEventListener("dragstart", e => {
            e.dataTransfer.setData("sigil", me.id);
            //console.log(e.dataTransfer.getData("weapon"));
        })
    }
    document.querySelector('#res-sigils').addEventListener('click', (e) => {
        document.querySelector('#res-cat-sigils').classList.toggle('hide');
    });
}

function drawResourceInventory(resources = game.inventory.resources) {
    let str = '';
    for(let i = 0; i < resources.length; i++) {
        if(resources[i].amount > 0) {
            let me = resources[i];
            str += '<div id="res-' + me.id + '" class="inventoryItem" style="' + getIcon(me) + '; border: 2px solid ' + getRarityColorCode(me.rarity) +'"' + (me instanceof AlchemicalIngredient ? 'draggable="true"' : '') + '>';
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
                Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
                spawnTooltip(me);
            });
            // Play sound on hover
            domWhat('res-' + me.id).addEventListener('mouseover', function(){
                Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
            });
            document.querySelector('#res-' + me.id).addEventListener('dragstart', e => {
                e.dataTransfer.setData('ingredient', me.id);
            })
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
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
            spawnTooltip(me);
            if(me.set) {
                let tooltipDesc = domWhat('floating-' + me.id).querySelector('.tooltipSetText');
                tooltipDesc.addEventListener('click', (e) => {
                    Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
                    spawnTooltip(what(game.all_equipmentSets, me.set), me.id);
                });
            }
        });
        // Play sound on hover
        domWhat('res-' + me.id).addEventListener('mouseover', function(){
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
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
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
            spawnTooltip(me);
            if(me.set) {
                let tooltipDesc = domWhat('floating-' + me.id).querySelector('.tooltipSetText');
                tooltipDesc.addEventListener('click', (e) => {
                    Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
                    spawnTooltip(what(game.all_equipmentSets, me.set), me.id);
                });
            }
        });
        // Play sound on hover
        domWhat('res-' + me.id).addEventListener('mouseover', function(){
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
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

function drawConsumablesInventory(consumables = game.inventory.consumables) {
    let str = '';
    for(let i = 0; i < consumables.length; i++) {
        let me = consumables[i];
        str += '<div id="res-' + me.id + '" class="inventoryItem" style="' + getIcon(me) + '; border: 2px solid ' + getRarityColorCode(me.rarity) +'">';
        str += '</div>';
    }
    domWhat('res-cat-consumables').innerHTML = str;
    for(let i = 0; i < consumables.length; i++) {
        let me = consumables[i];
        addTooltip(domWhat('res-' + me.id), function(){
            return getConsumableTooltip(game.inventory.getItemFromId(Data.ItemType.CONSUMABLE, me.id));
        }, {offY: -8});
        // Spawn tooltip and play sound on click
        domWhat('res-' + me.id).addEventListener('click', function(){
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
            spawnTooltip(me);
        });
        // Play sound on hover
        domWhat('res-' + me.id).addEventListener('mouseover', function(){
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
        });
    }
    document.querySelector('#res-consumables').addEventListener('click', (e) => {
        document.querySelector('#res-cat-consumables').classList.toggle('hide');
    });
}

function drawInventory() {
    drawCommandersProfile();
    drawWeaponInventory(game.inventory.weapons);
    drawArmorInventory(game.inventory.armors);
    drawSigilInventory(game.inventory.sigils);
    drawResourceInventory(game.inventory.resources);
    drawTrinketInventory(game.inventory.trinkets);
    drawConsumablesInventory(game.inventory.consumables);
}

function drawCommandersProfile() {
    let str = ''

    str += '<div class="commanderDesc">';

    str += '<div class="commanderDesc-titles">'
    str += '<p>COMMANDER\'S OVERVIEW</p>';
    str += '<p>Time-lost champion</p>';
    str += '</div>';

    str += '<div class="commanderDesc-level">';
    str += '<p>5</p>';
    str += '</div>';
    
    str += '</div>';

    str += '<div class="commanderXpBar">';
    str += '<div class="commanderXpBar-fill"></div>'
    str += '</div>';

    str += '<div class="commanderCurrencies">'
    str += '<div class="soulsAmount">';
    str += '<div class="soulIcon">';
    str += '</div>';
    str += '<p>';
    str += getPlayerSoulsAmount();
    str += '</p>';
    str += '</div>';

    str += '<div class="goldAmount">';
    str += '<div class="goldIcon">';
    str += '</div>';
    str += '<p>';
    str += getPlayerGoldAmount();
    str += '</p>';
    str += '</div>';
    str += '</div>';

    document.querySelector('.commanderSheet').innerHTML = str;
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
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
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
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Health regen.</span><span class="statValue">' + strider.regenHealth + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Mana regen.</span><span class="statValue">' + strider.regenMana + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Stamina regen.</span><span class="statValue">' + strider.regenStamina + '%</span>' + '</div>';
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
    str += '<div class="spacer"></div>'
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Stun chance</span><span class="statValue">' + strider.modifChanceStun + '%</span>' + '</div>';
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Movement chance</span><span class="statValue">' + strider.modifChanceMove + '%</span>' + '</div>';
    str += '<div class="spacer"></div>'
    str += '<div class="striderStats-stat">' + '<span class="statTitle">Toxicity</span><span class="statValue">' + strider.toxicity + '/' + strider.maxToxicity + '</span>' + '</div>';
    str += '</div>';
    str += '</div>';

    str += '<div class="striderEquipment">';
    str += '<div class="striderEquipmentSlots">';
    str += '<div id="strider-helmet" class="sigilInfo sigilInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \'' + strider.name + '\').equipArmor(event);" style="' + getIcon(strider.eqHelmet, 25, true) + '">';
    str += '<div class="sigilInfo-infos"><div class="sigilTitle" style="text-align: left;">' + (strider.eqHelmet ? getSmallThingNoIcon(strider.eqHelmet) : 'No helmet') + '</div>';
    str += '</div></div>';
    str += '<div id="strider-chestplate" class="sigilInfo sigilInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \'' + strider.name + '\').equipArmor(event);" style="' + getIcon(strider.eqChestplate, 25, true) + '">';
    str += '<div class="sigilInfo-infos"><div class="sigilTitle" style="text-align: left;">' + (strider.eqChestplate ? getSmallThingNoIcon(strider.eqChestplate) : 'No chestplate') + '</div>';
    str += '</div></div>';
    str += '<div id="strider-gloves" class="sigilInfo sigilInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \'' + strider.name + '\').equipArmor(event);" style="' + getIcon(strider.eqGloves, 25, true) + '">';
    str += '<div class="sigilInfo-infos"><div class="sigilTitle" style="text-align: left;">' + (strider.eqGloves ? getSmallThingNoIcon(strider.eqGloves) : 'No gloves') + '</div>';
    str += '</div></div>';
    str += '<div id="strider-boots" class="sigilInfo sigilInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \'' + strider.name + '\').equipArmor(event);" style="' + getIcon(strider.eqBoots, 25, true) + '">';
    str += '<div class="sigilInfo-infos"><div class="sigilTitle" style="text-align: left;">' + (strider.eqBoots ? getSmallThingNoIcon(strider.eqBoots) : 'No boots') + '</div>';
    str += '</div></div>';
    str += '<div id="strider-shield" class="sigilInfo sigilInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \'' + strider.name + '\').equipArmor(event);" style="' + getIcon(strider.eqShield, 25, true) + '">';
    str += '<div class="sigilInfo-infos"><div class="sigilTitle" style="text-align: left;">' + (strider.eqShield ? getSmallThingNoIcon(strider.eqShield) : 'No shield') + '</div>';
    str += '</div></div>';
    str += '<div id="strider-trinket1" class="sigilInfo sigilInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \''+ strider.name +'\').equipTrinket(event);" style="' + getIcon(strider.trinkets[0], 25, true) + '">';
    str += '<div class="sigilInfo-infos"><div class="sigilTitle" style="text-align: left;">' + (strider.trinkets[0] ? getSmallThingNoIcon(strider.trinkets[0]) : 'No trinket') + '</div>';
    str += '</div></div>';
    str += '<div id="strider-trinket2" class="sigilInfo sigilInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \''+ strider.name +'\').equipTrinket(event);" style="' + getIcon(strider.trinkets[1], 25, true) + '">';
    str += '<div class="sigilInfo-infos"><div class="sigilTitle" style="text-align: left;">' + (strider.trinkets[1] ? getSmallThingNoIcon(strider.trinkets[1]) : 'No trinket') + '</div>';
    str += '</div></div>';
    str += '<div id="strider-trinket3" class="sigilInfo sigilInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \''+ strider.name +'\').equipTrinket(event);" style="' + getIcon(strider.trinkets[2], 25, true) + '">';
    str += '<div class="sigilInfo-infos"><div class="sigilTitle" style="text-align: left;">' + (strider.trinkets[2] ? getSmallThingNoIcon(strider.trinkets[2]) : 'No trinket') + '</div>';
    str += '</div></div>';
    if(!strider.eqWeaponBoth) {
        str += '<div id="strider-weaponLeft" class="sigilInfo sigilInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \'' + strider.name + '\').equipWeapon(event, \'' + Data.WeaponHand.LEFT + '\');" style="' + getIcon(strider.eqWeaponLeft, 25, true) + '")>';
        str += '<div class="sigilInfo-infos"><div class="sigilTitle" style="text-align: left;">' + (strider.eqWeaponLeft ? getSmallThingNoIcon(strider.eqWeaponLeft) : 'No weapon') + '</div>';
        str += '</div></div>';
        str += '<div id="strider-weaponRight" class="sigilInfo sigilInfoEmpty" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \'' + strider.name + '\').equipWeapon(event, \'' + Data.WeaponHand.RIGHT + '\');" style="' + getIcon(strider.eqWeaponRight, 25, true) + '")>';
        str += '<div class="sigilInfo-infos"><div class="sigilTitle" style="text-align: left;">' + (strider.eqWeaponRight ? getSmallThingNoIcon(strider.eqWeaponRight) : 'No weapon') + '</div>';
        str += '</div></div>';
    } else {
        str += '<div id="strider-weaponBoth" class="sigilInfo sigilInfoEmpty bigSlot" ondragover="allowDrop(event);" ondrop="what(game.player.roster, \'' + strider.name + '\').equipWeapon(event);" style="' + getIcon(strider.eqWeaponBoth, 25, true) + '")>';
        str += '<div class="sigilInfo-infos"><div class="sigilTitle" style="text-align: left;">' + (strider.eqWeaponBoth ? getSmallThingNoIcon(strider.eqWeaponBoth) : 'No weapon') + '</div>';
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
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_CLOSE);
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
    document.querySelector('#strider-trinket3').addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipTrinket(strider.trinkets[2])});
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

    str += '<div class="hub">';

    str += '<div class="quests">';
    str += '</div>'

    str += '<div class="merchants">';
    str += '<div class="auctionHouse coolBorderBis">';
    str += '</div>'

    str += '<div class="blackMarket coolBorderBis">';

    str += '<p>BLACK MARKET</p>';
    str += '<div class="blackMarket-menu">';

    str += '<div class="blackMarket-menu--firstCol">';

    str += '<div class="blackMarket-menu--tabs">';
    str += '<div class="blackMarket-menu--tab">weapons</div>';
    str += '<div class="blackMarket-menu--tab">armors</div>';
    str += '<div class="blackMarket-menu--tab">trinkets</div>';
    str += '<div class="blackMarket-menu--tab">sigils</div>';
    str += '<div class="blackMarket-menu--tab">resources</div>';
    str += '</div>';

    str += '<div class="blackMarket-menu--trade">';
    str += '<div class="tradeItems">'

    // item structure

    str += '<div class="tradeItems-item">'

    str += '<div class="tradeItems-item--icon"></div>';
    str += '<p class="tradeItems-item--name">Silver Birjin of Drancor</p>';

    str += '<div class="tradeItems-item--price">';
    str += '<div class="tradeItems-goldIcon"></div>';
    str += '<p>15000</p>';
    str += '</div>';

    str += '</div>';

    // ...

    str += '</div>';
    str += '</div>';

    str += '</div>';

    str += '<div class="blackMarket-menu--secondCol">';
    str += '<div class="blackMarket-menu--abandonedCache">';
    str += '<div class="abandonedCacheIcon"></div>';
    str += '<div class="abandonedCache-desc">';
    str += '<p class="abandonedCache-title">Abandoned cache</p>';

    str += '<div class="abandonedCache-desc--price">'
    str += '<div class="tradeItems-goldIcon"></div>';
    str += '<p class="abandonedCache-price--amount">900</p>';
    str += '</div>';
    str += '</div>';

    str += '<div class="divider"></div>'

    str += '<div class="abandonedCache-items">';

    str += '<div class="abandonedCache-items--item"></div>';
    str += '<div class="abandonedCache-items--item"></div>';
    str += '<div class="abandonedCache-items--item"></div>';

    str += '<div class="abandonedCache-items--item"></div>';
    str += '<div class="abandonedCache-items--item"></div>';
    str += '<div class="abandonedCache-items--item"></div>';

    str += '<div class="abandonedCache-items--item"></div>';
    str += '<div class="abandonedCache-items--item"></div>';
    str += '<div class="abandonedCache-items--item"></div>';

    str += '</div>';

    str += '</div>';
    str += '<button>BUY</button>';
    str += '</div>';
    

    str += '</div>';
    str += '</div>';
    
    str += '</div>';
    
    str += '<div class="lordContainer">';

    str += '<div class="lordDialogueContent coolBorderBis">'

    str += '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptate in, optio a laboriosam iure error impedit inventore accusantium quo incidunt cumque consequatur dolorem libero quod necessitatibus aliquam rerum eaque iusto alias iste maiores voluptas quia consectetur. Nesciunt consequatur minima quos, vel exercitationem, ducimus non maiores eligendi repellendus quod rerum minus quis voluptatibus. Natus mollitia itaque aperiam dolor debitis officiis facilis tempora id? Dolore recusandae rerum voluptas, aut adipisci alias inventore non aliquam asperiores iste pariatur perspiciatis harum velit magni explicabo, fuga aliquid expedita earum neque modi. Dolorum illum, id tempore perferendis eum delectus, mollitia repudiandae, architecto deserunt quam dolor?</p>';

    str += '<div class="lordDialogueContent-buttons">'
    str += '<button>Previous</button>'
    str += '<button>Next</button>'
    str += '</div>';

    str += '</div>';

    str += '<div class="lordVignette">'
    str += '</div>';

    str += '</div>';

    str += '</div>';
  
    document.querySelector('.hubContainer').innerHTML = str;

    generateBlackMarketTabEvents();
    generateBlackMarketAbandonedCacheEvents();
}

function generateBlackMarketTabEvents() {
    const tabs = document.querySelectorAll('.blackMarket-menu--tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            unsetBlackMarketAllActiveTabs(tabs);
            setBlackMarketActiveTab(tab);
            generateTabContent(tab);
        });
    });
}

function setBlackMarketActiveTab(tab) {
    tab.classList.add('tabActive');
}

// function generateTabContent(tab) {
//     let tabName = tab.textContent;
//     let str = '';

//     game.all_[tabName].forEach(item => {
//         console.log(game.all_[tabName]);
//         if(item.tradeParams.isBlackMarketAvailable) {        
//             str += '<div class="tradeItems-item">'

//             str += '<div class="tradeItems-item--icon">';
//             // item icon
//             str += '</div>';
        
//             str += '<p class="tradeItems-item--name">';
//             // item name
//             str += '</p>';
        
//             str += '<div class="tradeItems-item--price">';
//             str += '<div class="tradeItems-goldIcon"></div>';
//             str += '<p>';
//             // item price
//             str += '</p>'
//             str += '</div>';
        
//             str += '</div>';
//         }
        
//     });   
// }

function unsetBlackMarketAllActiveTabs(tabs) {
    tabs.forEach(tab => tab.classList.remove('tabActive'));
}

// function generateBlackMarketTabItems(tab) {
//     let str = '';

//     switch(tab.textContent) {
//         case 'weapons':
//             str += '<p>Weapons content goes here</p>';
//             break;
//         case 'armors':
//             str += '<p>Armors content goes here</p>';
//             break;
//         case 'trinkets':
//             str += '<p>Trinkets content goes here</p>';
//             break;
//         case 'sigils':
//             str += '<p>Sigils content goes here</p>';
//             break;
//         case 'resources':
//             str +='<p>Resources content goes here</p>';
//             break;
//         default:
//             str += '<p>Default content goes here</p>';
//             break;
//     }

//     document.querySelector('.tradeItems').innerHTML = str;
// }

function generateBlackMarketAbandonedCacheEvents() {
    const abandonedCaches = document.querySelectorAll('.abandonedCache-items--item');

    abandonedCaches.forEach(cache => {
        cache.addEventListener('click', () => {
            abandonedCaches.forEach(cache => cache.classList.remove('cacheSelected'));
            cache.classList.add('cacheSelected');
        });
    });
}

function getPlayerSoulsAmount() {
    return game.player.souls;
}

function getPlayerGoldAmount() {
    return game.player.gold;
}

function getPlayerCurrentLevel() {
    return game.player.level.currentLevel;
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

    let str = '';
    str += '<div class="workshopMenu">';

    str += '<div class="alchInterface">';
    str += drawAlchemyScreen();
    str += '</div>';

    str += '<div class="craftInterface"></div>';

    str += '<div class="soulwInterface">'
    str += drawSoulwritingScreen();
    str += '</div>';

    str += '<div class="soulbInterface">'
    str += drawSoulbindingScreen();
    str += '</div>';

    str += '<div class="paragInterface"></div>';

    str += '</div>';

    document.querySelector('.workshopContainer').innerHTML = str;

    generateAlchemyInterfaceEvents();
    drawSoulwritingLines();
    generateSoulwritingInterfaceEvents();
    generateSoulbindingInterfaceEvents();
}

function drawAlchemyScreen(refresh = false) {
    game.alchemy.selectRandomIcon();

    let str = '';

    str += '<div class="alchPotionPreview">';
    str += '<div class="alchPotionPreview-wrapper coolBorderBis">';

    str += '<div class="alchPotionPreview-vignetteContainer">';
    str += getAlchemyPotionPreviewVignette();
    str += '</div>';

    str += '<div class="alchPotionPreview-infos">';
    str += '<input type="text" value="' + getRandomPotionName() + '" minlength="3" maxlength="24" class="alchPotionPreview-name">';

    str += '<div class="alchPotionPreview-effects">';
    str += getAlchemyPotionPreviewEffects();
    str += '</div>';

    str += getAlchemyPreviewToxicity();

    str += '</div>';
    str += '<div class="alchBrew" style="display: none">Brew<div class="alchBrewGauge gaugeProgress"><div class="statGauge alchemyGauge"></div></div><canvas class="alchBrewCanvas"></canvas></div>';
    str += '</div></div>';

    str += '<div class="alchIngredient alchIngredientOne" ondragover="allowDrop(event);" ondrop="game.alchemy.addIngredient(event, 0);">';
    str += getAlchemyIngredient(game.alchemy.ingredients[0]);
    str += '</div>';

    str += '<div class="alchIngredient alchIngredientTwo" ondragover="allowDrop(event);" ondrop="game.alchemy.addIngredient(event, 1);">';
    str += getAlchemyIngredient(game.alchemy.ingredients[1]);
    str += '</div>';

    str += '<div class="alchIngredient alchIngredientThree" ondragover="allowDrop(event);" ondrop="game.alchemy.addIngredient(event, 2);">';
    str += getAlchemyIngredient(game.alchemy.ingredients[2]);
    str += '</div>';

    str += '<div class="alchNotifications"></div>';

    return str;
}

function displayAlchemyBrewButton() {
    const alch = game.alchemy;

    if(alch.effects.length > 0) document.querySelector('.alchBrew').style.display = 'flex';
    else document.querySelector('.alchBrew').style.display = 'none';
}

function getAlchemyPotionPreviewVignette(refresh = false) {
    let str = '';

    str += '<div class="alchPotionPreview-vignette" style="background-image: url(\'css/img/potions/' + game.alchemy.icon.icon + '.png\')"></div>';

    if(refresh) {
        document.querySelector('.alchPotionPreview-vignetteContainer').innerHTML = str;
        return;
    }
    return str;
}

function getAlchemyPotionPreviewEffects(refresh = false) {
    let str = '';

    if(game.alchemy.effects.length === 0) str += '<div class="alchNoEffects">No effect</div>';
    else game.alchemy.effects.forEach(eff => {
        console.log(eff);
        str += eff.effect.getFormatted({cssClass: 'alchPreviewEffect', noTheorical: true, defaultColor: true});
    });

    const toxGauge = document.querySelector('#alchPrevToxGauge');
    const toxNumbers = document.querySelector('#alchPrevToxNumbers');
    const tox = game.alchemy.toxicity;
    if(toxGauge) toxGauge.style.width = Math.min(tox, 100) + '%';
    if(toxNumbers) toxNumbers.textContent = tox + '/100';

    if(refresh) {
        document.querySelector('.alchPotionPreview-effects').innerHTML = str;
        return;
    }
    return str;
}

function addAlchemyNotification(message) {
    let str = '';

    str += '<div class="alchNotification">';
    str += message;
    str += '</div>';

    document.querySelector('.alchNotifications').innerHTML = str;
}

function generateAlchemyInterfaceEvents() {
    const ingredients = document.querySelectorAll('.alchIngredient');
    for(let i = 0; i < ingredients.length; i++) {
        const ingr = ingredients[i];
        ingr.addEventListener('contextmenu', e => {
            e.preventDefault();
            if(game.alchemy.ingredients[i]) {
                game.alchemy.removeIngredient(i);
                getAlchemyPotionPreviewEffects(true);
            }
        });
    }

    document.querySelector('.alchPotionPreview-vignette').addEventListener('click', e => {
        Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);

        if(document.querySelector('.vignetteSelector')) {
            document.querySelector('.vignetteSelector').remove();
            return;
        }
        
        const div = document.createElement('div');
        div.classList.add('vignetteSelector');

        let str = '';

        str += '<h2 class="selectorTitle">Bottle selector</h3>';
        str += '<h3 class="selectedTitle">' + game.alchemy.icon.name + '</h4>';
        str += '<div class="divider"></div>';
        str += '<div class="selectorItems">'

        Icons.Methods.getAllUnlocked('potions').forEach(pot => {
            str += '<div id="vignettePotion-' + pot.icon + '" class="selectorItem' + (pot === game.alchemy.icon ? ' vignetteSelected' : '') + '" style="background-image: url(\'css/img/potions/' + pot.icon + '.png\')"></div>';
        });

        str += '</div>';

        str += '<div class="closeWindowButton selectorClose">X</div>';

        div.innerHTML = str;

        div.querySelectorAll('.selectorItem').forEach(item => {
            item.addEventListener('click', e => {
                Sounds.Methods.playSound(Data.SoundType.SELECTOR);
                if(!(item.id === 'vignettePotion-' + game.alchemy.icon.icon)) {
                    const id = parseInt(item.id.slice(15));
                    const icon = Icons.Methods.findByIcon("potions", id);

                    document.querySelector('#vignettePotion-' + game.alchemy.icon.icon).classList.remove('vignetteSelected');
                    item.classList.add('vignetteSelected');
                    document.querySelector('.selectedTitle').textContent = icon.name;

                    game.alchemy.selectIcon(icon);
                    document.querySelector('.alchPotionPreview-vignette').style.backgroundImage = 'url(\'css/img/potions/' + game.alchemy.icon.icon + '.png\')';
                }
            });
        });
        
        document.querySelector('.alchPotionPreview').appendChild(div);
        document.querySelector('.closeWindowButton').addEventListener('click', e => { 
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
            div.remove(); 
        });
    });

    document.querySelector('.alchBrew').addEventListener('click', e => {
        if(!game.alchemy.isBrewing) {
            Sounds.Methods.playSound(Data.SoundType.CRAFT_BUTTON_ALCHEMY);
            Sounds.Methods.playSound(Data.SoundType.CRAFT_POTION_BREW);
            Quanta.burst({
                canvas: document.querySelector('.alchBrewCanvas'),
                color: Data.Color.BLUE,
                amount: 300,
                particleSize: 2,
                duration: 4000,
                fadeAwayRate: 0,
                speed: {
                    x: () => { return (-2 + Math.random() * 5) },
                    y: () => { return (-4 + Math.random() * 10) }
                },
                delay: () => { return getRandomNumber(0, 100) }
            });

            game.alchemy.brewing();

            document.querySelector('.alchBrewGauge').style.display = 'block';
            document.querySelector('.alchemyGauge').classList.add('alchGaugeFill');
            setTimeout(() => {
                game.alchemy.brew();
                Sounds.Methods.playSound(Data.SoundType.CRAFT_POTION_RESULT);
                document.querySelector('.alchBrewGauge').style.display = '';
                document.querySelector('.alchemyGauge').classList.remove('alchGaugeFill');
            }, 1800);
        }
    });
}

function generateAlchemyIngredientEvents(ingr) {
    const dom = document.querySelectorAll('.alchIngredient')[game.alchemy.ingredients.indexOf(ingr)];

    dom.querySelectorAll('.toggleButton').forEach(but => {
        but.addEventListener('click', e => {
            unselectAllAlchemyIngredientSelectors(dom);
            if(ingr.select(but.textContent.toLowerCase())) {
                but.classList.toggle('off');
            }
            getAlchemyPotionPreviewEffects(true);

            Sounds.Methods.playSound(Data.SoundType.SELECTOR);
        })
    })
}

function unselectAllAlchemyIngredientSelectors(ingr) {
    ingr.querySelectorAll('.toggleButton').forEach(but => {
        but.classList.add('off');
    })
}

function getAlchemyIngredient(ingr, refresh = false) {
    let str = '';

    str += '<div class="alchIngredient-vignette' + (ingr ? ' alchVignetteActive' : '') + '" ' + (ingr ? 'style="background-image: url(\'css/img/resources/' + ingr.icon + '.png\');"' : '') + '></div>';
    str += '<div class="alchIngredient-name barred" style="display: ' + (ingr ? 'block' : 'none') + '">' + (ingr ? ingr.name : '') + '</div>';
    str += '<div class="alchIngredient-effects" style="display: ' + (ingr ? 'block' : 'none') + '">';
    if(ingr) {
        str += '<div class="toggleButton off">Passive</div>';
        str += '<div class="toggleButton off">Recovery</div>';
        str += '<div class="toggleButton off">Special</div>';
    }
    str += '</div>';

    if(refresh) {
        const index = game.alchemy.ingredients.indexOf(ingr);
        document.querySelectorAll('.alchIngredient')[index].innerHTML = str;
        generateAlchemyIngredientEvents(ingr);
        return;
    }
    return str;
}

function getAlchemyPreviewToxicity(refresh = false) {
    let str = '';

    str += '<div class="gaugeProgress"><div id="alchPrevToxGauge" class="statGauge toxicitySmaller" style="width:'+ Math.round((game.alchemy.toxicity*100)/100) +'%"></div></div>';
    str += '<div class="alchToxicity">';
    str += '<div>Toxicity</div>';
    str += '<div id="alchPrevToxNumbers">' + game.alchemy.toxicity + '/100</div>';
    str += '</div>'

    return str;
}

function drawSoulwritingScreen() {
    let str = '';

    str += '<div class="soulwTabs">';
    str += '<div id="soulwtab-read" class="soulwTab' + (game.soulwriting.currentTab === 'read' ? ' activeTab' : '') + '">Read</div>';
    str += '<div id="soulwtab-write" class="soulwTab' + (game.soulwriting.currentTab === 'write' ? ' activeTab' : '') + '">Write</div>';
    str += '<div id="soulwtab-bend" class="soulwTab' + (game.soulwriting.currentTab === 'bend' ? ' activeTab' : '') + '">Bend</div>';
    str += '</div>';

    str += '<div id="soulwcontent-read" class="soulwContent">READING</div>';

    str += '<div id="soulwcontent-write" class="soulwContent" style="display: grid">'
    str += getSwWrite();
    str += '</div>';

    str += '<div id="soulwcontent-bend" class="soulwContent">BENDING</div>';

    return str;
}

function drawSoulwritingLines() {
    const parent = document.querySelector('.swWriteCrafting');
    const slots = document.querySelectorAll('.swWriteSlot');

    let str = '';

    str += '<svg class="soulwritingOverlay" height="' + parent.scrollHeight + '" width="' + parent.offsetWidth + '">';

    for(let i = 0; i < slots.length; i++) {
        let slot = slots[i];
        //const basePos = slot.getBoundingClientRect();
        const basePosOriginX = (slot.offsetLeft);
        const basePosOriginY = (slot.offsetTop);

        const targetAccessor = i+1 === slots.length ? 0 : i+1;
        const target = slots[targetAccessor];
        //const targetPos = target.getBoundingClientRect();
        const targetPosOriginX = (target.offsetLeft);
        const targetPosOriginY = (target.offsetTop);
        const id = 'swline-' + (i) + '_' + targetAccessor;

        str += '<line class="swConnector" id="' + id + '" x1="' + basePosOriginX + '" y1="' + basePosOriginY + '" x2="' + targetPosOriginX + '" y2="' + targetPosOriginY + '" style="stroke-width: 1;" stroke-linecap="round" />'
    }
    
    str += '</svg>';

    parent.innerHTML += str;

    document.querySelectorAll('.swWriteSlot').forEach(slot => {
        slot.style.zIndex = '1';
    })
}

function generateSoulwritingInterfaceEvents() {
    const tabs = document.querySelectorAll('.soulwTab');
    const contents = document.querySelectorAll('.soulwContent');
    const soulmarks = document.querySelectorAll('.swWriteList-single');
    const slots = document.querySelectorAll('.swWriteSlot');
    const sigilVignetteSelector = document.querySelector('.swWrite-vignette');
    const soulwrite = document.querySelector('.swWrite-write');

    for(let i = 0; i < tabs.length; i++) {
        let tab = tabs[i];
        tab.addEventListener('click', e => {
            tabs[game.soulwriting.getCurrentTabIndex()].classList.remove('activeTab');
            game.soulwriting.switchTab(i);
            tab.classList.add('activeTab');
            contents.forEach(con => {
                con.style.display = 'none';
            });
            document.querySelector('#soulwcontent-' + game.soulwriting.currentTab).style.display = 'grid';
        });
    }

    soulmarks.forEach(sm => {
        sm.addEventListener('click', e => {
            const id = sm.id.slice(3);
            const slmrk = Config.Soulwriting.filter(s => s.name == id)[0];
            const extended = sm.querySelector('.extendedSoulmarkContainer');

            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
            if(game.soulwriting.selectedSlot !== 0) {
                Sounds.Methods.playSound(Data.SoundType.SOULWRITE_SLOT_IN);
                const slot = document.querySelector('#sws' + game.soulwriting.selectedSlot);
                if(game.soulwriting.getSoulmarkFromSelected() === slmrk) {
                    game.soulwriting.removeSoulmarkFromSelected();
                    removeSoulmarkAbrevFromSlot(slot);
                    sm.classList.toggle('selectedSoulmark');
                    return;
                } else if (game.soulwriting.soulmarks.includes(slmrk)) {
                    // unselect current before overloading
                    if(game.soulwriting.getSoulmarkFromSelected()) {
                        document.querySelector('#sm-' + game.soulwriting.getSoulmarkFromSelected().name).classList.remove('selectedSoulmark');
                    }

                    const index = game.soulwriting.getSoulmarkIndex(slmrk);
                    removeSoulmarkAbrevFromSlot(document.querySelector('#sws' + (index+1)));
                    game.soulwriting.soulmarks[index] = null;
                    game.soulwriting.addSoulmarkToSelected(slmrk);
                    addSoulmarkAbrevToSlot(slot, slmrk);
                } else {
                    const selected = game.soulwriting.getSoulmarkFromSelected();
                    if(selected) {
                        document.querySelector('#sm-' + selected.name).classList.remove('selectedSoulmark');
                    }
                    game.soulwriting.addSoulmarkToSelected(slmrk);
                    addSoulmarkAbrevToSlot(slot, slmrk);
                    sm.classList.toggle('selectedSoulmark');
                }
                return;
            }
            sm.classList.toggle('extendedSoulmark');
            if(!sm.classList.contains('extendedSoulmark')) {
                extended.innerHTML = '';
                extended.style.display = 'none';
            } else {
                extended.style.display = 'flex';
                let str = '';
                const regular = new Stat({effect: slmrk.effect, theorical: slmrk.theorical});

                str += '<div><span style="color: #ffffff;">Base</span><span>' + regular.getFormatted({cssClass: 'swWriteList-effSub', noValue: true}) + '</span></div>';
                str += '<div><span style="color: #ece2b6;">Stalwart</span><span>' + slmrk.critical.getFormatted({cssClass: 'swWriteList-effSub', noValue: true}) + '</span></div>';
                str += '<div><span style="color: tomato;">Corrupt</span><span>' + slmrk.corrupted.getFormatted({cssClass: 'swWriteList-effSub', noValue: true}) + '</span></div>';

                extended.innerHTML = str;
            }
        });
    });

    slots.forEach(slot => {
        slot.addEventListener('click', e => {
            Sounds.Methods.playSound(Data.SoundType.SELECTOR_ON);
            const id = slot.id.slice(3);
            slots.forEach(s => {
                if(s.id.slice(3) !== id) s.classList.remove('swWriteSlotSelected');
            });
            slot.classList.toggle('swWriteSlotSelected');
            game.soulwriting.selectSlot(id);
        });
        slot.addEventListener('contextmenu', e => {
            Sounds.Methods.playSound(Data.SoundType.SELECTOR_OFF);
            e.preventDefault();
            const id = slot.id.slice(3);
            const slmrk = game.soulwriting.getSoulmarkAt(id);
            if(!slmrk) return;
            document.querySelector('#sm-' + slmrk.name).classList.remove('selectedSoulmark');
            game.soulwriting.unselectSoulmarkAt(id);
            removeSoulmarkAbrevFromSlot(slot)
        });
    });

    sigilVignetteSelector.addEventListener('click', e => {
        Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);

        if(document.querySelector('.sigilSelector')) {
            document.querySelector('.sigilSelector').remove();
            return;
        }

        const div = document.createElement('div');
        div.classList.add('sigilSelector');

        let str = '';

        str += '<h2 class="selectorTitle">Stone selector</h2>';
        str += '<h3 class="selectedTitle">' + game.soulwriting.icon.name + '</h3>';
        str += '<div class="divider"></div>';
        str += '<div class="selectorItems">';

        Icons.Methods.getAllUnlocked('sigils').forEach(sig => {
            str += '<div id="vignetteSigil-' + sig.icon + '" class="selectorItem' + (sig === game.soulwriting.icon ? ' vignetteSelected' : '') + '" style="background-image: url(\'css/img/sigils/' + sig.icon + '.png\')"></div>';
        })

        str += '</div>';

        str += '<div id="closeSigilSelector" class="closeWindowButton selectorClose">X</div>';

        div.innerHTML = str;

        div.querySelectorAll('.selectorItem').forEach(item => {
            item.addEventListener('click', e => {
                Sounds.Methods.playSound(Data.SoundType.SELECTOR);
                if(!(item.id === 'vignetteSigil-' + game.soulwriting.icon.icon)) {
                    const id = parseInt(item.id.slice(14));
                    const icon = Icons.Methods.findByIcon("sigils", id);

                    document.querySelector('#vignetteSigil-' + game.soulwriting.icon.icon).classList.remove('vignetteSelected');
                    item.classList.add('vignetteSelected');
                    document.querySelector('.sigilSelector .selectedTitle').textContent = icon.name;

                    game.soulwriting.selectIcon(icon);
                    document.querySelector('.swWrite-vignette').style.backgroundImage = 'url(\'css/img/sigils/' + game.soulwriting.icon.icon + '.png\')';
                }
            });
        });
        
        document.querySelector('.swWriteCrafting').appendChild(div);
        document.querySelector('#closeSigilSelector').addEventListener('click', e => { 
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
            div.remove(); 
        });
    });

    soulwrite.addEventListener('click', e => {
        if(!game.soulwriting.isWriting && game.soulwriting.canWrite()) {
            Sounds.Methods.playSound(Data.SoundType.SOULWRITE_WRITE_WRITE);
            Sounds.Methods.playSound(Data.SoundType.SOULWRITE_PROCESS);
            const stalDiamond = document.querySelector('#swWrite-stalwart');
            const corrDiamond = document.querySelector('#swWrite-corrupt');
            stalDiamond.classList.remove('swStalwartAnim');
            corrDiamond.classList.remove('swCorruptAnim');

            game.soulwriting.writing();
            Sounds.Methods.playSound(Data.SoundType.SELECTOR);
            const slots = document.querySelectorAll('.swFilledSlot');
            const connectors = document.querySelectorAll('.swConnector');

            let delay = 0;
            slots.forEach(slot => {
                slot.style.animationDelay = delay + 's';
                slot.classList.add('swSlotAnim');
                setTimeout(() => {
                    Sounds.Methods.playSound(Data.SoundType.SOULWRITE_SLOT);
                }, delay*1000);
                setTimeout(() => {
                    Sounds.Methods.playSound(Data.SoundType.SOULWRITE_UNSLOT);
                }, delay*1000 + 1700);
                delay += 0.25;
            });
            delay = 0;
            connectors.forEach(conn => {
                conn.style.animationDelay = delay + 's';
                conn.classList.add('swConnectorAnim');
                delay += 0.25;
            });
            soulwrite.classList.add('swSoulwriting');

            Quanta.burst({
                canvas: document.querySelector('#canv-soulwrite'),
                color: Data.Color.RARE,
                amount: 300,
                particleSize: 5,
                duration: 4000,
                fadeAwayRate: 0,
                speed: {
                    x: () => { return (-2 + Math.random() * 5) },
                    y: () => { return (-4 + Math.random() * 10) }
                },
                delay: () => { return getRandomNumber(0, 100) },
            });

            setTimeout(() => {
                game.soulwriting.soulwrite();
                let dur = 0;
                slots.forEach(slot => {
                    slot.classList.remove('swSlotAnim');
                });
                connectors.forEach(conn => {
                    conn.classList.remove('swConnectorAnim');
                });
                soulwrite.classList.remove('swSoulwriting');
            }, 3000);
        }
    });

    addTooltip(document.querySelector('#swWrite-stalwart'), function(){
        let str = '';

        str += '<div class="stcoSwTooltip">';
        str += '<h3 class="stcoHeader" style="color: #ece2b6">Stalwart chance</h3>';
        str += '<div class="divider"></div>';
        str += '<p>Stalwart soulmarks unlock additional positive effects.</p>'
        str += '</div>';

        return str;
    }, {offY: -8});
    addTooltip(document.querySelector('#swWrite-corrupt'), function(){
        let str = '';

        str += '<div class="stcoSwTooltip">';
        str += '<h3 class="stcoHeader" style="color: tomato">Corrupt chance</h3>';
        str += '<div class="divider"></div>';
        str += '<p>Corrupt soulmarks unlock additional negative effects.</p>'
        str += '</div>';

        return str;
    }, {offY: -8});
}

function addSoulmarkAbrevToSlot(slot, slmrk) {
    slot.innerHTML = '<span>' + slmrk.name.slice(0, 3) + '</span>';
    slot.classList.add('swFilledSlot');
}
function removeSoulmarkAbrevFromSlot(slot) {
    slot.innerHTML = '';
    slot.classList.remove('swFilledSlot');
}

function getSwWrite(refresh = false) {
    let str = '';

    str += '<div class="swWriteList">';
    str += '<div class="swWriteList-header">Soulmarks</div>';
    str += '<div class="swWriteList-list">';
    if(game.player.getAllUnlockedSoulmarks().length == 0) {
        str += '<div class="swWriteList-list-empty">No soulmarks learnt</div>'; 
    }
    else {
        game.player.getAllUnlockedSoulmarks().forEach(sm => {
            str += getFormattedSoulmark(sm);
        });
    }
    str += '</div>';
    str += '</div>';

    str += '<div class="swWriteCrafting">';
    str += '<input class="swWrite-sigilName barred infoTitle" type="text" value="' + getRandomSigilName() + '" minlength="3" maxlength="24">';
    str += '<div class="swWrite-vignetteContainer"><div class="swWrite-vignette" style="background-image: url(\'css/img/sigils/' + game.soulwriting.icon.icon + '.png\')"></div></div>';
    str += '<div id="sws1" class="swWriteSlot"></div>';
    str += '<div id="sws2" class="swWriteSlot"></div>';
    str += '<div id="sws3" class="swWriteSlot"></div>';
    str += '<div id="sws4" class="swWriteSlot"></div>';

    str += '<div class="swWriteCraft">';
    str += '<div id="swWrite-stalwart" class="swWrite-stalwart"><span>15%</span></div>';
    str += '<div class="swWrite-write"><span>Write</span><canvas id="canv-soulwrite" class="swSlotCanvas"></canvas></div>';
    str += '<div id="swWrite-corrupt"class="swWrite-corrupt"><span>15%</span></div>';
    str += '</div>'; 

    str += '<div class="swWrite-backgroundCover coolBorderBis"></div>'
    str += '</div>';

    if(refresh) {
        document.querySelector('.soulwcontent-write').innerHTML = str;
        return;
    }
    return str;
}

function getFormattedSoulmark(sm) {
    const eff = new Stat({effect: sm.effect, theorical: sm.theorical});

    let str = '';

    str += '<div id="sm-' + sm.name + '" class="swWriteList-single"><div class="swWriteList-singleHeader"><span>' + capitalizeFirstLetter(sm.name) + '</span>' + eff.getFormatted({cssClass: 'swWriteList-eff', noValue: true, noTheorical: true}) + '</div><div class="extendedSoulmarkContainer"></div></div>';

    return str;
}

function drawSoulbindingScreen(refresh = false) {
    let str = '';

    str += '<div class="sbItem" ondragover="allowDrop(event)" ondrop="game.soulbinding.setItem(event)">';
    str += getSoulbindingItem();
    str += '</div>';
    
    str += '<div class="sbObjects">';
    str += getSoulbindingObjects();
    str += '</div>';

    return str;
}

function generateSoulbindingInterfaceEvents() {
    generateSoulbindingItemEvents();
    generateSoulbindingObjectsEvents();
}

function generateSoulbindingItemEvents() {
    const unslotItem = document.querySelector('.sbItemContainer');

    if(unslotItem) unslotItem.addEventListener('contextmenu', e => {
        e.preventDefault();
        game.soulbinding.unslotItem();
        getSoulbindingItem(true);
        getSoulbindingObjects(true);
    });
}

function generateSoulbindingObjectsEvents() {
    const sigils = document.querySelectorAll('.soulbindingSigilInfo');
    const binds = document.querySelectorAll('.sbBind');

    sigils.forEach(sigil => {
        if(sigil) {
            const sigilId = sigil.parentNode.id.slice(6);
            const sigilObj = game.soulbinding.item.sockets.find(x => x.id == sigilId);
            console.log(sigilId);
            console.log(sigilObj);
            let unbind = document.querySelector('#unbind-' + sigilId);

            sigil.addEventListener('click', e => {
                const echo = sigil.querySelector('.echoTitle');
                const corruptedEcho = sigil.querySelector('.sigilCorruption > p:not(.name)');

                sigil.querySelectorAll('.sigilEffect').forEach(se => {
                    if(se.style.display === 'none') se.style.display = 'block';
                    else se.style.display = 'none';
                });
                if(corruptedEcho) {
                    if(corruptedEcho.style.display === 'none') corruptedEcho.style.display = 'block';
                    else corruptedEcho.style.display = 'none';
                }

                if(echo) {
                    const brs = sigil.querySelectorAll('.brContainer');
                    const eff = sigil.querySelector('.echoEffects');
                    const desc = sigil.querySelector('.echoDesc');
                    const quote = sigil.querySelector('.echoQuote');

                    brs.forEach(br => {
                        if(br.style.display === 'none') br.style.display = 'block';
                        else br.style.display = 'none';
                    });

                    if(eff.style.display === 'none') eff.style.display = 'block';
                    else eff.style.display = 'none';

                    if(desc.style.display === 'none') desc.style.display = 'block';
                    else desc.style.display = 'none';

                    if(quote.style.display === 'none') quote.style.display = 'block';
                    else quote.style.display = 'none';
                }
            });

            if(unbind) unbind.addEventListener('click', e => {
                game.soulbinding.unslotSigil(sigilObj);
                Sounds.Methods.playSound(Data.SoundType.SELECTOR_ON);
                Sounds.Methods.playSound(Data.SoundType.SOULBIND_UNSLOT);
            })
        }
    });

    binds.forEach(bind => {
        bind.addEventListener('click', e => {
            game.soulbinding.slotSigil();
            Sounds.Methods.playSound(Data.SoundType.SELECTOR_ON);
            Sounds.Methods.playSound(Data.SoundType.SOULBIND_SLOT);
        });
    })
}

function getSoulbindingItem(refresh = false) {
    let str = '';

    if(game.soulbinding.item) {
        str += '<div class="sbItemContainer">';

        str += '<div class="sbItemContainerHeader sbItem' + capitalizeFirstLetter(game.soulbinding.item.rarity) + '">';    
        str += '<div class="sbItemContainerIcon" style="' + getIcon(game.soulbinding.item) + '"></div>';
        str += '<div class="sbItemContainerName" style="color: ' + getRarityColorCode(game.soulbinding.item.rarity) + '"><span>' + game.soulbinding.item.name + '</span></div>';
        str += '</div>';

        str += '<div class="sbItemContainerIndicators">';

        str += '<div class="sbItemContainerIndicator">';
        str += '<h3>Sigils</h3>';
        str += '<div class="sbItemContainerDots">';
        for(let i = 0, c = game.soulbinding.item.sockets.length; i < game.soulbinding.item.sockets_amount; i++) {
            if(c > 0) str += '<span class="sbFulldot"></span>';
            else str += '<span class="sbEmptyDot"></span>';
            c--;
        }
        str += '</div></div>';

        str += '<div class="sbItemContainerIndicator">';
        str += '<h3>Echoes</h3>';
        str += '<div class="sbItemContainerDots">';
        for(let i = 0, c = game.soulbinding.item.echoes.length; i < game.soulbinding.item.echoes_amount; i++) {
            if(c > 0) str += '<span class="sbFulldot"></span>';
            else str += '<span class="sbEmptyDot"></span>';
            c--;
        }
        str += '</div></div>';
        
        str += '</div>';

        str += '<div class="sbItemContainerEffects coolBorder">';
        str += getAlterations(game.soulbinding.item);
        str += '</div>';

        str += '</div>';
    } else {
        str += '<div class="sbNoItem">No Item</div>';
    }

    if(refresh) {
        document.querySelector('.sbItem').innerHTML = str;
        generateSoulbindingItemEvents();
        return;
    }
    return str;
}

function getSoulbindingActions(refresh = false) {
    let str = '';

    str += '<div class="sbAction sbActionUnbind"><div class="sbActionContent">';
    str += 'Unbind';
    str += '</div></div>';
    str += '<div class="sbAction sbActionBind"><div class="sbActionContent">';
    str += 'Bind';
    str += '</div></div>';
    str += '<div class="sbAction sbActionExtract"><div class="sbActionContent">';
    str += 'Extract'
    str += '</div></div>';

    if(refresh) {
        document.querySelector('.sbActions').innerHTML = str;
        return;
    }
    return str;
}

function getSoulbindingObjects(refresh = false) {
    const item = game.soulbinding.item;
    let animDelay = 0;
    let str = '';

    str += '<div class="sbObjectsSigils">';
    if(item && item.hasOwnProperty('sockets_amount')) for(let i = 0; i < item.sockets_amount; i++) {
        const socket = item.sockets[i];
        
        str += '<div class="sbObjectsSigilWrapper" style="animation-delay: ' + animDelay + 's;">';
        if(socket) {
            str += '<div id="sbSig-' + socket.id + '" class="sbObjectsSigil">';
            str += getSigilDetails(socket, false, true);
            str += '</div>';
            str += getSigilUnbindingCommand(socket.id);
        }
        else {
            str += '<div class="sbObjectsSigil">';
            str += getEmptySigilHTML(true, i+1);
            str += '</div>';
            str += getSigilBindingCommand();
        }
        str += '</div>';
        animDelay += 0.1;
    }
    str += '</div>';

    str += '<div class="sbObjectsEchoes">';
    if(item && item.hasOwnProperty('echoes_amount')) for(let i = 0; i < item.echoes_amount; i++) {
        const echo = item.echoes[i];
        
        animDelay += 0.1;
        str += '<div class="sbObjectsSigilWrapper" style="animation-delay: ' + animDelay + 's;">';
        str += '<div class="sbObjectsSigil">';
        if(echo) str += getEchoDetails(echo, false, true);
        else str += getEmptyEchoHTML(true);
        str += '</div>';
        str += getEchoExtractCommand(echo.id);
        str += '</div>';
    }
    str += '</div>';

    if(refresh) {
        document.querySelector('.sbObjects').innerHTML = str;
        generateSoulbindingObjectsEvents();
        return;
    }
    return str;
}

function getSigilUnbindingCommand(id = 0) {
    let str = '';

    str += '<div id="unbind-' + id + '" class="sbManipulationCommand">Unbind</div>';

    return str;
}

function getSigilBindingCommand() {
    let str = '';

    str += '<div class="sbManipulationCommand sbBind">Bind</div>';

    return str;
}

function getEchoExtractCommand(id = 0) {
    let str = '';

    str += '<div id="extract-' + id + '" class="sbManipulationCommand">Extract</div>';

    return str;
}


function drawAstralForgeScreen(forgeItem, refresh = false) {
    console.log('Astral Forge screen opened with ' + forgeItem.item.name);

    let popupWindow;
    if(!refresh) {
        popupWindow = document.createElement('div');
        popupWindow.classList.add('astralForgePopup', 'bgDark');
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
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_CLOSE);
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

function drawEmptyBattleScreen() {
    document.querySelector('#battleDiv').innerHTML = '<div class="noBattle"></div>';

    let str = '<h1>' + choose(Speech.Battle.Empty) + '</h1>';

    document.querySelector('.noBattle').innerHTML = str;
}

function drawEndBattleScreen() {
    const battle = game.currentBattle;
    console.log(battle);
    document.querySelector('#battleDiv').innerHTML = '<div class="battleEndContainer coolBorderBis" style="background-image: linear-gradient(0deg, transparent 0%, rgba(0, 0, 0, 1) 100%), url(\'css/img/bg/' + game.currentDungeon.background + '\')"></div>';

    let str = '';

    str += '<div class="battleEnd-header">';
    str += '<div class="titles">';
    str += '<h1>' + battle.outcome + '</h1>';
    str += '<h3>' + game.currentDungeon.currentFloor.currentRoom.type + ' completed</h3>'
    str += '</div>';
    str += '</div>';

    str += '<div class="battleEnd-stats coolBorderBis">';
    str += '<div class="statsHeader">Stats</div>';
    str += '<table class="statsListing">';
    str += '<tbody>';
    str += '<tr><td>Rounds</td><td>' + battle.round + '</td>';
    str += '<tr><td>Str. damage</td><td>524</td>';
    str += '<tr><td>Ene. damage</td><td>12</td>';
    str += '<tr><td>Str. accuracy</td><td>76%</td>';
    str += '<tr><td>Ene. accuracy</td><td>81%</td>';
    str += '<tr><td>Str. dodge</td><td>12%</td>';
    str += '<tr><td>Ene. dodge</td><td>29%</td>';
    str += '<tr><td>Str. bleeding damage</td><td>52</td>';
    str += '<tr><td>Ene. bleeding damage</td><td>5</td>';
    str += '<tr><td>Str. poison damage</td><td>0</td>';
    str += '<tr><td>Ene. poison damage</td><td>62</td>';
    str += '</tbody>';
    str += '</table>';
    str += '</div>';

    str += '<div class="battleEnd-fighters">';
    str += '<div class="battleEnd-fightersAllies">';
    let delay = 0;
    battle.allies.forEach(al => {
        str += '<div class="battleEnd-fighter fighterAlly" style="animation-delay: ' + delay + 's; background-image:linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 1) 100%), url(\'css/img/chars/' + al.charset + '\')"><span class="fi-name">' + al.name + '</span><span class="fi-type">' + al.striderType + '</span></div>';
        delay += 0.1;
    });
    str += '</div>';
    str += '<div class="battleEnd-fightersEnemies">';
    battle.enemies.forEach(en => {
        str += '<div class="battleEnd-fighter fighterEnemy" style="animation-delay: ' + delay + 's; background-image:linear-gradient(270deg, transparent 0%, rgba(0, 0, 0, 1) 100%), url(\'css/img/chars/' + en.charset + '\')"><span class="fi-name">' + en.name + '</span><span class="fi-type">' + en.mobType + '</span></div>';
        delay += 0.1;
    });
    str += '</div>'
    str += '</div>';

    str += '<div class="battleEnd-loot coolBorderBis">';
    str += '<div class="lootHeader">Loot</div>';
    str += '</div>';

    str += '<div class="battleEnd-progress">';
    str += '</div>';

    document.querySelector('.battleEndContainer').innerHTML = str;
}

function drawBattleScreen() {
    document.querySelector('#battleDiv').innerHTML = '<div class="battleContainer"><div class="battle"></div></div>';

    let str = '';

    str += '<div class="battle-globalInfo">';
    str += getBattleGlobalInfo();
    str += '</div>';

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

    if(!game.currentBattle.isEnemyPlaying()) {
        generateBattleCommandsEvents();
        generateBattleSkillsEvents();
        generateBattleConsumablesEvents();
    }
    generateBattleFightersEvents();
}

function getBattleGlobalInfo(refresh = false) {
    let str = '';

    str += '<div class="battle-dungeonInfo">'
    str += '<h1>' + (game.currentDungeon ? capitalizeFirstLetter(game.currentDungeon.name) : 'Unknown Dungeon') + '</h1>';
    str += '<h4>' + (game.currentDungeon ? 'Depth ' + game.currentDungeon.currentFloor.depth + ' [' + + game.currentDungeon.currentFloor.currentRoom.coordinates[0] + ', ' + game.currentDungeon.currentFloor.currentRoom.coordinates[1] + '] — ' + capitalizeFirstLetter(game.currentDungeon.currentFloor.currentRoom.type) : 'Unknown Position') + '</h4>'
    str += '</div>';

    str += '<div class="battle-combatInfo">'
    str += '<h1>Group fight</h1>';
    str += '<h4>Round ' + game.currentBattle.round + ' — ' + game.currentBattle.currentPlay.name + '\'s Turn</h4>'
    str += '</div>'

    if(refresh) {
        document.querySelector('.battle-globalInfo').innerHTML = str;
        return;
    }
    return str;
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
        document.querySelector('#battle-fighters-allies').innerHTML = str;
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
        document.querySelector('#battle-fighters-enemies').innerHTML = str;
        return;
    }
    return str;
}

function getFighterFrame(fighter, type, pos) {
    let str = '';
    pos = pos.toLowerCase();
    type = type.toLowerCase();
    typeMin = type.charAt(0);
    const playOrder = game.currentBattle.order.indexOf(fighter) + 1;

    const id = 'aw-' + typeMin + '-' + pos;

    str += '<div id="gw-' + typeMin + '-' + pos + '" class="category" style="display: inline-block; overflow: visible;"><div class="battlePositionName">' + capitalizeFirstLetter(pos) + '</div>';
    str += '<div id="' + id + '" class="animationsWrapper"></div>';
    if(fighter) {
        str += '<div id="b-' + type + '-' + pos + '" class="battleFighter" style="background-image: linear-gradient(transparent 0%, rgba(0, 0, 0, 1) 70%), url(\'css/img/chars/' + fighter.charset + '\'); ' + (fighter.health === 0 ? ' filter: grayscale(100%);' : '') + '">';
        str += '<div class="battle-shieldContainer">' + getBattleShieldAmount(fighter) + '</div>';
        str += '<div class="battle-specialEffectsContainer">' + getSpecialEffects(fighter) + '</div>';
        str += '<div class="gaugeProgress"><div class="statGauge health" style="width:'+ Math.round((fighter.health*100)/fighter.maxHealth) +'%"><span class="gaugeIndicator">'+ fighter.health + '/' + fighter.maxHealth +'</span></div></div>';
        str += '<div class="gaugeProgress"><div class="statGauge stamina" style="width:'+ Math.round((fighter.stamina*100)/fighter.maxStamina) +'%"><span class="gaugeIndicator">'+ fighter.stamina + '/' + fighter.maxStamina +'</span></div></div>';
        str += '<div class="gaugeProgress"><div class="statGauge mana" style="width:'+ Math.round((fighter.mana*100)/fighter.maxMana) +'%"><span class="gaugeIndicator">'+ fighter.mana + '/' + fighter.maxMana +'</span></div></div>';
        str += '</div>';
    }
    str += '<div class="playOrderIndicator">' + playOrder + '</div>';
    str += '</div>';

    return str;
}

function getBattleShieldAmount(fighter) {
    let str = '';

    if(fighter.shield > 0) str += '<div class="shieldAmount">' + fighter.shield + '</div>';

    return str;
}

function getSpecialEffects(fighter) {
    let str = '';

    if(fighter.isStunned) str += '<div class="specialEffect stun"></div>'; 
    if(fighter.isBlocking) str += '<div class="specialEffect block"></div>'; 
    if(fighter.isGuarded) str += '<div class="specialEffect guarded"></div>'; 
    if(fighter.isGuarding) str += '<div class="specialEffect guarding"></div>'; 

    return str;
}

function addSpecialEffect(pos, type) {
    let str = '';
    switch(type) {
        case Data.Effect.STUN:
            type = 'stun';
            break;
        case Data.Effect.BLOCK:
            type = 'block';
            break;
        case Data.Effect.GUARDING:
            type = 'guarding';
            break;
        case Data.Effect.GUARDED:
            type = 'guarded';
            break;
    }
    str += '<div class="specialEffect ' + type.toLowerCase() + '"></div>';

    console.log('Added: ' + str + ' to :' + pos);
    if(!document.querySelector('.battle-specialEffectsContainer')) document.
    document.querySelector('#' + pos).querySelector('.battle-specialEffectsContainer').innerHTML += str;
}

function removeSpecialEffect(pos, type) {
    switch(type) {
        case Data.Effect.STUN:
            type = 'stun';
            break;
        case Data.Effect.BLOCK:
            type = 'block';
            break;
        case Data.Effect.GUARDING:
            type = 'guarding';
            break;
        case Data.Effect.GUARDED:
            type = 'guarded';
            break;
    }
    let identifier = '.specialEffect.' + type;

    document.querySelector('#' + pos).querySelector(identifier).remove();
}

function getBattleScreenFormationAlliesSingle(pos) {
    let selector;
    switch(pos) {
        case Data.FormationPosition.BACK:
            selector = 0;
            break;
        case Data.FormationPosition.MIDDLE:
            selector = 1;
            break;
        case Data.FormationPosition.FRONT:
            selector = 2;
            break;
    }

    const npc = game.currentBattle.allies[selector];

    let str = '';
    str += '<div id="gw-' + typeMin + '-' + pos + '" class="category" style="display: inline-block"><div class="battlePositionName">' + capitalizeFirstLetter(pos) + '</div>';
    if(npc) {
        str += '<div id="b-' + type + '-' + pos + '" class="battleFighter" style="background-image: linear-gradient(transparent 0%, rgba(0, 0, 0, 1) 70%), url(\'css/img/chars/' + fighter.charset + '\'); ' + (fighter.health === 0 ? ' filter: grayscale(100%);' : '') + '">';
        str += '<div class="gaugeProgress"><div class="statGauge health" style="width:'+ Math.round((fighter.health*100)/fighter.maxHealth) +'%"><span class="gaugeIndicator">'+ fighter.health + '/' + fighter.maxHealth +'</span></div></div>';
        str += '<div class="gaugeProgress"><div class="statGauge stamina" style="width:'+ Math.round((fighter.stamina*100)/fighter.maxStamina) +'%"><span class="gaugeIndicator">'+ fighter.stamina + '/' + fighter.maxStamina +'</span></div></div>';
        str += '<div class="gaugeProgress"><div class="statGauge mana" style="width:'+ Math.round((fighter.mana*100)/fighter.maxMana) +'%"><span class="gaugeIndicator">'+ fighter.mana + '/' + fighter.maxMana +'</span></div></div>';
        str += '</div>';
    }

    return str;
}

function getBattleCommands(refresh = false) {
    let str = '';

    str += '<div class="battle-actionsContainer">';
    if(game.currentBattle.isEnemyPlaying()) {

    } else {
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
    }
    str += '</div>';

    str += '<div class="battle-skillsContainer">';
    str += getBattleSkills();
    str += '</div>';
    str += '<div class="divider" style="grid-area: divider"></div>';
    str += '<div class="battle-consumablesContainer">';
    str += getBattleConsumables();
    str += '</div>';

    str += '<div class="battle-notifications"></div>';

    if(refresh) {
        document.querySelector('.battle-commandsContainer').innerHTML = str;
        return;
    }
    return str;
}

function getCurrentPlayerEquippedWeapons() {
    let str = '<div class="battle-weaponIcons">';
    const current = game.currentBattle.currentPlay;

    if(current.eqWeaponBoth) str += '<div id="bwpn-' + current.eqWeaponBoth.id + '" class="battle-weaponIcon singleWeaponIconPopup ' + (current.stamina < current.eqWeaponBoth.effort ? 'disabledWeapon' : '') + '" style="background-image: url(\'css/img/weapons/' + current.eqWeaponBoth.icon + '.png\')"></div>';
    else {
        if(current.eqWeaponRight) str += '<div id="bwpn-' + current.eqWeaponRight.id + '"  id="" class="battle-weaponIcon ' + (current.stamina < current.eqWeaponRight.effort ? 'disabledWeapon' : '') + '" style="background-image: url(\'css/img/weapons/' + current.eqWeaponRight.icon + '.png\')"></div>';
        if(current.eqWeaponLeft) str += '<div id="bwpn-' + current.eqWeaponLeft.id + '"  id="" class="battle-weaponIcon ' + (current.stamina < current.eqWeaponLeft.effort ? 'disabledWeapon' : '') + '" style="background-image: url(\'css/img/weapons/' + current.eqWeaponLeft.icon + '.png\')"></div>';
    }

    str += '</div>';

    return str;
}

function getBattleSkills(refresh = false) {
    let str = '';

    if(!game.currentBattle.isEnemyPlaying()) {
        const currentPlay = game.currentBattle.currentPlay;
        currentPlay.skills.forEach(skill => {
            str += '<div id="' + currentPlay.name + '-' + skill.id + '" class="skillSquare treeNode coolBorder ' + (currentPlay.mana < skill.manaCost || !skill.condition.checker() || skill.cooldownCountdown > 0 ? 'disabledSkill' : '') + '" style="background-image: url(\'css/img/skills/' + currentPlay.name + skill.icon + '.png\')">' + (skill.cooldownCountdown > 0 ? '<span class="skillCooldownIndicator">' + skill.cooldownCountdown + '</span>' : '') + '</div>';
        })
    }

    if(refresh) {
        document.querySelector('.battle-skillsContainer').innerHTML = str;
        return;
    }
    return str;
}

function getBattleConsumables(refresh = false) {
    let str = '';

    str += '<div class="battle-consumables">';
    game.inventory.consumables.forEach(cons => {
        if(cons.amount > 0) str += '<div id="btl-' + cons.id + '" class="inventoryItem" style="' + getIcon(cons) + '; border: 2px solid ' + getRarityColorCode(cons.rarity) +'"></div>'
    });
    str += '</div>';

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
            if(current.stamina < weapon.effort) {
                console.log('Not enough stamina.');
                addBattleNotification(current.name + '\'s stamina is too low to use ' + weapon.name + '.');
            } else {
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
            }
        });
    })

    atk.addEventListener('click', e => {
        
    });
    def.addEventListener('click', e => {
        console.log('blocking');
        current.applyBlocking();
        battle.endTurn();
    });
    mov.addEventListener('click', e => {
        if(battle.action != Data.BattleAction.MOVE) {
            battleCommandsCancelCurrent();
            battle.action = Data.BattleAction.MOVE;
            mov.classList.add('battle-actionSelected');
            console.log('Moving...');
            battleMovePickTarget();
        } 
        else battleCommandsCancelCurrent();
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
    
    if(!battle.selectedWeapon) return;

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

function canCastSkillOnSelf(skill) {
    return skill.targets.enemies === '-0' && skill.targets.allies === '-0' && skill.effectsCaster;
}

function battleSkillPickTarget() {
    const battle = game.currentBattle;
    const skill = battle.selectedSkill;

    let selector;

    battleSelectionRemoveHighlights();

    selector = skill.targets.allies.charAt(0) == '@' ? 'battle-skillTargetMultiple' : 'battle-skillTargetSingle';
    if(skill.targets.allies.includes('1')) document.querySelector('#b-hero-front').classList.add(selector);
    if(skill.targets.allies.includes('2')) document.querySelector('#b-hero-middle').classList.add(selector);
    if(skill.targets.allies.includes('3')) document.querySelector('#b-hero-back').classList.add(selector);

    selector = skill.targets.enemies.charAt(0) == '@' ? 'battle-skillTargetMultiple' : 'battle-skillTargetSingle';
    if(skill.targets.enemies.includes('1')) document.querySelector('#b-enemy-front').classList.add(selector);
    if(skill.targets.enemies.includes('2')) document.querySelector('#b-enemy-middle').classList.add(selector);
    if(skill.targets.enemies.includes('3')) document.querySelector('#b-enemy-back').classList.add(selector);

    // Highlight Caster's position if no target at all but caster effects exist
    if(canCastSkillOnSelf(skill)) {
        document.querySelector('#b-hero-' + battle.getCurrentNPCPos().toLowerCase()).classList.add('battle-skillTargetSingle');
    } else {
        document.querySelector('#b-hero-' + battle.getCurrentNPCPos().toLowerCase()).classList.remove('battle-skillTargetSingle', 'battle-skillTargetMultiple');
    }

    // ALLIES
    document.querySelector('#b-hero-front').addEventListener('click', e => {
        if(canCastSkillOnSelf(skill) || (skill.targets.allies.includes('1') && battle.getCurrentNPCPos() !== Data.FormationPosition.FRONT)) {
            battle.target.push(battle.allies[2]);
            if(skill.targets.allies.charAt(0) === '@') {
                if(skill.targets.allies.includes('2')) battle.target.push(battle.allies[1]);
                if(skill.targets.allies.includes('3')) battle.target.push(battle.allies[0]);
            }
            battle.executeSkill();
        }
    });
    document.querySelector('#b-hero-middle').addEventListener('click', e => {
        if(canCastSkillOnSelf(skill) || (skill.targets.allies.includes('2') && battle.getCurrentNPCPos() !== Data.FormationPosition.MIDDLE)) {
            battle.target.push(battle.allies[1]);
            if(skill.targets.allies.charAt(0) === '@') {
                if(skill.targets.allies.includes('1')) battle.target.push(battle.allies[2]);
                if(skill.targets.allies.includes('3')) battle.target.push(battle.allies[0]);
            }
            battle.executeSkill();
        }
    });
    document.querySelector('#b-hero-back').addEventListener('click', e => {
        if(canCastSkillOnSelf(skill) || (skill.targets.allies.includes('3') && battle.getCurrentNPCPos() !== Data.FormationPosition.BACK)) {
            battle.target.push(battle.allies[0]);
            if(skill.targets.allies.charAt(0) === '@') {
                if(skill.targets.allies.includes('2')) battle.target.push(battle.allies[1]);
                if(skill.targets.allies.includes('1')) battle.target.push(battle.allies[2]);
            }
            battle.executeSkill();
        }
    });

    // ENEMIES
    document.querySelector('#b-enemy-back').addEventListener('click', e => {
        if(skill.targets.enemies.includes('3')) {
            battle.target.push(battle.enemies[0]);
            if(skill.targets.enemies.charAt(0) === '@') {
                if(skill.targets.enemies.includes('2')) battle.target.push(battle.enemies[1]);
                if(skill.targets.enemies.includes('1')) battle.target.push(battle.enemies[2]);
            }
            battle.executeSkill();
        }
    });
    document.querySelector('#b-enemy-middle').addEventListener('click', e => {
        if(skill.targets.enemies.includes('2')) {
            battle.target.push(battle.enemies[1]);
            if(skill.targets.enemies.charAt(0) === '@') {
                if(skill.targets.enemies.includes('1')) battle.target.push(battle.enemies[2]);
                if(skill.targets.enemies.includes('3')) battle.target.push(battle.enemies[0]);
            }
            battle.executeSkill();
        }
    });
    document.querySelector('#b-enemy-front').addEventListener('click', e => {
        if(skill.targets.enemies.includes('1')) {
            battle.target.push(battle.enemies[2]);
            if(skill.targets.enemies.charAt(0) === '@') {
                if(skill.targets.enemies.includes('2')) battle.target.push(battle.enemies[1]);
                if(skill.targets.enemies.includes('3')) battle.target.push(battle.enemies[0]);
            }
            battle.executeSkill();
        }
    });
}

function canLaunchSkill(skill) {
    const battle = game.currentBattle;
    const pos = battle.allies.indexOf(battle.currentPlay) === -1 ? battle.enemies.indexOf(battle.currentPlay) : battle.allies.indexOf(battle.currentPlay);

    if(skill.launchPos[pos]) return true;
    return false;
}

function battleMovePickTarget() {
    const battle = game.currentBattle;

    const back = document.querySelector('#b-hero-back');
    const middle = document.querySelector('#b-hero-middle');
    const front = document.querySelector('#b-hero-front');

    if(battle.allies.indexOf(battle.currentPlay) !== 0) {
        back.classList.add('battle-target');
        back.addEventListener('click', e => {
            battle.move(battle.currentPlay, Data.FormationPosition.BACK, "a");
            setTimeout(() => {battle.endTurn();}, 300); // the setTimeout is kind of a nasty way of waiting for the CSS animations to finish but meh... will fix that later
        });
    }
    if(battle.allies.indexOf(battle.currentPlay) !== 1) {
        middle.classList.add('battle-target');
        middle.addEventListener('click', e => {
            battle.move(battle.currentPlay, Data.FormationPosition.MIDDLE, "a");
            setTimeout(() => {battle.endTurn();}, 300); 
        });
    }
    if(battle.allies.indexOf(battle.currentPlay) !== 2) {
        front.classList.add('battle-target');
        front.addEventListener('click', e => {
            battle.move(battle.currentPlay, Data.FormationPosition.FRONT, "a");
            setTimeout(() => {battle.endTurn();}, 300); 
        });
    }
}

function generateBattleSkillsEvents() {
    const battle = game.currentBattle;
    const current = battle.currentPlay;
    const skills = current.skills;
    skills.forEach(skill => {
        const sk = document.querySelector('#' + current.name + '-' + skill.id);
        addTooltip(sk, function(){
            return getBattleSkillTooltip(current, skill)
        }, {offY: -8})

        sk.addEventListener('click', e => {
            if(!canLaunchSkill(skill)) {
                addBattleNotification(current.name + ' cannot cast ' + skill.name + ' from the ' + current.getSelfPosInBattle() + '.');
            } else if(current.mana < skill.manaCost) {
                addBattleNotification(current.name + '\'s mana is too low to cast ' + skill.name + '.');
            } else if(!skill.condition.checker()) {
                addBattleNotification('The requirements to cast ' + skill.name + ' are not met.');
            } else if(skill.cooldownCountdown > 0) {
                addBattleNotification(skill.name + ' cannot be casted while on cooldown.');
            } else {
                if(battle.action !== Data.BattleAction.SKILL) {
                    battleCommandsCancelCurrent();
                    battle.action = Data.BattleAction.SKILL;
                    battle.selectedSkill = skill;
                    console.log('Preparing skill with ' + battle.selectedSkill.name);
                    sk.classList.add('battle-skillSelected');
                    battleSkillPickTarget();
                } else if(battle.action === Data.BattleAction.SKILL && battle.selectedSkill !== skill) {
                    battleCommandsCancelCurrent();
                    battleSelectionRemoveHighlights();
                    document.querySelectorAll('.skillSquare').forEach(wpn => {wpn.classList.remove('battle-skillSelected');});
                    battle.action = Data.BattleAction.SKILL;
                    battle.selectedSkill = skill;
                    sk.classList.add('battle-skillSelected');
                    console.log('Preparing skill with ' + battle.selectedSkill.name);
                    battleSkillPickTarget();
                } 
                else battleCommandsCancelCurrent();
            }
        });
    });
}

function generateBattleConsumablesEvents() {

}

function battleCommandsCancelCurrent() {
    const battle = game.currentBattle;

    switch(battle.action) {
        case Data.BattleAction.ATTACK:
            battle.action = null;
            battle.selectedWeapon = null;
            battleSelectionRemoveHighlights();
            document.querySelector('.battle-actionAtk').classList.remove('battle-actionSelected');
            document.querySelectorAll('.battle-weaponIcon').forEach(wpn => {wpn.classList.remove('battle-weaponSelected');})
            getFormationBattleEnemies(true);
            getFormationBattleAllies(true);
            generateBattleFightersEvents();
            console.log('Cancelled: Attack');
            break;
        case Data.BattleAction.SKILL:
            battle.action = null;
            battle.selectedSkill = null;
            battleSelectionRemoveHighlights();
            document.querySelectorAll('.skillSquare').forEach(wpn => {wpn.classList.remove('battle-skillSelected');});
            getFormationBattleEnemies(true);
            getFormationBattleAllies(true);
            generateBattleFightersEvents();
            console.log('Cancelled: Skill');
            break;
        case Data.BattleAction.MOVE:
            battle.action = null;
            battleSelectionRemoveHighlights();
            document.querySelector('.battle-actionMov').classList.remove('battle-actionSelected');
            getFormationBattleAllies(true);
            getFormationBattleEnemies(true);
            generateBattleFightersEvents();
            console.log('Cancelled: Move');
            break;
    }
}

function battleSelectionRemoveHighlights() {
    document.querySelector('#b-enemy-front').classList.remove('battle-target', 'battle-skillTargetSingle', 'battle-skillTargetMultiple');
    document.querySelector('#b-enemy-middle').classList.remove('battle-target', 'battle-skillTargetSingle', 'battle-skillTargetMultiple');
    document.querySelector('#b-enemy-back').classList.remove('battle-target', 'battle-skillTargetSingle', 'battle-skillTargetMultiple');

    document.querySelector('#b-hero-front').classList.remove('battle-skillTargetSingle', 'battle-skillTargetMultiple');
    document.querySelector('#b-hero-middle').classList.remove('battle-skillTargetSingle', 'battle-skillTargetMultiple');
    document.querySelector('#b-hero-back').classList.remove('battle-skillTargetSingle', 'battle-skillTargetMultiple');
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
            if(!game.currentBattle.isEnemyPlaying()) {
                generateBattleSkillsEvents();
                generateBattleConsumablesEvents();
            }
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

    if(skill.condition.message !== '') {
        str += '<div class="rewardsWrapper skillCondition">';
        str += '<h4>Requirements</h4><div class="skillConditionDesc">';
        str += processSkillDescription(skill.condition.message);
        str += '</div></div>';
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
    /*game.currentBattle.order.forEach(elem => {
        if(elem) {
            str += '<div class="playOrderSquare coolBorder" style="background-image: url(\'css/img/chars/' + elem.charset + '\')"></div>';
        }
    });*/

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

    if(fighter instanceof Strider) {
        str += '<div class="battle-toxicityLevel">';
        str += getBattleFighterToxicityLevel(fighter);
        str += '</div>';
    }

    str += '<div class="battle-activeEffects framed">';
    str += getBattleFighterActiveEffects(fighter);
    str += '</div>'

    return str;
}

function getBattleFighterToxicityLevel(fighter) {
    let str = '';

    str += '<div class="battle-toxicityInfos">';
    str += '<div>Toxicity</div>';
    str += '<div>' + fighter.toxicity + '/' + fighter.maxToxicity + '</div>';
    str += '</div>'

    str += '<div class="gaugeProgress"><div class="statGauge toxicity" style="width:'+ Math.round((fighter.toxicity*100)/fighter.maxToxicity) +'%"></div></div>';

    return str;
}

function getBattleFighterActiveEffects(fighter) {
    let str = '';

    if(fighter.activeEffects.length === 0) return '<h4>No active effects</h4>';

    str += '<h4>Active effects</h4>'
    str += '<div class="divider"></div>';
    fighter.activeEffects.forEach(ae => {
        str += '<div class="activeEffect-wrapper">';
        str += '<p class="activeEffectTitle" style="color: ' + (ae.style.color ? ae.style.color : ae.originObject instanceof Skill ? Data.Color.TURQUOISE : '#ddd') + '; font-family: ' + getFontFamilyFromAeStyling(ae.style) + ';">' + ae.name + '</p>';
        ae.effects.forEach(eff => {
            str += eff.getFormatted({noTheorical: true, cssClass: 'activeEffect', includeDuration: true, defaultColor: true});
        });
        if(ae.originObject instanceof Skill) str += '<p class="activeEffect">From: <span style="color:' + Data.Color.TURQUOISE + '">' + ae.originObject.name + '</span>, casted by <span style="color: ' + Data.Color.PURPLE + '">' + ae.originUser.name + '</span> (' + ae.countdown + (ae.countdown > 1 ? ' rounds' : ' round') + ' ago)</p>';
        else if(ae.originObject instanceof Weapon) str += '<p class="activeEffect">From: <span style="color: ' + getRarityColorCode(ae.originObject.rarity) + ';">' + ae.originObject.name + '</span>, wielded by <span style="color: ' + Data.Color.PURPLE + '">' + ae.originUser.name + '</span> (' + ae.countdown + (ae.countdown > 1 ? ' rounds' : ' round') + ' ago)' + '</p>';
        else if(ae.originObject === Data.ActiveEffectType.POWER) str += '<p class="activeEffect">Power emanating from <span style="color: ' + Data.Color.PURPLE + '">' + ae.originUser.name + '</span></p>';
        str += '</div>';
    });

    return str;
}

function addBattleNotification(message) {
    let str = '';

    str += '<div class="battle-notification">';
    str += message;
    str += '</div>';

    document.querySelector('.battle-notifications').innerHTML = str;
}

function drawExplorationScreen() {
    document.querySelector('#explorationDiv').innerHTML = '<div class="explorationContainer"></div>';

    const dungeon = game.currentDungeon;
    const floor = dungeon.currentFloor;

    let str ='';

    str += '<div id="exploration-mapPanel" class="coolBorder">'
    str += '<div class="exploration-repositionMap"></div>';
    str += '<div class="exploration-mapContainer">';
    str += '<div class="exploration-map" style="width: ' + (floor.gridSize[1] * 50) + 'px; height: ' + (floor.gridSize[0] * 50) + 'px;">';
    floor.clusters.forEach(cl => {
        const cluster = 'parentCluster-' + cl.id;
        str += '<div id="cl-' + cl.id + '" class="map-clusterContainer" style="top: ' + cl.coordinates[0] * 50 + 'px; left: ' + cl.coordinates[1] * 50 + 'px;"></div>';
        cl.childrenRooms.forEach(ch => {
            str += '<div id="ch-' + ch.id + '" class="' + cluster + ' map-roomContainer coolBorder' + (ch === floor.currentRoom ? ' visitedRoom currentRoom' : ' hiddenRoom') + '" style="top: ' + ch.coordinates[0] * 50 + 'px; left: ' + ch.coordinates[1] * 50 + 'px;"></div>';
        });        
    })
    str += '</div>';
    str += '</div>';
    str += '<img class="mapCornerTl" src="css/img/map_tl_corner.png" />';
    str += '<img class="mapCornerTr" src="css/img/map_tr_corner.png" />';
    str += '<img class="mapCornerBl" src="css/img/map_bl_corner.png" />';
    str += '<img class="mapCornerBr" src="css/img/map_br_corner.png" />';
    str += '<div class="map-dungeonName">' + dungeon.name + '</div>';
    str += '</div>';


    str += '<div id="exploration-infosPanel" class="coolBorderBis">';
    str += drawExplorationInfosPanel();
    str += '</div>';

    document.querySelector('.explorationContainer').innerHTML = str;

    drawMapConnectors();
    bringRoomsForward();
    generateExplorationMapEvents();
    generateExplorationInfosPanelEvents();
    generateMapRoomsEvents();
    recenterDungeonMap();
}

function generateExplorationInfosPanelEvents() {
    const currentRoom = game.currentDungeon.currentFloor.currentRoom;
    const delay = currentRoom.isCleared() ? 0 : 1;
    displayTextLetterByLetter(currentRoom.getRoomDescription(), '.infosPanel-roomDesc', delay);

    const enter = document.querySelector('.roomActions-action.enter');
    const scout = document.querySelector('.roomActions-action.scout');
    const search = document.querySelector('.roomActions-action.search');

    if(enter) {

    }
    if(scout) {
        scout.addEventListener('click', e => {
            dungeonScoutEvent();
        });
    }
    if(search) {
        search.addEventListener('click', e => {
            dungeonSearchEvent();
        });
    }
}

function dungeonScoutEvent() {
    const scout = document.querySelector('.roomActions-action.scout');
    const currentRoom = game.currentDungeon.currentFloor.currentRoom;
    if(currentRoom.scout()) {
        const sfCv = document.querySelector('#solarFireflyCanvas');
        
        Quanta.burst({
            canvas: sfCv,
            color: Data.Color.ORANGE,
            amount: 100,
            particleSize: 4,
            duration: 4000,
            fadeAwayRate: 0,
            speed: {
                x: () => { return (-2 + Math.random() * 2) },
                y: () => { return (-4 + Math.random() * 10) }
            },
            delay: () => { return getRandomNumber(0, 100) }
        });

        document.querySelector('.infosPanel-roomHeader').classList.add('roomHeader-animateReveal');
        setTimeout(() => {
            document.querySelector('.roomHeader-type').textContent = currentRoom.type;
            document.querySelector('.roomHeader-type').classList.add('roomType-animateReveal');
        }, 500);

        dungeonActionApplyScoutedStyle(scout);
        if(currentRoom.canSearch()) {
            document.querySelector('.roomActions-action.enter').outerHTML = getDungeonSearchButton(true);
            document.querySelector('.roomActions-action.search').addEventListener('click', e => {
                dungeonSearchEvent();
            });
            document.querySelector('.roomActions-action.search').classList.add('revealSearchButton');
        }

        clearCurrentDungeonPanelDesc();
        console.log(currentRoom);
        setTimeout(() => {displayTextLetterByLetter(currentRoom.getRoomDescription(), '.infosPanel-roomDesc', 1);}, 10);
    }
}

function dungeonSearchEvent() {
    const search = document.querySelector('.roomActions-action.search');
    const currentRoom = game.currentDungeon.currentFloor.currentRoom;
    if(!currentRoom.isCleared()) {
        currentRoom.foundLoot = LootTable.Generators.generateLoot(LootTable.Presets.Dungeon[currentRoom.type]);
        drawDungeonFoundLoot(true);

        let quantadelay = 0;
        document.querySelectorAll('.revealingLootCanvas').forEach(cv => {
            setTimeout(() => {
                let params = getQuantaBurstParamsFromRarity(cv.classList[1]);

                Quanta.burst({
                    canvas: cv,
                    color: params.color,
                    amount: params.amount,
                    particleSize: params.particleSize
                });
            }, quantadelay);
            quantadelay += 250;
        })
        clearCurrentRoom();

        dungeonActionApplySearchedStyle(search);
    }
}

function dungeonActionApplyEnteredStyle(html) {
    html.querySelector('h4').textContent = 'Entered';
    html.classList.add('disabledActionButton');
}

function dungeonActionApplyScoutedStyle(html) {
    html.querySelector('h4').textContent = 'Scouted';
    html.querySelector('h6').remove();
    html.classList.add('disabledActionButton');
}

function dungeonActionApplySearchedStyle(html) {
    html.querySelector('h4').textContent = 'Searched';
    html.classList.add('disabledActionButton');
}

function displayTextLetterByLetter(text, dom, delay = 1) {
    game.textDisplaySwitch = false;
    let index = 0;
    dom = document.querySelector(dom);

    if(delay === 0) {
        dom.innerHTML = text;
        return;
    }

    function displayNextLetter() {
        if(index < text.length && !game.textDisplaySwitch) {
            const letter = text[index];
            dom.innerHTML += letter;

            index++;
            setTimeout(displayNextLetter, delay)
        }
    }

    displayNextLetter();
}

function stopDisplayTextLetterByLetter() {
    game.textDisplaySwitch = true;
}

function clearCurrentDungeonPanelDesc() {
    stopDisplayTextLetterByLetter();
    document.querySelector('.infosPanel-roomDesc').innerHTML = '';
}

function clearCurrentRoom() {
    game.currentDungeon.currentFloor.currentRoom.clear();
    document.querySelector('.infosPanel-roomHeader').classList.add('clearedHeader');
    document.querySelector('.roomHeader-status').innerHTML = game.currentDungeon.currentFloor.currentRoom.status;

    clearCurrentDungeonPanelDesc();
    setTimeout(() => {displayTextLetterByLetter(game.currentDungeon.currentFloor.currentRoom.getRoomDescription(), '.infosPanel-roomDesc', 0);}, 10);
}

function drawDungeonFoundLoot(refresh = false) {
    let loot = game.currentDungeon.currentFloor.currentRoom.foundLoot;

    let str = '';
    str += '<div class="divider"></div>'

    if(loot.length > 0) {
        let timer = 0;
        str += '<div class="roomLootResult-title">Loot found</div>';
        loot.forEach(lo => {
            str += '<div class="roomLootResult-listItem sigilInfo revealingLoot" style="animation-delay: ' + timer + 's;' + (lo.type === 'gold' ? 'background-image: url(\'css/img/goldicon.png\'); background-size: 25%;' : getIcon(lo.item, 25, true)) + '">';
            str += '<div class="sigilTitle" style="text-align: left">' + '<span class="lootQuantity">' + lo.amount + ' </span>' + (lo.type === 'gold' ? '<span class="smallThingNoIcon" style="color: yellow">Gold</span>' : getSmallThingNoIcon(lo.item, null)) + '</div>';
            str += '<div class="revealingLootAnim revealLoot' + (lo.type === 'gold' ? 'Gold' : capitalizeFirstLetter(lo.item.rarity)) + '" style="animation-delay: ' + (timer) + 's;"></div>';
            if(refresh) str += '<canvas class="revealingLootCanvas ' + (lo.type === 'gold' ? 'gold' : lo.item.rarity) + '"></canvas>';
            str += '</div>';
            timer += 0.25;
        });
    } else {
        str += '<div class="roomLootResult-title">No loot found</div>';
    }

    if(refresh) {
        document.querySelector('.infosPanel-actionResult').innerHTML = str;
        return;
    }
    return str;
}

function drawDungeonStats() {
    let str = '';
    return str;
}

function drawExplorationInfosPanel(refresh = false) {
    let str = '';
    const currentRoom = game.currentDungeon.currentFloor.currentRoom;
    const actions = currentRoom.getActions();

    str += '<div class="infosPanel-roomHeader' + (currentRoom.status === Data.DungeonRoomStatus.CLEARED ? ' clearedHeader' : '') + '">';
    str += '<div class="roomHeader-status">' + currentRoom.status + '</div>';
    str += '<div class="roomHeader-type">' + (currentRoom.identified ? currentRoom.type : 'Unknown') + '</div>';
    str += '</div>';

    str += '<div class="infosPanel-roomDesc">';
    str += '</div>';

    str += '<div class="infosPanel-roomActions">';
    str += drawDungeonPanelActions()
    str += '</div>';

    str += '<div class="infosPanel-actionResult">';
    if(currentRoom.foundLoot) str += drawDungeonFoundLoot();
    str += '</div>';

    str += '<div class="infosPanel-dungeonStats">';
    str += drawDungeonStats();
    str += '</div>'

    if(refresh) {
        document.querySelector('#exploration-infosPanel').innerHTML = str;
        return;
    }
    return str;
}

function drawDungeonPanelActions(refresh = false) {
    let str = '';
    const actions = game.currentDungeon.currentFloor.currentRoom.getActions();

    if(actions.includes(Data.DungeonRoomAction.ENTER)) {
        str += getDungeonEnterButton(actions.includes(Data.DungeonRoomAction.SCOUT));
    }
    if(actions.includes(Data.DungeonRoomAction.SCOUT)) {
        str += getDungeonScoutButton();
    }
    if(actions.includes(Data.DungeonRoomAction.SEARCH)) {
        str += getDungeonSearchButton(actions.includes(Data.DungeonRoomAction.SCOUT));
    }

    if(refresh) {
        document.querySelector('.infosPanel-roomActions').innerHTML = str;
        return;
    }
    return str;
}

function revealCluster(cluster) {
    document.querySelectorAll('.parentCluster-' + cluster.id).forEach(ro => {
        ro.classList.remove('hiddenRoom');
        ro.classList.add('revealedRoom');
    })
}

function generateMapRoomsEvents() {
    game.currentDungeon.currentFloor.rooms.forEach(room => {
        const nextRoom = room.nextRoom || null;
        const previousRoom = room.previousRoom || null;

        const roomDom = document.querySelector('#ch-' + room.id);
        const nextRoomDom = nextRoom ? document.querySelector('#ch-' + nextRoom.id) : null;
        const previousRoomDom = previousRoom ? document.querySelector('#ch-' + previousRoom.id) : null;

        // When clicking on a room tile
        roomDom.addEventListener('click', e => {
            // Only works if clicking on an accessible tile (next or previous room to the current one)
            if(nextRoom === game.currentDungeon.currentFloor.currentRoom || previousRoom === game.currentDungeon.currentFloor.currentRoom) {
                if(!room.revealed) {
                    room.revealed = true;
                    roomDom.classList.remove('revealedRoom');
                    roomDom.classList.add('visitedRoom');

                    if(previousRoom) {
                        let prevLine = document.querySelector('#connector_' + previousRoom.id + '_to_' + room.id);
                        console.log(prevLine);
                        if(!previousRoom.revealed) prevLine.classList.add('canVisitConnector');
                        else {
                            prevLine.classList.remove('canVisitConnector');
                            prevLine.classList.add('visitedConnector');
                        }

                        if(previousRoomDom) {
                            if(previousRoomDom.classList[0] !== roomDom.classList[0]) revealCluster(previousRoom.parentCluster);
                        }
                    }
                    if(nextRoom) {
                        let nextLine = document.querySelector('#connector_' + room.id + '_to_' + nextRoom.id);
                        console.log(nextLine);
                        if(!nextRoom.revealed)  nextLine.classList.add('canVisitConnector');
                        else {
                            nextLine.classList.remove('canVisitConnector');
                            nextLine.classList.add('visitedConnector');
                        }

                        if(nextRoomDom) {
                            if(nextRoomDom.classList[0] !== roomDom.classList[0]) revealCluster(nextRoom.parentCluster);
                        }
                    }   
                }

                // Moving backward
                if(nextRoom === game.currentDungeon.currentFloor.currentRoom) {
                    nextRoomDom.classList.remove('currentRoom');
                    game.currentDungeon.currentFloor.moveToPreviousRoom();
                }
                // Moving forward
                else if(previousRoom === game.currentDungeon.currentFloor.currentRoom) {
                    previousRoomDom.classList.remove('currentRoom');
                    game.currentDungeon.currentFloor.moveToNextRoom();
                }

                roomDom.classList.add('currentRoom');
                drawExplorationInfosPanel(true);
                generateExplorationInfosPanelEvents();
            }
        });
    })
}

function drawMapConnectors() {
    const parent = document.querySelector('.exploration-map');

    let str = '';

    str += '<svg class="mapConnectorsOverlay" height="' + parent.scrollHeight + '" width="' + parent.offsetWidth + '">';

    revealCluster(game.currentDungeon.currentFloor.currentRoom.parentCluster);
    const currentRoom = game.currentDungeon.currentFloor.currentRoom;
    const currentRoomDom = document.querySelector('#ch-' + currentRoom.id);
    if(currentRoom.previousRoom) {
        let previousRoomDom = document.querySelector('#ch-' + currentRoom.previousRoom.id);
        if(currentRoomDom.classList[0] !== previousRoomDom.classList[0]) revealCluster(currentRoom.previousRoom.parentCluster);
    }
    if(currentRoom.nextRoom) {
        let nextRoomDom = document.querySelector('#ch-' + currentRoom.nextRoom.id);
        if(currentRoomDom.classList[0] !== nextRoomDom.classList[0]) revealCluster(currentRoom.nextRoom.parentCluster);
    }

    game.currentDungeon.currentFloor.rooms.forEach(room => {
        if(!room.nextRoom) return;
        const elem = document.querySelector('#ch-' + room.id);
        
        const basePos = elem.getBoundingClientRect();
        const basePosOriginX = (elem.offsetLeft + basePos.width / 2) + 4.5;
        const basePosOriginY = (elem.offsetTop + basePos.height / 2) + 4.5;

        const nextRoomDom = document.querySelector('#ch-' + room.nextRoom.id);
        const targetPos = nextRoomDom.getBoundingClientRect();
        const targetPosOriginX = (nextRoomDom.offsetLeft + targetPos.width / 2) + 4.5;
        const targetPosOriginY = (nextRoomDom.offsetTop + targetPos.height / 2) + 4.5;
        const id = 'connector_' + room.id + '_to_' + room.nextRoom.id;

        let color = '';
        if(room.revealed) {
            if(!room.nextRoom.revealed) color = ' canVisitConnector';
        }
        if(!room.revealed && room.nextRoom.revealed) color = ' canVisitConnector';

        str += '<line class="mapConnector' + color + '" id="' + id + '" x1="' + basePosOriginX + '" y1="' + basePosOriginY + '" x2="' + targetPosOriginX + '" y2="' + targetPosOriginY + '" style="stroke-width: 1;" />';
    });

    str += '</svg>';

    parent.innerHTML += str;
}

function bringRoomsForward() {
    document.querySelectorAll('.map-roomContainer').forEach(single => {
        single.style.zIndex = '1';
    });
    document.querySelectorAll('.map-clusterContainer').forEach(single => {
        single.style.zIndex = '1';
    });
}

function generateExplorationMapEvents() {
    let zoomLevel = 1;
    const map = document.querySelector('.exploration-map');
    const mapContainer = document.querySelector('.exploration-mapContainer');

    mapContainer.addEventListener('wheel', e => {
        map.style.transition = '';
        mapContainer.style.transition = '';
        e.preventDefault();

        const direction = Math.sign(e.deltaY);

        zoomLevel += -direction * 0.65;
        zoomLevel = Math.max(0.65, zoomLevel);
        zoomLevel = Math.min(1, zoomLevel);

        map.style.transform = 'scale(' + zoomLevel + ')';
    });
    mapContainer.addEventListener('mousedown', e => {
        map.style.transition = '';
        mapContainer.style.transition = '';
        var moving = true;

        var initX = e.clientX;
        var initY = e.clientY;

        mapContainer.addEventListener('mousemove', e => {
            if(!moving) return;

            const deltaX = e.clientX - initX;
            const deltaY = e.clientY - initY;
            initX = e.clientX;
            initY = e.clientY;

            let left = isNaN(parseInt(map.style.left)) ? 0 : parseInt(map.style.left);
            let top = isNaN(parseInt(map.style.top)) ? 0 : parseInt(map.style.top);
            let offsetLeft = left + deltaX;
            let offsetTop = top + deltaY;
            map.style.left = offsetLeft + 'px';
            map.style.top = offsetTop + 'px';
            /*let divider = map.style.transform === 'scale(0.5)' ? 4 : 6;
            mapContainer.style.backgroundPositionX = (offsetLeft/divider) + 'px';
            mapContainer.style.backgroundPositionY = (offsetTop/divider) + 'px';*/
        });

        mapContainer.addEventListener('mouseup', e => {
            moving = false;
        });
        mapContainer.addEventListener('mouseleave', e => {
            moving = false;
        });
    });
    document.querySelector('.exploration-repositionMap').addEventListener('click', e => {
        const current = game.currentDungeon.currentFloor.currentRoom;
        const currentDom = document.querySelector('#ch-' + current.id);
        console.log(currentDom);

        var targetLeft = (mapContainer.offsetWidth / 2) - (currentDom.offsetWidth / 2);
        var targetTop = (mapContainer.offsetHeight / 2) - (currentDom.offsetHeight / 2);
        targetLeft -= parseFloat(currentDom.style.left);
        targetTop -= parseFloat(currentDom.style.top);

        map.style.transition = 'transform .2s cubic-bezier(.49,-0.02,0,1.05) 0s, left .2s cubic-bezier(.49,-0.02,0,1.05) 0s, top .2s cubic-bezier(.49,-0.02,0,1.05) 0s';
        mapContainer.style.transition = 'background-position-x .5s cubic-bezier(1,0,0,1), background-position-y .5s cubic-bezier(1,0,0,1)';
        map.style.transform = 'scale(1)';
        map.style.left = targetLeft + 'px';
        map.style.top = targetTop + 'px';
        /*mapContainer.style.backgroundPositionX = '0px';
        mapContainer.style.backgroundPositionY = '0px';*/
    })
}

function recenterDungeonMap() {
    document.querySelector('.exploration-repositionMap').dispatchEvent(new Event('click'));
}

function drawEonScreen() {
    document.querySelector('#eonsDiv').innerHTML = '<div class="eonsContainer"></div>';
    let str = '';

    str += '<div class="diary">';

    str += '<div class="diaryFirstCol">';
    str += '<div class="leftPage pages">';
    str += '<h2 class="leftPageTitle pageTitle">Eons</h2>';
    str += '<div class="eonsBorder"></div>';
    str += '<input class ="eonSearchBar" type="text" id="eonSearchInput" placeholder="Search eon..." />';
    str += '<div class="eonTitlesContainer">';


    str += drawEonTitles();

    str += '</div>';
    str += '</div>';
    str += '</div>';

    str += '<div class="diarySecondCol">';
    str += '<div class="rightPage pages">';
    str += '<h2 class="rightPageTitle pageTitle">Fragments</h2>';
    str += '<div class="eonsBorder"></div>';
    str += '<div class="eonFragmentsContainer">';

    str += '</div>';
    str += '</div>';
    str += '</div>';

    str += '</div>';

    document.querySelector('.eonsContainer').innerHTML = str;

    generateEonEvents();
    searchEon();
}

function addEonTitlesContainerOverflowYScroll() {
    const eonTitlesContainer = document.querySelector('.eonTitlesContainer');
    if(!isElementEmpty(eonTitlesContainer)) {
        eonTitlesContainer.style.overflowY = "scroll";
    }
}

function addEonFragmentsContainerOverflowYScroll() {
    const eonFragmentsContainer = document.querySelector('.eonFragmentsContainer');
    if(!isElementEmpty(eonFragmentsContainer)) {
        eonFragmentsContainer.style.overflowY = "scroll";
    }
}


function generateEonEvents() {
    const eonTitles = document.querySelectorAll('.eonTitle');

    eonTitles.forEach((title, index) => {
        title.addEventListener('click', () => {
            drawEonFragments(game.all_majorEons[index], true);
    
            eonTitles.forEach(otherTitle => {
                otherTitle.classList.remove('eonTitleActive');
            });
      
            title.classList.add('eonTitleActive');
        });
    });
}

function drawEonTitles(refresh = false) {
    let str = '';

    game.all_majorEons.forEach(eon => {
        if (eon.unlocked) {
            str += '<div class="eonTitle">';
            str += '<div class="eonTitleBullet"></div>';
            str += '<p class="eonTitleContent">';
            str += eon.title;
            str += '</p>';
            str += '</div>';
        }
    });

    if(refresh) {
        document.querySelector('.eonTitlesContainer').innerHTML = str;
        generateEonEvents();
        searchEon(true);
        addEonTitlesContainerOverflowYScroll();
        return;
    }
    return str;
}

function drawEonFragments(eon, refresh = false) {
    let str = '';
    eon.fragments.forEach(fragment => {
        if (fragment.unlocked) {
            str += '<div class="eonFragment">';
            str += fragment.text;
            str += '</div>';
        }
    });

    document.querySelector('.eonFragmentsContainer').innerHTML = str;

    if (refresh) {
        addEonFragmentsContainerOverflowYScroll();
    }
}

function searchEon(refresh = false) {
    const eonSearchBar = document.querySelector('.eonSearchBar');
    const eonsTitles = document.querySelectorAll('.eonTitle');

    eonSearchBar.addEventListener('input', e => {
        const value = eonSearchBar.value.toLowerCase().trim();

        eonsTitles.forEach(title => {
            const titleText = title.querySelector('.eonTitleContent').innerText.toLowerCase();

            if (titleText.includes(value)) {
                title.style.display = 'flex';
            } else {
                title.style.display = 'none';
            }
        });
    });

    if(refresh) {
        eonSearchBar.value = '';
    }
}
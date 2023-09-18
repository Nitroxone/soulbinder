/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

/**
 * Spawns a floating tooltip on screen based on the provided Item's data.
 * @param {Item|array} item the Item data to fill the tooltip with
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
    else if(item[0] === 'bonuses') tooltip.innerHTML = base + getStriderBonusesTooltip(item[1]) + '</div>';
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

    if(item[0] === 'bonuses') {
        const strider = item[1];
        const detailsToggler = tooltip.querySelector('.btToggler-details');
        const extraToggler = tooltip.querySelector('.btToggler-extra');
        const echoesToggler = tooltip.querySelector('.btToggler-echoes');
        const equipmentToggler = tooltip.querySelector('.btToggler-equipment');

        generateBonusesTooltipListEvents(tooltip);
        if(detailsToggler && extraToggler && echoesToggler) {
            var extra = false;
            var echoes = false;
            var details = false;
            var equipment = false;

            var echoesList = strider.echoes;

            detailsToggler.addEventListener('click', e => {
                tooltip.querySelectorAll('.btNumber').forEach(bt => {
                    bt.classList.toggle('show-ib');
                });
                detailsToggler.classList.toggle('off');
                details = !details;
                Sounds.Methods.playSound(Data.SoundType.SELECTOR);
            });
            extraToggler.addEventListener('click', e => {
                if(details) detailsToggler.dispatchEvent(new Event('click'));

                extra = !extra;
                tooltip.querySelector('.bonusesTooltip-bonuses').innerHTML = getStriderBonusesList(generateBonusesTable({bonuses: strider.bonuses, noExtra: extra, noEchoes: echoes, noEquipment: equipment}), strider.echoes);

                generateBonusesTooltipListEvents(tooltip);
                extraToggler.classList.toggle('off');
                Sounds.Methods.playSound(Data.SoundType.SELECTOR);
            });
            echoesToggler.addEventListener('click', e => {
                if(details) detailsToggler.dispatchEvent(new Event('click'));

                echoes = !echoes;
                echoesList = echoes ? [] : strider.echoes;
                tooltip.querySelector('.bonusesTooltip-bonuses').innerHTML = getStriderBonusesList(generateBonusesTable({bonuses: strider.bonuses, noExtra: extra, noEchoes: echoes, noEquipment: equipment}), echoesList);
                
                generateBonusesTooltipListEvents(tooltip);
                echoesToggler.classList.toggle('off');
                Sounds.Methods.playSound(Data.SoundType.SELECTOR);
            });
            equipmentToggler.addEventListener('click', e => {
                if(details) detailsToggler.dispatchEvent(new Event('click'));

                equipment = !equipment;
                tooltip.querySelector('.bonusesTooltip-bonuses').innerHTML = getStriderBonusesList(generateBonusesTable({bonuses: strider.bonuses, noExtra: extra, noEchoes: echoes, noEquipment: equipment}), strider.echoes);
                
                generateBonusesTooltipListEvents(tooltip);
                equipmentToggler.classList.toggle('off');
                Sounds.Methods.playSound(Data.SoundType.SELECTOR);
            });
        }
    }

    // IF ASTRAL FORGE COMPATIBLE, ADD ASTRAL FORGE MODIFICATIONS TOOLTIP EVENT
    if(item instanceof Weapon || item instanceof Armor || item instanceof Trinket) {
        if(item.astralForgeItem.isModified() || item.hasSigil()) {
            addTooltip(tooltip.querySelector('.editedIcon'), function(){
                return getItemAlterationsTooltip(item)
            }, {offY: -8});
            tooltip.querySelector('.editedIcon').addEventListener('contextmenu', e => {
                e.preventDefault();
                e.stopImmediatePropagation();
            })
        }
    }

    document.body.appendChild(tooltip);
}

function generateBonusesTooltipListEvents(tooltip) {
    tooltip.querySelectorAll('.bonusesTooltip-single').forEach(bo => {
        bo.addEventListener('click', () => {
            bo.classList.toggle('extended');
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
        });
    });
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

    str += '<div class="divider"></div>';
    if(trinket.hasSigil()) str += getSigilDetails(trinket.sigil, full);
    else str += getEmptySigilHTML();

    if(trinket.hasEcho()) {
        str += '<div class="divider"></div>';
        str += getEchoDetails(trinket.echo, full);
    }

    str += '<div class="divider"></div>';
    str += '<div class="par tooltipDesc">' + trinket.desc + '</div>';
    if(trinket.set) str += '<div class="tooltipSetText">' + trinket.set + '</div>';
    str += '</div></div>';

    if(trinket.astralForgeItem.isModified() || trinket.alterations.length > 0) str += '<div class="editedIcon" id="editedIcon-' + trinket.id + '"></div>';

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
        str += '<p>' + processEchoDesc(echo) +'</p>'
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
    str += '<tr><td>Sharpness</td><td>' + weapon.sharpness[0] + '-' + weapon.sharpness[1] + '</td></tr>';
    str += '<tr><td>Withering</td><td>' + weapon.withering[0] + '-' + weapon.withering[1] + '</td></tr>';
    str += '<tr><td>Block</td><td>' + weapon.block + '<span class="theoricalval">[' + weapon.t_block[0] + '-' + weapon.t_block[1] +']</span>' + '</td></tr>';
    str += '<tr><td>Effort</td><td>' + weapon.effort + '<span class="theoricalval">[' + weapon.t_effort[0] + '-' + weapon.t_effort[1] +']</span>' + '</td></tr>';
    str += '<tr><td>Crit. chance</td><td>' + weapon.crit_luk + '%' + '<span class="theoricalval">[' + weapon.t_crit_luk[0] + '-' + weapon.t_crit_luk[1] +']</span>' + '</td></tr>';
    str += '<tr><td>Crit. DMG</td><td>' + weapon.crit_dmg + '<span class="theoricalval">[' + weapon.t_crit_dmg[0] + '-' + weapon.t_crit_dmg[1] +']</span>' + '</td></tr>';
    str += '<tr><td>Bleed</td><td>' + weapon.bleed[0] + ' DMG' + '<span class="theoricalval">[' + weapon.t_bleed[0][0] + '-' + weapon.t_bleed[0][1] +']</span>' + '<br>' + weapon.bleed[1] + ' round(s)'+ '<span class="theoricalval">[' + weapon.t_bleed[1][0] + '-' + weapon.t_bleed[1][1] + ']</span>' + '<br>' + (weapon.bleed[2] ? 'Curable' : 'Non-curable') + '</td></tr>';
    str += '<tr><td>Poison</td><td>' + weapon.poison[0] + ' DMG' + '<span class="theoricalval">[' + weapon.t_poison[0][0] + '-' + weapon.t_poison[0][1] +']</span>' + '<br>' + weapon.poison[1] + ' round(s)' + '<span class="theoricalval">[' + weapon.t_poison[0][0] + '-' + weapon.t_poison[0][1] +']</span>' + '<br>' + (weapon.poison[2] ? 'Curable' : 'Non-curable') + '</td></tr>';
    str += '<tr><td>Range</td><td>' + getRangeString(weapon.range) + '</td></tr>';
    str += '</tbody></table>';
    str += '<div class="par"></div>';

    str += '<div class="divider"></div>';
    if(weapon.hasSigil()) str += getSigilDetails(weapon.sigil, full);
    else str += getEmptySigilHTML();

    if(weapon.hasEcho()) {
        str += '<div class="divider"></div>';
        str += getEchoDetails(weapon.echo, full);
    }

    // desc
    str += '<div class="divider"></div>';
    str += '<div class="par tooltipDesc">' + weapon.desc + '</div>';
    if(weapon.set) str += '<div class="tooltipSetText">' + weapon.set + '</div>';
    str += '</div>';

    if(weapon.astralForgeItem.isModified() || weapon.alterations.length > 0) str += '<div class="editedIcon" id="editedIcon-' + weapon.id + '"></div>';

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
    if(armor.resilience.getValue() !== 0) str += '<tr><td>Resilience</td><td>' + armor.resilience.getFormatted({noName: true}) + '</td></tr>';
    if(armor.warding.getValue() !== 0) str += '<tr><td>Warding</td><td>' + armor.warding.getFormatted({noName: true}) + '</td></tr>';
    str += '</tbody></table>';
    str += '<div class="par"></div>';

    str += '<div class="divider"></div>';
    if(armor.hasSigil()) str += getSigilDetails(armor.sigil, full);
    else str += getEmptySigilHTML();

    if(armor.hasEcho()) {
        str += '<div class="divider"></div>';
        str += getEchoDetails(armor.echo, full);
    }

    // desc
    str += '<div class="divider"></div>';
    str += '<div class="par tooltipDesc">"' + armor.desc + '"</div>';
    if(armor.set) str += '<div class="tooltipSetText">' + armor.set + '</div>';
    str += '</div>';

    if(armor.astralForgeItem.isModified() || armor.alterations.length > 0) str += '<div class="editedIcon" id="editedIcon-' + armor.id + '"></div>';

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
        if(full || soulbindingFormat) str += '<p style="' + (soulbindingFormat ? 'display: none; ' : '') + '">' + processEchoDesc(echo) +'</p>';
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
        if(!soulbindingFormat) {
            str += '<br>';
            str += '<div class="echoDesc">' + processEchoDesc(echo) + '</div>'
            str += '<br>';
            str += '<div class="echoQuote">' + echo.quote + '</div>';
        }
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

function drawWeaponInventory(weapons = game.inventory.weapons) {
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

function drawSigilInventory(sigils = game.inventory.sigils) {
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

function drawArmorInventory(armors = game.inventory.armors) {
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

function drawTrinketInventory(trinkets = game.inventory.trinkets) {
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
    drawWeaponInventory();
    drawArmorInventory();
    drawSigilInventory();
    drawResourceInventory();
    drawTrinketInventory();
    drawConsumablesInventory();
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
    str += '<div class="striderStats-title">';
    str += 'Stats';
    str += '<div id="bonusesIcon-' + strider.id + '" class="striderStats-bonusesIcon"></div>';
    str += '</div>';
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

    const striderBonuses = document.querySelector('#bonusesIcon-' + strider.id);
    addTooltip(striderBonuses, function(){
        return getStriderBonusesTooltip(strider, true);
    }, {offY: -8});
    striderBonuses.addEventListener('click', e => {
        spawnTooltip(['bonuses', strider]);
        Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
    })

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

function getStriderBonusesTooltip(strider, static = false) {
    let str = '';

    if(static) str += '<div class="bonusesTooltip-title">Click to view bonuses</div>';
    else {
        const bonuses = generateBonusesTable({bonuses: strider.bonuses});

        str += '<div class="bonusesTooltip">';
        str += '<div class="bonusesTooltip-title">Bonuses</div>';
        str += '<div class="divider"></div>';

        str += '<div class="bonusesTooltip-list">';
        if(bonuses.length === 0 && strider.echoes.length === 0) str += '<div class="emptyTag" style="width: 100%; text-align: center;">No bonuses</div>';
        else {
            str += '<div class="bonusesTooltip-togglers">';
            str += '<div class="toggleButton off btToggler-details">Show details</div>';
            str += '<div class="toggleButton off btToggler-equipment">Hide gear</div>';
            str += '<div class="toggleButton off btToggler-extra">Hide skills & passive</div>';
            str += '<div class="toggleButton off btToggler-echoes">Hide echoes</div>';
            str += '</div>';

            str += '<div class="divider"></div>';

            str += '<div id="bt-' + strider.id + '" class="bonusesTooltip-bonuses">';
            str += getStriderBonusesList(bonuses, strider.echoes);
            str += '</div>';
        }
        str += '</div></div>';
    }

    return str;
}

function getStriderBonusesList(bonuses, echoes = []) {
    let str = '';

    if(bonuses.length === 0) str += '<div class="emptyTag" style="width: 100%; text-align: center;">No bonuses</div>';
    else bonuses.forEach(bonus => {
        const stat = new Stat({effect: bonus.effect, theorical: bonus.total, fixed: true, isPercentage: isAstralForgeEffectPercentage(bonus.effect)});

        str += '<div class="bonusesTooltip-single">';
        str += '<h3>' + stat.getFormatted({noTheorical: true, defaultColor: true}) + '</h3>';
        str += '<div class="bonusesTooltip-single-details">';
        str += '<h4>From:</h4>';
        bonus.origins.forEach(ori => {
            str += '<h5 class="' + getBonusCssClassName(ori) + '" style="color: ' + getBonusCssClassRarity(ori) + '"><span class="btNumber">[' + ori.value + ']</span>' + (typeof ori.item === "string" ? ori.item : ori.item.name) + '</h5>';
        })
        str += '</div>';
        str += '</div>';
    });

    str += '<div class="divider"></div>';
    
    if(echoes.length === 0) str += '<div class="emptyTag" style="width: 100%; text-align: center;">No echoes</div>';
    else echoes.forEach(echo => {
        str += '<div class="bonusesTooltip-single bonusesTooltipEcho">';
        str += '<h3 style="color: ' + getRarityColorCode(echo.rarity) + '">' + echo.name + '</h3>';
        str += '<div class="bonusesTooltip-single-details">';
        str += '<h4>From: <span class="bonusesTooltipEcho-orig" style="color: ' + getRarityColorCode(echo.parent.rarity) + '">' + echo.parent.name + '</span></h4>'
        str += processEchoDesc(echo);
        str += '</div>';
        str += '</div>';
    })

    return str;
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

    drawBlackMarket();
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
    generateSoulreadingInterfaceEvents();
}

function drawSoulwritingScreen() {
    let str = '';

    str += '<div class="soulwTabs">';
    str += '<div id="soulwtab-read" class="soulwTab' + (game.soulwriting.currentTab === 'read' ? ' activeTab' : '') + '">Read</div>';
    str += '<div id="soulwtab-write" class="soulwTab' + (game.soulwriting.currentTab === 'write' ? ' activeTab' : '') + '">Write</div>';
    str += '<div id="soulwtab-bend" class="soulwTab' + (game.soulwriting.currentTab === 'bend' ? ' activeTab' : '') + '">Bend</div>';
    str += '</div>';

    str += '<div id="soulwcontent-read" class="soulwContent" style="display: grid">'
    str += getSwRead();
    str += '</div>';

    str += '<div id="soulwcontent-write" class="soulwContent" style="display: none">'
    str += getSwWrite();
    str += '</div>';

    str += '<div id="soulwcontent-bend" class="soulwContent">BENDING</div>';

    return str;
}

function drawSoulwritingLines(refresh = false) {
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

    if(!refresh) parent.innerHTML += str;
    else document.querySelector('.soulwritingOverlay').outerHTML = str;

    document.querySelectorAll('.swWriteSlot').forEach(slot => {
        slot.style.zIndex = '1';
    })
}

function generateSwSoulmarksEvents() {
    const soulmarks = document.querySelectorAll('.swWriteList-single');

    soulmarks.forEach(sm => {
        sm.addEventListener('click', e => {
            const id = sm.id.slice(3);
            const slmrk = Config.Soulwriting.find(s => s.name == id);
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
                const regular = new Stat({effect: slmrk.effect, theorical: slmrk.getCurrent()});

                str += '<div><span style="color: #ffffff;">Base</span><span>' + regular.getFormatted({cssClass: 'swWriteList-effSub', noValue: true}) + '</span></div>';
                if(slmrk.isMastered()) str += '<div><span style="color: #ece2b6;">Stalwart</span><span>' + slmrk.critical.getFormatted({cssClass: 'swWriteList-effSub', noValue: true}) + '</span></div>';
                if(slmrk.isMastered()) str += '<div><span style="color: tomato;">Corrupt</span><span>' + slmrk.corrupted.getFormatted({cssClass: 'swWriteList-effSub', noValue: true}) + '</span></div>';

                extended.innerHTML = str;
            }
        });
    });
}

function generateSoulwritingInterfaceEvents() {
    const tabs = document.querySelectorAll('.soulwTab');
    const contents = document.querySelectorAll('.soulwContent');
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
            if(tab.id === 'soulwtab-write') drawSoulwritingLines(true);
        });
    }

    generateSwSoulmarksEvents();

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
    str += getSwWriteList();
    str += '</div>';

    str += '<div class="swWriteCrafting">';
    str += '<input class="swWrite-sigilName barred infoTitle" type="text" value="' + getRandomSigilName() + '" minlength="3" maxlength="24">';
    str += '<div class="swWrite-vignetteContainer"><div class="swWrite-vignette" style="background-image: url(\'css/img/sigils/' + game.soulwriting.icon.icon + '.png\')"></div></div>';
    str += '<div id="sws1" class="swWriteSlot"></div>';
    str += '<div id="sws2" class="swWriteSlot"></div>';
    str += '<div id="sws3" class="swWriteSlot"></div>';
    str += '<div id="sws4" class="swWriteSlot"></div>';

    str += '<div class="swWriteCraft">';
    str += '<div id="swWrite-stalwart" class="swWrite-stalwart"><span>' + game.player.sw_stalwartFactor + '%</span></div>';
    str += '<div class="swWrite-write"><span>Write</span><canvas id="canv-soulwrite" class="swSlotCanvas"></canvas></div>';
    str += '<div id="swWrite-corrupt"class="swWrite-corrupt"><span>' + game.player.sw_corruptFactor + '%</span></div>';
    str += '</div>';

    str += '<div class="swWrite-backgroundCover coolBorderBis"></div>'
    str += '</div>';

    if(refresh) {
        document.querySelector('#soulwcontent-write').innerHTML = str;
        return;
    }
    return str;
}

function getSwWriteList(refresh = false) {
    let str = '';

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

    if(refresh) {
        document.querySelector('.swWriteList').innerHTML = str;
        generateSwSoulmarksEvents();
        return;
    }
    return str;
}

function getFormattedSoulmark(sm, soulreadingFormat = false, delay = 0) {
    const eff = new Stat({effect: sm.effect, theorical: sm.theorical});

    let str = '';

    str += '<div id="sm-' + sm.name + (soulreadingFormat ? '-sr' : '') + '" class="swWriteList-single' + (soulreadingFormat ? ' srSlmrkAnim" style="animation-delay: ' + delay + 's;"' : '"') + '><div class="swWriteList-singleHeader"><span>' + capitalizeFirstLetter(sm.name) + '</span>' + eff.getFormatted({cssClass: 'swWriteList-eff', noValue: true, noTheorical: true}) + '</div>';
    if(!soulreadingFormat) {
        str += '<div class="extendedSoulmarkContainer"></div>';
    }
    else {
        str += '<div class="soulreadingSoulmarkContainer">'
        str += getSoulmarkProgressGauge(sm);
        str += '</div>';
        str += '<div class="srAnimatorProgress"></div>';
    }
    str += '</div>';

    return str;
}

function getSoulmarkProgressGauge(sm) {
    let str = '';

    str += '<div class="gaugeProgress slmrkGauge"><div class="statGauge soulmark" style="width: ' + Math.round((sm.studied*100)/sm.researchTotal) + '%"><span class="gaugeIndicator">' + sm.studied + '/' + sm.researchTotal + '</span></div></div>';
    str += '<div class="alchToxicity">';
    str += '<div class="slmrkStatus ' + (sm.unlocked ? 'un' : '') + 'locked"><div class="slmrkStatusIcon"></div>' + (sm.unlocked ? 'Unl' : 'L') + 'ocked</div>';
    str += '<div class="slmrkNum">' + getSoulreadingSoulmarkValue(sm) + '</div>';
    str += '</div>';

    return str;
}

function getSwRead(refresh = false) {
    let str = '';

    str += '<div class="swRead-banner">';
    str += getSoulreadingBanner();
    str += '</div>';

    str += '<div class="swRead-sigil">';
    str += getSoulreadingSigil();
    str += '</div>';

    str += '<div class="swRead-soulmarks">';
    str += getSoulreadingSoulmarks();
    str += '</div>';

    if(refresh) {
        document.querySelector('#soulwcontent-read').innerHTML = str;
        return;
    }
    return str;
}

function generateSoulreadingInterfaceEvents() {
    generateSoulreadingSoulmarkEvents();
}

function generateSoulreadingSoulmarkEvents() {
    game.soulwriting.sigil?.effects.forEach(eff => {
        const sm = getSoulmarkFromEffect(eff.effect);
        const dom = document.querySelector('#sm-' + sm.name + '-sr');
        var extractTimeout;

        dom.addEventListener('mousedown', (e) => {
            if(sm.canBeExtracted() && e.button === 0) {
                dom.querySelector('.srAnimatorProgress').style.width = '100%';
                extractTimeout = setTimeout(() => { // e.button === 0 checks that only a LEFT CLICK can trigger the timeout.
                    game.soulwriting.extractSoulmark(sm);
                    console.log('extracted ' + sm.name + '!');
                }, 1000);
            }
        });

        dom.addEventListener('mouseup', () => {
            clearTimeout(extractTimeout);
            game.soulwriting.cancelExtraction();
            dom.querySelector('.srAnimatorProgress').style.width = '0%';
        });

        dom.addEventListener('mouseenter', () => {
            clearTimeout(extractTimeout);
            game.soulwriting.cancelExtraction();
            dom.querySelector('.srAnimatorProgress').style.width = '0%';
        });

        dom.addEventListener('mouseleave', () => {
            clearTimeout(extractTimeout);
            game.soulwriting.cancelExtraction();
            dom.querySelector('.srAnimatorProgress').style.width = '0%';
        });
    });
}

function getSoulreadingBanner(refresh = false) {
    let str = '';



    if(refresh) {
        document.querySelector('.swRead-banner').innerHTML = str;
        return;
    }
    return str;
}

function getSoulreadingSigil(refresh = false) {
    let str = '';

    str += '<div class="swReadSigilSlot' + (game.soulwriting.sigil ? ' srSigilSlotAnim' : '') + '" ondragover="allowDrop(event)" ondrop="game.soulwriting.selectSigil(event)">'
    if(game.soulwriting.sigil) {
        str += '<div class="swReadSigilSlotIcon" style="' + getIcon(game.soulwriting.sigil, 45) + '"></div>';
    }
    str += '</div>';

    if(refresh) {
        document.querySelector('.swRead-sigil').innerHTML = str;
        return;
    }
    return str;
}

function getSoulreadingSoulmarks(refresh = false) {
    let str = '';
    let delay = 0;

    str += '<div class="swReadSoulmarksContainer">';
    game.soulwriting.sigil?.effects.forEach(eff => {
        str += getFormattedSoulmark(getSoulmarkFromEffect(eff.effect), true, delay);
        delay += 0.2;
    })
    str += '</div>';

    if(refresh) {
        document.querySelector('.swRead-soulmarks').innerHTML = str;
        generateSoulreadingSoulmarkEvents();
        return;
    }
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
    const bind = document.querySelector('.sbBind');

    sigils.forEach(sigil => {
        if(sigil) {
            const sigilId = sigil.parentNode.id.slice(6);
            const sigilObj = game.soulbinding.item.sigil;
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

                    brs.forEach(br => {
                        if(br.style.display === 'none') br.style.display = 'block';
                        else br.style.display = 'none';
                    });

                    if(eff.style.display === 'none') eff.style.display = 'block';
                    else eff.style.display = 'none';
                }
            });

            if(unbind) unbind.addEventListener('click', e => {
                game.soulbinding.unslotSigil(sigilObj);
                Sounds.Methods.playSound(Data.SoundType.SELECTOR_ON);
                Sounds.Methods.playSound(Data.SoundType.SOULBIND_UNSLOT);
            });
        }
    })

    if(bind) {
        bind.addEventListener('click', e => {
            game.soulbinding.slotSigil();
            Sounds.Methods.playSound(Data.SoundType.SELECTOR_ON);
            Sounds.Methods.playSound(Data.SoundType.SOULBIND_SLOT);
        });
    }
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
        str += '<h3>Sigil</h3>';
        str += '<div class="sbItemContainerDots">';
        if(game.soulbinding.item.hasSigil()) str += '<span class="sbFulldot"></span>';
        else str += '<span class="sbEmptyDot"></span>';
        str += '</div></div>';

        str += '<div class="sbItemContainerIndicator">';
        str += '<h3>Echo</h3>';
        str += '<div class="sbItemContainerDots">';
        if(game.soulbinding.item.hasEcho()) str += '<span class="sbFulldot"></span>';
        else str += '<span class="sbEmptyDot"></span>';
        str += '</div></div>';

        str += '<div class="sbItemContainerIndicator">';
        str += '<h3>Alterations</h3>';
        str += '<div class="sbItemContainerDots">';
        for(let i = 0, c = game.soulbinding.item.alterations.length; i < game.soulbinding.item.allowedAlterations; i++) {
            if(c > 0) str += '<span class="sbFulldot"></span>';
            else str += '<span class="sbEmptyDot"></span>';
            c--;
        }
        str += '</div></div>'

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
    if(item && item.hasOwnProperty('sigil')) {
        str += '<div class="sbObjectsSigilWrapper" style="animation-delay: ' + animDelay + 's;">';
        if(item.hasSigil()) {
            str += '<div id="sbSig-' + item.sigil.id + '" class="sbObjectsSigil">';
            str += getSigilDetails(item.sigil, false, true);
            str += '</div>';
            str += getSigilUnbindingCommand(item.sigil.id);
        } else {
            str += '<div class="sbObjectsSigil">';
            str += getEmptySigilHTML(true, 1);
            str += '</div>';
            str += getSigilBindingCommand();
        }
        str += '</div>';
        animDelay += 0.1;
    }
    str += '</div>';

    str += '<div class="sbObjectsEchoes">';
    if(item && item.hasOwnProperty('echo')) {
        animDelay += 0.1;
        str += '<div class="sbObjectsSigilWrapper" style="animation-delay: ' + animDelay + 's;">';

        if(canReceiveEcho(item)) {
            str += '<div class="sbObjectsSigil">';
            if(item.hasEcho()) str += getEchoDetails(item.echo, false, true);
            else {
                str += getEmptyEchoHTML(true);
            }
            str += '</div>';
            str += getEchoExtractCommand(item.echo.id);
        }
        else {
            str += '<div class="sbCannotHostEcho">No echo allowed on this item</div>';
        }
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

        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.SHARPNESS, theorical: [item.sharpness[0], item.sharpness[1]]}), "effectSelectable", true);
        str += generateAstralForgeEffectLine(forgeItem, new Stat({effect: Data.Effect.WITHERING, theorical: [item.withering[0], item.withering[1]]}), "effectSelectable", true);
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
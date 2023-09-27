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
            str += '<div id="res-' + me.id + '" class="inventoryItem" style="' + getIcon(me) + '; border: 2px solid ' + getRarityColorCode(me.rarity) +'" draggable="true">';
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
                e.dataTransfer.setData('resource', me.id);
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
        str += '<div id="res-' + me.id + '" class="inventoryItem" style="' + getIcon(me) + '; border: 2px solid ' + getRarityColorCode(me.rarity) +'" draggable="true">';
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

        // Draggable events
        document.querySelector('#res-' + me.id).addEventListener('dragstart', e => {
            e.dataTransfer.setData('consumable', me.id);
        });
    }
    document.querySelector('#res-consumables').addEventListener('click', (e) => {
        document.querySelector('#res-cat-consumables').classList.toggle('hide');
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
    str += '<div class="tooltipSetAttribute">' + set.type.base + '</div>';
    str += '<div class="tooltipSetAttribute">| ' + set.type.primary + '</div>';
    if(set.type.secondary) str += '<div class="tooltipSetAttribute">| ' + set.type.secondary + '</div>';
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

function getDungeonKnapsack() {
    let str = '';

    str += '<div class="knpsckContainer">';

    str += '<div class="knpsckHeader">';
    str += '<h1>Knapsack</h1>';
    str += '<span class="knpsckCap">' + getDungeonKnapsackCapacity() + '</span>';
    str += '</div>';

    str += '<div class="divider"></div>';

    str += '<div class="knpsckContent" ondragover="allowDrop(event);" ondrop="game.player.addToKnapsack(event);">';
    str += getDungeonKnapsackContent();
    str += '</div>';

    str += '<div class="knpsckRscAmount">';
    str += '<div class="kra-min">Min</div>';
    str += '<div class="kra-less">-</div>';
    str += '<div class="kra-total">Add 0 Resource With a Long Name</div>'
    str += '<div class="kra-more">+</div>';
    str += '<div class="kra-max">Max</div>';
    str += '<div class="kra-done">Done</div>';
    str += '</div>'

    str += '</div>';

    return str;
}

function getDungeonKnapsackCapacity(refresh = false) {
    let str = '';

    str += '<h3>Capacity <span style="color: white">' + game.player.du_inventory.length + '/' + game.player.du_inventorySize + '</span></h3>';

    if(refresh) {
        document.querySelector('.knpsckCap').innerHTML = str;
        return;
    }
    return str;
}

function getDungeonKnapsackContent(refresh = false) {
    let str = '';

    if(game.player.du_inventory.length === 0) str += '<h4>Empty Knapsack<br><br>(drag and drop any inventory item here to add it to your Knapsack)</h4>';
    else game.player.du_inventory.forEach(it => {
        str += '<div id="kres-' + it.id + '" class="inventoryItem" style="' + getIcon(it) + '; border: 2px solid ' + getRarityColorCode(it.rarity) +'">';
        str += '</div>';
    });

    if(refresh) {
        document.querySelector('.knpsckContent').innerHTML = str;
        generateDungeonKnapsackEvents();
        return;
    }
    return str;
}
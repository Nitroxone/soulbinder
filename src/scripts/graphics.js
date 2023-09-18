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
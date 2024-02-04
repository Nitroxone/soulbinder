function drawStridersScreen() {
    document.querySelector('#stridersDiv').innerHTML = '<div class="stridersContainer"></div>';
    let str = '';

    str += '<div class="striforContainer">';
    str += drawStridersFormationContainer();
    str += '</div>';

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

function drawStridersFormationContainer(refresh = false) {
    let str = '';

    str += '<div id="striforBack" class="strifor-slot" style="background-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 100%), url(\'css/img/chars/' + game.player.formation[0]?.charset + '\')"></div>';
    str += '<div id="striforMiddle" class="strifor-slot" style="background-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 100%), url(\'css/img/chars/' + game.player.formation[1]?.charset + '\')"></div>';
    str += '<div id="striforFront" class="strifor-slot" style="background-image: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 1) 100%), url(\'css/img/chars/' + game.player.formation[2]?.charset + '\')"></div>';

    if(refresh) {
        document.querySelector('.striforContainer').innerHTML = str;
        // Events
        return;
    }
    return str;
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
    str += '<div id="close-strider' + strider.id + '" class="closeWindowButton selectorClose">X</div>';
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
    str += getStriderStats(strider);
    str += '</div>';

    str += '<div class="striderEquipment">';
    str += getStriderEquipment(strider);
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
        document.querySelector('#close-strider' + strider.id).addEventListener('click', function(e) {
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_CLOSE);
            popupWindow.remove();
        });
    }

    if(!refresh) {
        generateStriderScreenEquipmentEvents(strider);
        generateStriderScreenStatsEvents(strider);
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

function getStriderEquipment(strider, refresh = false) {
    let str = '';

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

    if(refresh) {
        document.querySelector('.striderEquipment').innerHTML = str;
        generateStriderScreenEquipmentEvents(strider);
        return;
    }
    return str;
}

function getStriderStats(strider, refresh = false) {
    let str = '';

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

    if(refresh) {
        document.querySelector('.striderStats').innerHTML = str;
        generateStriderScreenStatsEvents(strider);
        return;
    }
    return str;
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
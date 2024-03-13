function drawEmptyBattleScreen() {
    document.querySelector('#battleDiv').innerHTML = '<div class="noBattle"></div>';

    let str = '<h1>' + choose(Speech.Battle.Empty) + '</h1>';

    document.querySelector('.noBattle').innerHTML = str;
}

function drawEndBattleScreen() {
    const battle = game.battle;
    const loot = battle.loot;
    console.log(battle);
    document.querySelector('#battleDiv').innerHTML = '<div class="battleEndContainer coolBorderBis" style="background-image: linear-gradient(0deg, transparent 0%, rgba(0, 0, 0, 1) 100%), url(\'css/img/bg/' + game.dungeon.background + '\')"></div>';

    let str = '';

    str += '<div class="battleEnd-header">';
    str += '<div class="titles">';
    str += '<h1>' + battle.outcome + '</h1>';
    str += '<h3>' + game.dungeon.floor.room.type + ' completed</h3>'
    str += '<h4 class="ELstyling">+ ' + battle.earnedEL + " Ephemeral Luck";
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
    if(loot.length > 0) {
        let timer = 0;
        loot.forEach(lo => {
            str += '<div id="battle-loit-' + (lo.type === 'gold' ? 'gold' : lo.item.id) + '" class="battleEnd-loot-single sigilInfo revealingLoot' + (lo.looted ? ' lootedLoot' : '') + '" style="animation-delay: ' + timer + 's;' + (lo.type === 'gold' ? 'background-image: url(\'css/img/goldicon.png\'); background-size: 25%;' : getIcon(lo.item, 25, true)) + '">';
            str += '<div class="sigilTitle" style="text-align: left">' + '<span class="lootQuantity">' + lo.amount + ' </span>' + (lo.type === 'gold' ? '<span class="smallThingNoIcon" style="color: yellow">Gold</span>' : getSmallThingNoIcon(lo.item, null)) + '</div>';
            str += '<div class="revealingLootAnim revealLoot' + (lo.type === 'gold' ? 'Gold' : capitalizeFirstLetter(lo.item.rarity)) + '" style="animation-delay: ' + (timer) + 's;"></div>';
            str += '<canvas class="revealingLootCanvas ' + (lo.type === 'gold' ? 'gold' : lo.item.rarity) + ' battleEndLootCanvas"></canvas>';
            str += '</div>';
            timer += 0.25;
        });
    } else {
        str += '<div class="roomLootResult-title">No loot found</div>';
    }
    str += '</div>';

    str += '<div class="battleEnd-progress">';
    str += '</div>';

    document.querySelector('.battleEndContainer').innerHTML = str;

    //Sounds.Methods.playSound(getBattleTypeSound(battle.type));
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

    if(!game.battle.isEnemyPlaying()) {
        generateBattleCommandsEvents();
        generateBattleSkillsEvents();
        generateBattleConsumablesEvents();
    }
    generateBattleFightersEvents();
}

function getBattleGlobalInfo(refresh = false) {
    let str = '';

    str += '<div class="battle-dungeonInfo">'
    str += '<h1>' + (game.dungeon ? capitalizeFirstLetter(game.dungeon.name) : 'Unknown Dungeon') + '</h1>';
    str += '<h4>' + (game.dungeon ? 'Depth ' + game.dungeon.floor.depth + ' [' + + game.dungeon.floor.room.coordinates[0] + ', ' + game.dungeon.floor.room.coordinates[1] + '] — ' + capitalizeFirstLetter(game.dungeon.floor.room.type) : 'Unknown Position') + '</h4>'
    str += '</div>';

    str += '<div class="battle-attackInfo"></div>';

    str += '<div class="battle-combatInfo">'
    str += '<h1>' + getBattleTitleFromType(game.battle.type, game.battle.title) + '</h1>';
    str += '<h4>Round ' + game.battle.round + ' — ' + game.battle.currentPlay.name + '\'s Turn</h4>'
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
    const back = game.battle.allies[0];
    const middle = game.battle.allies[1];
    const front = game.battle.allies[2];

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
    const back = game.battle.enemies[0];
    const middle = game.battle.enemies[1];
    const front = game.battle.enemies[2];

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
    const playOrder = game.battle.order.indexOf(fighter) + 1;
    const isCurrentPlay = game.battle.currentPlay === fighter;

    const id = 'aw-' + typeMin + '-' + pos;

    str += '<div id="gw-' + typeMin + '-' + pos + '" class="category" style="display: inline-block; overflow: visible;"><div class="battlePositionName">' + capitalizeFirstLetter(pos) + '</div>';
    str += '<div id="' + id + '" class="animationsWrapper"></div>';
    if(fighter) {
        str += '<div id="b-' + type + '-' + pos + '" class="battleFighter' + (isCurrentPlay ? ' currentPlayFrame' : '') + '" style="background-image: linear-gradient(transparent 0%, rgba(0, 0, 0, 1) 70%), url(\'css/img/chars/' + fighter.charset + '\'); ' + (fighter.health === 0 ? ' filter: grayscale(100%);' : '') + '">';
        str += '<div class="battle-shieldContainer">' + getBattleShieldAmount(fighter) + '</div>';
        str += '<div class="battle-specialEffectsContainer">' + getSpecialEffects(fighter) + '</div>';
        str += '<div class="gaugeProgress"><div class="statGauge health" style="width:'+ Math.round((fighter.health*100)/fighter.maxHealth) +'%"><span class="gaugeIndicator">'+ fighter.health + '/' + fighter.maxHealth +'</span></div></div>';
        str += '<div class="gaugeProgress"><div class="statGauge stamina" style="width:'+ Math.round((fighter.stamina*100)/fighter.maxStamina) +'%"><span class="gaugeIndicator">'+ fighter.stamina + '/' + fighter.maxStamina +'</span></div></div>';
        str += '<div class="gaugeProgress"><div class="statGauge mana" style="width:'+ Math.round((fighter.mana*100)/fighter.maxMana) +'%"><span class="gaugeIndicator">'+ fighter.mana + '/' + fighter.maxMana +'</span></div></div>';
        str += '</div>';
    }
    str += '<div class="playOrderIndicator' + (isCurrentPlay ? ' currentPlayIndicator' : '') + '">' + playOrder + '</div>';
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

    document.querySelector('#' + pos)?.querySelector(identifier)?.remove();
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

    const npc = game.battle.allies[selector];

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
    if(game.battle.isEnemyPlaying()) {

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
    const current = game.battle.currentPlay;

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

    if(!game.battle.isEnemyPlaying()) {
        const currentPlay = game.battle.currentPlay;
        currentPlay.skills.forEach(skill => {
            str += '<div id="' + currentPlay.name + '-' + skill.id + '" class="skillSquare treeNode coolBorder ' + (currentPlay.mana < skill.manaCost || !skill.condition.checker() || skill.cooldownCountdown > 0 ? 'disabledSkill' : '') + '" style="background-image: url(\'css/img/skills/' + currentPlay.name + skill.icon + '.png\')">' + (skill.cooldownCountdown > 0 ? '<span class="skillCooldownIndicator">' + skill.cooldownCountdown + '</span>' : '') + '</div>';
        });
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
    if(!game.battle.isEnemyPlaying()) game.player.du_inventory.filter(x => x instanceof Consumable).forEach(cons => {
        str += '<div id="btl-' + cons.id + '" class="inventoryItem" style="' + getIcon(cons) + '; border: 2px solid ' + getRarityColorCode(cons.rarity) +'"></div>'
    });
    str += '</div>';

    if(refresh) {
        document.querySelector('.battle-consumablesContainer').innerHTML = str;
        return;
    }
    return str;
}

function canCastSkillOnSelf(skill) {
    return skill.targets.enemies === '-0' && skill.targets.allies === '-0' && skill.effectsCaster;
}

function canLaunchSkill(skill) {
    const battle = game.battle;
    const pos = battle.allies.indexOf(battle.currentPlay) === -1 ? battle.enemies.indexOf(battle.currentPlay) : battle.allies.indexOf(battle.currentPlay);

    if(skill.launchPos[pos]) return true;
    return false;
}

function battleSelectionRemoveHighlights() {
    document.querySelector('#b-enemy-front').classList.remove('battle-target', 'battle-skillTargetSingle', 'battle-skillTargetMultiple');
    document.querySelector('#b-enemy-middle').classList.remove('battle-target', 'battle-skillTargetSingle', 'battle-skillTargetMultiple');
    document.querySelector('#b-enemy-back').classList.remove('battle-target', 'battle-skillTargetSingle', 'battle-skillTargetMultiple');

    document.querySelector('#b-hero-front').classList.remove('battle-skillTargetSingle', 'battle-skillTargetMultiple');
    document.querySelector('#b-hero-middle').classList.remove('battle-skillTargetSingle', 'battle-skillTargetMultiple');
    document.querySelector('#b-hero-back').classList.remove('battle-skillTargetSingle', 'battle-skillTargetMultiple');
}

function getBattleSkillTooltip(strider, skill) {
    let str = '';
    str += '<div class="nodeContainer">'

    str += '<div class="nodeContainerBanner">';
    str += '<div class="vignette coolBorder" style="background-image: url(\'css/img/skills/' + strider.name + skill.icon + '.png\')"></div>';
    str += '<div class="desc"><h4>' + skill.name + '</h4>';
    str += '<div class="treeNodeTags">';
    str += '<div class="treeNodeType ' + getColorClassFromSkillType(skill.type) + '">' + capitalizeFirstLetter(skill.type) + '</div>';
    if(skill.dmgType !== Data.SkillDamageType.NONE) str += '<div class="treeNodeType ' + getColorClassFromDmgType(skill.dmgType) + '">' + capitalizeFirstLetter(skill.dmgType) + '</div>';
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
    str += '<div class="skillRangeDisplay-launch-pos">' + getRangeString(skill.launchPos, null, true) + '</div>';
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
    /*game.battle.order.forEach(elem => {
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
    str += '<div class="striderInfos-desc-type coolBorder">' + (fighter instanceof Strider ? capitalizeFirstLetter(fighter.striderType) : capitalizeFirstLetter(fighter.mobType)) + '</div>';
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
    str += '</div>';

    if(fighter instanceof Strider) {
        str += '<div class="battle-toxicityLevel">';
        str += getBattleFighterToxicityLevel(fighter);
        str += '</div>';
    }


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

function addBattleAttackMessage(author, name) {
    let str = '';

    str += '<h3 class="atk-author">' + author + '</h3>';
    str += '<h1 class="atk-name">' + name + '</h1>';

    document.querySelector('.battle-attackInfo').outerHTML = '<div class="battle-attackInfo">' + str + '</div>';
}
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
            forgeItem.clearSelectedCometOre();
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

function addAstralForgeNotification(message) {
    let str = '';

    str += '<div class="astralForge-notification">';
    str += message;
    str += '</div>';

    document.querySelector('.astralForge-notifications').innerHTML = str;
}

function updateAstralForgeShardCounter(shard) {
    document.getElementById(shard.id).childNodes[0].innerHTML = shard.amount;
}
function updateAstralForgeCometOreCounter(cometOre) {
    document.getElementById(cometOre.id).childNodes[0].innerHTML = cometOre.amount;
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
function getSelectedAstralForgeCometOre(forgeItem) {
    const cometOre = forgeItem.selectedCometOre;
    if(!cometOre) return null;
    return document.getElementById(cometOre.id);
}
function unselectCurrentCometOre(forgeItem) {
    const cometOre = getSelectedAstralForgeCometOre(forgeItem);
    if(!cometOre) return;
    cometOre.classList.toggle('cometoreSelected');
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
    let cometOres = game.player.inventory.getCometOres();
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
    cometOres.forEach(ore => {
        str += '<tr id="' + ore.id + '" class="shard oreSelectable">';
        str += '<td style="width: 20%; text-align: center;">' + ore.amount + '</td>';
        str += '<td style="color: ' + getRarityColorCode(ore.rarity) + '">' + ore.name + '</td>';
        str += '</tr>';
    })
    str += '</tbody></table>';

    str += '<div class="simpleButton alterButton" style="margin-top: 1rem">Alter</div>';
    str += '<div class="toggleButton off consumesubstrateButton" style="margin-top: 0.5rem">Consume substrate</div>';
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

function openAstralForge(event) {
    let weapon = '', armor = '', trinket = '';

    // retrieving data
    if(event instanceof DragEvent) {
        weapon = event.dataTransfer.getData("weapon");
        armor = event.dataTransfer.getData("armor");
        trinket = event.dataTransfer.getData("trinket");
    } else {
        if(event instanceof Weapon) weapon = event.id;
        if(event instanceof Armor) armor = event.id;
        if(event instanceof Trinket) trinket = event.id;
    }
    

    if(weapon !== '') drawAstralForgeScreen(getInventoryWeaponById(Number(weapon)).astralForgeItem);
    else if(armor !== '') drawAstralForgeScreen(getInventoryArmorById(Number(armor)).astralForgeItem);
    else if(trinket !== '') drawAstralForgeScreen(getInventoryTrinketById(Number(trinket)).astralForgeItem);
    else throw new Error('Tried to open the Astral Forge screen with an uncompatible object.')
}
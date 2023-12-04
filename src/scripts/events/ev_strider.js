function generateBonusesTooltipListEvents(tooltip) {
    tooltip.querySelectorAll('.bonusesTooltip-single').forEach(bo => {
        bo.addEventListener('click', () => {
            bo.classList.toggle('extended');
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
        });
    });
}

function generateStriderScreenEquipmentEvents(strider) {
    const helm = document.querySelector('#strider-helmet');
    const ches = document.querySelector('#strider-chestplate');
    const glov = document.querySelector('#strider-gloves');
    const boot = document.querySelector('#strider-boots');
    const shie = document.querySelector('#strider-shield');
    const trk1 = document.querySelector('#strider-trinket1');
    const trk2 = document.querySelector('#strider-trinket2');
    const trk3 = document.querySelector('#strider-trinket3');
    const wpnL = document.querySelector('#strider-weaponLeft');
    const wpnR = document.querySelector('#strider-weaponRight');
    const wpnB = document.querySelector('#strider-weaponBoth');

    helm.addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipArmor(strider.eqHelmet)});
    ches.addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipArmor(strider.eqChestplate)});
    glov.addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipArmor(strider.eqGloves)});
    boot.addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipArmor(strider.eqBoots)});
    shie.addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipArmor(strider.eqShield)});
    trk1.addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipTrinket(strider.trinkets[0])});
    trk2.addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipTrinket(strider.trinkets[1])});
    trk3.addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipTrinket(strider.trinkets[2])});
    if(!strider.eqWeaponBoth) {
        wpnL.addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipWeapon(Data.WeaponHand.LEFT)});
        wpnR.addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipWeapon(Data.WeaponHand.RIGHT)});
    } else {
        wpnB.addEventListener('contextmenu', e => {e.stopImmediatePropagation(); e.preventDefault(); strider.unequipWeapon(Data.WeaponHand.BOTH)});
    }

    // Gear tooltips
    strider.eqHelmet && addTooltip(helm, function(){ return getArmorTooltip(strider.eqHelmet) }, { offY: -8 });
    strider.eqChestplate && addTooltip(ches, function(){ return getArmorTooltip(strider.eqChestplate) }, { offY: -8 });
    strider.eqGloves && addTooltip(glov, function(){ return getArmorTooltip(strider.eqGloves) }, { offY: -8 });
    strider.eqBoots && addTooltip(boot, function(){ return getArmorTooltip(strider.eqBoots) }, { offY: -8 });
    strider.eqShield && addTooltip(shie, function(){ return getArmorTooltip(strider.eqShield) }, { offY: -8 });
    strider.trinkets[0] && addTooltip(trk1, function(){ return getTrinketTooltip(strider.trinkets[0]) }, { offY: -8 });
    strider.trinkets[1] && addTooltip(trk2, function(){ return getTrinketTooltip(strider.trinkets[1]) }, { offY: -8 });
    strider.trinkets[2] && addTooltip(trk3, function(){ return getTrinketTooltip(strider.trinkets[2]) }, { offY: -8 });
    strider.eqWeaponLeft && addTooltip(wpnL, function(){ return getWeaponTooltip(strider.eqWeaponLeft) }, { offY: -8 });
    strider.eqWeaponRight && addTooltip(wpnR, function(){ return getWeaponTooltip(strider.eqWeaponRight) }, { offY: -8 });
    strider.eqWeaponBoth && addTooltip(wpnB, function(){ return getWeaponTooltip(strider.eqWeaponBoth) }, { offY: -8 });

    const striderBonuses = document.querySelector('#bonusesIcon-' + strider.id);
    addTooltip(striderBonuses, function(){
        return getStriderBonusesTooltip(strider, true);
    }, {offY: -8});
    striderBonuses.addEventListener('click', e => {
        spawnTooltip(['bonuses', strider]);
        Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
    });
}
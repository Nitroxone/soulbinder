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

    const domList = [
        helm, 
        ches, 
        glov, 
        boot, 
        shie, 
        trk1, 
        trk2, 
        trk3, 
        wpnL, 
        wpnR, 
        wpnB
    ];
    const objList = [
        strider.eqHelmet,
        strider.eqChestplate,
        strider.eqGloves,
        strider.eqBoots,
        strider.eqShield,
        strider.trinkets[0],
        strider.trinkets[1],
        strider.trinkets[2],
        strider.eqWeaponLeft,
        strider.eqWeaponRight,
        strider.eqWeaponBoth
    ];

    for (let i = 0; i < domList.length; i++) {
        const dom = domList[i];
        const obj = objList[i];

        if (obj) {
            if (obj instanceof Armor) addTooltip(dom, function(){ return getArmorTooltip(obj) }, { offY: -8 });
            if (obj instanceof Weapon) addTooltip(dom, function(){ return getWeaponTooltip(obj) }, { offY: -8 });
            if (obj instanceof Trinket) addTooltip(dom, function(){ return getTrinketTooltip(obj) }, { offY: -8 });

            dom.addEventListener('click', function(){
                Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
                const tooltip = spawnTooltip(obj);
                if(obj.set) {
                    let tooltipDesc = tooltip.querySelector('.tooltipSetText');
                    tooltipDesc.addEventListener('click', (e) => {
                        Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
                        spawnTooltip(what(game.all_equipmentSets, obj.set), tooltip);
                    });
                }
            });
            dom.addEventListener('mouseover', function() {
                Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
            });
        }
    }

    const striderBonuses = document.querySelector('#bonusesIcon-' + strider.id);
    addTooltip(striderBonuses, function(){
        return getStriderBonusesTooltip(strider, true);
    }, {offY: -8});
    striderBonuses.addEventListener('click', e => {
        spawnTooltip(['bonuses', strider]);
        Sounds.Methods.playSound(Data.SoundType.TOOLTIP_SPAWN);
    });
}
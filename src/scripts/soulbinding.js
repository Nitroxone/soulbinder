/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class Soulbinding {
    constructor() {
        this.item = null;
    }

    setItem(event) {
        // retrieving data
        const weapon = event.dataTransfer.getData("weapon");
        const armor = event.dataTransfer.getData("armor");
        const trinket = event.dataTransfer.getData("trinket");

        if(weapon !== '') this.item = getInventoryWeaponById(Number(weapon));
        else if(armor !== '') this.item = getInventoryArmorById(Number(armor));
        else if(trinket !== '') this.item = getInventoryTrinketById(Number(trinket));

        getSoulbindingItem(true);
        getSoulbindingObjects(true);
    }

    unslotItem() {
        this.item = null;
    }

    preslotSigil(event, id) {
        const sigil = game.player.inventory.getItemFromId(Data.ItemType.SIGIL, event.dataTransfer.getData('sigil'));
        const sigilDom = document.querySelector('#' + id);
        const sigilDomTitle = sigilDom.querySelector('.sigilTitle');
        let extraEffects = sigil.effects;
        if(sigil.isCritical) extraEffects = [...extraEffects, ...sigil.critical];
        if(sigil.isCorrupt) extraEffects = [...extraEffects, ...sigil.corrupt];

        document.querySelector('.sbItemContainerEffects').innerHTML = this.item.getAlterations(extraEffects);
        sigilDom.classList.add('preslottedSigil');
        sigilDomTitle.textContent = sigil.name;
        sigilDomTitle.classList.add('preslottedSigilTitle');
    }
}
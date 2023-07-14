/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class Soulbinding {
    constructor() {
        this.item = null;
        this.preslottedSigil = null;
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
        document.querySelectorAll('.preslottedSigil').forEach(pre => {
            pre.innerHTML = '<div class="sigilInfo-infos"><div class="sigilTitle">Empty sigil slot</div></div>';
            pre.classList.remove('preslottedSigil');
        });

        const sigil = game.player.inventory.getItemFromId(Data.ItemType.SIGIL, event.dataTransfer.getData('sigil'));
        this.preslottedSigil = sigil;
        const sigilDom = document.querySelector('#' + id);
        const sigilDomTitle = sigilDom.querySelector('.sigilTitle');
        let extraEffects = this.preslottedSigil.effects;
        if(this.preslottedSigil.isCritical) extraEffects = [...extraEffects, ...this.preslottedSigil.critical];
        if(this.preslottedSigil.isCorrupt) extraEffects = [...extraEffects, ...this.preslottedSigil.corrupt];

        document.querySelector('.sbItemContainerEffects').innerHTML = this.item.getAlterations(extraEffects);
        sigilDom.classList.add('preslottedSigil');
        sigilDomTitle.textContent = this.preslottedSigil.name;
        sigilDomTitle.classList.add('preslottedSigilTitle');
        Sounds.Methods.playSound(Data.SoundType.SOULBIND_PRESLOT);
    }
}
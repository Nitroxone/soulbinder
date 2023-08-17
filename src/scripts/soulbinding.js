/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class Soulbinding {
    constructor() {
        this.item = null;
        this.preslottedSigil = null;
        this.preslottedEffects = [];
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
        this.emptyPreslottedEffects();
    }

    unslotPreslottedSigil() {
        this.emptyPreslottedEffects();
        this.preslottedSigil = null;
    }

    preslotSigil(event, id) {
        this.emptyPreslottedEffects();

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

        document.querySelector('.sbItemContainerEffects').innerHTML = getAlterations(this.item, extraEffects);
        sigilDom.classList.add('preslottedSigil');
        sigilDomTitle.textContent = this.preslottedSigil.name;
        sigilDomTitle.classList.add('preslottedSigilTitle');
        if(this.item.getAvailableAlterations() < sigil.effects.length) sigilDomTitle.parentNode.outerHTML += '<div class="preslottedSigilOverflowWarning">This Sigil contains more soulmarks than this item can host. Only the first available ones will be added.</div>';
        Sounds.Methods.playSound(Data.SoundType.SOULBIND_PRESLOT);
    }

    emptyPreslottedEffects() {
        this.preslottedEffects = [];
    }

    addPreslottedEffect(stat) {
        this.preslottedEffects.push(stat);
    }

    slotSigil() {
        game.player.inventory.enchant(this.item, this.preslottedSigil);
        this.unslotPreslottedSigil();

        getSoulbindingItem(true);
        getSoulbindingObjects(true);
        drawSigilInventory(game.player.inventory.sigils);
    }

    unslotSigil(sigil) {
        game.player.inventory.disenchant(this.item, sigil);
        getSoulbindingItem(true);
        getSoulbindingObjects(true);
    }
}
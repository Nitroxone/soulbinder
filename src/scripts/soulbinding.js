/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class Soulbinding {
    constructor() {
        this.item = null;
        this.preslottedSigil = null;
        this.preslottedEffects = [];
    }

    /**
     * Sets the Soulbinding item to the one that is stocked in the provided event.
     * @param {Event} event the event that contains the item's data
     */
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

    /**
     * Unslots the item.
     */
    unslotItem() {
        this.item = null;
        this.emptyPreslottedEffects();
    }

    /**
     * Unslots the preslotted Sigil.
     */
    unslotPreslottedSigil() {
        this.emptyPreslottedEffects();
        this.preslottedSigil = null;
    }

    /**
     * Slots the provided Sigil and updates DOM accordingly.
     * @param {Event} event
     * @param {number} id
     */
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

    /**
     * Resets the preslotted effects array.
     */
    emptyPreslottedEffects() {
        this.preslottedEffects = [];
    }

    /**
     * Adds a preslotted effect to the preslotted effects array.
     * @param {Stat} stat the effect to add
     */
    addPreslottedEffect(stat) {
        this.preslottedEffects.push(stat);
    }

    /**
     * Slots (binds) the preslotted sigil into the selected item, and updates DOM accordingly.
     */
    slotSigil() {
        game.player.inventory.enchant(this.item, this.preslottedSigil);
        this.unslotPreslottedSigil();

        getSoulbindingItem(true);
        getSoulbindingObjects(true);
        drawSigilInventory(game.player.inventory.sigils);
    }

    /**
     * Unslots (unbinds) the provided Sigil from the selected item, and updated DOM accordingly.
     * @param {Sigil} sigil
     */
    unslotSigil(sigil) {
        game.player.inventory.disenchant(this.item, sigil);
        getSoulbindingItem(true);
        getSoulbindingObjects(true);
    }
}
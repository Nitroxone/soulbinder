class Soulwriting {
    constructor() {
        this.tabs = ["read", "write", "bend"];
        this.currentTab = this.tabs[1];

        this.soulmarks = [null, null, null, null];
        this.selectedSlot = 0;
        this.selectRandomIcon();

        this.isWriting = false;
    }

    /**
     * Switches the current soulwriting tab to the provided ID.
     * @param {number} index the ID to switch to
     */
    switchTab(index) {
        this.currentTab = this.tabs[index];
    }

    /**
     * Returns the currently selected tab's ID.
     * @returns {number} the current tab ID
     */
    getCurrentTabIndex() {
        return this.tabs.indexOf(this.currentTab);
    }

    /**
     * Selects the writing provided slot.
     * @param {number} num the slot's index
     */
    selectSlot(num) {
        if(this.selectedSlot === num) {
            this.unselectSlot();
            return;
        }
        this.selectedSlot = num;
    }

    /**
     * Unselects the currently selected writing slot.
     */
    unselectSlot() {
        this.selectedSlot = 0; 
    }

    /**
     * Adds the provided soulmark to the currently selected slot.
     * @param {object} slmrk the soulmark to add
     */
    addSoulmarkToSelected(slmrk) {
        this.soulmarks[this.selectedSlot - 1] = slmrk;
    }

    /**
     * Returns the current soulmark (or null if none) at the selected slot's index.
     * @returns {object|null} the object at selected index
     */
    getSoulmarkFromSelected() {
        return this.soulmarks[this.selectedSlot - 1];
    }

    /**
     * Removes the soulmark at the selected index.
     */
    removeSoulmarkFromSelected() {
        this.soulmarks[this.selectedSlot - 1] = null;
    }

    /**
     * Returns the soulmark at the specified ID.
     * @param {number} id the ID (n+1) to look for
     * @returns {object|null} a soulmark or null
     */
    getSoulmarkAt(id) {
        return this.soulmarks[id - 1];
    }

    /**
     * Removes the soulmark at the provided ID (n+1) index.
     * @param {number} id 
     */
    unselectSoulmarkAt(id) {
        this.soulmarks[id - 1] = null;
    }

    /**
     * Returns the index of the provided soulmark among the selected soulmarks.
     * @param {object} slmrk the soulmark to look for
     * @returns {number} the soulmark's index
     */
    getSoulmarkIndex(slmrk) {
        return this.soulmarks.indexOf(slmrk);
    }

    /**
     * Sets the current icon as a random icon picked among the ones unlocked by the player.
     */
    selectRandomIcon() {
        this.icon = Icons.Methods.findRandom('sigils');
    }

    /**
     * Sets the current icon as the one provided.
     * @param {object} icon the icon to set
     */
    selectIcon(icon) {
        this.icon = icon;
    }

    writing() {
        this.isWriting = true;
    }
    finishedWriting() {
        this.isWriting = false;
    }

    canWrite() {
        return this.soulmarks.some(el => el !== null);
    }

    soulwrite() {
        const name = document.querySelector('.swWrite-sigilName').value;
        const rarity = Data.Rarity.UNCOMMON;
        let effects = this.soulmarks.map(x => x && new Stat({effect: x.effect, theorical: x.theorical}));
        let critEff = [];
        let corrEff = [];
        effects = effects.filter(x => x); // Remove null elements
        
        this.soulmarks.forEach(slmrk => {
            if(!slmrk) return; // Skip null elements
            if(computeChance(game.player.sw_stalwartFactor)) critEff.push(slmrk.critical);
            if(computeChance(game.player.sw_corruptFactor)) corrEff.push(slmrk.corrupted);
        });

        const res = new Sigil(name, '', this.icon.icon, 10, rarity, {
            effects: effects,
            critical: critEff,
            corrupt: corrEff
        });
        if(res.critical.length > 0) res.setCritical();
        if(res.corrupt.length > 0) res.setCorrupt();
        res.generateStats();

        game.player.inventory.addItem(res, 1, true);
        drawSigilInventory(game.player.inventory.sigils);
    }
}
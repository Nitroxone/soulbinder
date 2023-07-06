/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

/**
 * The Sigil class holds data for Sigil objects in the game.
 */
class Sigil extends Item {
    /**
     * @param {string} name the Sigil's name
     * @param {string} desc the Sigil's description
     * @param {number} icon the Sigil's icon
     * @param {number} price the Sigil's price
     * @param {string} rarity the Sigil's rarity (Data.Rarity)
     * @param {string} type the Sigil's type (Data.SigilType)
     * @param {array} effects the Sigil's effects (array of Stat objects)
     * @param {array} critical the Sigil's critical effects
     * @param {array} corrupt the Sigil's corrupt effects
     * @param {array} echoes the Sigil's corrupt echoes
     */
    constructor(name, desc, icon, price, rarity,
                props = {}) {
        super(name, desc, icon, price, rarity);

        this.type = getValueFromObject(props, "type", Data.SigilType.ARMOR);
        this.effects = getValueFromObject(props, "effects", []);
        this.critical = getValueFromObject(props, "critical", []);
        this.corrupt = getValueFromObject(props, "corrupt", []);

        this.echoes = getValueFromObject(props, "echoes", []);

        this.soulmarks = getValueFromObject(props, "soulmarks", []);

        this.isCorrupt = false;
        this.isCritical = false;
        this.isAltered = false;
    }

    /**
     * Fixes all of the Sigil's stats.
     */
    generateStats() {
        this.effects.forEach((stat) => {
            stat.fix();
        });
        this.critical.forEach((stat) => {
            stat.fix();
        });
        this.corrupt.forEach((stat) => {
            stat.fix();
        });
    }

    /**
     * Maximizes all of the Sigil's stats.
     */
    maximize() {
        this.effects.forEach((stat) => {
            stat.maximize();
        });
        this.critical.forEach((stat) => {
            stat.maximize();
        });
        this.corrupt.forEach((stat) => {
            stat.maximize();
        });
    }

    /**
     * Amplifies all of the Sigil's stats.
     */
    amplify() {
        this.effects.forEach((stat) => {
            stat.amplify();
        });
        this.critical.forEach((stat) => {
            stat.amplify();
        });
        this.corrupt.forEach((stat) => {
            stat.amplify();
        });
        this.setAltered();
    }

    /**
     * 
     * @returns {boolean} whether the Sigil's stats are all maximized
     */
    isMaximized() {
        let breaker = true;
        this.effects.forEach((stat) => {
            if(!stat.isMaximized()) {
                breaker = false;
                return;
            }
        });
        this.critical.forEach((stat) => {
            if(!stat.isMaximized()) {
                breaker = false;
                return;
            }
        });
        this.corrupt.forEach((stat) => {
            if(!stat.isMaximized()) {
                breaker = false;
                return;
            }
        });
        return breaker;
    }

    /**
     * Makes the Sigil critical.
     */
    setCritical() {
        this.isCritical = true;
    }

    /**
     * Makes the Sigil corrupt.
     */
    setCorrupt() {
        this.isCorrupt = true;
    }

    /**
     * Makes the Sigil altered.
     */
    setAltered() {
        this.isAltered = true;
    }

    /**
     * Removes the corrupted state of the Sigil.
     */
    uncorrupt() {
        this.isCorrupt = false;
    }

    /**
     * Returns the amount of effects that are active on the sigil. 
     * Also returns the amount of critical effects is the sigil is critical, and the amount of corrupt effects if the sigil is corrupt.
     * @returns {number} the amount of effects that are active on the sigil
     */
    getEffectsAmount() {
        let amount = this.effects.length;
        if(this.isCritical) amount += this.critical.length;
        if(this.isCorrupt) amount += this.corrupt.length;
        return amount;
    }
}
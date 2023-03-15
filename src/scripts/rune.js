/**
 * The Rune class holds data for Rune objects in the game.
 */
class Rune extends Item {
    /**
     * @param {string} name the Rune's name
     * @param {string} desc the Rune's description
     * @param {number} icon the Rune's icon
     * @param {number} price the Rune's price
     * @param {string} rarity the Rune's rarity (Data.Rarity)
     * @param {string} type the Rune's type (Data.RuneType)
     * @param {array} effects the Rune's effects (array of Stat objects)
     * @param {array} critical the Rune's critical effects
     * @param {array} corrupt the Rune's corrupt effects
     * @param {array} echoes the Rune's corrupt echoes
     */
    constructor(name, desc, icon, price, rarity,
                type, 
                effects,
                critical,
                corrupt,
                echoes) {
        super(name, desc, icon, price, rarity);

        this.type = type;
        this.effects = effects;
        this.critical = critical;
        this.corrupt = corrupt;

        this.echoes = echoes;

        this.isCorrupt = false;
        this.isCritical = false;
        this.isAltered = false;
    }

    /**
     * Fixes all of the Rune's stats.
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
     * Maximizes all of the Rune's stats.
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
     * Amplifies all of the Rune's stats.
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
     * @returns {boolean} whether the Rune's stats are all maximized
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
     * Makes the Rune critical.
     */
    setCritical() {
        this.isCritical = true;
    }

    /**
     * Makes the Rune corrupt.
     */
    setCorrupt() {
        this.isCorrupt = true;
    }

    /**
     * Makes the Rune altered.
     */
    setAltered() {
        this.isAltered = true;
    }

    /**
     * Removes the corrupted state of the Rune.
     */
    uncorrupt() {
        this.isCorrupt = false;
    }

    /**
     * Returns the amount of effects that are active on the rune. 
     * Also returns the amount of critical effects is the rune is critical, and the amount of corrupt effects if the rune is corrupt.
     * @returns {number} the amount of effects that are active on the rune
     */
    getEffectsAmount() {
        let amount = this.effects.length;
        if(this.isCritical) amount += this.critical.length;
        if(this.isCorrupt) amount += this.corrupt.length;
        return amount;
    }
}
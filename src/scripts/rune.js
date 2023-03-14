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
     * @param {array} triggers the Rune's corrupt triggers
     */
    constructor(name, desc, icon, price, rarity,
                type, 
                effects,
                critical,
                corrupt,
                triggers) {
        super(name, desc, icon, price, rarity);

        this.type = type;
        this.effects = effects;
        this.critical = critical;
        this.corrupt = corrupt;

        this.triggers = triggers;

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
        })
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
}
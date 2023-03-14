/**
 * The Stat class is used to define any kind of effect within the game : Rune stats, Skills effects...
 * Two parameters are mandatory: the EFFECT and the THEORICAL VALUE (which must be an array). 
 * If size 1, the VALUE is fixed and will always be the same. 
 * If size 2, the VALUE will be random (given that the first element of the array is the minimum, and the second element is the maximum) 
 * each time it is called by the getValue() method.
 * @author ntrx
 */

class Stat {
    /**
     * @param {string} effect the Effect given by the Stat object
     * @param {array} theorical the theorical value of the Stat object
     * @param {boolean} fixed TRUE means the value will always be the same, FALSE (default) means it will always be random
     * @param {boolean} isPercentage is the value a percentage?
     * @param {boolean} critical is the Stat a critical effect?
     * @param {boolean} corrupt is the Stat a corrupt effect?
     * @param {number} duration 0 = permanent, > 0 = duration in rounds,
     * @param {number} delay 0 = immediate, < 0 = delay in rounds
     * @param {string} type is it a PASSIVE or ACTIVE Stat?
     */
    constructor(effect, theorical, fixed = false, isPercentage = false, critical = false, corrupt = false, duration = 0, delay = 0, type = Data.StatType.PASSIVE) {
        this.effect = effect;
        this.theorical = theorical;
        this.isPercentage = isPercentage;
        this.critical = critical;
        this.corrupt = corrupt;
        this.duration = duration;
        this.delay = delay;
        this.type = type;
        this.value = null;

        if(fixed) this.fix();
        else this.fixed = fixed;
    }

    /**
     * Returns the Stat's value. If it's a size 2 array, the value is randomly generated between the two bounds. If the Stat has the FIXED attribute set to TRUE, it will always return the same value.
     * @returns {number} the Stat's value
     */
    getValue() {
        if(this.fixed) return this.value;
        if(this.theorical.length == 2) return getRandomNumberFromArray(this.theorical);
        return this.theorical[0];
    }

    /**
     * Assigns the value property of the Stat object by calling the getValue() method.
     */
    assignValue() {
        this.value = this.getValue();
    }

    /**
     * Assigns the value property of the Stat object and makes it fixed.
     */
    fix() {
        this.fixed = false;
        this.assignValue();
        this.fixed = true;
    }

    /**
     * Assigns the value property of the Stat object to the highest bound of the theorical value.
     */
    maximize() {
        this.value = this.theorical[1];
    }
}
/**
 * The Stat class is used to define any kind of effect within the game : Rune stats, Skills effects...
 * Two parameters are mandatory: the EFFECT and the VALUE (which must be an array). 
 * If size 1, the VALUE is fixed and will always be the same. 
 * If size 2, the VALUE will be random (given that the first element of the array is the minimum, and the second element is the maximum) 
 * each time it is called by the getValue() method.
 * @author ntrx
 */

class Stat {
    /**
     * @param {string} effect the Effect given by the Stat object
     * @param {array} value the value of the Stat object
     * @param {boolean} isPercentage is the value a percentage?
     * @param {boolean} critical is the Stat a critical effect?
     * @param {number} duration 0 = permanent, > 0 = duration in rounds,
     * @param {number} delay 0 = immediate, < 0 = delay in rounds
     * @param {string} type is it a PASSIVE or ACTIVE Stat?
     */
    constructor(effect, value, isPercentage = false, critical = false, duration = 0, delay = 0, type = Data.StatType.PASSIVE) {
        this.effect = effect;
        this.value = value;
        this.isPercentage = isPercentage;
        this.critical = critical;
        this.duration = duration;
        this.delay = delay;
        this.type = type;
    }

    /**
     * Returns the Stat's value. If it's a size 2 array, the value is randomly generated between the two bounds.
     * @returns {number} the Stat's value
     */
    getValue() {
        if(this.value.length == 2) {
            let min = this.value[0];
            let max = this.value[1];
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        return this.value[0];
    }
}
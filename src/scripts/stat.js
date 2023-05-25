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
     * @param {Data.Effect} effect the Data.Effect given by the Stat object
     * @param {number|[number, number]} theorical the theorical value of the Stat object
     * @param {boolean} fixed TRUE means the value will always be the same, FALSE (default) means it will always be random
     * @param {boolean} isPercentage is the value a percentage?
     * @param {boolean} isCritical is the Stat a critical effect?
     * @param {boolean} isCorrupt is the Stat a corrupt effect?
     * @param {number} duration 0 = permanent, > 0 = duration in rounds,
     * @param {number} delay 0 = immediate, < 0 = delay in rounds
     * @param {string} type is it a PASSIVE or ACTIVE Stat?
     */
    constructor(props) {

        // Set attributes from props, or default values if not in props
        this.effect = ("effect" in props ? props["effect"] : "none");
        this.theorical = ("theorical" in props ? props["theorical"] : [0, 0]);
        this.isPercentage = ("isPercentage" in props ? props["isPercentage"] : false);
        this.isCritical = ("isCritical" in props ? props["isCritical"] : false);
        this.isCorrupt = ("isCorrupt" in props ? props["isCorrupt"] : false);
        this.duration = ("duration" in props ? props["duration"] : 0);
        this.delay = ("delay" in props ? props["delay"] : 0);
        this.type = ("type" in props ? props["type"] : Data.StatType.PASSIVE);

        this.value = null;

        // If theorical is not an array, make it an array
        if(!Array.isArray(this.theorical)) this.theorical = [this.theorical, this.theorical];

        if("fixed" in props) this.fix();
        else this.fixed = false;
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
     * Assigns the value property of the Stat object to the highest bound of the theorical value. Fixes the stat in the process.
     */
    maximize() {
        this.value = this.theorical[1];
        this.fixed = true;
    }

    /**
     * Amplifies the Stat's value by adding another randomly generated number to it.
     */
    amplify() {
        if(this.isMaximized()) this.value += getRandomNumberFromArray(this.theorical);
    }

    /**
     * Returns whether the Stat's current value is superior to the highest bound of the theorical value.
     * @returns {boolean} whether the Stat is amplified
     */
    isAmplified() {
        return this.value > this.theorical[1];
    }

    /**
     * Returns whether the Stat's current value is equal to the highest bound of the theorical value.
     * @returns {boolean} whether the Stat is maximized
     */
    isMaximized() {
        return this.value == this.theorical[1];
    }

    /**
     * Returns a formatted HTML code string that contains the Stat's data.
     * @param {string} cssClass an optional CSS class
     * @param {string} color an optional color
     * @param {boolean} bold makes the text bold
     * @param {boolean} italic makes the text in italics
     * @return {string} an HTML string
     */
    getFormatted(cssClass = '', color = '', bold = false, italic = false, noTheorical = false) {
        let str = '<div class="' 
        + cssClass 
        + '" style="' 
        + (bold ? 'font-family: RobotoBold; ' : '') 
        + (italic ? 'font-style: italic; ' : '') 
        + (color ? 'color: ' + color + ';': '') 
        + '"><span style="font-weight: normal;">' 
        + (this.getValue() > 0 ? '+ ' : this.getValue() < 0 ? '- ' : '') 
        + '</span>' 
        + (this.getValue() == 0 ? '' : Math.abs(this.getValue())) 
        + (this.isPercentage ? '%' : '') 
        + ' ' 
        + capitalizeFirstLetter(this.effect);
        if(!noTheorical) {
            str += '<span class="theoricalval">[' 
            + this.theorical[0] 
            + (this.theorical[1] > 0 ? '-' : ', ') 
            + this.theorical[1] 
            + ']</span>';
        }
        str += '</div>';

        return str;
    }
}
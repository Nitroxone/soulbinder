/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

/**
 * The Stat class is used to define any kind of effect within the game : Sigil stats, Skills effects...
 * Two parameters are mandatory: the EFFECT and the THEORICAL VALUE. 
 * If the Theorical Value is a number, the Stat value will always be the same.
 * If the Theorical Value is an array (max. size 2), the Stat value will be a randomly generated number between these two bounds,
 * returned every time the getValue() method is called.
 * It is possible to freeze the Stat value using the fix() method, or by setting "fixed: true" in the props.
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
     * @param {number} chance base chance of the effect being applied. This is only used for Stun/Move effects in Skills.
     * @param {boolean} ignoreShield this is used to bypass shield protection while removing health from Blight and Bleeding effects.
     * @param {boolean} disabled this is used to disable an effect (won't be active, and will appear striked)
     */
    constructor(props) {
        this.uid = uidGen();

        // Set attributes from props, or default values if not in props
        this.effect = getValueFromObject(props, "effect", "none");
        this.theorical = getValueFromObject(props, "theorical", [0, 0]);
        this.isPercentage = getValueFromObject(props, "isPercentage", false);
        this.isCritical = getValueFromObject(props, "isCritical", false);
        this.isCorrupt = getValueFromObject(props, "isCorrupt", false);
        this.duration = getValueFromObject(props, "duration", 0);
        this.delay = getValueFromObject(props, "delay", 0);
        this.type = getValueFromObject(props, "type", Data.StatType.PASSIVE);
        this.chance = getValueFromObject(props, "chance", 100);
        this.ignoreShield = getValueFromObject(props, "ignoreShield", false);
        this.alchemicalType = getValueFromObject(props, "alchemicalType", null);
        this.disabled = getValueFromObject(props, "disabled", false);
        this.displayed = getValueFromObject(props, "displayed", null);

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

    disable() {
        this.disabled = true;
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
     * @param {boolean} italic makes the text displayed in italics
     * @param {boolean} noTheorical removes the theorical value display
     * @param {boolean} defaultColor applies a default color styling (green if > 0, red if < 0, orange if 0)
     * @param {boolean} allowOverloadedStyling allows an overloaded styling (green+bold styling if the Stat value is > than its higher theorical value.)
     * @param {boolean} skillFormat applies a different format for a Skill tooltip display.
     * @param {boolean} includeDuration include the duration of the Stat? (for Skills)
     * @param {boolean} includeChance include the chance of the Stat? (for Stun/Move effects) -> automatically TRUE for all Stun/Movement effects
     * @param {boolean} noValue removes the value display
     * @param {boolean} noName removes the name display
     * @return {string} an HTML string
     */
    getFormatted(props) {
        const cssClass = getValueFromObject(props, "cssClass", "");
        let color = getValueFromObject(props, "color", "");
        let bold = getValueFromObject(props, "bold", false);
        const barred = getValueFromObject(props, "barred", false);
        const opacity = getValueFromObject(props, "opacity", 1);
        const hidden = getValueFromObject(props, "hidden", false);
        const italic = getValueFromObject(props, "italic", false);
        const noTheorical = getValueFromObject(props, "noTheorical", false);
        const defaultColor = getValueFromObject(props, "defaultColor", false);
        const allowOverloadedStyling = getValueFromObject(props, "allowOverloadedStyling", false);
        const skillFormat = getValueFromObject(props, "skillFormat", false);
        const includeDuration = getValueFromObject(props, "includeDuration", false);
        const includeChance = getValueFromObject(props, "includeChance", true);
        const noValue = getValueFromObject(props, "noValue", false);
        const noName = getValueFromObject(props, "noName", false);
        const allowUnvaluableColor = getValueFromObject(props, "allowUnvaluableColor", false);

        if(defaultColor && !this.displayed) {
            if(this.getValue() > 0) {
                if(this.effect !== Data.Effect.EFFORT && this.effect !== Data.Effect.BLEEDING_CURABLE && this.effect !== Data.Effect.BLEEDING_INCURABLE) color = Data.Color.GREEN;
                else color = Data.Color.RED;
            } else if(this.getValue() < 0) {
                if(this.effect !== Data.Effect.EFFORT) color = Data.Color.RED;
                else color = Data.Color.GREEN;
            } else {
                color = Data.Color.ORANGE;
            }
        }
        if(allowOverloadedStyling) {
            if(this.fixed && this.getValue() > this.theorical[1] && this.getValue() > 0) {
                color = Data.Color.OVERLOADED;
                bold = true;
            }
        }
        if(allowUnvaluableColor && isEffectUnvaluable(this.effect)) color = Data.Color.ORANGE;

        let str = '';
        if(skillFormat) {
            str += '<div class="' 
            + cssClass 
            + '" style="' 
            + (bold ? 'font-family: RobotoBold; ' : '') 
            + (italic ? 'font-style: italic; ' : '') 
            + (barred || this.disabled ? 'text-decoration: line-through; ' : '')
            + (color ? 'color: ' + color + ';': '') 
            + (opacity ? 'opacity: ' + opacity + ';': '') 
            + (hidden ? 'display: none;': '') 
            + '">'
            + '<span style="font-weight: normal;">';
            if(!this.displayed) {
                if(this.theorical[0] === this.theorical[1]) str += (this.getValue() > 0 ? '' : this.getValue() < 0 ? '- ' : '') + '</span>' + (this.getValue() === 0 ? '' : Math.abs(this.getValue())) + (this.isPercentage ? '%' : '');
                else {
                    str += (this.theorical[0] > 0 ? '' : this.theorical[0] < 0 ? '- ' : '') + '</span>' + (this.theorical[0] === 0 ? this.theorical[0] : Math.abs(this.theorical[0])) + (this.isPercentage ? '%' : '');
                    str += ' to ';
                    str += (this.theorical[1] > 0 ? '' : this.theorical[1] < 0 ? '- ' : '') + '</span>' + (this.theorical[1] === 0 ? this.theorical[0] : Math.abs(this.theorical[1])) + (this.isPercentage ? '%' : '');
                }
                str += ' ' 
            }
            str += (noName ? '' : this.displayed ? this.processDisplayed() : capitalizeFirstLetter(this.effect))
            + (includeChance && this.effect === Data.Effect.STUN || isMovementEffect(this.effect) ? '<span style="color: grey"> (' + this.chance + '% base)' : '')
            + (this.duration > 0 && !isMovementEffect(this.effect) ? '<span style="color: #ddd"> (' + this.duration + ' round' + (this.duration > 1 ? 's' : '') + ')</span>' : '')
            + (this.delay > 0 ? '<span style="color: #ddd"> [in ' + this.delay + ' round' + (this.delay > 1 ? 's' : '') + ']</span>' : '');
            str += '</div>';
        } else {
            str += '<div class="' 
            + cssClass 
            + '" style="' 
            + (bold ? 'font-family: RobotoBold; ' : '') 
            + (italic ? 'font-style: italic; ' : '') 
            + (barred || this.disabled ? 'text-decoration: line-through; ' : '')
            + (color ? 'color: ' + color + ';': '') 
            + (opacity || this.disabled ? 'opacity: ' + (this.disabled ? '0.65' : opacity) + ';': '') 
            + (hidden ? 'display: none;': '') 
            + '"><span style="font-weight: normal;">' 
            + (this.getValue() > 0 && !noValue ? '+ ' : this.getValue() < 0 && !noValue ? '- ' : '') 
            + '</span>' 
            + (this.getValue() == 0 ? '' : !noValue ? Math.abs(this.getValue()) : '') 
            + (this.isPercentage && !noValue ? '%' : '') 
            + ' ' 
            + (noName ? '' : this.displayed ? this.processDisplayed() : capitalizeFirstLetter(this.effect))
            if(!noTheorical) {
                str += '<span class="theoricalval">[' 
                + this.theorical[0] 
                + (this.theorical[1] > 0 ? '-' : ', ') 
                + this.theorical[1] 
                + ']</span>';
            }
            str += (includeDuration && this.duration > 0 ? ' <span style="color: #ddd">(' + this.duration + ' round' + (this.duration > 1 ? 's' : '') + ' left)</span>' : '');
            str += (this.delay > 0 ? ' <span style="color: #ddd">(in ' + this.delay + ' round' + (this.delay > 1 ? 's' : '') + ')</span>' : '');
            str += '</div>';
        }

        return str;
    }

    /**
     * Processes the "displayed" string by replacing its tokens with the appropriate values.
     * - § Turquoise coloration
     * - $ Orange coloration
     * - ^ Green coloration
     * - ~ Red coloration
     * - * Bold
     * - _ Underlined
     * - ° Prints this Stat's value
     * @returns {string}
     */
    processDisplayed() {
        if(!this.displayed) return;

        const purpleRegex = /§(.*?)§/g;
        const orangeRegex = /\$(.*?)\$/g;
        const greenRegex = /\^(.*?)\^/g;
        const redRegex = /~(.*?)~/g;
        const blueRegex = /\|(.*?)\|/g;
        const boldRegex = /\*(.*?)\*/g;
        const underlinedRegex = /_(.*?)_/g;
        const valRegex = /°/g;

        let replaced = this.displayed;

        replaced = replaced.replace(purpleRegex, '<span style="color: ' + Data.Color.PURPLE + ';">$1</span>');
        replaced = replaced.replace(orangeRegex, '<span style="color: ' + Data.Color.ORANGE + ';">$1</span>');
        replaced = replaced.replace(greenRegex, '<span style="color: ' + Data.Color.GREEN + ';">$1</span>');
        replaced = replaced.replace(redRegex, '<span style="color: ' + Data.Color.RED + ';">$1</span>');
        replaced = replaced.replace(blueRegex, '<span style="color: ' + Data.Color.TURQUOISE + ';">$1</span>');
        replaced = replaced.replace(boldRegex, '<span style="font-family: RobotoBold;">$1</span>');
        replaced = replaced.replace(underlinedRegex, '<span style="text-decoration:underline;">$1</span>');
        replaced = replaced.replace(valRegex, this.getValue());

        return replaced;
    }

    // SPECIAL DISPLAY TOKENS
    // § blue
    // $ orange
    // ^ green
    // ~ red
    // ° display effect's value
}

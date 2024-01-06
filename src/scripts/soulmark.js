/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class Soulmark {
    constructor(props = {}) {
        this.name = getValueFromObject(props, "name", "unknown");
        this.effect = getValueFromObject(props, "effect", "none");
        this.theorical = getValueFromObject(props, "theorical", [0, 0]);
        this.critical = getValueFromObject(props, "critical", new Stat({}));
        this.corrupted = getValueFromObject(props, "corrupted", new Stat({}));
        this.price = getValueFromObject(props, "price", 0);
        this.rarity = getValueFromObject(props, "rarity", Data.Rarity.REGULAR);
        this.researchTotal = getValueFromObject(props, "researchTotal", 1);
        this.availableBeforeMastery = getValueFromObject(props, "availableBeforeMastery", false);
        this.steps = getValueFromObject(props, "steps", []);

        this.unlocked = false;
        this.studied = 0;
    }

    /**
     * Returns this Soulmark's current value.
     * @returns {array|boolean} the current value
     */
    getCurrent() {
        if(this.steps.length === 0) {
            if(this.studied === 0) return 0;
            else return this.theorical;
        }
        return this.steps[this.studied - 1];
    }

    /**
     * Returns a formatted string containing this Soulmark's current value.
     * @returns {string} the formatted current value
     */
    getFormattedCurrent() {
        const st = new Stat({effect: this.effect, theorical: this.getCurrent()});

        return st.getFormatted({noValue: true, noName: true});
    }

    /**
     * Returns this Soulmark's next value.
     * @returns {array|boolean} the next value
     */
    getNext() {
        if(this.steps.length === 0) return this.theorical;
        else if(this.isMastered()) return this.getCurrent();
        return this.steps[this.studied];
    }

    /**
     * Returns a formatted string containing this Soulmark's next value.
     * @returns {string} the formatted next value
     */
    getFormattedNext() {
        const st = new Stat({effect: this.effect, theorical: this.getNext()});

        return st.getFormatted({noValue: true, noName: true});
    }

    /**
     * Returns whether this Soulmark can be extracted in a Soulreading context.
     */
    canBeExtracted() {
        return this.studied < this.researchTotal;
    }

    /**
     * Returns whether a soulmark is fully mastered.
     * @returns {boolean}
     */
    isMastered() {
        return this.studied === this.researchTotal;
    }
}
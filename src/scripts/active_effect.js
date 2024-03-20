/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class ActiveEffect {
    constructor(props) {
        this.name = getValueFromObject(props, "name", "None");
        this.originUser = getValueFromObject(props, "originUser", null);
        this.originObject = getValueFromObject(props, "originObject", null);
        this.effects = getValueFromObject(props, "effects", null);
        this.style = getValueFromObject(props, "style", null);
        this.immutable = getValueFromObject(props, "immutable", false);

        this.duration = [];
        for(let i = 0; i < this.effects.length; i++) {
            this.duration[i] = this.effects[i].duration;
        }

        this.countdown = 1;
    }

    /**
     * Refreshes this ActiveEffect with the data from the provided ActiveEffect.
     * @param {ActiveEffect} ae 
     */
    refresh(ae) {
        this.effects = this.effects.concat(ae.effects);
        this.originUser = ae.originUser;
        this.originObject = ae.originObject;
        this.countdown = 1;
        ae.effects.forEach(ef => {
            this.duration.push(ef.duration);
        }) 
    }
}
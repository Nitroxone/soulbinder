class ActiveEffect {
    constructor(props) {
        this.name = getValueFromObject(props, "name", "None");
        this.originUser = getValueFromObject(props, "originUser", null);
        this.originObject = getValueFromObject(props, "originObject", null);
        this.effects = getValueFromObject(props, "effects", null);
        this.style = getValueFromObject(props, "style", null);

        for(let i = 0; i < this.effects.length; i++) {
            this.duration[i] = this.effects[i].duration;
        }

        this.countdown = 1;
    }
}
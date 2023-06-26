class Soulmark {
    constructor(props = {}) {
        this.name = getValueFromObject(props, "name", "Unnamed Soulmark");
        this.effect = getValueFromObject(props, "effect", new Stat({}));
    }
}
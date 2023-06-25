class Soulmark {
    constructor(props = {}) {
        this.effect = getValueFromObject(props, "effect", new Stat({}));
    }
}
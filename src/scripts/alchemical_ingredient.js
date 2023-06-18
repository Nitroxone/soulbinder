class AlchemicalIngredient extends Resource {
    constructor(name, desc, icon, price, rarity, props = {}) {
        super(name, desc, icon, price, rarity);

        this.passive = getValueFromObject(props, "passive", {effect: null, toxicity: 0});
        this.recovery = getValueFromObject(props, "recovery", {effect: null, toxicity: 0});
        this.special = getValueFromObject(props, "special", {effect: null, toxicity: 0});
    }
}
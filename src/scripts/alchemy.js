/**
 * The Alchemy class holds all of the logic for brewing potions.
 */
class Alchemy {
    constructor() {
        this.ingredients = [];
        this.toxicity = 0;
        this.effects = [];
    }

    addIngredient() {

    }
    removeIngredient() {

    }
    clearIngredients() {
        this.ingredients = [];
    }

    addEffect() {

    }
    removeEffect() {

    }
    clearEffects() {
        this.effects = [];
    }

    increaseToxicity(amount) {
        this.toxicity = Math.min(this.toxicity + amount, 100);
    }
    decreaseToxicity(amount) {
        this.toxicity = Math.max(this.toxicity - amount, 0);
    }
}
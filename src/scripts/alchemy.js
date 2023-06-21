/**
 * The Alchemy class holds all of the logic for brewing potions.
 */
class Alchemy {
    constructor() {
        this.ingredients = [null, null, null];
        this.toxicity = 0;
        this.effects = [null, null, null];
    }

    addIngredient(event, index) {
        const ingredient = game.player.inventory.getItemFromId(Data.ItemType.RESOURCE, event.dataTransfer.getData('ingredient'));
        this.ingredients[index] = ingredient;
        document.querySelectorAll('.alchIngredient')[index].innerHTML = getAlchemyIngredient(this.ingredients[index]);
        generateAlchemyIngredientEvents(this.ingredients[index]);
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
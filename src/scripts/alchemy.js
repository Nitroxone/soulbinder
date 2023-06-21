/**
 * The Alchemy class holds all of the logic for brewing potions.
 */
class Alchemy {
    constructor() {
        this.ingredients = [null, null, null];
        this.toxicity = 0;
        this.effects = [];
    }

    /**
     * Adds the AlchemicalIngredient item whose ID is stored in the provided Event's DataTransfer to the Alchemy selected ingredients.
     * It will be added to the provided index in the array.
     * @param {Event} event the Event that contains the data
     * @param {number} index where to add the ingredient
     */
    addIngredient(event, index) {
        const ingredient = game.player.inventory.getItemFromId(Data.ItemType.RESOURCE, event.dataTransfer.getData('ingredient'));
        this.ingredients[index] = ingredient;
        document.querySelectorAll('.alchIngredient')[index].innerHTML = getAlchemyIngredient(this.ingredients[index]);
        generateAlchemyIngredientEvents(this.ingredients[index]);
    }

    /**
     * Removes the AlchemicalIngredient at the provided position in the array.
     * @param {number} index which ingredient to remove
     */
    removeIngredient(index) {
        this.ingredients[index].unlink();
        this.ingredients[index] = null;
        document.querySelectorAll('.alchIngredient')[index].innerHTML = getAlchemyIngredient(this.ingredients[index]);
    }

    /**
     * Removes all of the AlchemicalIngredients.
     */
    clearIngredients() {
        for(let i = 0; i < this.ingredients.length; i++) {
            if(this.ingredients[i]) this.removeIngredient(i);
        }
        getAlchemyPotionPreviewEffects(true);
    }

    addEffect(eff) {
        this.effects.push(eff);
        if(eff) this.increaseToxicity(eff.toxicity);
    }
    removeEffect(eff) {
        if(eff) this.decreaseToxicity(eff.toxicity);
        removeFromArray(this.effects, eff);
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
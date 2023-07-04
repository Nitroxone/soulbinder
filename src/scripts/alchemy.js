/**
 * The Alchemy class holds all of the logic for brewing potions.
 */
class Alchemy {
    constructor() {
        this.ingredients = [null, null, null];
        this.toxicity = 0;
        this.effects = [];
        this.icon = this.selectRandomIcon();

        this.isBrewing = false;
    }

    /**
     * Adds the AlchemicalIngredient item whose ID is stored in the provided Event's DataTransfer to the Alchemy selected ingredients.
     * It will be added to the provided index in the array.
     * @param {Event} event the Event that contains the data
     * @param {number} index where to add the ingredient
     */
    addIngredient(event, index) {
        if(this.ingredients[index]) {
            this.removeIngredient(index);
            getAlchemyPotionPreviewEffects(true);
        }

        const ingredient = game.player.inventory.getItemFromId(Data.ItemType.RESOURCE, event.dataTransfer.getData('ingredient'));
        if(this.ingredients.includes(ingredient)) {
            addAlchemyNotification('This ingredient is already selected.');
            return;
        }
        this.ingredients[index] = ingredient;
        document.querySelectorAll('.alchIngredient')[index].innerHTML = getAlchemyIngredient(this.ingredients[index]);
        generateAlchemyIngredientEvents(this.ingredients[index]);

        Sounds.Methods.playSound(Data.SoundType.INGREDIENT_IN);
    }

    /**
     * Removes the AlchemicalIngredient at the provided position in the array.
     * @param {number} index which ingredient to remove
     */
    removeIngredient(index) {
        this.ingredients[index].unlink();
        this.ingredients[index] = null;
        document.querySelectorAll('.alchIngredient')[index].innerHTML = getAlchemyIngredient(this.ingredients[index]);

        Sounds.Methods.playSound(Data.SoundType.INGREDIENT_OUT);
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

    /**
     * Adds the provided alchemical effect object to the effects list.
     * @param {object} eff the alchemical effect object to add
     */
    addEffect(eff) {
        this.effects.push(eff);
        if(eff) this.increaseToxicity(eff.toxicity);
        displayAlchemyBrewButton();
    }

    /**
     * Removes the provided alchemical effect object from the effects list.
     * @param {object} eff the alchemical effect to remove
     */
    removeEffect(eff) {
        if(eff) this.decreaseToxicity(eff.toxicity);
        removeFromArray(this.effects, eff);
        displayAlchemyBrewButton();
    }

    /**
     * Adds the provided number to the toxicity level (capped at 100).
     * @param {number} amount the amount of toxicity to add
     */
    increaseToxicity(amount) {
        this.toxicity += amount;
    }

    /**
     * Removes the provided number from the toxicity level (capped at 100).
     * @param {number} amount the amount of toxicity to remove
     */
    decreaseToxicity(amount) {
        this.toxicity -= amount;
    }

    /**
     * Sets the current icon as a random icon picked among the ones unlocked by the player.
     */
    selectRandomIcon() {
        this.icon = Icons.Methods.findRandom('potions');
    }

    /**
     * Sets the current icon as the one provided.
     * @param {object} icon the icon to set
     */
    selectIcon(icon) {
        this.icon = icon;
    }

    /**
     * Returns the highest rarity among the selected ingredients.
     * @returns {Data.Rarity} the highest rarity
     */
    determineRarity() {
        let highest = Data.Rarity.COMMON;
        this.ingredients.forEach(ingr => {
            if(ingr) {
                highest = compareHighestRarities(highest, ingr.rarity);
            }
        });

        return highest;
    }

    /**
     * Creates a Consumable object based on the selected ingredients and effects, then adds it to the inventory.
     */
    brew() {
        const name = document.querySelector('.alchPotionPreview-name').value;
        const effects = this.effects.map(x => x.effect);
        const rarity = this.determineRarity();
        const result = new Consumable(
            name,
            '',
            this.icon.icon,
            0,
            rarity,
            {
                effects: effects,
                toxicity: this.toxicity,
            }
        );

        game.inventory.addItem(result, 1, true);
        drawConsumablesInventory();

        this.ingredients.forEach(ingr => {
            if(ingr) {
                game.player.inventory.removeResource(ingr);
                if(ingr.amount <= 0) {
                    this.removeIngredient(this.ingredients.indexOf(ingr));
                    getAlchemyPotionPreviewEffects(true);
                }
            }
        });
        drawResourceInventory();
        this.finishedBrewing();
    }

    brewing() {
        this.isBrewing = true;
    }
    finishedBrewing() {
        this.isBrewing = false;
    }
}
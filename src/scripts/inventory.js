/**
 * The Inventory class manages the objects owned by the player.
 */
class Inventory {
    constructor(gold = 1000) {
        this.weapons = [];
        this.armors = [];
        this.runes = [];
        this.resources = [];
        this.recipes = [];
        this.trinkets = [];
        this.shards = [];
        this.gold = gold;
    }

    /**
     * Adds a clone of the provided Item object to the inventory.
     * @param {Item} item the Item object to add
     * @param {number} amount the amount of times the item should be added
     */
    addItem(item, amount = 1) {
        if(!item) throw new Error('Tried to add a null object to the inventory.');

        let array = null;
        if(item instanceof Weapon) array = {items: this.weapons};
        else if(item instanceof Armor) array = {items: this.armors};
        else if(item instanceof Rune) array = {items: this.runes};
        else if(item instanceof Recipe) array = {items: this.recipes};
        else if(item instanceof Resource) {
            what(this.resources, item.name).amount += amount;
            console.log('Inventory : +' + amount + ' ' + item.name);
            return;
        }
        else throw new Error('Unsupported type for item cloning.');

        for(let i = 0; i < amount; i++) {
            let cloned = Entity.clone(item);
            if(cloned instanceof Weapon || cloned instanceof Armor || cloned instanceof Rune) cloned.generateStats();
            array.items.push(cloned);
        }

        console.log('Inventory : +' + amount + ' ' + item.name);
    }

    /**
     * Removes the provided Item object from the inventory.
     * @param {Item} item the Item object to remove
     */
    removeItem(item) {
        if(!item) throw new Error('Tried to remove a null object from the inventory.');

        let array = null;
        if(item instanceof Weapon) array = {items: this.weapons};
        else if(item instanceof Armor) array = {items: this.armors};
        else if(item instanceof Rune) array = {items: this.runes};
        else if(item instanceof Resource) array = {items: this.resources};
        else if(item instanceof Recipe) array = {items: this.recipes};
        else throw new Error('Unsupported type for item removal.');

        if(removeFromArray(array.items, item)) console.log('Inventory : Removed ' + item.name);
        else ERROR('Failed to remove ' + item.name + ' from the inventory.');
    }

    /**
     * @param {Data.ItemType} type the type of Item 
     * @param {number} id the ID of the Item to retrieve
     */
    getItemFromId(type, id) {
        let array = null;

        switch(type) {
            case Data.ItemType.WEAPON:
                array = {items: this.weapons};
                break;
            case Data.ItemType.ARMOR:
                array = {items: this.armors};
                break;
            case Data.ItemType.RUNE:
                array = {items: this.runes};
                break;
            case Data.ItemType.RECIPE:
                array = {items: this.recipes};
                break;
            default:
                throw new Error('Unsupported type for item search.');
        }

        for(let i = 0; i < array.items.length; i++) {
            if(array.items[i].id == id) return array.items[i];
        }
        throw new Error("Could not find Item with ID " + id);
    }

    /**
     * Removes the amount of the provided Resource from the inventory.
     * @param {Resource} resource 
     * @param {number} amount 
     */
    removeResource(resource, amount = 1) {
        const me = what(this.resources, resource.name);
        me.amount = Math.max(0, me.amount - amount);
    }

    /**
     * Tells whether the provided Item can be enchanted with the provided Rune.
     * @param {Weapon|Armor} item the Item that would host the Rune
     * @param {Rune} rune the Rune that would be bound to the Item
     * @returns whether the provided Item can be enchanted
     */
    allowEnchant(item, rune) {
        return (item instanceof Armor && rune.type === Data.RuneType.ARMOR && item.hasFreeSockets()) || (item instanceof Weapon && rune.type === Data.RuneType.WEAPON && item.hasFreeSockets());
    }

    /**
     * Unbinds the provided Rune to the provided Weapon or Armor and updates the stats accordingly.
     * @param {Weapon|Armor} item the Weapon or Armor to remove the Rune from
     * @param {Rune} rune the Rune to remove
     */
    disenchant(item, rune) {
        if(containsByName(item.sockets, rune.name)) {
            rune.effects.forEach(effect => {
                item.addEffect(effect, true);
            });
            if(rune.isCritical) {
                rune.critical.forEach(effect => {
                    item.addEffect(effect, true);
                });
            }
            if(rune.isCorrupt) {
                rune.corrupt.forEach(effect => {
                    item.addEffect(effect, true);
                });
            }
            item.unbindRune(rune);
            item.addAvailableSocket();
            console.log(rune.name + ' was unbound from ' + item.name);
        } else {
            ERROR('No such rune is bound to ' + item.name);
        }
    }

    /**
     * Binds the provided Rune to the provided Weapon or Armor and updates the stats accordingly.
     * @param {Weapon|Armor} armor the Weapon or Armor that will host the Rune
     * @param {Rune} rune the Rune that will be bound to the Weapon or Armor
     */
    enchant(item, rune) {
        if(this.allowEnchant(item, rune)) {
            rune.effects.forEach(effect => {
                item.addEffect(effect);
            });
            if(rune.isCritical) {
                rune.critical.forEach(effect => {
                    item.addEffect(effect);
                });
            }
            if(rune.isCorrupt) {
                rune.corrupt.forEach(effect => {
                    item.addEffect(effect);
                });
            }
            this.removeItem(rune);
            item.sockets.push(rune);
            item.removeAvailableSocket();
            console.log(rune.name + ' was bound to ' + item.name + '.');
        } else {
            console.log(rune.name + ' cannot be bound to ' + item.name + ' because their type is incompatible.');
        }
    }

    /**
     * Checks whether the inventory contains the correct amount of ingredients for the provided recipe to be executed.
     * @param {Recipe} recipe the Recipe to check ingredients for
     * @returns whether enough ingredients are possessed to execute the Recipe
     */
    checkForIngredients(recipe) {
        for(const ingredient of recipe.ingredients) {
            //console.log(ingredient.ingredient.name + " : " + getResourceAmount(this.resources, ingredient.ingredient.name) + "/" + ingredient.amount);
            if(ingredient.amount > getResourceAmount(this.resources, ingredient.ingredient.name)) {
                console.log("Not enough " + ingredient.ingredient.name + ".");
                return false;
            }
        }
        return true;
    }

    /**
     * Removes the ingredients required by the recipe from the inventory. This method should only be called after checkForIngredients() has been called beforehand.
     * @param {Recipe} recipe 
     */
    removeIngredients(recipe) {
        for(const ingredient of recipe.ingredients) {
            this.removeResource(ingredient.ingredient, ingredient.amount);
            console.log("Inventory: -" + ingredient.amount + " " + ingredient.ingredient.name);
        }
    }


    /**
     * Crafts the provided Recipe's output if all conditions are met, then adds it to the inventory.
     * @param {Recipe} recipe the Recipe to execute
     * @param {boolean} forceCritAndCorrupt enables forced critical and corrupt results 
     */
    craft(recipe, forceCritAndCorrupt = false) {
        if(this.checkForIngredients(recipe)) {
            // Creating a duplicate of the crafting result
            let result = Entity.clone(recipe.result);

            // Checking for crit chances
            if(computeChance(game.player.criticalFactor ) || forceCritAndCorrupt) {
                if(result instanceof Rune) result.setCritical();
            }

            // Checking for corrupt chances
            if(computeChance(game.player.corruptionFactor ) || forceCritAndCorrupt) {
                if(result instanceof Rune) result.setCorrupt();
            }

            // Removing ingredients
            this.removeIngredients(recipe);

            // Adding the item to the inventory
            this.addItem(result);
        } else {
            console.log("Not enough ingredients.");
        }
    }

    /**
     * Recasts the provided Item's stats if at least 1 Reminder is possessed.
     * @param {Item} item the item which stats should be recast
     */
    recast(item) {
        if(hasResource(this.resources, "reminder")) {
            item.generateStats();
            this.removeResource(what(this.resources, "reminder"));
        } else {
            console.log("A Reminder is required to recast a rune.");
        }
    }

    /**
     * Removes the corrupt state of the provided item if at least 1 Starblossom is possessed AND if the Item was not altered by a Lead Knot.
     * @param {Item} item the item which should be uncorrupted
     */
    uncorrupt(item) {
        if(hasResource(this.resources, "starblossom")) {
            if(!item.isAltered) {
                item.uncorrupt();
                this.removeResource(what(this.resources, "starblossom"));
            } else {
                console.log("This item could not be uncorrupted because it has been altered by a Lead Knot.");
            }
        } else {
            console.log("A Starblossom is required to uncorrupt a rune.");
        }
    }

    /**
     * Maximizes all of the stats of the provided Rune.
     * @param {Rune} rune the Rune which stats should be maximized
     */
    maximizeRune(rune) {
        if(hasResource(this.resources, "time stream catalyst")) {
            rune.maximize();
            this.removeResource(what(this.resources, "time stream catalyst"));
        } else {
            console.log("A Time Stream Catalyst is required to maximize a rune.");
        }
    }

    /**
     * Amplifies the Rune. Depending on the player's corruption factor, may also add corrupt effects.
     * @param {Rune} rune the Rune to amplify
     * @param {boolean} forceCorrupt forces corrupt effects on the rune
     */
    amplifyRune(rune, forceCorrupt = false) {
        if(hasResource(this.resources, "lead knot")) {
            if(rune.isMaximized()) {
                rune.amplify();
                // Checking for corrupt chances
                if(computeChance(game.player.corruptionFactor ) || forceCorrupt) {
                    console.log("This rune has been corrupted.");
                    // Creates the corrupt effect
                    let effect = Entity.clone(choose(game.all_runeCorruptEffects));
                    effect.fix();
                    rune.echoes.push(effect);
                }
                this.removeResource(what(this.resources, "lead knot"));
            } else {
                console.log("The rune can't be amplified if it's not maximized.");
            }
        } else {
            console.log("A Lead Knot is required to amplify a rune.");
        }
    }
}
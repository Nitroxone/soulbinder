/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

/**
 * The Inventory class manages the objects owned by the player.
 */
class Inventory {
    constructor(gold = 1000) {
        this.weapons = [];
        this.armors = [];
        this.sigils = [];
        this.resources = [];
        this.recipes = [];
        this.trinkets = [];
        this.shards = [];
        this.consumables = [];
        this.gold = gold;
    }

    /**
     * Adds a clone of the provided Item object to the inventory.
     * @param {Item} item the Item object to add
     * @param {number} amount the amount of times the item should be added
     */
    addItem(item, amount = 1, noClone = false) {
        if(!item) throw new Error('Tried to add a null object to the inventory.');

        let array = null;
        if(item instanceof Weapon) array = {items: this.weapons};
        else if(item instanceof Armor) array = {items: this.armors};
        else if(item instanceof Sigil) array = {items: this.sigils};
        else if(item instanceof Recipe) array = {items: this.recipes};
        else if(item instanceof Resource) {
            what(this.resources, item.name).amount += amount;
            console.log('Inventory : +' + amount + ' ' + item.name);
            return;
        }
        else if(item instanceof Consumable) array = {items: this.consumables}
        else if(item instanceof Trinket) array = {items: this.trinkets};
        else throw new Error('Unsupported type for item cloning.');

        let cloned;
        if(!noClone) {
            for(let i = 0; i < amount; i++) {
                cloned = Entity.clone(item);
                if(cloned instanceof Weapon || cloned instanceof Armor || cloned instanceof Trinket) {
                    cloned.generateStats();
                    cloned.addEcho();
                };
                if(cloned instanceof Sigil) cloned.generateStats();
            }
        } else {
            cloned = item;
        }
        array.items.push(cloned);

        if(canReceiveAstralForge(cloned) && !noClone) cloned.setAstralForgeItem();

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
        else if(item instanceof Sigil) array = {items: this.sigils};
        else if(item instanceof Resource) array = {items: this.resources};
        else if(item instanceof Consumable) array = {items: this.consumables};
        else if(item instanceof Recipe) array = {items: this.recipes};
        else if(item instanceof Trinket) array = {items: this.trinkets};
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
            case Data.ItemType.SIGIL:
                array = {items: this.sigils};
                break;
            case Data.ItemType.RECIPE:
                array = {items: this.recipes};
                break;
            case Data.ItemType.RESOURCE:
                array = {items: this.resources};
                break;
            case Data.ItemType.TRINKET:
                array = {items: this.trinkets};
                break;
            case Data.ItemType.CONSUMABLE:
                array = {items: this.consumables};
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
     * Tells whether the provided Item can be enchanted with the provided Sigil.
     * @param {Weapon|Armor} item the Item that would host the Sigil
     * @param {Sigil} sigil the Sigil that would be bound to the Item
     * @returns whether the provided Item can be enchanted
     */
    allowEnchant(item, sigil) {
        return (item instanceof Armor && sigil.type === Data.SigilType.ARMOR && item.hasFreeSockets()) || (item instanceof Weapon && sigil.type === Data.SigilType.WEAPON && item.hasFreeSockets());
    }

    /**
     * Unbinds the provided Sigil to the provided Weapon or Armor and updates the stats accordingly.
     * @param {Weapon|Armor} item the Weapon or Armor to remove the Sigil from
     * @param {Sigil} sigil the Sigil to remove
     */
    disenchant(item, sigil) {
        if(containsByName(item.sockets, sigil.name)) {
            sigil.effects.forEach(effect => {
                item.addEffect(effect, true);
            });
            if(sigil.isCritical) {
                sigil.critical.forEach(effect => {
                    item.addEffect(effect, true);
                });
            }
            if(sigil.isCorrupt) {
                sigil.corrupt.forEach(effect => {
                    item.addEffect(effect, true);
                });
            }
            item.unbindSigil(sigil);
            item.addAvailableSocket();
            console.log(sigil.name + ' was unbound from ' + item.name);
        } else {
            ERROR('No such sigil is bound to ' + item.name);
        }
    }

    /**
     * Binds the provided Sigil to the provided Weapon or Armor and updates the stats accordingly.
     * @param {Weapon|Armor} armor the Weapon or Armor that will host the Sigil
     * @param {Sigil} sigil the Sigil that will be bound to the Weapon or Armor
     */
    enchant(item, sigil) {
        sigil.effects.forEach(effect => {
            if(isEffectAllowedOnObject(effect.effect, item)) item.addEffect(effect);
            else effect.disable();
        });
        if(sigil.isCritical) {
            sigil.critical.forEach(effect => {
                item.addEffect(effect);
            });
        }
        if(sigil.isCorrupt) {
            sigil.corrupt.forEach(effect => {
                item.addEffect(effect);
            });
        }
        this.removeItem(sigil);
        item.sockets.push(sigil);
        item.removeAvailableSocket();
        console.log(sigil.name + ' was bound to ' + item.name + '.');
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
                if(result instanceof Sigil) result.setCritical();
            }

            // Checking for corrupt chances
            if(computeChance(game.player.corruptionFactor ) || forceCritAndCorrupt) {
                if(result instanceof Sigil) result.setCorrupt();
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
            console.log("A Reminder is required to recast a sigil.");
        }
    }

    /**
     * Removes the corrupt state of the provided item if at least 1 Starblossom is possessed AND if the Item was not altered by a Pearl of Wrath.
     * @param {Item} item the item which should be uncorrupted
     */
    uncorrupt(item) {
        if(hasResource(this.resources, "starblossom")) {
            if(!item.isAltered) {
                item.uncorrupt();
                this.removeResource(what(this.resources, "starblossom"));
            } else {
                console.log("This item could not be uncorrupted because it has been altered by a Pearl of Wrath.");
            }
        } else {
            console.log("A Starblossom is required to uncorrupt a sigil.");
        }
    }

    /**
     * Maximizes all of the stats of the provided Sigil.
     * @param {Sigil} sigil the Sigil which stats should be maximized
     */
    maximizeSigil(sigil) {
        if(hasResource(this.resources, "time stream catalyst")) {
            sigil.maximize();
            this.removeResource(what(this.resources, "time stream catalyst"));
        } else {
            console.log("A Time Stream Catalyst is required to maximize a sigil.");
        }
    }

    /**
     * Amplifies the Sigil. Depending on the player's corruption factor, may also add corrupt effects.
     * @param {Sigil} sigil the Sigil to amplify
     * @param {boolean} forceCorrupt forces corrupt effects on the sigil
     */
    amplifySigil(sigil, forceCorrupt = false) {
        if(hasResource(this.resources, "pearl of wrath")) {
            if(sigil.isMaximized()) {
                sigil.amplify();
                // Checking for corrupt chances
                if(computeChance(game.player.corruptionFactor ) || forceCorrupt) {
                    console.log("This sigil has been corrupted.");
                    // Creates the corrupt effect
                    let effect = Entity.clone(choose(game.all_sigilCorruptEffects));
                    effect.fix();
                    sigil.echoes.push(effect);
                }
                this.removeResource(what(this.resources, "pearl of wrath"));
            } else {
                console.log("The sigil can't be amplified if it's not maximized.");
            }
        } else {
            console.log("A Pearl of Wrath is required to amplify a sigil.");
        }
    }

    /**
     * Returns all of the Time Shards owned by the player.
     * @returns {TimeShard[]} an array of TimeShard objects
     */
    getTimeShards() {
        let timeShards = [];
        this.resources.forEach(res => {
            if(res instanceof TimeShard) timeShards.push(res);
        });
        return timeShards;
    }

    getCometDusts() {
        let cometDusts = [];
        let names = [
            "comet dust",
            "glowing comet dust",
            "sparkling comet dust"
        ]
        this.resources.forEach(res => {
            if(names.includes(res.name.toLowerCase())) cometDusts.push(res);
        });
        return cometDusts;
    }
}
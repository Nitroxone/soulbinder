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
        else throw new Error('Unsupported type for item removal.');

        if(removeFromArray(array.items, item)) console.log('Inventory : Removed ' + item.name);
        else ERROR('Failed to remove ' + item.name + ' from the inventory.');
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
     * Binds the provided Rune to the provided Armor.
     * @param {Armor} armor the Armor that will hold the Rune
     * @param {Rune} rune the Rune that will be bound to the Armor
     */
    enchantArmor(armor, rune) {
        if(Data.RuneType.ARMOR === rune.type) {
            if(armor.hasFreeSockets()) {
                for(const effect of rune.effects) {
                    if(Data.Effect.PRES === effect.effect) {
                        armor.pres += effect.getValue();
                    }
                    switch(effect.effect) {
                        case Data.Effect.PRES:
                            armor.pres += effect.getValue();
                        case Data.Effect.MRES:
                            armor.mres += effect.getValue();
                    }
                }
                this.removeItem(rune);
                armor.sockets.push(rune);
                armor.removeAvailableSocket();
                console.log(rune.name + ' was bound to ' + armor.name + '.');
            } else {
                console.log('No available sockets for this armor.');
            }
        } else {
            console.log(rune.name + ' cannot be bound to ' + armor.name + ' because their type is incompatible.');
        }
    }
}
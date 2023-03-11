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
     * Adds the provided Item object to the inventory.
     * @param {Item} item 
     * @param {number} amount 
     */
    addItem(item, amount = 1) {
        if(!item) throw new Error('Tried to add a null object to the inventory.');

        let array = null;
        if(item instanceof Weapon) array = {items: this.weapons};
        else throw new Error('Unsupported type for item cloning.');

        for(let i = 0; i < amount; i++) {
            array.items.push(Entity.clone(item));
        }

        console.log('Inventory : +' + amount + ' ' + item.name);
    }

    removeItem(item) {
        if(!item) throw new Error('Tried to remove a null object from the inventory.');

        let array = null;
        if(item instanceof Weapon) array = {items: this.weapons};
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
}
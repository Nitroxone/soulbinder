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
            for(const effect of rune.effects) {
                if(item instanceof Armor) {
                    switch(effect.effect) {
                        case Data.Effect.PRES:
                            armor.pres -= effect.getValue();
                            break;
                        case Data.Effect.MRES:
                            armor.mres -= effect.getValue();
                            break;
                    }
                } else {
                    switch(effect.effect) {
                        case Data.Effect.PDMG:
                            weapon.pdmg[0] -= effect.getValue();
                            weapon.pdmg[1] -= effect.getValue();
                            break;
                        case Data.Effect.MDMG:
                            weapon.mdmg[0] -= effect.getValue();
                            weapon.mdmg[1] -= effect.getValue();
                            break;
                        case Data.Effect.BLOCK:
                            weapon.block -= effect.getValue();
                            break;
                        case Data.Effect.EFFORT:
                            weapon.effort -= effect.getValue();
                            break;
                        case Data.Effect.CRIT_LUK:
                            weapon.crit_luk -= effect.getValue();
                            break;
                        case Data.Effect.CRIT_DMG:
                            weapon.crit_dmg -= effect.getValue();
                            break;
                        case Data.Effect.BLEED_DMG:
                            weapon.bleed[0] -= effect.getValue();
                            break;
                        case Data.Effect.BLEED_DURATION:
                            weapon.bleed[1] -= effect.getValue();
                            break;
                        case Data.Effect.BLEED_CURABLE:
                            weapon.bleed[2] = true;
                            break;
                        case Data.Effect.BLEED_INCURABLE: 
                            weapon.bleed[2] = false;
                            break;
                    }
                }
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
            for(const effect of rune.effects) {
                if(item instanceof Armor) {
                    switch(effect.effect) {
                        case Data.Effect.PRES:
                            armor.pres += effect.getValue();
                            break;
                        case Data.Effect.MRES:
                            armor.mres += effect.getValue();
                            break;
                    }
                } else {
                    switch(effect.effect) {
                        case Data.Effect.PDMG:
                            weapon.pdmg[0] += effect.getValue();
                            weapon.pdmg[1] += effect.getValue();
                            break;
                        case Data.Effect.MDMG:
                            weapon.mdmg[0] += effect.getValue();
                            weapon.mdmg[1] += effect.getValue();
                            break;
                        case Data.Effect.BLOCK:
                            weapon.block += effect.getValue();
                            break;
                        case Data.Effect.EFFORT:
                            weapon.effort += effect.getValue();
                            break;
                        case Data.Effect.CRIT_LUK:
                            weapon.crit_luk += effect.getValue();
                            break;
                        case Data.Effect.CRIT_DMG:
                            weapon.crit_dmg += effect.getValue();
                            break;
                        case Data.Effect.BLEED_DMG:
                            weapon.bleed[0] += effect.getValue();
                            break;
                        case Data.Effect.BLEED_DURATION:
                            weapon.bleed[1] += effect.getValue();
                            break;
                        case Data.Effect.BLEED_CURABLE:
                            weapon.bleed[2] = true;
                            break;
                        case Data.Effect.BLEED_INCURABLE: 
                            weapon.bleed[2] = false;
                            break;
                    }
                }
            }
            this.removeItem(rune);
            item.sockets.push(rune);
            item.removeAvailableSocket();
            console.log(rune.name + ' was bound to ' + item.name + '.');
        } else {
            console.log(rune.name + ' cannot be bound to ' + item.name + ' because their type is incompatible.');
        }
    }
}
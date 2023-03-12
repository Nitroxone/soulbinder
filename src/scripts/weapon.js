/**
 * The Weapon class holds data for Weapons in the game.
 */
class Weapon extends Item {
    constructor(name, desc, icon, price, rarity, type, 
                weight, 
                pdmg, 
                mdmg, 
                t_block, 
                t_effort, 
                t_crit_luk, 
                t_crit_dmg, 
                t_bleed, 
                t_poison, 
                range, 
                sockets_amount = 1,
                modifier = null) {
        super(name, desc, icon, price, rarity);
        this.type = type;
        this.weight = weight;
        this.pdmg = pdmg;
        this.mdmg = mdmg;

        this.t_block = t_block;
        this.t_effort = t_effort;
        this.t_crit_luk = t_crit_luk;
        this.t_crit_dmg = t_crit_dmg;
        this.t_bleed = t_bleed;
        this.t_poison = t_poison;

        this.block = null,
        this.effort = null;
        this.crit_luk = null;
        this.crit_dmg = null;
        this.bleed = null;
        this.poison = null;

        this.range = range;

        this.modifier = modifier;

        this.sockets_amount = sockets_amount;
        this.sockets_free = sockets_amount;
        this.sockets = [];
    }

    /**
     * Generates stats for a weapon, based on its theorical values.
     */
    generateStats() {
        this.block = getRandomNumberFromArray(this.t_block);
        this.effort = getRandomNumberFromArray(this.t_effort);
        this.crit_luk = getRandomNumberFromArray(this.t_crit_luk);
        this.crit_dmg = getRandomNumberFromArray(this.t_crit_dmg);
        this.bleed = [
            getRandomNumberFromArray(this.t_bleed[0]),
            getRandomNumberFromArray(this.t_bleed[1]),
            this.t_bleed[2]
        ];
        this.poison = [
            getRandomNumberFromArray(this.t_poison[0]),
            getRandomNumberFromArray(this.t_poison[1]),
            this.t_poison[2]
        ];
    }

    /**
     * Adds an available socket. Cannot exceed the sockets_amount variable.
     * @param {number} amount the amount of sockets to add
     */
    addAvailableSocket(amount = 1) {
        this.sockets_free = Math.min(this.sockets_amount, this.sockets_free + amount);
    }
    /**
     * Removes an available socket. Cannot go below zero.
     * @param {number} amount the amount of sockets to remove
     */
    removeAvailableSocket(amount = 1) {
        this.sockets_free = Math.max(0, this.sockets_free - amount);
    }
}
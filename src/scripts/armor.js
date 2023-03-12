/**
 * The Armor class holds data for armors in the game.
 */
class Armor extends Item {
    constructor(name, desc, icon, price, rarity, 
                type, 
                t_pres, 
                t_mres, 
                sockets_amount = 1,
                modifier = null) {
        super(name, desc, icon, price, rarity);
        this.type = type;

        this.t_pres = t_pres;
        this.t_mres = t_mres;
        
        this.pres = null;
        this.mres = null;

        this.modifier = modifier;

        this.sockets_amount = sockets_amount;
        this.sockets_free = sockets_amount;
        this.sockets = [];
    }

    /**
     * Generates stats for an armor, based on its theorical values.
     */
    generateStats() {
        this.pres = getRandomNumberFromArray(this.t_pres);
        this.mres = getRandomNumberFromArray(this.t_mres);
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
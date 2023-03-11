class Weapon extends Item {
    constructor(name, desc, icon, price, rarity, type, weight, pdmg, mdmg, block, effort, crit_luk, crit_dmg, bleed, poison, range, sockets_amount) {
        super(name, desc, icon, price, rarity);
        this.type = type;
        this.weight = weight;
        this.pdmg = pdmg;
        this.mdmg = mdmg;
        this.block = block;
        this.effort = effort;
        this.crit_luk = crit_luk;
        this.crit_dmg = crit_dmg;
        this.bleed = bleed;
        this.poison = poison;
        this.range = range;

        this.sockets_amount = sockets_amount;
        this.sockets_free = sockets_amount;
        this.sockets = [];
    }

    addAvailableSocket(amount = 1) {
        this.sockets_free += amount;
    }
    removeAvailableSocket(amount = 1) {
        this.sockets_free -= amount;
    }
}
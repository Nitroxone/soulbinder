/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class Trinket extends Item {
    constructor(name, desc, icon, price, rarity, 
                effects,
                echoes = []) {
        super(name, desc, icon, price, rarity);
        this.effects = effects;
        
        this.echoes_amount = 1;
        this.echoes_free = 1;
        this.echoes = echoes;

        this.sockets_amount = 1;
        this.sockets_free = 1;
        this.sockets = [];
        
        this.set = null;

        // ASTRAL FORGE VARIABLES
        //this.astralForgeItem = new AstralForge(this);
    }
    
    /**
     * Generates stats for a trinket, based on its theorical values.
     */
    generateStats() {
        this.effects.forEach(effect => {
            effect.fix();
        })
    }

    /**
     * Unbinds the provided Sigil from the Trinket.
     * @param {Sigil} sigil the sigil to unbind from the Trinket
     */
    unbindSigil(sigil) {
        removeFromArray(this.sockets, sigil);
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

    /**
     * Returns whether the sockets_free property of the Weapon is superior to 0.
     * @returns {boolean} whether the Weapon has free sockets
     */
    hasFreeSockets() {
        return this.sockets_free > 0;
    }

    /**
     * Adds an available echo slot. Cannot exceed the echoes_amount variable.
     * @param {number} amount the amount of ecohes to add
     */
    addAvailableEcho(amount = 1) {
        this.echoes_free = Math.min(this.echoes_amount, this.echoes_free + amount);
    }
    /**
     * Removes an available echo slot. Cannot go below zero.
     * @param {number} amount the amount of echoes to remove
     */
    removeAvailableEcho(amount = 1) {
        this.echoes_free = Math.max(0, this.echoes_free - amount);
    }

    /**
     * Returns whether the echoes_free property of the Trinket is superior to 0.
     * @returns {boolean} whether the Trinket has free echoes
     */
    hasFreeEchoes() {
        return this.echoes_free > 0;
    }

    /**
     * Adds the provided Stat to the Trinket's effects.
     * @param {Stat} effect 
     * @param {boolean} remove whether the Effect should be removed instead of being added
     */
    addEffect(effect, remove = false) {
        const factor = remove ? -1 : 1;
        let changed = false;
        this.effects.forEach(eff => {
            if(eff.effect === effect.effect) {
                eff.value += effect.getValue() * factor
                console.log('Updated ' + this.name + "'s [" + effect.effect + "] property to " + eff.value);
                changed = true;
            }
        });
        //if(!changed) throw new Error('Tried to change an unexisting effect [' + effect.effect + ' on ' + this.name);
    }

    /**
     * Returns the value of the provided Effect.
     * @param {Data.Effect} effect the Effect to look for
     * @returns {number} the value of the provided Effect
     */
    getEffectValue(effect) {
        let value = null;
        this.effects.forEach(eff => {
            if(eff.effect === effect) value = eff.getValue();
        });
        return value;
    }

    /**
     * Adds the provided Echo to the Weapon.
     * @param {Echo} echo the Echo to add. if no Echo is provided, it will be picked randomly.
     */
    addEcho(echo = null) {
        if(this.hasFreeEchoes()) {
            if(!echo) {
                let pool = game.all_echoes.filter(echo => {
                    return echo.type === Data.EchoType.TRINKET || echo.type === Data.EchoType.ANY
                });
                echo = choose(pool);
            }
            echo = Entity.clone(echo);
            echo.fix();
            this.echoes.push(echo);
            this.removeAvailableEcho();
        } else {
            ERROR('No available echo slots left on ' + this.name);
        }
    }

    /**
     * Creates a new AstralForge association with this Trinket.
     */
    setAstralForgeItem() {
        this.astralForgeItem = new AstralForge(this.id);
    }
}
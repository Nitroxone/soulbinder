/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class Trinket extends Item {
    constructor(name, desc, icon, price, rarity, 
                effects,
                allowedAlterations = 1,
                echo = null) {
        super(name, desc, icon, price, rarity);
        this.effects = effects;

        this.allowedAlterations = allowedAlterations;
        this.alterations = [];
        this.echo = echo;
        this.sigil = null;
        
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
    unbindSigil() {
        this.sigil = null;
    }

    /**
     * Returns whether this Trinket has a bound Sigil.
     * @returns {boolean} whether the Trinket has a sigil
     */
    hasSigil() {
        return this.sigil != null;
    }

    /**
     * Returns whether this Trinket has a bound Echo.
     * @returns {boolean} whether the Trinket has an echo
     */
    hasEcho() {
        return this.echo != null;
    }

    /**
     * Adds the provided Stat to this Trinket's list of alterations.
     * @param {Stat} effect the alteration to add
     */
    addAlteration(effect) {
        if(this.canAddAlteration()) this.alterations.push(effect);
    }

    /**
     * Removes the provided Stat from this Trinket's list of alterations.
     * @param {Stat} effect the alteration to remove
     */
    removeAlteration(effect) {
        removeFromArray(this.alterations, effect);
    }

    /**
     * Returns whether this Trinket can host another alteration.
     * @returns {boolean} whether an alteration can be added
     */
    canAddAlteration() {
        return this.alterations.length < this.allowedAlterations;
    }

    /**
     * Returns the amount of available alterations on this Trinket.
     * @returns {number} the number of current alterations
     */
    getAvailableAlterations() {
        return Math.max(0, this.allowedAlterations - this.alterations.length);
    }

    /**
     * Adds a slot of allowed alterations on this item.
     */
    addAllowedAlteration() {
        this.allowedAlterations += 1;
    }

    /**
     * Removes a slot of allowed alterations on this item.
     */
    removeAllowedAlteration() {
        this.allowedAlterations = Math.max(1, this.allowedAlterations - 1);
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
        if(!this.hasEcho() && false) { // NEGATED FOR NOW
            if(!echo) {
                let pool = game.all_echoes.filter(echo => {
                    return echo.type === Data.EchoType.TRINKET || echo.type === Data.EchoType.ANY
                });
                echo = choose(pool);
            }
            echo = Entity.clone(echo);
            echo.fix();
            this.echo = echo;
            this.echo.parent = this;
        } else {
            if(this.echo) this.echo.parent = this;
        }
    }

    /**
     * Creates a new AstralForge association with this Trinket.
     */
    setAstralForgeItem() {
        this.astralForgeItem = new AstralForge(this.id);
    }
}
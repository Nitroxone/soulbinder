/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

/**
 * The Armor class holds data for armors in the game.
 */
class Armor extends Item {
    /**
     * @param {string} name the Armor's name
     * @param {string} desc the Armor's description
     * @param {number} icon the Armor's icon
     * @param {number} price the Armor's price
     * @param {string} rarity the Armor's rarity
     * @param {string} type the Armor's type (Data.ArmorType)
     * @param {array} t_resilience the Armor's theorical resilience
     * @param {array} t_warding the Armor's theorical warding
     * @param {number} sockets_amount the Armor's sockets amount
     * @param {number} echoes_amount
     * @param {array} echoes the Armor's optional echoes
     */
    constructor(name, desc, icon, price, rarity, 
                type, 
                t_resilience, 
                t_warding, 
                allowedAlterations = 1,
                echo = null) {
        super(name, desc, icon, price, rarity);
        this.type = type;

        this.t_resilience = t_resilience;
        this.t_warding = t_warding;
        
        this.resilience = null;
        this.warding = null;

        this.allowedAlterations = allowedAlterations;
        this.alterations = [];
        this.echo = echo;
        this.sigil = null;

        this.set = null;

        // ASTRAL FORGE VARIABLES
        //this.astralForgeItem = new AstralForge(this);
    }

    /**
     * Generates stats for an armor, based on its theorical values.
     */
    generateStats() {
        this.resilience = new Stat({effect: Data.Effect.RESILIENCE, theorical: this.t_resilience, fixed: true}); 
        this.warding = new Stat({effect: Data.Effect.WARDING, theorical: this.t_warding, fixed: true});
    }

    /**
     * Unbinds the provided Sigil from the Armor.
     * @param {Sigil} sigil the sigil to unbind from the Armor
     */
    unbindSigil() {
        this.sigil = null;
    }

    /**
     * Returns whether this Armor has a bound Sigil.
     * @returns {boolean} whether the Armor has a sigil
     */
    hasSigil() {
        return this.sigil != null;
    }

    /**
     * Returns whether this Armor has a bound Echo.
     * @returns {boolean} whether the Armor has an echo
     */
    hasEcho() {
        return this.echo != null;
    }

    /**
     * Adds the provided Stat to this Armor's list of alterations.
     * @param {Stat} effect the alteration to add
     */
    addAlteration(effect) {
        if(this.canAddAlteration()) this.alterations.push(effect);
    }

    /**
     * Removes the provided Stat from this Armor's list of alterations.
     * @param {Stat} effect the alteration to remove
     */
    removeAlteration(effect) {
        removeFromArray(this.alterations, effect);
    }

    /**
     * Returns whether this Armor can host another alteration.
     * @returns {boolean} whether an alteration can be added
     */
    canAddAlteration() {
        return this.alterations.length < this.allowedAlterations;
    }

    /**
     * Returns the amount of available alterations on this Armor.
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
     * Adds the Stat's data to the Armor's data.
     * @param {Stat} effect the Stat to add
     * @param {boolean} remove whether the Stat should removed instead of being added
     */
    addEffect(effect, remove = false) {
        const factor = remove ? -1 : 1;
        switch(effect.effect) {
            case Data.Effect.RESILIENCE:
                this.resilience.value += effect.getValue() * factor;
                break;
            case Data.Effect.WARDING:
                this.warding.value += effect.getValue() * factor;
                break;
        }
    }

    /**
     * Adds the provided Echo to the Armor.
     * @param {Echo} echo the Echo to add. if no Echo is provided, it will be picked randomly.
     */
    addEcho(echo = null) {
        if(!this.hasEcho() && (this.type === Data.ArmorType.SHIELD || this.type === Data.ArmorType.CHESTPLATE)) {
            if(!echo) {
                let pool = game.all_echoes.filter(echo => {
                    return echo.type === Data.EchoType.ARMOR || echo.type === Data.EchoType.ANY
                });
                echo = choose(pool);
            }
            echo = Entity.clone(echo);
            echo.fix();
            this.echo = echo;
            this.echo.parent = this;
            this.echo.triggers.forEach(trig => {
                trig.behavior = trig.behavior.bind(this.echo);
                trig.checker = trig.checker.bind(this.echo);
            })
        } else {
            if(this.echo) {
                this.echo.parent = this;
                this.echo.fix();
            }
        }
    }

    /**
     * Creates a new AstralForge association with this Armor.
     */
    setAstralForgeItem() {
        this.astralForgeItem = new AstralForge(this.id);
    }
}
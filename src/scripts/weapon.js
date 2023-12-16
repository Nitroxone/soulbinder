/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

/**
 * The Weapon class holds data for Weapons in the game.
 */
class Weapon extends Item {
    /**
     * @param {string} name the Weapon's name
     * @param {string} desc the Weapon's description
     * @param {number} icon the Weapon's icon
     * @param {number} price the Weapon's price
     * @param {string} rarity the Weapon's rarity
     * @param {string} type the Weapon's type (Data.WeaponType)
     * @param {string} weight the Weapon's weight (Data.WeaponWeight)
     * @param {array} sharpness the Weapon's sharpness (2D array: min and max)
     * @param {array} withering the Weapon's withering (2D array: min and max)
     * @param {array} t_block the Weapon's theorical block
     * @param {array} t_effort the Weapon's theorical effort
     * @param {array} t_crit_luk the Weapon's theorical critical chance
     * @param {array} t_crit_dmg the Weapon's theorical critical damage
     * @param {array} t_bleed the Weapon's theorical bleed (3D array: theorical DMG, theorical duration, curability)
     * @param {array} t_poison the Weapon's theorical poison (3D array: theorical DMG, theorical duration, curability)
     * @param {array} range the Weapon's range (3D array: FRONT, MIDDLE, BACK)
     * @param {number} sockets_amount the Weapon's sockets amount
     * @param {number} echoes_amount the amount of Echo the Weapon can host
     * @param {array} echoes the Weapon's optional echoes
     */
    constructor(name, desc, icon, price, rarity, type,
                weight,
                sharpness,
                withering,
                t_block,
                t_effort,
                t_crit_luk,
                t_crit_dmg,
                t_bleed,
                t_poison,
                range,
                allowedAlterations = 3,
                echo = null) {
        super(name, desc, icon, price, rarity);
        this.type = type;
        this.weight = weight;
        this.sharpness = sharpness;
        this.withering = withering;

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

        this.staDmgRate = weight === Data.WeaponWeight.HEAVY ? 0.25 : 0.75;

        this.allowedAlterations = allowedAlterations;
        this.alterations = [];
        this.sigil = null;
        this.echo = echo;

        this.set = null;

        this.astralForgeItem = null;

        if(this.echo) {
            this.echo.fix();
            this.echo.stats.forEach(effect => {
                this.addEffect(effect);
            });
        };
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
     * Unbinds the provided Sigil from the Weapon.
     * @param {Sigil} sigil the sigil to unbind from the Weapon
     */
    unbindSigil() {
        this.sigil = null;
    }

    /**
     * Returns whether this Weapon has a bound Sigil.
     * @returns {boolean} whether the Weapon has a sigil
     */
    hasSigil() {
        return this.sigil != null;
    }

    /**
     * Returns whether this Weapon has a bound Echo.
     * @returns {boolean} whether the Weapon has an echo
     */
    hasEcho() {
        return this.echo != null;
    }

    /**
     * Adds the provided Stat to this Weapon's list of alterations.
     * @param {Stat} effect the alteration to add
     */
    addAlteration(effect) {
        if(this.canAddAlteration()) this.alterations.push(effect);
    }

    /**
     * Removes the provided Stat from this Weapon's list of alterations.
     * @param {Stat} effect the alteration to remove
     */
    removeAlteration(effect) {
        removeFromArray(this.alterations, effect);
    }

    /**
     * Returns whether this Weapon can host another alteration.
     * @returns {boolean} whether an alteration can be added
     */
    canAddAlteration() {
        return this.alterations.length < this.allowedAlterations;
    }

    /**
     * Returns the amount of available alterations on this Weapon.
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
     * Adds the Stat's data to the Weapon's data.
     * @param {Stat} effect the Stat to add
     * @param {boolean} remove whether the Stat should removed instead of being added
     */
    addEffect(effect, remove = false) {
        const factor = remove ? -1 : 1;
        switch(effect.effect) {
            case Data.Effect.SHARPNESS:
                this.sharpness[0] = Math.max(0, this.sharpness[0] + effect.getValue() * factor);
                this.sharpness[1] = Math.max(0, this.sharpness[1] + effect.getValue() * factor);
                break;
            case Data.Effect.WITHERING:
                this.withering[0] = Math.max(0, this.withering[0] + effect.getValue() * factor);
                this.withering[1] = Math.max(0, this.withering[1] + effect.getValue() * factor);
                break;
            case Data.Effect.BLOCK:
                this.block = Math.max(0, this.block + effect.getValue() * factor);
                break;
            case Data.Effect.EFFORT:
                this.effort = Math.max(0, this.effort + effect.getValue() * factor);
                break;
            case Data.Effect.CRIT_LUK:
                this.crit_luk = Math.max(0, this.crit_luk + effect.getValue() * factor);
                break;
            case Data.Effect.CRIT_DMG:
                this.crit_dmg = Math.max(0, this.crit_dmg + effect.getValue() * factor);
                break;
            case Data.Effect.BLEED_DMG:
                this.bleed[0] = Math.max(0, this.bleed[0] + effect.getValue() * factor);
                break;
            case Data.Effect.BLEED_DURATION:
                this.bleed[1] = Math.max(0, this.bleed[1] + effect.getValue() * factor);
                break;
            case Data.Effect.BLEED_CURABLE:
                this.bleed[2] = remove ? !this.bleed[2] : this.bleed[2];
                break;
            case Data.Effect.BLEED_INCURABLE:
                this.bleed[2] = remove ? !this.bleed[2] : this.bleed[2];
                break;
            case Data.Effect.POISON_DMG:
                this.poison[0] = Math.max(0, this.poison[0] + effect.getValue() * factor);
                break;
            case Data.Effect.POISON_DURATION:
                this.poison[1] = Math.max(0, this.poison[1] + effect.getValue() * factor);
                break;
            case Data.Effect.POISON_CURABLE:
                this.poison[2] = remove ? !this.poison[2] : this.poison[2];
                break;
            case Data.Effect.POISON_INCURABLE:
                this.poison[2] = remove ? !this.poison[2] : this.poison[2];
                break;
            case Data.Effect.RANGE_BACK_OFF:
                this.range[2] = remove ? !this.range[2] : this.range[2];
                break;
            case Data.Effect.RANGE_BACK_ON:
                this.range[2] = remove ? !this.range[2] : this.range[2];
                break;
            case Data.Effect.RANGE_MIDDLE_OFF:
                this.range[1] = remove ? !this.range[1] : this.range[1];
                break;
            case Data.Effect.RANGE_MIDDLE_ON:
                this.range[1] = remove ? !this.range[1] : this.range[1];
                break;
            case Data.Effect.RANGE_FRONT_OFF:
                this.range[0] = remove ? !this.range[0] : this.range[0];
                break;
            case Data.Effect.RANGE_FRONT_ON:
                this.range[0] = remove ? !this.range[0] : this.range[0];
                break;
        }
    }

    /**
     * Adds the provided Echo to the Weapon.
     * @param {Echo} echo the Echo to add. if no Echo is provided, it will be picked randomly.
     */
    addEcho(echo = null) {
        if(!this.hasEcho()) {
            if(!echo) {
                let pool = game.all_echoes.filter(echo => {
                    return echo.type === Data.EchoType.WEAPON || echo.type === Data.EchoType.ANY
                });
                echo = choose(pool);
            }
            echo = Entity.clone(echo);
            echo.fix();
            echo.stats.forEach(effect => {
                this.addEffect(effect);
            });
            this.echo = echo;
            this.echo.parent = this;
            this.echo.triggers.forEach(trig => {
                trig.behavior = trig.behavior.bind(this.echo);
                trig.checker = trig.checker.bind(this.echo);
            })
        } else {
            this.echo.parent = this;
            this.echo.triggers.forEach(trig => {
                trig.behavior = trig.behavior.bind(this.echo);
                trig.checker = trig.checker.bind(this.echo);
            })
        }
    }

    /**
     * Creates a new AstralForge association with this Weapon.
     */
    setAstralForgeItem() {
        this.astralForgeItem = new AstralForge(this.id);
    }

    /**
     * Gets a random Sharpness number for this Weapon.
     * @returns {number} a Sharpness value
     */
    getSharpness() {
        return getRandomNumber(this.sharpness[0], this.sharpness[1]);
    }

    /**
     * Gets a random Withering number for this Weapon.
     * @returns {number} a Withering value
     */
    getWithering() {
        return getRandomNumber(this.withering[0], this.withering[1]);
    }
}
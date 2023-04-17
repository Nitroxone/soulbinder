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
     * @param {array} pdmg the Weapon's sharpness (2D array: min and max)
     * @param {array} mdmg the Weapon's withering (2D array: min and max)
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
                echoes_amount = 1,
                echoes = []) {
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

        this.echoes_amount = echoes_amount;
        this.echoes_free = echoes_amount;
        this.echoes = echoes;

        this.sockets_amount = sockets_amount;
        this.sockets_free = sockets_amount;
        this.sockets = [];
        
        this.set = null;

        // ASTRAL FORGE VARIABLES
        this.substrate = 0;
        this.astralForgeItem = null;
        this.extraEffects = [];

        this.allEffects = [];
        this.setAllEffects();
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
     * Unbinds the provided Rune from the Weapon.
     * @param {Rune} rune the rune to unbind from the Weapon
     */
    unbindRune(rune) {
        removeFromArray(this.sockets, rune);
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
     * Returns whether the echoes_free property of the Weapon is superior to 0.
     * @returns {boolean} whether the Weapon has free echoes
     */
    hasFreeEchoes() {
        return this.echoes_free > 0;
    }

    /**
     * Adds the Stat's data to the Weapon's data.
     * @param {Stat} effect the Stat to add
     * @param {boolean} remove whether the Stat should removed instead of being added
     */
    addEffect(effect, remove = false) {
        const factor = remove ? -1 : 1;
        switch(effect.effect) {
            case Data.Effect.PDMG:
                this.pdmg[0] = Math.max(0, this.pdmg[0] + effect.getValue() * factor);
                this.pdmg[1] = Math.max(0, this.pdmg[1] + effect.getValue() * factor);
                break;
            case Data.Effect.MDMG:
                this.mdmg[0] = Math.max(0, this.mdmg[0] + effect.getValue() * factor);
                this.mdmg[1] = Math.max(0, this.mdmg[1] + effect.getValue() * factor);
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
                this.bleed[2] = !remove;
                break;
            case Data.Effect.BLEED_INCURABLE: 
                this.bleed[2] = remove;
                break;
            case Data.Effect.POISON_DMG:
                this.poison[0] = Math.max(0, this.poison[0] + effect.getValue() * factor);
                break;
            case Data.Effect.POISON_DURATION:
                this.poison[1] = Math.max(0, this.poison[1] + effect.getValue() * factor);
                break;
            case Data.Effect.POISON_CURABLE:
                this.poison[2] = !remove;
                break;
            case Data.Effect.POISON_INCURABLE: 
                this.poison[2] = remove;
                break;
            case Data.Effect.RANGE_BACK_OFF:
                this.range[2] = remove;
                break;
            case Data.Effect.RANGE_BACK_ON:
                this.range[2] = !remove;
                break;
            case Data.Effect.RANGE_MIDDLE_OFF:
                this.range[2] = remove;
                break;
            case Data.Effect.RANGE_MIDDLE_ON:
                this.range[2] = !remove;
                break;
            case Data.Effect.RANGE_FRONT_OFF:
                this.range[2] = remove;
                break;
            case Data.Effect.RANGE_FRONT_ON:
                this.range[2] = !remove;
                break;
        }
    }

    /**
     * Adds the provided Echo to the Weapon.
     * @param {Echo} echo the Echo to add. if no Echo is provided, it will be picked randomly.
     */
    addEcho(echo = null) {
        if(this.hasFreeEchoes()) {
            if(!echo) {
                let pool = game.all_echoes.filter(echo => {
                    return echo.type === Data.EchoType.WEAPON || echo.type === Data.EchoType.ANY
                });
                echo = choose(pool);
            }
            echo = Entity.clone(echo);
            echo.fix();
            echo.stats.forEach(effect => {
                console.log(effect)
                this.addEffect(effect);
            })
            this.echoes.push(echo);
            this.removeAvailableEcho();
        } else {
            ERROR('No available echo slots left on ' + this.name);
        }
    }

    /**
     * Alters the targeted effect with the provided Time Shard. 
     * @param {TimeShard} shard the Shard to use
     * @param {Data.Effect} effect the targeted effect
     */
    alterEffect(shard, effect) {
        // Safety checks
        if(!this.checkTargetedEffectValidity(effect) && shard.getValueType() !== "string")
            throw new Error('Attempted to alter an effect that does not exist on : ' + this.name);
        if(!this.checkTimeShardValidityForAlteration(shard, effect)  && shard.getValueType() !== "string") 
            throw new Error(shard.name + ' cannot be used to alter ' + effect + ' on ' + this.name + ' (uncompatible types)');
        
        switch(this.computeAlterationChances(effect)) {
            case Data.AlterationAttemptOutcome.CRITICAL_FAILURE:
                this.alterCriticalFailure(shard, effect);
                break;
            case Data.AlterationAttemptOutcome.FAILURE:
                this.alterFailure(shard);
                break;
            case Data.AlterationAttemptOutcome.SUCCESS:
                this.alterSuccess(shard, effect);
                break;
            case Data.AlterationAttemptOutcome.CRITICAL_SUCCESS:
                this.alterCriticalSuccess(effect);
                break;
        }
    }

    /**
     * Triggers a critical failure on the Weapon's targeted effect, based on the provided Time Shard.
     * @param {TimeShard} shard the Time Shard to apply
     * @param {Data.Effect} effect the targeted effect
     */
    alterCriticalFailure(shard, effect) {
        console.log('Critical failure!');
        this.collateralReduction(effect);
        game.player.inventory.removeResource(shard);
    }

    /**
     * Triggers a failure on the Weapon's targeted effect, based on the provided Time Shard.
     * @param {TimeShard} shard the Time Shard to apply
     * @param {Data.Effect} effect the targeted effect
     */
    alterFailure(shard) {
        console.log('Failure!');
        game.player.inventory.removeResource(shard);
    }

    /**
     * Triggers a success on the Weapon's targeted effect, based on the provided Time Shard.
     * @param {TimeShard} shard the Time Shard to apply
     * @param {Data.Effect} effect the targeted effect
     */
    alterSuccess(shard, effect) {
        console.log('Success!');
        this.applyReductions(effect);
        this.applyAlteration(shard, effect);
        game.player.inventory.removeResource(shard);
    }

    /**
     * Triggers a critical success on the Weapon's targeted effect, based on the provided Time Shard.
     * @param {TimeShard} shard the Time Shard to apply
     * @param {Data.Effect} effect the targeted effect
     */
    alterCriticalSuccess(effect) {
        console.log('Critical success!');
        this.applyAlteration(shard, effect);
    }

    /**
     * Returns the Weapon's amount of effects (ie. the amount of base immutable effects as well as the extra effects);
     * @returns {number} the Weapon's amount of effects
     */
    getEffectsAmount() {
        return 13 + this.extraEffects.length;
    }

    /**
     * Returns a randomly generated amount of collateral reductions on the Weapon.
     * It is a random number between 1 and half of the Weapon's amount of effects.
     * @returns {number} the amount of collateral reductions
     */
    getCollateralReductionsAmount() {
        return getRandomNumber(1, this.getEffectsAmount()/2);
    }

    /**
     * Applies collateral reductions on the Weapon. Optionally excludes the provided Effect.
     * A random amount of random effects among the Weapon are reduced. Boolean effects are not affected.
     * @param {Data.Effect} excluded an optionally excluded Effect
     */
    applyReductions(excluded = null) {
        let targetedEffects = [];
        let pool = shuffle(this.allEffects);
        for(let i = 0; i < this.getCollateralReductionsAmount(); i++) {
            // IF :
            // - Effect isn't already included in targetedEffects
            // - Effect is not a boolean type
            // - Effect does not match the excluded type
            if(!targetedEffects.includes(pool[i]) && !this.targetedEffectIsBoolean(pool[i]) && compareWithExcluded(pool[i], excluded)) targetedEffects.push(pool[i]);
        }
        targetedEffects.forEach(eff => {
            this.collateralReduction(eff);
        });
    }

    /**
     * Applies an alteration to the Weapon's provided effect, based on the provided shard.
     * @param {TimeShard} shard the Shard which will determine the alteration's outcome
     * @param {Data.Effect} effect the targeted Effect
     */
    applyAlteration(shard, effect, isPercentage = false) {
        switch(shard.getValueType()) {
            case "number":
                this.addEffectWithHalfLimit(shard, effect);
                break;
            case "boolean":
                this.addEffect(new Stat(effect, [0, 0]));
                break;
            case "string":
                // add extra line of effect
                const value = getRandomNumber(Math.ceil(this.getEffectsAmount()/3), Math.ceil(this.getEffectsAmount()/2));
                this.extraEffects.push(new Stat(effect, [value, value], true, isPercentage));
                break;
            default:
                throw new Error('Unrecognized Time Shard type: ' + shard.getValueType());
        }
    }

    /**
     * Adds the provided Time Shard's value to the targeted Effect.
     * @param {TimeShard} shard the Time Shard which value will be added
     * @param {Data.Effect} effect the targeted Effect
     */
    addEffectWithHalfLimit(shard, effect) {
        const limit = Math.round(this.getEffectValue(effect) / 2);
        const finalValue = Math.min(limit, shard.value);
        this.addEffect(new Stat(effect, [finalValue, finalValue], true, shard.isPercentage));
    }

    /**
     * Triggers a collateral reduction on the targeted Effect. Boolean effects, and effects which value equals zero, are not affected.
     * @param {Data.Effect} effect the effect to target
     */
    collateralReduction(effect) {
        if(this.targetedEffectIsBoolean(effect)) {
            console.info("Effect [" + effect + "] ignored during reduction due to being a boolean");
            return;
        }
        if(!this.checkTargetedEffectValidity(effect)) 
            throw new Error('Effect not found: tried to alter ' + effect + ' on ' + this.name);
        if(this.getEffectValue(effect) == 0) {
            console.info("No reduction applied to " + effect + " on " + this.name + " as it is already set to zero.");
            return;
        }
        const factor = effect == Data.Effect.EFFORT ? -1 : 1;
        const baseReduction = this.getEffectValue(effect) * 0.2 * factor;
        let finalReduction = factor > 0 ? Math.ceil(baseReduction) : Math.floor(baseReduction);
        finalReduction = getRandomNumber(1 * factor, finalReduction);

        this.addEffect(new Stat(effect, [finalReduction, finalReduction], false, true), true);

        console.log("Reduced " + effect + " by " + finalReduction + " on " + this.name);
    }

    /**
     * Returns the current value of the targeted effect. 
     * Values returned for Sharpness and Warding are the average of the lower and upper bounds.
     */
    getEffectValue(effect) {
        switch(effect) {
            case Data.Effect.PDMG:
                return (this.pdmg[0] + this.pdmg[1])/2;
            case Data.Effect.MDMG:
                return (this.mdmg[0] + this.mdmg[1])/2;
            case Data.Effect.BLOCK:
                return this.block;
            case Data.Effect.EFFORT:
                return this.effort;
            case Data.Effect.CRIT_LUK:
                return this.crit_luk;
            case Data.Effect.CRIT_DMG:
                return this.crit_dmg;
            case Data.Effect.BLEED_DMG:
                return this.bleed[0];
            case Data.Effect.BLEED_DURATION:
                return this.bleed[1];
            case Data.Effect.BLEED_CURABLE:
                return this.bleed[2];
            case Data.Effect.BLEED_INCURABLE: 
                return this.bleed[2];
            case Data.Effect.POISON_DMG:
                return this.poison[0];
            case Data.Effect.POISON_DURATION:
                return this.poison[1];
            case Data.Effect.POISON_CURABLE:
                return this.poison[2];
            case Data.Effect.POISON_INCURABLE: 
                return this.poison[2];
        }
    }

    /**
     * Computes the alteration attempt chances on the provided effect and rolls dice.
     * @param {Data.Effect} effect the Effect to compute the alteration chances from
     * @returns {Data.AlterationAttemptOutcome} the attempt's outcome
     */
    computeAlterationChances(effect) {
        // Get Persistance from Config
        const persistance = getPersistanceFromConfig(effect);
        // Dice roll
        const roll = getRandomNumber(0, 100);
        // Compute rates
        const criticalFailureRate = game.player.af_criticalFailure;
        const failureRate = criticalFailureRate + game.player.af_failure + persistance - this.substrate;
        const successRate = failureRate + game.player.af_success - persistance + this.substrate;

        if(roll < criticalFailureRate) return Data.AlterationAttemptOutcome.CRITICAL_FAILURE;
        else if (roll < failureRate) return Data.AlterationAttemptOutcome.FAILURE;
        else if (roll < successRate) return Data.AlterationAttemptOutcome.SUCCESS;
        else return Data.AlterationAttemptOutcome.CRITICAL_SUCCESS;
    }

    /**
     * Sets all of the Weapon's effects.
     */
    setAllEffects() {
        let allEffects = [
            Data.Effect.PDMG, 
            Data.Effect.MDMG, 
            Data.Effect.BLOCK, 
            Data.Effect.EFFORT,
            Data.Effect.CRIT_LUK,
            Data.Effect.CRIT_DMG,
            Data.Effect.BLEED_DMG,
            Data.Effect.BLEED_DURATION,
            Data.Effect.BLEED_CURABLE,
            Data.Effect.BLEED_INCURABLE,
            Data.Effect.POISON_DMG,
            Data.Effect.POISON_DURATION,
            Data.Effect.POISON_CURABLE,
            Data.Effect.POISON_INCURABLE,
            Data.Effect.RANGE_FRONT_ON,
            Data.Effect.RANGE_MIDDLE_ON,
            Data.Effect.RANGE_BACK_ON,
            Data.Effect.RANGE_FRONT_OFF,
            Data.Effect.RANGE_MIDDLE_OFF,
            Data.Effect.RANGE_BACK_OFF,
        ];
        this.extraEffects.forEach(extra => {
            allEffects.push(extra.effect);
        });
        this.allEffects = allEffects;
    }

    /**
     * Checks whether the provided Effect exists on the Weapon.
     * @param {Data.Effect} effect the effect to check for
     * @returns {boolean} whether the effect is valid
     */
    checkTargetedEffectValidity(effect) {
        return this.allEffects.includes(effect);
    }

    /**
     * Checks whether the provided time shard can be applied to the provided Effect on the Weapon.
     * @param {TimeShard} shard the time shard
     * @param {Data.Effect} effect the Effect
     * @returns {boolean} the time shard's validity
     */
    checkTimeShardValidityForAlteration(shard, effect) {
        if(shard.isPercentage) return this.targetedAlterationAllowsPercentage(effect);
        else return !this.targetedAlterationAllowsPercentage(effect);
    }

    /**
     * Checks whether the provided Effect accepts percentage values.
     * @param {Data.Effect} effect the effect to check for
     * @returns {boolean} whether the Effect acceps percentage values
     */
    targetedAlterationAllowsPercentage(effect) {
        let allowPercentage = [
            Data.Effect.CRIT_LUK
        ];
        this.extraEffects.forEach(extra => {
            if(extra.isPercentage) allowPercentage.push(extra.effect);
        });

        return allowPercentage.includes(effect);
    }

    /**
     * Checks whether the provided Effect is a boolean type.
     * @param {Data.Effect} effect the Effect to check 
     * @returns {boolean} whether the provided Effect is a boolean type
     */
    targetedEffectIsBoolean(effect) {
        const booleanEffects = [
            Data.Effect.BLEED_CURABLE,
            Data.Effect.BLEED_INCURABLE,
            Data.Effect.POISON_CURABLE,
            Data.Effect.POISON_INCURABLE,
            Data.Effect.RANGE_FRONT_ON,
            Data.Effect.RANGE_MIDDLE_ON,
            Data.Effect.RANGE_BACK_ON,
            Data.Effect.RANGE_FRONT_OFF,
            Data.Effect.RANGE_MIDDLE_OFF,
            Data.Effect.RANGE_BACK_OFF,
        ];

        return booleanEffects.includes(effect);
    }
}
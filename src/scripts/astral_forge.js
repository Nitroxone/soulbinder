/**
 * The AstralForge class contains all of the data manipulation and methods that make it possible to alter a Weapon/Armor/Trinket's effects.
 */
class AstralForge {
    constructor(id) {
        this.history = [];

        this.substrate = 0;
        this.allEffects = [];
        this.extraEffects = [];
        this.state = Data.AstralForgeState.STABLE;

        this.selectedShard = null;
        this.selectedEffect = null;

        this.consumeSubstrate = false;

        this.animationQueue = [];

        // Checking for passed item ID validity
        const retrieved = getAstralForgeItem(id);
        if(this.checkForItemValidity(retrieved)) {
            this.item = retrieved;
            this.itemType = this.setItemType();
            this.setAllEffects();
        }
        else throw new Error('Uncompatible object type for AstralForge');

    }

    /**
     * Checks whether the provided item is AstralForge compatible.
     * @param {Weapon|Armor|Trinket} item the AstralForge to check 
     * @returns {boolean} whether the item is AstralForge compatible
     */
    checkForItemValidity(item) {
        return item instanceof Armor || item instanceof Weapon || item instanceof Trinket;
    }

    /**
     * Sets the AstralForge item type according to its class.
     * @returns {Data.Effect|null} the Item type
     */
    setItemType() {
        return this.item instanceof Armor 
                        ? Data.ItemType.ARMOR
                        : this.item instanceof Weapon
                            ? Data.ItemType.WEAPON
                            : this.item instanceof Trinket
                                ? Data.ItemType.TRINKET
                                : null;
    }

    /**
     * Alters the targeted effect with the provided Time Shard. 
     * @param {TimeShard} shard the Shard to use
     * @param {Data.Effect} effect the targeted effect
     */
    alterEffect(shard, effect) {
        // Safety checks
        if(!this.checkTargetedEffectValidity(effect) && shard.getValueType() !== "string")
            throw new Error('Attempted to alter an effect that does not exist on : ' + this.item.name);
        if(!this.checkTimeShardValidityForAlteration(shard, effect) && shard.getValueType() !== "string") 
            throw new Error(shard.name + ' cannot be used to alter ' + effect + ' on ' + this.item.name + ' (uncompatible types)');
        
        switch(this.computeAlterationChances(effect, this.consumeSubstrate)) {
            case Data.AlterationAttemptOutcome.CRITICAL_FAILURE:
                this.alterCriticalFailure(shard, effect);
                return Data.AlterationAttemptOutcome.CRITICAL_FAILURE;
            case Data.AlterationAttemptOutcome.FAILURE:
                this.alterFailure(shard);
                // DOM UPDATE
                this.queueAnimation(effect, "effectAlterNeutral");
                return Data.AlterationAttemptOutcome.FAILURE;
            case Data.AlterationAttemptOutcome.SUCCESS:
                this.alterSuccess(shard, effect);
                return Data.AlterationAttemptOutcome.SUCCESS;
            case Data.AlterationAttemptOutcome.CRITICAL_SUCCESS:
                this.alterCriticalSuccess(shard, effect);
                return Data.AlterationAttemptOutcome.CRITICAL_SUCCESS;
        }
    }

    /**
     * Triggers a critical failure on the Item's targeted effect, based on the provided Time Shard.
     * @param {TimeShard} shard the Time Shard to apply
     * @param {Data.Effect} effect the targeted effect
     */
    alterCriticalFailure(shard, effect) {
        console.log('Critical failure!');
        if(canShardOverload(shard)) this.applyReductions(null, 1);
        else this.collateralReduction(effect);
        game.player.inventory.removeResource(shard);
    }

    /**
     * Triggers a failure on the Item's targeted effect, based on the provided Time Shard.
     * @param {TimeShard} shard the Time Shard to apply
     * @param {Data.Effect} effect the targeted effect
     */
    alterFailure(shard) {
        console.log('Failure!');
        game.player.inventory.removeResource(shard);
    }

    /**
     * Triggers a success on the Item's targeted effect, based on the provided Time Shard.
     * @param {TimeShard} shard the Time Shard to apply
     * @param {Data.Effect} effect the targeted effect
     */
    alterSuccess(shard, effect) {
        console.log('Success!');
        if(canShardOverload(shard)) this.applyReductions()
        else this.applyReductions(effect);
        this.applyAlteration(shard, effect);
        game.player.inventory.removeResource(shard);
    }

    /**
     * Triggers a critical success on the Item's targeted effect, based on the provided Time Shard.
     * @param {TimeShard} shard the Time Shard to apply
     * @param {Data.Effect} effect the targeted effect
     */
    alterCriticalSuccess(shard, effect) {
        console.log('Critical success!');
        if(typeof shard.value === 'string') game.player.inventory.removeResource(shard);
        else this.queueAnimation(effect, "effectAlterCriticalSuccess");
        this.applyAlteration(shard, effect);
    }

    /**
     * Returns the Item's amount of effects (ie. the amount of base immutable effects as well as the extra effects);
     * @returns {number} the Item's amount of effects
     */
    getEffectsAmount() {
        switch(this.itemType) {
            case Data.ItemType.ARMOR:
                return 2 + this.extraEffects.length;
            case Data.ItemType.WEAPON:
                return 13 + this.extraEffects.length;
            case Data.ItemType.TRINKET:
                return this.item.effects.length + this.extraEffects.length;
        }
    }

    /**
     * Returns a randomly generated amount of collateral reductions on the Item.
     * It is a random number between 1 and half of the Item's amount of effects.
     * @returns {number} the amount of collateral reductions
     */
    getCollateralReductionsAmount() {
        return getRandomNumber(1, this.getEffectsAmount()/2);
    }

    /**
     * Applies collateral reductions on the Item. Optionally excludes the provided Effect.
     * A random amount of random effects among the Item are reduced. Boolean effects are not affected.
     * @param {Data.Effect} excluded an optionally excluded Effect
     * @param {number} max an optional maximum amount of reduced effects
     */
    applyReductions(excluded = null, max = 0) {
        let targetedEffects = [];
        let pool = shuffle(this.allEffects);
        const counter = max === 0 ? this.getCollateralReductionsAmount() : max;
        for(let i = 0; i < counter; i++) {
            // IF :
            // - Effect isn't already included in targetedEffects
            // - Effect is not a boolean type
            // - Effect does not match the excluded type
            if(!targetedEffects.includes(pool[i]) && !this.targetedEffectIsBoolean(pool[i]) && compareWithExcluded(pool[i], excluded)) targetedEffects.push(pool[i]);
        }
        targetedEffects.forEach(eff => {
            this.collateralReduction(eff, true);
        });
    }

    /**
     * Applies an alteration to the Item's provided effect, based on the provided shard.
     * @param {TimeShard} shard the Shard which will determine the alteration's outcome
     * @param {Data.Effect} effect the targeted Effect
     */
    applyAlteration(shard, effect) {
        switch(shard.getValueType()) {
            case "number":
                this.addEffectWithHalfLimit(shard, effect);
                // DOM UPDATE
                this.queueAnimation(effect, "effectAlterSuccess");
                break;
            case "boolean":
                this.item.addEffect(new Stat(effect, [0, 0]), true);
                // DOM UPDATE
                this.queueAnimation(effect, "effectAlterSuccess");
                break;
            case "string":
                // add extra line of effect
                if(this.extraEffectAlreadyExists(effect)) {
                    console.info('Could not add a ' + effect + ' overload on ' + this.item.name + ' as it already exists.');
                    return;
                }
                const value = getOverValueFromConfig(effect);
                this.extraEffects.push(new Stat(effect, [value, value], true, isAstralForgeEffectPercentage(effect)));
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
        this.item.addEffect(new Stat(effect, [finalValue, finalValue], true, shard.isPercentage));
    }

    /**
     * Triggers a collateral reduction on the targeted Effect. Boolean effects, and effects which value equals zero, are not affected.
     * @param {Data.Effect} effect the effect to target
     */
    collateralReduction(effect, generateSubstrate = false) {
        if(this.targetedEffectIsBoolean(effect)) {
            console.info("Effect [" + effect + "] ignored during reduction due to being a boolean");
            return;
        }
        if(!this.checkTargetedEffectValidity(effect)) 
            throw new Error('Effect not found: tried to alter ' + effect + ' on ' + this.item.name);
        if(this.getEffectValue(effect) == 0) {
            console.info("No reduction applied to " + effect + " on " + this.item.name + " as it is already set to zero.");
            return;
        }
        const factor = effect == Data.Effect.EFFORT ? -1 : 1;
        const baseReduction = this.getEffectValue(effect) * 0.2 * factor;
        let finalReduction = factor > 0 ? Math.ceil(baseReduction) : Math.floor(baseReduction);
        finalReduction = getRandomNumber(1 * factor, finalReduction);

        this.item.addEffect(new Stat(effect, [finalReduction, finalReduction], false, true), true);

        // DOM UPDATE
        this.queueAnimation(effect, "effectAlterFailure");

        console.log("Reduced " + effect + " by " + finalReduction + " on " + this.item.name);
        if(generateSubstrate) this.addSubstrate(effect);
    }

    /**
     * Returns the current value of the targeted effect. 
     * Values returned for Sharpness and Warding are the average of the lower and upper bounds.
     */
    getEffectValue(effect) {
        if(this.itemType === Data.ItemType.WEAPON) {
            switch(effect) {
                case Data.Effect.PDMG:
                    return (this.item.pdmg[0] + this.item.pdmg[1])/2;
                case Data.Effect.MDMG:
                    return (this.item.mdmg[0] + this.item.mdmg[1])/2;
                case Data.Effect.BLOCK:
                    return this.item.block;
                case Data.Effect.EFFORT:
                    return this.item.effort;
                case Data.Effect.CRIT_LUK:
                    return this.item.crit_luk;
                case Data.Effect.CRIT_DMG:
                    return this.item.crit_dmg;
                case Data.Effect.BLEED_DMG:
                    return this.item.bleed[0];
                case Data.Effect.BLEED_DURATION:
                    return this.item.bleed[1];
                case Data.Effect.BLEED_CURABLE:
                    return this.item.bleed[2];
                case Data.Effect.BLEED_INCURABLE: 
                    return this.item.bleed[2];
                case Data.Effect.POISON_DMG:
                    return this.item.poison[0];
                case Data.Effect.POISON_DURATION:
                    return this.item.poison[1];
                case Data.Effect.POISON_CURABLE:
                    return this.item.poison[2];
                case Data.Effect.POISON_INCURABLE: 
                    return this.item.poison[2];
            }
        } else if(this.itemType === Data.ItemType.ARMOR) {
            switch(effect) {
                case Data.Effect.RESILIENCE:
                    return this.item.resilience;
                case Data.Effect.WARDING:
                    return this.item.warding;
            }
        } else if(this.itemType === Data.ItemType.TRINKET) {
            return this.item.getEffectValue(effect);
        }
    }

    /**
     * Computes the alteration attempt chances on the provided effect and rolls dice.
     * @param {Data.Effect} effect the Effect to compute the alteration chances from
     * @returns {Data.AlterationAttemptOutcome} the attempt's outcome
     */
    computeAlterationChances(effect, consumeSubstrate) {
        // Get Persistance from Config
        const persistance = getPersistanceFromConfig(effect);
        const substrate = consumeSubstrate ? this.substrate : 0;
        // Dice roll
        const roll = getRandomNumber(0, 100);
        // Compute rates
        const criticalFailureRate = game.player.af_criticalFailure;
        const failureRate = criticalFailureRate + game.player.af_failure + persistance - substrate;
        const successRate = failureRate + game.player.af_success - persistance + substrate;

        if(roll < criticalFailureRate) {
            if(substrate !== 0) this.resetSubstrate();
            return Data.AlterationAttemptOutcome.CRITICAL_FAILURE;
        }
        else if (roll < failureRate) {
            if(substrate !== 0) this.resetSubstrate();
            return Data.AlterationAttemptOutcome.FAILURE;
        }
        else if (roll < successRate) {
            if(substrate !== 0) this.resetSubstrate();
            return Data.AlterationAttemptOutcome.SUCCESS;
        }
        else {
            if(substrate !== 0) this.resetSubstrate();
            return Data.AlterationAttemptOutcome.CRITICAL_SUCCESS;
        }
    }

    /**
     * Sets all of the Weapon's effects.
     */
    setAllEffects() {
        let allEffects = [];
        switch(this.itemType) {
            case Data.ItemType.WEAPON:
                allEffects = allEffects.concat([
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
                ]);
                break;
            case Data.ItemType.ARMOR:
                allEffects = allEffects.concat([
                    Data.Effect.RESILIENCE,
                    Data.Effect.WARDING
                ]);
                break;
            case Data.ItemType.TRINKET:
                this.item.effects.forEach(eff => {
                    allEffects.push(eff.effect);
                });
                break;
        }
        this.extraEffects.forEach(extra => {
            allEffects.push(extra.effect);
        });
        this.allEffects = allEffects;
    }

    /**
     * Checks whether the provided Effect exists on the Item.
     * @param {Data.Effect} effect the effect to check for
     * @returns {boolean} whether the effect is valid
     */
    checkTargetedEffectValidity(effect) {
        return this.allEffects.includes(effect);
    }

    /**
     * Checks whether the provided time shard can be applied to the provided Effect on the Item.
     * @param {TimeShard} shard the time shard
     * @param {Data.Effect} effect the Effect
     * @returns {boolean} the time shard's validity
     */
    checkTimeShardValidityForAlteration(shard, effect) {
        if(shard.isPercentage) return this.targetedAlterationAllowsPercentage(effect);
        if(shard.getValueType() === 'boolean') return this.targetedEffectIsBoolean(effect);
        else return !this.targetedAlterationAllowsPercentage(effect);
    }

    /**
     * Checks whether the provided Effect accepts percentage values.
     * @param {Data.Effect} effect the effect to check for
     * @returns {boolean} whether the Effect acceps percentage values
     */
    targetedAlterationAllowsPercentage(effect) {
        return isAstralForgeEffectPercentage(effect);
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

    /**
     * Checks whether the provided Effect already exists among the AstralForge's extra effects.
     * @param {Data.Effect} effect the Effect to look for
     * @returns {boolean} whether the provided effect already exists
     */
    extraEffectAlreadyExists(effect) {
        let exists = false;
        this.extraEffects.forEach(eff => {
            if(eff.effect === effect) exists = true;
        });
        this.allEffects.forEach(eff => {
            if(eff === effect) exists = true;
        })
        return exists;
    }
    
    /**
     * Adds the substrate value of the provided Effect to the total substrate of this AstralForge.
     * Also updates the DOM accordingly.
     * @param {Data.Effect} effect the Effect which substrate will be added
     */
    addSubstrate(effect) {
        const amount = getSubstrateFromConfig(effect)
        this.substrate += amount;
        console.log('Added +' + amount + ' to ' + this.item.name + '\'s total substrate.');
        getAstralForgeSubstrateBox(this, true);
    }
    /**
     * Resets the substrate on this AstralForge and updates the DOM accordingly.
     */
    resetSubstrate() {
        this.substrate = 0;
        console.log('Resetted substrate on ' + this.item.name + '.');
        getAstralForgeSubstrateBox(this, true);
    }

    /**
     * Changes this AstralForge's state to WARPED.
     */
    warp() {
        this.state = Data.AstralForgeState.WARPED;
        console.log(this.item.name + " is now " + this.state);
    }

    /**
     * Changes this AstralForge's state to SEALED.
     */
    seal() {
        this.state = Data.AstralForgeState.SEALED;
        console.log(this.item.name + " is now " + this.state);
    }

    /**
     * Sets the selected effect of this AstralForge to the provided effect.
     * @param {Data.Effect} effect the Effect to select
     */
    selectEffect(effect) {
        this.selectedEffect = effect;
    }

    /**
     * Clears this AstralForge's selected effect.
     */
    clearEffect() {
        this.selectedEffect = null;
    }

    /**
     * Sets the selected shard of this AstralForge to the provided Shard.
     * @param {TimeShard} shard the Shard to select
     */
    selectShard(shard) {
        this.selectedShard = shard;
    }

    /**
     * Clears this AstralForge's selected shard.
     */
    clearShard() {
        this.selectedShard = null;
    }

    /**
     * Runs various tests to check that an alteration can be casted on this AstralForge.
     * @returns {boolean} whether an alteration can be casted
     */
    canLaunchAlteration() {
        const effect = this.selectedEffect;
        const shard = this.selectedShard;
        if(!effect) return Data.AlterationError.NO_EFFECT;
        if(!shard) return Data.AlterationError.NO_SHARD;
        if(shard.amount <= 0) return Data.AlterationError.SHARD_AMOUNT_NULL;
        if(shard.getValueType() === 'string' && this.extraEffectAlreadyExists(effect)) return Data.AlterationError.EFFECT_ALREADY_EXISTS;
        if(!this.checkTimeShardValidityForAlteration(shard, effect) && shard.getValueType() !== "string") return Data.AlterationError.INCOMPATIBILITY;
        return Data.AlterationError.NONE;
    }

    /**
     * Adds a new animation to the AstralForge's DOM animation queue.
     * @param {Data.Effect} effect the targeted Effect to animate
     * @param {string} anim the animation type
     */
    queueAnimation(effect, anim) {
        this.animationQueue.push([effect, anim]);
    }
    
    /**
     * Clears the AstralForge's animation queue.
     */
    clearAnimationQueue() {
        this.animationQueue = [];
    }
}
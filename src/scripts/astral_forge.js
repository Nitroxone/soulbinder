/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

/**
 * The AstralForge class contains all of the data manipulation and methods that make it possible to alter a Weapon/Armor/Trinket's effects.
 */
class AstralForge {
    constructor(id) {
        this.history = [];
        this.bookmark = [];

        this.substrate = 0;
        this.allEffects = [];
        this.extraEffects = [];
        this.state = Data.AstralForgeState.STABLE;

        this.referenceTable = [];

        this.selectedShard = null;
        this.selectedEffect = null;
        this.selectedBookmark = null;
        this.selectedCometOre = null;
        this.selectedOverload = null;

        this.consumeSubstrate = false;

        this.animationQueue = [];

        // Checking for passed item ID validity
        const retrieved = getAstralForgeItem(id);
        if(this.checkForItemValidity(retrieved)) {
            this.item = retrieved;
            this.itemType = this.setItemType();
            this.setAllEffects();
            this.buildReferenceTable();
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
        
        if(this.selectedOverload && shard.name.toLowerCase() === 'prismatic time shard') effect = this.selectedOverload;
        const forceOutcome = this.getForceOutcome();
        const outcome = forceOutcome ? forceOutcome : this.computeAlterationChances(effect, this.consumeSubstrate);
        switch(outcome) {
            case Data.AlterationAttemptOutcome.CRITICAL_FAILURE:
                this.alterCriticalFailure(shard, effect);
                break;
            case Data.AlterationAttemptOutcome.FAILURE:
                this.alterFailure(shard);
                // DOM UPDATE
                if(!this.selectedOverload && this.selectedShard.name.toLowerCase() !== 'prismatic time shard') this.queueAnimation(effect, "effectAlterNeutral");
                break;
            case Data.AlterationAttemptOutcome.SUCCESS:
                this.alterSuccess(shard, effect);
                break;
            case Data.AlterationAttemptOutcome.CRITICAL_SUCCESS:
                this.alterCriticalSuccess(shard, effect);
                break;
        }
        this.setAllEffects();
        this.addBookmarkToHistory(outcome);
        console.log(this.history);
        return outcome;
    }

    /**
     * Returns whether a forced successful outcome should be activated, based on the currently selected comet ore.
     * @returns {Data.AlterationAttemptOutcome|null} the possibly forced outcome
     */
    getForceOutcome() {
        if(!this.selectedCometOre) return null;
        else switch(this.selectedCometOre.name.toLowerCase()) {
            case "frozen comet ore":
                this.warp();
                game.player.inventory.removeResource(this.selectedCometOre);
                return Data.AlterationAttemptOutcome.SUCCESS;
            case "irradiant comet ore":
                this.seal();
                game.player.inventory.removeResource(this.selectedCometOre);
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
                const effectSwitch = new Stat({effect: effect});
                this.item.addEffect(effectSwitch, true);
                // TODO: fix this by getting the value of the CURRENT boolean effect on the object.
                this.addToBookmark(new Stat({effect: getOppositeOfBooleanEffect(effect)}))
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
                const newEffect = new Stat({effect: effect, theorical: value, isPercentage: isAstralForgeEffectPercentage(effect)});
                this.extraEffects.push(newEffect);
                this.addToBookmark(newEffect);
                this.seal();
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
        // Getting the reference 
        const reference = this.getEffectFromReferenceTable(effect);
        // Base limit equals half the current value
        const limit = Math.round(this.getEffectValue(effect) / 2);
        // Final value is the limit + the remaining available bonus on the item (max - added)
        let finalValue = Math.min(Math.min(limit, shard.value), reference.max - Math.abs(reference.added));
        // Invert values if it's EFFORT
        if(effect === Data.Effect.EFFORT) finalValue = -finalValue;
        const newEffect = new Stat({effect: effect, theorical: finalValue, isPercentage: shard.isPercentage});
        this.item.addEffect(newEffect);
        this.addToBookmark(newEffect);
        this.updateReferenceAddedValue(effect, finalValue);
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
        if(this.getEffectValue(effect) <= 0) {
            console.info("No reduction applied to " + effect + " on " + this.item.name + " as it is null or negative.");
            return;
        }
        const factor = effect == Data.Effect.EFFORT ? -1 : 1;
        const baseReduction = this.getEffectValue(effect) * 0.2 * factor;
        let finalReduction = factor > 0 ? Math.ceil(baseReduction) : Math.floor(baseReduction);
        finalReduction = getRandomNumber(1 * factor, finalReduction);
        // SUBSTRATE ?
        if(this.substrate > 0) {
            if(this.substrate >= finalReduction) {
                this.removeSubstrate(finalReduction);
                console.log('Entirely shielded a ' + effect + ' reduction with substrate. (' + finalReduction + ')');
                finalReduction = 0;
                return;
            } else {
                finalReduction -= this.substrate;
                console.log('Partially shielded a ' + effect + ' reduction with substrate (' + this.substrate + ').');
                this.resetSubstrate();
            }
        }

        const reductionEffect = new Stat({effect: effect, theorical: finalReduction, isPercentage: this.targetedAlterationAllowsPercentage(effect)});
        this.item.addEffect(reductionEffect, true);
        this.addToBookmark(new Stat({effect: effect, theorical: -finalReduction, isPercentage: this.targetedAlterationAllowsPercentage(effect)}));
        this.updateReferenceAddedValue(effect, -finalReduction);

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
                case Data.Effect.SHARPNESS:
                    return (this.item.sharpness[0] + this.item.sharpness[1])/2;
                case Data.Effect.WITHERING:
                    return (this.item.withering[0] + this.item.withering[1])/2;
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
                    Data.Effect.SHARPNESS, 
                    Data.Effect.WITHERING, 
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
        if(shard.getValueType() === 'number') return !this.targetedEffectIsBoolean(effect) && !this.targetedAlterationAllowsPercentage(effect);
        else return true;
    }

    /**
     * Checks whether the provided Effect accepts percentage values.
     * @param {Data.Effect} effect the effect to check for
     * @returns {boolean} whether the Effect accepts percentage values
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
     * Removes the provided value from this AstralForge's substrate. 
     * Also updates the DOM accordingly.
     * @param {number} value the value to remove
     */
    removeSubstrate(value) {
        this.substrate = Math.max(0, this.substrate - value);
        console.log('Removed ' + value + ' substrate on ' + this.item.name + '.');
        getAstralForgeSubstrateBox(this, true);
    }

    /**
     * Changes this AstralForge's state to WARPED.
     */
    warp() {
        this.state = Data.AstralForgeState.WARPED;
        Sounds.Methods.playSound(Data.SoundType.AF_WARPED);
        console.log(this.item.name + " is now " + this.state);
    }

    /**
     * Changes this AstralForge's state to SEALED.
     */
    seal() {
        this.state = Data.AstralForgeState.SEALED;
        Sounds.Methods.playSound(Data.SoundType.AF_SEALED);
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
     * Sets the selected bookmark of this AstralForge to the provided bookmark.
     * @param {object} bookmark the Bookmark to select
     */
    selectBookmark(bookmark) {
        this.selectedBookmark = bookmark;
    }

    /**
     * Clears this AstralForge's selected bookmark.
     */
    clearSelectedBookmark() {
        this.selectedBookmark = null;
    }

    /***
     * Sets the selected Comet Ore of this AstralForge to the provided Comet Ore.
     * @param {Resource} ore the Comet Ore to select
     */
    selectCometOre(ore) {
        this.selectedCometOre = ore;
    }

    /**
     * Clears this AstralForge's selected Comet Ore.
     */
    clearSelectedCometOre() {
        this.selectedCometOre = null;
    }

    /**
     * Clears this AstralForge's selected overload effect.
     */
    clearSelectedOverload() {
        this.selectedOverload = null;
    }

    /**
     * Returns whether the provided Comet Ore can apply a bookmark reversion.
     * @param {Resource} cometOre the Comet Ore to check
     * @returns {boolean} whether a bookmark reversion can be applied with this Comet Ore
     */
    canCometOreApplyReversion(cometOre) {
        return cometOre.name.toLowerCase() === "burning comet ore";
    }

    /**
     * Runs various tests to check that an alteration can be casted on this AstralForge.
     * @returns {Data.AlterationError} whether an alteration can be casted
     */
    canLaunchAlteration() {
        const effect = this.selectedEffect;
        const shard = this.selectedShard;
        if(!effect && !this.selectedOverload) return Data.AlterationError.NO_EFFECT;
        if(!shard) return Data.AlterationError.NO_SHARD;
        if(shard.amount <= 0) return Data.AlterationError.SHARD_AMOUNT_NULL;
        if(shard.getValueType() === 'string' && this.extraEffectAlreadyExists(this.selectedOverload)) return Data.AlterationError.EFFECT_ALREADY_EXISTS;
        if(!this.checkTimeShardValidityForAlteration(shard, effect) && shard.getValueType() !== "string") return Data.AlterationError.INCOMPATIBILITY;
        if(this.getEffectValue(effect) <= 0 && !this.selectedOverload) return Data.AlterationError.NEGATIVE_OR_NULL_VALUE;
        if(this.isMaxValueReached(effect) && !this.selectedOverload) return Data.AlterationError.MAXIMUM_VALUE_REACHED;
        if(this.state == Data.AstralForgeState.SEALED) return Data.AlterationError.IS_SEALED;
        if(this.selectedCometOre && this.selectedCometOre.name.toLowerCase() === 'frozen comet ore' && this.state == Data.AstralForgeState.WARPED) return Data.AlterationError.IS_WARPED;
        return Data.AlterationError.NONE;
    }

    /**
     * Reverts the provided bookmark's effects from this AstralForge.
     * @param {object} bookmark 
     */
    revertAlteration(bookmark) {
        bookmark.bookmark.forEach(obj => {
            if(!this.willCauseUnallowedOverload(obj.effect)) {
                this.item.addEffect(obj.effect, true);
                this.updateReferenceAddedValue(obj.effect.effect, -obj.effect.getValue());
            }
        });
        this.removeBookmark(bookmark);
        game.player.inventory.removeResource(this.selectedCometOre);
    }

    /**
     * Removes the provided bookmark from this AstralForge's history.
     * @param {object} bookmark 
     */
    removeBookmark(bookmark) {
        removeFromArray(this.history, bookmark);
    }

    /**
     * Runs various tests to check that an alteration can be reversed on this AstralForge.
     * @returns {boolean} whether an alteration can be reversed
     */
    canLaunchReversion() {
        const bookmark = this.selectedBookmark;
        const cometOre = this.selectedCometOre;
        if(!bookmark) return Data.ReversionError.NO_BOOKMARK;
        if(!cometOre) return Data.ReversionError.NO_ORE;
        if(cometOre.amount <= 0) return Data.ReversionError.ORE_AMOUNT_NULL;
        if(!this.canCometOreApplyReversion(cometOre)) return Data.ReversionError.INCOMPATIBILITY;
        if(this.state === Data.AstralForgeState.SEALED) return Data.ReversionError.IS_SEALED;
        return Data.ReversionError.NONE;
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

    /**
     * Returns all of the Effects that are clear to be Overloaded on the AstralForge item.
     */
    getAvailableOverloadEffects() {
        return Config.OverloadAvailable.filter(item => !this.allEffects.includes(item));
    }

    /**
     * Adds the provided effect to this AstralForge's current bookmark.
     * @param {Stat} effect the effect to add
     * @param {boolean} asBoolean is the added effect a boolean type?
     */
    addToBookmark(effect, asBoolean = false) {
        this.bookmark.push({
            effect: effect, 
            asBoolean: asBoolean
        });
    }

    /**
     * Adds the current bookmark to this AstralForge's history.
     * @param {Data.AlterationAttemptOutcome} outcome the outcome of the alteration
     */
    addBookmarkToHistory(outcome) {
        this.history.push({
            outcome: outcome,
            bookmark: this.bookmark,
            id: this.generateHistoryID()
        });
        this.clearBookmark();
    }

    /**
     * Clears this AstralForge's current bookmark.
     */
    clearBookmark() {
        this.bookmark = [];
    }

    /**
     * Returns a unique history occurrence ID.
     * @returns {string} a unique ID
     */
    generateHistoryID() {
        const timestamp = Date.now().toString(36);
        const randomNum = Math.random().toString(36).substring(2, 7);
        return `${timestamp}-${randomNum}`;
    }

    /**
     * Builds a reference table, which keeps track of all the maximum values and added values of each effect of this AstralForge.
     */
    buildReferenceTable() {
        this.allEffects.forEach(eff => {
            const max = this.setMaxAllowedAlterationValue(eff);
            this.referenceTable.push(
                // Effect, Maximum value, Added value (set to zero)
                {
                    "effect": eff,
                    "max": max,
                    "added": 0,
                }
            );
        });
    }

    /**
     * Returns the maximum allowed alteration value for the provided effect.
     * It is equal to the average between the maximum over value of this effect (from the Config), and
     * its current base value.
     * @param {Data.Effect} eff the effect to retrieve the max value from
     * @returns {number} the maximum value
     */
    setMaxAllowedAlterationValue(eff) {
        if(this.targetedEffectIsBoolean(eff)) return 0;
        // Retrieving bounds
        const max = getOverValueFromConfig(eff);
        const current = this.getEffectValue(eff);
        
        return getAverage(current, max);
    }

    /**
     * Returns the provided effect's associated object from this AstralForge's reference table.
     * @param {Data.Effect} eff the effect to retrieve
     * @returns {object} the effect's associated object in the reference table
     */
    getEffectFromReferenceTable(eff) {
        let reference = null;
        this.referenceTable.forEach(ref => {
            if(ref.effect === eff) reference = ref;
        });
        return reference;
    }

    /**
     * Updates the provided effect's added value in this AstralForge's reference table.
     * @param {Data.Effect} eff the effect to alter
     * @param {number} value the value to add to this effect
     */
    updateReferenceAddedValue(eff, value) {
        let reference = this.getEffectFromReferenceTable(eff);
        if(!reference) throw new Error('Tried to update an unexisting effect\'s mod value in the reference table');

        reference.added += value;   
    }

    /**
     * Returns whether the provided effect's maximum value is reached.
     * @param {Data.Effect} eff the effect to check 
     * @returns {boolean} whether the max value is reached on this effect
     */
    isMaxValueReached(eff) {
        if(!eff) return false;
        const reference = this.getEffectFromReferenceTable(eff);
        if(eff === Data.Effect.EFFORT) return reference.max <= Math.abs(reference.added);
        return reference.max <= reference.added;
    }

    /**
     * Returns whether the provided Stat will cause an unallowed overload.
     * @param {Stat} eff the effect to check
     * @returns {boolean} whether adding this Stat will cause an unallowed overload.
     */
    willCauseUnallowedOverload(eff) {
        if(!eff) return false;
        const reference = this.getEffectFromReferenceTable(eff.effect);
        if(eff.effect === Data.Effect.EFFORT) return Math.abs(reference.added) + eff.getValue() > reference.max;
        else return reference.added - eff.getValue() > reference.max;
    }

    /**
     * Returns a formatted HTML string of the provided AstralForge modification object.
     * @param {object} obj the modification object 
     * @returns {string} an HTML string
     */
    getFormattedModification(obj) {
        let str = ''; 

        str += '<div ';
        
        if(obj.added > 0) {
            if(obj.effect !== Data.Effect.EFFORT && !obj.overload) str += 'style="color: ' + Data.Color.GREEN + '">+ ';
            else if(obj.overload) str += 'style="color: ' + Data.Color.OVERLOAD + '">+ ';
            else str += 'style="color: ' + Data.Color.RED + '">+ ';
        }
        else if(obj.added < 0) {
            if(obj.effect !== Data.Effect.EFFORT) str += 'style="color: ' + Data.Color.RED + '">- ';
            else str += 'style="color: ' + Data.Color.GREEN + '">- ';
        }
        else str += '>~ ';
        
        str += Math.abs(obj.added) + (isAstralForgeEffectPercentage(obj.effect) ? '%' : '') + ' ' + capitalizeFirstLetter(obj.effect);
        str += '</div>';

        return str;
    }

    /**
     * Generates a string that contains formatted HTML code of this AstralForge's modifications and returns it.
     * @returns {string} an HTML string
     */
    getFormattedModifications() {
        let str = '';
        this.referenceTable.forEach(ref => {
            if(ref.added !== 0) str += this.getFormattedModification(ref);
        });
        this.extraEffects.forEach(ref => {
            str += this.getFormattedModification({effect: ref.effect, added: ref.getValue(), overload: true})
        })
        if(str !== '') {
            str = '<div class="editedIconStats"><p>This item is <span style="font-family: RobotoBold; color: ' + getAstralForgeItemStateColorCode(this.state) + '">' + capitalizeFirstLetter(this.state) + '</span>.</p><br>' + str + '</div>';
        }
        return str;
    }

    /**
     * Returns whether this AstralForge instance contains modifications.
     * @returns {boolean} whether the AstralForge contains modifications
     */
    isModified() {
        if(this.getFormattedModifications() === '') return false;
        return true;
    }
}
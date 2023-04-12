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
                this.pdmg[0] += effect.getValue() * factor;
                this.pdmg[1] += effect.getValue() * factor;
                break;
            case Data.Effect.MDMG:
                this.mdmg[0] += effect.getValue() * factor;
                this.mdmg[1] += effect.getValue() * factor;
                break;
            case Data.Effect.BLOCK:
                this.block += effect.getValue() * factor;
                break;
            case Data.Effect.EFFORT:
                this.effort += effect.getValue() * factor
                break;
            case Data.Effect.CRIT_LUK:
                this.crit_luk += effect.getValue() * factor;
                break;
            case Data.Effect.CRIT_DMG:
                this.crit_dmg += effect.getValue() * factor;
                break;
            case Data.Effect.BLEED_DMG:
                this.bleed[0] += effect.getValue() * factor;
                break;
            case Data.Effect.BLEED_DURATION:
                this.bleed[1] += effect.getValue() * factor;
                break;
            case Data.Effect.BLEED_CURABLE:
                this.bleed[2] = !remove;
                break;
            case Data.Effect.BLEED_INCURABLE: 
                this.bleed[2] = remove;
                break;
            case Data.Effect.POISON_DMG:
                this.poison[0] += effect.getValue() * factor;
                break;
            case Data.Effect.POISON_DURATION:
                this.poison[1] += effect.getValue() * factor;
                break;
            case Data.Effect.POISON_CURABLE:
                this.poison[2] = !remove;
                break;
            case Data.Effect.POISON_INCURABLE: 
                this.poison[2] = remove;
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
     * 
     * @param {TimeShard} shard 
     * @param {Data.Effect} effect 
     */
    alterEffect(shard, effect) {
        // Safety checks
        if(!this.checkTargetedEffectValidity(effect)) 
            throw new Error('Attempted to alter an effect that does not exist on : ' + this.name);
        if(!this.checkTimeShardValidityForAlteration(shard, effect)) 
            throw new Error(shard.name + ' cannot be used to alter ' + effect + ' on ' + this.name + ' (uncompatible types)');
        
        
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
            Data.Effect.BLEEDING_CURABLE,
            Data.Effect.BLEEDING_INCURABLE,
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
        if(Data.PercentageTimeShards.includes(shard.name.toLowerCase())) return this.targetedAlterationAllowsPercentage(effect);
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
}
/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class Skill extends Entity {
    constructor(name, desc, icon,
                props) {
        super(name, desc, icon);

        this.type = getValueFromObject(props, "type", Data.SkillType.BOTH);
        this.manaCost = getValueFromObject(props, "manaCost", 0);
        this.cooldown = getValueFromObject(props, "cooldown", 0);
        this.dmgType = getValueFromObject(props, "dmgType", Data.SkillDamageType.NONE);
        this.dmgMultiplier = getValueFromObject(props, "dmgMultiplier", 0);
        this.criMultiplier = getValueFromObject(props, "criMultiplier", 0);
        this.accMultiplier = getValueFromObject(props, "accMultiplier", 0);
        this.targets = getValueFromObject(props, "targets", {allies: '-0', enemies: '-0'})
        this.launchPos = getValueFromObject(props, "launchPos", [true, true, true])
        this.effectsCaster = getValueFromObject(props, "effectsCaster", null);
        this.casterIgnoresOtherEffects = getValueFromObject(props, "casterIgnoresOtherEffects", false);
        this.effectsAllies = getValueFromObject(props, "effectsAllies", null);
        this.effectsEnemies = getValueFromObject(props, "effectsEnemies", null);
        this.effectsTarget = getValueFromObject(props, "effectsTarget", null);
        this.targetIgnoresOtherEffects = getValueFromObject(props, "targetIgnoresOtherEffects", false);
        this.variables = getValueFromObject(props, "variables", null);
        this.triggersCaster = getValueFromObject(props, "triggersCaster", null);
        this.triggersAllies = getValueFromObject(props, "triggersAllies", null);
        this.triggersEnemies = getValueFromObject(props, "triggersEnemies", null);
        this.triggersSkill = getValueFromObject(props, "triggersSkill", null);
        this.condition = getValueFromObject(props, "condition", {checker: function(){return true}, message: ''})
        this.stackable = getValueFromObject(props, "stackable", 1);
        this.ignoresProtection = getValueFromObject(props, "ignoreProtection", false);
        this.onCast = getValueFromObject(props, "onCast", null);

        this.cooldownCountdown = 0;

        this.level = 1;
    }

    /**
     * Returns this Skill's caster effects at its current level.
     * @returns {object} the current caster effects
     */
    getCurrentEffectsCaster() {
        return this.effectsCaster[this.level];
    }

    /**
     * Returns this Skill's allies effects at its current level.
     * @returns {object} the current allies effects
     */
    getCurrentEffectsAllies() {
        return this.effectsAllies[this.level];
    }

    /**
     * Returns this Skill's enemies effects at its current level.
     * @returns {object} the current enemies effects
     */
    getCurrentEffectsEnemies() {
        return this.effectsEnemies[this.level];
    }

    /**
     * Reduces this Skill's cooldown by 1.
     */
    reduceCooldown() {
        this.cooldownCountdown = Math.max(0, this.cooldownCountdown-1);
    }
    
    /**
     * Initializes this Skill's cooldown (this method is supposedly called whenever the skill is cast).
     */
    applyCooldown() {
        this.cooldownCountdown = this.cooldown;
    }

    /**
     * Tells whether the provided Effect exists among the provided Effect Family in this skill.
     * @param {Data.SkillEffectFamily} target the Effects to look into
     * @param {Data.Effect} effect the Effect to look for
     * @returns {boolean} whether the Effect was found
     */
    hasEffect(target, effect) {
        if((target === Data.SkillEffectFamily.ALLIES || target === Data.SkillEffectFamily.ALL) && this.effectsAllies) {
            for(let i = 0; i < this.effectsAllies[this.level].regular.length; i++) {
                if(this.effectsAllies[this.level].regular[i].effect === effect) return true;
            }
            for(let i = 0; i < this.effectsAllies[this.level].critical.length; i++) {
                if(this.effectsAllies[this.level].critical[i].effect === effect) return true;
            }
        }
        if((target === Data.SkillEffectFamily.ENEMIES || target === Data.SkillEffectFamily.ALL) && this.effectsEnemies) {
            for(let i = 0; i < this.effectsEnemies[this.level].regular.length; i++) {
                if(this.effectsEnemies[this.level].regular[i].effect === effect) return true;
            }
            for(let i = 0; i < this.effectsEnemies[this.level].critical.length; i++) {
                if(this.effectsEnemies[this.level].critical[i].effect === effect) return true;
            }
        }
        if((target === Data.SkillEffectFamily.CASTER || target === Data.SkillEffectFamily.ALL) && this.effectsCaster) {
            for(let i = 0; i < this.effectsCaster[this.level].regular.length; i++) {
                if(this.effectsCaster[this.level].regular[i].effect === effect) return true;
            }
            for(let i = 0; i < this.effectsCaster[this.level].critical.length; i++) {
                if(this.effectsCaster[this.level].critical[i].effect === effect) return true;
            }
        }
        return false;
    }
}
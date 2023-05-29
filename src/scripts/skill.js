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
        this.effectsAllies = getValueFromObject(props, "effectsAllies", null);
        this.effectsEnemies = getValueFromObject(props, "effectsEnemies", null);
        this.variables = getValueFromObject(props, "variables", null);
        this.triggersCaster = getValueFromObject(props, "triggersCaster", null);
        this.triggersAllies = getValueFromObject(props, "triggersAllies", null);
        this.triggersEnemies = getValueFromObject(props, "triggersEnemies", null);
        this.triggersSkill = getValueFromObject(props, "triggersSkill", null);
        this.condition = getValueFromObject(props, "condition", true)
        this.stackable = getValueFromObject(props, "stackable", 1);

        this.level = 1;
    }

    getCurrentEffectsCaster() {
        return this.effectsCaster[this.level];
    }
    getCurrentEffectsAllies() {
        return this.effectsAllies[this.level];
    }
    getCurrentEffectsEnemies() {
        return this.effectsEnemies[this.level];
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
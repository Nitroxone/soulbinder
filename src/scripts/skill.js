class Skill extends Entity {
    constructor(name, desc, icon,
                type,
                manaCost,
                cooldown,
                dmgType,
                dmgMultiplier,
                critMultiplier,
                accMultiplier,
                targets,
                launchPos,
                effectsCaster,
                effectsAllies,
                effectsEnemies,
                variables,
                triggersCaster,
                triggersAllies,
                triggersEnemies,
                condition,
                triggersSkill) {
        super(name, desc, icon);

        this.type = type;
        this.manaCost = manaCost;
        this.cooldown = cooldown;
        this.dmgType = dmgType;
        this.dmgMultiplier = dmgMultiplier;
        this.critMultiplier = critMultiplier;
        this.accMultiplier = accMultiplier;
        this.targets = targets;
        this.launchPos = launchPos;
        this.effectsCaster = effectsCaster;
        this.effectsAllies = effectsAllies;
        this.effectsEnemies = effectsEnemies;
        this.variables = variables;
        this.triggersCaster = triggersCaster;
        this.triggersAllies = triggersAllies;
        this.triggersEnemies = triggersEnemies;
        this.condition = condition;
        this.triggersSkill = triggersSkill;
    }
}
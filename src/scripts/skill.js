class Skill extends Entity {
    constructor(name, desc, icon,
                props) {
        super(name, desc, icon);

        this.type = ("type" in props ? props["type"] : Data.SkillType.BOTH);
        this.manaCost = ("manaCost" in props ? props["manaCost"] : 0);
        this.cooldown = ("cooldown" in props ? props["cooldown"] : 0);
        this.dmgType = ("dmgType" in props ? props["dmgType"] : Data.SkillDamageType.BOTH);
        this.dmgMultiplier = ("dmgMultiplier" in props ? props["dmgMultiplier"] : 0);
        this.criMultiplier = ("criMultiplier" in props ? props["criMultiplier"] : 0);
        this.accMultiplier = ("accMultiplier" in props ? props["accMultiplier"] : 0);
        this.targets = ("targets" in props ? props["targets"] : {allies: '-0', enemies: '-0'});
        this.launchPos = ("launchPos" in props ? props["launchPos"] : [true, true, true]);
        this.effectsCaster = ("effectsCaster" in props ? props["effectsCaster"] : {});
        this.effectsAllies = ("effectsAllies" in props ? props["effectsAllies"] : {});
        this.effectsEnemies = ("effectsEnemies" in props ? props["effectsEnemies"] : {});
        this.variables = ("variables" in props ? props["variables"] : {});
        this.triggersCaster = ("triggersCaster" in props ? props["triggersCaster"] : []);
        this.triggersAllies = ("triggersAllies" in props ? props["triggersAllies"] : []);
        this.triggersEnemies = ("triggersEnemies" in props ? props["triggersEnemies"] : []);
        this.triggersSkill = ("triggersSkill" in props ? props["triggersSkill"] : []);
        this.condition = ("condition" in props ? props["condition"] : true);
    }
}
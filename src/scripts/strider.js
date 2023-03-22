class Strider extends NPC {
    constructor(name,
                desc,
                charset,
                subname,
                health,
                mana,
                stamina,
                dodge,
                speed,
                accuracy,
                protection,
                might,
                spirit,
                resBleed,
                resPoison,
                resMove,
                resStun,
                resilience,
                warding,
                critEffects,
                variables,
                triggers,
                uniqueName,
                uniqueDesc,
                uniqueIcon,
                skillTree
                ) {
        super(name, desc, charset, subname, health, mana, stamina, dodge, speed, accuracy, protection, might, spirit, resBleed, resPoison, resMove, resStun, resilience, warding, critEffects, variables, triggers);
        
        this.eqWeaponLeft = null;
        this.eqWeaponRight = null;
        this.eqShield = null;
        this.eqHelmet = null;
        this.eqChestplate = null;
        this.eqGloves = null;
        this.eqBoots = null;

        this.trinkets = [];
        this.trinketSlots = 2;
        this.trinketSlotsFree = 2;

        this.skillTree = skillTree;

        this.uniqueName = uniqueName;
        this.uniqueDesc = uniqueDesc;
        this.uniqueIcon = uniqueIcon;

        this.level = new Level("Level", 1, 20, 1, 1000, 0);
        this.skillPoints = 3;

        this.skillTree = skillTree;
    }

    /**
     * Checks whether the provided Node can be unlocked.
     * The requirements are the player level and his amount of available skill points.
     * @param {SkillTree} node the Node to check for
     * @returns {boolean} whether the Node can be unlocked
     */
    canUnlockTreeNode(node) {
        const requirements = node.requirements[node.currentLevel+1];
        if(!requirements) return false;
        return this.level.currentLevel >= requirements[0] && this.skillPoints >= requirements[1];
    }

    /**
     * Removes an amount of skill points from the Strider, based on the provided Node's required skill points for the next level.
     * @param {SkillTreeNode} node the Node
     */
    removeSkillPointsFromNode(node) {
        this.skillPoints = Math.max(0, this.skillPoints - node.getNextRequiredSkillPoints())
    }

    /**
     * Unlocks the provided Node's next level if the requirements are met.
     * @param {SkillTreeNode} node the Node to unlock
     */
    unlockTreeNode(node) {
        if(this.canUnlockTreeNode(node)) {
            // REMOVE PREVIOUS REWARDS
            if(node.currentLevel !== 0) {
                node.getCurrentRewards().forEach(reward => {
                    switch(reward.type) {
                        case Data.SkillTreeNodeRewardType.STAT:
                            reward.content.forEach(stat => {
                                this.addEffect(stat, true);
                            });
                            break;
                    }
                })
            }

            // ADD NEXT REWARDS
            node.getNextRewards().forEach(reward => {
                switch(reward.type) {
                    case Data.SkillTreeNodeRewardType.STAT:
                        reward.content.forEach(stat => {
                            this.addEffect(stat);
                        });
                        break;
                }
            })
            this.removeSkillPointsFromNode(node);
            node.addLevel();
            console.log(this.name + ": upgraded node [" + node.name + "] to Level " + node.currentLevel);
        } else {
            ERROR('Cannot unlock the provided node.');
        }
    }

    /**
     * Adds the Stat's data to the Strider's data.
     * @param {Stat} effect the Stat to add
     * @param {boolean} remove whether the Stat should removed instead of being added
     */
    addEffect(effect, remove = false) {
        const factor = remove ? -1 : 1;
        switch(effect.effect) {
            case Data.Effect.HEALTH:
                this.health = effect.getValue() * factor;
                break;
            case Data.Effect.MANA:
                this.mana = effect.getValue() * factor;
                break;
            case Data.Effect.STAMINA:
                this.stamina = effect.getValue() * factor;
                break;
            case Data.Effect.MAXHEALTH:
                this.maxHealth += effect.getValue() * factor
                break;
            case Data.Effect.MAXMANA:
                this.maxMana += effect.getValue() * factor;
                break;
            case Data.Effect.MAXSTAMINA:
                this.maxStamina += effect.getValue() * factor;
                break;
            case Data.Effect.DODGE:
                this.dodge += effect.getValue() * factor;
                break;
            case Data.Effect.SPEED:
                this.speed += effect.getValue() * factor;
                break;
            case Data.Effect.ACCURACY:
                this.accuracy += effect.getValue() * factor;
                break;
            case Data.Effect.PROTECTION:
                this.protection += effect.getValue() * factor;
                break;
            case Data.Effect.MIGHT:
                this.might += effect.getValue() * factor;
                break;
            case Data.Effect.SPIRIT:
                this.spirit += effect.getValue() * factor;
                break;
            case Data.Effect.RES_BLEED_DMG:
                this.resBleed[0] += effect.getValue() * factor;
                break;
            case Data.Effect.RES_BLEED_DURATION:
                this.resBleed[1] += effect.getValue() * factor;
                break;
            case Data.Effect.RES_POISON_DMG:
                this.resPoison[0] += effect.getValue() * factor;
                break;
            case Data.Effect.RES_POISON_DURATION:
                this.resPoison[1] += effect.getValue() * factor;
                break;
            case Data.Effect.RES_MOVE:
                this.resMove += effect.getValue() * factor
                break;
            case Data.Effect.RES_STUN: 
                this.resStun += effect.getValue() * factor
                break;
            case Data.Effect.RESILIENCE:
                this.resilience += effect.getValue() * factor;
                break;
            case Data.Effect.WARDING:
                this.warding += effect.getValue() * factor;
                break;
            case Data.Effect.REGEN_HEALTH:
                this.regenHealth += effect.getValue() * factor;
                break;
            case Data.Effect.REGEN_MANA:
                this.regenMana += effect.getValue() * factor;
                break;
            case Data.Effect.REGEN_STAMINA:
                this.regenStamina += effect.getValue() * factor;
                break;
            case Data.Effect.MODIF_HEAL_RECV:
                this.modifHealRecv += effect.getValue() * factor;
                break;
            case Data.Effect.MODIF_HEAL_GIVEN:
                this.modifHealGiven += effect.getValue() * factor;
                break;
            case Data.Effect.DAMAGE_REFLECTION:
                this.damageReflection += effect.getValue() * factor;
                break;
            case Data.Effect.MODIF_BLOCK:
                this.modifBlock += effect.getValue() * factor;
                break;
            case Data.Effect.MODIF_DMG_TOTAL:
                this.modifDmgTotal += effect.getValue() * factor;
                break;
            case Data.Effect.MODIF_DMG_WEAPON:
                this.modifDmgWeapon += effect.getValue() * factor;
                break;
            case Data.Effect.MODIF_DMG_SKILL:
                this.modifDmgSkill += effect.getValue() * factor;
                break;
            case Data.Effect.MODIF_DMG_POISON:
                this.modifDmgPoison += effect.getValue() * factor;
                break;
            case Data.Effect.MODIF_DMG_STUN:
                this.modifDmgStun += effect.getValue() * factor;
                break;
            case Data.Effect.MODIF_DMG_BLEED:
                this.modifDmgBleed += effect.getValue() * factor;
                break;
            case Data.Effect.MODIF_ACCURACY_SKILL:
                this.modifAccuracySkill += effect.getValue() * factor;
                break;
            case Data.Effect.MODIF_ACCURACY_STUN:
                this.modifAccuracyStun += effect.getValue() * factor;
                break;
            case Data.Effect.MODIF_ACCURACY_BLEED:
                this.modifAccuracyBleed += effect.getValue() * factor;
                break;
            case Data.Effect.MODIF_ACCURACY_POISON:
                this.modifAccuracyPoison += effect.getValue() * factor;
                break;
            case Data.Effect.MODIF_CRIT_SKILL:
                this.modifCritSkill += effect.getValue() * factor;
                break;
            case Data.Effect.MODIF_CRIT_STUN:
                this.modifCritStun += effect.getValue() * factor;
                break;
            case Data.Effect.MODIF_CRIT_BLEED:
                this.modifCritBleed += effect.getValue() * factor;
                break;
            case Data.Effect.MODIF_CRIT_POISON:
                this.modifCritPoison += effect.getValue() * factor;
                break;     
            default:
                ERROR('Tried to add an unknown effect.');
                return;
        }
        console.log(this.name + ": " + effect.getValue()*factor + " " + effect.effect);
    }
}
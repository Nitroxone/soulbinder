/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class NPC extends Entity {
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
                skills = [],
                ) {
        super(name, desc, 0);

        this.charset = charset;

        this.subname = subname;

        this.health = health;
        this.mana = mana;
        this.stamina = stamina;
        this.maxHealth = health;
        this.maxMana = mana;
        this.maxStamina = stamina;

        this.shield = 0;

        this.dodge = dodge;
        this.speed = speed;
        this.accuracy = accuracy;
        this.protection = protection;
        this.might = might;
        this.spirit = spirit;

        this.resBleed = resBleed;
        this.resPoison = resPoison;
        this.resMove = resMove;
        this.resStun = resStun;
        this.resilience = resilience;
        this.warding = warding;

        this.regenHealth = 0;
        this.regenMana = 0;
        this.regenStamina = 0;
        this.modifHealRecv = 0;
        this.modifHealGiven = 0;
        this.damageReflection = 0;
        this.modifBlock = 0;
        this.modifDmgTotal = 0;
        this.modifDmgWeapon = 0;
        this.modifDmgSkill = 0;
        this.modifDmgPoison = 0;
        this.modifDmgStun = 0;
        this.modifDmgBleed = 0;
        this.modifAccuracySkill = 0;
        this.modifAccuracyStun = 0;
        this.modifAccuracyBleed = 0;
        this.modifAccuracyPoison = 0;
        this.modifCritSkill = 0;
        this.modifCritStun = 0;
        this.modifCritBleed = 0;
        this.modifCritPoison = 0;
        this.modifChanceStun = 0;
        this.modifChanceMove = 0;

        this.critEffects = critEffects;
        this.variables = variables;
        this.triggers = triggers;

        this.activeEffects = [];

        this.popupsQueue = [];

        this.isStunned = false;
        this.isGuarded = false;
        this.isGuarding = false;
        this.isBlocking = false;
        this.guardedBy = null;
        this.guarding = null;

        this.echoes = []; // All NPC's echoes (inner powers, gear, skills...)

        this.skills = [];
        skills.forEach(skill => {
            this.addSkill(skill);
        });

        // Initializing empty bonuses
        this.bonuses = [];
    }

    /**
     * 
     * @param {Stat} effect the alteration's effect
     * @param {Item|Skill} origin the alteration's origin
     * @param {Data.AlterAction} action the alteration type
     * @param {string} uid the Stat UID to remove (in case of a removal)
     */
    alter(props = {}) {
        const effect = getValueFromObject(props, "effect", null);
        const origin = getValueFromObject(props, "origin", null);
        const action = getValueFromObject(props, "action", null);
        const variables = getValueFromObject(props, "variables", {});
        const noApply = getValueFromObject(props, "noApply", false);
        const uid = getValueFromObject(props, "uid", null);

        if(!action) ERROR('Undefined alteration action.');

        if(action === Data.AlterAction.ADD) {
            const bonus = new Bonus(effect, origin, variables);

            this.addBonus(bonus);
            if(isBaseMaxStat(effect)) {
                if(effect.getValue() > 0) bonus.variables['value'] = this.increaseBaseStat(effect);
                else bonus.variables['value'] = this.decreaseBaseStat(effect);
            }
            else if(!noApply) this.applyEffect(effect);

            console.log('Adding bonus:');
            console.log(bonus);
        } else if(action === Data.AlterAction.REMOVE) {
            const bonus = this.bonuses.find(x => x.stat.uid === uid);
            this.removeBonus(bonus);

            console.log('Removing bonus:');
            console.log(bonus);

            if(isBaseMaxStat(bonus.stat)) {
                if(bonus.stat.getValue() > 0) this.decreaseBaseStat(new Stat({effect: bonus.stat.effect, theorical: bonus.variables.value}));
                else this.increaseBaseStat(new Stat({effect: bonus.stat.effect, theorical: bonus.variables.value}));
            }
            else if(!noApply) this.applyEffect(bonus.stat, true);
        }
    }

    /**
     * Adds the provided bonus to this NPC.
     * @param {Bonus} bonus the bonus to add
     */
    addBonus(bonus) {
        this.bonuses.push(bonus);
    }

    /**
     * Removes the provided bonus from this NPC.
     * @param {Bonus} bonus the bonus to remove
     */
    removeBonus(bonus) {
        removeFromArray(this.bonuses, bonus);
    }

    /**
     * Adds the Stat's data to the NPC's data.
     * @param {Stat} effect the Stat to add
     * @param {boolean} remove whether the Stat should removed instead of being added
     */
    applyEffect(effect, remove = false) {
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
                this.maxHealth += effect.getValue() * factor;
                this.health += effect.getValue() * factor;
                break;
            case Data.Effect.MAXMANA:
                this.maxMana += effect.getValue() * factor;
                this.mana += effect.getValue() * factor;
                break;
            case Data.Effect.MAXSTAMINA:
                this.maxStamina += effect.getValue() * factor;
                this.stamina += effect.getValue() * factor;
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
            case Data.Effect.MODIF_CHANCE_STUN:
                this.modifChanceStun += effect.getValue() * factor;
                break; 
            case Data.Effect.MODIF_CHANCE_MOVE:
                this.modifChanceMove += effect.getValue() * factor;
                break; 
            default:
                console.info('Tried to add an unknown effect :' + effect.effect + ' on ' + this.name);
                return;
        }
        console.log(this.name + ": " + effect.getValue()*factor + " " + effect.effect);
    }

    /**
     * Runs the triggers which type matches the provided TriggerType value. 
     * @param {Data.TriggerType|Data.TriggerType[]} type the type of trigger that must be fired
     */
    runTriggers(type) {
        if(Array.isArray(type)) this.triggers.forEach(trigger => {
            if(trigger.type === type || trigger.type.includes(type)) trigger.checker() && trigger.behavior();
        })
        else this.triggers.forEach(trigger => {
            if(trigger.type === type || trigger.type.includes(type)) trigger.checker() && trigger.behavior();
        });
    }

    /**
     * Adds the specified number to this NPC's shield. Cannot exceed maxHealth.
     * @param {number} amount the amount of shield to add
     */
    addShield(amount) {
        this.shield = Math.min(this.maxHealth, this.shield+amount);
        if(amount > 0) this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.TURQUOISE + '">+ ' + Math.round(amount) + '</p>'));
    }

    /**
     * Removes the specified number from this NPC's shield. Cannot go below 0.
     * @param {number} amount the amount of shield to remove
     */
    removeShield(amount) {
        this.shield = Math.max(this.shield - amount, 0);
    }

    /**
     * Applies the damage held in the provided params object to this NPC.
     * @param {object} params a battle attack params object
     */
    receiveDamage(params) {
        const phys = params.phys_damage;
        const magi = params.magi_damage;
        const crit = params.crit_damage;
        let damage, phys_damage, magi_damage;

        phys_damage = phys === 0 ? 0 : Math.max(0, phys - this.resilience);
        magi_damage = magi === 0 ? 0 : Math.max(0, magi - this.warding);

        damage = phys_damage + magi_damage + crit;
        if(!params.ignoresProtection) damage -= Math.round(damage * this.protection / 100);

        if(this.isBlocking) {
            let reduction = 0;
            if(this instanceof Strider) reduction += this.getTotalBlockValue();
            reduction += Math.round(damage * (0.2 + this.modifBlock/100));
            console.log('Blocking: Reduced ' + reduction + ' damage');
            damage = Math.max(0, damage - reduction);
        }

        this.removeBaseStat(new Stat({effect: Data.Effect.HEALTH, theorical: damage}));

        console.log(this.name + ' received ' + damage + ' damage (' + phys + ' phys, effective ' + phys_damage + ' | ' + magi + ' magi, effective ' + magi_damage + ' | ' + crit + ' critical -> Total ' + damage + ' with ' + this.protection + '% reduction' + (params.ignoresProtection ? ' (BYPASSED PROTECTION)' : ''));
    }

    receiveBleedOrPoison(eff) {
        console.log('---TRIGGERED: ' + eff.effect);
        this.removeBaseStat(new Stat({effect: Data.Effect.HEALTH, theorical: eff.getValue(), ignoreShield: true}));
        if(eff.effect === Data.Effect.BLIGHT_CURABLE || eff.effect === Data.Effect.BLIGHT_INCURABLE) {
            this.removeBaseStat(new Stat({effect: Data.Effect.MANA, theorical: eff.getValue()}));
            this.runTriggers(Data.TriggerType.ON_RECV_POISON);
        } else if(eff.effect === Data.Effect.BLEEDING_CURABLE || eff.effect === Data.Effect.BLEEDING_INCURABLE) {
            this.removeBaseStat(new Stat({effect: Data.Effect.STAMINA, theorical: eff.getValue()}));
            this.runTriggers(Data.TriggerType.ON_RECV_BLEEDING);
        }
    }

    /**
     * Removes the provided effect's value from either Health, Mana, or Stamina.
     * @param {Stat} eff the effect to add
     */
    removeBaseStat(eff) {
        let damage;
        if(eff.effect === Data.Effect.HEALTH) {
            let removeShield = false;
            damage = (eff.isPercentage ? this.maxHealth * Math.abs(eff.getValue()) / 100 : eff.getValue());
            if(this.shield > 0 && !eff.ignoreShield) {
                if(this.shield <= Math.abs(damage)) {
                    removeShield = true;
                    this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.TURQUOISE + '">- ' + this.shield + '</p>'));
                    damage = Math.round(damage) - this.shield;
                } else {
                    this.shield = Math.max(0, this.shield - damage);
                    this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.TURQUOISE + '">- ' + Math.round(damage) + '</p>'));
                }
                if(removeShield) this.shield = 0;
            }
            if(this.shield <= 0 || eff.ignoreShield) {
                if(damage > 0) this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.RED + '">- ' + Math.round(damage) + '</p>'));
                this.health = Math.max(0, this.health - Math.round(damage));
            }
            this.runTriggers(Data.TriggerType.ON_REMOVE_HEALTH);

            if(this.health === 0) this.kill();
        } else if(eff.effect === Data.Effect.STAMINA) {
            damage = (eff.isPercentage ? this.maxStamina * Math.abs(eff.getValue()) / 100 : Math.abs(eff.getValue()));
            if(damage > 0) this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.GREEN + '">-' + Math.round(damage) + '</p>'));
            this.stamina = Math.max(0, this.stamina - Math.round(damage));
            this.runTriggers(Data.TriggerType.ON_REMOVE_STAMINA);
        } else if(eff.effect === Data.Effect.MANA) {
            damage = (eff.isPercentage ? this.maxMana * Math.abs(eff.getValue()) / 100 : Math.abs(eff.getValue()));
            if(damage > 0) this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.BLUE + '">-' + Math.round(damage) + '</p>'));
            this.mana = Math.max(0, this.mana - Math.round(damage));
            this.runTriggers(Data.TriggerType.ON_REMOVE_MANA);
        }
        console.log('REMOVING ' + Math.round(damage) + ' ' + eff.effect + ' FROM ' + this.name);
    }

    /**
     * Adds the provided effect's value to either Health, Mana, or Stamina.
     * @param {Stat} eff the effect to add
     */
    addBaseStat(eff, originUser = false) {
        let amount = 0;
        if(eff.effect === Data.Effect.HEALTH) {
            if(eff.isPercentage) amount = this.maxHealth * eff.getValue() / 100;
            else amount = eff.getValue();

            amount += amount * this.modifHealRecv / 100;
            if(originUser) {
                console.info('ORIGIN USER DETECTED!!!! ' + originUser.name + ' on ' + this.name);
                amount += amount * originUser.modifHealGiven / 100;
                originUser.runTriggers(Data.TriggerType.ON_DEAL_HEAL);
                this.runTriggers(Data.TriggerType.ON_RECV_HEAL);
            }

            this.health = Math.min(this.maxHealth, this.health + Math.round(amount));
            if(amount > 0) {
                this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.RED + '">+ ' + Math.round(amount) + '</p>'));
                this.runTriggers(Data.TriggerType.ON_ADD_HEALTH);
                this.runTriggers(Data.TriggerType.ON_RECV_HEAL);
            }
            
        } else if(eff.effect === Data.Effect.MANA) {
            if(eff.isPercentage) amount = this.maxMana * eff.getValue() / 100;
            else amount = eff.getValue();

            this.mana = Math.min(this.maxMana, this.mana + Math.round(amount));
            if(amount > 0) {
                this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.BLUE + '">+ ' + Math.round(amount) + '</p>'));
                this.runTriggers(Data.TriggerType.ON_ADD_MANA);
            }
        } else if(eff.effect === Data.Effect.STAMINA) {
            if(eff.isPercentage) amount = this.maxStamina * eff.getValue() / 100;
            else amount = eff.getValue();

            this.stamina = Math.min(this.maxStamina, this.stamina + Math.round(amount));
            if(amount > 0) {
                this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.GREEN + '">+ ' + Math.round(amount) + '</p>'));
                this.runTriggers(Data.TriggerType.ON_ADD_STAMINA);
            }
        }
        console.log('ADDING ' + Math.round(amount) + ' ' + eff.effect + ' TO ' + this.name);
    }

    /**
     * Increases the base effect specified in the provided Stat. (MAXHEALTH, MAXMANA, MAXSTAMINA)
     * @param {Stat} eff 
     */
    increaseBaseStat(eff) {
        let amount = 0;
        
        if(eff.effect === Data.Effect.MAXHEALTH) {
            if(eff.isPercentage) amount = Math.round(this.maxHealth * eff.getValue() / 100);
            else amount = eff.getValue();

            this.maxHealth += amount;
            this.health += amount;
        } else if(eff.effect === Data.Effect.MAXSTAMINA) {
            if(eff.isPercentage) amount = Math.round(this.maxStamina * eff.getValue() / 100);
            else amount = eff.getValue();

            this.maxStamina += amount;
            this.stamina += amount;
        } else if(eff.effect === Data.Effect.MAXMANA) {
            if(eff.isPercentage) amount = Math.round(this.maxMana * eff.getValue() / 100);
            else amount = eff.getValue();

            this.maxMana += amount;
            this.mana += amount;
        }
        console.log('INCREASED ' + eff.effect + ' OF ' + this.name + ' by ' + eff.getValue() + '% (' + amount + ' points)');
        return amount;
    }

    /**
     * Decreases the base stat effect specified in the provided Stat. (MAXHEALTH, MAXMANA, MAXSTAMINA)
     * @param {Stat} eff 
     */
    decreaseBaseStat(eff) {
        let amount = 0;
        
        if(eff.effect === Data.Effect.MAXHEALTH) {
            if(eff.isPercentage) amount = Math.round(this.maxHealth * eff.getValue() / 100);
            else amount = eff.getValue();

            this.maxHealth -= amount;
            this.health -= amount;
        } else if(eff.effect === Data.Effect.MAXSTAMINA) {
            if(eff.isPercentage) amount = Math.round(this.maxStamina * eff.getValue() / 100);
            else amount = eff.getValue();

            this.maxStamina -= amount;
            this.stamina -= amount;
        } else if(eff.effect === Data.Effect.MAXMANA) {
            if(eff.isPercentage) amount = Math.round(this.maxMana * eff.getValue() / 100);
            else amount = eff.getValue();

            this.maxMana -= amount;
            this.mana -= amount;
        }
        console.log('DECREASED ' + eff.effect + ' OF ' + this.name + ' by ' + eff.getValue() + '% (' + amount + ' points)');
        return amount;
    }

    /**
     * Applies a stun effect to this NPC.
     */
    applyStun() {
        this.isStunned = true;
        addSpecialEffect(this.getBattleFormationStringId(), Data.Effect.STUN);
    }

    /**
     * Removes a stun effect from this NPC.
     */
    removeStun() {
        this.isStunned = false;
        removeSpecialEffect(this.getBattleFormationStringId(), Data.Effect.STUN);
    }

    /**
     * Applies a blocking effect to this NPC.
     */
    applyBlocking() {
        this.isBlocking = true;
        addSpecialEffect(this.getBattleFormationStringId(), Data.Effect.BLOCK);
        this.addBattlePopup(new BattlePopup(0, '<p>Blocks!</p>'));
    }

    /**
     * Removes a blocking effect from this NPC.
     */
    removeBlocking() {
        this.isBlocking = false;
        removeSpecialEffect(this.getBattleFormationStringId(), Data.Effect.BLOCK);
    }

    /**
     * Applies a guarded effect to this NPC.
     * @param {NPC} npc the NPC that's guarding
     */
    applyGuarded(npc) {
        this.isGuarded = true;
        this.guardedBy = npc;
        addSpecialEffect(this.getBattleFormationStringId(), Data.Effect.GUARDED);
    }

    /**
     * Removes a guarded effect from this NPC.
     */
    removeGuarded() {
        this.isGuarded = false;
        this.guardedBy = null;
        removeSpecialEffect(this.getBattleFormationStringId(), Data.Effect.GUARDED);
    }

    /**
     * Applies a guarding effect to this NPC.
     * @param {NPC} npc the NPC that's guarded
     */
    applyGuarding(npc) {
        this.isGuarding = true;
        this.guarding = npc;
    }

    /**
     * Removes a guarding effect from this NPC.
     */
    removeGuarding() {
        this.isGuarding = false;
        this.guarding = null;
    }

    /**
     * Applies Health/Stamina/Mana regeneration effects, if there is any.
     */
    applySelfRegenerationEffects() {
        this.regenHealth > 0 && this.addBaseStat(new Stat({effect: Data.Effect.HEALTH, theorical: this.regenHealth, isPercentage: true}));
        this.regenMana > 0 && this.addBaseStat(new Stat({effect: Data.Effect.MANA, theorical: this.regenMana, isPercentage: true}));
        this.regenStamina > 0 && this.addBaseStat(new Stat({effect: Data.Effect.STAMINA, theorical: this.regenStamina, isPercentage: true}));
    }

    /**
     * Adds the provided ActiveEffect to this NPC's active effects list.
     * If the ActiveEffect already exists, refreshes it.
     * @param {ActiveEffect} ae 
     */
    addActiveEffect(ae) {
        const found = this.activeEffects.find(x => x.name === ae.name);

        if(found) found.refresh(ae);
        else this.activeEffects.push(ae);
    }

    /**
     * Adds the provided BattlePopup to this NPC's popups queue.
     * @param {BattlePopup} popup 
     */
    addBattlePopup(popup) {
        this.popupsQueue.push(popup);
    }

    /**
     * Executes the currently stocked BattlePopup objects in this NPC's popups queue.
     */
    executePopups() {
        this.nextPopup();
    }

    /**
     * Executes the next BattlePopup in this NPC's popups queue.
     */
    nextPopup() {
        const pos = this.getBattleAnimationStringId();
        if(this.popupsQueue.length > 0) this.executePopup(pos, this.popupsQueue[0]);
        else game.currentBattle.addEndTurnCounter();
    }

    /**
     * 
     * @param {Data.FormationPosition} pos 
     * @param {*} e 
     */
    executePopup(pos, e) {
        document.querySelector('#' + pos).innerHTML = '<div id="' + this.getPopupIdString() + '" class="battlePopup">' + e.content + '</div>';
        const popup = document.querySelector('#' + this.getPopupIdString());
        popup.classList.add('showUp');
        popup.addEventListener('animationend', e => {
            popup.classList.remove('showUp');
            popup.classList.add('popupFadeOut');
            popup.addEventListener('animationend', e => {
                document.querySelector('#' + pos).innerHTML = '';
                this.popupsQueue.shift();
                this.nextPopup();
            });
        }, false);
    }

    
    getBattleFormationStringId() {
        const battle = game.currentBattle;
        let str = 'b-';
        if(arrayContains(battle.allies, this)) str += 'hero-';
        else if(arrayContains(battle.enemies, this)) str += 'enemy-';

        return str += this.getSelfPosInBattle().toLowerCase();
    }

    getBattleFormationWrapperStringId() {
        const battle = game.currentBattle;
        let str = 'gw-';
        if(arrayContains(battle.allies, this)) str += 'h-';
        else if(arrayContains(battle.enemies, this)) str += 'e-';
        
        return str += this.getSelfPosInBattle().toLowerCase();
    }

    getBattleAnimationStringId() {
        const battle = game.currentBattle;
        let str = 'aw-';
        if(arrayContains(battle.allies, this)) str += 'h-';
        else if(arrayContains(battle.enemies, this)) str += 'e-';
        
        return str += this.getSelfPosInBattle().toLowerCase();
    }

    getPopupIdString() {
        const battle = game.currentBattle;
        let str = 'popup-';
        if(arrayContains(battle.allies, this)) str += 'h-';
        else if(arrayContains(battle.enemies, this)) str += 'e-';
        
        return str += this.getSelfPosInBattle().toLowerCase();
    }

    /**
     * Returns this NPC's current position in the current battle.
     * @returns {Data.FormationPosition} this NPC's current position
     */
    getSelfPosInBattle() {
        const battle = game.currentBattle;
        if(battle.allies[0] === this) return Data.FormationPosition.BACK;
        if(battle.allies[1] === this) return Data.FormationPosition.MIDDLE;
        if(battle.allies[2] === this) return Data.FormationPosition.FRONT;
        if(battle.enemies[0] === this) return Data.FormationPosition.BACK;
        if(battle.enemies[1] === this) return Data.FormationPosition.MIDDLE;
        if(battle.enemies[2] === this) return Data.FormationPosition.FRONT;
    }

    /**
     * Removes Mana according to the provided skill's manaCost and fires ON_USE_SKILL triggers.
     * @param {Skill} skill the Skill that is casted
     */
    useSkill(skill) {
        this.removeBaseStat(new Stat({effect: Data.Effect.MANA, theorical: skill.manaCost}));
        skill.applyCooldown();
        console.log(skill.name + ' cooldown countdown now set to ' + skill.cooldownCountdown);
        this.runTriggers(Data.TriggerType.ON_USE_SKILL);
    }

    /**
     * Calls the adequate function that alters a base stat, based on the provided Effect.
     * @param {Stat} eff HEALTH or MANA or STAMINA or MAXHEALTH or MAXMANA or MAXSTAMINA
     */
    alterBaseStat(eff, originUser = false, origin = null) {
        if(isBaseStatChange(eff, true)) {
            if(eff.getValue() > 0) this.addBaseStat(eff, originUser);
            else this.removeBaseStat(eff);
        } else if(isBaseMaxStat(eff)) {
            /*if(eff.getValue() > 0) this.increaseBaseStat(eff);
            else this.decreaseBaseStat(eff);*/
            const action = eff.getValue() > 0 ? Data.AlterAction.ADD : Data.AlterAction.REMOVE;
            this.alter({effect: eff, action: action, uid: eff.uid, origin: origin});
        }
    }

    /**
     * Applies each Stat stored in "effects" parameter to this NPC, also adding an ActiveEffect?
     * @param {Skill} skill the Skill from which effects originate
     * @param {NPC} originUser the Skill caster
     * @param {Stat[]} effects the Skill's effects
     * @param {boolean} critical whether the Skill is a critical hit
     */
    applyEffects(skill, originUser, effects, critical = false) {
        effects.forEach(eff => {
            if(eff.delay === 0) {
                if(isBaseStatChange(eff)) this.alterBaseStat(eff, originUser, skill);
                else if(eff.effect === Data.Effect.SHIELD) this.addShield(eff.getValue());
                else if(eff.effect === Data.Effect.STUN) this.applyStun()
                else if(eff.effect === Data.Effect.GUARDED) this.applyGuarded(originUser);
                else if(eff.effect === Data.Effect.GUARDING) this.applyGuarding(skill.variables.guarded);
                else if(!isBleedingOrPoisoning(eff)) this.alter({
                    effect: eff,
                    action: Data.AlterAction.ADD,
                    origin: skill
                });
                else this.applyEffect(eff);
            }
        });
        for(let i = effects.length - 1; i >= 0; i--) {
            if(effects[i].duration === 0 && effects[i].delay === 0) removeFromArray(effects, effects[i]);
        }

        if(effects.length > 0) this.addActiveEffect(new ActiveEffect({
            name: skill.name + (critical ? ' (critical)' : ''),
            originUser: originUser,
            originObject: skill,
            effects: effects,
            style: {
                color: Data.Color.TURQUOISE,
                bold: critical,
                italic: critical
            }
        }));
    }

    /**
     * Adds the provided Skill to this NPC's skills.
     * @param {Skill} skill the Skill to add
     */
    addSkill(skill) {
        this.skills.push(skill);
    }

    /**
     * Removes the provided Skill from this NPC's skills.
     * @param {Skill} skill the Skill to remove
     */
    removeSkill(skill) {
        removeFromArray(this.skills, skill);
    }

    /**
     * Adds the provided Echo to this NPC.
     * @param {Skill} skill the Echo to add
     */
    addEcho(echo) {
        this.echoes.push(echo);
        echo.owner = this;
        echo.triggers.forEach(trig => {
            this.triggers.push(trig);
            trig.owner = this;
        });
    }

    /**
     * Removes the provided Echo from this NPC.
     * @param {Skill} skill the Echo to remove
     */
    removeEcho(echo) {
        removeFromArray(this.echoes, echo);
        echo.owner = null;
        echo.triggers.forEach(trig => {
            removeFromArray(this.triggers, trig);
            trig.owner = null;
        });
    }

    reduceSkillsCooldown() {
        this.skills.forEach(sk => {
            sk.reduceCooldown();
        });
    }

    /**
     * Executes all of the ActiveEffect objects that are stored in this NPC's activeEffects array.
     */
    executeActiveEffects() {
        // Explanation:
        // First, loop through each effect. If the effect is ACTIVE, call addEffect.
        // Then, loop through each effect again, backwards, and remove 1 duration from each. If duration is 0, remove the effect entirely.
        // Then, loop through all the active effects. If there is no more effect, remove the active effect entirely.
        if(this.isBlocking) this.removeBlocking();
        for(let i = 0; i < this.activeEffects.length; i++) {
            let ae = this.activeEffects[i];
            console.log(ae);
            
            // If effect is ACTIVE, call addEffect
            ae.effects.forEach(eff => {
                if(eff.delay > 0) eff.delay--;
                if(eff.type === Data.StatType.ACTIVE && eff.delay === 0) {
                    if(isBaseStatChange(eff)) this.alterBaseStat(eff);
                    else if(isBleedingOrPoisoning(eff)) {
                        this.receiveBleedOrPoison(eff);
                    }
                    else this.applyEffect(eff);
                }
            });

            for(let j = ae.effects.length - 1; j >= 0; j--) {
                let eff = ae.effects[j];
                console.log(eff);
                if(eff.duration === 1) {
                    eff.duration = 0;
                    removeFromArray(ae.effects, eff);
                    if(eff.effect === Data.Effect.STUN) this.removeStun();
                    else if(eff.effect === Data.Effect.GUARDED) {
                        this.removeGuarded();
                        ae.originObject.variables.guarded = null;
                    }
                    else if(eff.effect === Data.Effect.GUARDING) {
                        this.removeGuarding();
                        ae.originObject.variables.guarding = null;
                    }
                    else if(isMovementEffect(eff.effect)) {
                        game.currentBattle.applyCasterMovement({effect: convertMovementToCasterType(eff).effect});
                    }
                    else {
                        if(isShieldEffect(eff)) this.removeShield(eff.getValue())
                        else if(eff.type === Data.StatType.PASSIVE || (!isBaseStatChange(eff, true) && !isBleedingOrPoisoning(eff))) {
                            this.alter({action: Data.AlterAction.REMOVE, uid: eff.uid});
                        }
                    }
                    console.log('Removed: ' + eff.effect);
                } else {
                    if(eff.delay === 0) eff.duration -= 1;
                    console.log('Removed 1 duration from ' + eff.effect);
                }
            }

            ae.countdown++;
        }
        for(let i = this.activeEffects.length - 1; i >= 0; i--) {
            let ae = this.activeEffects[i];
            if(ae.effects.length === 0) removeFromArray(this.activeEffects, ae);
        }
    }

    /**
     * Returns whether this NPC has the provided effect in its active effects list.
     * @param {Data.Effect} effect 
     * @returns {boolean} whether the effect was found among the active effects list
     */
    hasEffect(effect) {
        const found = false;
        for(let i = 0; i < this.activeEffects.length; i++) {
            let ae = this.activeEffects[i];
            for(let j = 0; j < ae.effects.length; j++) {
                if(ae.effects[j].effect === effect) return true;
            }
        }
        
        return found;
    }

    /**
     * Returns whether this NPC's health is equal to or below 0.
     * @returns {boolean} whether the NPC is dead
     */
    isDead() {
        return this.health <= 0;
    }

    /**
     * Empties this NPC's popups queue.
     */
    emptyPopupsQueue() {
        this.popupsQueue = [];
    }

    /**
     * Finds and returns the bonus which UUID matches the provided one.
     * @param {string} uid the UUID to find
     * @returns {Bonus|null} the matching Bonus object, or null if none was found
     */
    findBonusWithUid(uid) {
        return this.bonuses.find(x => x.stat.uid === uid);
    }

    /**
     * Finds and returns the ActiveEffect which name matches the provided one.
     * @param {string} name the ActiveEffect's name to find
     * @returns {ActiveEffect|null} the matching ActiveEffect object, or null if none was found
     */
    getActiveEffect(name) {
        return this.activeEffects.find(x => x.name.toLowerCase() === name.toLowerCase());
    }

    /**
     * Removes the ActiveEffect whose name matches the provided one.
     * @param {string} name the ActiveEffect's name to remove
     */
    removeActiveEffect(name) {
        removeFromArray(this.activeEffects, this.getActiveEffect(name));
    }

    /**
     * Adds this NPC's critical effects.
     */
    addCriticalEffects() {
        console.log(this.critEffects);
        const cloned = Entity.clone(this.critEffects);
        cloned.forEach(eff => {
            eff.fix();
        });
        this.applyEffects({name: this.subname}, this, cloned, true);
    }

    /**
     * Removes all of the alterations which name matches the provided one.
     * @param {string} name the name of alterations to remove
     */
    removeAllBonusesWithName(name) {
        this.bonuses.filter(x => x.origin.name === name).forEach(bo => {
            this.alter({
                uid: bo.stat.uid,
                action: Data.AlterAction.REMOVE
            });
        });
    }

    /**
     * Removes all of the Battle Effects (Skill effects, Stun, Guard, ActiveEffects...) from this NPC.
     */
    cleanAllBattleEffects() {
        if(this.isStunned) this.removeStun();
        if(this.isGuarded) this.removeGuarded();
        if(this.isGuarding) this.removeGuarding();
        this.shield = 0;

        this.activeEffects.forEach(ae => {
            ae.effects.forEach(eff => {
                if(eff.type === Data.StatType.PASSIVE && !isShieldEffect(eff) && !isBleedingOrPoisoning(eff) && !isBaseStatChange(eff, true) && !isStunOrGuardRelatedEffect(eff) && !isMovementEffect(eff.effect)) {
                    console.log('Attempting to remove ' + eff.effect + ' from ' + this.name);
                    this.alter({action: Data.AlterAction.REMOVE, uid: eff.uid});
                }
            });
        });
        this.activeEffects = [];
    }

    /**
     * Kills this NPC.
     */
    kill() {
        // Just to make sure
        this.health = 0;

        // Remove the Guarding effects from other affected NPCs
        this.activeEffects.forEach(ae => {
            if(ae.originObject?.variables?.guarding == this) {
                // Only remove the Guarded effect - keep the other effects from the same Skill
                const obj = ae.originObject.variables.guarded.activeEffects.find(x => x.name === ae.name);
                if(obj) {
                    removeFromArray(obj.effects, obj.effects.find(x => x.effect === Data.Effect.GUARDED));
                    if(obj.effects.length === 0) ae.originObject.variables.guarded.removeActiveEffect(ae.name);
                }
                ae.originObject.variables.guarded.removeGuarded();
            }
        })
        // Remove all effects from that NPC
        this.cleanAllBattleEffects();
    }
}
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

        this.skills = [];
        skills.forEach(skill => {
            this.addSkill(skill);
        });
    }

    /**
     * Adds the Stat's data to the NPC's data.
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
                ERROR('Tried to add an unknown effect.');
                return;
        }
        console.log(this.name + ": " + effect.getValue()*factor + " " + effect.effect);
    }

    /**
     * Runs the triggers which type matches the provided TriggerType value. 
     * @param {Data.TriggerType} type the type of trigger that must be fired
     */
    runTriggers(type) {
        this.triggers.forEach(trigger => {
            if(trigger.type === type) trigger.checker() && trigger.behavior();
        })
    }

    /**
     * Adds the specified number to this NPC's shield. Cannot exceed maxHealth.
     * @param {number} amount the amount of shield to add
     */
    addShield(amount) {
        this.shield = Math.min(this.maxHealth, this.shield+amount);
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

        phys_damage = Math.max(0, phys - this.resilience);
        magi_damage = Math.max(0, magi - this.warding);

        damage = phys_damage + magi_damage + crit;
        damage -= Math.round(damage * this.protection / 100);

        this.removeBaseStat(new Stat({effect: Data.Effect.HEALTH, theorical: damage}));

        console.log(this.name + ' received ' + damage + ' damage (' + phys + ' phys, effective ' + phys_damage + ' | ' + magi + ' magi, effective ' + magi_damage + ' | ' + crit + ' critical -> Total ' + damage + ' with ' + this.protection + '% reduction');
    }

    receiveBleedOrPoison(eff) {
        console.log('---TRIGGERED: ' + eff.effect);
        this.removeBaseStat(new Stat({effect: Data.Effect.HEALTH, theorical: eff.getValue()}));
        if(eff.effect === Data.Effect.BLIGHT_CURABLE || eff.effect === Data.Effect.BLIGHT_INCURABLE) {
            this.removeBaseStat(new Stat({effect: Data.Effect.MANA, theorical: eff.getValue()}));
        } else if(eff.effect === Data.Effect.BLEEDING_CURABLE || eff.effect === Data.Effect.BLEEDING_INCURABLE) {
            this.removeBaseStat(new Stat({effect: Data.Effect.STAMINA, theorical: eff.getValue()}));
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
            damage = (eff.isPercentage ? this.maxHealth * Math.abs(eff.getValue()) / 100 : Math.abs(eff.getValue()));
            if(this.shield > 0) {
                if(this.shield <= this.damage) {
                    removeShield = true;
                    this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.TURQUOISE + '">- ' + this.shield + '</p>'));
                } else this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.TURQUOISE + '">- ' + Math.round(damage) + '</p>'));
                damage = Math.round(damage) - this.shield;
                
                if(removeShield) this.shield = 0;
            }
            if(damage > 0) this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.RED + '">- ' + Math.round(damage) + '</p>'));
            this.health = Math.max(0, this.health - Math.round(damage));
        } else if(eff.effect === Data.Effect.STAMINA) {
            damage = (eff.isPercentage ? this.maxStamina * Math.abs(eff.getValue()) / 100 : Math.abs(eff.getValue()));
            if(damage > 0) this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.GREEN + '">-' + Math.round(damage) + '</p>'));
            this.stamina = Math.max(0, this.stamina - Math.round(damage));
        } else if(eff.effect === Data.Effect.MANA) {
            damage = (eff.isPercentage ? this.maxMana * Math.abs(eff.getValue()) / 100 : Math.abs(eff.getValue()));
            if(damage > 0) this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.BLUE + '">-' + Math.round(damage) + '</p>'));
            this.mana = Math.max(0, this.mana - Math.round(damage));
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
            }

            this.health = Math.min(this.maxHealth, this.health + Math.round(amount));
            if(amount > 0) this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.RED + '">+ ' + Math.round(amount) + '</p>'));
        } else if(eff.effect === Data.Effect.MANA) {
            if(eff.isPercentage) amount = this.maxMana * eff.getValue() / 100;
            else amount = eff.getValue();

            this.mana = Math.min(this.maxMana, this.mana + Math.round(amount));
            if(amount > 0) this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.BLUE + '">+ ' + Math.round(amount) + '</p>'));
        } else if(eff.effect === Data.Effect.STAMINA) {
            if(eff.isPercentage) amount = this.maxStamina * eff.getValue() / 100;
            else amount = eff.getValue();

            this.stamina = Math.min(this.maxStamina, this.stamina + Math.round(amount));
            if(amount > 0) this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.GREEN + '">+ ' + Math.round(amount) + '</p>'));
        }
        console.log('ADDING ' + Math.round(amount) + ' ' + eff.effect + ' TO ' + this.name);
    }

    // TODO: code these.
    increaseBaseStat(eff) {

    }
    decreaseBaseStat(eff) {

    }

    applyStun() {
        this.isStunned = true;
        addSpecialEffect(this.getBattleFormationStringId(), Data.Effect.STUN);
    }
    removeStun() {
        this.isStunned = false;
        removeSpecialEffect(this.getBattleFormationStringId(), Data.Effect.STUN);
    }

    applyBlocking() {
        this.isBlocking = true;
        //addSpecialEffect...
    }
    removeBlocking() {
        this.isBlocking = false;
        //addSpecialEffect...
    }

    applySelfRegenerationEffects() {
        this.regenHealth > 0 && this.addBaseStat(new Stat({effect: Data.Effect.HEALTH, theorical: this.regenHealth, isPercentage: true}));
        this.regenMana > 0 && this.addBaseStat(new Stat({effect: Data.Effect.MANA, theorical: this.regenMana, isPercentage: true}));
        this.regenStamina > 0 && this.addBaseStat(new Stat({effect: Data.Effect.STAMINA, theorical: this.regenStamina, isPercentage: true}));
    }

    /**
     * Adds the provided ActiveEffect to this NPC's active effects list.
     * @param {ActiveEffect} ae 
     */
    addActiveEffect(ae) {
        this.activeEffects.push(ae);
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
     * @param {Data.Effect} eff HEALTH or MANA or STAMINA or MAXHEALTH or MAXMANA or MAXSTAMINA
     */
    alterBaseStat(eff, originUser = false) {
        if(eff.effect === Data.Effect.HEALTH || eff.effect === Data.Effect.MANA || eff.effect === Data.Effect.STAMINA) {
            if(eff.getValue() > 0) this.addBaseStat(eff, originUser);
            else this.removeBaseStat(eff);
        } else if(eff.effect === Data.Effect.MAXHEALTH || eff.effect === Data.Effect.MAXMANA || eff.effect === Data.Effect.MAXSTAMINA) {
            if(eff.getValue() > 0) this.increaseBaseStat(eff);
            else this.decreaseBaseStat(eff);
        }
    }

    /**
     * Applies each Stat stored in "effects" parameter to this NPC, also adding an ActiveEffect?
     * @param {Skill} skill 
     * @param {NPC} originUser 
     * @param {Stat[]} effects 
     * @param {boolean} critical 
     */
    applyEffects(skill, originUser, effects, critical = false) {
        console.log(this.name);
        console.log(effects);
        effects.forEach(eff => {
            if(eff.delay === 0) {
                if(isBaseStatChange(eff)) this.alterBaseStat(eff, originUser);
                else if(eff.effect === Data.Effect.STUN) this.applyStun()
                else if(eff.effect === Data.Effect.GUARDED) this.applyGuarded(eff);
                else if(eff.effect === Data.Effect.GUARDING) this.applyGuarding(eff);
                else this.addEffect(eff);
            }
        });
        for(let i = effects.length - 1; i >= 0; i--) {
            if(effects[i].duration === 0) removeFromArray(effects, effects[i]);
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
                    else this.addEffect(eff)
                }
            });

            for(let j = ae.effects.length - 1; j >= 0; j--) {
                let eff = ae.effects[j];
                console.log(eff);
                if(eff.duration === 1) {
                    eff.duration = 0;
                    removeFromArray(ae.effects, eff);
                    if(eff.effect === Data.Effect.STUN) this.removeStun();
                    if(eff.effect === Data.Effect.GUARDED) this.removeGuarded();
                    if(eff.effect === Data.Effect.GUARDING) this.removeGuarding();
                    if(eff.type === Data.StatType.PASSIVE && eff.effect !== Data.Effect.STUN && eff.effect !== Data.Effect.GUARDED && eff.effect !== Data.Effect.GUARDING) this.addEffect(eff, true);
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
}
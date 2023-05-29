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

        this.critEffects = critEffects;
        this.variables = variables;
        this.triggers = triggers;

        this.activeEffects = [];

        this.popupsQueue = [];
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
                } else this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.TURQUOISE + '">- ' + damage + '</p>'));
                damage = damage - this.shield;
                
                if(removeShield) this.shield = 0;
            }
            if(damage > 0) this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.RED + '">- ' + damage + '</p>'));
            this.health = Math.max(0, this.health - damage);
        } else if(eff.effect === Data.Effect.STAMINA) {
            damage = (eff.isPercentage ? this.maxStamina * Math.abs(eff.getValue()) / 100 : Math.abs(eff.getValue()));
            if(damage > 0) this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.GREEN + '">-' + damage + '</p>'));
            this.stamina = Math.max(0, this.stamina - damage);
        } else if(eff.effect === Data.Effect.MANA) {
            damage = (eff.isPercentage ? this.maxMana * Math.abs(eff.getValue()) / 100 : Math.abs(eff.getValue()));
            if(damage > 0) this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.BLUE + '">-' + damage + '</p>'));
            this.mana = Math.max(0, this.mana - damage);
        }
        console.log('REMOVING ' + damage + ' ' + eff.effect + ' FROM ' + this.name);
    }

    /**
     * Adds the provided effect's value to either Health, Mana, or Stamina.
     * @param {Stat} eff the effect to add
     */
    addBaseStat(eff) {
        let amount = 0;
        if(eff.effect === Data.Effect.HEALTH) {
            if(eff.isPercentage) amount = this.maxHealth * eff.getValue() / 100;
            else amount = eff.getValue();

            amount += amount * this.modifHealRecv / 100;

            this.health = Math.min(this.maxHealth, this.health + amount);
            if(amount > 0) this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.RED + '">+ ' + amount + '</p>'));
        } else if(eff.effect === Data.Effect.MANA) {
            if(eff.isPercentage) amount = this.maxMana * eff.getValue() / 100;
            else amount = eff.getValue();

            this.mana = Math.min(this.maxMana, this.mana + amount);
            if(amount > 0) this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.BLUE + '">+ ' + amount + '</p>'));
        } else if(eff.effect === Data.Effect.STAMINA) {
            if(eff.isPercentage) amount = this.maxStamina * eff.getValue() / 100;
            else amount = eff.getValue();

            this.stamina = Math.min(this.maxStamina, this.stamina + amount);
            if(amount > 0) this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.GREEN + '">-' + damage + '</p>'));
        }
        console.log('ADDING ' + amount + ' ' + eff.effect + ' TO ' + this.name);
    }

    // TODO: code these.
    increaseBaseStat(eff) {

    }
    decreaseBaseStat(eff) {

    }

    /**
     * Adds the provided ActiveEffect to this NPC's active effects list.
     * @param {ActiveEffect} ae 
     */
    addActiveEffect(ae) {
        this.activeEffects.push(ae);
    }

    addBattlePopup(popup) {
        this.popupsQueue.push(popup);
    }

    executePopups() {
        this.nextPopup();
    }

    nextPopup() {
        const pos = this.getBattleAnimationStringId();
        if(this.popupsQueue.length > 0) this.executePopup(pos, this.popupsQueue[0]);
        else game.currentBattle.addEndTurnCounter();
    }

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

    getSelfPosInBattle() {
        const battle = game.currentBattle;
        if(battle.allies[0] === this) return Data.FormationPosition.BACK;
        if(battle.allies[1] === this) return Data.FormationPosition.MIDDLE;
        if(battle.allies[2] === this) return Data.FormationPosition.FRONT;
        if(battle.enemies[0] === this) return Data.FormationPosition.BACK;
        if(battle.enemies[1] === this) return Data.FormationPosition.MIDDLE;
        if(battle.enemies[2] === this) return Data.FormationPosition.FRONT;
    }

    useSkill(skill) {
        this.removeBaseStat(new Stat({effect: Data.Effect.MANA, theorical: skill.manaCost}));
        this.runTriggers(Data.TriggerType.ON_USE_SKILL);
    }

    alterBaseStat(eff) {
        if(eff.effect === Data.Effect.HEALTH || eff.effect === Data.Effect.MANA || eff.effect === Data.Effect.STAMINA) {
            if(eff.getValue() > 0) this.addBaseStat(eff);
            else this.removeBaseStat(eff);
        } else if(eff.effect === Data.Effect.MAXHEALTH || eff.effect === Data.Effect.MAXMANA || eff.effect === Data.Effect.MAXSTAMINA) {
            if(eff.getValue() > 0) this.increaseBaseStat(eff);
            else this.decreaseBaseStat(eff);
        }
    }

    applyEffects(skill, originUser, effects, critical = false) {
        console.log(this.name);
        console.log(effects);
        effects.forEach(eff => {
            if(eff.delay === 0) {
                if(isBaseStatChange(eff)) this.alterBaseStat(eff)
                else this.addEffect(eff);
            }
        });
        for(let i = effects.length - 1; i >= 0; i--) {
            console.log('occurrence:'+i);
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
                    else this.addEffect(eff)
                }
            });

            for(let j = ae.effects.length - 1; j >= 0; j--) {
                let eff = ae.effects[j];
                console.log(eff);
                if(eff.duration === 1) {
                    eff.duration = 0;
                    removeFromArray(ae.effects, eff);
                    if(eff.type === Data.StatType.PASSIVE) this.addEffect(eff, true);
                    console.log('Removed: ' + eff.effect);
                } else {
                    eff.duration -= 1;
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
}
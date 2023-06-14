class Battle {
    constructor(allies, enemies) {
        this.allies = allies;
        this.enemies = enemies;

        this.order = null;
        this.currentPlay = null;
        this.round = 0;
        this.action = null;
        this.selectedWeapon = null;
        this.selectedSkill = null;
        this.target = null;
        this.moveTarget = null;
        this.targetTracker = 0;
        this.endturnCounter = 0;
        this.movementQueue = [];
        this.beginTurnPopups = false;

        this.params = null;
        this.resetAttackParams();
    }

    /**
     * Generates the battle order based on the speed of each NPC. This method is supposed to be called at the beginning of each round.
     */
    generateOrder() {
        this.order = this.allies.concat(this.enemies);
        this.order.sort((a, b) => b.speed - a.speed);
        console.log(this.order);
    }

    /**
     * Moves the currently playing NPC to the next one in order. If the end of the order is reached, loops again and ends the current round.
     */
    nextInOrder() {
        if(this.currentPlay) {
            if((this.order.indexOf(this.currentPlay) + 1) < this.order.length) {
                this.currentPlay = this.order[this.order.indexOf(this.currentPlay) + 1];
            } else {
                this.currentPlay = this.order[0];
                // start a new round
                this.endRound();
                return true;
            }
        } else {
            this.currentPlay = this.order[0];
        }
    }

    /**
     * Returns the next NPC in the battle play order.
     * @returns {NPC} the next NPC in the play order
     */
    getNextInOrder() {
        if(this.currentPlay) {
            if((this.order.indexOf(this.currentPlay) + 1) < this.order.length) {
                return this.order[this.order.indexOf(this.currentPlay) + 1];
            } else {
                return this.order[0];
            }
        } else {
            return this.order[0];
        }
    }

    /**
     * Starts this battle.
     */
    start() {
        this.generateOrder();
        this.runTriggersOnAllies(Data.TriggerType.ON_BATTLE_START);
        this.runTriggersOnEnemies(Data.TriggerType.ON_BATTLE_START);
        this.beginRound();
        drawBattleScreen();
    }

    /**
     * Ends this battle.
     */
    end() {
        console.log("Battle ends!");
        this.runTriggersOnAll(Data.TriggerType.ON_BATTLE_END);
        game.currentBattle = null;
    }

    /**
     * Returns whether all of the allies are dead or if all of the enemies are dead.
     * @returns {boolean} whether the battle is over
     */
    isBattleOver() {
        return (
            (this.allies[0].health == 0
            && this.allies[1].health == 0
            && this.allies[2].health == 0)
            ||
            (this.enemies[0].health == 0
            && this.enemies[1].health == 0
            && this.enemies[2].health == 0)
        );
    }

    /**
     * Returns whether the currently playing NPC is an enemy.
     * @returns {boolean} whether the currently playing NPC is an enemy
     */
    isEnemyPlaying() {
        return arrayContains(this.enemies, this.currentPlay);
    }

    /**
     * Begins a new turn.
     */
    beginTurn() {
        if(this.nextInOrder()) return; // IF A NEW ROUND IS STARTING, CANCEL THE FIRST TURN OR IT WILL BE PLAYED TWICE BY THE SAME FIGHTER.
        console.log("Currently playing: " + this.currentPlay.name);
        this.currentPlay.runTriggers(Data.TriggerType.ON_TURN_BEGIN);
        this.currentPlay.executeActiveEffects();
        this.currentPlay.reduceSkillsCooldown();
        this.currentPlay.applySelfRegenerationEffects();
        drawBattleScreen();
        this.beginTurnPopups = false;
        this.runPopups();
        this.resetEndTurnCounter();
        // SKIP ENEMIES
        if(this.currentPlay.isStunned) this.endTurn();
        if(this.isEnemyPlaying()) this.endTurn();
        if(this.isBattleOver()) this.end();
    }

    /**
     * Ends the current turn.
     */
    endTurn() {
        this.currentPlay.runTriggers(Data.TriggerType.ON_TURN_END);
        this.action = null;
        this.selectedWeapon = null;
        this.selectedSkill = null;
        this.target = [];
        this.movementQueue = [];
        this.resetEndTurnCounter();
        drawBattleScreen();
        this.beginTurn();
    }

    /**
     * Adds an end turn counter to this battle. 
     */
    addEndTurnCounter() {
        this.endturnCounter += 1;
        if(this.endturnCounter >= this.order.length) {
            this.executeMovements();
            if(!this.beginTurnPopups) {
                this.beginTurnPopups = true;
                return;
            }
            if(this.movementQueue.length !== 0) setTimeout(() => {this.endTurn();}, 300);
            else this.endTurn();
        }
    }

    /**
     * Resets the battle's end turn counter.
     */
    resetEndTurnCounter() {
        this.endturnCounter = 0;
    }

    /**
     * Begins a new round, regenerates play order and runs ON_ROUND_BEGINS triggers.
     */
    beginRound() {
        this.generateOrder();
        this.runTriggersOnAll(Data.TriggerType.ON_ROUND_BEGIN);
        this.round++;
        console.log("New round: " + this.round);
        this.beginTurn();
    }

    /**
     * Runs ON_ROUND_END triggers and begins a new round.
     */
    endRound() {
        this.runTriggersOnAll(Data.TriggerType.ON_ROUND_END);
        this.currentPlay = null;
        this.beginRound();
    }

    /**
     * Runs triggers which type matches the provided TriggerType on all allies.
     * @param {Data.TriggerType} type the type of Trigger
     */
    runTriggersOnAllies(type) {
        this.allies.forEach(ally => {
            ally.runTriggers(type);
        });
    }
    /**
     * Runs triggers which type matches the provided TriggerType on all enemies.
     * @param {Data.TriggerType} type the type of Trigger
     */
    runTriggersOnEnemies(type) {
        this.enemies.forEach(enemy => {
            enemy.runTriggers(type);
        });
    }

    /**
     * Runs triggers which type matches the provided TriggerType on the current playing Strider.
     * @param {Data.TriggerType} type the type of Trigger
     */
    runTriggersOnCurrent(type) {
        this.currentPlay.runTriggers(type);
    }

    /**
     * Runs triggers which type matches the provided TriggerType on the targeted NPCs.
     * @param {Data.TriggerType} type the type of Trigger
     */
    runTriggersOnTargets(type) {
        this.target.forEach(tar => {
            tar.runTriggers(type);
        });
    }

    /**
     * Runs triggers which type matches the provided TriggerType on all allies and enemies.
     * @param {Data.TriggerType} type the type of Trigger
     */
    runTriggersOnAll(type) {
        this.order.forEach(single => {
            single.runTriggers(type);
        });
    }

    /**
     * Resets the battle's attack params.
     */
    resetAttackParams() {
        this.params = {
            phys_damage: 0,
            magi_damage: 0,
            crit_damage: 0,
            success_accuracy: false,
            success_dodge: false,
            critical: false
        };
    }

    /**
     * Resets the battle's target tracker.
     */
    resetTargetTracker() {
        this.targetTracker = 0;
    }

    /**
     * Adds the damage from Stun/Bleed/Poison modifiers of the currently playing NPC to this skill's current attack params. 
     * It is possible to skip crit damage (for Skills).
     * @param {NPC} target the target to retrieve info from
     * @param {boolean} skipCrit skip crit damage addition?
     */
    addStunPoisonBleedModifiers(target, skipCrit = false) {
        if(target.isStunned) {
            this.params.phys_damage += Math.round(this.params.phys_damage * this.currentPlay.modifDmgStun/100);
            this.params.magi_damage += Math.round(this.params.magi_damage * this.currentPlay.modifDmgStun/100);
            if(!skipCrit) this.params.crit_damage += Math.round(this.params.crit_damage * this.currentPlay.modifDmgStun/100);
        }
        if(target.hasEffect(Data.Effect.BLIGHT_CURABLE) || target.hasEffect(Data.Effect.BLIGHT_INCURABLE)) {
            this.params.phys_damage += Math.round(this.params.phys_damage * this.currentPlay.modifDmgPoison/100);
            this.params.magi_damage += Math.round(this.params.magi_damage * this.currentPlay.modifDmgPoison/100);
            if(!skipCrit) this.params.crit_damage += Math.round(this.params.crit_damage * this.currentPlay.modifDmgPoison/100);
        }
        if(target.hasEffect(Data.Effect.BLEEDING_CURABLE) || target.hasEffect(Data.Effect.BLEEDING_INCURABLE)) {
            this.params.phys_damage += Math.round(this.params.phys_damage * this.currentPlay.modifDmgBleed/100);
            this.params.magi_damage += Math.round(this.params.magi_damage * this.currentPlay.modifDmgBleed/100);
            if(!skipCrit) this.params.crit_damage += Math.round(this.params.crit_damage * this.currentPlay.modifDmgBleed/100);
        }
    }

    /**
     * Computes attack params for a weapon attack.
     * @param {NPC} target the target
     */
    computeAttackParams(target) {
        this.resetAttackParams();
        const weapon = this.selectedWeapon;
        const current = this.currentPlay;

        let accuracyModifiers = 0;
        let critModifiers = 0;

        if(target.isStunned) {
            accuracyModifiers += current.modifAccuracyStun;
            critModifiers += current.modifCritStun;
        }
        if(target.hasEffect(Data.Effect.BLEEDING_CURABLE) || target.hasEffect(Data.Effect.BLEEDING_INCURABLE)) {
            accuracyModifiers += current.modifAccuracyBleed;
            critModifiers += current.modifCritBleed;
        }
        if(target.hasEffect(Data.Effect.BLIGHT_CURABLE) || target.hasEffect(Data.Effect.BLIGHT_INCURABLE)) {
            accuracyModifiers += current.modifAccuracyPoison;
            critModifiers += current.modifCritPoison;
        }

        if(Math.random() * 100 < current.accuracy + accuracyModifiers) {
            // Accuracy test passed
            this.params.success_accuracy = true;
            if(Math.random() * 100 > target.dodge) {
                // Target is hit!
                this.params.phys_damage = weapon.getSharpness();
                this.params.magi_damage = weapon.getWithering();

                if(Math.random() * 100 < weapon.crit_luk + critModifiers) {
                    // Critical blow! Add critical damage
                    this.params.crit_damage += weapon.crit_dmg;
                    this.params.critical = true;
                }

                this.params.phys_damage += (Math.round(this.params.phys_damage * current.modifDmgWeapon/100) + Math.round(this.params.phys_damage * current.modifDmgTotal/100));
                this.params.magi_damage += (Math.round(this.params.magi_damage * current.modifDmgWeapon/100) + Math.round(this.params.magi_damage * current.modifDmgTotal/100));
                this.params.crit_damage += (Math.round(this.params.crit_damage * current.modifDmgWeapon/100) + Math.round(this.params.crit_damage * current.modifDmgTotal/100));

                this.addStunPoisonBleedModifiers(target);
            } else {
                // Dodged
                this.params.success_dodge = true;
            }
        } else {
            // Missed
        }
    }

    /**
     * Computes the attack params based on the selected skill and the provided target. 
     * @param {NPC} target the target
     * @param {boolean} forceCrit forces a critical strike (default: false)
     */
    computeSkillParams(target, forceCrit = false) {
        this.resetAttackParams();
        const skill = this.selectedSkill;
        const accessor = skill.level;
        const modifier = (skill.type === Data.SkillType.FRIENDLY) ? 9999 : 0;
        const current = this.currentPlay;

        let accuracyModifiers = 0;
        let critModifiers = 0;

        if(target.isStunned) {
            accuracyModifiers += current.modifAccuracyStun;
            critModifiers += current.modifCritStun;
        }
        if(target.hasEffect(Data.Effect.BLEEDING_CURABLE) || target.hasEffect(Data.Effect.BLEEDING_INCURABLE)) {
            accuracyModifiers += current.modifAccuracyBleed;
            critModifiers += current.modifCritBleed;
        }
        if(target.hasEffect(Data.Effect.BLIGHT_CURABLE) || target.hasEffect(Data.Effect.BLIGHT_INCURABLE)) {
            accuracyModifiers += current.modifAccuracyPoison;
            critModifiers += current.modifCritPoison;
        }

        if(Math.random()*200 < (current.accuracy + skill.accMultiplier + current.modifAccuracySkill + accuracyModifiers + modifier)) {
            // Accuracy test passed
            this.params.success_accuracy = true;
            if(Math.random() * 100 > target.dodge - modifier) {
                // Target is hit!
                switch(skill.dmgType) {
                    case Data.SkillDamageType.PHYSICAL:
                        this.params.phys_damage = Math.round((skill.dmgMultiplier / 100) * current.might);
                        break;
                    case Data.SkillDamageType.MAGICAL:
                        this.params.magi_damage = Math.round((skill.dmgMultiplier / 100) * current.spirit);
                        break;
                    case Data.SkillDamageType.BOTH:
                        this.params.phys_damage = Math.round((skill.dmgMultiplier / 100) * current.might);
                        this.params.magi_damage = Math.round((skill.dmgMultiplier / 100) * current.spirit);
                        break;
                }
                if(Math.random() * 100 < (skill.criMultiplier + critModifiers) || forceCrit) {
                    // Critical blow! Add critical effects
                    this.params.critical = true;
                }

                this.params.phys_damage += (Math.round(this.params.phys_damage * current.modifDmgSkill/100) + Math.round(this.params.phys_damage * current.modifDmgTotal/100));
                this.params.magi_damage += (Math.round(this.params.magi_damage * current.modifDmgSkill/100) + Math.round(this.params.magi_damage * current.modifDmgTotal/100));
                
                this.addStunPoisonBleedModifiers(target, true);
            } else {
                // Dodged
                this.params.success_dodge = true;
            }
        } else {
            // Missed
        }
    }

    /**
     * Executes a Weapon attack based on the selected weapon, current player and target(s).
     */
    executeAttack() {
        const weapon = this.selectedWeapon;

        this.runTriggersOnCurrent(Data.TriggerType.ON_ATTACK);
        this.target.forEach(tar => {
            this.computeAttackParams(tar);
            let params = this.params;
            if(params.success_accuracy && !params.success_dodge) {
                // Successful hit
                this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_DAMAGE);
                tar.runTriggers(Data.TriggerType.ON_RECV_DAMAGE);

                tar.receiveDamage(params);
                this.applyDamageReflection(params, tar);
                console.log('Successful hit!');

                if(params.critical) {
                    console.log('Critical blow!');
                    //this.currentPlay.addCriticalEffects();
                    this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_CRITICAL);
                    tar.runTriggers(Data.TriggerType.ON_RECV_CRITICAL);
                }
                // TODO: ADD BLEEDING AND POISONING

                if(weapon.bleed[0] > 0 && (weapon.bleed[0] - tar.resBleed[0]) > 0) {
                    tar.addActiveEffect(new ActiveEffect({
                        name: "Bleeding", 
                        originUser: this.currentPlay, 
                        originObject: weapon, 
                        effects: [
                            new Stat({
                                effect: weapon.bleed[2] ? Data.Effect.BLEEDING_CURABLE : Data.Effect.BLEEDING_INCURABLE,
                                theorical: weapon.bleed[0] - tar.resBleed[0],
                                duration: weapon.bleed[1],
                                type: Data.StatType.ACTIVE
                            })
                        ],
                        style: {
                            color: Data.Color.RED,
                            bold: true,
                            italic: false
                        }
                    }));
                }
                if(weapon.poison[0] > 0 && (weapon.poison[0] - tar.resPoison[0]) > 0) {
                    tar.addActiveEffect(new ActiveEffect({
                        name: "Poisoning", 
                        originUser: this.currentPlay, 
                        originObject: weapon, 
                        effects: [
                            new Stat({
                                effect: weapon.poison[2] ? Data.Effect.BLIGHT_CURABLE : Data.Effect.BLIGHT_INCURABLE,
                                theorical: weapon.poison[0] - tar.resPoison[0],
                                duration: weapon.poison[1],
                                type: Data.StatType.ACTIVE
                            })
                        ],
                        style: {
                            color: Data.Color.GREEN,
                            bold: true,
                            italic: false
                        }
                    }));
                }
            } else if(!params.success_accuracy) {
                // Missed
                console.log('Missed!');
                this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_MISSED);
                tar.runTriggers(Data.TriggerType.ON_RECV_MISSED);
                tar.addBattlePopup(new BattlePopup(0, '<p>Missed!</p>'));
            } else if(params.success_dodge) {
                // Dodged
                console.log('Dodged!');
                this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_DODGED);
                tar.runTriggers(Data.TriggerType.ON_RECV_DODGED);
                tar.addBattlePopup(new BattlePopup(0, '<p>Dodged!</p>'));
            }
        });

        this.currentPlay.useWeapon(this.selectedWeapon);
        
        this.runPopups();
    }

    /**
     * Applies damage reflection on the target.
     * @param {object} params the attack params
     * @param {NPC} target the target
     */
    applyDamageReflection(params, target) {
        const total = params.phys_damage + params.magi_damage + params.crit_damage;
        const dr = target.damageReflection;
        let final = 0;

        if(total <= dr) final = total;
        else final = dr;

        if(final > 0) this.currentPlay.removeBaseStat(new Stat({effect: Data.Effect.HEALTH, theorical: final}));
    }

    /**
     * Executes all of the effects and damage of the selected Skill on the selected target(s).
     */
    executeSkill() {
        const skill = this.selectedSkill;
        const current = this.currentPlay;
        let effects = [];
        let accessor = '';

        this.computeSkillParams(this.target[0]);
        const isCrit = this.params.critical;

        this.runTriggersOnCurrent(Data.TriggerType.ON_ATTACK);
        this.target.forEach(tar => {
            this.computeSkillParams(tar, isCrit);
            let params = this.params;
            if(params.success_accuracy && !params.success_dodge) {
                // Successful hit
                console.log('Successful hit!');
                if(params.phys_damage > 0 || params.magi_damage > 0) {
                    this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_DAMAGE);
                    tar.runTriggers(Data.TriggerType.ON_RECV_DAMAGE);
                    tar.receiveDamage(params);
                    this.applyDamageReflection(params, tar);
                }

                // Handle critical triggers and critical effects
                accessor = (params.critical ? 'critical' : 'regular');
                if(params.critical) {
                    console.log('Critical blow!');
                    //this.currentPlay.addCriticalEffects();
                    this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_CRITICAL);
                    tar.runTriggers(Data.TriggerType.ON_RECV_CRITICAL);
                }

                // Applying effects
                effects = [];
                if(skill.effectsAllies || skill.effectsEnemies) {
                    if(skill.effectsAllies && arrayContains(this.allies, tar)) {
                        skill.effectsAllies[skill.level][accessor].forEach(eff => {
                            if(!isMovementEffect(eff.effect)) {
                                let newEff = Entity.clone(eff);
                                newEff.fix();
                                effects.push(newEff);
                            }
                        });
                    }
                    if(skill.effectsEnemies && arrayContains(this.enemies, tar)) {
                        skill.effectsEnemies[skill.level][accessor].forEach(eff => {
                            if(!isMovementEffect(eff.effect)) {
                                if(eff.effect === Data.Effect.STUN) {
                                    if(Math.random() * 100 > current.modifChanceStun + eff.chance - tar.resStun) {
                                        tar.addBattlePopup(new BattlePopup(0, '<p>Resisted!</p>'));
                                        return;
                                    }
                                }
                                let newEff = Entity.clone(eff);
                                newEff.fix();
                                effects.push(newEff);
                            } else {
                                // Moving
                                if(Math.random() * 100 < current.modifChanceMove + eff.chance - tar.resMove) this.applyEnemyMovement(eff, tar);
                                else tar.addBattlePopup(new BattlePopup(0, '<p>Resisted!</p>'));
                            }
                        });                         
                    }
                    tar.addBattlePopup(new BattlePopup(0, '<div class="popupIcon" style="background-image: url(\'css/img/skills/' + current.name.toLowerCase() + skill.icon + '.png\');"></div>'));
                }

                tar.applyEffects(skill, current, effects, params.critical);
            } else if(!params.success_accuracy) {
                // Missed
                console.log('Missed!');
                this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_MISSED);
                tar.runTriggers(Data.TriggerType.ON_RECV_MISSED);
                tar.addBattlePopup(new BattlePopup(0, '<p>Missed!</p>'));
            } else if(params.success_dodge) {
                // Dodged
                console.log('Dodged!');
                this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_DODGED);
                tar.runTriggers(Data.TriggerType.ON_RECV_DODGED);
                tar.addBattlePopup(new BattlePopup(0, '<p>Dodged!</p>'));
            }
        });
        effects = [];

        // CASTER EFFECTS
        if(skill.effectsCaster) {
            effects = [];
            accessor = (isCrit ? 'critical' : 'regular');
            skill.effectsCaster[skill.level][accessor].forEach(eff => {
                if(!isMovementEffect(eff.effect)) {
                    if(eff.effect === Data.Effect.STUN) {
                        if(Math.random() * 100 > current.modifChanceStun + eff.chance - current.resStun) {
                            current.addBattlePopup(new BattlePopup(0, '<p>Resisted!</p>'));
                            return;
                        }
                    }
                    let newEff = Entity.clone(eff);
                    newEff.fix();
                    effects.push(newEff);
                }
                // Moving
                this.applyCasterMovement(eff);
            });
            current.addBattlePopup(new BattlePopup(0, '<div class="popupIcon" style="background-image: url(\'css/img/skills/' + current.name.toLowerCase() + skill.icon + '.png\');"></div>'));
        }

        if(effects) current.applyEffects(skill, current, effects, isCrit);

        current.useSkill(skill);
        this.runPopups();
    }

    /**
     * Applies a movement to the enemy.
     * @param {Skill} skill the Skill to retrieve the movement effect from
     */
    applyEnemyMovement(skill, target) {
        switch(skill.effect) {
            case Data.Effect.PULL_ONE:
                if(target.getSelfPosInBattle() === Data.FormationPosition.MIDDLE) this.movementQueue.push(new BattleMove(target, Data.FormationPosition.FRONT, 'e'));
                else if(target.getSelfPosInBattle() === Data.FormationPosition.BACK) this.movementQueue.push(new BattleMove(target, Data.FormationPosition.MIDDLE, 'e'));
                break;
            case Data.Effect.PULL_TWO:
                this.movementQueue.push(new BattleMove(target, Data.FormationPosition.FRONT, 'e'));
                break;
            case Data.Effect.PUSH_ONE:
                if(target.getSelfPosInBattle() === Data.FormationPosition.FRONT) this.movementQueue.push(new BattleMove(target, Data.FormationPosition.MIDDLE, 'e'));
                else if(target.getSelfPosInBattle() === Data.FormationPosition.MIDDLE) this.movementQueue.push(new BattleMove(target, Data.FormationPosition.BACK, 'e'));
                break;
            case Data.Effect.PUSH_TWO:
                this.movementQueue.push(new BattleMove(target, Data.FormationPosition.BACK, 'e'))
                break;
        }
    }

    /**
     * Applies a movement to the caster.
     * @param {Skill} skill the Skill to retrieve the movement effect from
     */
    applyCasterMovement(skill) {
        const current = this.currentPlay;
        switch(skill.effect) {
            case Data.Effect.BACK_ONE:
                if(current.getSelfPosInBattle() === Data.FormationPosition.FRONT) {
                    this.movementQueue.push(new BattleMove(current, Data.FormationPosition.MIDDLE, 'a'));
                } else if(current.getSelfPosInBattle() === Data.FormationPosition.MIDDLE) {
                    this.movementQueue.push(new BattleMove(current, Data.FormationPosition.BACK, 'a'));
                }
                break;
            case Data.Effect.BACK_TWO:
                this.movementQueue.push(new BattleMove(current, Data.FormationPosition.BACK, 'a'));
                break;
            case Data.Effect.FRONT_ONE:
                if(current.getSelfPosInBattle() === Data.FormationPosition.BACK) {
                    this.movementQueue.push(new BattleMove(current, Data.FormationPosition.MIDDLE, 'a'));
                } else if(current.getSelfPosInBattle() === Data.FormationPosition.MIDDLE) {
                    this.movementQueue.push(new BattleMove(current, Data.FormationPosition.FRONT, 'a'));
                }
                break;
            case Data.Effect.FRONT_TWO:
                this.movementQueue.push(new BattleMove(current, Data.FormationPosition.FRONT, 'a'));
                break;
        } 
    }

    /**
     * Returns the position of the currently playing NPC.
     * @returns {Data.FormationPosition} the currently playing NPC's position
     */
    getCurrentNPCPos() {
        if(this.allies[0] === this.currentPlay) return Data.FormationPosition.BACK;
        if(this.allies[1] === this.currentPlay) return Data.FormationPosition.MIDDLE;
        if(this.allies[2] === this.currentPlay) return Data.FormationPosition.FRONT;
        if(this.enemies[0] === this.currentPlay) return Data.FormationPosition.BACK;
        if(this.enemies[1] === this.currentPlay) return Data.FormationPosition.MIDDLE;
        if(this.enemies[2] === this.currentPlay) return Data.FormationPosition.FRONT;
    }

    /**
     * Executes all of the popups on every fighter in order.
     */
    runPopups() {
        this.order.forEach(el => {
            el.executePopups();
        });
    }

    /**
     * Applies a movement on the provided NPC to the provided target position. 
     * @param {NPC} npc the NPC to move
     * @param {Data.FormationPosition} target the position to move to
     * @param {string} type "a" for ally, "e" for enemy
     */
    move(npc, target, type) {
        // have to handle things differently based on whether it's an enemy or an ally because the positions are processed differently (reversed)
        // type can either be "a" (ally) or "e" (enemy).
        // HOW DOES IT WORK ?
        // first, get the array index of the npc that needs to be moved, and the array index of the targeted position.
        // if both are equal, don't move.
        // if not, move the npc to the targeted position. there are TWO different types of move according to the npc's position and the targeted position.
        // if the npc is in front and wants to move to back position (or vice-versa), then it's a PUSH type. otherwise it's a SWITCH type.
        if(type) {
            const origIndex = type.charAt(0) === "a" ? this.allies.indexOf(npc) : this.enemies.indexOf(npc);
            let targetIndex;
            
            switch(target) {
                case Data.FormationPosition.BACK:
                    targetIndex = 0;
                    break;
                case Data.FormationPosition.MIDDLE:
                    targetIndex = 1;
                    break;
                case Data.FormationPosition.FRONT:
                    targetIndex = 2;
                    break;
            }

            console.log('Origin index: ' + origIndex);
            console.log('Target index: ' + targetIndex);
            if(origIndex == targetIndex) console.log('Original index is equal to target index. Not moving.');
            else {
                console.log('Moving...');
                let temp;
                let arr = type.charAt(0) === "a" ? this.allies : this.enemies;

                if(!this.isSwitchMove(origIndex, targetIndex)) {
                    if(origIndex === 1) {
                        if(targetIndex === 2) {
                            if(type === "a") this.moveAnimation(npc, Data.FormationPosition.MIDDLE, Data.AnimMoveType.RIGHT_ONE);
                            else if(type === "e") this.moveAnimation(npc, Data.FormationPosition.MIDDLE, Data.AnimMoveType.LEFT_ONE);
                        }
                        else if(targetIndex === 0) {
                            if(type === "a") this.moveAnimation(npc, Data.FormationPosition.MIDDLE, Data.AnimMoveType.LEFT_ONE);
                            else if(type === "e") this.moveAnimation(npc, Data.FormationPosition.MIDDLE, Data.AnimMoveType.RIGHT_ONE);
                        }
                    } else if(origIndex === 0) {
                        if(targetIndex === 1) {
                            if(type === "a") this.moveAnimation(npc, Data.FormationPosition.BACK, Data.AnimMoveType.RIGHT_ONE);
                            else if(type === "e") this.moveAnimation(npc, Data.FormationPosition.BACK, Data.AnimMoveType.LEFT_ONE);
                        }
                    } else if(origIndex === 2) {
                        if(targetIndex === 1) {
                            if(type === "a") this.moveAnimation(npc, Data.FormationPosition.FRONT, Data.AnimMoveType.LEFT_ONE);
                            else if(type === "e") this.moveAnimation(npc, Data.FormationPosition.FRONT, Data.AnimMoveType.RIGHT_ONE);
                        }
                    }
                    temp = arr[targetIndex];
                    arr[targetIndex] = arr[origIndex];
                    arr[origIndex] = temp;
                    console.log('Moved ' + npc.name + ' to ' + target + ' (switch type)');
                } else {
                    if(origIndex == 2 && targetIndex == 0) {
                        if(type === "a") this.moveAnimation(npc, Data.FormationPosition.FRONT, Data.AnimMoveType.LEFT_TWO);
                        else if(type === "e") this.moveAnimation(npc, Data.FormationPosition.FRONT, Data.AnimMoveType.RIGHT_TWO);
                        temp = arr[origIndex];
                        arr[2] = arr[1];
                        arr[1] = arr[0];
                        arr[targetIndex] = temp;
                        console.log("Moved " + npc.name + " to " + target + " (push type)");
                    } else if(origIndex == 0 && targetIndex == 2) {
                        if(type === "a") this.moveAnimation(npc, Data.FormationPosition.BACK, Data.AnimMoveType.RIGHT_TWO);
                        else if(type === "e") this.moveAnimation(npc, Data.FormationPosition.BACK, Data.AnimMoveType.LEFT_TWO);
                        temp = arr[origIndex];
                        arr[0] = arr[1];
                        arr[1] = arr[2];
                        arr[targetIndex] = temp;
                        console.log("Moved " + npc.name + " to " + target + " (push type)");
                    } else {
                        throw new Error("Unhandled move case.");
                    }
                }
                type.charAt(0) === 'a' ? this.allies = arr : this.enemies = arr;
            }
        } else {
            throw new Error('No move NPC type was provided.');
        }
    }

    /**
     * Tells whether the provided params correspond to a switch move.
     * @param {number} x the origin index
     * @param {number} y the targeted index
     * @returns {boolean} whether it's a switch move
     */
    isSwitchMove(x, y) {
        return (x == 2 && y == 0) || (x == 0 && y == 2);
    }

    /**
     * Applies a movement animation on the provided NPC, to the provided position.
     * @param {NPC} npc the NPC to move
     * @param {Data.FormationPosition} origin the position to move to
     * @param {Data.AnimMoveType} type the movement type 
     */
    moveAnimation(npc, origin, type) {
        // how does the move animation work ?
        // first, retrieve the position of the current NPC and of the two others (using getOffset());
        // then, fill NPC div with a blank div of the same size, and simultaneously spawn a new div that contains the NPC character, absolutely positioned.
        // apply the moving animations to both
        // refresh the screen.
        let prefix;
        let posNPCA, posNPCB;
        if(arrayContains(this.allies, npc)) {
            prefix = 'gw-h-';
        } else if(arrayContains(this.enemies, npc)) {
            prefix = 'gw-e-';
        }
        switch(npc.getSelfPosInBattle()) {
            case Data.FormationPosition.BACK:
                posNPCA = Data.FormationPosition.MIDDLE;
                posNPCB = Data.FormationPosition.FRONT;
                break;
            case Data.FormationPosition.MIDDLE:
                posNPCA = Data.FormationPosition.FRONT;
                posNPCB = Data.FormationPosition.BACK;
                break;
            case Data.FormationPosition.FRONT:
                posNPCA = Data.FormationPosition.MIDDLE;
                posNPCB = Data.FormationPosition.BACK;
                break;
        }
        const posSelf = npc.getSelfPosInBattle();

        setTimeout(() => {switch(posSelf) {
            case Data.FormationPosition.BACK:
                switch(type) {
                    case Data.AnimMoveType.RIGHT_ONE:
                        domWhat(prefix + origin.toLowerCase()).classList.add('charmove-RightOne');
                        if(posNPCA === Data.FormationPosition.MIDDLE) domWhat(prefix + posNPCA.toLowerCase()).classList.add('charmove-LeftOne');
                        break;
                    case Data.AnimMoveType.RIGHT_TWO:
                        domWhat(prefix + origin.toLowerCase()).classList.add('charmove-RightTwo');
                        domWhat(prefix + posNPCA.toLowerCase()).classList.add('charmove-LeftOne');
                        domWhat(prefix + posNPCB.toLowerCase()).classList.add('charmove-LeftOne');
                        break;
                    case Data.AnimMoveType.LEFT_ONE:
                        domWhat(prefix + origin.toLowerCase()).classList.add('charmove-LeftOne');
                        if(posNPCA === Data.FormationPosition.MIDDLE) domWhat(prefix + posNPCA.toLowerCase()).classList.add('charmove-RightOne');
                        break;
                    case Data.AnimMoveType.LEFT_TWO:
                        domWhat(prefix + origin.toLowerCase()).classList.add('charmove-LeftTwo');
                        domWhat(prefix + posNPCA.toLowerCase()).classList.add('charmove-RightOne');
                        domWhat(prefix + posNPCB.toLowerCase()).classList.add('charmove-RightOne');
                        break;
                    default:
                        throw new Error('Impossible move type.');
                }
                break;
            case Data.FormationPosition.MIDDLE:
                switch(type) {
                    case Data.AnimMoveType.RIGHT_ONE:
                        domWhat(prefix + origin.toLowerCase()).classList.add('charmove-RightOne');
                        if(arrayContains(this.allies, npc)) {
                            if(posNPCA === Data.FormationPosition.FRONT) domWhat(prefix + posNPCA.toLowerCase()).classList.add('charmove-LeftOne');
                            if(posNPCB === Data.FormationPosition.FRONT) domWhat(prefix + posNPCB.toLowerCase()).classList.add('charmove-LeftOne');
                        } else if(arrayContains(this.enemies, npc)) {
                            if(posNPCA === Data.FormationPosition.BACK) domWhat(prefix + posNPCA.toLowerCase()).classList.add('charmove-LeftOne');
                            if(posNPCB === Data.FormationPosition.BACK) domWhat(prefix + posNPCB.toLowerCase()).classList.add('charmove-LeftOne');
                        }
                        break;
                    case Data.AnimMoveType.LEFT_ONE:
                        domWhat(prefix + origin.toLowerCase()).classList.add('charmove-LeftOne');
                        if(arrayContains(this.allies, npc)) {
                            if(posNPCB === Data.FormationPosition.BACK) domWhat(prefix + posNPCB.toLowerCase()).classList.add('charmove-RightOne');
                        } else if(arrayContains(this.enemies, npc)) {
                            if(posNPCA === Data.FormationPosition.FRONT) domWhat(prefix + posNPCA.toLowerCase()).classList.add('charmove-RightOne');
                        }
                        break;
                    default:
                        throw new Error('Impossible move type.');
                }
                break;
            case Data.FormationPosition.FRONT:
                switch(type) {
                    case Data.AnimMoveType.LEFT_ONE:
                        domWhat(prefix + origin.toLowerCase()).classList.add('charmove-LeftOne');
                        if(posNPCA === Data.FormationPosition.MIDDLE) domWhat(prefix + posNPCA.toLowerCase()).classList.add('charmove-RightOne');
                        break;
                    case Data.AnimMoveType.LEFT_TWO:
                        domWhat(prefix + origin.toLowerCase()).classList.add('charmove-LeftTwo');
                        domWhat(prefix + posNPCA.toLowerCase()).classList.add('charmove-RightOne');
                        domWhat(prefix + posNPCB.toLowerCase()).classList.add('charmove-RightOne');
                        break;
                    case Data.AnimMoveType.RIGHT_ONE:
                        domWhat(prefix + origin.toLowerCase()).classList.add('charmove-RightOne');
                        if(posNPCA === Data.FormationPosition.MIDDLE) domWhat(prefix + posNPCA.toLowerCase()).classList.add('charmove-LeftOne');
                        break;
                    case Data.AnimMoveType.RIGHT_TWO:
                        domWhat(prefix + origin.toLowerCase()).classList.add('charmove-RightTwo');
                        domWhat(prefix + posNPCA.toLowerCase()).classList.add('charmove-LeftOne');
                        domWhat(prefix + posNPCB.toLowerCase()).classList.add('charmove-LeftOne');
                        break;
                    default:
                        throw new Error('Impossible move type.');
                }
                break;
            default:
                throw new Error('Impossible move type.');
        }}, 100);
    }

    /**
     * Executes all of the movements in the movement queue.
     */
    executeMovements() {
        this.movementQueue.forEach(mov => {
            this.move(mov.npc, mov.target, mov.type);
        });
    }
}
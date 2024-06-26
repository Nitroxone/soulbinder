/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class Battle {
    constructor(props = {}) {
        this.allies = game.player.formation;
        this.enemies = getValueFromObject(props, "enemies", []);
        this.battleParams = getValueFromObject(props, "battleParams", null);
        this.type = this.battleParams.type;
        this.setEnemies(this.enemies);

        this.order = null;
        this.currentPlay = null;
        this.round = 0;
        this.action = null;
        this.selectedWeapon = null;
        this.selectedSkill = null;
        this.target = [];
        this.moveTarget = null;
        this.targetTracker = 0;
        this.endturnCounter = 0;
        this.movementQueue = [];
        this.beginTurnPopups = false;

        this.loot = [];
        this.earnedEL = 0;

        this.params = null;
        this.resetAttackParams();

        this.chatlogFolder = null;
        this.chatlogRound = null;
        this.chatlogDealtDamage = [];

        this.dealtDamage = 0;
        this.receivedDamage = 0;
        this.healedAmount = 0;

        this.skipBecauseStunned = false;
    }

    /**
     * Initializes enemy AI behaviors.
     * >*Why is this necessary?*
     * - Each enemy actions needs a link to their parent (in order to access skills, stats and so on).
     * - The "owner" variable of an action is determined by searching for an enemy name inside the battle's enemies.
     * - A problem is raised here: what if there are the same enemy multiple times? It will always return the first occurrence in the enemies array.
     * - To fix this problem, the enemies array is progressively shifted as the AI are built in order to guarantee a proper ID attribution.
     * - Then, everything is brought back to normal by adding the enemies back to the enemies array.
     */
    buildBehaviors() {
        // Prepare enemy AI
        for(let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].behavior.build(i);
        }
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
        this.buildBehaviors();
        this.runTriggersOnAllies(Data.TriggerType.ON_BATTLE_START);
        this.runTriggersOnEnemies(Data.TriggerType.ON_BATTLE_START);
        
        this.chatlogFolder = game.chatlog.addCategory(Data.ChatlogChannel.BATTLE, {
            title: capitalizeFirstLetter(game.dungeon.floor.room.type) + " [" + game.dungeon.floor.room.coordinates[0] + ", " + game.dungeon.floor.room.coordinates[1] + "]"
        });
        game.chatlog.addMessage(Data.ChatlogChannel.BATTLE, {
            content: "Started a fight.",
            style: { className: "clgMsg-info" }
        }, this.chatlogFolder);

        this.beginRound();
        drawBattleScreen();

    }

    /**
     * Ends this battle.
     */
    end() {
        console.log("Battle ends!");
        this.runTriggersOnAll(Data.TriggerType.ON_BATTLE_END);
        this.cleanAllBattleEffectsFromFighters();
        this.outcome = this.determineOutcome();
        this.generateLoot();
        game.dungeon.floor.room.battleEnded(this.outcome);
        drawEndBattleScreen();
        generateEndBattleScreenEvents();
        game.player.du_ephemeralLuck += this.earnedEL;
        drawDungeonStats(true);

        game.chatlog.addMessage(Data.ChatlogChannel.BATTLE, {
            content: "Victory!",
            style: { className: "clgMsg-positive" }
        }, this.chatlogFolder);
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
     * Handles the current Enemy's turn.
     */
    handleEnemyTurn() {
        if(!this.currentPlay.isDead()) this.currentPlay.behavior.play();
        else this.finishTurn();
    }

    /**
     * Handles the end condition of the battle according to its type.
     */
    handleEnd() {
        if(this.type === Data.BattleType.GROUP || this.type === Data.BattleType.SPECIAL) this.end();
        else if (this.type === Data.BattleType.WAVE) {
            if(this.battleParams.params.waves.length === 0) this.end();
            else {
                this.setEnemies(this.battleParams.params.waves.shift());
                this.buildBehaviors();
                this.generateOrder();
                drawBattleScreen();
                console.info("NEW WAVE!");
            }
        }
    }

    /**
     * Handles the death process of the currently playing NPC.
     * @returns {boolean} whether the death results in a turn skip
     */
    handleDeath() {
        if(this.currentPlay instanceof Enemy && this.battleParams.params.queue) {
            if(this.battleParams.params.queue.length === 0) return true;

            const cloned = Entity.clone(this.battleParams.params.queue.shift());
            this.enemies[this.enemies.indexOf(this.currentPlay)] = cloned;
            this.currentPlay = cloned;
            cloned.behavior.build(this.enemies.indexOf(this.currentPlay));
            this.generateOrder();
            getFormationBattleEnemies(true);
            if(!this.beginTurnPopups) this.beginTurnPopups = true;

            game.chatlog.addMessage(Data.ChatlogChannel.BATTLE, {
                content: cloned.name + " has spawned."
            }, this.chatlogFolder);

            return false;
        } else if(this.currentPlay instanceof Enemy && this.battleParams.params.endless) {
            if(!this.battleParams.params.endCondition || !this.battleParams.params.endCondition()) {
                const cloned = Entity.clone(choose(this.battleParams.params.endless));
                this.enemies[this.enemies.indexOf(this.currentPlay)] = cloned;
                this.currentPlay = cloned;
                cloned.behavior.build(this.enemies.indexOf(this.currentPlay));
                this.generateOrder();
                getFormationBattleEnemies(true);
                if(!this.beginTurnPopups) this.beginTurnPopups = true;

                game.chatlog.addMessage(Data.ChatlogChannel.BATTLE, {
                    content: cloned.name + " has spawned."
                }, this.chatlogFolder);

                return false;
            } else if(this.battleParams.params.endCondition()) {
                return true;
            }
        }
        else {
            this.endTurn();
            return true;
        }
    }

    /**
     * Sets this Battle's enemies.
     * @param {Enemy[]} enemies the array of Enemies to attribute.
     */
    setEnemies(enemies) {
        for(let i = 0; i < this.enemies.length; i++) {
            this.enemies[i] = Entity.clone(enemies[i]);
        }
    }

    /**
     * Begins a new turn.
     */
    beginTurn() {
        if(this.battleParams.params.endCondition && this.battleParams.params.endCondition()) {
            this.end();
            return;
        }
        this.skipBecauseStunned = false;
        if(this.nextInOrder()) return; // IF A NEW ROUND IS STARTING, CANCEL THE FIRST TURN OR IT WILL BE PLAYED TWICE BY THE SAME FIGHTER.
        if(this.currentPlay.isDead()) {
            const skipBecauseDead = this.handleDeath();
            if(skipBecauseDead) return;
        }
        console.log("Currently playing: " + this.currentPlay.name);
        this.skipBecauseStunned = this.currentPlay.isStunned;

        this.currentPlay.runTriggers(Data.TriggerType.ON_TURN_BEGIN);
        this.currentPlay.executeActiveEffects();
        this.currentPlay.reduceSkillsCooldown();
        this.currentPlay.applySelfRegenerationEffects();
        drawBattleScreen();
        this.executingPopups = false;
        this.beginTurnPopups = false;
        this.runPopups();
        // SKIP ENEMIES
        if(this.skipBecauseStunned) {
            this.finishTurn();
            return;
        }
        if(this.currentPlay.isDead()) {
            const skipBecauseDead = this.handleDeath();
            if(skipBecauseDead) return;
        }
        if(this.isEnemyPlaying()) {
            this.handleEnemyTurn();
        }
        if(this.isBattleOver()) this.handleEnd();
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
        this.emptyBattlePopupsQueues();
        drawBattleScreen();
        this.beginTurn();
    }

    /**
     * Adds an end turn counter to this battle.
     */
    addEndTurnCounter() {
        this.endturnCounter += 1;
        if(this.endturnCounter >= this.order.length) {
            this.executingPopups = false;
            this.executeMovements();
            this.resetEndTurnCounter();
            if(!this.beginTurnPopups) {
                this.beginTurnPopups = true;
                console.log('BEGIN TURN POPUPS HAVE BEEN SET TO TRUE');
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

        this.chatlogRound = game.chatlog.addCategory(Data.ChatlogChannel.BATTLE, {
            title: "Round " + this.round
        }, this.chatlogFolder);
        /* game.chatlog.addMessage(Data.ChatlogChannel.BATTLE, {
            content: "Started a new round",
            style: { className: "clgMsg-info" }
        }, this.chatlogRound); */

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
            critical: false,
            ignoresProtection: false,
            armorPiercing: 0,
        };
        this.chatlogDealtDamage = [];
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
        this.healedAmount = 0;
        this.receivedDamage = 0;
        this.dealtDamage = 0;
        const weapon = this.selectedWeapon;
        const current = this.currentPlay;

        let accuracyModifiers = 0;
        let critModifiers = 0 + current.modifCritWeapon;

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
        this.params.armorPiercing = current.armorPiercing;

        this.dealtDamage = this.params.phys_damage + this.params.magi_damage + this.params.crit_damage;
    }

    /**
     * Computes the attack params based on the selected skill and the provided target.
     * @param {NPC} target the target
     * @param {boolean} forceCrit forces a critical strike (default: false)
     */
    computeSkillParams(target, forceCrit = false) {
        this.resetAttackParams();
        this.healedAmount = 0;
        this.receivedDamage = 0;
        this.dealtDamage = 0;
        const skill = this.selectedSkill;
        const accessor = skill.level;
        const modifier = (
            this.currentPlay instanceof Strider && target instanceof Strider && [Data.SkillType.BOTH, Data.SkillType.FRIENDLY].includes(skill.type)
            || this.currentPlay instanceof Enemy && target instanceof Enemy && [Data.SkillType.BOTH, Data.SkillType.FRIENDLY].includes(skill.type)
        ) ? 9999 : 0;
        const current = this.currentPlay;

        let accuracyModifiers = 0;
        let critModifiers = 0;

        if(skill.ignoresProtection) this.params.ignoresProtection = true;

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

        this.dealtDamage = this.params.phys_damage + this.params.magi_damage + this.params.crit_damage;
    }

    /**
     * Executes a Weapon attack based on the selected weapon, current player and target(s).
     */
    executeAttack() {
        this.overloadPopups();
        this.resetTargetTracker();

        const weapon = this.selectedWeapon;
        const current = this.currentPlay;

        this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_ATTACK);

        this.target.forEach(tar => {
            const tarDom = document.querySelector('#' + tar.getBattleFormationStringId());
            tarDom.classList.add('npcBattleTargeted');
            if(tar.isDead()) return;

            tar.runTriggers(Data.TriggerType.ON_RECV_ATTACK);

            this.computeAttackParams(tar);
            let params = this.params;
            if(params.success_accuracy && !params.success_dodge) {
                // Guard checks - allow guard only if
                // - Is a single target enemy attack
                if(tar.isGuarded) {
                    console.error('PROCESSING GUARD...');
                    const allyCheck = this.allies.includes(current) && this.allies.includes(tar);
                    const enemCheck = this.enemies.includes(current) && this.enemies.includes(tar);

                    if(!(this.target.length > 1 || allyCheck || enemCheck)) {
                        tar = tar.guardedBy;
                        console.error('APPLIED GUARD');
                    }
                    else {
                        console.error('IGNORED GUARD');
                    }
                }

                // Successful hit

                tar.receiveDamage(params);
                this.applyDamageReflection(params, tar);
                console.log('Successful hit!');

                this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_DAMAGE);
                this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_WEAPON);
                tar.runTriggers(Data.TriggerType.ON_RECV_WEAPON);

                if(params.critical) {
                    console.log('Critical blow!');
                    tarDom.classList.add('criticalHit');
                    this.currentPlay.addCriticalEffects();
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
                    tar.runTriggers(Data.TriggerType.ON_RECV_BLEEDING);
                    this.currentPlay.runTriggers(Data.TriggerType.ON_DEAL_BLEEDING);
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
                    tar.runTriggers(Data.TriggerType.ON_RECV_POISON);
                    this.currentPlay.runTriggers(Data.TriggerType.ON_DEAL_POISON);
                }

                if(tar.stamina <= 0 && tar.shield <= 0) {
                    // Deathblow
                    console.log('Deathblow!');
                    this.currentPlay.runTriggers(Data.TriggerType.ON_DEAL_DEATHBLOW);
                    tar.runTriggers(Data.TriggerType.ON_RECV_DEATHBLOW);
                    tar.addBattlePopup(new BattlePopup(0, '<p style="color: crimson; font-family: RobotoSlabBold">Deathblow!</p>'))
                    tar.kill();
                }

                const staDmg = (params.phys_damage + params.magi_damage) * this.selectedWeapon.staDmgRate;
                tar.removeBaseStat(new Stat({
                    effect: Data.Effect.STAMINA,
                    theorical: staDmg,
                }));

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

            this.targetTracker++;
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
     * Returns whether a Guard effect can be applied on the provided NPC, with the provided Skill and its level.
     * Guard won't applied if the provided skill has a Guard Shattering effect.
     * @param {NPC} tar the NPC to check
     * @param {Skill} skill the skill to check
     * @param {number} accessor the skill's level
     * @returns {boolean} whether a guard can be applied
     */
    canApplyGuard(tar, skill, accessor) {
        if(tar.isGuarded) {
            if(this.currentPlay instanceof Strider && tar instanceof Enemy) {
                if(!skill.effectsEnemies || (skill.effectsEnemies && !skill.effectsEnemies[skill.level][accessor].some(x => x.effect === Data.Effect.SHATTERS_GUARD))) {
                    return true;
                }
            } else if(this.currentPlay instanceof Enemy && tar instanceof Strider) {
                if(!skill.effectsAllies || (skill.effectsAllies && !skill.effectsAllies[skill.level][accessor].some(x => x.effect === Data.Effect.SHATTERS_GUARD))) {
                    return true;
                }
            }
        }
        
        return false;

        return tar.isGuarded
                &&
                (this.currentPlay instanceof Strider && tar instanceof Enemy && skill.effectsEnemies || this.currentPlay instanceof Enemy && tar instanceof Strider && skill.effectsAllies )
                &&
                !skill.effectsEnemies[skill.level][accessor].some(x => x.effect === Data.Effect.SHATTERS_GUARD)
    }

    /**
     * Executes all of the effects and damage of the selected Skill on the selected target(s).
     */
    executeSkill() {
        this.overloadPopups();
        this.resetTargetTracker();

        const skill = this.selectedSkill;
        const current = this.currentPlay;
        let effects = [];
        let accessor = '';

        this.computeSkillParams(this.target[0]);
        const isCrit = this.params.critical;

        this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_ATTACK);

        this.roundLog({
            content: this.currentPlay.name + " casts <span class='bold'>" + skill.name + "</span> on " + getTargetsString(this.target) + ".",
            style: { className: "clgMsg-regular" }
        })

        this.target.forEach(tar => {
            const tarDom = document.querySelector('#' + tar.getBattleFormationStringId());
            tarDom.classList.add('npcBattleTargeted');

            if(tar.isDead()) {
                console.error(tar.name + ' is dead! Ignoring');
                return;
            }

            tar.runTriggers(Data.TriggerType.ON_RECV_ATTACK);

            this.computeSkillParams(tar, isCrit);
            let params = this.params;
            if(params.success_accuracy && !params.success_dodge) {
                accessor = (params.critical ? 'critical' : 'regular');
                // Guard checks - allow guard only if
                // - Is a single target enemy attack
                // - Skill doesn't contain a guard shattering effect
                if(this.canApplyGuard(tar, skill, accessor)) {
                    console.error('PROCESSING GUARD...');
                    const allyCheck = this.allies.includes(current) && this.allies.includes(tar);
                    const enemCheck = this.enemies.includes(current) && this.enemies.includes(tar);

                    if(!((this.target.length > 1 && this.target.includes(tar.guardedBy)) || allyCheck || enemCheck)) {
                        tar = tar.guardedBy;
                        console.error('APPLIED GUARD');
                    }
                    else {
                        console.error('IGNORED GUARD');
                    }
                }

                // Successful hit
                console.log('Successful hit!');

                // Call logic execution (before/after)
                this.callSkillLogic(skill, tar, Data.SkillLogicExecution.PRE_DAMAGE);
                
                // Fire triggers
                this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_SKILL);
                tar.runTriggers(Data.TriggerType.ON_RECV_SKILL);

                if(params.phys_damage > 0 || params.magi_damage > 0) {
                    this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_DAMAGE);
                    tar.receiveDamage(params);
                    this.applyDamageReflection(params, tar);
                }

                // Handle critical triggers and critical effects
                if(params.critical) {
                    console.log('Critical blow!');
                    tarDom.classList.add('criticalHit');
                    this.currentPlay.addCriticalEffects();
                    this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_CRITICAL);
                    tar.runTriggers(Data.TriggerType.ON_RECV_CRITICAL);
                }

                this.callSkillLogic(skill, tar, Data.SkillLogicExecution.POST_DAMAGE);

                // Applying effects
                effects = [];
                if(skill.effectsAllies || skill.effectsEnemies) {
                    if(skill.effectsAllies && arrayContains(this.allies, tar)) {
                        this.callSkillLogic(skill, tar, Data.SkillLogicExecution.PRE_ALLIES_EFFECTS);
                        skill.effectsAllies[skill.level][accessor].forEach(eff => {
                            let newEff = Entity.clone(eff);
                            newEff.fix();
                            effects.push(newEff);
                        });
                    }
                    if(skill.effectsEnemies && arrayContains(this.enemies, tar)) {
                        this.callSkillLogic(skill, tar, Data.SkillLogicExecution.PRE_ENEMIES_EFFECTS);
                        skill.effectsEnemies[skill.level][accessor].forEach(eff => {
                            let newEff = Entity.clone(eff);
                            newEff.fix();
                            effects.push(newEff);
                        });
                    }
                    if(!this.isEnemyPlaying()) tar.addBattlePopup(new BattlePopup(0, '<div class="popupIcon" style="background-image: url(\'css/img/skills/' + current.name + skill.icon + '.png\');"></div>'));
                }

                tar.applyEffects(skill, current, effects, params.critical);
                game.battle.appliedEffects = effects;
                tar.runTriggers(Data.TriggerType.ON_RECV_EFFECTS);
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

            tar.deathCheck();
        });
        effects = [];

        // CASTER EFFECTS
        
        if(skill.effectsCaster) {
            this.callSkillLogic(skill, current, Data.SkillLogicExecution.PRE_CASTER_EFFECTS);
            if(!skill.applyCasterEffectsOnlyOnHit || (skill.applyCasterEffectsOnlyOnHit && this.hitSuccess())) {
                effects = [];
                accessor = (isCrit ? 'critical' : 'regular');
                skill.effectsCaster[skill.level][accessor].forEach(eff => {
                    let newEff = Entity.clone(eff);
                    newEff.fix();
                    effects.push(newEff);
                });
                current.addBattlePopup(new BattlePopup(0, '<div class="popupIcon" style="background-image: url(\'css/img/skills/' + current.name + skill.icon + '.png\');"></div>'));
            }
        }

        if(effects.length > 0) {
            current.applyEffects(skill, current, effects, isCrit);
        }

        current.useSkill(skill);
        skill.onCast && skill.onCast();
        current.deathCheck();

        // ADD SKILL TRIGGERS
        if(skill.triggersCaster && (!skill.applyCasterTriggersOnlyOnHit || (skill.applyCasterTriggersOnlyOnHit && this.hitSuccess()))) {
            skill.triggersCaster.forEach(trig => current.triggers.push(trig));
        }
        if(skill.triggersEnemies && (!skill.applyEnemiesTriggersOnlyOnHit || (skill.applyEnemiesTriggersOnlyOnHit && this.hitSuccess()))) {
            this.target.filter(x => x instanceof Enemy).forEach(ene => {
                skill.triggersEnemies.forEach(trig => ene.triggers.push(trig));
            });
        }
        if(skill.triggersAllies && (!skill.applyAlliesTriggersOnlyOnHit || (skill.applyAlliesTriggersOnlyOnHit && this.hitSuccess()))) {
            this.target.filter(x => x instanceof Strider).forEach(stri => {
                skill.triggersAllies.forEach(trig => stri.triggers.push(trig));
            });
        }
        
        if(this.isEnemyPlaying()) {
            addBattleAttackMessage(current.name, skill.name);
            setTimeout(() => {
                this.runPopups();
            }, 1500);
        } else this.runPopups();
    }

    /**
     * Returns whether the currently processed attack is a successful hit.
     * @returns {boolean}
     */
    hitSuccess() {
        return this.params.success_accuracy && !this.params.success_dodge;
    }

    /**
     * Executes the skill logic from the provided Skill, on the provided target, at the provided execution time.
     * @param {Skill} skill the Skill to retrieve the logic from
     * @param {NPC} target the target to apply the logic to
     * @param {Data.SkillLogicExecution} type the logic's execution time
     */
    callSkillLogic(skill, target, type) {
        if(this.allies.includes(target)) {
            if(skill.logicAllies && skill.logicAllies[type]) skill.logicAllies[type](target);
        }
        if(this.enemies.includes(target)) {
            if(skill.logicEnemies && skill.logicEnemies[type]) skill.logicEnemies[type](target);
        }
        
        if(skill.logicCaster && skill.logicCaster[type]) skill.logicCaster[type](this.current);

        if(skill.logicAny && skill.logicAny[type]) skill.logicAny[type](this.target[this.targetTracker]);
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
        const type = this.allies.includes(current) ? 'a' : 'e';
        switch(skill.effect) {
            case Data.Effect.BACK_ONE:
                if(current.getSelfPosInBattle() === Data.FormationPosition.FRONT) {
                    this.movementQueue.push(new BattleMove(current, Data.FormationPosition.MIDDLE, type));
                } else if(current.getSelfPosInBattle() === Data.FormationPosition.MIDDLE) {
                    this.movementQueue.push(new BattleMove(current, Data.FormationPosition.BACK, type));
                }
                break;
            case Data.Effect.BACK_TWO:
                this.movementQueue.push(new BattleMove(current, Data.FormationPosition.BACK, type));
                break;
            case Data.Effect.FRONT_ONE:
                if(current.getSelfPosInBattle() === Data.FormationPosition.BACK) {
                    this.movementQueue.push(new BattleMove(current, Data.FormationPosition.MIDDLE, type));
                } else if(current.getSelfPosInBattle() === Data.FormationPosition.MIDDLE) {
                    this.movementQueue.push(new BattleMove(current, Data.FormationPosition.FRONT, type));
                }
                break;
            case Data.Effect.FRONT_TWO:
                this.movementQueue.push(new BattleMove(current, Data.FormationPosition.FRONT, type));
                break;
            default:
                throw new Error(skill);
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

                    // Triggers
                    console.log(arr[targetIndex].name + ' is now on pos ' + arr[targetIndex].getSelfPosInBattle());
                    console.log(arr[origIndex].name + ' is now on pos ' + arr[origIndex].getSelfPosInBattle());
                    arr[targetIndex].runTriggers(Data.TriggerType.ON_RECV_MOVE);
                    arr[origIndex].runTriggers(Data.TriggerType.ON_RECV_MOVE);
                } else {
                    if(origIndex == 2 && targetIndex == 0) {
                        if(type === "a") this.moveAnimation(npc, Data.FormationPosition.FRONT, Data.AnimMoveType.LEFT_TWO);
                        else if(type === "e") this.moveAnimation(npc, Data.FormationPosition.FRONT, Data.AnimMoveType.RIGHT_TWO);
                        temp = arr[origIndex];
                        arr[2] = arr[1];
                        arr[1] = arr[0];
                        arr[targetIndex] = temp;
                        console.log("Moved " + npc.name + " to " + target + " (push type)");

                        // Triggers
                        arr.forEach(el => { el.runTriggers(Data.TriggerType.ON_RECV_MOVE) });
                    } else if(origIndex == 0 && targetIndex == 2) {
                        if(type === "a") this.moveAnimation(npc, Data.FormationPosition.BACK, Data.AnimMoveType.RIGHT_TWO);
                        else if(type === "e") this.moveAnimation(npc, Data.FormationPosition.BACK, Data.AnimMoveType.LEFT_TWO);
                        temp = arr[origIndex];
                        arr[0] = arr[1];
                        arr[1] = arr[2];
                        arr[targetIndex] = temp;
                        console.log("Moved " + npc.name + " to " + target + " (push type)");

                        // Triggers
                        arr.forEach(el => { el.runTriggers(Data.TriggerType.ON_RECV_MOVE) });
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

    /**
     * Empties the popups queues of each NPC in the battle.
     */
    emptyBattlePopupsQueues() {
        this.order.forEach(fi => {
            fi.emptyPopupsQueue();
        });
    }

    /**
     * Overloads battle popups by emptying queues and resetting trackers.
     */
    overloadPopups() {
        this.emptyBattlePopupsQueues();
        this.resetEndTurnCounter();
        this.beginTurnPopups = true;
    }

    /**
     * Determines the Battle's outcome based on NPC's health and returns it.
     * @returns {Data.BattleOutcome} the outcome of the battle
     */
    determineOutcome() {
        if(this.allies.every(x => x.health === 0)) return Data.BattleOutcome.FAILURE;
        else return Data.BattleOutcome.VICTORY;
    }

    /**
     * Cleans all of the ActiveEffects from all NPCs.
     */
    cleanAllBattleEffectsFromFighters() {
        this.order.forEach(npc => {
            npc.cleanAllBattleEffects();
        });
    }

    /**
     * Ends the current turn after running a condition to make sure all popups have been properly executed.
     */
    async finishTurn() {
        await this.waitForBeginTurnPopups();
        this.runPopups();
    }

    /**
     * Checks whether the popups have all been executed. If they have not, loops until they do.
     * @returns {Promise}
     */
    async waitForBeginTurnPopups() {
        if(this.beginTurnPopups) return Promise.resolve();

        return new Promise(resolve => {
            const checkCondition = () => {
                if(this.beginTurnPopups) resolve();
                else setTimeout(checkCondition, 100);
            };

            checkCondition();
        });
    }

    /**
     * Generates loots based on the enemies' loot tables, then merges them.
     */
    generateLoot() {
        this.loot = [];
        let loot = [];

        this.enemies.forEach(en => {
            const looted = LootTable.Generators.generateLoot(en.drops);
            loot = loot.concat(looted);
        });

        this.loot = mergeLoots(loot);
        this.earnedEL = generateEphemeralLuckAmount(this.type, this.battleParams.title);
        console.log("Total final loot: ", this.loot);
    }

    /**
     * Adds a message to the current round's chatlog folder.
     * @param {object} props the message's properties
     */
    roundLog(props) {
        game.chatlog.addMessage(Data.ChatlogChannel.BATTLE, props, this.chatlogRound);
    }
}
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
            }
        } else {
            this.currentPlay = this.order[0];
        }
        // skip enemies
        if(what(this.enemies, this.currentPlay.name)) {
            this.nextInOrder();
        }
        console.log("Currently playing: " + this.currentPlay.name);
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
     * Starts the battle.
     */
    start() {
        this.generateOrder();
        this.runTriggersOnAllies(Data.TriggerType.ON_BATTLE_START);
        this.runTriggersOnEnemies(Data.TriggerType.ON_BATTLE_START);
        this.beginRound();
        drawBattleScreen();
    }

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


    beginTurn() {
        this.nextInOrder();
        this.currentPlay.runTriggers(Data.TriggerType.ON_TURN_BEGIN);
        // execute active effects here
        drawBattleScreen();
        if(this.isBattleOver()) this.end();
    }

    endTurn() {
        this.currentPlay.runTriggers(Data.TriggerType.ON_TURN_END);
        this.action = null;
        this.selectedWeapon = null;
        this.selectedSkill = null;
        this.target = [];
        this.movementQueue = [];
        //this.resetTargetTracker();
        //this.resetEndTurnCounter();
        drawBattleScreen();
        this.beginTurn();
    }

    addEndTurnCounter() {}

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

    resetTargetTracker() {
        this.targetTracker = 0;
    }

    /**
     * Computes attack params for a weapon attack.
     */
    computeAttackParams() {
        this.resetAttackParams();
        let baseDmg, finalDmg;
        const target = this.target[this.targetTracker];

        if(Math.random() * 100 < this.currentPlay.accuracy) {
            // Accuracy test passed
            this.params.success_accuracy = true;
            if(Math.random() * 100 > target.dodge) {
                // Target is hit!
                this.params.phys_damage = this.selectedWeapon.getSharpness();
                this.params.magi_damage = this.selectedWeapon.getWithering();

                if(Math.random() * 100 < this.selectedWeapon.crit_luk) {
                    // Critical blow! Add critical damage
                    this.params.crit_damage += this.selectedWeapon.crit_dmg;
                    this.params.critical = true;
                }

                this.params.phys_damage += (Math.round(this.params.phys_damage * this.currentPlay.modifDmgWeapon/100) + Math.round(this.params.phys_damage * this.currentPlay.modifDmgTotal/100));
                this.params.magi_damage += (Math.round(this.params.magi_damage * this.currentPlay.modifDmgWeapon/100) + Math.round(this.params.magi_damage * this.currentPlay.modifDmgTotal/100));
                this.params.crit_damage += (Math.round(this.params.crit_damage * this.currentPlay.modifDmgWeapon/100) + Math.round(this.params.crit_damage * this.currentPlay.modifDmgTotal/100));
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
            this.computeAttackParams();
            let params = this.params;
            if(params.success_accuracy && !params.success_dodge) {
                // Successful hit
                this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_DAMAGE);
                tar.runTriggers(Data.TriggerType.ON_RECV_DAMAGE);

                tar.receiveDamage(params);
                console.log('Successful hit!');

                if(params.critical) {
                    console.log('Critical blow!');
                    //this.currentPlay.addCriticalEffects();
                    this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_CRITICAL);
                    tar.runTriggers(Data.TriggerType.ON_RECV_CRITICAL);
                }
                // TODO: ADD BLEEDING AND POISONING

                if(weapon.bleed[0] > 0) {
                    tar.addActiveEffect(new ActiveEffect({
                        name: "Bleeding", 
                        originUser: this.currentPlay, 
                        originObject: weapon, 
                        effects: [
                            new Stat({
                                effect: weapon.bleed[2] ? Data.Effect.BLEEDING_CURABLE : Data.Effect.BLEEDING_INCURABLE,
                                theorical: weapon.bleed[0],
                                duration: weapon.bleed[1]
                            })
                        ],
                        style: {
                            color: Data.Color.RED,
                            bold: true,
                            italic: false
                        }
                    }));
                }
                if(weapon.poison[0] > 0) {
                    tar.addActiveEffect(new ActiveEffect({
                        name: "Poisoning", 
                        originUser: this.currentPlay, 
                        originObject: weapon, 
                        effects: [
                            new Stat({
                                effect: weapon.poison[2] ? Data.Effect.BLIGHT_CURABLE : Data.Effect.BLIGHT_INCURABLE,
                                theorical: weapon.poison[0],
                                duration: weapon.poison[1]
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
            } else if(params.success_dodge) {
                // Dodged
                console.log('Dodged!');
                this.runTriggersOnCurrent(Data.TriggerType.ON_DEAL_DODGED);
                tar.runTriggers(Data.TriggerType.ON_RECV_DODGED);
            }
        });

        this.currentPlay.useWeapon(this.selectedWeapon);
        this.endTurn();
    }
}
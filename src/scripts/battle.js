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
        this.resetEndTurnCounter();
        drawBattleScreen();
        this.beginTurn();
    }

    addEndTurnCounter() {
        this.endturnCounter += 1;
        if(this.endturnCounter === this.order.length) {
            this.executeMovements();
            if(this.movementQueue.length !== 0) setTimeout(() => {this.endTurn();}, 300);
            else this.endTurn();
        }
    }

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

                if(weapon.bleed[0] > 0 && (weapon.bleed[0] - tar.resBleed[0]) > 0) {
                    tar.addActiveEffect(new ActiveEffect({
                        name: "Bleeding", 
                        originUser: this.currentPlay, 
                        originObject: weapon, 
                        effects: [
                            new Stat({
                                effect: weapon.bleed[2] ? Data.Effect.BLEEDING_CURABLE : Data.Effect.BLEEDING_INCURABLE,
                                theorical: weapon.bleed[0] - tar.resBleed[0],
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
                if(weapon.poison[0] > 0 && (weapon.poison[0] - tar.resPoison[0]) > 0) {
                    tar.addActiveEffect(new ActiveEffect({
                        name: "Poisoning", 
                        originUser: this.currentPlay, 
                        originObject: weapon, 
                        effects: [
                            new Stat({
                                effect: weapon.poison[2] ? Data.Effect.BLIGHT_CURABLE : Data.Effect.BLIGHT_INCURABLE,
                                theorical: weapon.poison[0] - tar.resPoison[0],
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
        this.currentPlay.addBattlePopup(new BattlePopup(0, '<p style="color: rgba(0,148,50,1)">-' + weapon.effort + '</p>'));
        
        this.runPopups();
    }

    executeSkill() {
        const skill = this.selectedSkill;

        this.runTriggersOnCurrent(Data.TriggerType.ON_SKILL);
    }

    getCurrentNPCPos() {
        if(this.allies[0] === this.currentPlay) return Data.FormationPosition.BACK;
        if(this.allies[1] === this.currentPlay) return Data.FormationPosition.MIDDLE;
        if(this.allies[2] === this.currentPlay) return Data.FormationPosition.FRONT;
        if(this.enemies[0] === this.currentPlay) return Data.FormationPosition.BACK;
        if(this.enemies[1] === this.currentPlay) return Data.FormationPosition.MIDDLE;
        if(this.enemies[2] === this.currentPlay) return Data.FormationPosition.FRONT;
    }

    runPopups() {
        this.order.forEach(el => {
            el.executePopups();
        })
    }

    /**
     * 
     * @param {NPC} npc 
     * @param {Data.FormationPosition} target 
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
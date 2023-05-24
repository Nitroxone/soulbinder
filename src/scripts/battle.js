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
     * Runs triggers which type matches the provided TriggerType on all allies and enemies.
     * @param {Data.TriggerType} type the type of Trigger
     */
    runTriggersOnAll(type) {
        this.order.forEach(single => {
            single.runTriggers(type);
        });
    }
}
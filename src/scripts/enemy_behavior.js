/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class EnemyBehavior {
    constructor(props) {
        this.actions = getValueFromObject(props, "actions", []);
    }

    build() {
        this.actions.forEach(ac => {
            ac.build();
        });
    }

    play() {
        let hasPlayed = false;
        for(let i = 0; i < this.actions.length; i++) {
            if(this.actions[i].checker()) {
                setTimeout(() => {this.actions[i].behavior();}, 1000);
                hasPlayed = true;
                return;
            }
        }
        if(!hasPlayed) game.battle.finishTurn();
    }
}
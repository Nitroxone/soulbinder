/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

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
        if(!hasPlayed) game.currentBattle.endTurn();
    }
}
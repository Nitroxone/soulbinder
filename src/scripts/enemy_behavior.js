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
        for(let i = 0; i < this.actions.length; i++) {
            if(this.actions[i].checker()) {
                setTimeout(() => {this.actions[i].behavior();}, 1000);
                //game.currentBattle.endTurn();
                return;
            }
        }
    }
}
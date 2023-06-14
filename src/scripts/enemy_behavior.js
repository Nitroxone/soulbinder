class EnemyBehavior {
    constructor(props) {
        this.actions = getValueFromObject(props, "actions", []);
    }

    build() {
        this.actions.forEach(ac => {
            ac.build();
        });
    }
}
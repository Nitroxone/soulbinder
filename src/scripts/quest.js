class Quest extends Entity {
    constructor(name, desc, icon,
                state,
                steps,
                rewards) {
        super(name, desc, icon);

        this.state = state;
        this.steps = steps;
        this.rewards = rewards;
    }
}
class MasteryPathwayStep {
    constructor(name, 
                desc,
                levels,
                requirements,
                rewards) {
        this.name = name;
        this.desc = desc;
        this.currentLevel = 0;
        this.levels = levels;
        this.requirements = requirements;
        this.rewards = rewards;
    }
}
class SkillTreeNode {
    constructor(name, desc, icon, type, levels, requirements, rewards) {
        this.name = name;
        this.desc = desc;
        this.icon = icon;
        this.type = type
        this.levels = levels;
        this.requirements = requirements
        this.previous = null;
        this.next = null;
        this.rewards = rewards;

        this.currentLevel = 0;
    }
}
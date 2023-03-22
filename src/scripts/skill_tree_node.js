class SkillTreeNode {
    constructor(name, desc, icon, type, levels, requirements, rewards) {
        this.name = name;
        this.desc = desc;
        this.icon = icon;
        this.type = type
        this.levels = levels;
        this.requirements = requirements
        this.previous = [];
        this.next = [];
        this.rewards = rewards;
        this.unlocked = false;

        this.currentLevel = 0;
    }

    /**
     * Adds a level to the Node. Cannot exceed the Node's maximum level.
     */
    addLevel() {
        this.currentLevel = Math.min(++this.currentLevel, this.levels);
        this.unlockNext();
    }

    /**
     * Adds the provided Node to the Parent Nodes of this Node.
     * @param {SkillTreeNode} next the Parent Node to add
     */
    addPrevious(previous) {
        this.previous.push(previous);
    }

    /**
     * Adds the provided Node to the Children Nodes of this Node.
     * @param {SkillTreeNode} next the Child Node to add
     */
    addNext(next) {
        this.next.push(next);
    }

    /**
     * Returns the requirements to unlock the Node's next level.
     * @returns {array} the requirements to the Node's next level
     */
    getNextRequirements() {
        return this.requirements[this.currentLevel+1];
    }

    /**
     * Returns the required level to unlock the Node's next level.
     * @returns {number} the required level to unlock the Node's next level
     */
    getNextRequiredLevel() {
        return this.getNextRequirements()[0];
    }

    /**
     * Returns the required amount of skill points to unlock the Node's next level.
     * @returns {number} the required skill points amount to unlock the Node's next level
     */
    getNextRequiredSkillPoints() {
        return this.getNextRequirements()[1];
    }

    /**
     * Returns the rewards at the next Node level.
     * @returns {array} the rewards at the next Node level
     */
    getNextRewards() {
        return this.rewards[this.currentLevel+1];
    }

    /**
     * Returns the rewards at the current Node level.
     * @returns {array} the rewards at the current Node level
     */
    getCurrentRewards() {
        return this.rewards[this.currentLevel];
    }

    /**
     * Unlocks all of the Child Nodes.
     */
    unlockNext() {
        this.next.forEach(next => {
            next.unlock();
        })
    }

    /**
     * Returns whether  the Node is unlocked.
     * @returns {boolean} whether the Node is unlocked
     */
    isUnlocked() {
        return this.unlocked;
    }

    /**
     * Unlocks the node.
     */
    unlock() {
        this.unlocked = true;
    }
}
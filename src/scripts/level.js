/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

/**
 * The Level class holds all the required tools to manage a leveling system (player, NPC... whatever it may be)
 */
class Level {
    /**
     * 
     * @param {string} name the Level's name 
     * @param {number} min the Level's minimum level
     * @param {number} max the Level's maximum level
     * @param {*} currentLevel the Level's current level
     * @param {*} nextXp the Level's next XP threshold
     * @param {*} currentXp the Level's current XP
     * @param {*} growthRate the Level's growth rate (float number between 0 and 1)
     */
    constructor(name, min, max, currentLevel, nextXp, currentXp, growthRate = 0.15) {
        this.name = name;
        this.min = min;
        this.max = max;
        this.currentLevel = currentLevel;
        this.nextXp = nextXp;
        this.currentXp = currentXp;
        this.growthRate = growthRate;
    }

    nextLevel() {
        let remaining = this.currentXp;
        if (this.currentLevel < this.max) {
            this.currentLevel += 1;
        }
        this.currentXp = remaining;
        this.nextXp += Math.round(this.nextXp * this.growthRate);
        console.log(`Level gained. Now level: ${this.currentLevel}`);
        console.log(`${this.nextXp} XP to the next level.`);
    }

    addLevel(amount = 1) {
        for (let i = 0; i < amount; i++) {
            this.nextLevel();
        }
    }

    addXp(amount) {
        let levelsAmount = 0;
        let remaining;

        while (amount >= this.nextXp) {
            amount -= this.nextXp;
            this.nextLevel();
            levelsAmount++;
        }

        if (amount > (this.nextXp - this.currentXp)) {
            remaining = amount - (this.nextXp - this.currentXp);
            this.currentXp = remaining;
            this.nextLevel();
        } else {
            remaining = amount;
        }

        this.currentXp += remaining;
        if (this.currentXp === this.nextXp) {
            this.nextLevel();
            levelsAmount++;
        }

        console.log(`Levels gained: ${levelsAmount}`);
        console.log(`Current XP: ${this.currentXp}/${this.nextXp}`);
    }
}
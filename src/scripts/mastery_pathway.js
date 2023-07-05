/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

class MasteryPathway extends Entity {
    constructor(name, desc, icon,
                type,
                steps) {
        super(name, desc, icon);

        this.type = type;
        this.state = Data.MasteryPathwayState.NEOPHYTE;
        this.steps = steps;
    }

    /**
     * This method needs to be written.
     * It iterates over all of the steps.
     * For each step:
     * - Checks whether the current step level requirements exist in the game listeners. If not, adds them.
     * - Checks whether the previous step level requirements exist in the game listeners. If they do, remove them.
     */
    updateActionListeners() {
        for(const step of this.steps) {
            if(step.currentLevel > 0) step.requirements[step.currentLevel].forEach(obj => {
                if(arrayContains(game.actionListeners, obj)) removeFromArray(game.actionListeners, obj);
            })
            console.log(step.currentLevel);
            step.requirements[step.currentLevel+1].forEach(obj => {
                if(!arrayContains(game.actionListeners, obj)) game.actionListeners.push(obj);
            })
        }
    }
}
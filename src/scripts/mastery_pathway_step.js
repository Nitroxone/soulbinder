/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

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
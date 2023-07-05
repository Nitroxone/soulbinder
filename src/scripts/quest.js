/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

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
/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

class ActiveEffect {
    constructor(props) {
        this.name = getValueFromObject(props, "name", "None");
        this.originUser = getValueFromObject(props, "originUser", null);
        this.originObject = getValueFromObject(props, "originObject", null);
        this.effects = getValueFromObject(props, "effects", null);
        this.style = getValueFromObject(props, "style", null);

        this.duration = [];
        for(let i = 0; i < this.effects.length; i++) {
            this.duration[i] = this.effects[i].duration;
        }

        this.countdown = 1;
    }
}
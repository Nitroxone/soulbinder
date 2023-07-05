/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

/**
 * Triggers are very powerful tools that store unique mechanics for characters, skills and relics.
 */
class Trigger {
    /**
     * @param {string} name 
     * @param {string} type 
     * @param {Function} checker 
     * @param {Function} behavior 
     */
    constructor(props) {
        this.name = getValueFromObject(props, "name", "untitled");
        this.type = getValueFromObject(props, "type", Data.TriggerType);
        this.checker = getValueFromObject(props, "checker", () => { return true; });
        this.behavior = getValueFromObject(props, "behavior", () => { console.log('Undefined Trigger called!') });
    }
}
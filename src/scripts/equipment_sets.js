/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

class EquipmentSet extends Entity {
    /**
     * @param {string} name 
     * @param {string} type 
     * @param {string} desc 
     * @param {array} items
     * @param {array} bonus 
     */
    constructor(name, type, desc, items, bonus) {
        super(name, desc, 0);
        this.type = type;
        this.items = items;
        this.bonus = bonus;
    }
}
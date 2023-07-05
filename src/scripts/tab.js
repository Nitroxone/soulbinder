/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

class Tab {
    /**
     * 
     * @param {string} name 
     * @param {string} id 
     * @param {string} desc 
     * @param {boolean} popup 
     * @param {string} addClass 
     * @param {boolean} visible 
     * @param {boolean} noScroll 
     */
    constructor(name, id, desc, popup = null, addClass = null, visible = null, noScroll = false) {
        this.name = name;
        this.id = id;
        this.desc = desc;
        this.popup = popup;
        this.addClass = addClass;
        this.visible = visible;
        this.noScroll = noScroll;
        this.div = undefined;
        this.domWhat = undefined;
    }
}
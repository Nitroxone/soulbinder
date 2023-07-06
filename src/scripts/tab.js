/*

 Copyright (c) 2023 ntrx. All rights reserved.

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
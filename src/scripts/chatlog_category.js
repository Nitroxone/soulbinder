/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class ChatLogCategory {
    constructor(props = {}) {
        this.uid = uidGen();
        this.parent = getValueFromObject(props, "parent", null);
        this.data = getValueFromObject(props, "data", []);
        this.title = getValueFromObject(props, "title", "Untitled category");
        this.style = getValueFromObject(props, "style", {
            className: "regular"
        });
    }

    /**
     * Returns the HTML ID of this category.
     * @param {boolean} includeToken whether the include the # token
     * @returns {string} the HTML ID
     */
    getHtmlId(includeToken = true) {
        return (includeToken ? '#' : '') + 'chatlogCat-' + this.uid;
    }

    /**
     * Returns this category's HTML element from the DOM.
     * @returns {HTMLElement|null}
     */
    getDom() {
        return document.querySelector(this.getHtmlId());
    }

    /**
     * Returns the formatted HTML string of this ChatLog category.
     * @returns {string} an HTML string
     */
    draw() {
        let str = '';

        str += '<div id="' + this.getHtmlId(false) + '" class="chatlogCategory ' + this.style.className + '">';
        str += '<div class="chatlogCategory-title">' + this.title + '</div>';
        str += '<div class="chatlogCategory-content">';
        str += '</div>';
        str += '</div>';

        return str;
    }

    notify() {
        
    }
}
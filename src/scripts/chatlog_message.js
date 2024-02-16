/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class ChatLogMessage {
    constructor(props = {}) {
        this.uid = uidGen();
        this.content = getValueFromObject(props, "content", "Empty message");
        this.events = getValueFromObject(props, "events", []);
        this.style = getValueFromObject(props, "style", {
            className: 'regular'
        });
    }

    /**
     * Returns the HTML ID of this message.
     * @param {boolean} includeToken whether the include the # token
     * @returns {string} the HTML ID
     */
    getHtmlId(includeToken = true) {
        return (includeToken ? '#' : '') + 'chatlogMsg-' + this.uid;
    }

    /**
     * Returns the formatted HTML string of this ChatLog message.
     * @returns {string} an HTML string
     */
    draw() {
        let str = '';

        str += '<div id="' + this.getHtmlId(false) + '" class="chatlogMessage ' + this.style.className + '">';
        str += this.content;
        str += '</div>';

        return str;
    }
}
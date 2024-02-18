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
        this.timecode = this.setDate();
    }

    /**
     * Returns the HTML ID of this message.
     * @param {boolean} includeToken whether the include the # token
     * @returns {string} the HTML ID
     */
    getHtmlId(includeToken = true) {
        return (includeToken ? '#' : '') + 'chatlogMsg-' + this.uid;
    }

    setDate() {
        const date = new Date();
        const hours = date.getHours().toString().length === 1 ? '0' + date.getHours() : date.getHours();
        const minutes = date.getMinutes().toString().length === 1 ? '0' + date.getMinutes() : date.getMinutes();
        
        return hours + ':' + minutes;
    }

    /**
     * Returns the formatted HTML string of this ChatLog message.
     * @returns {string} an HTML string
     */
    draw() {
        let str = '';

        str += '<div id="' + this.getHtmlId(false) + '" class="chatlogMessage ' + this.style.className + '">';
        str += '<div class="chatlogMessage-timecode">' + this.timecode + '</div>';
        str += '<div class="chatlogMessage-content">' + this.content + '</div>';
        str += '</div>';

        return str;
    }
}
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

    draw() {
        let str = '';

        str += '<div id="chatlogMsg-' + this.uid + '" class="chatlogMessage ' + this.style.className + '">';
        str += this.content;
        str += '</div>';

        return str;
    }
}
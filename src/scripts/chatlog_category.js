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

    getHtmlId() {
        return '#chatlogCat-' + this.uid;
    }

    draw() {
        let str = '';

        str += '<div id="chatlogCat-' + this.uid + '" class="chatlogCategory ' + this.style.className + '">';
        str += '<div class="chatlogCategory-title">' + this.title + '</div>';
        str += '</div>';

        return str;
    }
}
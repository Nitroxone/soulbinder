/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class ChatLogMessage {
    constructor(props = {}) {
        this.content = getValueFromObject(props, "content", "Empty message");
        this.events = getValueFromObject(props, "events", []);
    }
}
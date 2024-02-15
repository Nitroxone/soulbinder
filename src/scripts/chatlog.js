/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class ChatLog {
    constructor() {
        this.initChannels();
        this.openChannel(Data.ChatlogTabs.EXPLORATION);
    }

    initChannels() {
        document.querySelectorAll('.chatlogMessages').forEach(channel => {
            channel.style.display = 'none';
        });
    }

    openChannel(target) {
        if(!Object.values(Data.ChatlogTabs).includes(target)) throw new Error('Attempted to open an invalid chatlog tab : ' + target);

        document.querySelector('#chatlog-' + target).style.display = 'flex';
    }
}
/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

/**
 * This class manages the chatlog of the game.
 */
class ChatLog {
    constructor() {
        this.closeChannels();
        this.openChannel(Data.ChatlogTabs.EXPLORATION);
        this.generateTabEvents();

        this.currentTab = Data.ChatlogTabs.EXPLORATION;

        this.messages = {
            workshop: [],
            battle: [],
            exploration: []
        }
    }

    /**
     * Hides all of the chatlog channels.
     */
    closeChannels() {
        document.querySelectorAll('.chatlogMessages').forEach(channel => {
            channel.style.display = 'none';
        });
    }

    /**
     * Hides the targeted chatlog channel and updates its tab style as well.
     * @param {Data.ChatlogTabs} target the chatlog channel to close
     */
    closeChannel(target) {
        if(!Object.values(Data.ChatlogTabs).includes(target)) throw new Error('Attempted to close an invalid chatlog tab : ' + target);

        this.getChannel(target).style.display = 'none';
        document.querySelector('#chatlogTab-' + this.currentTab).classList.remove('active');
    }

    /**
     * Shows the targeted chatlog channel and updates its tab style as well.
     * @param {Data.ChatlogTabs} target the chatlog channel to open
     */
    openChannel(target) {
        if(!Object.values(Data.ChatlogTabs).includes(target)) throw new Error('Attempted to open an invalid chatlog tab : ' + target);

        this.getChannel(target).style.display = 'flex';
        document.querySelector('#chatlogTab-' + target).classList.add('active');

    }

    /**
     * Generates the tab events.
     */
    generateTabEvents() {
        Object.values(Data.ChatlogTabs).forEach(tab => {
            document.querySelector('#chatlogTab-' + tab).addEventListener('click', (e) => {
                if(this.currentTab === tab) return;

                Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
                this.closeChannel(this.currentTab);
                this.openChannel(tab);
                this.currentTab = tab;
            })
        })
    }

    addMessage(target, message) {
        if(!Object.values(Data.ChatlogTabs).includes(target)) throw new Error('Attempted to add a message to an invalid chatlog tab : ' + target);

        const channel = this.getChannel(target);
        this.messages[target].push(
            new ChatLogMessage(message)
        );
    }

    getChannel(target) {
        return document.querySelector('#chatlog-' + target);
    }
}
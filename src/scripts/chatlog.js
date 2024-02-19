/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

/**
 * This class manages the chatlog of the game.
 */
class ChatLog {
    constructor() {
        this.closeChannels();
        this.openChannel(Data.ChatlogChannel.EXPLORATION);
        this.generateTabEvents();

        this.currentTab = Data.ChatlogChannel.EXPLORATION;

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
     * @param {Data.ChatlogChannel} target the chatlog channel to close
     */
    closeChannel(target) {
        if(!Object.values(Data.ChatlogChannel).includes(target)) throw new Error('Attempted to close an invalid chatlog tab : ' + target);

        this.getChannel(target).style.display = 'none';
        document.querySelector('#chatlogTab-' + this.currentTab).classList.remove('active');
    }

    /**
     * Shows the targeted chatlog channel and updates its tab style as well.
     * @param {Data.ChatlogChannel} target the chatlog channel to open
     */
    openChannel(target) {
        if(!Object.values(Data.ChatlogChannel).includes(target)) throw new Error('Attempted to open an invalid chatlog tab : ' + target);

        this.getChannel(target).style.display = 'flex';
        document.querySelector('#chatlogTab-' + target).classList.add('active');

    }

    /**
     * Generates the tab events.
     */
    generateTabEvents() {
        Object.values(Data.ChatlogChannel).forEach(tab => {
            document.querySelector('#chatlogTab-' + tab).addEventListener('click', (e) => {
                if(this.currentTab === tab) return;

                Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
                this.closeChannel(this.currentTab);
                this.openChannel(tab);
                this.currentTab = tab;
            })
        })
    }

    /**
     * Adds the data to the targeted channel. (Supposed to be call only through addMessage() or addCategory().)
     * @param {Data.ChatlogChannel} target the targeted channel
     * @param {object} message the data to add
     * @param {ChatLogCategory|string|null} category the category to target
     */
    add(target, message, category = null) {
        if(!Object.values(Data.ChatlogChannel).includes(target)) throw new Error('Attempted to add a message to an invalid chatlog tab : ' + target);

        const channel = this.getChannel(target);
        const obj = message.type === "message" ? new ChatLogMessage(message.data) : new ChatLogCategory(message.data);
        if(category) {
            const tar = this.messages[target].find(x => x instanceof ChatLogCategory && (x.title === category || x === category));
            tar.data.push(obj);
            obj.parent = tar;
            this.messages[target].push(obj)
            channel.querySelector(tar.getHtmlId() + ' .chatlogCategory-content').innerHTML += obj.draw();

            tar.notify();
            this.generateEvents(tar);
        } else {
            this.messages[target].push(obj);
            channel.innerHTML += obj.draw();
        }
        this.generateChannelEvents(target);
        obj.notify();

        return obj;
    }
    
    /**
     * Generates events for all of the messages within the provided chatlog channel.
     * @param {Data.ChatlogChannel} target 
     */
    generateChannelEvents(target) {
        this.messages[target].forEach(elem => {
            this.generateEvents(elem);
            elem.getDom().classList.remove('chatlogNotify');
        })
    }

    /**
     * Generates events related to the provided object (category or message).
     * @param {ChatLogMessage|ChatLogCategory} obj 
     */
    generateEvents(obj) {
        const dom = obj.getDom();

        if(obj instanceof ChatLogCategory) {
            // Gotta use an event-based hover because a basic CSS :hover rule can't handle nested elements            
            dom.addEventListener('mouseover', e => {
                e.stopImmediatePropagation();
                dom.classList.add('chatlogCategory-hovered');
            });
            dom.addEventListener('mouseout', e => {
                e.stopImmediatePropagation();
                dom.classList.remove('chatlogCategory-hovered');
            });

            // Fold/unfold contents
            dom.addEventListener('click', e => {
                e.stopImmediatePropagation();
                dom.classList.toggle('chatlogCategory-hidden');
            });
        }
        
        for(const event in obj.events) {
            obj.events[event]();
        }
    }

    /**
     * Adds the message to the targeted channel.
     * @param {Data.ChatlogChannel} target the targeted channel
     * @param {object} message the data of the message to add
     * @param {ChatLogCategory|string|null} category the category to target
     */
    addMessage(target, message, category = null) {
        return this.add(target, { data: message, type: "message" }, category);
    }

    /**
     * Adds the category to the targeted channel.
     * @param {Data.ChatlogChannel} target the targeted channel
     * @param {object} message the data of the category to add
     * @param {ChatLogCategory|string|null} category the category to target
     */
    addCategory(target, data, category = null) {
        return this.add(target, { data: data, type: "category" }, category);
    }

    /**
     * Returns the provided channel's HTMLelement.
     * @param {Data.ChatlogChannel} target the channel to retrieve
     * @returns {HTMLElement|null} the related channel's HTMLElement
     */
    getChannel(target) {
        return document.querySelector('#chatlog-' + target);
    }
}
/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

/**
 * An ActionListener is an object that will listen for a specific action to be triggered by the player. 
 * Each time it is triggered, a counter on this object will be incremented, possibly executing some code.
 * When a counter reaches its maximum, another function can be executed.
 * ActionListeners are used for Trophies and Mastery Pathways progression.
 */
class ActionListener {
    constructor(action, maximum, onIncrement, onMaximum) {
        this.uid = uidGen();

        this.action = action;

        this.maximum = maximum;
        this.counter = 0;

        this.onIncrement = onIncrement;
        this.onMaximum = onMaximum;
    }

    /**
     * Increases the ActionListener's counter by one. Fires the onIncrement function. If the counter 
     * maxes out, fires the onMaximum function.
     */
    increment() {
        this.counter = Math.min(++this.counter, this.maximum);
        if(this.counter == this.maximum) {
            if(this.onMaximum) this.onMaximum();
            return;
        }
        this.onIncrement && this.onIncrement();
    }
}
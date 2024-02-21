/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class EnemyAction {
    constructor(props) {
        this.title = getValueFromObject(props, "title", "untitled");
        this.owner = getValueFromObject(props, "owner", null);
        if(!this.owner) throw new Error('Could not find owner of EnemyAction.');
        this.checker = getValueFromObject(props, "checker", function(){ return true; });
        this.behavior = getValueFromObject(props, "behavior", function(){ console.log('Empty enemy action!') });
    }

    build(index = null) {
        // Gotta use a != null check because 0 is false in JS rofl
        this.owner = (typeof index === 'number' && index >= 0) ? game.battle.enemies[index] : getEnemyById(this.owner().id);
    }
}
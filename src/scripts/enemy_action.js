/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

class EnemyAction {
    constructor(props) {
        this.title = getValueFromObject(props, "title", "untitled");
        this.owner = getValueFromObject(props, "owner", null);
        if(!this.owner) throw new Error('Could not find owner of EnemyAction.');
        this.checker = getValueFromObject(props, "checker", function(){ return true; });
        this.behavior = getValueFromObject(props, "behavior", function(){ console.log('Empty enemy action!') });
    }

    build() {
        this.owner = getEnemyById(this.owner().id);
    }
}
/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

class Eon {
    constructor(props) {
        this.title = getValueFromObject(props, 'title', 'untitled');
        this.id = getValueFromObject(props, 'id', 0);
        this.fragments = getValueFromObject(props, 'fragments', []);
        this.unlocked = getValueFromObject(props, 'unlocked', false);
    }
} 


/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class BattleBadge {
    constructor(props = {}) {
        const {
            name = 'untitled badge',
            css = '',
            tooltip = null
        } = props;

        this.uid = uidGen();
        this.name = name;
        this.css = css;
        this.tooltip = tooltip;
    }

    getHtml() {
        return '<div id="battlebadge-' + this.uid + '" class="specialEffect' + (this.css !== '' ? ' b-b_' + this.css : '') + '"></div>';
    }
}
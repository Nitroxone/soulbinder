/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class Tooltip {
    static DEFAULT_CSS = "tooltip framed bgRegularDark framedSmaller";

    constructor(props = {}) {
        this.domWhat = domWhat('tooltip');
        this.domWhatAnchor = domWhat('tooltipAnchor');
        this.offX = 0;
        this.offY = 0;
        this.func = 0;
        this.parent = 0;
        this.anchor = 'top';
        this.behavior = 'fade';
        this.linked = 0;
        this.closing = true;
        this.text = '';

        this.css = getValueFromObject(props, "css", []);
        this.css.forEach(token => {
            this.domWhat.classList.add(token);
        })
    }

    popup(obj) {
        this.domWhat.className = Tooltip.DEFAULT_CSS;
        this.css.forEach(token => {
            this.domWhat.classList.add(token);
        });
        
        let me = this;
        me.offX = 0;
        me.offY = 0;
        me.linked = 0;
        me.anchor = 'top';
        me.behavior = 'fade';
        me.closing = false;
        me.domWhatAnchor.style.display = 'block';
        for(const i in obj) {me[i] = obj[i];}
        me.refresh();
    }

    update() {
        const parentExists = domWhat(this.parent.id);
        if((this.closing || !parentExists)) {
            this.domWhatAnchor.style.display = 'none';
            this.domWhat.innerHTML = '';
            this.func = 0;
            this.parent = 0;
            this.anchor = 'top';
            this.behavior = 'fade';
            this.linked = 0;
        }
        else if(parentExists) {// tooltip is active and focused on an element
            // position and scale tooltip
            let x1=0, x2=0, y1=0, y2=0, s1=0, s2=1;
            let bounds = this.parent.getBoundingClientRect();

            //measure and fit in screen
            const dimensions = {
                top: this.domWhat.offsetTop,
                right: this.domWhat.offsetLeft + this.domWhat.offsetWidth,
                bottom: this.domWhat.offsetTop + this.domWhat.offsetHeight,
                left: this.domWhat.offsetLeft,
                width: this.domWhat.offsetWidth,
                height: this.domWhat.offsetHeight
            }

            let anchor = this.anchor;
            let behavior = this.behavior;
            let offX = this.offX;
            let offY = this.offY;
            let styleTransform = '';
            let styleTop = '';
            let styleLeft = '';

            for(let step = 0; step < 3 ; step++) {
                if(anchor == 'top') {
                    x1 = (bounds.left + bounds.right) / 2; x2 = x1 + offX;
                    y1 = bounds.top; y2 = y1 + offY;
                    styleTransform = 'translate(0, -100%)';
                    styleTop = 'auto';
                    styleLeft = '-50%';
                }
                else if(anchor == 'bottom') {
                    x1 = (bounds.left + bounds.right) / 2; x2 = x1 + offX;
                    y1 = bounds.bottom; y2 = y1 + offY;
                    styleTransform = 'translate(0,0)';
                    styleTop = 'auto';
                    styleLeft = '-50%';
                }
                else if(anchor == 'left') {
                    x1 = bounds.left; x2 = x1 + offX;
                    y1 = (bounds.top + bounds.bottom) / 2; y2 = y1 + offY;
                    styleTransform = 'translate(-100%, 0)';
                    styleTop = (-dimensions.height / 2) + 'px';
                    styleLeft = 'auto';
                }
                else if(anchor == 'right') {
                    x1 = bounds.right; x2 = x1 + offX;
                    y1 = (bounds.top + bounds.bottom) / 2; y2 = y1 + offY;
                    styleTransform = 'translate(0,0)';
                    styleTop = (-dimensions.height / 2) + 'px';
                    styleLeft = 'auto';
                }

                if(step == 0) { // toggle on the same axis
                    if(anchor == 'left' && x2 - dimensions.width < 0) {anchor = 'right'; offX = -offX;}
                    else if(anchor == 'right' && x2 + dimensions.width >= Game.ww) {anchor = 'left'; offX = -offX;}
                    else if(anchor == 'top' && y2 - dimensions.height < 0) {anchor = 'bottom'; offY = -offY;}
                    else if(anchor == 'bottom' && y2 + dimensions.height >= Game.wh) {anchor = 'top'; offY = -offY;}
                }
                else if(step == 1) { // still no room ? switch axis
                    if(anchor == 'left' && x2 - dimensions.width < 0) {anchor = 'bottom'; const tmp = offX; offX = offY; offY = tmp;}
                    else if(anchor == 'right' && x2 + dimensions.width >= Game.ww) { anchor = 'bottom'; const tmp = offX; offX = offY; offY = tmp;}
                    else if(anchor == 'top' && y2 - dimensions.height < 0) {anchor = 'right'; const tmp = offX; offX = offY; offY = tmp;}
                    else if(anchor == 'bottom' && y2 + dimensions.height >= Game.wh) {anchor = 'right'; const tmp = offX; offX = offY; offY = tmp;}
                }
                else { // stick to the sides of the screen
                    if(anchor == 'top' || anchor == 'bottom') {
                        if(x2 - dimensions.width / 2 < 0) x2 = dimensions.width / 2;
                        else if(x2 + dimensions.width / 2 >= Game.ww) x2 = Game.ww - dimensions.width / 2;
                    }
                    else if(anchor == 'left' || anchor == 'right') {
                        if(y2 - dimensions.height / 2 < 0) y2 = dimensions.height / 2;
                        else if(y2 + dimensions.height / 2 >= Game.wh) y2 = Game.wh - dimensions.height / 2;
                    }
                }
            }
            this.domWhat.style.transform = styleTransform;
            this.domWhat.style.top = styleTop;
            this.domWhat.style.left = styleLeft;

            var t = 1;
            const x = Math.round(x2);
            const y = Math.round(y2);

            this.domWhatAnchor.style.left = x + 'px';
            this.domWhatAnchor.style.top = y + 'px';
            if(this.closeOnMouseUp && Game.mouseUp) this.close();
        }
    }

    refresh() {
        if(this.parent) {
            this.text = this.func();
            this.domWhat.innerHTML = this.text;
        }
    }

    close() {
        this.closing = true;
    }
}
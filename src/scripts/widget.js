class Widget {
    constructor() {
        this.domWhat = domWhat('widget');
        this.domWhatAnchor = domWhat('widgetAnchor');
        this.offX = 0;
        this.offY = 0;
        this.timer = 0;
        this.func = 0;
        this.parent = 0;
        this.anchor = 'top';
        this.linked = 0;
        this.closing = false;
        this.closeInFrames = 0;
    }

    popup(obj) {
        Game.tooltip.close();
        this.offX = 0;
        this.offY = 0;
        this.closeOnMouseUp = false;
        this.closing = false;
        this.linked = 0;
        this.closeInFrames = 0;
        this.timer = 0;
        this.domWhatAnchor.style.display = 'block';
        for(const i in obj) {this[i] = obj[i];}
        this.func(this, this.linked);
    }

    update() {
        const self = this;
        const time = 3 // how many frames to open/close
        if(self.timer < time) self.timer++;
        if(self.timer == time && self.closing) {
            self.domWhatAnchor.style.display = 'none';
            self.domWhat.innerHTML = '';
            self.func = 0;
            self.parent = 0;
            self.anchor = 'top';
            self.linked = 0;
            console.log("Widget closed");
        }
        else if(self.parent) {// widget is active and focused on an element
            // position and scale widget
            let t = (self.timer / time);
            if(self.closing) t = 1 - t;
            t = (3 * Math.pow(t, 2) - 2 * Math.pow(t, 3));
            let x1=0, x2=0, y1=0, y2=0, s1=0, s2=1;
            let bounds = self.parent.getBoundingClientRect();

            //measure and fit in screen
            const dimensions = {
                top: self.domWhat.offsetTop,
                right: self.domWhat.offsetLeft + self.domWhat.offsetWidth,
                bottom: self.domWhat.offsetTop + self.domWhat.offsetHeight,
                left: self.domWhat.offsetLeft,
                width: self.domWhat.offsetWidth,
                height: self.domWhat.offsetHeight
            }

            let anchor = self.anchor;
            let behavior = 'pop';
            let offX = self.offX;
            let offY = self.offY;
            let styleTransform = '';
            let styleTop = '';
            let styleLeft = '';

            for(let step = 0; step < 3 ; step++) {// awkward way of doing this
                // pure CSS didn't go well.
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
            self.domWhat.style.transform = styleTransform;
            self.domWhat.style.top = styleTop;
            self.domWhat.style.left = styleLeft;

            const x = Math.round(t * x2 + (1 - t) * x1);
            const y = Math.round(t * y2 + (1 - t) * y1);

            let s = 1, o = 1;
            if(behavior == 'pop') s = (t * s2 + (1 - t) * s1);
            if(behavior == 'fade') o = t;
            //self.domWhatAnchor.style.transform = 'scale(' + s + ')';
            self.domWhatAnchor.style.opacity = String(o);
            self.domWhatAnchor.style.left = x + 'px';
            self.domWhatAnchor.style.top = y + 'px';
            if(self.closeOnMouseUp && Game.mouseUp) self.close();
        }
        if(self.closeInFrames) {
            self.closeInFrames--;
            if(self.closeInFrames == 0) self.close();
        }
    }

    refresh() {
        this.func(this, this.linked);
    }

    close(inFrames) {
        if(inFrames) {
            this.closeInFrames = inFrames;
        } else {
            this.timer = 0;
            this.closing = true;
        }
    }
}
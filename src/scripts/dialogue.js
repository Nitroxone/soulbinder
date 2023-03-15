class Dialogue {
    static n = 0;

    constructor() {
        this.domWhat = domWhat('dialogues');
        this.domWhat.innerHTML = '';
        Dialogue.n = 0;
        this.domWhat.classList.remove('on');
    }
    popup(func, classes, from) {
        //open a new dialogue containing text returned by func
        //func can have G.pushCallback() calls and can manipulate its one argument, representing the dialogue's element
        //"classes" is added to the dialogue's CSS classes
        //if an element "from" is specified, do some popupsquares

        game.tooltip.close();
        const outer = document.createElement('div');outer.className='fullCenteredOuter';outer.style.height='100%';outer.style.position='absolute';
        const inner = document.createElement('div');inner.className='fullCenteredInner';inner.style.textAlign='center';outer.appendChild(inner);

        const dialogueClasses = classes ? (' ' + classes) : '';

        const div = document.createElement('div');
        div.innerHTML = game.addButton({
            text: 'x', classes: 'frameless closeButton', onclick: function () {
                game.dialogue.close();
            }
        }) + '' + func(div);

        div.className = 'dialogue framed bgDark ' + classes + (classes.indexOf('noFade') == -1 ? ' fadeIn' : '');
        div.id = 'dialogue-' + Dialogue.n;
        inner.appendChild(div);
        this.domWhat.appendChild(outer);
        game.addCallbacks();
        if(Dialogue.n == 0) this.domWhat.classList.add('on');domWhat('foreground').style.display="block";
        if(from) console.log("Popup squares!");
        Dialogue.n++;
    }
    close(force) {
        let failed = true;
        // close the most recent dialogue
        if(Dialogue.n > 0) {
            if(force || !this.domWhat.lastElementChild.firstElementChild.firstElementChild.classList.contains('noClose')) { // bit gross honestly lol
                failed = false;
                game.tooltip.close();
                this.domWhat.removeChild(this.domWhat.lastChild);
                Dialogue.n--;
                if(Dialogue.n <= 0) {
                    this.domWhat.classList.remove('on');domWhat('foreground').style.display="none";
                }
            }

        }
        return failed;
    }
    forceClose() {
        game.dialogue.close(true);
    }
    getCloseButton(text) {
        return game.addButton({text:(text || 'Close'), classes:'frameless', onclick:function(){game.dialogue.close();}});
    }
}
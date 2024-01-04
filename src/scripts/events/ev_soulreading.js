function generateSoulreadingInterfaceEvents() {
    generateSoulreadingSoulmarkEvents();
}

function generateSoulreadingSoulmarkEvents() {
    game.soulwriting.sigil?.effects.forEach(eff => {
        const sm = getSoulmarkFromEffect(eff.effect);
        const dom = document.querySelector('#sm-' + sm.name + '-sr');
        var extractTimeout;

        dom.addEventListener('mousedown', (e) => {
            if(sm.canBeExtracted() && e.button === 0) {
                Sounds.Methods.playSound(Data.SoundType.SOULREAD_PROCESS);
                dom.querySelector('.srAnimatorProgress').style.width = '100%';
                extractTimeout = setTimeout(() => { // e.button === 0 checks that only a LEFT CLICK can trigger the timeout.
                    game.soulwriting.extractSoulmark(sm);
                    console.log('extracted ' + sm.name + '!');
                }, 1000);
            }
        });

        dom.addEventListener('mouseup', () => {
            clearTimeout(extractTimeout);
            game.soulwriting.cancelExtraction();
            dom.querySelector('.srAnimatorProgress').style.width = '0%';
        });

        dom.addEventListener('mouseenter', () => {
            clearTimeout(extractTimeout);
            game.soulwriting.cancelExtraction();
            dom.querySelector('.srAnimatorProgress').style.width = '0%';
        });

        dom.addEventListener('mouseleave', () => {
            clearTimeout(extractTimeout);
            game.soulwriting.cancelExtraction();
            dom.querySelector('.srAnimatorProgress').style.width = '0%';
        });
    });
}
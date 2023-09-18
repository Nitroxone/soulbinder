function generateSoulbindingInterfaceEvents() {
    generateSoulbindingItemEvents();
    generateSoulbindingObjectsEvents();
}

function generateSoulbindingItemEvents() {
    const unslotItem = document.querySelector('.sbItemContainer');

    if(unslotItem) unslotItem.addEventListener('contextmenu', e => {
        e.preventDefault();
        game.soulbinding.unslotItem();
        getSoulbindingItem(true);
        getSoulbindingObjects(true);
    });
}

function generateSoulbindingObjectsEvents() {
    const sigils = document.querySelectorAll('.soulbindingSigilInfo');
    const bind = document.querySelector('.sbBind');

    sigils.forEach(sigil => {
        if(sigil) {
            const sigilId = sigil.parentNode.id.slice(6);
            const sigilObj = game.soulbinding.item.sigil;
            console.log(sigilId);
            console.log(sigilObj);
            let unbind = document.querySelector('#unbind-' + sigilId);

            sigil.addEventListener('click', e => {
                const echo = sigil.querySelector('.echoTitle');
                const corruptedEcho = sigil.querySelector('.sigilCorruption > p:not(.name)');

                sigil.querySelectorAll('.sigilEffect').forEach(se => {
                    if(se.style.display === 'none') se.style.display = 'block';
                    else se.style.display = 'none';
                });
                if(corruptedEcho) {
                    if(corruptedEcho.style.display === 'none') corruptedEcho.style.display = 'block';
                    else corruptedEcho.style.display = 'none';
                }

                if(echo) {
                    const brs = sigil.querySelectorAll('.brContainer');
                    const eff = sigil.querySelector('.echoEffects');

                    brs.forEach(br => {
                        if(br.style.display === 'none') br.style.display = 'block';
                        else br.style.display = 'none';
                    });

                    if(eff.style.display === 'none') eff.style.display = 'block';
                    else eff.style.display = 'none';
                }
            });

            if(unbind) unbind.addEventListener('click', e => {
                game.soulbinding.unslotSigil(sigilObj);
                Sounds.Methods.playSound(Data.SoundType.SELECTOR_ON);
                Sounds.Methods.playSound(Data.SoundType.SOULBIND_UNSLOT);
            });
        }
    })

    if(bind) {
        bind.addEventListener('click', e => {
            game.soulbinding.slotSigil();
            Sounds.Methods.playSound(Data.SoundType.SELECTOR_ON);
            Sounds.Methods.playSound(Data.SoundType.SOULBIND_SLOT);
        });
    }
}
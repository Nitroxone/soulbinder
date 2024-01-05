function generateSwSoulmarksEvents() {
    const soulmarks = document.querySelectorAll('.swWriteList-single');

    soulmarks.forEach(sm => {
        sm.addEventListener('click', e => {
            const id = sm.id.slice(3);
            const slmrk = Config.Soulwriting.find(s => s.name == id);
            const extended = sm.querySelector('.extendedSoulmarkContainer');

            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
            if(game.soulwriting.selectedSlot !== 0) {
                Sounds.Methods.playSound(Data.SoundType.SOULWRITE_SLOT_IN);
                const slot = document.querySelector('#sws' + game.soulwriting.selectedSlot);
                if(game.soulwriting.getSoulmarkFromSelected() === slmrk) {
                    game.soulwriting.removeSoulmarkFromSelected();
                    removeSoulmarkAbrevFromSlot(slot);
                    sm.classList.toggle('selectedSoulmark');
                    return;
                } else if (game.soulwriting.soulmarks.includes(slmrk)) {
                    // unselect current before overloading
                    if(game.soulwriting.getSoulmarkFromSelected()) {
                        document.querySelector('#sm-' + game.soulwriting.getSoulmarkFromSelected().name).classList.remove('selectedSoulmark');
                    }

                    const index = game.soulwriting.getSoulmarkIndex(slmrk);
                    removeSoulmarkAbrevFromSlot(document.querySelector('#sws' + (index+1)));
                    game.soulwriting.soulmarks[index] = null;
                    game.soulwriting.addSoulmarkToSelected(slmrk);
                    addSoulmarkAbrevToSlot(slot, slmrk);
                } else {
                    const selected = game.soulwriting.getSoulmarkFromSelected();
                    if(selected) {
                        document.querySelector('#sm-' + selected.name).classList.remove('selectedSoulmark');
                    }
                    game.soulwriting.addSoulmarkToSelected(slmrk);
                    addSoulmarkAbrevToSlot(slot, slmrk);
                    sm.classList.toggle('selectedSoulmark');
                }
                return;
            }
            sm.classList.toggle('extendedSoulmark');
            if(!sm.classList.contains('extendedSoulmark')) {
                extended.innerHTML = '';
                extended.style.display = 'none';
            } else {
                extended.style.display = 'flex';
                let str = '';
                const regular = new Stat({effect: slmrk.effect, theorical: slmrk.getCurrent()});

                str += '<div><span style="color: #ffffff;">Base</span><span>' + regular.getFormatted({cssClass: 'swWriteList-effSub', noValue: true}) + '</span></div>';
                if(slmrk.isMastered()) str += '<div><span style="color: #ece2b6;">Stalwart</span><span>' + slmrk.critical.getFormatted({cssClass: 'swWriteList-effSub', noValue: true}) + '</span></div>';
                if(slmrk.isMastered()) str += '<div><span style="color: tomato;">Corrupt</span><span>' + slmrk.corrupted.getFormatted({cssClass: 'swWriteList-effSub', noValue: true}) + '</span></div>';

                extended.innerHTML = str;
            }
        });
    });
}

function generateSoulwritingInterfaceEvents() {
    const tabs = document.querySelectorAll('.soulwTab');
    const contents = document.querySelectorAll('.soulwContent');
    const slots = document.querySelectorAll('.swWriteSlot');
    const sigilVignetteSelector = document.querySelector('.swWrite-vignette');
    const soulwrite = document.querySelector('.swWrite-write');

    for(let i = 0; i < tabs.length; i++) {
        let tab = tabs[i];
        tab.addEventListener('click', e => {
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
            tabs[game.soulwriting.getCurrentTabIndex()].classList.remove('activeTab');
            game.soulwriting.switchTab(i);
            tab.classList.add('activeTab');
            contents.forEach(con => {
                con.style.display = 'none';
            });
            document.querySelector('#soulwcontent-' + game.soulwriting.currentTab).style.display = 'grid';
            if(tab.id === 'soulwtab-write') drawSoulwritingLines(true);
        });
    }

    generateSwSoulmarksEvents();

    slots.forEach(slot => {
        slot.addEventListener('click', e => {
            Sounds.Methods.playSound(Data.SoundType.SELECTOR_ON);
            const id = slot.id.slice(3);
            slots.forEach(s => {
                if(s.id.slice(3) !== id) s.classList.remove('swWriteSlotSelected');
            });
            slot.classList.toggle('swWriteSlotSelected');
            game.soulwriting.selectSlot(id);
        });
        slot.addEventListener('contextmenu', e => {
            Sounds.Methods.playSound(Data.SoundType.SELECTOR_OFF);
            e.preventDefault();
            const id = slot.id.slice(3);
            const slmrk = game.soulwriting.getSoulmarkAt(id);
            if(!slmrk) return;
            document.querySelector('#sm-' + slmrk.name).classList.remove('selectedSoulmark');
            game.soulwriting.unselectSoulmarkAt(id);
            removeSoulmarkAbrevFromSlot(slot)
        });
    });

    sigilVignetteSelector.addEventListener('click', e => {
        Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);

        if(document.querySelector('.sigilSelector')) {
            document.querySelector('.sigilSelector').remove();
            return;
        }

        const div = document.createElement('div');
        div.classList.add('sigilSelector');

        let str = '';

        str += '<h2 class="selectorTitle">Stone selector</h2>';
        str += '<h3 class="selectedTitle">' + game.soulwriting.icon.name + '</h3>';
        str += '<div class="divider"></div>';
        str += '<div class="selectorItems">';

        Icons.Methods.getAllUnlocked('sigils').forEach(sig => {
            str += '<div id="vignetteSigil-' + sig.icon + '" class="selectorItem' + (sig === game.soulwriting.icon ? ' vignetteSelected' : '') + '" style="background-image: url(\'css/img/sigils/' + sig.icon + '.png\')"></div>';
        })

        str += '</div>';

        str += '<div id="closeSigilSelector" class="closeWindowButton selectorClose">X</div>';

        div.innerHTML = str;

        div.querySelectorAll('.selectorItem').forEach(item => {
            item.addEventListener('click', e => {
                Sounds.Methods.playSound(Data.SoundType.SELECTOR);
                if(!(item.id === 'vignetteSigil-' + game.soulwriting.icon.icon)) {
                    const id = parseInt(item.id.slice(14));
                    const icon = Icons.Methods.findByIcon("sigils", id);

                    document.querySelector('#vignetteSigil-' + game.soulwriting.icon.icon).classList.remove('vignetteSelected');
                    item.classList.add('vignetteSelected');
                    document.querySelector('.sigilSelector .selectedTitle').textContent = icon.name;

                    game.soulwriting.selectIcon(icon);
                    document.querySelector('.swWrite-vignette').style.backgroundImage = 'url(\'css/img/sigils/' + game.soulwriting.icon.icon + '.png\')';
                }
            });
        });

        document.querySelector('.swWriteCrafting').appendChild(div);
        document.querySelector('#closeSigilSelector').addEventListener('click', e => {
            Sounds.Methods.playSound(Data.SoundType.TOOLTIP_HOVER);
            div.remove();
        });
    });

    soulwrite.addEventListener('click', e => {
        if(!game.soulwriting.isWriting && game.soulwriting.canWrite()) {
            Sounds.Methods.playSound(Data.SoundType.SOULWRITE_WRITE_WRITE);
            Sounds.Methods.playSound(Data.SoundType.SOULWRITE_PROCESS);
            const stalDiamond = document.querySelector('#swWrite-stalwart');
            const corrDiamond = document.querySelector('#swWrite-corrupt');
            stalDiamond.classList.remove('swStalwartAnim');
            corrDiamond.classList.remove('swCorruptAnim');

            game.soulwriting.writing();
            Sounds.Methods.playSound(Data.SoundType.SELECTOR);
            const slots = document.querySelectorAll('.swFilledSlot');
            const connectors = document.querySelectorAll('.swConnector');

            let delay = 0;
            slots.forEach(slot => {
                slot.style.animationDelay = delay + 's';
                slot.classList.add('swSlotAnim');
                setTimeout(() => {
                    Sounds.Methods.playSound(Data.SoundType.SOULWRITE_SLOT);
                }, delay*1000);
                setTimeout(() => {
                    Sounds.Methods.playSound(Data.SoundType.SOULWRITE_UNSLOT);
                }, delay*1000 + 1700);
                delay += 0.25;
            });
            delay = 0;
            connectors.forEach(conn => {
                conn.style.animationDelay = delay + 's';
                conn.classList.add('swConnectorAnim');
                delay += 0.25;
            });
            soulwrite.classList.add('swSoulwriting');

            Quanta.burst({
                canvas: document.querySelector('#canv-soulwrite'),
                color: Data.Color.PRECIOUS,
                amount: 300,
                particleSize: 5,
                duration: 4000,
                fadeAwayRate: 0,
                speed: {
                    x: () => { return (-2 + Math.random() * 5) },
                    y: () => { return (-4 + Math.random() * 10) }
                },
                delay: () => { return getRandomNumber(0, 100) },
            });

            setTimeout(() => {
                game.soulwriting.soulwrite();
                let dur = 0;
                slots.forEach(slot => {
                    slot.classList.remove('swSlotAnim');
                });
                connectors.forEach(conn => {
                    conn.classList.remove('swConnectorAnim');
                });
                soulwrite.classList.remove('swSoulwriting');
            }, 3000);
        }
    });

    addTooltip(document.querySelector('#swWrite-stalwart'), function(){
        let str = '';

        str += '<div class="stcoSwTooltip">';
        str += '<h3 class="stcoHeader" style="color: #ece2b6">Stalwart chance</h3>';
        str += '<div class="divider"></div>';
        str += '<p>Stalwart soulmarks unlock additional positive effects.</p>'
        str += '</div>';

        return str;
    }, {offY: -8});
    addTooltip(document.querySelector('#swWrite-corrupt'), function(){
        let str = '';

        str += '<div class="stcoSwTooltip">';
        str += '<h3 class="stcoHeader" style="color: tomato">Corrupt chance</h3>';
        str += '<div class="divider"></div>';
        str += '<p>Corrupt soulmarks unlock additional negative effects.</p>'
        str += '</div>';

        return str;
    }, {offY: -8});
}
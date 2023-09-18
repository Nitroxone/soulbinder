function generateAstralForgeScreenButtonEvents(forgeItem) {
    // SUBSTRATE AND ALTER BUTTONS
    const alterButton = document.querySelector('.alterButton');
    alterButton.addEventListener('click', e => {
        launchAlteration(forgeItem);
    });

    const consumesubstrateButton = document.querySelector('.consumesubstrateButton');
    consumesubstrateButton.addEventListener('click', e => {
        consumesubstrateButton.classList.toggle('selected');
        forgeItem.consumeSubstrate = !forgeItem.consumeSubstrate;
    });

    const revertAlterationButton = document.querySelector('.revertAlterationButton');
    revertAlterationButton.addEventListener('click', e => {
        launchReversion(forgeItem);
    });
}

function generateAstralForgeScreenEvents(forgeItem, skipShards = false, skipEffects = false, skipHistory = false, skipCometDusts = false) {
    if(!skipShards) {
        document.querySelectorAll('.shardSelectable').forEach(sha => {
            sha.addEventListener('click', e => {
                const shard = getInventoryResourceById(Number(sha.id));

                if(forgeItem.selectedShard && forgeItem.selectedShard.name === shard.name) {
                    forgeItem.clearShard();
                } else if(forgeItem.selectedShard) {
                    unselectCurrentShard(forgeItem);
                    forgeItem.clearShard();
                    forgeItem.selectShard(shard);
                } else {
                    forgeItem.selectShard(shard);
                }

                const overloadWindow = document.querySelector('.astralForge-overloadWindow');
                if(overloadWindow) overloadWindow.remove();

                sha.classList.toggle('shardSelected');
                console.log(forgeItem.selectedShard);
            });
        });
        // OVERLOAD EFFECT SELECTION
        document.getElementById(what(game.player.inventory.resources, "prismatic time shard").id).addEventListener('click', e => {
            const div = document.createElement('div');

            const available = forgeItem.getAvailableOverloadEffects();
            console.log('Selected overload: ' + forgeItem.selectedOverload);
            let str = '';
            str += '<h3>Overload Effect Selection</h3>';
            str += '<div class="divider"></div>';
            available.forEach(eff => {
                str += '<p id="' + eff + '"' + (forgeItem.selectedOverload === eff ? ' class="selectedOverload"' : '') + '>' + capitalizeFirstLetter(eff) + ' <span class="theoricalval" style="margin-left: 0.2rem;">[' + getOverValueFromConfig(eff) + ']</span>' + '</p>';
            });

            div.innerHTML = str;
            div.classList.add('astralForge-overloadWindow', 'tooltipSpawn');

            if(forgeItem.selectedShard && forgeItem.selectedShard.name.toLowerCase() === "prismatic time shard") {
                document.querySelector('.astralForge-effects').appendChild(div);
                document.querySelectorAll('.astralForge-overloadWindow > p').forEach(line => {
                    line.addEventListener('click', e => {
                        forgeItem.selectedOverload = line.id;
                        console.log('Selected overload: ' + forgeItem.selectedOverload);
                        e.stopImmediatePropagation();
                        document.querySelector('.astralForge-overloadWindow').remove();
                        getAstralForgeShards(forgeItem.selectedOverload, true);
                        generateAstralForgeScreenEvents(forgeItem, false, true, true, false);
                        unselectCurrentShard(forgeItem);
                        unselectCurrentCometDust(forgeItem);
                        generateAstralForgeScreenButtonEvents(forgeItem);
                    });
                });
                document.querySelector('.astralForge-overloadWindow').addEventListener('contextmenu', e => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    document.querySelector('.astralForge-overloadWindow').remove();
                });
            }
        });
    }
    if(!skipEffects) document.querySelectorAll('.effectSelectable').forEach(eff => {
        eff.addEventListener('click', e => {
            const effect = eff.querySelector('.astralEffectContent').textContent.toLowerCase();

            if(forgeItem.selectedEffect && forgeItem.selectedEffect === effect) {
                forgeItem.clearEffect();
            } else if(forgeItem.selectedEffect) {
                unselectCurrentEffect(forgeItem);
                forgeItem.clearEffect();
                forgeItem.selectEffect(effect);
            } else {
                forgeItem.selectEffect(effect);
            }

            eff.classList.toggle('effectSelected');
            console.log(forgeItem.selectedEffect);
        });
    });
    if(!skipHistory) document.querySelectorAll('.astralForgeHistory-single').forEach(hist => {
        hist.addEventListener('click', e => {
            const bookmark = findAstralForgeBookmarkByID(forgeItem, hist.id);

            if(forgeItem.selectedBookmark && forgeItem.selectedBookmark === bookmark) {
                forgeItem.clearSelectedBookmark();
            } else if(forgeItem.selectedBookmark) {
                unselectCurrentBookmark(forgeItem);
                forgeItem.clearSelectedBookmark();
                forgeItem.selectBookmark(bookmark);
            } else {
                forgeItem.selectBookmark(bookmark);
            }

            hist.classList.toggle('bookmarkSelected');
            console.log(forgeItem.selectedBookmark);
        });
    });
    if(!skipCometDusts) document.querySelectorAll('.dustSelectable').forEach(comdus => {
        comdus.addEventListener('click', e => {
            const dust = getInventoryResourceById(Number(comdus.id));

            if(forgeItem.selectedCometDust && forgeItem.selectedCometDust === dust) {
                forgeItem.clearSelectedCometDust();
            } else if(forgeItem.selectedCometDust) {
                unselectCurrentCometDust(forgeItem);
                forgeItem.clearSelectedCometDust();
                forgeItem.selectCometDust(dust);
            } else {
                forgeItem.selectCometDust(dust);
            }

            comdus.classList.toggle('cometdustSelected');
            console.log(forgeItem.selectedCometDust);
        });
    });
}

function launchAlteration(forgeItem) {
    const attemptOutcome = forgeItem.canLaunchAlteration();
    if(attemptOutcome === Data.AlterationError.NONE) {
        clearAnimationClasses();
        console.log('Altering...');
        const alterationOutcome = forgeItem.alterEffect(forgeItem.selectedShard, forgeItem.selectedEffect);

        getAstralForgeEffects(forgeItem, true);

        updateAstralForgeShardCounter(forgeItem.selectedShard);
        if(forgeItem.selectedCometDust) updateAstralForgeCometDustCounter(forgeItem.selectedCometDust);

        if(forgeItem.selectedShard.amount === 0) {
            unselectCurrentShard(forgeItem);
            forgeItem.clearShard();
        }

        getAstralForgeHistory(forgeItem, true)
        if(forgeItem.selectedEffect) unselectCurrentEffect(forgeItem);

        generateAstralForgeScreenEvents(forgeItem, true, false, false, true);
        unselectCurrentBookmark(forgeItem);

        getAstralForgeItemBox(forgeItem, true);

        astralForgeEffectAnimate(forgeItem);
        forgeItem.clearAnimationQueue();
    } else {
        console.info(attemptOutcome);
        addAstralForgeNotification(attemptOutcome);
    }
}

function launchReversion(forgeItem) {
    const attemptOutcome = forgeItem.canLaunchReversion();
    if(attemptOutcome === Data.ReversionError.NONE) {
        forgeItem.revertAlteration(forgeItem.selectedBookmark);

        getAstralForgeEffects(forgeItem, true);

        updateAstralForgeCometDustCounter(forgeItem.selectedCometDust);

        if(forgeItem.selectedCometDust.amount === 0) {
            unselectCurrentCometDust(forgeItem);
            forgeItem.clearSelectedCometDust();
        }

        getAstralForgeHistory(forgeItem, true)
        if(forgeItem.selectedEffect) unselectCurrentEffect(forgeItem);

        generateAstralForgeScreenEvents(forgeItem, true, false, false, true);
        unselectCurrentBookmark(forgeItem);
        forgeItem.clearSelectedBookmark();
    } else {
        console.info(attemptOutcome);
    }
}

/**
 * Spawns a floating tooltip on screen based on the provided Item's data.
 * @param {Item|array} item the Item data to fill the tooltip with
 * @param {HTMLElement} fromExisting the HTML element the tooltip should be spawned at
 */
function spawnTooltip(item, fromExisting = null) {
    //console.log(item);
    const base = '<div id="floating-' + item.id +'" class="tooltip framed bgDark tooltipSpawn"><div id="close-' + item.id + '" class="closeWindowButton selectorClose">X</div>';

    const tooltip = document.createElement('div');
    if(item instanceof Weapon) tooltip.innerHTML = base + getWeaponTooltip(item, null, true) + '</div>';
    else if(item instanceof Armor) tooltip.innerHTML = base + getArmorTooltip(item, null, true) + '</div>';
    else if(item instanceof Sigil) tooltip.innerHTML = base + getSigilTooltip(item, null) + '</div>';
    else if(item instanceof Resource) tooltip.innerHTML = base + getResourceTooltip(item, null) + '</div>';
    else if(item instanceof Trinket) tooltip.innerHTML = base + getTrinketTooltip(item, null, true) + '</div>';
    else if(item instanceof EquipmentSet) tooltip.innerHTML = base + getSetTooltip(item) + '</div>';
    else if(item instanceof Consumable) tooltip.innerHTML = base + getConsumableTooltip(item) + '</div>';
    else if(item[0] === 'bonuses') tooltip.innerHTML = base + getStriderBonusesTooltip(item[1]) + '</div>';
    else if(item[0] === 'knapsack') tooltip.innerHTML = base + getDungeonKnapsack() + '</div>';
    // Same position as hovered tooltip, but positioned in such way that it will cut the mouse off the hover event


    let tooltipPos = {
        top: domWhat('tooltipAnchor').offsetTop - 75 + 'px',
        left: domWhat('tooltipAnchor').offsetLeft + domWhat('tooltip').offsetLeft + 'px'
    }
    if(fromExisting) {
        tooltipPos = {
            top: fromExisting.getBoundingClientRect().top + 'px',
            left: fromExisting.getBoundingClientRect().left - 50 + 'px'
        }
    }

    tooltip.style.position = "absolute";
    tooltip.style.top = tooltipPos.top;
    tooltip.style.left = tooltipPos.left;

    tooltip.addEventListener('mousedown', function(e) {
        var moving = true;

        var initX = e.clientX;
        var initY = e.clientY;

        var initElemX = tooltip.offsetLeft;
        var initElemY = tooltip.offsetTop;

        document.addEventListener('mousemove', function(e){
            if(!moving) return;

            var currentX = e.clientX;
            var currentY = e.clientY;

            var currentElemX = initElemX + currentX - initX;
            var currentElemY = initElemY + currentY - initY;

            tooltip.style.left = currentElemX + 'px';
            tooltip.style.top = currentElemY + 'px';
        });

        document.addEventListener('mouseup', function(e) {
            moving = false;
        })
    })
    tooltip.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        Sounds.Methods.playSound(Data.SoundType.TOOLTIP_CLOSE);
        tooltip.remove();
    });
    tooltip.querySelector('#close-' + item.id).addEventListener('click', function(e) {
        Sounds.Methods.playSound(Data.SoundType.TOOLTIP_CLOSE);
        tooltip.remove();
    })

    if(item[0] === 'bonuses') {
        const strider = item[1];
        const detailsToggler = tooltip.querySelector('.btToggler-details');
        const extraToggler = tooltip.querySelector('.btToggler-extra');
        const echoesToggler = tooltip.querySelector('.btToggler-echoes');
        const equipmentToggler = tooltip.querySelector('.btToggler-equipment');

        generateBonusesTooltipListEvents(tooltip);
        if(detailsToggler && extraToggler && echoesToggler) {
            var extra = false;
            var echoes = false;
            var details = false;
            var equipment = false;

            var echoesList = strider.echoes;

            detailsToggler.addEventListener('click', e => {
                tooltip.querySelectorAll('.btNumber').forEach(bt => {
                    bt.classList.toggle('show-ib');
                });
                detailsToggler.classList.toggle('off');
                details = !details;
                Sounds.Methods.playSound(Data.SoundType.SELECTOR);
            });
            extraToggler.addEventListener('click', e => {
                if(details) detailsToggler.dispatchEvent(new Event('click'));

                extra = !extra;
                tooltip.querySelector('.bonusesTooltip-bonuses').innerHTML = getStriderBonusesList(generateBonusesTable({bonuses: strider.bonuses, noExtra: extra, noEchoes: echoes, noEquipment: equipment}), strider.echoes);

                generateBonusesTooltipListEvents(tooltip);
                extraToggler.classList.toggle('off');
                Sounds.Methods.playSound(Data.SoundType.SELECTOR);
            });
            echoesToggler.addEventListener('click', e => {
                if(details) detailsToggler.dispatchEvent(new Event('click'));

                echoes = !echoes;
                echoesList = echoes ? [] : strider.echoes;
                tooltip.querySelector('.bonusesTooltip-bonuses').innerHTML = getStriderBonusesList(generateBonusesTable({bonuses: strider.bonuses, noExtra: extra, noEchoes: echoes, noEquipment: equipment}), echoesList);
                
                generateBonusesTooltipListEvents(tooltip);
                echoesToggler.classList.toggle('off');
                Sounds.Methods.playSound(Data.SoundType.SELECTOR);
            });
            equipmentToggler.addEventListener('click', e => {
                if(details) detailsToggler.dispatchEvent(new Event('click'));

                equipment = !equipment;
                tooltip.querySelector('.bonusesTooltip-bonuses').innerHTML = getStriderBonusesList(generateBonusesTable({bonuses: strider.bonuses, noExtra: extra, noEchoes: echoes, noEquipment: equipment}), strider.echoes);
                
                generateBonusesTooltipListEvents(tooltip);
                equipmentToggler.classList.toggle('off');
                Sounds.Methods.playSound(Data.SoundType.SELECTOR);
            });
        }
    }

    // IF ASTRAL FORGE COMPATIBLE, ADD ASTRAL FORGE MODIFICATIONS TOOLTIP EVENT
    if(item instanceof Weapon || item instanceof Armor || item instanceof Trinket) {
        if(item.astralForgeItem.isModified() || item.hasSigil()) {
            addTooltip(tooltip.querySelector('.editedIcon'), function(){
                return getItemAlterationsTooltip(item)
            }, {offY: -8});
            tooltip.querySelector('.editedIcon').addEventListener('contextmenu', e => {
                e.preventDefault();
                e.stopImmediatePropagation();
            })
        }
    }

    document.body.appendChild(tooltip);
    return tooltip;
}

function addTooltip(element, func, object, tooltipProps) {
    const t = new Tooltip(tooltipProps);

    element.addEventListener('mouseover', () => {
        t.func = func;
        t.parent = element;
        t.popup(object);

        t.update();
        t.update();
        t.update();
        if(game.particlesTooltipCanvasItem) getTooltipParticlesCanvas(game.particlesTooltipCanvasItem);
    });
    element.addEventListener('mouseout', () => {
        t.close();

        t.update();
        t.update();
        t.update();

        if(game.particlesTooltipCanvasInterval) clearInterval(game.particlesTooltipCanvasInterval);
        if(game.particlesTooltipCanvasItem) game.particlesTooltipCanvasItem = null;
    })
    element.addEventListener('DOMNodeRemoved', () => {
        t.close();

        t.update();
        t.update();
        t.update();

        if(game.particlesTooltipCanvasInterval) clearInterval(game.particlesTooltipCanvasInterval);
        if(game.particlesTooltipCanvasItem) game.particlesTooltipCanvasItem = null;
    })
}
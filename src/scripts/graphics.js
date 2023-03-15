function spawnTooltip(item) {
    const base = '<div id="floating-' + item.id +'" class="tooltip framed bgDark">'
    const tooltip = document.createElement('div');
    if(item instanceof Weapon) {
        tooltip.innerHTML = base + getWeaponTooltip(item) + '</div>';
    }
    tooltip.style.position = "absolute";
    tooltip.style.top = tooltip.offsetTop + 'px';
    tooltip.style.left = tooltip.offsetLeft + 'px';

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
        let audio = new Audio('sounds/ui/spawntooltip.wav');
        audio.volume = 0.2;
        audio.play();
        tooltip.remove();
    })

    document.body.appendChild(tooltip);
}

function getWeaponTooltip(weapon, asResult = null) {
    let str = asResult ? '<h3 class="fancyTitle">Output</h3><div class="divider"></div>' : '';
    str += '<div class="info">';
    str += '<div id="iconcloud-' + weapon.id + '" class="iconcloud' + capitalizeFirstLetter(weapon.rarity) +'"><div class="thing standalone ' + getIconClasses() + '">' + getIconStr(weapon, null, null) + '</div>';
    str += '<div class="fancyText infoAmount onLeft">' + (asResult ? asResult.result_amount : '') + '</div></div>';
    str += '<div class="fancyText barred infoTitle" style="color: ' + getRarityColorCode(weapon.rarity) + '">' + weapon.name + '</div>';
    str += '<div class="fancyText barred">' + capitalizeFirstLetter(weapon.rarity) + '</div>';
    str += '<div class="fancyText barred">' + capitalizeFirstLetter(weapon.weight) + ' ' + capitalizeFirstLetter(weapon.type) + '</div>';
    str += '<div class="infoDesc">';

    str += '<div class="par"></div>';
    str += '<table class="statsTable"><tbody>';
    str += '<tr><td>Sharpness</td><td>' + weapon.pdmg[0] + '-' + weapon.pdmg[1] + '</td></tr>';
    str += '<tr><td>Withering</td><td>' + weapon.mdmg[0] + '-' + weapon.mdmg[1] + '</td></tr>';
    str += '<tr><td>Block</td><td>' + weapon.block + '<span class="theoricalval">[' + weapon.t_block[0] + '-' + weapon.t_block[1] +']</span>' + '</td></tr>';
    str += '<tr><td>Effort</td><td>' + weapon.effort + '<span class="theoricalval">[' + weapon.t_effort[0] + '-' + weapon.t_effort[1] +']</span>' + '</td></tr>';
    str += '<tr><td>Crit. chance</td><td>' + weapon.crit_luk + '%' + '<span class="theoricalval">[' + weapon.t_crit_luk[0] + '-' + weapon.t_crit_luk[1] +']</span>' + '</td></tr>';
    str += '<tr><td>Crit. DMG</td><td>' + weapon.crit_dmg + '<span class="theoricalval">[' + weapon.t_crit_dmg[0] + '-' + weapon.t_crit_dmg[1] +']</span>' + '</td></tr>';
    str += '<tr><td>Bleed</td><td>' + weapon.bleed[0] + ' DMG' + '<span class="theoricalval">[' + weapon.t_bleed[0][0] + '-' + weapon.t_bleed[0][1] +']</span>' + '<br>' + weapon.bleed[1] + ' round(s)'+ '<span class="theoricalval">[' + weapon.t_bleed[1][0] + '-' + weapon.t_bleed[1][1] + ']</span>' + '<br>' + (weapon.bleed[2] ? 'Curable' : 'Non-curable') + '</td></tr>';
    str += '<tr><td>Poison</td><td>' + weapon.poison[0] + ' DMG' + '<span class="theoricalval">[' + weapon.t_poison[0][0] + '-' + weapon.t_poison[0][1] +']</span>' + '<br>' + weapon.poison[1] + ' round(s)' + '<span class="theoricalval">[' + weapon.t_poison[0][0] + '-' + weapon.t_poison[0][1] +']</span>' + '<br>' + (weapon.poison[2] ? 'Curable' : 'Non-curable') + '</td></tr>';
    str += '<tr><td>Range</td><td>' + getRangeString(weapon.range) + '</td></tr>';
    str += '</tbody></table>';
    str += '<div class="par"></div>';

    // sockets
    str += '<div class="divider"></div>';
    for(let i = 0; i < weapon.sockets.length; i++) {
        //str += '<div class="par bulleted">' + getSmallThing(weapon.sockets[i], null) + '</div>'; //TODO : add detailed effects
        str += getRuneDetails(weapon.sockets[i]);
    }
    for(let i = 0; i < weapon.sockets_free; i++) {
        str += '<div class="par bulleted">Empty slot</div>';
    }

    // desc
    str += '<div class="divider"></div>';
    str += '<div class="par">"' + weapon.desc + '"</div>';
    str += '</div>';

    
    return str;
}

function getRuneDetails(rune) {
    let str = '<div class="runeInfo">';
    str += '<div class="runeTitle">' + getSmallThingNoIcon(rune, null) + '</div>';
    rune.effects.forEach(effect => {
        str += '<div class="runeEffect"' + (effect.critical ? ' style="font-weight:bold; color:'+ Data.Color.GOLD +'; font-style:italic;"' : '') + '>' + (effect.value > 0 ? '+ ' : effect.value < 0 ? '- ' : '') + (effect.value == 0 ? '' : Math.abs(effect.value)) + ' ' + capitalizeFirstLetter(effect.effect) + '<span class="theoricalval">[' + effect.theorical[0] + '-' + effect.theorical[1] + ']</span>' + '</div>';
    });
    if(rune.isCritical) {
        rune.critical.forEach(effect => {
            str += '<div class="runeEffect"' + ' style="font-family:\'RobotoBold\'; color:'+ Data.Color.GOLD +';"' + '><span style="font-family:Roboto">' + (effect.value > 0 ? '+ ' : effect.value < 0 ? '- ' : '') + '</span>' + (effect.value == 0 ? '' : Math.abs(effect.value)) + ' ' + capitalizeFirstLetter(effect.effect) + '<span class="theoricalval">[' + effect.theorical[0] + '-' + effect.theorical[1] + ']</span>' + '</div>';
        });
    }
    if(rune.isCorrupt) {
        rune.corrupt.forEach(effect => {
            str += '<div class="runeEffect"' + ' style="font-weight:bold; color:'+ Data.Color.CORRUPT +';"' + '><span style="font-weight:normal">' + (effect.value > 0 ? '+ ' : effect.value < 0 ? '- ' : '') + '</span>' + (effect.value == 0 ? '' : Math.abs(effect.value)) + ' ' + capitalizeFirstLetter(effect.effect) + '<span class="theoricalval">[' + effect.theorical[0] + '-' + effect.theorical[1] + ']</span>' + '</div>';
        });
    }
    rune.echoes.forEach(echo => {
        str += '<div class="runeCorruption">';
        str += '<p class="name">' + echo.name +'</p>';
        str += '<p>' + echo.desc +'</p>'
        str += '</div>';
    })
    str += '</div>';

    return str;
}

function addTooltip(element, func, object) {
    // adds a tooltip to an element.
    // when the mouse hovers over the element, a tooltip is displayed, populated by the func (which must return an HTML code string).
    const t = new Tooltip();
    AddEvent(element, 'mouseover', function(element, func, tooltip, object) {
        return function(e) {
            tooltip.func = func;
            tooltip.parent = element;
            tooltip.popup(object);
            
            tooltip.update();
            tooltip.update();
            tooltip.update();
            if(this.particlesTooltipCanvasItem) this.getTooltipParticlesCanvas(this.particlesTooltipCanvasItem);
        };
    }(element, func, t, object || {}));
    AddEvent(element, 'mouseout', function(element, func, tooltip) {
        return function(e) {
            tooltip.close();
            
            tooltip.update();
            tooltip.update();
            tooltip.update();

            if(this.particlesTooltipCanvasInterval) clearInterval(this.particlesTooltipCanvasInterval);
            if(this.particlesTooltipCanvasItem) this.particlesTooltipCanvasItem = null;
        };
    }(element, func, t));
    AddEvent(element, 'DOMNodeRemoved', function(element, func, tooltip) {
        return function(e) {
            tooltip.close();

            tooltip.update();
            tooltip.update();
            tooltip.update();

            if(this.particlesTooltipCanvasInterval) clearInterval(this.particlesTooltipCanvasInterval);
            if(this.particlesTooltipCanvasItem) this.particlesTooltipCanvasItem = null;
        };
    }(element, func, t));

}

function drawWeaponInventory(weapons) {
    let str = '';
    for(let i = 0; i < weapons.length; i++) {
        let me = weapons[i];
        str += '<div id="res-' + me.id + '" class="res thing wide1" style="display: inline-block;">';
        str += '<div id="res-icon-' + me.id + '" class="icon double" style="' + getIcon(me.icon) + '"></div>';
        str += '<div id="res-over-' + me.id + '" class="overlay" style="border: 1px solid ' + getRarityColorCode(weapons[i].rarity) + '"></div>';
        str += '<div id="res-amount-' + me.id + '" class="amount"></div>';
        str += '</div>';
    }
    domWhat('res-cat-weapons').innerHTML = str;
    for(let i = 0; i < weapons.length; i++) {
        let me = weapons[i];
        // Add tooltip
        addTooltip(domWhat('res-' + me.id), function(){
            return getWeaponTooltip(game.inventory.getItemFromId(Data.ItemType.WEAPON, me.id));
        }, {offY: -8});
        // Spawn tooltip and play sound on click
        domWhat('res-' + me.id).addEventListener('click', function(){
            let audio = new Audio('sounds/ui/spawntooltip.wav');
            audio.volume = 0.2;
            audio.play();
            spawnTooltip(me);
        });
        // Play sound on hover
        domWhat('res-' + me.id).addEventListener('mouseover', function(){
            let audio = new Audio('sounds/ui/hovertooltip.wav');
            audio.volume = 0.5;
            audio.playbackRate = 2;
            audio.play();
        })
    }
}


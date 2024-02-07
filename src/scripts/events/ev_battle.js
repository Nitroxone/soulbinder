function generateBattleCommandsEvents() {
    const battle = game.battle;
    const current = battle.currentPlay;
    const atk = document.querySelector('.battle-actionAtk');
    const def = document.querySelector('.battle-actionDef');
    const mov = document.querySelector('.battle-actionMov');
    const ski = document.querySelector('.battle-actionSki');

    const wpns = document.querySelectorAll('.battle-weaponIcon');
    wpns.forEach(wpn => {
        wpn.addEventListener('click', e => {
            e.stopPropagation();

            const weapon = getEquippedWeaponById(current, Number(wpn.id.substring(5)));
            if(current.stamina < weapon.effort) {
                console.log('Not enough stamina.');
                addBattleNotification(current.name + '\'s stamina is too low to use ' + weapon.name + '.');
            } else {
                if(battle.action != Data.BattleAction.ATTACK) {
                    battleCommandsCancelCurrent();
                    battle.action = Data.BattleAction.ATTACK;
                    battle.selectedWeapon = weapon;
                    console.log('Preparing attack with ' + battle.selectedWeapon.name);
                    atk.classList.add('battle-actionSelected');
                    wpn.classList.add('battle-weaponSelected');
                    battleAttackPickTarget();
                } else if (battle.action === Data.BattleAction.ATTACK && battle.selectedWeapon !== weapon) {
                    battleCommandsCancelCurrent();
                    battleSelectionRemoveHighlights();
                    document.querySelectorAll('.battle-weaponIcon').forEach(wpn => {wpn.classList.remove('battle-weaponSelected');})
                    battle.action = Data.BattleAction.ATTACK;
                    battle.selectedWeapon = weapon;
                    wpn.classList.add('battle-weaponSelected');
                    console.log('Preparing attack with ' + battle.selectedWeapon.name);
                    battleAttackPickTarget();
                }
                else battleCommandsCancelCurrent();
            }
        });
    })

    atk.addEventListener('click', e => {
        wpns[0].dispatchEvent(new Event('click'));
    });
    def.addEventListener('click', e => {
        console.log('blocking');
        current.applyBlocking();
        battle.finishTurn();
    });
    mov.addEventListener('click', e => {
        if(battle.action != Data.BattleAction.MOVE) {
            battleCommandsCancelCurrent();
            battle.action = Data.BattleAction.MOVE;
            mov.classList.add('battle-actionSelected');
            console.log('Moving...');
            battleMovePickTarget();
        }
        else battleCommandsCancelCurrent();
    });
    ski.addEventListener('click', e => {
        console.log('skipping');
        battle.finishTurn();
    });
}

function battleAttackPickTarget() {
    const battle = game.battle;
    const front = document.querySelector('#b-enemy-front');
    const middle = document.querySelector('#b-enemy-middle');
    const back = document.querySelector('#b-enemy-back');

    if(!battle.selectedWeapon) return;

    // HIGHLIGHTING TARGETS
    battle.selectedWeapon.range[0] ? front.classList.add('battle-target') : front.classList.remove('battle-target');
    battle.selectedWeapon.range[1] ? middle.classList.add('battle-target') : middle.classList.remove('battle-target');
    battle.selectedWeapon.range[2] ? back.classList.add('battle-target') : back.classList.remove('battle-target');

    front.addEventListener('click', e => {
        if(battle.selectedWeapon.range[0]) {
            battle.target.push(battle.enemies[2]);
            if(battle.selectedWeapon.weight === Data.WeaponWeight.HEAVY) {
                if(battle.selectedWeapon.range[1]) battle.target.push(battle.enemies[1]);
                if(battle.selectedWeapon.range[2]) battle.target.push(battle.enemies[0]);
            }
            console.log('Attacking: ');
            battle.target.forEach(tar => { console.log(tar.name) });
            battle.executeAttack();
        }
    });
    middle.addEventListener('click', e => {
        if(battle.selectedWeapon.range[1]) {
            battle.target.push(battle.enemies[1]);
            if(battle.selectedWeapon.weight === Data.WeaponWeight.HEAVY) {
                if(battle.selectedWeapon.range[0]) battle.target.push(battle.enemies[2]);
                if(battle.selectedWeapon.range[2]) battle.target.push(battle.enemies[0]);
            }
            console.log('Attacking: ');
            battle.target.forEach(tar => { console.log(tar.name) });
            battle.executeAttack();
        }
    });
    back.addEventListener('click', e => {
        if(battle.selectedWeapon.range[2]) {
            battle.target.push(battle.enemies[0]);
            if(battle.selectedWeapon.weight === Data.WeaponWeight.HEAVY) {
                if(battle.selectedWeapon.range[1]) battle.target.push(battle.enemies[1]);
                if(battle.selectedWeapon.range[0]) battle.target.push(battle.enemies[2]);
            }
            console.log('Attacking: ');
            battle.target.forEach(tar => { console.log(tar.name) });
            battle.executeAttack();
        }
    });
}

function battleSkillPickTarget() {
    const battle = game.battle;
    const skill = battle.selectedSkill;

    let selector;

    battleSelectionRemoveHighlights();

    selector = skill.targets.allies.charAt(0) == '@' ? 'battle-skillTargetMultiple' : 'battle-skillTargetSingle';
    if(skill.targets.allies.includes('1')) document.querySelector('#b-hero-front').classList.add(selector);
    if(skill.targets.allies.includes('2')) document.querySelector('#b-hero-middle').classList.add(selector);
    if(skill.targets.allies.includes('3')) document.querySelector('#b-hero-back').classList.add(selector);

    selector = skill.targets.enemies.charAt(0) == '@' ? 'battle-skillTargetMultiple' : 'battle-skillTargetSingle';
    if(skill.targets.enemies.includes('1')) document.querySelector('#b-enemy-front').classList.add(selector);
    if(skill.targets.enemies.includes('2')) document.querySelector('#b-enemy-middle').classList.add(selector);
    if(skill.targets.enemies.includes('3')) document.querySelector('#b-enemy-back').classList.add(selector);

    // Highlight Caster's position if no target at all but caster effects exist
    if(canCastSkillOnSelf(skill)) {
        document.querySelector('#b-hero-' + battle.getCurrentNPCPos().toLowerCase()).classList.add('battle-skillTargetSingle');
    } else {
        document.querySelector('#b-hero-' + battle.getCurrentNPCPos().toLowerCase()).classList.remove('battle-skillTargetSingle', 'battle-skillTargetMultiple');
    }

    // ALLIES
    document.querySelector('#b-hero-front').addEventListener('click', e => {
        if(canCastSkillOnSelf(skill) || (skill.targets.allies.includes('1') && battle.getCurrentNPCPos() !== Data.FormationPosition.FRONT)) {
            battle.target.push(battle.allies[2]);
            if(skill.targets.allies.charAt(0) === '@') {
                if(skill.targets.allies.includes('2')) battle.target.push(battle.allies[1]);
                if(skill.targets.allies.includes('3')) battle.target.push(battle.allies[0]);
            }
            battle.executeSkill();
        }
    });
    document.querySelector('#b-hero-middle').addEventListener('click', e => {
        if(canCastSkillOnSelf(skill) || (skill.targets.allies.includes('2') && battle.getCurrentNPCPos() !== Data.FormationPosition.MIDDLE)) {
            battle.target.push(battle.allies[1]);
            if(skill.targets.allies.charAt(0) === '@') {
                if(skill.targets.allies.includes('1')) battle.target.push(battle.allies[2]);
                if(skill.targets.allies.includes('3')) battle.target.push(battle.allies[0]);
            }
            battle.executeSkill();
        }
    });
    document.querySelector('#b-hero-back').addEventListener('click', e => {
        if(canCastSkillOnSelf(skill) || (skill.targets.allies.includes('3') && battle.getCurrentNPCPos() !== Data.FormationPosition.BACK)) {
            battle.target.push(battle.allies[0]);
            if(skill.targets.allies.charAt(0) === '@') {
                if(skill.targets.allies.includes('2')) battle.target.push(battle.allies[1]);
                if(skill.targets.allies.includes('1')) battle.target.push(battle.allies[2]);
            }
            battle.executeSkill();
        }
    });

    // ENEMIES
    document.querySelector('#b-enemy-back').addEventListener('click', e => {
        if(skill.targets.enemies.includes('3')) {
            battle.target.push(battle.enemies[0]);
            if(skill.targets.enemies.charAt(0) === '@') {
                if(skill.targets.enemies.includes('2')) battle.target.push(battle.enemies[1]);
                if(skill.targets.enemies.includes('1')) battle.target.push(battle.enemies[2]);
            }
            battle.executeSkill();
        }
    });
    document.querySelector('#b-enemy-middle').addEventListener('click', e => {
        if(skill.targets.enemies.includes('2')) {
            battle.target.push(battle.enemies[1]);
            if(skill.targets.enemies.charAt(0) === '@') {
                if(skill.targets.enemies.includes('1')) battle.target.push(battle.enemies[2]);
                if(skill.targets.enemies.includes('3')) battle.target.push(battle.enemies[0]);
            }
            battle.executeSkill();
        }
    });
    document.querySelector('#b-enemy-front').addEventListener('click', e => {
        if(skill.targets.enemies.includes('1')) {
            battle.target.push(battle.enemies[2]);
            if(skill.targets.enemies.charAt(0) === '@') {
                if(skill.targets.enemies.includes('2')) battle.target.push(battle.enemies[1]);
                if(skill.targets.enemies.includes('3')) battle.target.push(battle.enemies[0]);
            }
            battle.executeSkill();
        }
    });
}

function battleMovePickTarget() {
    const battle = game.battle;

    const back = document.querySelector('#b-hero-back');
    const middle = document.querySelector('#b-hero-middle');
    const front = document.querySelector('#b-hero-front');

    if(battle.allies.indexOf(battle.currentPlay) !== 0) {
        back.classList.add('battle-target');
        back.addEventListener('click', e => {
            battle.move(battle.currentPlay, Data.FormationPosition.BACK, "a");
            setTimeout(() => {battle.finishTurn();}, 300); // the setTimeout is kind of a nasty way of waiting for the CSS animations to finish but meh... will fix that later
        });
    }
    if(battle.allies.indexOf(battle.currentPlay) !== 1) {
        middle.classList.add('battle-target');
        middle.addEventListener('click', e => {
            battle.move(battle.currentPlay, Data.FormationPosition.MIDDLE, "a");
            setTimeout(() => {battle.finishTurn();}, 300);
        });
    }
    if(battle.allies.indexOf(battle.currentPlay) !== 2) {
        front.classList.add('battle-target');
        front.addEventListener('click', e => {
            battle.move(battle.currentPlay, Data.FormationPosition.FRONT, "a");
            setTimeout(() => {battle.finishTurn();}, 300);
        });
    }
}

function generateBattleSkillsEvents() {
    const battle = game.battle;
    const current = battle.currentPlay;
    const skills = current.skills;
    skills.forEach(skill => {
        const sk = document.querySelector('#' + current.name + '-' + skill.id);
        addTooltip(sk, function(){
            return getBattleSkillTooltip(current, skill)
        }, {offY: -8})

        sk.addEventListener('click', e => {
            if(!canLaunchSkill(skill)) {
                addBattleNotification(current.name + ' cannot cast ' + skill.name + ' from the ' + current.getSelfPosInBattle() + '.');
            } else if(current.mana < skill.manaCost) {
                addBattleNotification(current.name + '\'s mana is too low to cast ' + skill.name + '.');
            } else if(!skill.condition.checker()) {
                addBattleNotification('The requirements to cast ' + skill.name + ' are not met.');
            } else if(skill.cooldownCountdown > 0) {
                addBattleNotification(skill.name + ' cannot be casted while on cooldown.');
            } else {
                if(battle.action !== Data.BattleAction.SKILL) {
                    battleCommandsCancelCurrent();
                    battle.action = Data.BattleAction.SKILL;
                    battle.selectedSkill = skill;
                    console.log('Preparing skill with ' + battle.selectedSkill.name);
                    sk.classList.add('battle-skillSelected');
                    battleSkillPickTarget();
                } else if(battle.action === Data.BattleAction.SKILL && battle.selectedSkill !== skill) {
                    battleCommandsCancelCurrent();
                    battleSelectionRemoveHighlights();
                    document.querySelectorAll('.skillSquare').forEach(wpn => {wpn.classList.remove('battle-skillSelected');});
                    battle.action = Data.BattleAction.SKILL;
                    battle.selectedSkill = skill;
                    sk.classList.add('battle-skillSelected');
                    console.log('Preparing skill with ' + battle.selectedSkill.name);
                    battleSkillPickTarget();
                }
                else battleCommandsCancelCurrent();
            }
        });
    });
}

function generateBattleConsumablesEvents() {
    game.player.du_inventory.filter(x => x instanceof Consumable).forEach(cons => {
        const dom = document.querySelector('#btl-' + cons.id);
        addTooltip(dom, function(){
            return getConsumableTooltip(cons);
        }, { offY: -8} )
    })
}

function battleCommandsCancelCurrent() {
    const battle = game.battle;

    switch(battle.action) {
        case Data.BattleAction.ATTACK:
            battle.action = null;
            battle.selectedWeapon = null;
            battleSelectionRemoveHighlights();
            document.querySelector('.battle-actionAtk').classList.remove('battle-actionSelected');
            document.querySelectorAll('.battle-weaponIcon').forEach(wpn => {wpn.classList.remove('battle-weaponSelected');})
            getFormationBattleEnemies(true);
            getFormationBattleAllies(true);
            generateBattleFightersEvents();
            console.log('Cancelled: Attack');
            break;
        case Data.BattleAction.SKILL:
            battle.action = null;
            battle.selectedSkill = null;
            battleSelectionRemoveHighlights();
            document.querySelectorAll('.skillSquare').forEach(wpn => {wpn.classList.remove('battle-skillSelected');});
            getFormationBattleEnemies(true);
            getFormationBattleAllies(true);
            generateBattleFightersEvents();
            console.log('Cancelled: Skill');
            break;
        case Data.BattleAction.MOVE:
            battle.action = null;
            battleSelectionRemoveHighlights();
            document.querySelector('.battle-actionMov').classList.remove('battle-actionSelected');
            getFormationBattleAllies(true);
            getFormationBattleEnemies(true);
            generateBattleFightersEvents();
            console.log('Cancelled: Move');
            break;
    }
}

function generateBattleFightersEvents() {
    document.querySelectorAll('.battleFighter').forEach(fighter => {
        fighter.addEventListener('mouseenter', e => {
            const target = getFighterFromPosition(fighter.id);
            document.querySelector('.battle-consumablesContainer').innerHTML = getBattleFighterStats(target);
            document.querySelector('.battle-skillsContainer').innerHTML = getBattleFighterDetails(target);
        });
        fighter.addEventListener('mouseleave', e => {
            getBattleSkills(true);
            getBattleConsumables(true);
            if(!game.battle.isEnemyPlaying()) {
                generateBattleSkillsEvents();
                generateBattleConsumablesEvents();
            }
        });
        fighter.parentElement.querySelector('.playOrderIndicator').addEventListener('animationend', function(){
            this.classList.remove('currentPlayIndicator');
            this.classList.add('currentPlayIndicatorLoop');
        })
    });
}

function generateEndBattleScreenEvents() {
    drawEndBattleScreen();
    
    let quantadelay = 0;
    document.querySelectorAll('.revealingLootCanvas.battleEndLootCanvas').forEach(cv => {
        setTimeout(() => {
            let params = getQuantaBurstParamsFromRarity(cv.classList[1]);

            Quanta.burst({
                canvas: cv,
                color: params.color,
                amount: params.amount,
                particleSize: params.particleSize
            });
        }, quantadelay);
        quantadelay += 250;
    });

    const elements = document.querySelectorAll('.battleEnd-loot-single');
    const loot = game.battle.loot;

    loot.forEach(x => {
        if(x.item) console.log(x.item.id);
        else console.log(x.type);
    })
    elements.forEach(el => {
        if(el.classList.contains('lootedLoot')) return;

        const id = el.id.split('-')[2];
        const item = loot.find(x => (id == 'gold' ? x.type : x.item?.id.toString()) === id)

        el.addEventListener('click', e => {
            if(item.looted) return;

            // Holding CTRL and SHIFT adds all of the loot to the Knapsack (if it has not been looted already)
            if(e.ctrlKey && e.shiftKey) {
                let timer = 0;
                for(let i = 0; i < elements.length; i++) {
                    const elem = elements[i];
                    const lo = loot[i];

                    if(game.player.isKnapsackFull()) break;
                    if(elem.classList.contains('lootedLoot') || lo.looted) continue;

                    elem.style.animationDelay = timer + 's';
                    elem.classList.remove('revealingLoot');
                    elem.classList.add('lootedLoot');
                    elem.classList.add('lootedLootAnim');
                    timer += 0.1;
                    if(lo.type === 'gold') game.player.addToPurse(lo.amount);
                    else game.player.addToKnapsack(lo.item, true, lo.amount);
                    lo.looted = true;
                }
            }
            else {
                if(game.player.isKnapsackFull()) return;

                if(item.type === 'gold') game.player.addToPurse(item.amount);
                else game.player.addToKnapsack(item.item, true, item.amount);
                el.style.animationDelay = "0s";
                el.classList.remove('revealingLoot');
                el.classList.add('lootedLoot');
                el.classList.add('lootedLootAnim');
                item.looted = true;
            }
        });
    })
}
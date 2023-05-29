class NPC extends Entity {
    constructor(name,
                desc,
                charset,
                subname,
                health,
                mana,
                stamina,
                dodge,
                speed,
                accuracy,
                protection,
                might,
                spirit,
                resBleed,
                resPoison,
                resMove,
                resStun,
                resilience,
                warding,
                critEffects,
                variables,
                triggers,
                ) {
        super(name, desc, 0);

        this.charset = charset;

        this.subname = subname;

        this.health = health;
        this.mana = mana;
        this.stamina = stamina;
        this.maxHealth = health;
        this.maxMana = mana;
        this.maxStamina = stamina;

        this.shield = 0;

        this.dodge = dodge;
        this.speed = speed;
        this.accuracy = accuracy;
        this.protection = protection;
        this.might = might;
        this.spirit = spirit;

        this.resBleed = resBleed;
        this.resPoison = resPoison;
        this.resMove = resMove;
        this.resStun = resStun;
        this.resilience = resilience;
        this.warding = warding;

        this.regenHealth = 0;
        this.regenMana = 0;
        this.regenStamina = 0;
        this.modifHealRecv = 0;
        this.modifHealGiven = 0;
        this.damageReflection = 0;
        this.modifBlock = 0;
        this.modifDmgTotal = 0;
        this.modifDmgWeapon = 0;
        this.modifDmgSkill = 0;
        this.modifDmgPoison = 0;
        this.modifDmgStun = 0;
        this.modifDmgBleed = 0;
        this.modifAccuracySkill = 0;
        this.modifAccuracyStun = 0;
        this.modifAccuracyBleed = 0;
        this.modifAccuracyPoison = 0;
        this.modifCritSkill = 0;
        this.modifCritStun = 0;
        this.modifCritBleed = 0;
        this.modifCritPoison = 0;

        this.critEffects = critEffects;
        this.variables = variables;
        this.triggers = triggers;

        this.activeEffects = [];

        this.popupsQueue = [];
    }

    /**
     * Runs the triggers which type matches the provided TriggerType value. 
     * @param {Data.TriggerType} type the type of trigger that must be fired
     */
    runTriggers(type) {
        this.triggers.forEach(trigger => {
            if(trigger.type === type) trigger.checker() && trigger.behavior();
        })
    }

    /**
     * Adds the specified number to this NPC's shield. Cannot exceed maxHealth.
     * @param {number} amount the amount of shield to add
     */
    addShield(amount) {
        this.shield = Math.min(this.maxHealth, this.shield+amount);
    }

    /**
     * Applies the damage held in the provided params object to this NPC.
     * @param {object} params a battle attack params object
     */
    receiveDamage(params) {
        const phys = params.phys_damage;
        const magi = params.magi_damage;
        const crit = params.crit_damage;
        let damage, phys_damage, magi_damage;

        phys_damage = phys - this.resilience;
        magi_damage = magi - this.warding;

        damage = phys_damage + magi_damage + crit;
        damage -= Math.round(damage * this.protection / 100);

        this.removeHealth(damage);

        console.log(this.name + ' received ' + damage + ' damage (' + phys + ' phys, effective ' + phys_damage + ' | ' + magi + ' magi, effective ' + magi_damage + ' | ' + crit + ' critical -> Total ' + damage + ' with ' + this.protection + '% reduction');
    }

    /**
     * Removes health and eventually shield from this NPC, based on the provided damage value.
     * @param {number} damage 
     */
    removeHealth(damage) {
        let removeShield = false;
        if(this.shield > 0) {
            if(this.shield <= this.damage) {
                removeShield = true;
                this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.TURQUOISE + '">- ' + this.shield + '</p>'))
            } else this.addBattlePopup(new BattlePopup(0, '<p style="color: ' + Data.Color.TURQUOISE + '">- ' + params.damage + '</p>'))
            damage = damage - this.shield;
            
            if(removeShield) this.shield = 0;
        }
        if(damage > 0) {
            this.addBattlePopup(new BattlePopup(0, '<p style="color: rgba(234, 32, 39, 1)">- ' + damage + '</p>'))
        }
        this.health = Math.max(0, this.health - damage);
    }

    /**
     * Adds the provided ActiveEffect to this NPC's active effects list.
     * @param {ActiveEffect} ae 
     */
    addActiveEffect(ae) {
        this.activeEffects.push(ae);
    }

    addBattlePopup(popup) {
        this.popupsQueue.push(popup);
    }

    executePopups() {
        this.nextPopup();
    }

    nextPopup() {
        const pos = this.getBattleAnimationStringId();
        if(this.popupsQueue.length > 0) this.executePopup(pos, this.popupsQueue[0]);
        else game.currentBattle.addEndTurnCounter();
    }

    executePopup(pos, e) {
        document.querySelector('#' + pos).innerHTML = '<div id="' + this.getPopupIdString() + '" class="battlePopup">' + e.content + '</div>';
        const popup = document.querySelector('#' + this.getPopupIdString());
        popup.classList.add('showUp');
        popup.addEventListener('animationend', e => {
            popup.classList.remove('showUp');
            popup.classList.add('popupFadeOut');
            popup.addEventListener('animationend', e => {
                document.querySelector('#' + pos).innerHTML = '';
                this.popupsQueue.shift();
                this.nextPopup();
            });
        }, false);
    }

    getBattleFormationStringId() {
        const battle = game.currentBattle;
        let str = 'b-';
        if(arrayContains(battle.allies, this)) str += 'hero-';
        else if(arrayContains(battle.enemies, this)) str += 'enemy-';

        return str += this.getSelfPosInBattle().toLowerCase();
    }

    getBattleFormationWrapperStringId() {
        const battle = game.currentBattle;
        let str = 'gw-';
        if(arrayContains(battle.allies, this)) str += 'h-';
        else if(arrayContains(battle.enemies, this)) str += 'e-';
        
        return str += this.getSelfPosInBattle().toLowerCase();
    }

    getBattleAnimationStringId() {
        const battle = game.currentBattle;
        let str = 'aw-';
        if(arrayContains(battle.allies, this)) str += 'h-';
        else if(arrayContains(battle.enemies, this)) str += 'e-';
        
        return str += this.getSelfPosInBattle().toLowerCase();
    }

    getPopupIdString() {
        const battle = game.currentBattle;
        let str = 'popup-';
        if(arrayContains(battle.allies, this)) str += 'h-';
        else if(arrayContains(battle.enemies, this)) str += 'e-';
        
        return str += this.getSelfPosInBattle().toLowerCase();
    }

    getSelfPosInBattle() {
        const battle = game.currentBattle;
        if(battle.allies[0] === this) return Data.FormationPosition.BACK;
        if(battle.allies[1] === this) return Data.FormationPosition.MIDDLE;
        if(battle.allies[2] === this) return Data.FormationPosition.FRONT;
        if(battle.enemies[0] === this) return Data.FormationPosition.BACK;
        if(battle.enemies[1] === this) return Data.FormationPosition.MIDDLE;
        if(battle.enemies[2] === this) return Data.FormationPosition.FRONT;
    }

    useSkill(skill) {
        this.mana = Math.max(0, this.mana - skill.manaCost);
        this.runTriggers(Data.TriggerType.ON_USE_SKILL);
    }
}
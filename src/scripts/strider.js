/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class Strider extends NPC {
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
                striderType,
                uniqueName,
                uniqueDesc,
                uniqueQuote,
                uniqueIcon,
                skillTree,
                startingSkills = [],
                customBgPos = ''
                ) {
        super(name, desc, charset, subname, health, mana, stamina, dodge, speed, accuracy, protection, might, spirit, resBleed, resPoison, resMove, resStun, resilience, warding, critEffects, variables, triggers, startingSkills);
        
        this.eqWeaponBoth = null;
        this.eqWeaponLeft = null;
        this.eqWeaponRight = null;
        this.eqShield = null;
        this.eqHelmet = null;
        this.eqChestplate = null;
        this.eqGloves = null;
        this.eqBoots = null;

        this.toxicity = 0;
        this.maxToxicity = 100;

        this.consumablesPerRound = 1;

        this.trinkets = [];
        this.trinketSlots = 3;
        this.trinketSlotsFree = 3;

        this.skillTree = skillTree;

        this.uniqueName = uniqueName;
        this.uniqueDesc = uniqueDesc;
        this.uniqueQuote = uniqueQuote;
        this.uniqueIcon = uniqueIcon;

        this.level = new Level("Level", 1, 20, 1, 1000, 0);
        this.skillPoints = 3;

        this.skillTree = skillTree;
        this.striderType = striderType;

        this.unlocked = false;

        this.customBgPos = customBgPos;

        this.popupsQueue = [];

        this.setsBonuses = {}; // Model: {'setName': [amount of pieces equipped]}
    }

    /**
     * Checks whether the provided Node can be unlocked.
     * The requirements are the player level and their amount of available skill points.
     * @param {SkillTreeNode} node the Node to check for
     * @returns {boolean} whether the Node can be unlocked
     */
    canUnlockTreeNode(node) {
        if(!node.getNextRequirements()) return false;
        return this.level.currentLevel >= node.getNextRequiredLevel() 
                && this.skillPoints >= node.getNextRequiredSkillPoints() 
                && node.isUnlocked();
    }

    /**
     * Removes an amount of skill points from the Strider, based on the provided Node's required skill points for the next level.
     * @param {SkillTreeNode} node the Node
     */
    removeSkillPointsFromNode(node) {
        this.skillPoints = Math.max(0, this.skillPoints - node.getNextRequiredSkillPoints())
    }

    /**
     * Unlocks the provided Node's next level if the requirements are met.
     * @param {SkillTreeNode} node the Node to unlock
     */
    unlockTreeNode(node) {
        if(this.canUnlockTreeNode(node)) {
            // REMOVE PREVIOUS REWARDS
            if(node.currentLevel !== 0) {
                node.getCurrentRewards().forEach(reward => {
                    switch(reward.type) {
                        case Data.SkillTreeNodeRewardType.STAT:
                            reward.content.forEach(stat => {
                                //this.addEffect(stat, true);
                                this.alter({uid: stat.uid, action: Data.AlterAction.REMOVE});
                            });
                            break;
                    }
                })
            }

            // ADD NEXT REWARDS
            node.getNextRewards().forEach(reward => {
                switch(reward.type) {
                    case Data.SkillTreeNodeRewardType.STAT:
                        reward.content.forEach(stat => {
                            //this.addEffect(stat);
                            this.alter({effect: stat, action: Data.AlterAction.ADD, origin: node});
                        });
                        break;
                }
            })
            this.removeSkillPointsFromNode(node);
            node.addLevel();
            console.log(this.name + ": upgraded node [" + node.name + "] to Level " + node.currentLevel);
        } else {
            ERROR('Cannot unlock the provided node.');
        }
    }

    /**
     * Returns whether the Strider is unlocked.
     * @returns {boolean} whether the Strider is unlocked
     */
    isUnlocked() {
        return this.unlocked;
    }
    /**
     * Unlocks the Strider.
     */
    unlock() {
        this.unlocked = true;
    }

    /**
     * Adds an available Trinket slot. Cannot exceed the trinketSlots variable.
     * @param {number} amount the amount of trinket slots to add
     */
    addAvailableTrinketSlot(amount = 1) {
        this.trinketSlotsFree = Math.min(this.trinketSlots, this.trinketSlotsFree + amount);
    }
    /**
     * Removes an available Trinket slot. Cannot go below zero.
     * @param {number} amount the amount of Trinket slots to remove
     */
    removeAvailableTrinketSlot(amount = 1) {
        this.trinketSlotsFree = Math.max(0, this.trinketSlotsFree - amount);
    }

    /**
     * Returns whether the trinketSlotsFree property of the Strider is superior to 0.
     * @returns {boolean} whether the Strider has available trinket slots
     */
    hasFreeTrinketSlots() {
        return this.trinketSlotsFree > 0;
    }

    /**
     * Equips the trinket whose ID is provided in the DragEvent object.
     * @param {DragEvent} event the Event from which the trinket will be retrieved
     */
    equipTrinket(event) {
        const trinket = game.player.inventory.getItemFromId(Data.ItemType.TRINKET, event.dataTransfer.getData("trinket"));
        if(this.hasFreeTrinketSlots()) {
            trinket.effects.forEach(effect => {
                //this.addEffect(effect);
                this.alter({effect: effect, origin: trinket, action: Data.AlterAction.ADD});
            });
            this.applyEcho(trinket);
            this.addEcho(trinket.echo);
            this.applyAstralForgeExtraEffects(trinket);
            this.applySigil(Data.ItemType.TRINKET, trinket.sigil, false, trinket);

            // Updating sets
            this.updateSetBonuses(trinket, Data.AlterAction.ADD); 

            this.trinkets.push(trinket);
            game.player.inventory.removeItem(trinket);
            this.removeAvailableTrinketSlot();
            console.log(trinket.name + ' was equipped to ' + this.name);
            Sounds.Methods.playSound(Data.SoundType.EQUIP);
            drawTrinketInventory();
            spawnStriderPopup(this, true);
        } else {
            ERROR(this.name + ' cannot equip more trinkets.');
        }
    }

    /**
     * Unequips the provided Trinket.
     * @param {Trinket} trinket the Trinket to unequip
     */
    unequipTrinket(trinket) {
        if(!trinket) return;
        if(!arrayContains(this.trinkets, trinket)) throw new Error('Tried to unequip a trinket that is not equipped.');
        trinket.effects.forEach(effect => {
            //this.addEffect(effect, true);
            this.alter({uid: effect.uid, action: Data.AlterAction.REMOVE});
        });
        this.applyEcho(trinket, true);
        this.removeEcho(trinket.echo);
        this.applyAstralForgeExtraEffects(trinket, true);
        this.applySigil(Data.ItemType.TRINKET, trinket.sigil, true, trinket);

        // Updating sets
        this.updateSetBonuses(trinket, Data.AlterAction.REMOVE);

        removeFromArray(this.trinkets, trinket);
        game.player.inventory.addItem(trinket, 1, true);
        this.addAvailableTrinketSlot();
        console.log(trinket.name + ' was unequipped from ' + this.name);
        Sounds.Methods.playSound(Data.SoundType.UNEQUIP);
        drawInventory();
        spawnStriderPopup(this, true);
    }

    /**
     * Updates the bonuses from the provided item's set.
     * @param {Weapon|Armor|Trinket} item the set's item
     * @param {Data.AlterAction} action the action to do
     */
    updateSetBonuses(item, action) {
        if(!item.set) return;

        const set = what(game.all_equipmentSets, item.set);

        action === Data.AlterAction.ADD ? this.addSetBonus(item, set) : this.removeSetBonus(item, set);
    }

    /**
     * Increases the bonuses tracker for the provided set and adds bonuses accordingly, if needed.
     * @param {Weapon|Armor|Trinket} item the set's item
     * @param {EquipmentSet} set the set
     */
    addSetBonus(item, set) {
        this.setsBonuses[item.set] = (this.setsBonuses[item.set] || 0) + 1; // Increase +1 to set bonus tracker, or initialize it if nonexisting

        const current = this.setsBonuses[item.set];
        const steps = Object.keys(set.bonus).map(Number);
        const closest = findClosestInferiorOrEqualNumber(steps, current);
        const closestBonus = set.bonus[closest];

        if(closestBonus) closestBonus.forEach(bonus => this.processSetBonus(item, bonus, Data.AlterAction.ADD));
    }

    /**
     * Decreases the bonuses tracker for the provided set and removes bonuses accordingly, if needed.
     * @param {Weapon|Armor|Trinket} item the set's item
     * @param {EquipmentSet} set the set
     */
    removeSetBonus(item, set) {
        const current = this.setsBonuses[item.set];
        const steps = Object.keys(set.bonus).map(Number);
        const closest = findClosestInferiorOrEqualNumber(steps, current);
        const closestBonus = set.bonus[closest];

        if(closestBonus) closestBonus.forEach(bonus => this.processSetBonus(item, bonus, Data.AlterAction.REMOVE));

        this.setsBonuses[item.set] = Math.max(0, current - 1);
    }

    /**
     * Adds or removes the provided bonus from an item sett to the Strider.
     * @param {Weapon|Armor|Trinket} item the set's item
     * @param {Bonus} bonus the bonus
     * @param {Data.AlterAction} action the action to do
     */
    processSetBonus(item, bonus, action) {
        if(action === Data.AlterAction.ADD) {
            if(bonus instanceof Stat && !this.findBonusWithUid(bonus.uid)) this.alter({effect: bonus, origin: item.set, action: action});
            else if(bonus instanceof Echo && !arrayContains(this.echoes, bonus)) this.addEcho(bonus);
        } else {
            if(bonus instanceof Stat && this.findBonusWithUid(bonus.uid)) this.alter({uid: bonus.uid, action: action});
            else if(bonus instanceof Echo && arrayContains(this.echoes, bonus)) this.removeEcho(bonus);
        }
    }

    /**
     * Equips the armor whose ID is provided in the DragEvent object.
     * @param {DragEvent} event the Event from which the armor will be retrieved
     */
    equipArmor(event) {
        const armor = game.player.inventory.getItemFromId(Data.ItemType.ARMOR, event.dataTransfer.getData('armor'));
        // check if armor is already equipped
        switch(armor.type) {
            case Data.ArmorType.HELMET:
                if(this.eqHelmet) this.unequipArmor(this.eqHelmet);
                this.eqHelmet = armor;
                break;
            case Data.ArmorType.BOOTS:
                if(this.eqBoots) this.unequipArmor(this.eqBoots);
                this.eqBoots = armor;
                break;
            case Data.ArmorType.CHESTPLATE:
                if(this.eqChestplate) this.unequipArmor(this.eqChestplate);
                this.eqChestplate = armor;
                break;
            case Data.ArmorType.GLOVES:
                if(this.eqGloves) this.unequipArmor(this.eqGloves);
                this.eqGloves = armor;
                break;
            case Data.ArmorType.SHIELD:
                if(this.eqShield) this.unequipArmor(this.eqShield);
                this.eqShield = armor;
                break;
        }
        this.alter({effect: armor.resilience, origin: armor, action: Data.AlterAction.ADD});
        this.alter({effect: armor.warding, origin: armor, action: Data.AlterAction.ADD});
        this.applyEcho(armor);
        this.addEcho(armor.echo);
        this.applyAstralForgeExtraEffects(armor);
        this.applySigil(Data.ItemType.ARMOR, armor.sigil);

        // Updating sets
        this.updateSetBonuses(armor, Data.AlterAction.ADD);

        game.player.inventory.removeItem(armor);
        console.log(armor.name + ' was equipped to ' + this.name);
        Sounds.Methods.playSound(Data.SoundType.EQUIP);
        drawInventory();
        spawnStriderPopup(this, true);
    }

    /**
     * Unequips the provided armor.
     * @param {Armor} armor the armor to unequip
     */
    unequipArmor(armor) {
        if(!armor) return;
        switch(armor.type) {
            case Data.ArmorType.HELMET:
                if(!this.eqHelmet) throw new Error('Tried to unequip an armor that is not equipped');
                this.eqHelmet = null;
                break;
            case Data.ArmorType.CHESTPLATE:
                if(!this.eqChestplate) throw new Error('Tried to unequip an armor that is not equipped');
                this.eqChestplate = null;
                break;
            case Data.ArmorType.GLOVES:
                if(!this.eqGloves) throw new Error('Tried to unequip an armor that is not equipped');
                this.eqGloves = null;
                break;
            case Data.ArmorType.BOOTS:
                if(!this.eqBoots) throw new Error('Tried to unequip an armor that is not equipped');
                this.eqBoots = null;
                break;
            case Data.ArmorType.SHIELD:
                if(!this.eqShield) throw new Error('Tried to unequip an armor that is not equipped');
                this.eqShield = null;
                break;
        }
        //this.addEffect(new Stat({effect: Data.Effect.RESILIENCE, theorical: armor.resilience}), true);
        //this.addEffect(new Stat({effect: Data.Effect.WARDING, theorical: armor.warding}), true);
        this.alter({uid: armor.resilience.uid, action: Data.AlterAction.REMOVE});
        this.alter({uid: armor.warding.uid, action: Data.AlterAction.REMOVE});

        this.applyEcho(armor, true);
        this.removeEcho(armor.echo);
        this.applyAstralForgeExtraEffects(armor, true);
        this.applySigil(Data.ItemType.ARMOR, armor.sigil, true);

        // Updating sets
        this.updateSetBonuses(armor, Data.AlterAction.REMOVE);

        game.player.inventory.addItem(armor, 1, true);
        console.log(armor.name + ' was unequipped from ' + this.name);
        Sounds.Methods.playSound(Data.SoundType.UNEQUIP);
        drawInventory();
        spawnStriderPopup(this, true);
    }

    /**
     * Equips the Weapon from the data in the provided DragEvent to the targeted hand.
     * @param {DragEvent} event 
     * @param {Data.WeaponHand} hand the hand to equip the weapon to
     */
    equipWeapon(event, hand = '') {
        const weapon = game.player.inventory.getItemFromId(Data.ItemType.WEAPON, event.dataTransfer.getData('weapon'));
        if(weapon.weight === Data.WeaponWeight.HEAVY) {
            if(this.eqWeaponLeft) this.unequipWeapon(Data.WeaponHand.LEFT);
            if(this.eqWeaponRight) this.unequipWeapon(Data.WeaponHand.RIGHT);
            this.eqWeaponBoth = weapon;
            console.log(weapon.name + ' was equipped to ' + this.name + '\'s both hands.')
        } else {
            if(hand.toLowerCase() === Data.WeaponHand.LEFT) {
                if(this.eqWeaponBoth) this.unequipWeapon(Data.WeaponHand.BOTH);
                if(this.eqWeaponLeft) this.unequipWeapon(Data.WeaponHand.LEFT);
                console.log(weapon);
                this.eqWeaponLeft = weapon;
                console.log(this.eqWeaponLeft);
                console.log(weapon.name + ' was equipped to ' + this.name + '\'s left hand.')
            } else if(hand.toLowerCase() === Data.WeaponHand.RIGHT) {
                if(this.eqWeaponBoth) this.unequipWeapon(Data.WeaponHand.BOTH);
                if(this.eqWeaponRight) this.unequipWeapon(Data.WeaponHand.RIGHT);
                this.eqWeaponRight = weapon;
                console.log(weapon.name + ' was equipped to ' + this.name + '\'s right hand.')
            } else {
                if(this.eqWeaponBoth) this.unequipWeapon(Data.WeaponHand.BOTH);
                if(!this.eqWeaponLeft) {
                    this.eqWeaponLeft = weapon;
                    console.log(weapon.name + ' was equipped to ' + this.name + '\'s left hand.')
                } else if(!this.eqWeaponRight) {
                    this.eqWeaponRight = weapon;
                    console.log(weapon.name + ' was equipped to ' + this.name + '\'s right hand.')
                }
            }
        }
        this.applyEcho(weapon);
        this.addEcho(weapon.echo);
        this.applyAstralForgeExtraEffects(weapon);
        this.applySigil(Data.ItemType.WEAPON, weapon.sigil);

        // Updating sets
        this.updateSetBonuses(weapon, Data.AlterAction.ADD); 

        game.player.inventory.removeItem(weapon);
        Sounds.Methods.playSound(Data.SoundType.EQUIP_WEAPON);
        drawInventory();
        spawnStriderPopup(this, true);
    }

    /**
     * Unequips the weapon from the provided hand.
     * @param {Data.WeaponHand} hand the hand to unequip the weapon from
     */
    unequipWeapon(hand) {
        if(hand === Data.WeaponHand.RIGHT && this.eqWeaponRight) {
            if(!this.eqWeaponRight) return;
            game.player.inventory.addItem(this.eqWeaponRight, 1, true);
            console.log(this.eqWeaponRight.name + ' was unequipped from ' + this.name + '\'s right hand.');

            this.applyEcho(this.eqWeaponRight, true);
            this.removeEcho(this.eqWeaponRight.echo);
            this.applyAstralForgeExtraEffects(this.eqWeaponRight, true);
            this.applySigil(Data.ItemType.WEAPON, this.eqWeaponRight.sigil, true);
            // Updating sets
            this.updateSetBonuses(this.eqWeaponRight, Data.AlterAction.REMOVE); 

            this.eqWeaponRight = null;
        } else if(hand === Data.WeaponHand.LEFT && this.eqWeaponLeft) {
            if(!this.eqWeaponLeft) return;
            game.player.inventory.addItem(this.eqWeaponLeft, 1, true);
            console.log(this.eqWeaponLeft.name + ' was unequipped from ' + this.name + '\'s left hand.');
            
            this.applyEcho(this.eqWeaponLeft, true);
            this.removeEcho(this.eqWeaponLeft.echo);
            this.applyAstralForgeExtraEffects(this.eqWeaponLeft, true);
            this.applySigil(Data.ItemType.WEAPON, this.eqWeaponLeft.sigil, true);
            // Updating sets
            this.updateSetBonuses(this.eqWeaponLeft, Data.AlterAction.REMOVE); 

            this.eqWeaponLeft = null;
        } else if(hand === Data.WeaponHand.BOTH) {
            if(!this.eqWeaponBoth) return; 
            game.player.inventory.addItem(this.eqWeaponBoth, 1, true);
            console.log(this.eqWeaponBoth.name + ' was unequipped from ' + this.name + '\'s both hands.');
                        
            this.applyEcho(this.eqWeaponBoth, true);
            this.removeEcho(this.eqWeaponBoth.echo);
            this.applyAstralForgeExtraEffects(this.eqWeaponBoth, true);
            this.applySigil(Data.ItemType.WEAPON, this.eqWeaponBoth.sigil, true);
            // Updating sets
            this.updateSetBonuses(this.eqWeaponBoth, Data.AlterAction.REMOVE); 

            this.eqWeaponBoth = null;
        }
        Sounds.Methods.playSound(Data.SoundType.UNEQUIP);
        drawInventory();
        spawnStriderPopup(this, true);
    }

    /**
     * Applies the specified item's Echoes to this Strider.
     * @param {Weapon|Armor|Trinket} item the item which echoes will be applied
     * @param {boolean} remove whether the echoes should be removed or not (default = false)
     */
    applyEcho(item, remove = false) {
        const action = remove ? Data.AlterAction.REMOVE : Data.AlterAction.ADD;
        if(item.hasEcho()) {
            item.echo.stats.forEach(effect => {
                //this.addEffect(effect, remove);
                if(!isBaseWeaponEffect(effect.effect)) this.alter({effect: effect, origin: item.echo, action: action, uid: effect.uid});
            });
        }
    }

    /**
     * Applies the provided Sigil's effects to this Strider.
     * @param {Data.ItemType} type the type of item the Sigil is bound to
     * @param {Sigil} sigil the Sigil
     * @param {boolean} remove whether to remove or add the bonuses
     * @param {boolean} source 
     */
    applySigil(type, sigil, remove = false, source = null) {
        const action = remove ? Data.AlterAction.REMOVE : Data.AlterAction.ADD;
        if(sigil) {
            sigil.effects.forEach(eff => {
                if(type === Data.ItemType.ARMOR && !isBaseArmorEffect(eff.effect) && !eff.disabled) this.alter({effect: eff, action: action, origin: sigil, uid: eff.uid});
                else if(type === Data.ItemType.WEAPON && !isBaseWeaponEffect(eff.effect) && !eff.disabled) this.alter({effect: eff, action: action, origin: sigil, uid: eff.uid});
                else if(type === Data.ItemType.TRINKET) {
                    if(!source.effects.find(x => x.effect === eff.effect) && !eff.disabled) this.alter({effect: eff, action: action, origin: sigil, uid: eff.uid});
                }
            });
            if(sigil.isCritical) sigil.critical.forEach(eff => {
                if(type === Data.ItemType.ARMOR && !isBaseArmorEffect(eff.effect)) this.alter({effect: eff, action: action, origin: sigil, uid: eff.uid});
                else if(type === Data.ItemType.WEAPON && !isBaseWeaponEffect(eff.effect)) this.alter({effect: eff, action: action, origin: sigil, uid: eff.uid});
                else if(type === Data.ItemType.TRINKET) {
                    if(!source.effects.find(x => x.effect === eff.effect) && !eff.disabled) this.alter({effect: eff, action: action, origin: sigil, uid: eff.uid});
                }
            });
            if(sigil.isCorrupt) sigil.corrupt.forEach(eff => {
                if(type === Data.ItemType.ARMOR && !isBaseArmorEffect(eff.effect)) this.alter({effect: eff, action: action, origin: sigil, uid: eff.uid});
                else if(type === Data.ItemType.WEAPON && !isBaseWeaponEffect(eff.effect)) this.alter({effect: eff, action: action, origin: sigil, uid: eff.uid});
                else if(type === Data.ItemType.TRINKET) {
                    if(!source.effects.find(x => x.effect === eff.effect) && !eff.disabled) this.alter({effect: eff, action: action, origin: sigil, uid: eff.uid});
                }
            });
        }
    }

    /**
     * Applies the specified item's extra AstralForge effects to this Strider.
     * @param {Weapon|Armor|Trinket} item the item which extra AstralForge effects will be applied
     * @param {boolean} remove whether the effects should be removed or not (default = false)
     */
    applyAstralForgeExtraEffects(item, remove = false) {
        const action = remove ? Data.AlterAction.REMOVE : Data.AlterAction.ADD;
        item.astralForgeItem.extraEffects.forEach(extra => {
            //this.addEffect(extra, remove);
            this.alter({effect: extra, action: action, origin: item.astralForgeItem, uid: extra.uid});
        });
    }

    /**
     * Consumes this Strider's stamina according to the provided Weapon's effort value, and runs ON_USE_WEAPON triggers.
     * @param {Weapon} weapon the Weapon
     */
    useWeapon(weapon) {
        this.removeBaseStat(new Stat({effect: Data.Effect.STAMINA, theorical: weapon.effort}));
        this.runTriggers(Data.TriggerType.ON_USE_WEAPON);
    }

    /**
     * Returns the total block value of this Strider based on his equipped weapons.
     * @returns {number} the total block value
     */
    getTotalBlockValue() {
        let val = 0;

        if(this.eqWeaponBoth) val += this.eqWeaponBoth.block;
        if(this.eqWeaponLeft) val += this.eqWeaponLeft.block;    
        if(this.eqWeaponRight) val += this.eqWeaponRight.block;

        return val;
    }
}
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
                                this.addEffect(stat, true);
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
                            this.addEffect(stat);
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
                this.addEffect(effect);
            });
            this.applyEchoes(trinket);
            this.applyAstralForgeExtraEffects(trinket);
            this.trinkets.push(trinket);
            game.player.inventory.removeItem(trinket);
            this.removeAvailableTrinketSlot();
            console.log(trinket.name + ' was equipped to ' + this.name);
            playSound('sounds/ui/equip' + getRandomNumber(1, 3) + '.wav', 0.3);
            drawInventory();
            spawnStriderPopup(this, true);
        } else {
            ERROR(this.name + ' cannot equip more trinkets.');
        }
    }

    unequipTrinket(trinket) {
        if(!trinket) return;
        if(!arrayContains(this.trinkets, trinket)) throw new Error('Tried to unequip a trinket that is not equipped.');
        trinket.effects.forEach(effect => {
            this.addEffect(effect, true);
        });
        this.applyEchoes(trinket, true);
        this.applyAstralForgeExtraEffects(trinket, true);
        removeFromArray(this.trinkets, trinket);
        game.player.inventory.addItem(trinket, 1, true);
        this.addAvailableTrinketSlot();
        console.log(trinket.name + ' was unequipped from ' + this.name);
        playSound('sounds/ui/closetooltip.wav');
        drawInventory();
        spawnStriderPopup(this, true);
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
        this.addEffect(new Stat({effect: Data.Effect.RESILIENCE, theorical: armor.resilience}));
        this.addEffect(new Stat({effect: Data.Effect.WARDING, theorical: armor.warding}));
        this.applyEchoes(armor);
        this.applyAstralForgeExtraEffects(armor);
        game.player.inventory.removeItem(armor);
        console.log(armor.name + ' was equipped to ' + this.name);
        playSound('sounds/ui/equip' + getRandomNumber(1, 3) + '.wav');
        drawInventory();
        spawnStriderPopup(this, true);
    }

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
        this.addEffect(new Stat({effect: Data.Effect.RESILIENCE, theorical: armor.resilience}), true);
        this.addEffect(new Stat({effect: Data.Effect.WARDING, theorical: armor.warding}), true);
        this.applyEchoes(armor, true);
        this.applyAstralForgeExtraEffects(armor, true);
        game.player.inventory.addItem(armor, 1, true);
        console.log(armor.name + ' was unequipped from ' + this.name);
        playSound('sounds/ui/closetooltip.wav');
        drawInventory();
        spawnStriderPopup(this, true);
    }

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
        this.applyEchoes(weapon);
        this.applyAstralForgeExtraEffects(weapon);
        game.player.inventory.removeItem(weapon);
        drawInventory();
        spawnStriderPopup(this, true);
    }
    unequipWeapon(hand) {
        if(hand === Data.WeaponHand.RIGHT && this.eqWeaponRight) {
            if(!this.eqWeaponRight) return;
            game.player.inventory.addItem(this.eqWeaponRight, 1, true);
            console.log(this.eqWeaponRight.name + ' was unequipped from ' + this.name + '\'s right hand.');

            this.applyEchoes(this.eqWeaponRight, true);
            this.applyAstralForgeExtraEffects(this.eqWeaponRight, true);

            this.eqWeaponRight = null;
        } else if(hand === Data.WeaponHand.LEFT && this.eqWeaponLeft) {
            if(!this.eqWeaponLeft) return;
            game.player.inventory.addItem(this.eqWeaponLeft, 1, true);
            console.log(this.eqWeaponLeft.name + ' was unequipped from ' + this.name + '\'s left hand.');
            
            this.applyEchoes(this.eqWeaponLeft, true);
            this.applyAstralForgeExtraEffects(this.eqWeaponLeft, true);

            this.eqWeaponLeft = null;
        } else if(hand === Data.WeaponHand.BOTH) {
            if(!this.eqWeaponBoth) return; 
            game.player.inventory.addItem(this.eqWeaponBoth, 1, true);
            console.log(this.eqWeaponBoth.name + ' was unequipped from ' + this.name + '\'s both hands.');
                        
            this.applyEchoes(this.eqWeaponBoth, true);
            this.applyAstralForgeExtraEffects(this.eqWeaponBoth, true);

            this.eqWeaponBoth = null;
        }
        drawInventory();
        spawnStriderPopup(this, true);
    }

    /**
     * Applies the specified item's Echoes to this Strider.
     * @param {Weapon|Armor|Trinket} item the item which echoes will be applied
     * @param {boolean} remove whether the echoes should be removed or not (default = false)
     */
    applyEchoes(item, remove = false) {
        item.echoes.forEach(echo => {
            echo.stats.forEach(effect => {
                this.addEffect(effect, remove);
            });
        });
    }

    /**
     * Applies the specified item's extra AstralForge effects to this Strider.
     * @param {Weapon|Armor|Trinket} item the item which extra AstralForge effects will be applied
     * @param {boolean} remove whether the effects should be removed or not (default = false)
     */
    applyAstralForgeExtraEffects(item, remove = false) {
        item.astralForgeItem.extraEffects.forEach(extra => {
            this.addEffect(extra, remove);
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
}
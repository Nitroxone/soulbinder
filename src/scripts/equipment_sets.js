class EquipmentSet extends Entity {
    /**
     * @param {string} name 
     * @param {string} type 
     * @param {string} desc 
     * @param {Armor} helmet 
     * @param {Armor} chestplate 
     * @param {Armor} gloves 
     * @param {Armor} boots 
     * @param {Armor} shield 
     * @param {Weapon} weapon 
     * @param {Trinket} trinketOne 
     * @param {Trinket} trinketTwo 
     * @param {array} bonus 
     */
    constructor(name, type, desc, helmet, chestplate, gloves, boots, shield, weapon, trinketOne, trinketTwo, bonus) {
        super(name, desc, 0);
        this.type = type;
        this.helmet = helmet;
        this.chestplate = chestplate;
        this.gloves = gloves;
        this.boots = boots;
        this.shield = shield;
        this.weapon = weapon;
        this.trinketOne = trinketOne,
        this.trinketTwo = trinketTwo;
        this.bonus = bonus;
    }
}
/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

/**
 * The Armor class holds data for armors in the game.
 */
class Armor extends Item {
    /**
     * @param {string} name the Armor's name
     * @param {string} desc the Armor's description
     * @param {number} icon the Armor's icon
     * @param {number} price the Armor's price
     * @param {string} rarity the Armor's rarity
     * @param {string} type the Armor's type (Data.ArmorType)
     * @param {array} t_resilience the Armor's theorical resilience
     * @param {array} t_warding the Armor's theorical warding
     * @param {number} sockets_amount the Armor's sockets amount
     * @param {number} echoes_amount
     * @param {array} echoes the Armor's optional echoes
     */
    constructor(name, desc, icon, price, rarity, 
                type, 
                t_resilience, 
                t_warding, 
                sockets_amount = 1,
                echoes_amount = 1,
                echoes = []) {
        super(name, desc, icon, price, rarity);
        this.type = type;

        this.t_resilience = t_resilience;
        this.t_warding = t_warding;
        
        this.resilience = null;
        this.warding = null;

        this.echoes_amount = echoes_amount;
        this.echoes_free = echoes_amount;
        this.echoes = echoes;

        this.sockets_amount = sockets_amount;
        this.sockets_free = sockets_amount;
        this.sockets = [];

        this.set = null;

        // ASTRAL FORGE VARIABLES
        //this.astralForgeItem = new AstralForge(this);
    }

    /**
     * Generates stats for an armor, based on its theorical values.
     */
    generateStats() {
        this.resilience = getRandomNumberFromArray(this.t_resilience); 
        this.warding = getRandomNumberFromArray(this.t_warding);
    }

    /**
     * Unbinds the provided Sigil from the Armor.
     * @param {Sigil} sigil the sigil to unbind from the Armor
     */
    unbindSigil(sigil) {
        removeFromArray(this.sockets, sigil);
    }

    /**
     * Adds an available socket. Cannot exceed the sockets_amount variable.
     * @param {number} amount the amount of sockets to add
     */
    addAvailableSocket(amount = 1) {
        this.sockets_free = Math.min(this.sockets_amount, this.sockets_free + amount);
    }
    /**
     * Removes an available socket. Cannot go below zero.
     * @param {number} amount the amount of sockets to remove
     */
    removeAvailableSocket(amount = 1) {
        this.sockets_free = Math.max(0, this.sockets_free - amount);
    }

    /**
     * Returns whether the sockets_free property of the Armor is superior to 0.
     * @returns {boolean} whether the Armor has free sockets
     */
    hasFreeSockets() {
        return this.sockets_free > 0;
    }

    /**
     * Adds an available echo slot. Cannot exceed the echoes_amount variable.
     * @param {number} amount the amount of ecohes to add
     */
    addAvailableEcho(amount = 1) {
        this.echoes_free = Math.min(this.echoes_amount, this.echoes_free + amount);
    }
    /**
     * Removes an available echo slot. Cannot go below zero.
     * @param {number} amount the amount of echoes to remove
     */
    removeAvailableEcho(amount = 1) {
        this.echoes_free = Math.max(0, this.echoes_free - amount);
    }

    /**
     * Returns whether the echoes_free property of the Armor is superior to 0.
     * @returns {boolean} whether the Armor has free echoes
     */
    hasFreeEchoes() {
        return this.echoes_free > 0;
    }
    
    /**
     * Adds the Stat's data to the Armor's data.
     * @param {Stat} effect the Stat to add
     * @param {boolean} remove whether the Stat should removed instead of being added
     */
    addEffect(effect, remove = false) {
        const factor = remove ? -1 : 1;
        switch(effect.effect) {
            case Data.Effect.RESILIENCE:
                this.resilience += effect.getValue() * factor;
                break;
            case Data.Effect.WARDING:
                this.warding += effect.getValue() * factor;
                break;
        }
    }

    /**
     * Adds the provided Echo to the Armor.
     * @param {Echo} echo the Echo to add. if no Echo is provided, it will be picked randomly.
     */
    addEcho(echo = null) {
        if(this.hasFreeEchoes()) {
            if(!echo) {
                let pool = game.all_echoes.filter(echo => {
                    return echo.type === Data.EchoType.ARMOR || echo.type === Data.EchoType.ANY
                });
                echo = choose(pool);
            }
            echo = Entity.clone(echo);
            echo.fix();
            this.echoes.push(echo);
            this.removeAvailableEcho();
        } else {
            ERROR('No available echo slots left on ' + this.name);
        }
    }

    /**
     * Creates a new AstralForge association with this Armor.
     */
    setAstralForgeItem() {
        this.astralForgeItem = new AstralForge(this.id);
    }
}
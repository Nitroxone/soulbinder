class Trinket extends Item {
    constructor(name, desc, icon, price, rarity, 
                effects, 
                echoes_amount = 1, 
                echoes = null) {
        super(name, desc, icon, price, rarity);
        this.effects = effects;
        
        this.echoes_amount = echoes_amount;
        this.echoes_free = echoes_amount;
        this.echoes = echoes;
    }
}
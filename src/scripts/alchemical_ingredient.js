class AlchemicalIngredient extends Resource {
    constructor(name, desc, icon, price, rarity, props = {}) {
        super(name, desc, icon, price, rarity);

        this.passive = getValueFromObject(props, "passive", {effect: null, toxicity: 0});
        this.recovery = getValueFromObject(props, "recovery", {effect: null, toxicity: 0});
        this.special = getValueFromObject(props, "special", {effect: null, toxicity: 0});

        this.selected = null;
    }

    select(type) {
        this.removeSelectedFromAlchemy();
        switch(type) {
            case "passive":
                this.selected = this.selected === this.passive ? null : this.passive;
                break;
            case "recovery":
                this.selected = this.selected === this.recovery ? null : this.recovery;
                break;
            case "special":
                this.selected = this.selected === this.special ? null : this.special;
                break;
        }
        if(!this.selected) {

            return false;
        }
        else {
            game.alchemy.addEffect(this.selected);
            return true;
        }
    }

    unselect() {
        this.selected = null;
    }

    removeSelectedFromAlchemy() {
        game.alchemy.removeEffect(this.selected);
    }
    
    unlink() {
        this.removeSelectedFromAlchemy();
        this.unselect();
    }
}
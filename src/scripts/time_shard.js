class TimeShard extends Resource {
    constructor(name, desc, icon, price, rarity,
         value, 
         isPercentage = false) {
        super(name, desc, icon, price, rarity);
        this.value = value;
        this.isPercentage = isPercentage;
    }

    getValueType() {
        return typeof this.value;
    }
}
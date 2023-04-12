class TemporalRemainder extends Resource {
    constructor(resource, value, isPercentage = false) {
        this.resource = resource;
        this.value = value;
        this.isPercentage = isPercentage;
    }

    getValueType() {
        return typeof this.value;
    }
}
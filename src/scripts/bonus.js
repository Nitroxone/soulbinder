class Bonus {
    constructor(stat, origin, variables = {}) {
        this.uid = uidGen();
        this.stat = stat;
        this.origin = origin;
        this.variables = variables;
    }
}
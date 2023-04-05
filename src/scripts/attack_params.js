class AttackParams {
    constructor(type, amount, isAccurate, isDodged, isCritical, ignoresProtection, ignoresResistances) {
        this.type = type;
        this.amount = amount;
        this.isAccurate = isAccurate;
        this.isDodged = isDodged;
        this.isCritical = isCritical;
        this.ignoresProtection = ignoresProtection;
        this.ignoresResistances = ignoresResistances;
    }
}
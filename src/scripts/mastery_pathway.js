class MasteryPathway extends Entity {
    constructor(name, desc, icon,
                type,
                steps) {
        super(name, desc, icon);

        this.type = type;
        this.state = Data.MasteryPathwayState.NEOPHYTE;
        this.steps = steps;
    }
}
class Eon {
    constructor(title, id, unlocked) {
        this.title = title;
        this.id = id;
        this.fragments = [];
        this.unlocked = unlocked;
    }

    generateMajorEons(game) {
        const majorEons = Lore.MAJOR_EONS;
    
        for (const eonTitle in majorEons) {
            if (majorEons.hasOwnProperty(eonTitle)) {
                const eonFragments = majorEons[eonTitle];
                if (eonFragments.length > 0) {
                    const title = eonFragments[0];
                    const fragments = eonFragments.slice(1);
                    const eon = new Eon(title, eonTitle, false);
                    eon.fragments = fragments;
                    game.all_majorEons.push(eon);
                }
            }
        }
    }

    unlockMajorEonFragment () {

    }
}


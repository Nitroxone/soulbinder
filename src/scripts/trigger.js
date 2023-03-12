/**
 * Triggers are very powerful tools that store unique mechanics for characters, skills and relics.
 */
class Trigger {
    /**
     * @param {string} name 
     * @param {string} type 
     * @param {Function} checker 
     * @param {Function} behavior 
     */
    constructor(name, type, checker, behavior) {
        this.name = name;
        this.type = type;
        this.checker = checker;
        this.behavior = behavior;
    }
}
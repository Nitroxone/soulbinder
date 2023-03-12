/**
 * Modifiers hold unique perks for relic items.
 */
class Modifier {
    /**
     * @param {string} name 
     * @param {string} desc 
     * @param {number} icon 
     * @param {array} stats
     * @param {string} quote 
     * @param {array} triggers 
     */
    constructor(name, desc, icon, stats, quote, triggers) {
        this.name = name;
        this.desc = desc;
        this.icon = icon;
        this.stats = stats;
        this.quote = quote;
        this.triggers = triggers;
    }
}
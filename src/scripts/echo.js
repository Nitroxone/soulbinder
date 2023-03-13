/**
 * Modifiers hold unique perks for relic items.
 */
class Modifier {
    /**
     * @param {string} name the Modifier's name
     * @param {string} desc the Modifier's description
     * @param {number} rarity the Modifier's rarity (Data.Rarity)
     * @param {array} stats the Modifier's stats (array of Stat objects)
     * @param {string} quote the Modifier's quote 
     * @param {array} triggers the Modifier's triggers (array of Trigger objects)
     */
    constructor(name, desc, rarity, stats, quote, triggers) {
        this.name = name;
        this.desc = desc;
        this.rarity = rarity;
        this.stats = stats;
        this.quote = quote;
        this.triggers = triggers;
    }
}
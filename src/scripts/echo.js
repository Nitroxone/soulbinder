/**
 * Echoes hold unique perks for items.
 * If a description needs to hold the value of a variable in the 'variables' property, it must be replaced by the § token.
 * Variables must be declared in the same order in 'desc' and 'variables'.
 */
class Echo {
    /**
     * @param {string} name the Echo's name
     * @param {string} desc the Echo's description
     * @param {number} rarity the Echo's rarity (Data.Rarity)
     * @param {array} stats the Echo's stats (array of Stat objects)
     * @param {string} quote the Echo's quote 
     * @param {object} variables the Echo's variables needed by the triggers and special mechanics
     * @param {array} triggers the Echo's triggers (array of Trigger objects)
     */
    constructor(name, desc, rarity, stats, quote, variables, triggers) {
        this.name = name;
        this.desc = desc;
        this.rarity = rarity;
        this.stats = stats;
        this.quote = quote;
        this.variables = variables;
        this.triggers = triggers;
    }

    /**
     * - Sets a fixed state on each Stat of the Echo.
     * - Sets a fixed state on each variable of the Echo. For each variable, clones the original theorical value into a new variable that 
     * will be also stored in the variables attribute.
     * - Changes the Echo's description accordingly.
     */
    fix() {
        // Fixing Stats
        this.stats.forEach((stat) => {
            stat.fix();
        });

        let k = 1;
        for(let i in this.variables) {
            // Creating an associated theorical value for each variable
            const theorical = "theorical-" + i;
            this.variables[theorical] = this.variables[i];
            // Fixing each original variable's value
            this.variables[i] = getRandomNumberFromArray(this.variables[i]);

            // Replacing the description
            this.desc = this.desc.replace("§" + k, this.variables[i]);
            k++;
        }
    }
}
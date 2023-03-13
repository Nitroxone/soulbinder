/**
 * Echoes hold unique perks for relic items.
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

    fix() {
        // Fixing Stats
        this.stats.forEach((stat) => {
            stat.fix();
        });

        // Fixing variables
        for(let variable in this.variables) {
            this.variables[variable] = getRandomNumberFromArray(this.variables[variable]);
        }

        // Fixing description
        for(let i = 0; i < Object.keys(this.variables).length; i++) {
            this.desc = this.desc.replace("§" + i, Object.keys(this.variables)[i]);
        }
    }
}
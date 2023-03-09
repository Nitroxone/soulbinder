/**
 * The Entity class is the base of many things in the game such as Weapons, Armors, Runes... any object that needs a unique ID, name, description, and icon.
 * @author ntrx
 */
class Entity {
    constructor(name, desc, icon) {
        this.id = Entity.increaseCount();
        this.name = name;
        this.desc = desc;
        this.icon = icon;
    }

    // Global counter for the Entity objects.
    static #count = 0;

    /**
     * This function should ONLY be called whenever a new Entity object is being created.
     * It increases the Entity counter and returns its value.
     * @returns the newly incremented Entity counter
     */
    static increaseCount() {
        return this.#count += 1;
    }

    /**
     * Returns the global Entity counter.
     * @returns the Entity counter
     */
    static getCount() {
        return this.#count;
    }

    /**
     * Makes a deep copy of the Entity object and returns it, also
     * giving it a new unique ID in the process.
     * @param {*} obj the Entity object that needs to be deep cloned
     * @returns a newly cloned Entity object
     */
    static clone(obj) {
        let cloned = Entity.deepCopy(obj);
        cloned.id = Entity.increaseCount();
        return cloned;
    }

    /**
     * Returns a deep copy of an Entity object.
     * Source : https://javascript.plainenglish.io/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089
     * @param inObject the Entity object to be deep cloned
     * @returns a deep cloned object
     */
    static deepCopy = (inObject) => {
        let outObject, value, key;

        // Return the value if inObject is not an object
        if (typeof inObject !== "object" || inObject === null) return inObject;

        // Create an array or object to hold the values
        outObject = Array.isArray(inObject) ? [] : {};

        for (key in inObject) {
            value = inObject[key];

            // Recursively (deep) copy for nested objects, including arrays
            outObject[key] = this.deepCopy(value);
        }

        return outObject;
    }
}
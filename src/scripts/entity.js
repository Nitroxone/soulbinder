/**
 * The Entity class is the base of many things in the game such as Weapons, Armors, Sigils... any object that needs a unique ID, name, description, and icon.
 * @author ntrx
 */
class Entity {
    /**
     * @param {string} name The Entity's name
     * @param {string} desc The Entity's description
     * @param {number} icon The iconsheet's index of the Entity
     */
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
     * @returns {number} the newly incremented Entity counter
     */
    static increaseCount() {
        return this.#count += 1;
    }

    /**
     * Returns the global Entity counter.
     * @returns {number} the Entity counter
     */
    static getCount() {
        return this.#count;
    }

    /**
     * Makes a deep copy of the Entity object and returns it, also
     * giving it a new unique ID in the process.
     * @param {Entity} obj the Entity object that needs to be deep cloned
     * @returns {Entity} a newly cloned Entity object
     */
    static clone(obj) {
        let cloned = Entity.deepCopy(obj);
        cloned.id = Entity.increaseCount();
        return cloned;
    }

    /**
     * Returns a deep copy of an Entity object.
     * @param {Entity} source the Entity object to be deep cloned
     * @returns {Entity} a deep cloned object
     */
    static deepCopy = (source) => {
        var _this = this;
        return Array.isArray(source)
            ? source.map(function (item) { return _this.deepCopy(item); })
            : source instanceof Date 
                ? new Date(source.getTime())
                : source && typeof source === 'object'
                    ? Object.getOwnPropertyNames(source).reduce(function (o, prop) {
                        Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop));
                        o[prop] = _this.deepCopy(source[prop]);
                        return o;
                    }, Object.create(Object.getPrototypeOf(source)))
                    : source;
    }
}
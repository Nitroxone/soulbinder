class DungeonEvent {
    constructor(type, set, quote, encounter) {
        this.type = type;
        this.tags = null;
        this.set = set;
        this.quote = quote;
        this.encounter = encounter;
        this.action = "";
    }

    createEvent() {
        
    }
  
    action(direction) {
        if (direction === "gauche") {
            this.tags.push("gauche");
        } else if (direction === "droite") {
            this.tags.push("droite");
        }


    }

    // may stack current event in dungeon history
    stackEvent() {
        
    }
}
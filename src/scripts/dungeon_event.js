class DungeonEvent {
    constructor(set, quote, encounter) {
        this.tags = null;
        this.set = set;
        this.quote = quote;
        this.encounter = encounter;
        this.action = "";
    }

    createEvent() {
        const event = new DungeonEvent(this.set, this.quote, this.encounter);
        event.tags = this.tags;
        return event;
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
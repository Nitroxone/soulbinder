class DungeonEvent {
    constructor(set, quote, encounter) {
      this.set = set;
      this.quote = quote;
      this.encounter = encounter;
      this.action = "";
    }
  
    action(direction) {
        if (direction === "gauche") {
            this.tags.push("gauche");
        } else if (direction === "droite") {
            this.tags.push("droite");
        }
    }
}
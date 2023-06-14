class EnemyAction {
    constructor(props) {
        this.title = getValueFromObject(props, "title", "untitled");
        this.owner = getValueFromObject(props, "owner", null);
        if(!this.owner) throw new Error('Could not find owner of EnemyAction.');
        this.checker = getValueFromObject(props, "checker", function(){ return true; });
        this.behavior = getValueFromObject(props, "behavior", function(){ console.log('Empty enemy action!') });
    }

    build() {
        this.owner = this.owner().id;
    }
}
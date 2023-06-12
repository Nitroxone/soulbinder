class Eon {
    constructor(props) {
        this.title = getValueFromObject(props, 'title', 'untitled');
        this.id = getValueFromObject(props, 'id', 0);
        this.fragments = getValueFromObject(props, 'fragments', []);
        this.unlocked = getValueFromObject(props, 'unlocked', true);
    }
} 


class Dungeon {
    constructor(props) {
        this.name = getValueFromObject(props, "name", "undefined");
        this.background = getValueFromObject(props, "background", "putrescent_ossuary.png");
        this.biome = getValueFromObject(props, "biome", Data.DungeonBiome.ALL);
        this.maximumDepth = getValueFromObject(props, "maximumDepth", 5);
        this.config = getValueFromObject(props, "config", {
            floor1: {
                depth: 1,
            },
            floor2: {
                depth: 2,
            },
            floor3: {
                depth: 3,
            },
            floor4: {
                depth: 4,
            },
            floor5: {
                depth: 5,
            }
        });

        this.floors = [];

        this.generateFloors();
        this.currentFloor = this.floors[0];
    }

    generateFloors() {
        for(let i = 0; i < this.maximumDepth; i++) {
            this.floors.push(new DungeonFloor(this.config['floor' + (i+1)]));
        }
    }

    getNextFloor() {
        return this.floors[this.floors.indexOf(this.currentFloor) + 1];
    }
}



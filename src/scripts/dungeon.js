/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class Dungeon {
    constructor(props) {
        this.name = getValueFromObject(props, "name", "none");
        this.desc = getValueFromObject(props, "desc", "none");
        this.level = getValueFromObject(props, "level", 1);
        this.background = getValueFromObject(props, "background", "putrescent_ossuary.png");
        this.biome = getValueFromObject(props, "biome", Data.DungeonBiome.ALL);
        this.maximumDepth = getValueFromObject(props, "maximumDepth", 5);
        this.lootConfig = getValueFromObject(props, "lootConfig", {});
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
            },
            mobConfig: {
                excludeMobs: [],
                excludeFormations: []
            }
        });

        this.floors = [];
    }

    /**
     * Initializes the dungeon by building floors and setting the active floor.
     */
    init() {
        this.generateFloors();
        this.floor = this.floors[0];
    }

    /**
     * Generates the dungeon's floors.
     */
    generateFloors() {
        for(let i = 0; i < this.maximumDepth; i++) {
            this.floors.push(new DungeonFloor(this.config['floor' + (i+1)]));
        }
    }

    /**
     * Returns the next floor of this dungeon, or null if none is next.
     * @returns {DungeonFloor|null}
     */
    getNextFloor() {
        return this.floors[this.floors.indexOf(this.floor) + 1];
    }

    /**
     * Changes the current floor to the next floor and refreshes the exploration screen.
     */
    moveToNextFloor() {
        this.floor = this.getNextFloor();

        if(this.floor) drawExplorationScreen();
        else {
            game.endDungeon();
        }
    }
}

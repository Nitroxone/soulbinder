let Sounds = {
    FOLDER: "sounds/",
    Types: {
        MAJOR_TAB: [
            {name: "major_tab.wav", volume: 0.2},
        ],
        TOOLTIP_SPAWN: [
            {name: "tooltip_spawn.wav", volume: 0.3}
        ],
        TOOLTIP_HOVER: [
            {name: "tooltip_hover.wav", volume: 0.5, pitch: () => {return getRandomNumber(1.95, 2)}}
        ],
        TOOLTIP_CLOSE: [
            {name: "tooltip_close.wav", volume: 1, pitch: () => {return getRandomNumber(1.5, 1.45)}}
        ],
        EQUIP: [
            {name: "equip1.wav", volume: 0.3},
            {name: "equip2.wav", volume: 0.3},
            {name: "equip3.wav", volume: 0.3},
        ],
        EQUIP_WEAPON: [
            {name: "equip4.mp3", volume: 0.3},
            {name: "equip5.mp3", volume: 0.3},
        ],
        UNEQUIP: [
            {name: "unequip.wav", volume: 0.3, pitch: () => {return getRandomNumber(0.8, 0.85)}}
        ],
        INGREDIENT_IN: [
            {name: "ingredient_in1.mp3", volume: 0.4, pitch: () => {return getRandomNumber(1, 1.05)}},
            {name: "ingredient_in2.mp3", volume: 0.4, pitch: () => {return getRandomNumber(1, 1.05)}}
        ],
        INGREDIENT_OUT: [
            {name: "ingredient_out.mp3", volume: 0.4, pitch: () => {return getRandomNumber(1, 1.05)}}
        ],
        SELECTOR: [
            {name: "selector1.mp3", volume: 0.3},
            {name: "selector2.mp3", volume: 0.3},
        ],
        CRAFT_BUTTON: [
            {name: "craft_button1.mp3", volume: 0.4},
            {name: "craft_button2.wav", volume: 0.4}
        ]
    },
    Methods: {
        playSound: playSound = (type, vol = 0.5, pit = 1) => {
            const file = choose(Sounds.Types[type.toUpperCase()]);

            const volume = file.volume || vol;
            const pitch = file.pitch ? file.pitch() : pit;

            const audio = new Audio(Sounds.FOLDER + file.name);
            audio.volume = volume;
            if(pitch != 1) audio.preservesPitch = false;
            audio.playbackRate = pitch;
            audio.play();
        }
    }
}
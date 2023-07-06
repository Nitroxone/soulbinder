/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

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
        SELECTOR_ON: [
            {name: "selectorOn.wav", volume: 0.3, pitch: () => {return 1.5}},
        ],
        SELECTOR_OFF: [
            {name: "selectorOff.wav", volume: 0.3, pitch: () => {return 1.5}}
        ],
        CRAFT_BUTTON_ALCHEMY: [
            {name: "craft_button_alchemy.mp3", volume: 0.4},
        ],
        CRAFT_POTION_BREW: [
            {name: "potion_brew1.mp3", volume: 0.6},
            {name: "potion_brew2.mp3", volume: 0.6},
            {name: "potion_brew3.mp3", volume: 0.6},
        ],
        CRAFT_POTION_RESULT: [
            {name: "potion_result1.wav", volume: 0.6},
            {name: "potion_result2.wav", volume: 0.6},
        ],
        SOULWRITE_PROCESS: [
            {name: "soulwriteWriteProcess.wav", volume: 0.6, pitch: () => {return 0.85}}
        ],
        SOULWRITE_SLOT: [
            {name: "soulwriteWriteSlot1.wav", volume: 0.6},
            {name: "soulwriteWriteSlot2.wav", volume: 0.6},
            {name: "soulwriteWriteSlot3.wav", volume: 0.6},
        ],
        SOULWRITE_UNSLOT: [
            {name: "soulwriteWriteUnslot.wav", volume: 0.6, pitch: () => {return 1.5}}
        ],
        SOULWRITE_REGULAR: [
            {name: "soulwriteWriteRegular.wav", volume: 0.6}
        ],
        SOULWRITE_CORRUPT: [
            {name: "soulwriteWriteCorrupt.wav", volume: 0.6}
        ],
        SOULWRITE_STALWART: [
            {name: "soulwriteWriteStalwart.wav", volume: 0.6}
        ],
        SOULWRITE_STCO: [
            {name: "soulwriteWriteStco.wav", volume: 0.6}
        ]
    },
    Methods: {
        playSound: playSound = (type, vol = 0.5, pit = 1) => {
            const file = choose(Sounds.Types[type.toUpperCase()]);

            const volume = file.volume || vol;
            const pitch = file.pitch ? file.pitch() : pit;

            const audio = new Audio(Sounds.FOLDER + file.name);
            const dur = audio.duration;
            audio.volume = volume;
            if(pitch != 1) audio.preservesPitch = false;
            audio.playbackRate = pitch;
            audio.play();

            return dur;
        }
    }
}
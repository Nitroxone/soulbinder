/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

let Sounds = {
    FOLDER: "sounds/",
    Types: {
        MAJOR_TAB: [
            {name: "major_tab.wav", volume: 0.4},
        ],
        TOOLTIP_SPAWN: [
            {name: "tooltip_spawn.wav", volume: 0.3}
        ],
        TOOLTIP_HOVER: [
            {name: "tooltip_hover.wav", volume: 0.5, pitch: () => {return getRandomNumber(1.99, 2, true)}, alwaysDifferent: true, previousPitch: 2}
        ],
        TOOLTIP_CLOSE: [
            {name: "click2.wav", volume: 0.3, pitch: () => {return 1.2}}
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
        SOULWRITE_WRITE_WRITE: [
            {name: "soulwriteWriteWrite.wav", volume: 0.6}
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
        SOULWRITE_SLOT_IN: [
            {name: "soulwriteWriteSlotIn.wav", volume: 0.6}
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
        ],
        SOULBIND_PRESLOT: [
            {name: "soulbindPreslot1.mp3", volume: 0.6},
            {name: "soulbindPreslot2.mp3", volume: 0.6},
            {name: "soulbindPreslot3.mp3", volume: 0.6},
        ],
        SOULBIND_SLOT: [
            {name: "soulbindBind1.wav", volume: 0.6},
            {name: "soulbindBind2.wav", volume: 0.6},
            {name: "soulbindBind3.wav", volume: 0.6},
        ],
        SOULBIND_UNSLOT: [
            {name: "soulbindUnbind1.wav", volume: 0.6, alwaysDifferent: true, previousPitch: 1, pitch: () => {return getRandomNumber(0.98, 1.05)}}
        ],
        DUNGEON_ROOM_ENTER: [
            {name: "du_roomEnter1.wav", volume: 0.5, alwaysDifferent: true, previousPitch: 1, pitch: () => {return getRandomNumber(0.98, 1.05)}},
            {name: "du_roomEnter2.wav", volume: 0.5, alwaysDifferent: true, previousPitch: 1, pitch: () => {return getRandomNumber(0.98, 1.05)}},
            {name: "du_roomEnter3.wav", volume: 0.5, alwaysDifferent: true, previousPitch: 1, pitch: () => {return getRandomNumber(0.98, 1.05)}},
            {name: "du_roomEnter4.wav", volume: 0.5, alwaysDifferent: true, previousPitch: 1, pitch: () => {return getRandomNumber(0.98, 1.05)}},
        ],
        AF_SUCCESS: [
            {name: "af_success.wav", volume: 0.4}
        ],
        AF_FAILURE: [
            {name: "af_failure.wav", volume: 0.4}
        ],
        AF_CRITICAL_SUCCESS: [
            {name: "af_criticalsuccess.wav", volume: 0.4}
        ],
        AF_CRITICAL_FAILURE: [
            {name: "af_criticalfailure.wav", volume: 0.4}
        ],
        AF_REVERT: [
            {name: "af_revert.wav", volume: 0.4}
        ],
        AF_WARPED: [
            {name: "af_warped.wav", volume: 0.4}
        ],
        AF_SEALED: [
            {name: "af_sealed.wav", volume: 0.4}
        ],
    },
    Methods: {
        playSound: playSound = (type, vol = 0.5, pit = 1) => {
            const file = choose(Sounds.Types[type.toUpperCase()]);

            const volume = file.volume || vol;
            const pitch = file.pitch ? Sounds.Methods.getPitch(file) : pit;

            const audio = new Audio(Sounds.FOLDER + file.name);
            const dur = audio.duration;
            audio.volume = volume;
            if(pitch != 1) audio.preservesPitch = false;
            audio.playbackRate = pitch;
            audio.play();

            return dur;
        },
        getPitch: getPitch = (obj) => {
            const alwaysDifferent = getValueFromObject(obj, 'alwaysDifferent', false);
            let pitch = 0;

            if(alwaysDifferent) {
                do {
                    pitch = obj.pitch();
                } while(pitch === obj.previousPitch);
            }
            else pitch = obj.pitch();

            return pitch;
        }
    }
}
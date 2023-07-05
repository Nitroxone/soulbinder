/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

class Enemy extends NPC {
    constructor(name,
                desc,
                charset,
                subname,
                health,
                mana,
                stamina,
                dodge,
                speed,
                accuracy,
                protection,
                might,
                spirit,
                resBleed,
                resPoison,
                resMove,
                resStun,
                resilience,
                warding,
                critEffects,
                variables,
                triggers,
                mobType,
                skills,
                behavior,
                drops
                ) {
        super(name, desc, charset, subname, health, mana, stamina, dodge, speed, accuracy, protection, might, spirit, resBleed, resPoison, resMove, resStun, resilience, warding, critEffects, variables, triggers);
        this.mobType = mobType;
        this.skills = skills;
        this.behavior = behavior;
        this.drops = drops;
    }
}
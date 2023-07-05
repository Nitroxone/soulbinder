/*

 Copyright (c) 2023 ntrx

 This software is licensed under the GNU General Public License v2.0.
 You may obtain a copy of the license at https://www.gnu.org/licenses/gpl-2.0.en.html

*/

class Soulbinding {
    constructor() {
        this.item = null;
    }

    setItem(event) {
        // retrieving data
        const weapon = event.dataTransfer.getData("weapon");
        const armor = event.dataTransfer.getData("armor");
        const trinket = event.dataTransfer.getData("trinket");

        if(weapon !== '') this.item = getInventoryWeaponById(Number(weapon));
        else if(armor !== '') this.item = getInventoryArmorById(Number(armor));
        else if(trinket !== '') this.item = getInventoryTrinketById(Number(trinket));

        getSoulbindingItem(true);
    }
}
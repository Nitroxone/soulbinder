/*

 Copyright (c) 2023 ntrx. All rights reserved.

*/

class Soulbending {
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

        getSoulbendingItem(true);
    }
}
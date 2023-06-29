let Icons = {
    Potions: [
        {icon: 1, name: 'Radiant Bottle', unlocked: true},
        {icon: 2, name: 'Necrotic Bottle', unlocked: true},
        {icon: 3, name: 'Dragonfire Bottle', unlocked: true},
        {icon: 4, name: 'Wrath Bottle', unlocked: true},
        {icon: 5, name: 'Venomous Bottle', unlocked: true},
        {icon: 6, name: 'Bloodmoon Bottle', unlocked: true},
        {icon: 7, name: 'Starshade Bottle', unlocked: true},
        {icon: 8, name: 'Milk and Peach Bottle', unlocked: true},
        {icon: 9, name: 'Twilight Bottle', unlocked: true},
    ],
    Sigils: [
        {icon: 1, name: 'Labradorite Stone n°1', unlocked: true},
        {icon: 2, name: 'Labradorite Stone n°2', unlocked: false},
        {icon: 3, name: 'Labradorite Stone n°3', unlocked: false},
        {icon: 4, name: 'Carnelian Stone n°1', unlocked: true},
        {icon: 5, name: 'Carnelian Stone n°2', unlocked: false},
        {icon: 6, name: 'Carnelian Stone n°3', unlocked: false},
        {icon: 7, name: 'Jade Stone n°1', unlocked: true},
        {icon: 8, name: 'Jade Stone n°2', unlocked: false},
        {icon: 9, name: 'Jade Stone n°3', unlocked: false},
        {icon: 10, name: 'Citrine Stone n°1', unlocked: true},
        {icon: 11, name: 'Citrine Stone n°2', unlocked: false},
        {icon: 12, name: 'Citrine Stone n°3', unlocked: false},
        {icon: 13, name: 'Aquamarine Stone n°1', unlocked: true},
        {icon: 14, name: 'Aquamarine Stone n°2', unlocked: false},
        {icon: 15, name: 'Aquamarine Stone n°3', unlocked: false},
        {icon: 16, name: 'Rose Quartz Stone n°1', unlocked: true},
        {icon: 17, name: 'Rose Quartz Stone n°2', unlocked: false},
        {icon: 18, name: 'Rose Quartz Stone n°3', unlocked: false},
        {icon: 19, name: 'Larimar Stone n°1', unlocked: true},
        {icon: 20, name: 'Larimar Stone n°2', unlocked: false},
        {icon: 21, name: 'Larimar Stone n°3', unlocked: false},
        {icon: 22, name: 'Howlite Stone n°1', unlocked: true},
        {icon: 23, name: 'Howlite Stone n°2', unlocked: false},
        {icon: 24, name: 'Howlite Stone n°3', unlocked: false},
        {icon: 25, name: 'Purple Garnet Stone n°1', unlocked: true},
        {icon: 26, name: 'Purple Garnet Stone n°2', unlocked: false},
        {icon: 27, name: 'Purple Garnet Stone n°3', unlocked: false},
    ],
    Methods: {
        unlockIcon: unlockIcon = (type, num) => {
            Icons[capitalizeFirstLetter(type.toLowerCase())].find(item => item.icon === num).unlocked = true;
        },

        findRandom: findRandom = (type) => {
            return choose(Icons.Methods.getAllUnlocked(type));
        },

        findByName: findByName = (type, name) => {
            return Icons[capitalizeFirstLetter(type.toLowerCase())].filter(item => item.name.toLowerCase() === name.toLowerCase())[0];
        },

        findByIcon: findByIcon = (type, num) => {
            return Icons[capitalizeFirstLetter(type.toLowerCase())].filter(item => item.icon === num)[0];
        },

        getAllUnlocked: getAllUnlocked = (type) => {
            return Icons[capitalizeFirstLetter(type.toLowerCase())].filter(item => item.unlocked);
        }
    }
}
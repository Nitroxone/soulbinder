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
        {icon: 1, name: 'Gray Agate No.1', unlocked: true},
        {icon: 2, name: 'Gray Agate No.2', unlocked: false},
        {icon: 3, name: 'Gray Agate No.3', unlocked: false},
        {icon: 4, name: 'Fire Opal No.1', unlocked: true},
        {icon: 5, name: 'Fire Opal No.2', unlocked: false},
        {icon: 6, name: 'Fire Opal No.3', unlocked: false},
        {icon: 7, name: 'Jade No.1', unlocked: true},
        {icon: 8, name: 'Jade No.2', unlocked: false},
        {icon: 9, name: 'Jade No.3', unlocked: false},
        {icon: 10, name: 'Citrine No.1', unlocked: true},
        {icon: 11, name: 'Citrine No.2', unlocked: false},
        {icon: 12, name: 'Citrine No.3', unlocked: false},
        {icon: 13, name: 'Aquamarine No.1', unlocked: true},
        {icon: 14, name: 'Aquamarine No.2', unlocked: false},
        {icon: 15, name: 'Aquamarine No.3', unlocked: false},
        {icon: 16, name: 'Rose Quartz No.1', unlocked: true},
        {icon: 17, name: 'Rose Quartz No.2', unlocked: false},
        {icon: 18, name: 'Rose Quartz No.3', unlocked: false},
        {icon: 19, name: 'Turquoise No.1', unlocked: true},
        {icon: 20, name: 'Turquoise No.2', unlocked: false},
        {icon: 21, name: 'Turquoise No.3', unlocked: false},
        {icon: 22, name: 'Moonstone No.1', unlocked: true},
        {icon: 23, name: 'Moonstone No.2', unlocked: false},
        {icon: 24, name: 'Moonstone No.3', unlocked: false},
        {icon: 25, name: 'Purple Garnet No.1', unlocked: true},
        {icon: 26, name: 'Purple Garnet No.2', unlocked: false},
        {icon: 27, name: 'Purple Garnet No.3', unlocked: false},
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
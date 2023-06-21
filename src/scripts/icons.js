let Icons = {
    Potions: [
        {icon: 1, name: 'Radiant Bottle', unlocked: true},
        {icon: 2, name: 'Necrotic Bottle', unlocked: true},
        {icon: 3, name: 'Dragonfire Bottle', unlocked: true},
        {icon: 4, name: 'Wrath Bottle', unlocked: true},
        {icon: 5, name: 'Venomous Bottle', unlocked: true},
        {icon: 6, name: 'Bloodmoon Bottle', unlocked: true},
        {icon: 7, name: 'Starshade Bottle', unlocked: false},
        {icon: 8, name: 'Milk and Peach Bottle', unlocked: false},
        {icon: 9, name: 'Twilight Bottle', unlocked: false},
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
// name, desc, price, tags, image, animal

// adj: amazing big long red etc...
// animal: dog cat bird
// object: leash collar etc...

// adj: amazing big long safe etc...
// color: red blue green etc...
// object: same as object above

// tags: three of the words above

const animals = ['cat', 'dog'];
const adjectives = ['big', 'long', 'amazing', 'safe', 'retractable', 'reflective', 'fun', 'enjoyable', 'hard', 'tough', 'clean', 'cleanable', 'dashing', 'bright', 'bouncy', 'thin', 'thick', 'fresh', 'elegant'];
const colors = ['red', 'green', 'blue', 'cyan', 'yellow', 'white', 'black', 'purple', 'orange', 'gray', 'slate', 'magenta', 'pink', 'violet', 'brown'];
const objects = ['leash', 'collar', 'toy', 'bone', 'mouse', 'snack', 'bottle', 'bowl', 'light', 'shoe', 'cable', 'kong', 'squeeker', 'bed', 'cookie', 'slipper'];

const randomArrayString = arr => {
    const randomIndex = Math.floor(Math.random() * (arr.length))
    return arr[randomIndex];
}

const upperCaseWord = word => word[0].toUpperCase() + word.substring(1);

const upperCaseName = name => {
    const words = name.split(' ');
    const upperCasedName = words.map(word => upperCaseWord(word));

    return upperCasedName.join(' ');
}

export const generateRandomProducts = amount => {
    const products = [];

    for (let i = 0; i < amount; i++) {
        const obj = {name: '', description: '', image: 'abc', tags: [], price: 0}
    
        const animal = randomArrayString(animals);
        const selectedObject = randomArrayString(objects);
    
        obj.animal = upperCaseWord(animal);
    
        for (let i = 0; i < 2; i++) obj.name += randomArrayString(adjectives) + ' ';
        obj.name += randomArrayString(colors) + ' ';
        obj.name += selectedObject + ' for ';
        obj.name += animal + 's';
        obj.name = upperCaseName(obj.name);
    
        for (let i = 0; i < 6; i ++) obj.description += randomArrayString(adjectives) + ' ';
        obj.description += randomArrayString(colors) + ' ';
        obj.description += selectedObject + ' for '
        obj.description += animal +'s';
    
        obj.price = (Math.random() * 100).toFixed(2);
    
        for (let i = 0; i < 2; i++) obj.tags.push(randomArrayString(adjectives))
        obj.tags.push(animal);

        products.push(obj);
    };

    return products;
}


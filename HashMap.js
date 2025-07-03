// A hash map is very efficient in its insertion, retrieval and removal operations. This is because we use array indexes to do these operations. A hash map has an average case complexity of O(1) for the following methods:

//     Insertion
//     Retrieval
//     Removal

function HashMap() {
    let loadFactor = 0.75;
    let capacity = 16;
    let buckets = [];
    let count = 0;

    // if (index < 0 || index >= buckets.length) {
    //     throw new Error("Trying to access index out of bounds");
    // }

    const isLoad = () => {
        console.log(count);
        if (count > 12 ) {
            capacity = 2 * capacity
        }        
    }
        
    const hash = (key) => {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i) % capacity;            
        }

        return hashCode;
    }

    const set = (key, value) => {
        let hashCode = hash(key);
        let hashKey = { key: key, value: value, nextNode: null };
        let i = 0;
        let node = null;

        // To calculate index in an hashmap, we can do it like this:
        i = hashCode % 16;
        node = buckets[i];
        
        while (node) {
            if (node.key === hashKey.key) {
                node.value = hashKey.value;
                isLoad();
                return buckets;
            } 
            if (!node.nextNode) {
                node.nextNode = hashKey;
                count++;
                isLoad();
                return buckets;
            }
            node = node.nextNode;   
        }
        buckets[i] = hashKey;
        count++;

        return buckets;
    } 

    const get = (key) => {
        let hashCode = hash(key);
        let i = 0;
        let node = null;

        i = hashCode % 16;
        node = buckets[i];

        if (!node) return null;
        
        while (node) {
            if (node.key === key) {
                return `The key ${key} was found and it's value is ${node.value}`;
            } 
            if (!node.nextNode) return null;

            node = node.nextNode; 
        } 
    }

    const has = (key) => {
        let hashCode = hash(key);
        let i = 0;
        let node = null;

        i = hashCode % 16;
        node = buckets[i];

        if (!node) return false;
        
        while (node) {
            if (node.key === key) return true;
            node = node.nextNode; 
        }
        return false;
    }

    const remove = (key) => {
        let hashCode = hash(key);
        let i = 0;
        let node = null;
        let prev = null;

        i = hashCode % 16;
        node = buckets[i];

        if (!node) return false;

        while (node) {
            if (node.key === key) {
                if (prev == null) {
                    buckets[i] = node.nextNode;
                    count--;
                } else {
                    prev.nextNode = node.nextNode;
                    count--;
                }
                return true;
            }
            prev = node;
            node = node.nextNode; 
        }
    }  

    const length = () => {
        return `The number of stored keys in the hash map is: ${count}.`;
    }

    const clear = () => {
        buckets = [];
        count = 0;
    }

    const keys = () => {
        let keys = [];

        if (!buckets) return []

        for (let i=0; i<buckets.length; i++) {
            if (buckets[i]) {
                node = buckets[i];
                while (node) {
                    keys.push(node.key);
                    node = node.nextNode;
                }
            }
        }
        return keys
    }

    const values = () => {
        let values = [];

        if (!buckets) return []

        for (let i=0; i<buckets.length; i++) {
            if (buckets[i]) {
                node = buckets[i];
                while (node) {
                    values.push(node.value);
                    node = node.nextNode;
                }
            }
        }
        return values
    }

    const entries = () => {
        let pair = [];

        if (!buckets) return []

        for (let i=0; i<buckets.length; i++) {
            if (buckets[i]) {
                node = buckets[i];
                while (node) {
                    pair.push([node.key, node.value]);
                    node = node.nextNode;
                }
            }
        }
        return pair
    }    

    return { hash, set, get, has, remove, length, clear, keys, values, entries, isLoad }
}

const hashmap = new HashMap() // or HashMap() if using a factory

hashmap.set('apple', 'red')
hashmap.set('banana', 'yellow')
hashmap.set('carrot', 'orange')
hashmap.set('dog', 'brown')
hashmap.set('elephant', 'gray')
hashmap.set('frog', 'green')
hashmap.set('grape', 'purple')
hashmap.set('hat', 'black')
hashmap.set('ice cream', 'white')
hashmap.set('jacket', 'blue')
hashmap.set('kite', 'pink')
hashmap.set('lion', 'golden')
hashmap.set('moon', 'silver')

console.log(hashmap.length());

console.log(hashmap.get('lion'));
console.log(hashmap.get('apple'));
console.log(hashmap.get('dinosaur'));

console.log(hashmap.has('dog'));
console.log(hashmap.has('lemon'));

console.log(hashmap.remove('frog'));
console.log(hashmap.remove('bee'));

console.log(hashmap.length());
console.log(hashmap.clear());
console.log(hashmap.length());

console.log(hashmap.keys());
console.log(hashmap.values());
console.log(hashmap.entries());
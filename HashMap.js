// A hash map is very efficient in its insertion, retrieval and removal operations. This is because we use array indexes to do these operations. A hash map has an average case complexity of O(1) for the following methods:

const { Logger } = require("mongodb");

//     Insertion
//     Retrieval
//     Removal

function HashMap() {
    let loadFactor = 0.75;
    let capacity = 16;
    let buckets = [];

    // if (index < 0 || index >= buckets.length) {
    //     throw new Error("Trying to access index out of bounds");
    // }

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
        let hashKey = { key: hashCode, value: value, nextNode: null };
        let i = 0;
        let node = null;

        // To calculate index in an hashmap, we can do it like this:
        i = hashCode % 16;
        node = buckets[i];
        
        while (node) {
            if (node.key === hashKey.key) {
                node.value = hashKey.value;
                return buckets;
            } 
            if (!node.nextNode) {
                node.nextNode = hashKey;
                return buckets;
            }
            node = node.nextNode;   
        }

        buckets[i] = hashKey;
        
        return buckets;
    } 
        
    return {hash, set}
}

const hashmap = new HashMap() // or HashMap() if using a factory

hashmap.set('apple', 'red')
hashmap.set('apple', 'red')
hashmap.set('apple', 'green')
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
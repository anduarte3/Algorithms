// A hash map is very efficient in its insertion, retrieval and removal operations. This is because we use array indexes to do these operations. A hash map has an average case complexity of O(1) for the following methods:

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
        let hashKey = { key: hashCode, value: value, nextNode: null};
        let index = 0;

        // To calculate index in an hashmap, we can do it like this:
        index = hashCode % 16;
        
        // Iterate over a loop, if array.length is 0 then just push
        // We are supposed to be checking for collisions, so it's ok to loop
        //if (buckets.length === 0) buckets.push(hashKey);

        //console.log("Index: ", index);
        //console.log(buckets[index]);
        
        // If true means that we already have a value inside this bucket
        if (buckets[index]) {
            console.log(buckets[index].key);
            if (buckets[index].key == hashKey.key) {
                buckets[index].nextNode = hashKey;
                console.log("Curr Node:", buckets[index]);
            } else {
                console.log("Previous value:", buckets[index].value);
                buckets[index].value = hashKey.value;
                console.log("New value:", buckets[index].value);   
            }
            //console.log("Next Node:", buckets[index].nextNode);
            // Now the buckets[index].nextNode is pointing to hashKey.key object
        } //else if (buckets[index].value !== hashKey.value) {
            // buckets[index].value = hashKey.value;
            // console.log("Old value replaced with New");
        else {
            buckets[index] = hashKey;
        }
    
        return buckets
    } 
        
        //console.log("Buckets Array:", buckets);
        
        // If a key already exists, the old value is overwritten
        // Though keep in mind of collisions eg: "Rama" and "Sita"
        // Which means we need to use a linked list
    
        // Collisions happen when two different keys generate the same hash code
        // and get assigned to the same bucket

        // Pay attention to load factor as its important to grow buckets exactly as they are being expanded. 
  

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
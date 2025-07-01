// A hash map is very efficient in its insertion, retrieval and removal operations. This is because we use array indexes to do these operations. A hash map has an average case complexity of O(1) for the following methods:

//     Insertion
//     Retrieval
//     Removal

function HashMap() {
    let loadFactor = 0;
    let capacity = 0;
    let index = 0;
    let buckets = [];

    // if (index < 0 || index >= buckets.length) {
    //     throw new Error("Trying to access index out of bounds");
    // }

    const hash = (key) => {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        hashCode = hashCode % 2;

        return hashCode;
    }

    const set = (key, value) => {
        // Value becomes key
        // If there is a key then we replace the old value

        // Collisions happen when two different keys generate the same hash code
        // and get assigned to the same bucket

        // Pay attention to load factor as its important to grow buckets exactly as they are being expanded. 
    }

    return {hash, set}
}


 const hashmap = new HashMap() // or HashMap() if using a factory

 console.log(hashmap);
 
// Merge Sort, function that splits the array into smaller subarrays and then calls merge functions to combine them
// Merge, function takes two already sorted subarrays as input and merges them into a single sorted array

let array = [5,2,3,1,6,4,8,7];

function mergeSort(array) {
    let middle = 0;
    let leftArray = [];
    let rightArray = [];
    let sortedLeft = [];
    let sortedRight = [];

    if (array.length < 2) return array

    middle = Math.round((array.length / 2));
    leftArray = array.slice(0, middle);
    rightArray = array.slice(middle, array.length);    
    
    sortedLeft = mergeSort(leftArray)
    sortedRight = mergeSort(rightArray)

    return merge(sortedLeft, sortedRight);
}

function merge(leftArray, rightArray) {
    let sortedArray = [];
    let i = 0;
    let j = 0; 

    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] < rightArray[j]) {
            sortedArray.push(leftArray[i]);
            i++;
        } else {
            sortedArray.push(rightArray[j]);
            j++;
        }
    }

    while (i < leftArray.length) {
        sortedArray.push(leftArray[i]);
        i++;
    }

    while (j < rightArray.length) {
        sortedArray.push(rightArray[j]);
        j++;
    }

    return sortedArray;
}

console.log("Unsorted Array:", array);
console.log("Sorted Array:", mergeSort(array))
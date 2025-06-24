// Merge sorting an array is to divide the array until length is 2, 
// then compare both and change to and add the smallest to a new array

// Splitting the Array into 2 halves
// Splitting the SubArrays into 2 halves
// Merge into Sorte SubArrays

let array = [2,4,3,1];

function splitArray(array) {
    let middle = 0;
    let leftSubArray = [];
    let rightSubArray = [];
    
    middle = Math.round((array.length / 2));
    leftSubArray = array.slice(0, middle);
    rightSubArray = array.slice(middle, array.length);

    mergeSort(leftSubArray, rightSubArray);
}

function mergeSort(leftArray, rightArray) {
    let sortedArray = [];
    let leftSortedArray = [];
    let rightSortedArray = [];
    let length = leftArray.length
    
    if (leftArray.length > 2) {
        splitArray(leftArray)
    }
    if (rightArray.length > 2) {
        splitArray(rightArray)
    }
    // Note: If array.length = 1 no need to sort

    // 
    

    if (leftArray[0] < leftArray[1]) {
        leftSortedArray.push(leftArray[0])
        leftSortedArray.push(leftArray[1])
    } else {
        leftSortedArray.push(leftArray[1])
        leftSortedArray.push(leftArray[0])
    }

    if (rightArray[0] < rightArray[1]) {
        rightSortedArray.push(rightArray[0])
        rightSortedArray.push(rightArray[1])
    } else {
        rightSortedArray.push(rightArray[1])
        rightSortedArray.push(rightArray[0])
    }

    
    
    console.log("Sorted Array:", sortedArray);

    
}

splitArray(array);
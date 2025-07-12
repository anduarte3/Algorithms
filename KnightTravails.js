// You’ve worked with BFS on binary trees in the previous lesson, but applying it on a chessboard (a grid) can feel like a big leap — and that’s totally normal!

// Represent positions as coordinates: Each square can be written as [x, y], where both values range from 0 to 7.

// Use a queue: Like in tree BFS, you’ll use a queue to keep track of the next positions to explore.

// Track visited positions: Unlike trees, graphs can revisit the same position through different paths — so be sure to track visited positions to avoid loops or unnecessary repeats.

// As a reminder the Big O Notations are:

//     O(1) - Constant Complexity
//     O(log N) - Logarithmic Complexity
//     O(N) - Linear Complexity
//     O(N log N) - N x log N Complexity
//     O(n²) - Quadratic Complexity
//     O(n³) - Cubic Complexity
//     O(2ⁿ) - Exponential Complexity
//     O(N!) - Factorial Complexity

// Algorithm	Data Requirement	Average Speed	When to Use
// Linear Search	Unsorted	O(n)	Small or unsorted lists
// Binary Search	Sorted	O(log n)	Large, sorted lists
// Hash Search	Any (with hash)	O(1) (avg case)	When fast lookup is essential

function createChessBoard() {
    let chessboard = [];

    for (let i=0; i<8; i++) {
        let arr = [];
        for (let j=0; j<8; j++) {
            arr.push([i,j]);
        }
        chessboard.push(arr);
    }

    // Pretty print for Chessboard
    for (let rowIndex = chessboard.length - 1; rowIndex >= 0; rowIndex--) {
        let row = chessboard[rowIndex];
        console.log(row.map(square => `[${square[0]},${square[1]}]`).join(' '));
    }

    return chessboard;
}

let start = [0][0];
let end = [8][8];

function KnightMoves(start, end) {
    let knight = [];
    let queue = [];

    // Initialize chessboard
    let chessboard = createChessBoard();
    chessboard = new Array(chessboard.length).fill(false);

    chessboard[start] = true;
    console.log("Initial queue:", );
    
    queue.push(start);
    console.log("Checking queue:", queue);
    
    while (queue.length > 0) {

    }
}

console.log(KnightMoves(start, end));


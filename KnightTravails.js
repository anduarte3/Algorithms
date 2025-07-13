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

let start = [0,0];
let end = [7,7];

let offset = [1,2];

function KnightMoves(start, end) {
    let move = [];
    let queue = [];
    // Knight moves a combination of 1,2
    let knightPath = [
        [1,2], [-1,2], [-1,-2], [1,-2], [2,1], [-2,1], [-2,-1], [2,-1]
    ];
    
    if (start[0] == end[0] && start[1] == end[1]) {
        return "Start and end are the same!"
    }

    // Initialize chessboard
    let chessboard = createChessBoard();
    chessboard = new Array(chessboard.length).fill(false);

    chessboard[start] = true;
    
    // Only push to the queue if value is correct
    for (let i=0; i<knightPath.length; i++) {
        move = start.map((val, e) => val + knightPath[i][e]);

        // Check if it's out of bounds
        if (move[0] < 0 || move[0] >= 7) {
            console.log("Error, out of bounds!", move);
        } else if (move[1] < 0 || move[1] >= 7) {
            console.log("Error, out of bounds!", move);
        } else {
            console.log("Move to:", move);
            queue.push(move);
        }
    }
    
    console.log("Checking queue:", queue);

    while (queue.length > 0) {
        let curr = queue.shift();
        console.log(curr);
    }
}

console.log(KnightMoves(start, end));
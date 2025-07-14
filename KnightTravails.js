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

function KnightMoves(start, end) {
    let length = 0;
    let queue = [];
    // Knight moves a combination of 1,2
    let path = [
        [1,2], [-1,2], [-1,-2], [1,-2], [2,1], [-2,1], [-2,-1], [2,-1]
    ];
    
    if (start[0] == end[0] && start[1] == end[1]) {
        return "Start and end are the same!"
    }

    // Initialize chessboard
    let chessboard = createChessBoard();
    chessboard = Array.from({ length: 8 }, () => Array(8).fill(false));;
    
    chessboard[start[0]][start[1]] = true;
    
    // Only push to the queue if value is correct
    const isMoveLegal = (move) => {

        // Check if it's out of bounds
        if (move[0] < 0 || move[0] > 7) {
            //console.log("Error, out of bounds!", move);
            return false;
        } else if (move[1] < 0 || move[1] > 7) {
            //console.log("Error, out of bounds!", move);
            return false;
        } else {
            //console.log("Move is valid!");
            return true;
        }
    }

    if (!isMoveLegal(start) || !isMoveLegal(end)) {
        return "Start or end position is out of bounds!";
    }
    
    queue.push({ position: start, path: [start] });

    while (queue.length > 0) {
        let size = queue.length;

        for (let i=0; i<size; i++) {
            let { position, path: curr} = queue.shift();

            // For each curr, generate next moves
            for (let p of path) {
                let next = position.map((val, i) => val + p[i]);

                if (isMoveLegal(next)) {
                    if (!chessboard[next[0]][next[1]]) {
                        chessboard[next[0]][next[1]] = true;
                        queue.push({ position: next, path: [...curr, next] });
                    }
                    if (next[0] == end[0] && next [1] == end[1]) { 
                        
                        return `You made it in ${length + 1} moves, The path was: ${JSON.stringify(queue[queue.length - 1].path.map(p => `[${p[0]},${p[1]}]`).join(' -> '))}.`
                    }
                }    
            }
        }
        length++;
    }
}

let start = [2,2];
let end = [4,4];

console.log(KnightMoves(start, end));
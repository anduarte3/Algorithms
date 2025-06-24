// The Fibonacci sequence, list of numbers, 
// where each number is the sum of the two preceding ones: 0, 1, 1, 2, 3, 5, 8, 13...

function fibonacci(n) {
    if (n == 0) return 0;
    if (n < 1) return 1;
  
    return fibonacci(n-1)+fibonacci(n-2)
}

console.log(fibonacci(0)) // Expect 0
console.log(fibonacci(1)) // Expect 1
console.log(fibonacci(2)) // Expect 1
console.log(fibonacci(3)) // Expect 2
console.log(fibonacci(4)) // Expect 3
console.log(fibonacci(5)) // Expect 5
console.log(fibonacci(6)) // Expect 8
console.log(fibonacci(7)) // Expect 13
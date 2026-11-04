// Named Function with parameter and return type
function add(a: number, b: number): number {
    return a + b;
}

// Anonymous Function
const subtract = function(a: number, b: number): number {
    return a - b;
};

// Arrow Function
const multiply = (a: number, b: number): number => a * b;

// Void Return Type
function logMessage(message: string): void {
    console.log(message);
}

// Function calls
console.log("Addition:", add(10, 20));
console.log("Subtraction:", subtract(50, 15));
console.log("Multiplication:", multiply(6, 7));
logMessage("Hello, TypeScript!");
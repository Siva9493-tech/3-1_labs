namespace MathUtility {
    export function add(a: number, b: number): number {
        return a + b;
    }

    export function subtract(a: number, b: number): number {
        return a - b;
    }
}

// Using the namespace
console.log("Namespace Add:", MathUtility.add(20, 10));
console.log("Namespace Subtract:", MathUtility.subtract(20, 10));
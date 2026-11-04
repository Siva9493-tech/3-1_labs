// 1. Generic Function
function identity<T>(value: T): T {
    return value;
}

// 2. Generic Function with multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

// 3. Generic Function with Constraint (only types that have length property)
function getLength<T extends { length: number }>(item: T): number {
    return item.length;
}

// Using the generic functions
console.log("Identity (number):", identity<number>(100));
console.log("Identity (string):", identity<string>("Hello TypeScript"));

console.log("Pair:", pair<string, number>("Age", 25));

console.log("Length of string:", getLength("TypeScript"));
console.log("Length of array:", getLength([10, 20, 30, 40]));
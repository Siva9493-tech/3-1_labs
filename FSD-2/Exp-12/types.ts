// Simple Types
let age: number = 20;
let name: string = "Lalitha";
let isStudent: boolean = true;
let height: number | null = null;
let randomValue: any = "Can be anything";
let nothing: void = undefined;

// Special Types
// Array
let scores: number[] = [85, 90, 95];

// Tuple
let studentTuple: [number, string, boolean] = [101, "Raji", true];

// Enum
enum Day {
    Sunday, Monday, Tuesday, Wednesday,
    Thursday, Friday, Saturday
}

// Union Type
let value: number | string;
value = 42;
value = "TypeScript";

// Display Output
console.log("---- Simple Types ----");
console.log("Number:", age);
console.log("String:", name);
console.log("Boolean:", isStudent);
console.log("Null (Height):", height);
console.log("Any:", randomValue);
console.log("Void:", nothing);

console.log("\n---- Special Types ----");
console.log("Array:", scores);
console.log("Tuple:", studentTuple);
console.log("Enum (Tuesday):", Day.Tuesday);
console.log("Union (Value):", value);
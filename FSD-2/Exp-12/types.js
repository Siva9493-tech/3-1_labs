"use strict";
// Simple Types
let age = 20;
let name = "Lalitha";
let isStudent = true;
let height = null;
let randomValue = "Can be anything";
let nothing = undefined;
// Special Types
// Array
let scores = [85, 90, 95];
// Tuple
let studentTuple = [101, "Raji", true];
// Enum
var Day;
(function (Day) {
    Day[Day["Sunday"] = 0] = "Sunday";
    Day[Day["Monday"] = 1] = "Monday";
    Day[Day["Tuesday"] = 2] = "Tuesday";
    Day[Day["Wednesday"] = 3] = "Wednesday";
    Day[Day["Thursday"] = 4] = "Thursday";
    Day[Day["Friday"] = 5] = "Friday";
    Day[Day["Saturday"] = 6] = "Saturday";
})(Day || (Day = {}));
// Union Type
let value;
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

"use strict";
// Arrow Function with Optional Parameter
const greet = (name, age) => {
    if (age !== undefined) {
        return `Hello ${name}, you are ${age} years old.`;
    }
    return `Hello ${name}!`;
};
// Arrow Function with Default Parameter
const welcome = (name, city = "Hyderabad") => {
    return `Welcome ${name} from ${city}`;
};
// Arrow Function with Rest Parameters
const sum = (...numbers) => {
    return numbers.reduce((acc, curr) => acc + curr, 0);
};
// Function calls
console.log(greet("Ravi"));
console.log(greet("Ravi", 25));
console.log(welcome("Sneha"));
console.log(welcome("Sneha", "Bangalore"));
console.log("Sum:", sum(10, 20, 30, 40));

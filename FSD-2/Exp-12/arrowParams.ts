class Person {
    public name: string;           // Public property
    private age: number;           // Private property
    protected city: string;        // Protected property
    readonly id: number;           // Readonly property

    // Constructor
    constructor(name: string, age: number, city: string, id: number) {
        this.name = name;
        this.age = age;
        this.city = city;
        this.id = id;
    }

    // Public method
    public display(): void {
        console.log(`Name: ${this.name}, Age: ${this.age}, City: ${this.city}, ID: ${this.id}`);
    }

    // Method to access private property
    public getAge(): number {
        return this.age;
    }
}

// Create object
const person1 = new Person("Alice", 22, "Hyderabad", 101);

// Access public members
console.log("Name:", person1.name);
person1.display();
console.log("Age (via method):", person1.getAge());

// person1.age = 25;        // Error: private
// person1.id = 200;        // Error: readonly
//Basics of Objects

const person = {
    name: "Rahul",
    age: 30,
    isStudent: false
};
console.log("person",person);
console.log("Name:",person.name);
console.log("Age:",person["age"]);

//Add a new property
person.city = "Mysore";
console.log("person",person);

//Modify
person.age = 31;

//Delete
delete person.isStudent;
console.log("Person",person);

//Object constructor
const car = new Object();
car.make = "Audi";
car.model = "A4";
car.year = 2026;
console.log("Car",car)

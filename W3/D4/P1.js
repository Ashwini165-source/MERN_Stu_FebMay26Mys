//Arrays Basics

console.log("Arrays basics");
//Creating arrays
let emptyArray = [];
let numArray = [1, 2, 3, 4];
let mixedArray = [42, "hello", true, null, { name: "Gola" }, [5, 6]];
console.log(emptyArray);
console.log(numArray);
console.log(mixedArray);

//Using Constructor
let fruits = new Array("Apple","Mango");
console.log(fruits);
console.log("Is fruits an array?",Array.isArray(fruits));

//Push : add
fruits.push("Cherry");
console.log(fruits);

//pop :remove
fruits.pop();
console.log(fruits);

//unshift: adds to beginning 
fruits.unshift("Orange");
console.log(fruits);

//shift: remove from beginning
fruits.shift();
console.log(fruits);
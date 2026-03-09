// Throwing custom errors
// function divide(a,b){
//     if(b===0){
//         throw new Error("Cannot divide by zero");
//     }
//     return a/b;
// }
// try{
//     //console.log(divide(10,2));
//     console.log(divide(10,0));
// }
// catch(err){
//     console.log("Caught: ",err.message);
// }
// function checkAge(age){
//     if(age<18){
//         throw new Error("Age must be 18 and above");
//     }
//     console.log("you can vote");
//     return age;
// }
// try{
//     console.log(checkAge(10));
//     console.log(checkAge(20));
// }
// catch(err){
//     console.log("Caught: ",err.message);
// }

//create a custom error class
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
function createUser(name) {
    if (!name) {
        throw new ValidationError(" Name is required");
    }
    return { name };
}
try {
    createUser("");
    createUser("Ashu");

}
catch (err) {
    console.log("Caught: ", err.message);
}
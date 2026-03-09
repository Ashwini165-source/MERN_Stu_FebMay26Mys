//try catch Basics
// reference erroe
try {
    console.log("Trying to access undefined variable");
    console.log(notDefined);
}
catch (err) {
    console.log("Error caught", err.name, "-", err.message);
    error.innerHTML = "1 Trying to access undefined variable";
    error.textContent = "2 Trying to access undefined variable";
}
console.log("Program execution continues");


// JSON Parsing error
let jsonText = "{json}";
try {
    let data = JSON.parse(jsonText);
    console.log(data);
}
catch (err) {
    console.log("JSON parse error: ", err.message);
}


try {
    let num = 10;
    num();
}
catch (err) {
    console.log("Caught error: ", err.name);
}
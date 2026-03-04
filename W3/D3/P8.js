//JSON stringify parse
const employee = {
    id:101,
    name: "Sandeep",
    dept: "ME",
    isActive: true,
};
const jsonString = JSON.stringify(employee);
console.log(jsonString);

//JSON parsing
const parsedObject = JSON.parse(jsonString);
console.log(parsedObject);
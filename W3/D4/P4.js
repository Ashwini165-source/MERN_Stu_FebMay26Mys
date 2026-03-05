// Filter method
let marks = [75,49,56,70,82];
let passed = marks.filter(marks => marks >= 70);

console.log(marks);
console.log(passed);

let students = [
    {name:"Aishu", score: 75},
    {name:"Bindu", score: 49},
    {name:"sahana", score: 56},
    {name:"Appu", score: 70},
    {name:"Sindhu", score: 82}
];
// let passedStudents = students.filter(student => student.score >= 70);
// console.log(students);
// console.log(passedStudents);

// let passedStudents = students.filter(student => student.score >= 70)
// let jeevan = assedStudents.map(user => user.name);

let passedStudents = students.filter(student => student.score >= 70).map(user => user.name);
console.log(students);
console.log(passedStudents);

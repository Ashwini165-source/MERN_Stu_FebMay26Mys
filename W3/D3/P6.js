// Nested object and Methods

const student = {
    firstName : "Santosh",
    lastName:"Sharma",
    scores:{
        math: 80,
        science: 83
    },
    hobbies:["reading","singing"],
    fullname: function(){
        return this.firstName + " "+this.lastName;
    },
    greet(){
        console.log("Hi, ",this.fullname());
    }
};
// console.log("Student",student);
// console.log("Scores",student.scores);
console.log(student.fullname());
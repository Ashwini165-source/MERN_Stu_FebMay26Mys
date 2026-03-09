// Logging
console.log("Console logging");
console.warn("Warning message");
console.error("Error message");
let users = [
    { id: 1, name: "Amit" },
    { id: 2, name: "Santosh" },
];
console.log(users);
console.table(users);

//Groups related logs
console.group("Grouped logs");
console.log("Log 1");
console.log("Log 2");
console.log("Log 3");
console.groupEnd();

//measure exection time
console.time("LoopTimer");
for(let i=0;i<1000;i++){}
console.timeEnd("LoopTimer");
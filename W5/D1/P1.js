//Introduction to Node.js

const runtimeName = "Node.js";
//console.log("Tntroduction to Node.js");
// console.log(`${runtimeName} runs javascript outside the browser`);

const commonUses = [
    "used for Server-side app",
    "automation scripts can be created"
];
//array destructuring
// console.log(commonUses[0]);
// console.log(commonUses[1]);
commonUses.forEach((commonUse,index)=>{
    console.log(`${index+1}.${commonUse}`);
});
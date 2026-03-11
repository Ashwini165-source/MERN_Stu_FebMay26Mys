//p1.js
const checkBtn = document.getElementById("checkBtn");

checkBtn.addEventListener("click",function(){
    console.log("Local Storage check",typeof localStorage !=="undefined")
    console.log("Session Storage check",typeof sessionStorage !=="undefined")
    console.log("localStorage object",localStorage);
    console.log("sessionStorage object",sessionStorage);
});
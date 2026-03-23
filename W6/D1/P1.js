//Basics NodeJS Modules
const moduleTitle =  "NodeJS module basics";
function describeModule(){
    console.log("This file is its own module");
    console.log("Title:",moduleTitle);
    console.log("Local values stay inside this file unless exported");
}
describeModule();//invoking or calling the function
// Understanding Path module and json module

const path = require("path");
//JSON is loaded as a normal JS object in commonJS
const appConfig = require("./support/app-config.json");

console.log("__dirname", __dirname);
console.log("__filename", __filename);

console.log("Application name:", appConfig.appName);
console.log("Environment:", appConfig.environment);
//join will be removing the square brackets
console.log("Features:", appConfig.features.join(", "));
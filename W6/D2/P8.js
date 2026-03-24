//Handling the error event in EventEmitter
const EventEmitter = require("events");

const fileEmitter = new EventEmitter();

//Register an error listener
fileEmitter.on("error", function (errorMessage) {
    console.log("emitter handler error", errorMessage);
});

//Normal event listener
fileEmitter.on("fileProcessed", function (fileName) {
    console.log("File processed succesfully.", fileName);
});

fileEmitter.emit("fileProcessed", "report.csv");
fileEmitter.emit("error", "File procssing failed.");
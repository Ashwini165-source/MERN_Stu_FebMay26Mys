// Removing EventEmitter listeners

const Eventemitter = require("events");

const jobEmitter = new Eventemitter();

function showJobProgress(status){
    console.log("Job Status",status);
}

// Add listener
jobEmitter.on("progress",showJobProgress);

// Emit the event
jobEmitter.emit("progress","50% Completed");

// Remove listener
jobEmitter.off("progress",showJobProgress);

// Emit the event
jobEmitter.emit("progress","100% Completed");
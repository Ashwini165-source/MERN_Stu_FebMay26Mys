// Reading and writing files asynchronously with callbacks
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "async-note.txt");

// To write to a file 
fs.appendFile(
    filePath,
    "This is writen asynchronously using writeFile().",
    function (writeError) {
        if (writeError) {
            console.log("Write error: ", writeError.message);
            return;
        }
        console.log("File writen asynchronously.");
    }
);

const content = fs.readFile(filePath, "utf-8",
    function (readError, content) {
        if (readError) {
            console.log("Read Error: ", readError.message);
            return;
        }
        console.log(content);
    }

);

console.log("Script continues while file operations are in progress.");

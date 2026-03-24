//How JS handles asynchronous task in NodeJS
function fetchReport(callback) {
    console.log("Fetching report data...");

    setTimeout(() => {
        const report = "Monthly report is ready";
        callback(report);
    }, 1000);
}
fetchReport(function (reportMessage) {   //fetchReport is sync but function is async,sync executed 1st,then async
    console.log(reportMessage);
});

console.log("Application continues to execute further")
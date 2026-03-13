
// JSON Audit on a Single Report

function auditReport() {
  const reportJSON = `{
    "app": "Portal",
    "status": "OK",
    "modules": {
      "auth": "OK",
      "payment": "OK",
      "results": "FAIL",   
      "profile": "OK" 
    }
  }`;

  // Convert JSON string into JavaScript object(parse)
  const report = JSON.parse(reportJSON);

  let okCount = 0;
  let failCount = 0;

  for (let module in report.modules) {

    if (report.modules[module] === "OK") {
      okCount++;
    }

    if (report.modules[module] === "FAIL") {
      failCount++;
      break;   // Stop immediately if FAIL 
    }
  }

  const summary = {
    app: report.app,
    okCount: okCount,
    failCount: failCount
  };

  // Convert object to JSON string( stringify)
  const summaryJSON = JSON.stringify(summary);

  return {
    summaryObject: summary,
    summaryString: summaryJSON
  };
}

const result = auditReport();
console.log("Summary Object:");
console.log(result.summaryObject);
console.log("Summary JSON String:");
console.log(result.summaryString);
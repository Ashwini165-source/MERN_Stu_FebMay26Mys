// parsing the JSON request bodies
const http = require("http");
const server = http.createServer(function (req, res) {
    if (req.method === "POST" && req.url === "/api/users") {
        let body = "";
        req.on("data", function (chunk) {
            body += chunk.toString();

        });
        req.on("end", function () {
            try {
                const parsed = JSON.parse(body);
                res.writeHead(201, { "content-type": "application/json" });
                res.end(JSON.stringify({
                    sucess: true,
                    received: parsed


                }));
                return;
            }
            catch (error) {
                res.writeHead(400, { "content-type": "application/json" });
                res.end(JSON.stringify({
                    sucess: true,
                    message: "Invaild JSON body"


                }));
                res.writeHead(404, { "content-type": "application/json" });
                res.end(JSON.stringify({ sucess: false, message: "Route not found." }))
            }
        });

    }

});

server.listen(3001, function () {
    console.log("server is runinng at http://localhost:3001");

});
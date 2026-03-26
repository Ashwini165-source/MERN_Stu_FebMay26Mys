//Parsing query parameters
const http = require("http");
const { URL } = require("url");
const server = http.createServer(function (req, res) {
    const fullurl = new URL(req.url, "http://localhost:3001");

    if (req.method == "GET" && fullurl.pathname === "/search") {
        const term = fullurl.searchParams.get("term");
        const page = fullurl.searchParams.get("page");

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            route: "search",
            term: term,
            page: page
        }));
        return;
    }
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ success: false, message: "Route not found." }));
});
server.listen(3001, function () {
    console.log("server is runinng at http://localhost:3001");

});

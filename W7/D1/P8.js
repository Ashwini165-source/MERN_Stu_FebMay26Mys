//Route parameters and query parameters
//Route parameters :ncapture dynamic values from the path
//Query parameters : provides optional values
const express = require("express");
const app = express();

app.get("/products/:id",function(req,res){
    res.json({
        routeParameter: req.params.id,
        queryParameter: req.query
    });
});
app.listen(4000,function(){
    console.log("Express server running at http://localhost:4000");
}); 
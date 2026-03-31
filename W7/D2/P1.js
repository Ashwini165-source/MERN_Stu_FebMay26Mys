// Routing: Nested routes
// "/" base url
// "/api/users"

const express = require("express");
const app = express();

// ******** API ROUTER ********
// Router objects help organize route groups
const apiRouter = express.Router();

// "/api/users"
apiRouter.get("/users", function (req, res) {
    res.json({
        route: "/api/users",
        message: "users route inside api router"
    });
});

// "/api/orders"
apiRouter.get("/orders", function (req, res) {
    res.json({
        route: "/api/orders",
        message: "orders route inside api router"
    });
});

// Mounting the router under /api base path
app.use("/api", apiRouter);


// ******** PRODUCT ROUTER ********
// products router (handles /api/products/...)
const productRouter = express.Router();

// POST /api/products -> create product
productRouter.post("/", (req, res) => {
    res.json({
        route: "/api/products",
        message: "create product"
    });
});

// DELETE /api/products/:id -> delete product
productRouter.delete("/:id", (req, res) => {
    res.json({
        route: `/api/products/${req.params.id}`,
        message: "delete product"
    });
});

app.use("/api/products", productRouter);

app.listen(4000, function () {
    console.log("Express server running at http://localhost:4000");
});
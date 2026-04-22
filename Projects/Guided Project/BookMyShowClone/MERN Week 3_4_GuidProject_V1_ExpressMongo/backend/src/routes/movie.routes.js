const express = require("express");
const router = express.Router();

const {protect} = require("../middleware/auth.middleware");
const {authorize} = require("../middleware/role.middleware");

//public route
router.get("/",(req,res)=>{
    res.send("Get Movies");

});

//admin only route
router.post("/",protect,authorize("admin"),(req,res)=>{
    res.send("Create movie");
});
module.exports = router;
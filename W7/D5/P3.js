//Session security ,regeneration,expiration and logout
 const express = require("express");
 const session = require("express-session");
 
 const app = express()
 
 app.use(session({
     secret:"MySecret Key",
     resave:false,
     saveUninitialized:false,
     cookie:{
         maxAge:60*60*1000
     }
     }));
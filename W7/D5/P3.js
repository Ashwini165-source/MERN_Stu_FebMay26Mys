//Session security ,regeneration,expiration and logout
 const express = require("express");
 const session = require("express-session");
 
 const app = express()
 
 app.use(session({
     secret:"MySecret Key",
     resave:false,
     saveUninitialized:false,
     cookie:{
         maxAge:60*60*1000,
         httpOnly: true,
         secure: process.env.NODE_ENV === "production"
     }
     }));

     app.get("/login",function(req,res){
             //after signin complete it give this details
              req.session.user = {
                 id:201,
                 useraname:"Ashwini",
                 role:"Student"
              };
              res.send("Session details stored after login.");
         });
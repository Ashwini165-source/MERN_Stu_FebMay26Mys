// Virtual fields in mongoose
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
            firstName:String,
            lastName:String,
            email:String
        },
        {
            // This allows virtuals to appear when converting documents to JSON or Objects.
            toJSON:{virtuals:true},
            toObject:{virtuals:true}
        }
    );

    // A virtual field  is not stored on MongoDB
    // It is computed dynamically from exising stored fields
    userSchema.virtual("fullname").get(function(){
        return this.firstName +" "+this.lastName;
    });

    const User = mongoose.model("VirtualUser",userSchema);

    const user = new User({
        firstName:"Ashwini",
        lastName:"BV",
        email:"a@a.com"
    });

    console.log("Hello, ",user.fullname);
    console.log("Object output includes virtual  ",user.toObject());
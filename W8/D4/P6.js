//
const crypto = require("crypto");
const mongoose=require("mongoose");
const { type } = require("os");

mongoose.connect("mongodb://127.0.0.1:27017/datedb")
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err))

const otpSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    otp:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true,
        index:{expires:0}
    },
    attempts:{
        type:Number,
        default:0
    }
});
const OTP = mongoose.model("OTP",otpSchema);

async function generateOTP(userId){
    const otp= crypto.randomInt(100000, 999999).toString();

    await OTP.findOneAndUpdate(
        {userId},
        {
            userId,
            otp,expiresAt:new Date(Date.now()+6000),
            attempts:0
        },
        {
            upsert:true,
            returnDocument:'after'
        }
    );
    console.log("OTP: ",otp);
}

async function verifyOTP(userId,enetredOtp){
    const record = await OTP.findOne({userId}),
    
}
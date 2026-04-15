// Basics of embedding and refrencing
const mongoose = require("mongoose");

async function main() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/embrel");
        console.log("Connected to MongoDB");

        const orderSchema = new mongoose.Schema({
            product: String,
            price: Number
        });
        const userSchema = new mongoose.Schema({
            name: String,
            orders: [orderSchema] //embedded doc
        });
        const User = mongoose.model('User', userSchema);

        // const embeddedUser = await User.create({
        //     name: "Ashwini",
        //     orders: [
        //         {
        //             product: "Laptop",
        //             price: 50000
        //         },
        //         {
        //             product: "Printer",
        //             price: 10000
        //         },
        //         {
        //             product: "Projector",
        //             price: 70000
        //         }
        //     ]
        // });

        // console.log("User:\n");
        // console.log(embeddedUser);   //fetch only single user data
        // console.log(await User.find());  //fetching the all user data 

        const users = await User.find().lean();
        console.log(JSON.stringify(users, null, 2));

        // Referencing 
        const userRefSchema = new mongoose.Schema({
            name: String
        });
        const orderRefSchema = new mongoose.Schema({
            product: String,
            price: Number,
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'UserRef'
            }
        });
        const UserRef = mongoose.model('UserRef', userRefSchema);
        const OrderRef = mongoose.model('OrderRef', orderRefSchema);

        // const refUser = await User.create({ name: "Ashwini" });
        // await OrderRef.create([
        //     {
        //         product: "Phone",
        //         price: 22000,
        //         user: refUser._id
        //     },
        //     {
        //         product: "Powerbank",
        //         price: 10000,
        //         user: refUser._id
        //     },
        //     {
        //         product: "charger",
        //         price: 1200,
        //         user: refUser._id
        //     }
        // ]);
        // console.log("Referenced Orders:\n");
        // console.log(await OrderRef.find().populate('user'));  //fetching the all order data with user data

    }
    catch (error) {
        console.error("Error:", error.message);
    }
    finally {
        await mongoose.disconnect();
        console.log("Disconnected from DB.");
    }
}
main();
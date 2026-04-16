//Timestamp and Advanced queries
const mongoose = require('mongoose');

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/datedb');
        console.log("MongoDB connected");

        const schema = new mongoose.Schema(
            {
                name: String,
            },
            {
                timestamps: true
            }
        );

        const Model = mongoose.model('LogTime', schema);

        //await Model.deleteMany();

        // await Model.create([
        //     { name: "Ashu" },
        //     { name: "appu" },
        //     { name: "Sohan" }
        // ]);
        const recent = await Model.find({
            createdAt: {
                $gte: new Date(Date.now() - 1500000)
            }
        }).sort({ createAt: -1 });

        console.log("Recent:", recent);
    }
    catch (error) {
        console.error("Error:", error.message);
    }
    finally {
        await mongoose.disconnect();
        console.log("DB Disconnected");
    }
}

main();
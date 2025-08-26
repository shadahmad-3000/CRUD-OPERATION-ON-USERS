const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/testingServer2";

const dbconnect = async () => {
    try {
        await mongoose.connect(url);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Error while Connecting DataBase",error?.message ||error?.data || error);
    }
}

module.exports ={ dbconnect};
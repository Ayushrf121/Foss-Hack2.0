import mongoose from "mongoose";

export const connectDB = () => {
    const mongo_url = process.env.MONGO_CONN;
    mongoose.connect(mongo_url)
        .then(() => {
            console.log("Connected to the Database");
        })
        .catch((err) => {
            console.log("Mongo Connection error :", err);
        })
}

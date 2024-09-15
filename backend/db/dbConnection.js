import mongoose from "mongoose";

const dbConnection = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB connection successful!"))
        .catch((err) => console.error(`MongoDB connection error: ${err}`));
}

export default dbConnection;
import mongoose from "mongoose";

// MongoDB connection URL
const MONGO_URI = "mongodb://localhost:27017/Stocks_db";

// Function to connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB 🚀");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectToDatabase;

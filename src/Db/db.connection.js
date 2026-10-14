import mongoose from "mongoose";
import { dbConfig } from "../Config/db.config.js";

export const connectDB = async () => {
    await mongoose.connect(dbConfig.uri);
    console.log("MongoDB connected successfully");
};

export default connectDB;

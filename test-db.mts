import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI as string;

async function testConnection() {
    try {
        console.log("Starting connection test...");
        console.log("URI host:", MONGODB_URI.split("@")[1]);

        const start = Date.now();
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 2000,
            connectTimeoutMS: 2000
        });
        const duration = Date.now() - start;
        console.log(`✅ Successfully connected to MongoDB in ${duration}ms!`);
        process.exit(0);
    } catch (error) {
        console.error("❌ Connection failed!");
        console.error(error);
        process.exit(1);
    }
}

testConnection();

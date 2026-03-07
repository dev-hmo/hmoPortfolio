import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

async function test() {
    console.log("Connecting to:", MONGODB_URI?.replace(/:([^@]+)@/, ":****@"));
    try {
        await mongoose.connect(MONGODB_URI!, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("✅ Successfully connected to MongoDB!");
        const collections = await mongoose.connection.db?.listCollections().toArray();
        console.log("Collections:", collections?.map(c => c.name));
        process.exit(0);
    } catch (err) {
        console.error("❌ Connection failed:", err);
        process.exit(1);
    }
}

test();

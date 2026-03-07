import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

async function checkData() {
    try {
        await mongoose.connect(MONGODB_URI!);
        const db = mongoose.connection.db;

        const blogCount = await db?.collection("blogs").countDocuments();
        const projectCount = await db?.collection("projects").countDocuments();
        const serviceCount = await db?.collection("serviceitems").countDocuments();

        console.log(`Blogs: ${blogCount}`);
        console.log(`Projects: ${projectCount}`);
        console.log(`Service Items: ${serviceCount}`);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkData();

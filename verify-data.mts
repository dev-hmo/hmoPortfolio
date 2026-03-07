import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI as string;

async function verifyData() {
    try {
        await mongoose.connect(MONGODB_URI);
        const ProjectSchema = new mongoose.Schema({}, { strict: false });
        const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema, "projects");

        const count = await Project.countDocuments();
        console.log(`Found ${count} projects in the database.`);

        const first = await Project.findOne();
        console.log("First project title:", first?.get('title'));

        process.exit(0);
    } catch (error) {
        console.error("Verification failed:", error);
        process.exit(1);
    }
}

verifyData();

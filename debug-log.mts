console.log("Script starting...");
import * as dotenv from "dotenv";
console.log("Dotenv imported");
import mongoose from "mongoose";
console.log("Mongoose imported");
dotenv.config({ path: ".env.local" });
console.log("Dotenv configured");
const MONGODB_URI = process.env.MONGODB_URI as string;
console.log("URI loaded:", MONGODB_URI ? "YES" : "NO");

import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
async function run() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const db = mongoose.connection.db;
  if (!db) { console.log("no db"); return; }
  const data = await db.collection("griditems").find({}).toArray();
  console.log("DB griditems id fields:", data.map((d: any) => d.id));
  process.exit();
}
run();

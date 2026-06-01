import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "data", "skills.json");
        const fileData = fs.readFileSync(filePath, "utf8");
        const skills = JSON.parse(fileData);
        return NextResponse.json(skills); // Frontend expects an object with skills and tools arrays
    } catch (error) {
        console.error("Skills GET error:", error);
        return NextResponse.json({}, { status: 500 });
    }
}

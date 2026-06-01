import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "data", "settings.json");
        const fileData = fs.readFileSync(filePath, "utf8");
        const settings = JSON.parse(fileData);
        return NextResponse.json(settings);
    } catch (error) {
        console.error("Settings GET error:", error);
        return NextResponse.json({}, { status: 500 });
    }
}

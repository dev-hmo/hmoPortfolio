import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "data", "services.json");
        let items = [];
        if (fs.existsSync(filePath)) {
            items = JSON.parse(fs.readFileSync(filePath, "utf8"));
        }
        return NextResponse.json(items);
    } catch (error) {
        console.error("Services GET error:", error);
        return NextResponse.json([], { status: 500 });
    }
}

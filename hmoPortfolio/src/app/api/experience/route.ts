import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function parseDateForSort(dateStr: string): number {
    if (!dateStr) return 0;
    const parts = dateStr.split("-").map((s) => s.trim().toLowerCase());
    
    const endStr = parts.length > 1 ? parts[1] : parts[0];
    let endScore = 0;
    
    if (endStr.includes("present") || endStr.includes("current") || endStr.includes("now")) {
        endScore = 9e15; // Max score for ongoing roles
    } else {
        const parsedEnd = Date.parse(endStr);
        endScore = isNaN(parsedEnd) ? 0 : parsedEnd;
    }
    
    const startStr = parts[0];
    const parsedStart = Date.parse(startStr);
    const startScore = isNaN(parsedStart) ? 0 : parsedStart;

    return endScore + startScore / 2; // Tie-breaker for same end dates
}

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "data", "experience.json");
        const fileData = fs.readFileSync(filePath, "utf8");
        const items = JSON.parse(fileData);
        
        items.sort((a: any, b: any) => {
            return parseDateForSort(b.date) - parseDateForSort(a.date);
        });

        return NextResponse.json(items);
    } catch (error) {
        console.error("Experience GET error:", error);
        return NextResponse.json([], { status: 500 });
    }
}

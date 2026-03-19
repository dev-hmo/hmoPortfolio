import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getSession } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Experience from "@/models/Experience";

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
        await connectToDatabase();
        const items = await Experience.find({}).lean();
        
        items.sort((a, b) => {
            return parseDateForSort(b.date) - parseDateForSort(a.date);
        });

        return NextResponse.json(items);
    } catch (error) {
        console.error("Experience GET error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const session = await getSession();
    if (!session || session.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const items = await request.json();
        await connectToDatabase();

        await Experience.deleteMany({});

        const mapped = items.map((p: any, i: number) => ({
            title: p.title,
            company: p.company,
            date: p.date,
            description: p.description,
            order: i
        }));

        if (mapped.length > 0) {
            await Experience.insertMany(mapped);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

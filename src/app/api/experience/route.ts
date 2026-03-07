import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getSession } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Experience from "@/models/Experience";

export async function GET() {
    try {
        await connectToDatabase();
        const items = await Experience.find({}).sort({ order: 1 });
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

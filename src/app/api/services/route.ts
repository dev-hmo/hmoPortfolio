import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Service from "@/models/Service";

export async function GET() {
    await connectToDatabase();
    const items = await Service.find({}).sort({ order: 1 });
    return NextResponse.json(items);
}

export async function PUT(request: Request) {
    const session = await getSession();
    if (!session || session.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const items = await request.json();
        await connectToDatabase();

        await Service.deleteMany({});

        const mapped = items.map((p: any, i: number) => ({
            title: p.title,
            description: p.description,
            order: i
        }));

        if (mapped.length > 0) {
            await Service.insertMany(mapped);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

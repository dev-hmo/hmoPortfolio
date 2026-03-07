import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Testimonial from "@/models/Testimonial";

export async function GET() {
    try {
        await connectToDatabase();
        const items = await Testimonial.find({}).sort({ order: 1 });
        return NextResponse.json(items);
    } catch (error) {
        console.error("Testimonials GET error:", error);
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

        await Testimonial.deleteMany({});

        const mapped = items.map((p: any, i: number) => ({
            quote: p.quote,
            name: p.name,
            title: p.title,
            order: i
        }));

        if (mapped.length > 0) {
            await Testimonial.insertMany(mapped);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

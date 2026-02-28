import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import GridItem from "@/models/GridItem";

export async function GET() {
    await connectToDatabase();
    const items = await GridItem.find({}).sort({ order: 1 });
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

        await GridItem.deleteMany({});

        const mapped = items.map((p: any, i: number) => ({
            title: p.title,
            description: p.description,
            className: p.className,
            imgClassName: p.imgClassName,
            titleClassName: p.titleClassName,
            img: p.img,
            spareImg: p.spareImg,
            order: i
        }));

        if (mapped.length > 0) {
            await GridItem.insertMany(mapped);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

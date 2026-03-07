import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Project from "@/models/Project";

export async function GET() {
    try {
        await connectToDatabase();
        const projects = await Project.find({}).sort({ order: 1 });
        return NextResponse.json(projects);
    } catch (error) {
        console.error("Projects GET error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const session = await getSession();
    if (!session || session.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const projects = await request.json();
        await connectToDatabase();

        // Since it's a full replace from the UI, we can clear and insert or bulk update.
        // Easiest is to drop and insert many for bulk save, or loop.
        await Project.deleteMany({});

        // Add order to maintain sequence
        const mapped = projects.map((p: any, i: number) => ({
            title: p.title,
            description: p.description,
            image: p.image,
            ghLink: p.ghLink,
            demoLink: p.demoLink,
            order: i
        }));

        if (mapped.length > 0) {
            await Project.insertMany(mapped);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Projects error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

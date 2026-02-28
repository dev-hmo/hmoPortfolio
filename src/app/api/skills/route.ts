import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Skill from "@/models/Skill";

export async function GET() {
    await connectToDatabase();
    const doc = await Skill.findOne({});
    if (!doc) {
        return NextResponse.json({ skills: [], tools: [] });
    }
    return NextResponse.json({ skills: doc.skills, tools: doc.tools });
}

export async function PUT(request: Request) {
    const session = await getSession();
    if (!session || session.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const { skills, tools } = await request.json();
        await connectToDatabase();

        let doc = await Skill.findOne({});
        if (!doc) {
            doc = new Skill({ skills, tools });
        } else {
            doc.skills = skills || [];
            doc.tools = tools || [];
        }
        await doc.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

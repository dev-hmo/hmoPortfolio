import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getSession } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Setting from "@/models/Setting";

export async function GET() {
    try {
        await connectToDatabase();
        const doc = await Setting.findOne({});
        if (!doc) {
            return NextResponse.json({});
        }
        return NextResponse.json(doc);
    } catch (error) {
        console.error("Settings GET error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const session = await getSession();
    if (!session || session.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const data = await request.json();
        await connectToDatabase();

        let doc = await Setting.findOne({});
        if (!doc) {
            doc = new Setting(data);
        } else {
            Object.assign(doc, data);
        }
        await doc.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}

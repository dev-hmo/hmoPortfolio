import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const filePath = path.join(process.cwd(), "data", "blog.json");
        let items = [];
        if (fs.existsSync(filePath)) {
            items = JSON.parse(fs.readFileSync(filePath, "utf8"));
        }
        const post = items.find((p: any) => p.slug === slug);
        
        if (!post) {
            return NextResponse.json({ error: "Not Found" }, { status: 404 });
        }
        
        return NextResponse.json(post);
    } catch (error) {
        console.error("Blog Slug GET error:", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

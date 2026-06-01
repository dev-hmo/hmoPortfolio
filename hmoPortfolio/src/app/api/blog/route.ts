import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const filePath = path.join(process.cwd(), "data", "blog.json");
        let items = [];
        if (fs.existsSync(filePath)) {
            items = JSON.parse(fs.readFileSync(filePath, "utf8"));
        }
        
        // Simple pagination fallback (if requested by URL search params)
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;
        
        const paginatedItems = items.slice(skip, skip + limit);
        
        return NextResponse.json({
            posts: paginatedItems,
            totalPages: Math.ceil(items.length / limit)
        });
    } catch (error) {
        console.error("Blog GET error:", error);
        return NextResponse.json({ posts: [], totalPages: 0 }, { status: 500 });
    }
}

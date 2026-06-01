import { NextResponse } from "next/server";
import items from "../../../../data/blog.json";

export async function GET(request: Request) {
    try {
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

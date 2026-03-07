import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getSession } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import BlogPost from "@/models/BlogPost";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("published") !== "false";

    await connectToDatabase();

    const query = publishedOnly ? { published: true } : {};
    const posts = await BlogPost.find(query).sort({ createdAt: -1 });

    return NextResponse.json(posts);
}

export async function POST(request: Request) {
    const session = await getSession();

    if (!session || session.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, excerpt, content, tags, published } = body;

        if (!title || !content) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");

        await connectToDatabase();

        // Check for duplicate slug
        const existing = await BlogPost.findOne({ slug });
        if (existing) {
            return new NextResponse("Post with this title already exists", { status: 400 });
        }

        const newPost = new BlogPost({
            title,
            slug,
            excerpt,
            content,
            tags: tags || [],
            published: published || false
        });

        await newPost.save();

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        console.error("Blog POST error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

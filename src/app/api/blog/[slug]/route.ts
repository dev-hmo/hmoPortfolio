import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import BlogPost from "@/models/BlogPost";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    await connectToDatabase();

    const post = await BlogPost.findOne({ slug });

    if (!post) {
        return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(post);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const session = await getSession();
    if (!session || session.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const { slug } = await params;
        const updates = await request.json();

        await connectToDatabase();

        const post = await BlogPost.findOneAndUpdate(
            { slug },
            { $set: updates },
            { new: true }
        );

        if (!post) {
            return new NextResponse("Not Found", { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const session = await getSession();
    if (!session || session.role !== "admin") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const { slug } = await params;

        await connectToDatabase();

        const post = await BlogPost.findOneAndDelete({ slug });

        if (!post) {
            return new NextResponse("Not Found", { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

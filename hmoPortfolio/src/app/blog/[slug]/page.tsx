"use client";
import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPost } from "@/types";
import blogData from "../../../../data/blog.json";

export default function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/blog/${slug}`)
            .then((res) => {
                if (!res.ok) throw new Error("Not found");
                return res.json();
            })
            .then(setPost)
            .catch(() => setPost(null))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black-100 pt-32 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="h-10 w-64 bg-white/5 rounded animate-pulse mb-4" />
                    <div className="h-6 w-96 bg-white/5 rounded animate-pulse mb-8" />
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="h-4 bg-white/5 rounded animate-pulse"
                                style={{ width: `${100 - i * 10}%` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-black-100 pt-32 px-4 text-center">
                <h1 className="text-3xl font-bold text-white mb-4">
                    Post Not Found
                </h1>
                <Link
                    href="/blog"
                    className="text-cyan-400 hover:text-cyan-300"
                >
                    ← Back to Blog
                </Link>
            </div>
        );
    }

    // Simple markdown-like rendering
    const renderContent = (content: string) => {
        return content.split("\n").map((line, i) => {
            // Headers
            if (line.startsWith("### "))
                return (
                    <h3
                        key={i}
                        className="text-xl font-bold text-white mt-8 mb-3"
                    >
                        {line.slice(4)}
                    </h3>
                );
            if (line.startsWith("## "))
                return (
                    <h2
                        key={i}
                        className="text-2xl font-bold text-white mt-10 mb-4"
                    >
                        {line.slice(3)}
                    </h2>
                );
            if (line.startsWith("# "))
                return (
                    <h1
                        key={i}
                        className="text-3xl font-bold text-white mt-10 mb-4"
                    >
                        {line.slice(2)}
                    </h1>
                );

            // Code blocks
            if (line.startsWith("```"))
                return null;

            // List items
            if (line.startsWith("- "))
                return (
                    <li
                        key={i}
                        className="text-neutral-300 ml-6 list-disc mb-1"
                    >
                        {renderInline(line.slice(2))}
                    </li>
                );

            // Empty lines
            if (line.trim() === "") return <br key={i} />;

            // Regular paragraphs
            return (
                <p key={i} className="text-neutral-300 leading-relaxed mb-2">
                    {renderInline(line)}
                </p>
            );
        });
    };

    // Inline formatting (bold, code)
    const renderInline = (text: string) => {
        const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
        return parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**"))
                return (
                    <strong key={i} className="text-white font-semibold">
                        {part.slice(2, -2)}
                    </strong>
                );
            if (part.startsWith("`") && part.endsWith("`"))
                return (
                    <code
                        key={i}
                        className="bg-white/10 text-cyan-400 px-1.5 py-0.5 rounded text-sm"
                    >
                        {part.slice(1, -1)}
                    </code>
                );
            return part;
        });
    };

    return (
        <div className="min-h-screen bg-black-100">
            <div className="relative pt-32 pb-8 px-4">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
                <div className="max-w-3xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 text-sm font-medium"
                        >
                            ← Back to Blog
                        </Link>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-4 text-neutral-500 text-sm mb-8">
                            <span>
                                {new Date(post.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                )}
                            </span>
                            {post.updatedAt !== post.createdAt && (
                                <span>
                                    Updated:{" "}
                                    {new Date(
                                        post.updatedAt
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-3xl mx-auto px-4 pb-20"
            >
                <article className="prose prose-invert max-w-none">
                    {renderContent(post.content)}
                </article>
            </motion.div>
        </div>
    );
}

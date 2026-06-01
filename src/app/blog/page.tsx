"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPost } from "@/types";
import blogData from "../../../data/blog.json";

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    useEffect(() => {
        let filtered = blogData;
        if (search) {
            const s = search.toLowerCase();
            filtered = filtered.filter((p: any) => p.title.toLowerCase().includes(s) || p.excerpt.toLowerCase().includes(s));
        }
        if (selectedTag) {
            filtered = filtered.filter((p: any) => p.tags.includes(selectedTag));
        }
        setPosts(filtered);
        setLoading(false);
    }, [search, selectedTag]);

    // Get all unique tags
    const allTags = Array.from(
        new Set(blogData.flatMap((p: any) => p.tags))
    ).sort();

    return (
        <div className="min-h-screen bg-black-100">
            {/* Header */}
            <div className="relative pt-32 pb-16 px-4">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
                <div className="max-w-5xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6 text-sm font-medium"
                        >
                            ← Back to Portfolio
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            Blog
                        </h1>
                        <p className="text-neutral-400 text-lg max-w-2xl">
                            Thoughts on web development, career growth, and the
                            tech I work with.
                        </p>
                    </motion.div>

                    {/* Search */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-8"
                    >
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                        />
                    </motion.div>

                    {/* Tags */}
                    {allTags.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap gap-2 mt-6"
                        >
                            <button
                                onClick={() => setSelectedTag(null)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${!selectedTag
                                        ? "bg-cyan-500 text-black"
                                        : "bg-white/5 text-neutral-400 hover:bg-white/10"
                                    }`}
                            >
                                All
                            </button>
                            {allTags.map((tag: any) => (
                                <button
                                    key={tag}
                                    onClick={() =>
                                        setSelectedTag(
                                            selectedTag === tag ? null : tag
                                        )
                                    }
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${selectedTag === tag
                                            ? "bg-cyan-500 text-black"
                                            : "bg-white/5 text-neutral-400 hover:bg-white/10"
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Posts Grid */}
            <div className="max-w-5xl mx-auto px-4 pb-20">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="h-64 rounded-2xl bg-white/5 animate-pulse"
                            />
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-neutral-500 text-lg">
                            No posts found.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {posts.map((post, index) => (
                            <motion.div
                                key={post.slug}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.1,
                                }}
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                                        {post.coverImage && (
                                            <div className="w-full h-48 overflow-hidden">
                                                <img
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {post.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                                                {post.title}
                                            </h2>
                                            <p className="text-neutral-400 text-sm line-clamp-3 mb-4">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-neutral-500">
                                                    {new Date(
                                                        post.createdAt
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </span>
                                                <span className="text-xs text-cyan-400 font-medium group-hover:translate-x-1 transition-transform">
                                                    Read more →
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPost } from "@/types";

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [newPost, setNewPost] = useState({
        title: "",
        excerpt: "",
        content: "",
        tags: "",
        published: false,
    });
    const [saving, setSaving] = useState(false);

    const fetchPosts = async () => {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setPosts(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const res = await fetch("/api/blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...newPost,
                tags: newPost.tags
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
            }),
        });

        if (res.ok) {
            setShowCreate(false);
            setNewPost({ title: "", excerpt: "", content: "", tags: "", published: false });
            fetchPosts();
        }
        setSaving(false);
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Delete this post?")) return;
        await fetch(`/api/blog/${slug}`, { method: "DELETE" });
        fetchPosts();
    };

    const handleTogglePublish = async (post: BlogPost) => {
        await fetch(`/api/blog/${post.slug}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ published: !post.published }),
        });
        fetchPosts();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Blog Posts</h2>
                <button
                    onClick={() => setShowCreate(!showCreate)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition-all"
                >
                    {showCreate ? "Cancel" : "+ New Post"}
                </button>
            </div>

            {/* Create Form */}
            {showCreate && (
                <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    onSubmit={handleCreate}
                    className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4"
                >
                    <input
                        type="text"
                        placeholder="Post title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Short excerpt"
                        value={newPost.excerpt}
                        onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
                    />
                    <textarea
                        placeholder="Content (Markdown supported)"
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        rows={10}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm font-mono resize-y"
                    />
                    <input
                        type="text"
                        placeholder="Tags (comma-separated)"
                        value={newPost.tags}
                        onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
                    />
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={newPost.published}
                                onChange={(e) => setNewPost({ ...newPost, published: e.target.checked })}
                                className="rounded"
                            />
                            Publish immediately
                        </label>
                        <button
                            type="submit"
                            disabled={saving || !newPost.title}
                            className="ml-auto px-6 py-2 rounded-lg bg-cyan-500 text-black font-medium text-sm hover:bg-cyan-400 transition-colors disabled:opacity-50"
                        >
                            {saving ? "Creating..." : "Create Post"}
                        </button>
                    </div>
                </motion.form>
            )}

            {/* Posts List */}
            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />
                    ))}
                </div>
            ) : posts.length === 0 ? (
                <p className="text-neutral-500 text-center py-10">
                    No blog posts yet. Create your first one!
                </p>
            ) : (
                <div className="space-y-3">
                    {posts.map((post) => (
                        <div
                            key={post.slug}
                            className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between gap-4"
                        >
                            <div className="min-w-0 flex-1">
                                <h3 className="text-white font-medium text-sm truncate">
                                    {post.title}
                                </h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-neutral-500 text-xs">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </span>
                                    <span
                                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${post.published
                                                ? "bg-green-500/10 text-green-400"
                                                : "bg-yellow-500/10 text-yellow-400"
                                            }`}
                                    >
                                        {post.published ? "Published" : "Draft"}
                                    </span>
                                    {post.tags.slice(0, 2).map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[10px] text-neutral-500"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={() => handleTogglePublish(post)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-neutral-400 hover:text-white transition-colors"
                                >
                                    {post.published ? "Unpublish" : "Publish"}
                                </button>
                                <Link
                                    href={`/admin/blog/${post.slug}`}
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(post.slug)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

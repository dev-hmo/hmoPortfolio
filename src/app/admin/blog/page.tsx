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
        try {
            const res = await fetch("/api/blog");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setPosts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
            setPosts([]);
        } finally {
            setLoading(false);
        }
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
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.03] backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        Blog Posts <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2.5 py-1 rounded-full">{posts.length} Total</span>
                    </h2>
                    <p className="text-sm text-neutral-400 mt-1">Manage your articles, tutorials, and thoughts.</p>
                </div>
                <button
                    onClick={() => setShowCreate(!showCreate)}
                    className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                >
                    {showCreate ? "Cancel Customization" : <span><span>+</span> New Post</span>}
                </button>
            </div>

            {/* Create Form */}
            {showCreate && (
                <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    onSubmit={handleCreate}
                    className="rounded-2xl border border-cyan-500/30 bg-[#0c0e2b] p-6 space-y-4 shadow-xl overflow-hidden"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-cyan-400 mb-1 block">Post Title</label>
                            <input
                                type="text"
                                placeholder="E.g., Getting Started with Next.js 14"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-xs text-cyan-400 mb-1 block">Tags (comma-separated)</label>
                            <input
                                type="text"
                                placeholder="react, nextjs, tutorial"
                                value={newPost.tags}
                                onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs text-cyan-400 mb-1 block">Short Excerpt</label>
                        <input
                            type="text"
                            placeholder="A brief summary of what this article is about..."
                            value={newPost.excerpt}
                            onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-cyan-400 mb-1 block">Content (Markdown supported)</label>
                        <textarea
                            placeholder="# Introduction\n\nStart writing your amazing article here..."
                            value={newPost.content}
                            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            rows={10}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm font-mono resize-y"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                        <label className="flex items-center gap-2 text-sm text-neutral-300 font-medium cursor-pointer group">
                            <div className="relative flex items-center">
                                <input
                                    type="checkbox"
                                    checked={newPost.published}
                                    onChange={(e) => setNewPost({ ...newPost, published: e.target.checked })}
                                    className="peer sr-only"
                                />
                                <div className="w-10 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                            </div>
                            <span className="group-hover:text-cyan-400 transition-colors">Publish immediately</span>
                        </label>
                        <button
                            type="submit"
                            disabled={saving || !newPost.title}
                            className="w-full sm:w-auto px-8 py-2.5 rounded-lg bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                        >
                            {saving ? "Creating Post..." : "Create Post"}
                        </button>
                    </div>
                </motion.form>
            )}

            {/* Data Table */}
            <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/10">
                                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase w-[40%]">Article Info</th>
                                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase w-[30%]">Status & Meta</th>
                                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase w-[30%] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {loading ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-6 space-y-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
                                        ))}
                                    </td>
                                </tr>
                            ) : posts.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center text-neutral-500 text-sm">
                                        No blog posts yet. Click "New Post" to start writing!
                                    </td>
                                </tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post.slug} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 align-top">
                                            <div className="flex flex-col">
                                                <h3 className="text-white font-medium text-sm leading-tight hover:text-cyan-400 transition-colors cursor-pointer line-clamp-1">{post.title}</h3>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {post.tags.slice(0, 3).map((tag) => (
                                                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-neutral-400 border border-white/10">#{tag}</span>
                                                    ))}
                                                    {post.tags.length > 3 && (
                                                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-neutral-500 border border-white/10">+{post.tags.length - 3}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-top">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full ${post.published ? 'bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-yellow-500'}`}></span>
                                                    <span className={`text-xs font-medium ${post.published ? 'text-green-400' : 'text-yellow-400'}`}>
                                                        {post.published ? "Published" : "Draft"}
                                                    </span>
                                                </div>
                                                <p className="text-neutral-500 text-xs flex items-center gap-1.5">
                                                    <span>📅</span> {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 align-middle text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleTogglePublish(post)}
                                                    className="px-3 py-1.5 rounded-md text-xs font-semibold bg-white/5 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                                                >
                                                    {post.published ? "Set to Draft" : "Publish Now"}
                                                </button>
                                                <Link
                                                    href={`/admin/blog/${post.slug}`}
                                                    className="px-3 py-1.5 rounded-md text-xs font-semibold bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.slug)}
                                                    className="px-3 py-1.5 rounded-md text-xs font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

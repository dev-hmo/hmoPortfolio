"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FiPlus, FiSearch, FiCalendar, FiTag, FiCheckCircle, FiClock, FiMoreVertical, FiTrash2, FiEdit3, FiGlobe, FiX, FiFileText } from "react-icons/fi";
import type { BlogPost } from "@/types";

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [newPost, setNewPost] = useState({
        title: "",
        excerpt: "",
        content: "",
        tags: "",
        published: false,
    });
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

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
        try {
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
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    setShowCreate(false);
                    setNewPost({ title: "", excerpt: "", content: "", tags: "", published: false });
                    fetchPosts();
                }, 1500);
            }
        } catch (error) {
            alert("Failed to create post");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Permanently delete this article? This action cannot be undone.")) return;
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

    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            {/* Header section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Editorial Hub</h1>
                    <p className="text-neutral-400 text-sm">Craft, manage, and publish your latest articles and thoughts.</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative group flex-1 min-w-[280px]">
                        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-cyan-400 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search articles or tags..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 transition-all outline-none"
                        />
                    </div>
                    <button
                        onClick={() => setShowCreate(!showCreate)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all shadow-lg",
                            showCreate 
                                ? "bg-white/5 text-white hover:bg-white/10 border border-white/10" 
                                : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-cyan-900/20 hover:scale-[1.02] active:scale-[0.98]"
                        )}
                    >
                        {showCreate ? <><FiX className="w-4 h-4" /> Cancel</> : <><FiPlus className="w-4 h-4" /> Write Post</>}
                    </button>
                </div>
            </div>

            {/* Create Post Form */}
            <AnimatePresence>
                {showCreate && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-[#0a0c1a] border border-cyan-500/20 rounded-3xl overflow-hidden shadow-2xl relative"
                    >
                        <form onSubmit={handleCreate} className="p-8 space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-2">
                                <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400">
                                    <FiFileText className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Draft New Article</h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Article Title</label>
                                        <input
                                            type="text"
                                            placeholder="The Future of Web Development"
                                            value={newPost.title}
                                            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-base focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Tags (comma separated)</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="React, AWS, Serverless"
                                                value={newPost.tags}
                                                onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                                                className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-5 py-3.5 text-white text-sm focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all"
                                            />
                                            <FiTag className="absolute left-4.5 top-1/2 -translate-y-1/2 text-neutral-600" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Short Excerpt</label>
                                        <textarea
                                            placeholder="A compelling one-sentence hook for your readers..."
                                            value={newPost.excerpt}
                                            onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-3.5 text-white text-sm focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all h-24 resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">Article Content (Markdown)</label>
                                    <textarea
                                        placeholder="# Hello World\n\nStart your story..."
                                        value={newPost.content}
                                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm font-mono focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all h-[320px] resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-white/5 gap-6">
                                <label className="flex items-center gap-3 group cursor-pointer">
                                    <div className="relative w-12 h-6 bg-white/5 rounded-full border border-white/10 transition-colors group-hover:bg-white/10">
                                        <input
                                            type="checkbox"
                                            checked={newPost.published}
                                            onChange={(e) => setNewPost({ ...newPost, published: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="absolute top-1 left-1 w-4 h-4 bg-neutral-500 rounded-full transition-all peer-checked:translate-x-6 peer-checked:bg-cyan-400 shadow-md"></div>
                                    </div>
                                    <span className="text-sm font-bold text-neutral-400 group-hover:text-white transition-colors">Publish to Live Site</span>
                                </label>
                                
                                <button
                                    type="submit"
                                    disabled={saving || !newPost.title}
                                    className={cn(
                                        "w-full sm:w-auto px-10 py-3.5 rounded-2xl font-bold transition-all shadow-xl min-w-[180px]",
                                        success 
                                            ? "bg-emerald-500 text-white" 
                                            : "bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-50"
                                    )}
                                >
                                    {saving ? "Deploying..." : success ? "Article Published!" : "Create Article"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Posts Grid/List */}
            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-24 w-full bg-white/5 animate-pulse rounded-3xl" />
                        ))}
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="py-32 text-center bg-white/[0.01] rounded-3xl border border-dashed border-white/10">
                        <FiClock className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
                        <h3 className="text-white font-bold text-lg">No articles found</h3>
                        <p className="text-neutral-500 text-sm mt-1">Start by creating your first post to see it here.</p>
                    </div>
                ) : (
                    filteredPosts.map((post) => (
                        <motion.div
                            key={post.slug}
                            layout
                            className="bg-[#0a0c1a] border border-white/5 hover:border-white/10 rounded-3xl p-5 md:p-6 transition-all group relative"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border",
                                            post.published 
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                        )}>
                                            {post.published ? "Live" : "Draft"}
                                        </span>
                                        <span className="text-neutral-500 text-xs flex items-center gap-1.5 font-medium">
                                            <FiCalendar className="w-3.5 h-3.5" />
                                            {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <h3 className="text-white font-bold text-xl group-hover:text-cyan-400 transition-colors leading-tight">
                                        {post.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[10px] px-2 py-0.5 bg-white/5 text-neutral-500 rounded-md border border-white/5">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 self-end md:self-center">
                                    <button 
                                        onClick={() => handleTogglePublish(post)}
                                        className="p-3 rounded-2xl bg-white/5 text-neutral-400 hover:text-white transition-all"
                                        title={post.published ? "Move to Drafts" : "Publish Live"}
                                    >
                                        <FiGlobe className={cn("w-5 h-5", post.published && "text-cyan-400")} />
                                    </button>
                                    <Link 
                                        href={`/admin/blog/${post.slug}`}
                                        className="p-3 rounded-2xl bg-white/5 text-neutral-400 hover:text-cyan-400 transition-all"
                                        title="Edit Article"
                                    >
                                        <FiEdit3 className="w-5 h-5" />
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(post.slug)}
                                        className="p-3 rounded-2xl bg-white/5 text-neutral-400 hover:text-red-400 transition-all"
                                        title="Delete Article"
                                    >
                                        <FiTrash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
            
            {/* Guide/Tip card */}
            <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border border-indigo-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                    <FiCheckCircle className="w-8 h-8" />
                </div>
                <div className="text-center md:text-left">
                    <h4 className="text-white font-bold text-lg">SEO & Readability</h4>
                    <p className="text-neutral-400 text-sm mt-1 leading-relaxed max-w-2xl">
                        Regular publishing improves your portfolio's authority. Use clear headings (H1, H2) 
                        and include relevant tags to help visitors discover your professional expertise.
                    </p>
                </div>
                <Link href="/blog" target="_blank" className="ml-auto text-indigo-400 font-bold hover:text-indigo-300 transition-colors whitespace-nowrap">
                    View Blog Site →
                </Link>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}


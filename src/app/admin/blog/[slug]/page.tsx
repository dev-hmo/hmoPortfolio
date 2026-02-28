"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/types";

export default function AdminEditBlogPost({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = use(params);
    const router = useRouter();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        title: "",
        excerpt: "",
        content: "",
        tags: "",
        published: false,
    });

    useEffect(() => {
        fetch(`/api/blog/${slug}`)
            .then((r) => r.json())
            .then((data) => {
                setPost(data);
                setForm({
                    title: data.title,
                    excerpt: data.excerpt,
                    content: data.content,
                    tags: data.tags.join(", "),
                    published: data.published,
                });
            })
            .finally(() => setLoading(false));
    }, [slug]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const res = await fetch(`/api/blog/${slug}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
            }),
        });

        if (res.ok) {
            router.push("/admin/blog");
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-12 rounded-lg bg-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    if (!post) {
        return <p className="text-neutral-500">Post not found.</p>;
    }

    return (
        <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Edit Post</h2>
                <button
                    onClick={() => router.push("/admin/blog")}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                >
                    ← Back
                </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
                <div>
                    <label className="block text-xs text-neutral-400 mb-1.5 font-medium">Title</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
                        required
                    />
                </div>
                <div>
                    <label className="block text-xs text-neutral-400 mb-1.5 font-medium">Excerpt</label>
                    <input
                        type="text"
                        value={form.excerpt}
                        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
                    />
                </div>
                <div>
                    <label className="block text-xs text-neutral-400 mb-1.5 font-medium">Content (Markdown)</label>
                    <textarea
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        rows={16}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm font-mono resize-y"
                    />
                </div>
                <div>
                    <label className="block text-xs text-neutral-400 mb-1.5 font-medium">Tags (comma-separated)</label>
                    <input
                        type="text"
                        value={form.tags}
                        onChange={(e) => setForm({ ...form, tags: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.published}
                            onChange={(e) => setForm({ ...form, published: e.target.checked })}
                            className="rounded"
                        />
                        Published
                    </label>
                    <button
                        type="submit"
                        disabled={saving}
                        className="ml-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}

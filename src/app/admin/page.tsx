"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { BlogPost } from "@/types";
import type { SiteSettings } from "@/types";

interface DashboardStats {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    totalProjects: number;
    totalExperience: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalPosts: 0,
        publishedPosts: 0,
        draftPosts: 0,
        totalProjects: 0,
        totalExperience: 0,
    });
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        Promise.all([
            fetch("/api/blog").then((r) => r.json()),
            fetch("/api/projects").then((r) => r.json()),
            fetch("/api/experience").then((r) => r.json()),
            fetch("/api/settings").then((r) => r.json()),
        ]).then(([posts, projects, experience, siteSettings]) => {
            setStats({
                totalPosts: posts.length,
                publishedPosts: posts.filter((p: BlogPost) => p.published).length,
                draftPosts: posts.filter((p: BlogPost) => !p.published).length,
                totalProjects: projects.length,
                totalExperience: experience.length,
            });
            setRecentPosts(posts.slice(0, 3));
            setSettings(siteSettings);
        });
    }, []);

    const statCards = [
        { label: "Blog Posts", value: stats.totalPosts, color: "from-cyan-500 to-blue-600", icon: "📝" },
        { label: "Published", value: stats.publishedPosts, color: "from-green-500 to-emerald-600", icon: "✅" },
        { label: "Drafts", value: stats.draftPosts, color: "from-yellow-500 to-orange-500", icon: "📋" },
        { label: "Projects", value: stats.totalProjects, color: "from-purple-500 to-pink-600", icon: "🚀" },
        { label: "Experience", value: stats.totalExperience, color: "from-blue-500 to-indigo-600", icon: "💼" },
    ];

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2 className="text-2xl font-bold text-white">
                    Welcome back{settings ? `, ${settings.name}` : ""} 👋
                </h2>
                <p className="text-neutral-400 mt-1">
                    Here&apos;s an overview of your portfolio.
                </p>
            </motion.div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {statCards.map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{card.icon}</span>
                            <span className="text-xs text-neutral-400 font-medium">
                                {card.label}
                            </span>
                        </div>
                        <p className={`text-3xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                            {card.value}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Recent Posts */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
                <h3 className="text-lg font-bold text-white mb-4">
                    Recent Blog Posts
                </h3>
                {recentPosts.length === 0 ? (
                    <p className="text-neutral-500 text-sm">No posts yet.</p>
                ) : (
                    <div className="space-y-3">
                        {recentPosts.map((post) => (
                            <div
                                key={post.slug}
                                className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                            >
                                <div>
                                    <p className="text-white text-sm font-medium">
                                        {post.title}
                                    </p>
                                    <p className="text-neutral-500 text-xs mt-0.5">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <span
                                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${post.published
                                            ? "bg-green-500/10 text-green-400"
                                            : "bg-yellow-500/10 text-yellow-400"
                                        }`}
                                >
                                    {post.published ? "Published" : "Draft"}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
}

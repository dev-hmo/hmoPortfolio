"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
    const [loading, setLoading] = useState(true);

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
            setLoading(false);
        });
    }, []);

    const statCards = [
        { label: "Total Articles", value: stats.totalPosts, prefix: "📝", trend: "+12% this month", active: true },
        { label: "Published", value: stats.publishedPosts, prefix: "✅", trend: "Live", active: true },
        { label: "Active Projects", value: stats.totalProjects, prefix: "🚀", trend: "High Engagement", active: true },
        { label: "Experiences", value: stats.totalExperience, prefix: "💼", trend: "Growing", active: false },
    ];

    const quickActions = [
        { title: "New Blog Post", desc: "Write an article", icon: "✍️", href: "/admin/blog" },
        { title: "Add Project", desc: "Showcase new work", icon: "✨", href: "/admin/projects" },
        { title: "Edit Grid", desc: "Customize bento grid", icon: "🍱", href: "/admin/grid" },
        { title: "Site Settings", desc: "Configuration", icon: "⚙️", href: "/admin/settings" },
    ];

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="h-16 w-1/3 bg-white/5 animate-pulse rounded-xl" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-white/5 animate-pulse rounded-xl" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Enterprise Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Overview
                    </h2>
                    <p className="text-neutral-400 mt-1 flex items-center gap-2 text-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        System Status: All services operational
                    </p>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
                    <span className="text-sm text-neutral-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                        {settings?.name || 'Administrator'}
                    </span>
                    <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg text-sm font-medium transition-all shadow-lg shadow-cyan-500/20">
                        Generate Report
                    </button>
                </motion.div>
            </div>

            {/* Enterprise Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e2b] p-6 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full -mr-8 -mt-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                                {card.label}
                            </span>
                            <span className="text-xl bg-white/5 p-2 rounded-lg">{card.prefix}</span>
                        </div>
                        <div className="relative z-10">
                            <p className="text-4xl font-bold text-white mb-2">
                                {card.value}
                            </p>
                            <p className={`text-xs font-medium ${card.active ? 'text-emerald-400' : 'text-neutral-500'}`}>
                                {card.trend}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity Feed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden flex flex-col"
                >
                    <div className="p-6 border-b border-white/10 bg-white/[0.01]">
                        <h3 className="text-lg font-bold text-white">Recent Publications</h3>
                        <p className="text-xs text-neutral-400 mt-1">Latest articles and drafts on the platform</p>
                    </div>
                    <div className="p-6 flex-1">
                        {recentPosts.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-neutral-500 text-sm">
                                <span className="text-4xl mb-3 opacity-50">📰</span>
                                No publications found yet.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentPosts.map((post) => (
                                    <div key={post.slug} className="group flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-lg">
                                                {post.published ? '🗞️' : '📝'}
                                            </div>
                                            <div>
                                                <p className="text-white text-sm font-semibold group-hover:text-cyan-400 transition-colors">
                                                    {post.title}
                                                </p>
                                                <p className="text-neutral-500 text-xs mt-1">
                                                    {new Date(post.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wide ${post.published ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border border-amber-500/20"}`}>
                                            {post.published ? "Live" : "Draft"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Quick Actions Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden"
                >
                    <div className="p-6 border-b border-white/10 bg-white/[0.01]">
                        <h3 className="text-lg font-bold text-white">Quick Actions</h3>
                        <p className="text-xs text-neutral-400 mt-1">Shortcut to core functions</p>
                    </div>
                    <div className="p-6 grid grid-cols-1 gap-3">
                        {quickActions.map((action) => (
                            <Link key={action.title} href={action.href} className="flex flex-col gap-1 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl bg-white/5 p-2 rounded-lg group-hover:bg-cyan-500/20 transition-colors">{action.icon}</span>
                                    <div>
                                        <p className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{action.title}</p>
                                        <p className="text-xs text-neutral-500">{action.desc}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}


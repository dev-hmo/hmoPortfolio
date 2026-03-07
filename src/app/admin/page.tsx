"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { BlogPost, SiteSettings } from "@/types";
import { 
    FiTrendingUp, FiActivity, FiLayers, FiBriefcase, 
    FiSettings, FiPlus, FiArrowRight, FiZap, 
    FiCheckCircle, FiClock, FiGrid, FiUsers 
} from "react-icons/fi";

interface DashboardStats {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    totalProjects: number;
    totalExperience: number;
    totalServices: number;
    totalTestimonials: number;
    totalSkills: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalPosts: 0,
        publishedPosts: 0,
        draftPosts: 0,
        totalProjects: 0,
        totalExperience: 0,
        totalServices: 0,
        totalTestimonials: 0,
        totalSkills: 0,
    });
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const safeFetch = (url: string) =>
            fetch(url).then((r) => r.ok ? r.json() : []).catch(() => []);

        Promise.all([
            safeFetch("/api/blog"),
            safeFetch("/api/projects"),
            safeFetch("/api/experience"),
            safeFetch("/api/settings"),
            safeFetch("/api/services"),
            safeFetch("/api/testimonials"),
            safeFetch("/api/skills"),
        ]).then(([posts, projects, experience, siteSettings, services, testimonials, skillsData]) => {
            setStats({
                totalPosts: posts.length || 0,
                publishedPosts: (posts || []).filter((p: any) => p.published).length,
                draftPosts: (posts || []).filter((p: any) => !p.published).length,
                totalProjects: projects.length || 0,
                totalExperience: experience.length || 0,
                totalServices: services.length || 0,
                totalTestimonials: testimonials.length || 0,
                totalSkills: ((skillsData?.skills?.length || 0) + (skillsData?.tools?.length || 0)) || 0,
            });
            setRecentPosts((posts || []).slice(0, 4));
            setSettings(siteSettings);
            setLoading(false);
        });
    }, []);

    const statCards = [
        { label: "Content", value: stats.totalPosts, icon: <FiLayers />, color: "from-blue-500 to-cyan-400", sub: `${stats.publishedPosts} Live` },
        { label: "Projects", value: stats.totalProjects, icon: <FiZap />, color: "from-purple-500 to-indigo-400", sub: "Showcased" },
        { label: "Experience", value: stats.totalExperience, icon: <FiBriefcase />, color: "from-emerald-500 to-teal-400", sub: "Milestones" },
        { label: "Services", value: stats.totalServices, icon: <FiActivity />, color: "from-rose-500 to-pink-400", sub: "Offerings" },
        { label: "Feedback", value: stats.totalTestimonials, icon: <FiUsers />, color: "from-amber-500 to-orange-400", sub: "Endorsements" },
        { label: "Tech Stack", value: stats.totalSkills, icon: <FiTrendingUp />, color: "from-indigo-500 to-blue-400", sub: "Tools" },
    ];

    const quickActions = [
        { title: "Grid Content", href: "/admin/grid", icon: <FiGrid />, desc: "Layout Management" },
        { title: "Project Gallery", href: "/admin/projects", icon: <FiZap />, desc: "Portfolio Showcase" },
        { title: "Skills & Tools", href: "/admin/skills", icon: <FiTrendingUp />, desc: "Tech Expertise" },
        { title: "Global Settings", href: "/admin/settings", icon: <FiSettings />, desc: "Site Configuration" },
    ];

    if (loading) {
        return (
            <div className="p-8 space-y-8 max-w-7xl mx-auto">
                <div className="h-12 w-64 bg-white/5 animate-pulse rounded-2xl" />
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-32 bg-white/5 animate-pulse rounded-3xl" />)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-[400px] bg-white/5 animate-pulse rounded-3xl" />
                    <div className="h-[400px] bg-white/5 animate-pulse rounded-3xl" />
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-10">
            {/* Command Center Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
                <div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-widest border border-cyan-500/20">
                            Command Center
                        </span>
                        <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live Sync Active
                        </div>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-white tracking-tight"
                    >
                        Success, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{settings?.name?.split(' ')[0] || 'Admin'}</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ delay: 0.2 }}
                        className="text-neutral-500 mt-2 text-sm max-w-md"
                    >
                        Your portfolio core is healthy. All systems are synchronized and ready for content deployment.
                    </motion.p>
                </div>

                <div className="flex items-center gap-4">
                    <Link 
                        href="/admin/blog" 
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold shadow-xl shadow-indigo-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <FiPlus className="w-5 h-5" /> New Article
                    </Link>
                </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {statCards.map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 + 0.3 }}
                        className="group relative bg-[#0a0c1a] border border-white/5 rounded-[2.5rem] p-6 hover:border-white/10 transition-all cursor-default"
                    >
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} p-[1px] mb-4 group-hover:scale-110 transition-transform`}>
                            <div className="w-full h-full bg-[#0a0c1a] rounded-2xl flex items-center justify-center text-white text-xl">
                                {card.icon}
                            </div>
                        </div>
                        <h3 className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">{card.label}</h3>
                        <p className="text-3xl font-black text-white mt-1 group-hover:text-cyan-400 transition-colors">{card.value}</p>
                        <p className="text-neutral-600 text-[10px] mt-1 font-medium italic">{card.sub}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Editorial Pipeline */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="lg:col-span-2 bg-[#0a0c1a] border border-white/5 rounded-[3rem] overflow-hidden"
                >
                    <div className="p-8 border-b border-white/5 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-white">Editorial Pipeline</h2>
                            <p className="text-neutral-500 text-xs mt-1">Latest articles and ongoing drafts</p>
                        </div>
                        <Link href="/admin/blog" className="p-3 rounded-2xl bg-white/5 text-neutral-400 hover:text-white transition-all">
                            <FiArrowRight />
                        </Link>
                    </div>
                    <div className="p-4 space-y-2">
                        {recentPosts.map((post) => (
                            <div key={post.slug} className="flex items-center justify-between p-4 rounded-[2rem] hover:bg-white/[0.02] transition-all group">
                                <div className="flex items-center gap-5">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center text-xl",
                                        post.published ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                                    )}>
                                        {post.published ? <FiCheckCircle /> : <FiClock />}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm group-hover:text-cyan-400 transition-colors">{post.title}</h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="text-neutral-600 text-[10px] font-bold uppercase tracking-widest">
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </span>
                                            {post.tags.slice(0, 1).map(tag => (
                                                <span key={tag} className="text-[10px] text-cyan-500/60 font-medium">#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <span className={cn(
                                        "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                                        post.published ? "text-emerald-400 bg-emerald-400/5 shadow-inner" : "text-amber-400 bg-amber-400/5 shadow-inner"
                                    )}>
                                        {post.published ? "Live" : "Drafting"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Operations & Shortcuts */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-[#0a0c1a] border border-white/5 rounded-[3rem] p-8 space-y-6"
                    >
                        <h2 className="text-xl font-bold text-white">Operations</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {quickActions.map((action) => (
                                <Link 
                                    key={action.title} 
                                    href={action.href} 
                                    className="flex items-center gap-4 p-4 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-neutral-400 group-hover:text-cyan-400 transition-colors">
                                        {action.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">{action.title}</h4>
                                        <p className="text-[10px] text-neutral-600 mt-0.5">{action.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/20 p-8"
                    >
                        <div className="relative z-10">
                            <h3 className="text-white font-black text-lg flex items-center gap-2">
                                <FiCheckCircle className="text-cyan-400" /> Professional Status
                            </h3>
                            <p className="text-neutral-400 text-xs mt-2 leading-relaxed italic">
                                &quot;Your portfolio is more than a resume; it&apos;s a digital reflection of your professional story.&quot;
                            </p>
                            <div className="mt-6 flex items-center justify-between">
                                <span className="text-[10px] text-cyan-400/60 font-bold uppercase tracking-widest italic">Always Improving</span>
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a0c1a] bg-white/5" />)}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}



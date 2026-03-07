"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSave, FiLink, FiUser, FiMail, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiPlus, FiTrash2, FiCheck, FiInfo } from "react-icons/fi";
import type { SiteSettings } from "@/types";

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState<SiteSettings>({
        name: "",
        title: "",
        location: "",
        email: "",
        githubUsername: "",
        githubUrl: "",
        linkedinUrl: "",
        twitterUrl: "",
        bio: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [titleList, setTitleList] = useState<string[]>([""]);

    useEffect(() => {
        fetch("/api/settings")
            .then((r) => r.json())
            .then((data) => {
                setSettings(data);
                if (data.title) {
                    setTitleList(data.title.split(",").map((t: string) => t.trim()));
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const handleAddTitle = () => {
        setTitleList([...titleList, ""]);
    };

    const handleRemoveTitle = (index: number) => {
        const newList = titleList.filter((_, i) => i !== index);
        setTitleList(newList.length > 0 ? newList : [""]);
    };

    const handleTitleChange = (index: number, value: string) => {
        const newList = [...titleList];
        newList[index] = value;
        setTitleList(newList);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const finalSettings = {
            ...settings,
            title: titleList.filter(t => t.trim()).join(", ")
        };
        try {
            await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalSettings),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            alert("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8 space-y-6 max-w-4xl mx-auto">
                <div className="h-8 w-48 bg-white/5 animate-pulse rounded" />
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0c1a] p-6 rounded-2xl border border-white/5 shadow-xl">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                        Global Configuration
                        <span className="text-xs font-normal text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            Live Sync
                        </span>
                    </h1>
                    <p className="text-neutral-400 text-sm mt-1">Control your identity, social presence, and basic site information.</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className={cn(
                        "flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg min-w-[160px] justify-center",
                        saved 
                            ? "bg-emerald-500 text-white shadow-emerald-900/20" 
                            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-900/20 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50"
                    )}
                >
                    {saving ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : saved ? (
                        <><FiCheck className="w-4 h-4" /> All Saved</>
                    ) : (
                        <><FiSave className="w-4 h-4" /> Save Settings</>
                    )}
                </button>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Personal Information */}
                <section className="bg-[#0a0c1a] rounded-3xl border border-white/5 shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-white/5 bg-white/[0.01] flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                            <FiUser className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold text-white">Identity & Bio</h2>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Full Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={settings.name}
                                        onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                        placeholder="Arvind Kumar"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Location</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={settings.location}
                                        onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                        placeholder="New York, USA"
                                    />
                                    <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Job Titles (Typewriter Effect)</label>
                            <div className="space-y-2">
                                <AnimatePresence mode="popLayout">
                                    {titleList.map((title, index) => (
                                        <motion.div 
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            className="flex gap-2"
                                        >
                                            <input
                                                type="text"
                                                value={title}
                                                onChange={(e) => handleTitleChange(index, e.target.value)}
                                                placeholder={`Job Title #${index + 1}`}
                                                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTitle(index)}
                                                className="p-3 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-colors"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                <button
                                    type="button"
                                    onClick={handleAddTitle}
                                    className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors font-bold mt-2 ml-1"
                                >
                                    <FiPlus className="w-3 h-3" /> Add Alternative Title
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Professional Bio</label>
                            <textarea
                                value={settings.bio}
                                onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
                                rows={4}
                                className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all resize-none"
                                placeholder="Write a short summary of yourself..."
                            />
                        </div>
                    </div>
                </section>

                {/* Social Presence */}
                <section className="bg-[#0a0c1a] rounded-3xl border border-white/5 shadow-xl overflow-hidden">
                    <div className="p-6 border-b border-white/5 bg-white/[0.01] flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                            <FiLink className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold text-white">Contact & Socials</h2>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={settings.email}
                                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                    placeholder="your@email.com"
                                />
                                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">GitHub Username</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={settings.githubUsername}
                                        onChange={(e) => setSettings({ ...settings, githubUsername: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                        placeholder="octocat"
                                    />
                                    <FiGithub className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">GitHub Profile URL</label>
                                <input
                                    type="url"
                                    value={settings.githubUrl}
                                    onChange={(e) => setSettings({ ...settings, githubUrl: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                    placeholder="https://github.com/..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">LinkedIn Profile</label>
                                <div className="relative">
                                    <input
                                        type="url"
                                        value={settings.linkedinUrl}
                                        onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                    <FiLinkedin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Twitter / X Profile</label>
                                <div className="relative">
                                    <input
                                        type="url"
                                        value={settings.twitterUrl}
                                        onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                                        placeholder="https://twitter.com/..."
                                    />
                                    <FiTwitter className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>

            <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                    <FiInfo className="text-blue-400 w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm">Real-time Synchronization</h4>
                    <p className="text-neutral-500 text-xs mt-1 leading-relaxed">
                        These settings are cached globally. Updates may take a few seconds to propagate through the CRM 
                        and appear on your public-facing hero section and footer.
                    </p>
                </div>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}


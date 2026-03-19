"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiTrash2, FiPlus, FiSave, FiX, FiBriefcase, FiCalendar, FiMapPin, FiArrowUp, FiArrowDown } from "react-icons/fi";
import type { ExperienceItem } from "@/types";

export default function AdminExperiencePage() {
    const [items, setItems] = useState<ExperienceItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const fetchData = async () => {
        try {
            const res = await fetch("/api/experience");
            const data = await res.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch experience", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch("/api/experience", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(items),
            });
            setEditIndex(null);
            await fetchData();
        } catch (error) {
            alert("Failed to save experience");
        } finally {
            setSaving(false);
        }
    };

    const handleAdd = () => {
        const newItem: ExperienceItem = {
            title: "",
            company: "",
            date: "",
            description: "",
        };
        setItems([newItem, ...items]);
        setEditIndex(0);
        
        // Scroll to top so the user sees the newly added form
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }, 100);
    };

    const handleDelete = (index: number) => {
        if (!confirm("Delete this entry?")) return;
        setItems(items.filter((_, i) => i !== index));
        setEditIndex(null);
    };

    const update = (index: number, field: keyof ExperienceItem, value: string) => {
        const updated = [...items];
        updated[index] = { ...updated[index], [field]: value };
        setItems(updated);
    };

    const moveUp = (index: number) => {
        if (index === 0) return;
        const updated = [...items];
        const temp = updated[index];
        updated[index] = updated[index - 1];
        updated[index - 1] = temp;
        setItems(updated);
        
        // Keep tracking the edited item correctly
        if (editIndex === index) setEditIndex(index - 1);
        else if (editIndex === index - 1) setEditIndex(index);
    };

    const moveDown = (index: number) => {
        if (index === items.length - 1) return;
        const updated = [...items];
        const temp = updated[index];
        updated[index] = updated[index + 1];
        updated[index + 1] = temp;
        setItems(updated);
        
        // Keep tracking the edited item correctly
        if (editIndex === index) setEditIndex(index + 1);
        else if (editIndex === index + 1) setEditIndex(index);
    };

    if (loading) {
        return (
            <div className="p-8 space-y-4">
                <div className="h-8 w-48 bg-white/5 animate-pulse rounded" />
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 rounded-2xl bg-white/5 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0c1a] p-6 rounded-2xl border border-white/5 shadow-xl">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                        Career Path
                        <span className="text-xs font-normal text-neutral-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                            {items.length} Roles
                        </span>
                    </h1>
                    <p className="text-neutral-400 text-sm mt-1">Manage your professional work history and achievements.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-neutral-300 text-sm font-semibold hover:text-white hover:bg-white/10 border border-white/5 transition-all"
                    >
                        <FiPlus className="w-4 h-4" /> Add Role
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold shadow-lg shadow-emerald-900/20 hover:from-emerald-500 hover:to-teal-500 transition-all disabled:opacity-50"
                    >
                        <FiSave className="w-4 h-4" /> {saving ? "Saving..." : "Commit History"}
                    </button>
                </div>
            </div>

            <div className="space-y-4 relative">
                {/* Timeline Line */}
                <div className="absolute left-[29px] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-white/5 to-transparent hidden md:block" />

                <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            key={index}
                            className={cn(
                                "group relative flex flex-col md:flex-row gap-6 p-6 rounded-2xl border transition-all duration-300 bg-[#0a0c1a]",
                                editIndex === index
                                    ? "border-emerald-500/50 shadow-2xl z-10 bg-[#11142b]"
                                    : "border-white/5 hover:border-white/20"
                            )}
                        >
                            {/* Static View Dot */}
                            <div className="absolute left-[25px] top-[30px] w-2 h-2 rounded-full bg-emerald-500 border border-black hidden md:block z-10 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />

                            <div className="flex-1 space-y-4">
                                {editIndex === index ? (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Editing Experience</span>
                                            </div>
                                            <button onClick={() => setEditIndex(null)} className="p-2 hover:bg-white/5 rounded-full text-neutral-400 transition-colors">
                                                <FiX className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Job Title / Role</label>
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) => update(index, "title", e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                                                    placeholder="Senior Developer"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Company Name</label>
                                                <input
                                                    type="text"
                                                    value={item.company}
                                                    onChange={(e) => update(index, "company", e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                                                    placeholder="Tech Corp Inc."
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Date Range</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={item.date}
                                                        onChange={(e) => update(index, "date", e.target.value)}
                                                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-neutral-300 text-xs focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                                                        placeholder="Jan 2022 - Present"
                                                    />
                                                    <FiCalendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Role Description & Achievements</label>
                                            <textarea
                                                value={item.description}
                                                onChange={(e) => update(index, "description", e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all min-h-[120px] resize-none"
                                                placeholder="Briefly describe your responsibilities and key impact..."
                                            />
                                        </div>
                                        
                                        <div className="flex justify-end pt-2">
                                            <button 
                                                onClick={() => setEditIndex(null)}
                                                className="px-8 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/40"
                                            >
                                                Keep Changes
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pl-0 md:pl-10">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shrink-0">
                                                    <FiBriefcase className="w-4 h-4" />
                                                </div>
                                                <h3 className="text-white font-bold text-lg leading-tight">{item.title || "Untitled Role"}</h3>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 ml-0 md:ml-11">
                                                <span className="text-emerald-400 text-sm font-semibold">{item.company || "New Company"}</span>
                                                <span className="text-neutral-500 text-xs flex items-center gap-1">
                                                    <FiCalendar className="w-3 h-3" /> {item.date || "Date Range TBD"}
                                                </span>
                                            </div>
                                            <p className="text-neutral-400 text-sm leading-relaxed mt-4 ml-0 md:ml-11 line-clamp-2 italic">
                                                "{item.description || "Describe your role and impact at this organization."}"
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0 self-end md:self-start pt-1">
                                            <button
                                                onClick={() => moveUp(index)}
                                                disabled={index === 0}
                                                className="p-2.5 rounded-xl text-neutral-400 hover:text-emerald-400 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20 transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-400 disabled:hover:border-transparent"
                                                title="Move Up"
                                            >
                                                <FiArrowUp className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => moveDown(index)}
                                                disabled={index === items.length - 1}
                                                className="p-2.5 rounded-xl text-neutral-400 hover:text-emerald-400 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20 transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-400 disabled:hover:border-transparent"
                                                title="Move Down"
                                            >
                                                <FiArrowDown className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => setEditIndex(index)}
                                                className="p-2.5 rounded-xl text-neutral-400 hover:text-emerald-400 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20 transition-all"
                                                title="Edit Entry"
                                            >
                                                <FiEdit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="p-2.5 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                                                title="Delete Entry"
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {items.length === 0 && (
                <div className="py-24 text-center rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.01]">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <FiPlus className="w-8 h-8 text-neutral-600" />
                    </div>
                    <p className="text-neutral-500 font-medium">No experience history found.</p>
                    <button onClick={handleAdd} className="mt-4 text-emerald-400 hover:text-emerald-300 text-sm font-bold">Add your first role</button>
                </div>
            )}
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}


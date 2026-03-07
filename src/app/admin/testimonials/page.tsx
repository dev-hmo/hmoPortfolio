"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiTrash2, FiPlus, FiSave, FiX, FiMessageSquare, FiUser, FiBriefcase, FiCheck, FiInfo } from "react-icons/fi";

export default function AdminTestimonialsPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const fetchData = async () => {
        try {
            const res = await fetch("/api/testimonials");
            const data = await res.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch testimonials", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch("/api/testimonials", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(items),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
            setEditIndex(null);
        } catch (error) {
            alert("Failed to save testimonials");
        } finally {
            setSaving(false);
        }
    };

    const handleAdd = () => {
        setItems([...items, { quote: "", name: "", title: "" }]);
        setEditIndex(items.length);
    };

    const handleDelete = (index: number) => {
        if (!confirm("Delete this testimonial?")) return;
        setItems(items.filter((_, i) => i !== index));
        setEditIndex(null);
    };

    const update = (index: number, field: string, value: string) => {
        const updated = [...items];
        updated[index] = { ...updated[index], [field]: value };
        setItems(updated);
    };

    if (loading) {
        return (
            <div className="p-8 space-y-4 max-w-5xl mx-auto">
                <div className="h-8 w-48 bg-white/5 animate-pulse rounded" />
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-40 rounded-2xl bg-white/5 animate-pulse" />
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
                        Social Proof
                        <span className="text-xs font-normal text-neutral-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                            {items.length} Endorsements
                        </span>
                    </h1>
                    <p className="text-neutral-400 text-sm mt-1">Curate and manage client testimonials and professional reviews.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-neutral-300 text-sm font-semibold hover:text-white hover:bg-white/10 border border-white/5 transition-all"
                    >
                        <FiPlus className="w-4 h-4" /> Add Review
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg min-w-[140px] justify-center",
                            saved 
                                ? "bg-emerald-500 text-white shadow-emerald-900/20" 
                                : "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-pink-900/20 hover:from-pink-500 hover:to-rose-500 disabled:opacity-50"
                        )}
                    >
                        {saving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : saved ? (
                            <><FiCheck className="w-4 h-4" /> Changes Applied</>
                        ) : (
                            <><FiSave className="w-4 h-4" /> Save Feedback</>
                        )}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            key={index}
                            className={cn(
                                "group relative overflow-hidden rounded-2xl border transition-all duration-300 bg-[#0a0c1a]",
                                editIndex === index
                                    ? "border-pink-500/50 shadow-2xl z-10 bg-[#11142b]"
                                    : "border-white/5 hover:border-white/20"
                            )}
                        >
                            <div className="p-6">
                                {editIndex === index ? (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                                                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Editing Review</span>
                                            </div>
                                            <button onClick={() => setEditIndex(null)} className="p-2 hover:bg-white/5 rounded-full text-neutral-400 transition-colors">
                                                <FiX className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Author Name</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={item.name}
                                                        onChange={(e) => update(index, "name", e.target.value)}
                                                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:ring-2 focus:ring-pink-500/50 outline-none transition-all"
                                                        placeholder="Sarah Jenkins"
                                                    />
                                                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Title / Role</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        value={item.title}
                                                        onChange={(e) => update(index, "title", e.target.value)}
                                                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:ring-2 focus:ring-pink-500/50 outline-none transition-all"
                                                        placeholder="CEO at TechVision"
                                                    />
                                                    <FiBriefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Testimonial Quote</label>
                                            <textarea
                                                value={item.quote}
                                                onChange={(e) => update(index, "quote", e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-pink-500/50 outline-none transition-all min-h-[120px] resize-none"
                                                placeholder="Share the client's positive feedback here..."
                                            />
                                        </div>
                                        
                                        <div className="flex justify-end pt-2">
                                            <button 
                                                onClick={() => setEditIndex(null)}
                                                className="px-8 py-2.5 rounded-xl bg-pink-600 text-white text-sm font-bold hover:bg-pink-500 transition-all shadow-lg shadow-pink-900/40"
                                            >
                                                Keep Changes
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div className="flex-1 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-pink-500/10 text-pink-400 flex items-center justify-center border border-pink-500/20 shrink-0">
                                                    <FiMessageSquare className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-bold leading-tight">{item.name || "Anonymous Client"}</h3>
                                                    <p className="text-pink-400/80 text-xs font-semibold">{item.title || "Professional"}</p>
                                                </div>
                                            </div>
                                            <p className="text-neutral-400 text-sm leading-relaxed italic border-l-2 border-pink-500/20 pl-4 py-1">
                                                &quot;{item.quote || "Waiting for feedback..."}&quot;
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0 self-end md:self-start pt-1">
                                            <button
                                                onClick={() => setEditIndex(index)}
                                                className="p-2.5 rounded-xl text-neutral-400 hover:text-pink-400 hover:bg-pink-500/10 border border-transparent hover:border-pink-500/20 transition-all"
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
                        <FiMessageSquare className="w-8 h-8 text-neutral-600" />
                    </div>
                    <p className="text-neutral-500 font-medium">No testimonials found.</p>
                    <button onClick={handleAdd} className="mt-4 text-pink-400 hover:text-pink-300 text-sm font-bold">Add your first review</button>
                </div>
            )}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 bg-pink-500/10 rounded-xl">
                    <FiInfo className="text-pink-400 w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm">Dashboard Performance Tip</h4>
                    <p className="text-neutral-500 text-xs mt-1 leading-relaxed">
                        These testimonials rotate in the "Endorsements" section using a marquee effect. 
                        Try to keep quotes between 100-200 characters for the best visual balance.
                    </p>
                </div>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}


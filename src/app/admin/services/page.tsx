"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiTrash2, FiPlus, FiSave, FiX, FiLayers, FiCheck, FiInfo } from "react-icons/fi";

export default function AdminServicesPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const fetchData = async () => {
        try {
            const res = await fetch("/api/services");
            const data = await res.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch services", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch("/api/services", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(items),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
            setEditIndex(null);
        } catch (error) {
            alert("Failed to save services");
        } finally {
            setSaving(false);
        }
    };

    const handleAdd = () => {
        setItems([...items, { title: "", description: "" }]);
        setEditIndex(items.length);
    };

    const handleDelete = (index: number) => {
        if (!confirm("Delete this service step?")) return;
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
                        Service Workflow
                        <span className="text-xs font-normal text-neutral-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                            {items.length} Phases
                        </span>
                    </h1>
                    <p className="text-neutral-400 text-sm mt-1">Define the strategic approach and phases of your service delivery.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-neutral-300 text-sm font-semibold hover:text-white hover:bg-white/10 border border-white/5 transition-all"
                    >
                        <FiPlus className="w-4 h-4" /> Add Phase
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg min-w-[140px] justify-center",
                            saved 
                                ? "bg-emerald-500 text-white shadow-emerald-900/20" 
                                : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-900/20 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50"
                        )}
                    >
                        {saving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : saved ? (
                            <><FiCheck className="w-4 h-4" /> Published</>
                        ) : (
                            <><FiSave className="w-4 h-4" /> Save Workflow</>
                        )}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            key={index}
                            className={cn(
                                "group relative overflow-hidden rounded-2xl border transition-all duration-300 bg-[#0a0c1a]",
                                editIndex === index
                                    ? "border-indigo-500/50 shadow-2xl z-10 bg-[#11142b]"
                                    : "border-white/5 hover:border-white/20"
                            )}
                        >
                            <div className="p-6">
                                {editIndex === index ? (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Editing Phase {index + 1}</span>
                                            </div>
                                            <button onClick={() => setEditIndex(null)} className="p-2 hover:bg-white/5 rounded-full text-neutral-400 transition-colors">
                                                <FiX className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Phase Title</label>
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) => update(index, "title", e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all"
                                                    placeholder="Phase 1: Planning"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Phase Description</label>
                                                <textarea
                                                    value={item.description}
                                                    onChange={(e) => update(index, "description", e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all min-h-[100px] resize-none"
                                                    placeholder="Detail the activities and outcomes for this phase..."
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-end pt-2">
                                            <button 
                                                onClick={() => setEditIndex(null)}
                                                className="px-8 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/40"
                                            >
                                                Confirm Changes
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div className="flex gap-5">
                                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 shrink-0 font-bold text-xl">
                                                {index + 1}
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-white font-bold text-lg leading-tight">{item.title || "New Phase"}</h3>
                                                <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl line-clamp-2">
                                                    {item.description || "Define the scope and objectives for this service phase."}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0 self-end md:self-start pt-1">
                                            <button
                                                onClick={() => setEditIndex(index)}
                                                className="p-2.5 rounded-xl text-neutral-400 hover:text-indigo-400 hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/20 transition-all"
                                                title="Edit Phase"
                                            >
                                                <FiEdit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(index)}
                                                className="p-2.5 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                                                title="Delete Phase"
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
                        <FiLayers className="w-8 h-8 text-neutral-600" />
                    </div>
                    <p className="text-neutral-500 font-medium">No service phases defined yet.</p>
                    <button onClick={handleAdd} className="mt-4 text-indigo-400 hover:text-indigo-300 text-sm font-bold">Add your first phase</button>
                </div>
            )}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl">
                    <FiInfo className="text-indigo-400 w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm">Visual Presentation</h4>
                    <p className="text-neutral-500 text-xs mt-1 leading-relaxed">
                        Phases are displayed as animated steps in the "Approach" section. 
                        Keep titles concise and descriptions impactful for maximum readability.
                    </p>
                </div>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}


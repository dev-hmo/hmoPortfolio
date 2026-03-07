"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit2, FiTrash2, FiPlus, FiSave, FiX, FiInfo } from "react-icons/fi";

export default function AdminGridPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const fetchData = async () => {
        try {
            const res = await fetch("/api/grid");
            const data = await res.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch grid items", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch("/api/grid", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(items),
            });
            setEditIndex(null);
            await fetchData();
        } catch (error) {
            alert("Failed to save changes");
        } finally {
            setSaving(false);
        }
    };

    const handleAdd = () => {
        const newItem = {
            id: items.length + 1,
            title: "",
            description: "",
            className: "lg:col-span-2 md:col-span-3 md:row-span-1",
            imgClassName: "w-full h-full",
            titleClassName: "justify-start",
            img: "",
            spareImg: ""
        };
        setItems([...items, newItem]);
        setEditIndex(items.length);
    };

    const handleDelete = (index: number) => {
        if (!confirm("Delete this grid item?")) return;
        setItems(items.filter((_, i) => i !== index));
        setEditIndex(null);
    };

    const update = (index: number, field: string, value: any) => {
        const updated = [...items];
        updated[index] = { ...updated[index], [field]: value };
        setItems(updated);
    };

    if (loading) {
        return (
            <div className="space-y-4 p-8">
                <div className="h-8 w-48 bg-white/5 animate-pulse rounded" />
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-24 rounded-2xl bg-white/5 animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0a0c1a] p-6 rounded-2xl border border-white/5">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Bento Grid Manager</h1>
                    <p className="text-neutral-400 text-sm mt-1">Configure layout, content, and visuals for your portfolio grid.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-neutral-300 text-sm font-semibold hover:text-white hover:bg-white/10 border border-white/5 transition-all"
                    >
                        <FiPlus className="w-4 h-4" /> Add Item
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-bold shadow-lg shadow-cyan-900/20 hover:from-cyan-500 hover:to-blue-500 transition-all disabled:opacity-50"
                    >
                        <FiSave className="w-4 h-4" /> {saving ? "Saving..." : "Deploy Changes"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            key={index}
                            className={cn(
                                "group relative rounded-2xl border transition-all duration-300",
                                editIndex === index
                                    ? "bg-[#11142b] border-cyan-500/50 p-6 shadow-2xl"
                                    : "bg-[#0a0c1a] border-white/5 p-5 hover:border-white/20"
                            )}
                        >
                            {editIndex === index ? (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-cyan-500" />
                                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Editing Item</span>
                                        </div>
                                        <button onClick={() => setEditIndex(null)} className="p-2 hover:bg-white/5 rounded-full text-neutral-400">
                                            <FiX className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Grid ID</label>
                                            <input
                                                type="number"
                                                value={item.id}
                                                onChange={(e) => update(index, "id", parseInt(e.target.value))}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all"
                                                placeholder="1-6"
                                            />
                                        </div>
                                        <div className="md:col-span-3 space-y-2">
                                            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Title</label>
                                            <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) => update(index, "title", e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all"
                                                placeholder="Enter item title..."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Description</label>
                                        <textarea
                                            value={item.description}
                                            onChange={(e) => update(index, "description", e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all min-h-[100px] resize-none"
                                            placeholder="Write a brief description..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Grid Span Class</label>
                                            <input
                                                type="text"
                                                value={item.className}
                                                onChange={(e) => update(index, "className", e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs font-mono focus:ring-2 focus:ring-cyan-500/50 outline-none"
                                                placeholder="lg:col-span-3 md:col-span-6..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Image Class</label>
                                            <input
                                                type="text"
                                                value={item.imgClassName}
                                                onChange={(e) => update(index, "imgClassName", e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs font-mono focus:ring-2 focus:ring-cyan-500/50 outline-none"
                                                placeholder="w-full h-full..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Title Class</label>
                                            <input
                                                type="text"
                                                value={item.titleClassName}
                                                onChange={(e) => update(index, "titleClassName", e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white text-xs font-mono focus:ring-2 focus:ring-cyan-500/50 outline-none"
                                                placeholder="justify-end..."
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Main Image URL</label>
                                            <input
                                                type="text"
                                                value={item.img}
                                                onChange={(e) => update(index, "img", e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-neutral-300 text-xs focus:ring-2 focus:ring-cyan-500/50 outline-none"
                                                placeholder="/path/to/image.svg"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider ml-1">Spare Image URL</label>
                                            <input
                                                type="text"
                                                value={item.spareImg}
                                                onChange={(e) => update(index, "spareImg", e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-neutral-300 text-xs focus:ring-2 focus:ring-cyan-500/50 outline-none"
                                                placeholder="/path/to/spare.svg"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end pt-4">
                                        <button 
                                            onClick={() => setEditIndex(null)}
                                            className="px-6 py-2 rounded-xl bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-all"
                                        >
                                            Close Form
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex gap-4 items-start">
                                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 font-bold border border-cyan-500/20 shrink-0">
                                            {item.id}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-white font-semibold text-base truncate">{item.title || "Untitled Grid Item"}</h3>
                                            <p className="text-neutral-500 text-sm mt-1 line-clamp-1">{item.description || "No description provided."}</p>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider border border-white/5">
                                                    {item.className?.split(' ')[0]} ...
                                                </span>
                                                {item.img && (
                                                    <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-[10px] font-semibold text-blue-400 uppercase tracking-wider border border-blue-500/10">
                                                        With Media
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                                        <button
                                            onClick={() => setEditIndex(index)}
                                            className="p-2.5 rounded-xl text-neutral-400 hover:text-cyan-400 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-all"
                                            title="Edit Item"
                                        >
                                            <FiEdit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="p-2.5 rounded-xl text-neutral-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                                            title="Delete Item"
                                        >
                                            <FiTrash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {items.length === 0 && (
                    <div className="py-20 text-center rounded-2xl border-2 border-dashed border-white/5">
                        <p className="text-neutral-500">No grid items found. Click "Add Item" to start building.</p>
                    </div>
                )}
            </div>
            
            <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-6 flex gap-4">
                <FiInfo className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Advanced Configuration Note</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                        The Grid system relies on Tailwind classes for layout. Changing <code className="text-blue-300 bg-blue-300/10 px-1 rounded">lg:col-span-X</code> classes will directly affect the bento structure. IDs 1, 3, 5, and 6 have special rendering logic in the frontend (Globe, Tech Stack, Animation Library, and Contact Button).
                    </p>
                </div>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}


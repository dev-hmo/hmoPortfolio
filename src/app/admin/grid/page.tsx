"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AdminGridPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const fetchData = async () => {
        const res = await fetch("/api/grid");
        setItems(await res.json());
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async () => {
        setSaving(true);
        await fetch("/api/grid", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(items),
        });
        setSaving(false);
        setEditIndex(null);
    };

    const handleAdd = () => {
        setItems([...items, { title: "", description: "", className: "", imgClassName: "", titleClassName: "", img: "", spareImg: "" }]);
        setEditIndex(items.length);
    };

    const handleDelete = (index: number) => {
        if (!confirm("Delete this grid item?")) return;
        setItems(items.filter((_, i) => i !== index));
        setEditIndex(null);
    };

    const update = (index: number, field: string, value: string) => {
        const updated = [...items];
        updated[index] = { ...updated[index], [field]: value };
        setItems(updated);
    };

    if (loading) {
        return <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />)}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Grid (About) Items ({items.length})</h2>
                <div className="flex gap-2">
                    <button onClick={handleAdd} className="px-4 py-2 rounded-lg bg-white/5 text-neutral-400 text-sm font-medium hover:text-white hover:bg-white/10 transition-all">+ Add Item</button>
                    <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50">
                        {saving ? "Saving..." : "Save All"}
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="rounded-xl border border-white/10 bg-white/5 p-4">
                        {editIndex === index ? (
                            <div className="space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_1fr] gap-3">
                                    <input type="number" placeholder="Layout ID (1-6)" value={item.id} onChange={(e) => update(index, "id", parseInt(e.target.value))} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
                                    <input type="text" placeholder="Title" value={item.title} onChange={(e) => update(index, "title", e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
                                    <input type="text" placeholder="Description" value={item.description} onChange={(e) => update(index, "description", e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <input type="text" placeholder="CSS ClassName" value={item.className} onChange={(e) => update(index, "className", e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
                                    <input type="text" placeholder="Image URL" value={item.img} onChange={(e) => update(index, "img", e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
                                    <input type="text" placeholder="Spare Image URL" value={item.spareImg} onChange={(e) => update(index, "spareImg", e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50" />
                                </div>
                                <button onClick={() => setEditIndex(null)} className="text-xs text-cyan-400 hover:text-cyan-300">Done editing</button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-white font-medium text-sm">{item.title || "Untitled Grid Item"}</h3>
                                    <p className="text-neutral-500 text-xs mt-0.5 truncate max-w-md">{item.description}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setEditIndex(index)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors">Edit</button>
                                    <button onClick={() => handleDelete(index)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">Delete</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

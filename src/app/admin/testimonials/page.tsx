"use client";
import { useState, useEffect } from "react";

export default function AdminTestimonialsPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const fetchData = async () => {
        const res = await fetch("/api/testimonials");
        setItems(await res.json());
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async () => {
        setSaving(true);
        await fetch("/api/testimonials", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(items),
        });
        setSaving(false);
        setEditIndex(null);
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
        return <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />)}</div>;
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.02] p-6 rounded-2xl border border-white/10">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        Testimonials <span className="bg-cyan-500/20 text-cyan-400 text-xs px-2.5 py-1 rounded-full">{items.length} Total</span>
                    </h2>
                    <p className="text-sm text-neutral-400 mt-1">Manage endorsements and reviews from your clients.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleAdd} className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all shadow-sm flex items-center gap-2">
                        <span>+</span> Add Testimonial
                    </button>
                    <button onClick={handleSave} disabled={saving} className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 flex items-center gap-2">
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-[#0c0e2b] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/10">
                                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase w-[30%]">Author / Client</th>
                                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase w-[50%]">Endorsement</th>
                                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-neutral-400 uppercase w-[20%] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {items.map((item, index) => (
                                <tr key={index} className="group hover:bg-white/[0.02] transition-colors">
                                    {editIndex === index ? (
                                        <td colSpan={3} className="px-6 py-6">
                                            <div className="bg-black/50 p-6 rounded-xl border border-cyan-500/30 space-y-4 shadow-inner">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-xs text-cyan-400 mb-1 block">Name</label>
                                                        <input type="text" value={item.name} onChange={(e) => update(index, "name", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:ring-2 focus:ring-cyan-500/50" />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-cyan-400 mb-1 block">Title & Company</label>
                                                        <input type="text" value={item.title} onChange={(e) => update(index, "title", e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:ring-2 focus:ring-cyan-500/50" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-xs text-cyan-400 mb-1 block">Quote / Endorsement</label>
                                                    <textarea value={item.quote} onChange={(e) => update(index, "quote", e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:ring-2 focus:ring-cyan-500/50 resize-y" />
                                                </div>
                                                <div className="flex justify-end pt-2">
                                                    <button onClick={() => setEditIndex(null)} className="px-6 py-2 bg-cyan-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400 transition-colors">
                                                        Finish Editing
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    ) : (
                                        <>
                                            <td className="px-6 py-4 align-top">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 shrink-0 flex items-center justify-center text-lg">
                                                        👤
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-medium text-sm leading-tight">{item.name || "Unnamed"}</h3>
                                                        <p className="text-neutral-500 text-xs mt-1 font-medium">{item.title}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-top">
                                                <p className="text-cyan-400/80 text-xs leading-relaxed max-w-2xl italic line-clamp-3">
                                                    &quot;{item.quote || "No quote provided."}&quot;
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 align-middle text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => setEditIndex(index)} className="px-3 py-1.5 rounded-md text-xs font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDelete(index)} className="px-3 py-1.5 rounded-md text-xs font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                            {items.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-6 py-12 text-center text-neutral-500 text-sm">
                                        No testimonials found. Click "Add Testimonial" to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

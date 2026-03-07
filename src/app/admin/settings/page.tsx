"use client";
import { useState, useEffect } from "react";
import type { SiteSettings } from "@/types";
import { FaPlus, FaTrash } from "react-icons/fa";

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
        await fetch("/api/settings", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalSettings),
        });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    if (loading) {
        return <div className="space-y-4">{[1, 2, 3, 4].map((i) => <div key={i} className="h-12 rounded-lg bg-white/5 animate-pulse" />)}</div>;
    }

    const fields: { key: keyof SiteSettings; label: string; type?: string }[] = [
        { key: "name", label: "Full Name" },
        { key: "title", label: "Job Title" },
        { key: "location", label: "Location" },
        { key: "email", label: "Email Address", type: "email" },
        { key: "bio", label: "Bio" },
        { key: "githubUsername", label: "GitHub Username" },
        { key: "githubUrl", label: "GitHub URL", type: "url" },
        { key: "linkedinUrl", label: "LinkedIn URL", type: "url" },
        { key: "twitterUrl", label: "Twitter URL", type: "url" },
    ];

    return (
        <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Site Settings</h2>
                {saved && (
                    <span className="text-green-400 text-sm font-medium animate-pulse">
                        ✓ Saved!
                    </span>
                )}
            </div>

            <form onSubmit={handleSave} className="space-y-4 bg-white/[0.03] backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl">
                {fields.map(({ key, label, type }) => (
                    <div key={key}>
                        <label className="block text-xs text-neutral-400 mb-1.5 font-medium">
                            {label}
                        </label>
                        {key === "bio" ? (
                            <textarea
                                value={settings[key]}
                                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                                rows={3}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-y"
                            />
                        ) : key === "title" ? (
                            <div className="space-y-2">
                                {titleList.map((title, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => handleTitleChange(index, e.target.value)}
                                            placeholder={`Title #${index + 1}`}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTitle(index)}
                                            className="p-2.5 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg h-9 w-9 flex items-center justify-center hover:bg-red-500/20 transition-colors"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddTitle}
                                    className="flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium mt-1"
                                >
                                    <FaPlus size={10} /> Add More Title
                                </button>
                            </div>
                        ) : (
                            <input
                                type={type || "text"}
                                value={settings[key]}
                                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                            />
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Settings"}
                </button>
            </form>
        </div>
    );
}

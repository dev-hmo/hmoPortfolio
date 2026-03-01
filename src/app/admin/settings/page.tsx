"use client";
import { useState, useEffect } from "react";
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

    useEffect(() => {
        fetch("/api/settings")
            .then((r) => r.json())
            .then(setSettings)
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        await fetch("/api/settings", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(settings),
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

            <form onSubmit={handleSave} className="space-y-4">
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

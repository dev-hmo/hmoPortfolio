"use client";
import { useState, useEffect } from "react";

export default function AdminSkillsPage() {
    const [skills, setSkills] = useState<string[]>([]);
    const [tools, setTools] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [newSkill, setNewSkill] = useState("");
    const [newTool, setNewTool] = useState("");

    useEffect(() => {
        fetch("/api/skills")
            .then((r) => r.json())
            .then((data) => {
                setSkills(data.skills);
                setTools(data.tools);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        await fetch("/api/skills", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ skills, tools }),
        });
        setSaving(false);
    };

    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const addTool = () => {
        if (newTool.trim() && !tools.includes(newTool.trim())) {
            setTools([...tools, newTool.trim()]);
            setNewTool("");
        }
    };

    if (loading) {
        return <div className="h-40 rounded-xl bg-white/5 animate-pulse" />;
    }

    return (
        <div className="space-y-8 max-w-2xl">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Skills & Tools</h2>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {/* Skills */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-medium mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {skills.map((skill) => (
                        <span
                            key={skill}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium"
                        >
                            {skill}
                            <button
                                onClick={() => setSkills(skills.filter((s) => s !== skill))}
                                className="hover:text-red-400 transition-colors"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                    <button
                        onClick={addSkill}
                        className="px-4 py-2 rounded-lg bg-white/5 text-neutral-400 text-sm hover:text-white hover:bg-white/10 transition-all"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Tools */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-white font-medium mb-4">Tools</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {tools.map((tool) => (
                        <span
                            key={tool}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium"
                        >
                            {tool}
                            <button
                                onClick={() => setTools(tools.filter((t) => t !== tool))}
                                className="hover:text-red-400 transition-colors"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Add a tool"
                        value={newTool}
                        onChange={(e) => setNewTool(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTool())}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                    <button
                        onClick={addTool}
                        className="px-4 py-2 rounded-lg bg-white/5 text-neutral-400 text-sm hover:text-white hover:bg-white/10 transition-all"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
